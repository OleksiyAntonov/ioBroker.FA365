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

	private sensorsOpens: Map<number, ISensorOpen>;

	// private sensorEingangtuer: ISensorOpen;

	protected adapterCurrent: Fa365;

	constructor(paramAdapter: unknown) {
		this.adapter = paramAdapter;
		this.adapterCurrent = (this.adapter) as Fa365;

		this.electricityHashes = new Set();
		this.electricityNames = [];

		// this.sensorEingangtuer = new SensorsFactory().GetSensorOpenAeon(this, "NODE30");
		this.sensorsOpens = new Map<number, ISensorOpen>();
	}

	public async Initialize(): Promise<void> {
		/*
			Creation of home configuration rooms/devices/channels
		*/
		await this.adapterCurrent.setObjectAsync(globalConsts.hostWettstettenUri, {
			type: "channel",
			common: {
				name: globalConsts.hostWettstettenName
			},
			native: {},
		});
		await this.adapterCurrent.setObjectAsync(globalConsts.roomWohnungEingangUri, {
			type: "channel",
			common: {
				name: globalConsts.roomWohnungEingangName,
				role: globalConsts.roleRoom
			},
			native: {},
		});
		await this.adapterCurrent.setObjectAsync(globalConsts.channelWohnungEingangTuerUri, {
			type: "channel",
			common: {
				name: globalConsts.channelTuerName
			},
			native: {},
		});
		/*
		await this.adapterCurrent.setObjectAsync(globalConsts.channelWohnungEingangTuerStateOpenedUri, {
			type: "state",
			common: {
				name: globalConsts.stateOpenedName,
				type: "number",
				role: "indicator",
				read: true,
				write: false
			},
			native: {},
		});
		*/
		await this.adapterCurrent.setObjectAsync(globalConsts.hauszaehlerUri, {
			type: "device",
			common: {
				name: globalConsts.hauszaehlerName
			},
			native: {},
		});
		// wechselstrom
		await this.adapterCurrent.setObjectAsync(globalConsts.hauszaehlerWechselstromUri, {
			type: "channel",
			common: {
				name: globalConsts.wechselstromName
			},
			native: {},
		});
		await this.adapterCurrent.setObjectAsync(globalConsts.hauptzaehlerWechselstromUri, {
			type: "state",
			common: {
				name: globalConsts.hauptzaehlerName,
				type: "number",
				role: "indicator",
				read: true
			},
			native: {},
		});

		this.adapterCurrent.log.info(`Before register`);
		for (let item of this.sensorsOpens.values()) {
			await item.Register(this.adapterCurrent);
		}
		this.adapterCurrent.log.info(`after register`);
	}

	private addDeviceOpenSensor(
		paramSensor: ISensorOpen
	): void {
		this.sensorsOpens.set(paramSensor.SourceEventHash, paramSensor);
		this.adapterCurrent.subscribeForeignStates(paramSensor.Fqnn);
		this.adapterCurrent.log.info(`Event: ${paramSensor.Fqnn}`);
	}

	private async subscribeSensorsOpen(): Promise<void> {
		this.addDeviceOpenSensor(
			new SensorsFactory().GetSensorOpenAeon(this.adapterCurrent.config.zwaveInstanceName, "NODE30"));
		this.adapterCurrent.log.info(`After set`);
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
				// this.adapterCurrent.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
				await this.adapterCurrent.setStateAsync(
					globalConsts.hauptzaehlerWechselstromUri,
					{ val: await this.getWechselstromTotal(), ack: true }
				);
			} else {
				if (this.sensorsOpens.has(hashState)) {
					this.adapterCurrent.log.info(`Eingangtur opened`);
				}
			}
		}
	}
}