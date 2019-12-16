import { ISensorOpen } from "../ISensorOpen";

export interface ISensorsFactory {
    GetSensorOpenAeon(paramRootUri: string): ISensorOpen;
    GetSensorOpenFibaro(paramRootUri: string): ISensorOpen;
}
