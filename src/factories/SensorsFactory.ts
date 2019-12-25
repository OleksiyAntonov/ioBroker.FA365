import { SensorOpenAeon } from "../classes/SensorOpenAeon";
import { SensorOpenFibaro } from "../classes/SensorOpenFibaro";
import { ISensorsFactory } from "../interfaces/factories/ISensorsFactory";
import { ISensorOpen } from "../interfaces/ISensorOpen";

export class SensorsFactory implements ISensorsFactory {
    GetSensorOpenAeon(
		paramZwaveInstanceName: string,
		paramNodeName: string
	): ISensorOpen {
        return new SensorOpenAeon(
			paramZwaveInstanceName,
			paramNodeName
        );
    }

    GetSensorOpenFibaro(
		paramZwaveInstanceName: string,
		paramNodeName: string
	): ISensorOpen {
        return new SensorOpenFibaro(
			paramZwaveInstanceName,
			paramNodeName
        );
    }
}
