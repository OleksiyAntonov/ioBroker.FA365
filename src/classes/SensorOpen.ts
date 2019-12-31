// tslint:disable-next-line: typedef
const stringHash = require("string-hash");

import * as driverConsts from "../consts/DriverConsts";
import * as globalConsts from "../consts/GlobalConsts";

import { IInitiator } from "../interfaces/IInitiator";
import { ISensorOpen } from "../interfaces/ISensorOpen";

import { Fa365 } from "../main";
import { INotificationIoNotifier } from "../interfaces/INotificationIoNotifier";

export abstract class SensorOpen implements ISensorOpen {
	/*
    * Private fields
    */
	private readonly sourceUri: string;
	private readonly rootUri: string;
	private readonly channelName: string;
	private readonly notifier: INotificationIoNotifier;
	private state: boolean;

	protected abstract getSensorSourceEventName(): string;

	protected get stateUri(): string {
		return `${this.rootUri}.${globalConsts.stateOpenedName}`;
	}

	protected get stateTextUri(): string {
		return `${this.rootUri}.${globalConsts.stateOpenedTextName}`;
	}

	public get ChannelName(): string {
		return this.channelName;
	}

	public get RootUri(): string {
		return this.rootUri;
	}

	public get StateText(): string {
		return (this.state) ? globalConsts.sensorStatusOpenedText : globalConsts.sensorStatusClosedText;
	}

	public get Fqnn(): string {
		return `${this.sourceUri}.${this.getSensorSourceEventName()}`;
	}

	public get SourceEventHash(): number {
		return stringHash(this.Fqnn);
	}

	constructor(
		paramRootUri: string,
		paramZwaveInstanceName: string,
		paramNodeName: string,
		paramChannelName: string,
		paramNotifier: INotificationIoNotifier
	) {
		this.sourceUri = `${paramZwaveInstanceName}.${paramNodeName}`;
		this.rootUri = `${paramRootUri}`;
		this.channelName = paramChannelName;
		this.notifier = paramNotifier;

		this.state = false;
	}

	// implementation of ISensorOpen
	public async Register(paramAdapter: Fa365): Promise<void> {
		await paramAdapter.setObjectAsync(this.stateUri, {
			type: "state",
			common: {
				name: globalConsts.stateOpenedName,
				type: "boolean",
				role: "indicator",
				read: true,
				write: false
			},
			native: {},
		});
		await paramAdapter.setObjectAsync(this.stateTextUri, {
			type: "state",
			common: {
				name: globalConsts.stateOpenedName,
				type: "string",
				role: "indicator",
				read: true,
				write: false
			},
			native: {},
		});
	}

	public async Notify(): Promise<void> {
		if (this.state === globalConsts.sensorStatusClosed) {
			// TODO: this.notifier.Notify();
			// NotificationEmailObjectSend(processedObject);
			// if (paramEnableChat === true) {
			//	NotificationTelegramObjectSend(processedObject);
		}
	}

	public async Handle(
		paramAdapter: Fa365,
		paramState: ioBroker.State
	): Promise<void> {
		await this.UpdateState(paramAdapter, paramState);
		await this.Notify();
	}

	public async UpdateState(
		paramAdapter: Fa365,
		paramState: ioBroker.State
	): Promise<void> {
		this.state = this.ConvertState(paramState);
		await paramAdapter.setStateAsync(this.stateUri, this.state);
		await paramAdapter.setStateAsync(this.stateTextUri, this.StateText);
	}

	public abstract ConvertState(paramState: ioBroker.State): boolean;
}