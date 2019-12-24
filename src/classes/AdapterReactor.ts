import * as globalConsts from "../consts/GlobalConsts";

// tslint:disable-next-line: typedef
const stringHash = require("string-hash");

import { IAdapterReactor } from "../interfaces/IAdapterReactor";

import { Fa365 } from "../main";
import { ISensorOpen } from "../interfaces/ISensorOpen";
import { SensorOpen } from "../classes/SensorOpen";
import { SensorsFactory } from "../factories/SensorsFactory";

export class AdapterReactor implements IAdapterReactor {

	/*
	  this.log.info("Z-Wave instance used: " + this.config.zwaveInstanceName);
	  this.log.info("Philips Hue instance used: " + this.config.hueInstanceName);
	*/

	private adapter: unknown;

	private electricityHashes: Set<number>;
	private electricityNames: string[];

	private sensorsOpenHashes: Set<number>;
	private sensorsOpen: SensorOpen[];

	// private sensorEingangtuer: ISensorOpen;

	protected adapterCurrent: Fa365;

	public get Adapter(): unknown {
		return this.adapter;
	}

	constructor(paramAdapter: unknown) {
		this.adapter = paramAdapter;
		this.adapterCurrent = (this.adapter) as Fa365;

		this.electricityHashes = new Set();
		this.electricityNames = [];

		// this.sensorEingangtuer = new SensorsFactory().GetSensorOpenAeon(this, "NODE30");
		this.sensorsOpenHashes = new Set();
		this.sensorsOpen = [];
	}

	public async Initialize(): Promise<void> {
		await this.adapterCurrent.setObjectAsync(globalConsts.deviceSensorOpen, {
			type: "device",
			common: {
				name: globalConsts.deviceSensorOpen
			},
			native: {},
		});
		await this.adapterCurrent.setObjectAsync(globalConsts.deviceChannelSensorOpenWohnungEingang, {
			type: "channel",
			common: {
				name: globalConsts.roomWohnungEingang,
				role: globalConsts.roleRoom
			},
			native: {},
		});

		// setup devices/channels
		await this.adapterCurrent.setObjectAsync("hauszaehler", {
			type: "device",
			common: {
				name: "hauszaehler"
			},
			native: {},
		});
		// wechselstrom
		await this.adapterCurrent.setObjectAsync("hauszaehler.wechselstrom", {
			type: "channel",
			common: {
				name: "wechselstrom"
			},
			native: {},
		});
		await this.adapterCurrent.setObjectAsync("hauszaehler.wechselstrom.hauptzaeler", {
			type: "state",
			common: {
				name: "hauptzaeler",
				type: "number",
				role: "indicator",
				read: true
			},
			native: {},
		});
	}

	private async subscribeSensorsOpen(): Promise<void> {
		this.adapterCurrent.log.info(`Before push`);

		let r1 = ((new SensorsFactory()).GetSensorOpenAeon(this, "NODE30"));

		// this.sensorsOpen.push(new SensorsFactory().GetSensorOpenAeon(this, "NODE30"));
		this.adapterCurrent.log.info(`After push`);
		this.adapterCurrent.log.info(this.adapterCurrent.config.zwaveInstanceName);
		this.adapterCurrent.log.info(`After push1`);

		const res: number = await r1.Subscribe(this.adapterCurrent.config.zwaveInstanceName);
		this.adapterCurrent.log.info(`8`);

		this.sensorsOpenHashes.add(res);
		this.adapterCurrent.log.info(`after await`);

/*
		for (let sensor of this.sensorsOpen) {
			await sensor.Register();
		}

		for (let sensor of this.sensorsOpen) {
			this.adapterCurrent.log.info(`Before await`);
			await sensor.Subscribe(this.sensorsOpenHashes);
			this.adapterCurrent.log.info(`after await`);
		}*/
	}

/*
		function SubscriberAttachEingangtur(paramEvent) {
			var sensorObject = SensorOpenObjectRegister(paramEvent);

			sensorObject.InitiatorId = sensorOpenObjectInstanceEingangtur;
			sensorObject.StateId = SensorConverterStateIdDecoder(getState(sensorEingangturEvent).val, sensorObject.InitiatorId);

			SensorOpenObjectSaveToMemory(sensorObject);

			var cacheEingangturState = $(sensorEingangturEvent);
			cacheEingangturState.on(function (obj) {
				HandleChangedState(paramEvent, sensorObject.InitiatorId, obj, true);
			})
		}
*/

	private async subscribeWechselstrom(): Promise<void> {
		this.electricityNames.push("zwave.0.NODE23.SENSOR_MULTILEVEL.Power_1");
		this.electricityNames.push("zwave.0.NODE24.METER.Electric_-_W_1");
		this.electricityNames.push("zwave.0.NODE33.METER.Electric_-_W_1");
		this.electricityNames.push("zwave.0.NODE2.SENSOR_MULTILEVEL.Power_1");
		this.electricityNames.push("zwave.0.NODE22.SENSOR_MULTILEVEL.Power_1");
		this.electricityNames.push("zwave.0.NODE40.SENSOR_MULTILEVEL.Power_1");
		this.electricityNames.push("zwave.0.NODE8.SENSOR_MULTILEVEL.Power_1");

		for (let item of this.electricityNames) {
			await this.adapterCurrent.subscribeForeignStatesAsync(item);
			this.electricityHashes.add(stringHash(item));
		}
	}

	public async Subscribe(): Promise<void> {
		await this.subscribeSensorsOpen();
		await this.subscribeWechselstrom();
	}

	private async getWechselstrom(paramStateName: string): Promise<number> {
		// tslint:disable-next-line: typedef
		const stateWechselstrom =
			await this.adapterCurrent.getForeignStateAsync(paramStateName);
		return stateWechselstrom ? stateWechselstrom.val : 0;
	}

	private async getWechselstromTotal(): Promise<number> {
		let currentWechselstrom: number = 0;

		for (let item of this.electricityNames) {
			currentWechselstrom += await this.getWechselstrom(item);
		}

		currentWechselstrom = (currentWechselstrom * 10) / 10;
		return currentWechselstrom;
	}

	public async onStateChange(
		id: string,
		state: ioBroker.State | null | undefined
	): Promise<void> {
		const hashState: number = stringHash(id);
		if (state) {
			if (this.electricityHashes.has(hashState)) {
				this.adapterCurrent.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
				await this.adapterCurrent.setStateAsync(
					"hauszaehler.wechselstrom.hauptzaeler",
					{ val: await this.getWechselstromTotal(), ack: true }
				);
			} else {
				if (this.sensorsOpenHashes.has(hashState)) {
				this.adapterCurrent.log.info(`Eingangtur opened`);
				}
			}
		}
	}
}