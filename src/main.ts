import { Adapter } from "@iobroker/adapter-core";

import { IAdapterReactor } from "./interfaces/IAdapterReactor";
import { AdapterReactorFactory } from "./factories/AdapterReactorFactory";

// tslint:disable-next-line: typedef
const stringHash = require("string-hash");

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ioBroker {
		// tslint:disable-next-line: interface-name
		interface AdapterConfig {
			// define the shape of your options here (recommended)
			zwaveInstanceName: string;
			hueInstanceName: string;
			// or use a catch-all approach
			[key: string]: any;
		}
	}
}

export class Fa365 extends Adapter {

	adapterReactor: IAdapterReactor;

	public constructor(options: Partial<ioBroker.AdapterOptions> = {}) {
		super({
			...options,
			name: "fa365",
		});

		this.adapterReactor = (new AdapterReactorFactory()).GetAdapterReactor(this);

		this.on("ready", this.onReady.bind(this));
		this.on("objectChange", this.onObjectChange.bind(this));
		// this.on("stateChange", this.onStateChange.bind(this));
		this.on("stateChange", this.adapterReactor.onStateChange.bind(this));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));

	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	private async onReady(): Promise<void> {
		// initialize your adapter here

		// the adapters config (in the instance object everything under the attribute "native") is accessible via
		// this.config:

		this.log.info("Z-Wave instance used: " + this.config.zwaveInstanceName);
		this.log.info("Philips Hue instance used: " + this.config.hueInstanceName);

		/*
		For every state in the system there has to be also an object of type state
		Here a simple template for a boolean variable named "testVariable"
		Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
		*/
		await this.setObjectAsync("testVariable", {
			type: "state",
			common: {
				name: "testVariable",
				type: "boolean",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		// in this template all states changes inside the adapters namespace are subscribed
		this.subscribeStates("*");

		// this.subscribeForeignStates("zwave.0.NODE24.METER.Electric_-_W_1");
		// this.subscribeForeignStates("zwave.0.NODE8.SENSOR_MULTILEVEL.Power_1");
		this.adapterReactor.Subscribe();

		/*
		setState examples
		you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
		*/
		// the variable testVariable is set to true as command (ack=false)
		await this.setStateAsync("testVariable", true);

		// same thing, but the value is flagged "ack"
		// ack should be always set to true if the value is received from or acknowledged from the target system
		await this.setStateAsync("testVariable", { val: true, ack: true });

		// same thing, but the state is deleted after 30s (getState will return null afterwards)
		await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });

		// this.subscribeForeignStates(this.config.hueInstanceName));

		// examples for the checkPassword/checkGroup functions
		let result = await this.checkPasswordAsync("admin", "iobroker");
		this.log.info("check user admin pw iobroker: " + result);

		result = await this.checkGroupAsync("admin", "admin");
		this.log.info("check group user admin group admin: " + result);
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 */
	private onUnload(callback: () => void): void {
		try {
			this.log.info("cleaned everything up...");
			callback();
		} catch (e) {
			callback();
		}
	}

	/**
	 * Is called if a subscribed object changes
	 */
	private onObjectChange(id: string, obj: ioBroker.Object | null | undefined): void {
		if (obj) {
			// the object was changed
			this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
		} else {
			// the object was deleted
			this.log.info(`object ${id} deleted`);
		}
	}

	/**
	 * Is called if a subscribed state changes
	 */
	private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
		const hashState: number = stringHash(id);
		if (state) {
			this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
		}
	}

	// /**
	//  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
	//  * Using this method requires "common.message" property to be set to true in io-package.json
	//  */
	// private onMessage(obj: ioBroker.Message): void {
	// 	if (typeof obj === "object" && obj.message) {
	// 		if (obj.command === "send") {
	// 			// e.g. send email or pushover or whatever
	// 			this.log.info("send command");

	// 			// Send response in callback if required
	// 			if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
	// 		}
	// 	}
	// }

}

if (module.parent) {
	// export the constructor in compact mode
	module.exports = (options: Partial<ioBroker.AdapterOptions> | undefined) => new Fa365(options);
} else {
	// otherwise start the instance directly
	(() => new Fa365())();
}