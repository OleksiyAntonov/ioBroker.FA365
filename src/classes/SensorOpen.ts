// tslint:disable-next-line: typedef
const stringHash = require("string-hash");

import * as driverConsts from "../consts/DriverConsts";
import * as globalConsts from "../consts/GlobalConsts";

import { IInitiator } from "../interfaces/IInitiator";
import { ISensorOpen } from "../interfaces/ISensorOpen";

import { Fa365 } from "../main";

export abstract class SensorOpen implements ISensorOpen {
	/*
    * Private fields
    */
    private readonly sourceUri: string;

	private rootUri: string;
	private initiatorId: number;
	private stateId: number;
	private initiator: IInitiator | null;
	private timestampDiff: number;
	private timestampPrevious: number;

	protected state: boolean;

	protected abstract getSensorSourceEventName(): string;

	protected get irlInitiator(): string {
		return this.rootUri + driverConsts.objectInitiator;
	}
	protected get irlInitiatorId(): string {
		return this.rootUri + driverConsts.objectInitiatorId;
	}
	protected get irlState(): string {
		return this.rootUri + driverConsts.objectState;
	}
	protected get irlStateId(): string {
		return this.rootUri + driverConsts.objectStateId;
	}
	protected get irlTimestamp(): string {
		return this.rootUri + driverConsts.objectTimestamp;
	}
	protected get irlLatestChange(): string {
		return this.rootUri + driverConsts.objectLatestChange;
	}

	public get RootUri(): string {
		return this.rootUri;
	}
	public get InitiatorId(): number {
		return this.initiatorId;
	}
	public get StateId(): number {
		return this.stateId;
	}
	public get Initiator(): IInitiator | null {
		return this.initiator;
	}
	public get TimestampDiff(): number {
		return this.timestampDiff;
	}
	public get TimestampPrevious(): number {
		return this.timestampPrevious;
	}

	public get Fqnn(): string {
		return `${this.sourceUri}.${this.getSensorSourceEventName()}`;
	}

	public get SourceEventHash(): number {
		return stringHash(this.Fqnn);
	}

	constructor(
		paramZwaveInstanceName: string,
		paramNodeName: string
	) {
		this.sourceUri = `${paramZwaveInstanceName}.${paramNodeName}`;

		this.rootUri = "paramRootUri";

		this.initiatorId = globalConsts.numUndefined;
		this.stateId = globalConsts.numUndefined;
		this.initiator = null;
		this.timestampDiff = globalConsts.numZero;
		this.timestampPrevious = globalConsts.numZero;

		this.state = false;
	}

	// implementation of ISensorOpen
	public async Register(paramAdapter: Fa365): Promise<void> {
		await paramAdapter.setObjectAsync(globalConsts.channelWohnungEingangTuerStateOpenedUri, {
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
	}

	public get State(): boolean {
		// return this.state;
		return false;
	}

	public abstract SetState(paramState: boolean | number): void;
}