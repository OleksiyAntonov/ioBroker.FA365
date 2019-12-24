import { SensorOpenAeon } from "../classes/SensorOpenAeon";
import { SensorOpenFibaro } from "../classes/SensorOpenFibaro";
import { ISensorsFactory } from "../interfaces/factories/ISensorsFactory";
import { ISensorOpen } from "../interfaces/ISensorOpen";

export class SensorsFactory implements ISensorsFactory {
    GetSensorOpenAeon(
		paramAdapter: unknown,
		paramNodeName: string
	): ISensorOpen {
        return new SensorOpenAeon(
			paramAdapter,
			paramNodeName
        );
    }

    GetSensorOpenFibaro(
		paramAdapter: unknown,
		paramNodeName: string
	): ISensorOpen {
        return new SensorOpenFibaro(
			paramAdapter,
			paramNodeName
        );
    }
}
