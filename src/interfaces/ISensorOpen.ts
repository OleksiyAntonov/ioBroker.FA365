import { Fa365 } from "../main";

export interface ISensorOpen {
	readonly ChannelName: string;

	// return full qualified node name(FQNN)
	// exact name of event based on type of sensor
	readonly Fqnn: string;

	// Root Uri of target smartHome instance inside adapter
	// fa365.0
	readonly RootUri: string;

	readonly SourceEventHash: number;
	readonly StateText: string;

	ConvertState(paramState: ioBroker.State): boolean;
	Handle(
		paramAdapter: Fa365,
		paramState: ioBroker.State
	): Promise<void>;
	Notify(): Promise<void>;
	Register(paramAdapter: Fa365): Promise<void>;
	UpdateState(
		paramAdapter: Fa365,
		paramState: ioBroker.State
	): Promise<void>;
}