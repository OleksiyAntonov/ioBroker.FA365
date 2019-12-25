import { IInitiator } from "./IInitiator";
import { Fa365 } from "../main";

export interface ISensorOpen {
	readonly ChannelName: string;
	/*
		Return full qualified node name (FQNN)
		exact name of event based on type of sensor
	*/
	readonly Fqnn: string;
	readonly SourceEventHash: number;
	readonly StateText: string;

	ConvertState(paramState: ioBroker.State): boolean;
	Handle(
		paramAdapter: Fa365,
		paramState: ioBroker.State
	): Promise<void>;
	Notify(
		paramAdapter: Fa365
	): Promise<void>;
	Register(paramAdapter: Fa365): Promise<void>;
	UpdateState(
		paramAdapter: Fa365,
		paramState: ioBroker.State
	): Promise<void>;
}