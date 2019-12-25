import { IInitiator } from "./IInitiator";
export interface ISensorOpen {
	readonly Initiator: IInitiator | null;
	readonly RootUri: string;
	readonly State: boolean;

	/*
		Return full qualified node name (FQNN)
			exact name of event based on type of sensor
	*/
	readonly Fqnn: string;
	readonly SourceEventHash: number;

	SetState(paramState: boolean | number): void;
}