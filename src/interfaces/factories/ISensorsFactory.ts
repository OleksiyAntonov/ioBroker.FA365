import { ISensorOpen } from "../ISensorOpen";

export interface ISensorsFactory {
    GetSensorOpenAeon(
		paramAdapter: unknown,
		paramNodeName: string
	): ISensorOpen;
    GetSensorOpenFibaro(
		paramAdapter: unknown,
		paramNodeName: string
	): ISensorOpen;
}
