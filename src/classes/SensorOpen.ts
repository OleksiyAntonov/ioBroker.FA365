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
    private readonly nodeName: string;

	private readonly adapter: unknown;
	protected readonly adapterCurrent: Fa365;

	private rootUri: string;
	private initiatorId: number;
	private stateId: number;
	private initiator: IInitiator | null;
	private timestampDiff: number;
	private timestampPrevious: number;

	protected state: boolean;

	protected abstract getSensorEventName(): string;

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

	constructor(
		paramAdapter: unknown,
		paramNodeName: string
	) {
		this.nodeName = paramNodeName;

		this.adapter = paramAdapter;
		this.adapterCurrent = (this.adapter) as Fa365;

		this.rootUri = "paramRootUri";

		this.initiatorId = globalConsts.numUndefined;
		this.stateId = globalConsts.numUndefined;
		this.initiator = null;
		this.timestampDiff = globalConsts.numZero;
		this.timestampPrevious = globalConsts.numZero;

		this.state = false;
	}

	// implementation of ISensorOpen
	public async Register(): Promise<void> {
		await this.adapterCurrent.setObjectAsync("sensor.eingangtuer.opened", {
			type: "state",
			common: {
				name: "opened",
				type: "boolean",
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

	public async Subscribe(
		paramHashes: Set<number>
	): Promise<void> {
		const eventName: string = this.GetFqnn(
			this.adapterCurrent.config.zwaveInstanceName,
			this.nodeName
		);
		await this.adapterCurrent.subscribeForeignStatesAsync(eventName);
		paramHashes.add(stringHash(eventName));
	}

	public GetFqnn(
		paramInstanceId: string,
		paramNodeId: string
	): string {
		const eventName: string = this.getSensorEventName();
		return `${paramInstanceId}.${paramNodeId}.${eventName}`;
	}

}