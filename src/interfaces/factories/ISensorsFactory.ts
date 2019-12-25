import { ISensorOpen } from "../ISensorOpen";

export interface ISensorsFactory {
    GetSensorOpenAeon(
		paramZwaveInstanceName: string,
		paramNodeName: string
	): ISensorOpen;
    GetSensorOpenFibaro(
		paramZwaveInstanceName: string,
		paramNodeName: string
	): ISensorOpen;
}
