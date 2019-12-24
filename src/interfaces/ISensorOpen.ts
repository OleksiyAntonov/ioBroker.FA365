import { IInitiator } from "./IInitiator";
export interface ISensorOpen {
	readonly Initiator: IInitiator | null;
	readonly RootUri: string;
	readonly State: boolean;

	SetState(paramState: boolean | number): void;

	/*
		Register global state for the sensor
	*/
	Register(): Promise<void>;

	/*
		Subscribe to source events (by initiator)
	*/
	Subscribe(
		paramZwaveInstanceName: string
	): Promise<number>;

	/*
		Return full qualified node name (FQNN)
			exact name of event based on type of sensor
	*/
	GetFqnn(
		paramInstanceId: string,	// example: zwave.0
		paramNodeId: string			// example: NODE25
	): string;
}