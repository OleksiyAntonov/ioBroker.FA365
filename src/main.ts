import { Adapter } from "@iobroker/adapter-core";

import { IAdapterReactor } from "./interfaces/IAdapterReactor";
import { AdapterReactorFactory } from "./factories/AdapterReactorFactory";

declare global {

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
		this.on("stateChange", this.adapterReactor.onStateChange.bind(this.adapterReactor));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));
	}

	private async onReady(): Promise<void> {
		await this.adapterReactor.Initialize();
		await this.adapterReactor.Subscribe();

		// this.subscribeStates("*");

		// examples for the checkPassword/checkGroup functions
		// tslint:disable-next-line: typedef
		/*
		let result = await this.checkPasswordAsync("admin", "iobroker");
		this.log.info("check user admin pw iobroker: " + result);

		result = await this.checkGroupAsync("admin", "admin");
		this.log.info("check group user admin group admin: " + result);
		*/
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