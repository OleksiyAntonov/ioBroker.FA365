// tslint:disable-next-line: typedef
const stringHash = require("string-hash");

import * as globalConsts from "../consts/GlobalConsts";

import { IAdapterReactor } from "../interfaces/IAdapterReactor";

import { Fa365 } from "../main";

export class AdapterReactor implements IAdapterReactor {

	/*
	  this.log.info("Z-Wave instance used: " + this.config.zwaveInstanceName);
	  this.log.info("Philips Hue instance used: " + this.config.hueInstanceName);
	*/

	private adapter: unknown;
	private electricity: Set<number>;

	protected adapterCurrent: Fa365;

	public get Adapter(): unknown {
		return this.adapter;
	}

	constructor(paramAdapter: unknown) {
		this.adapter = paramAdapter;
		this.adapterCurrent = (this.adapter) as Fa365;

		this.electricity = new Set();
	}

	public async Initialize(): Promise<void> {

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
				read: true
			},
			native: {},
		});
	}

	public Subscribe(): void {
		// this.subscribeForeignStates("zwave.0.NODE24.METER.Electric_-_W_1");
		// this.subscribeForeignStates("zwave.0.NODE8.SENSOR_MULTILEVEL.Power_1");

		this.adapterCurrent.subscribeForeignStates("hue-extended.0.groups.008-arbeitszimmer.action.on");

		this.adapterCurrent.subscribeForeignStates("zwave.0.NODE23.SENSOR_MULTILEVEL.Power_1");
		this.adapterCurrent.subscribeForeignStates("zwave.0.NODE24.METER.Electric_-_W_1");
		this.adapterCurrent.subscribeForeignStates("zwave.0.NODE33.METER.Electric_-_W_1");
		this.adapterCurrent.subscribeForeignStates("zwave.0.NODE2.SENSOR_MULTILEVEL.Power_1");
		this.adapterCurrent.subscribeForeignStates("zwave.0.NODE22.SENSOR_MULTILEVEL.Power_1");
		this.adapterCurrent.subscribeForeignStates("zwave.0.NODE40.SENSOR_MULTILEVEL.Power_1");
		this.adapterCurrent.subscribeForeignStates("zwave.0.NODE8.SENSOR_MULTILEVEL.Power_1");

		this.electricity.add(stringHash("zwave.0.NODE23.SENSOR_MULTILEVEL.Power_1"));
		this.electricity.add(stringHash("zwave.0.NODE24.METER.Electric_-_W_1"));
		this.electricity.add(stringHash("zwave.0.NODE33.METER.Electric_-_W_1"));
		this.electricity.add(stringHash("zwave.0.NODE2.SENSOR_MULTILEVEL.Power_1"));
		this.electricity.add(stringHash("zwave.0.NODE22.SENSOR_MULTILEVEL.Power_1"));
		this.electricity.add(stringHash("zwave.0.NODE40.SENSOR_MULTILEVEL.Power_1"));
		this.electricity.add(stringHash("zwave.0.NODE8.SENSOR_MULTILEVEL.Power_1"));
	}

	private async getWechselstrom(paramStateName: string): Promise<number> {
		let stateWechselstrom =
			await this.adapterCurrent.getForeignStateAsync(paramStateName);
		return stateWechselstrom ? stateWechselstrom.val : 0;
	}

	private async getWechselstromTotal(): Promise<void> {
		this.adapterCurrent.log.info(`Start Total`);
		let currentWechselstrom: number = 0;
		let counters: string[] = [];

		// getWechselstrom("zwave.0.NODE23.SENSOR_MULTILEVEL.Power_1")
		counters.push("zwave.0.NODE23.SENSOR_MULTILEVEL.Power_1");

		for (let item of counters) {
			currentWechselstrom += await this.getWechselstrom(item);
		}

		this.adapterCurrent.log.info(`Total: ${currentWechselstrom}`);
		// return currentWechselstrom;
		this.adapterCurrent.log.info(`End Total`);
	}

	public async onStateChange(
		id: string,
		state: ioBroker.State | null | undefined
	): Promise<void> {
		const hashState: number = stringHash(id);
		if (state && this.electricity.has(hashState)) {
			this.adapterCurrent.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);

			await this.getWechselstromTotal();
			// await this.adapterCurrent.setStateAsync("testVariable", { val: true, ack: true });
		}
	}
}