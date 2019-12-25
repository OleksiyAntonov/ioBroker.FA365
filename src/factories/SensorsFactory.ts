import { SensorOpenAeon } from "../classes/SensorOpenAeon";
import { SensorOpenFibaro } from "../classes/SensorOpenFibaro";
import { ISensorsFactory } from "../interfaces/factories/ISensorsFactory";
import { ISensorOpen } from "../interfaces/ISensorOpen";

export class SensorsFactory implements ISensorsFactory {
	GetSensorOpenAeon(
		paramRootUri: string,
		paramZwaveInstanceName: string,
		paramNodeName: string,
		paramChannelName: string
	): ISensorOpen {
		return new SensorOpenAeon(
			paramRootUri,
			paramZwaveInstanceName,
			paramNodeName,
			paramChannelName
		);
	}

	GetSensorOpenFibaro(
		paramRootUri: string,
		paramZwaveInstanceName: string,
		paramNodeName: string,
		paramChannelName: string
	): ISensorOpen {
		return new SensorOpenFibaro(
			paramRootUri,
			paramZwaveInstanceName,
			paramNodeName,
			paramChannelName
		);
	}
}
