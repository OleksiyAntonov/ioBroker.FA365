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
	private electricityHashes: Set<number>;
	private electricityNames: string[];

	protected adapterCurrent: Fa365;

	public get Adapter(): unknown {
		return this.adapter;
	}

	constructor(paramAdapter: unknown) {
		this.adapter = paramAdapter;
		this.adapterCurrent = (this.adapter) as Fa365;

		this.electricityHashes = new Set();
		this.electricityNames = [];
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
				role: "indicator",
				read: true
			},
			native: {},
		});
	}

	public Subscribe(): void {
		this.electricityNames.push("zwave.0.NODE23.SENSOR_MULTILEVEL.Power_1");
		this.electricityNames.push("zwave.0.NODE24.METER.Electric_-_W_1");
		this.electricityNames.push("zwave.0.NODE33.METER.Electric_-_W_1");
		this.electricityNames.push("zwave.0.NODE2.SENSOR_MULTILEVEL.Power_1");
		this.electricityNames.push("zwave.0.NODE22.SENSOR_MULTILEVEL.Power_1");
		this.electricityNames.push("zwave.0.NODE40.SENSOR_MULTILEVEL.Power_1");
		this.electricityNames.push("zwave.0.NODE8.SENSOR_MULTILEVEL.Power_1");

		for (let item of this.electricityNames) {
			this.adapterCurrent.subscribeForeignStates(item);
			this.electricityHashes.add(stringHash(item));
		}
	}

	private async getWechselstrom(paramStateName: string): Promise<number> {
		let stateWechselstrom =
			await this.adapterCurrent.getForeignStateAsync(paramStateName);
		return stateWechselstrom ? stateWechselstrom.val : 0;
	}

	private async getWechselstromTotal(): Promise<number> {
		let currentWechselstrom: number = 0;

		for (let item of this.electricityNames) {
			currentWechselstrom += await this.getWechselstrom(item);
		}

		return currentWechselstrom;
		// this.adapterCurrent.log.info(`Total: ${currentWechselstrom}`);
	}

	public async onStateChange(
		id: string,
		state: ioBroker.State | null | undefined
	): Promise<void> {
		const hashState: number = stringHash(id);
		if (state && this.electricityHashes.has(hashState)) {
			this.adapterCurrent.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);

			await this.adapterCurrent.setStateAsync(
				"hauszaehler.wechselstrom.hauptzaeler",
				{ val: await this.getWechselstromTotal(), ack: true }
			);
		}
	}
}