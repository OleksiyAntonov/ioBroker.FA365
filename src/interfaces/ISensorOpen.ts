import { IInitiator } from "./IInitiator";

export interface ISensorOpen {
    readonly Initiator: IInitiator | null;
    readonly RootUri: string;
    readonly State: boolean;

    Register(paramIrl: string): void;
    SetState(paramState: boolean | number): void;
}