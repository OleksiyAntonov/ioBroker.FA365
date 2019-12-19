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

	protected adapterCurrent: Fa365;

	public get Adapter(): unknown {
		return this.adapter;
	}

	constructor(paramAdapter: unknown) {
		this.adapter = paramAdapter;
		this.adapterCurrent = (this.adapter) as Fa365;
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
/*		await this.adapterCurrent.setObjectAsync("hauszaehler.wechselstrom.hauptzaeler", {
			type: "state",
		common: {
			name: "hauptzaeler",
			type: "boolean",
			role: "indicator",
			read: true,
			write: true,
		},
		native: {},
	});*/

}

	public Subscribe(): void {
		// this.subscribeForeignStates("zwave.0.NODE24.METER.Electric_-_W_1");
		// this.subscribeForeignStates("zwave.0.NODE8.SENSOR_MULTILEVEL.Power_1");

		this.adapterCurrent.subscribeForeignStates("hue-extended.0.groups.008-arbeitszimmer.action.on");
	}

	public onStateChange(id: string, state: ioBroker.State | null | undefined): void {
		const hashState: number = stringHash(id);
		if (state && this.adapterCurrent) {
			this.adapterCurrent.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
		}
	}

}