import { SensorOpenAeon } from "../classes/SensorOpenAeon";
import { SensorOpenFibaro } from "../classes/SensorOpenFibaro";
import { ISensorsFactory } from "../interfaces/factories/ISensorsFactory";
import { ISensorOpen } from "../interfaces/ISensorOpen";

export class SensorsFactory implements ISensorsFactory {
    GetSensorOpenAeon(paramRootUri: string): ISensorOpen {
        return new SensorOpenAeon(
            paramRootUri
        );
    }

    GetSensorOpenFibaro(paramRootUri: string): ISensorOpen {
        return new SensorOpenFibaro(
            paramRootUri
        );
    }
}
