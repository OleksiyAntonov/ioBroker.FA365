import { ISensorOpen } from "../ISensorOpen";

export interface ISensorsFactory {
    GetSensorOpenAeon(
		paramRootUri: string,
		paramZwaveInstanceName: string,
		paramNodeName: string,
		paramChannelName: string
	): ISensorOpen;
    GetSensorOpenFibaro(
		paramRootUri: string,
		paramZwaveInstanceName: string,
		paramNodeName: string,
		paramChannelName: string
	): ISensorOpen;
}
