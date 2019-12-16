import * as driverConsts from "../consts/DriverConsts";
import * as globalConsts from "../consts/GlobalConsts";

import { IInitiator } from "../interfaces/IInitiator";
import { ISensorOpen } from "../interfaces/ISensorOpen";

export abstract class SensorOpen implements ISensorOpen {
    /*
    * Private fields
    */
    private rootUri: string;
    private initiatorId: number;
    private stateId: number;
    private initiator: IInitiator | null;
    private timestampDiff: number;
    private timestampPrevious: number;

    protected state: boolean;

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

    constructor(paramRootUri: string) {
        this.rootUri = paramRootUri;

        this.initiatorId = globalConsts.numUndefined;
        this.stateId = globalConsts.numUndefined;
        this.initiator = null;
        this.timestampDiff = globalConsts.numZero;
        this.timestampPrevious = globalConsts.numZero;

        this.state = false;
    }

    // implementation of ISensorOpen
    public Register(paramIrl: string): void {
        //
    }

    public get State(): boolean {
        return this.state;
    }

    public abstract SetState(paramState: boolean | number): void;

}