import { SensorOpenAeon } from "../classes/SensorOpenAeon";
import { SensorOpenFibaro } from "../classes/SensorOpenFibaro";
import { ISensorsFactory } from "../interfaces/factories/ISensorsFactory";
import { ISensorOpen } from "../interfaces/ISensorOpen";
import { INotificationIoNotifier } from "../interfaces/INotificationIoNotifier";

export class SensorsFactory implements ISensorsFactory {
	GetSensorOpenAeon(
		paramRootUri: string,
		paramZwaveInstanceName: string,
		paramNodeName: string,
		paramChannelName: string,
		paramNotifier: INotificationIoNotifier
	): ISensorOpen {
		return new SensorOpenAeon(
			paramRootUri,
			paramZwaveInstanceName,
			paramNodeName,
			paramChannelName,
			paramNotifier
		);
	}

	GetSensorOpenFibaro(
		paramRootUri: string,
		paramZwaveInstanceName: string,
		paramNodeName: string,
		paramChannelName: string,
		paramNotifier: INotificationIoNotifier
	): ISensorOpen {
		return new SensorOpenFibaro(
			paramRootUri,
			paramZwaveInstanceName,
			paramNodeName,
			paramChannelName,
			paramNotifier
		);
	}
}
