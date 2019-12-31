import { ISensorOpen } from "../ISensorOpen";
import { INotificationIoNotifier } from "../INotificationIoNotifier";

export interface ISensorsFactory {
    GetSensorOpenAeon(
		paramRootUri: string,
		paramZwaveInstanceName: string,
		paramNodeName: string,
		paramChannelName: string,
		paramNotifier: INotificationIoNotifier
	): ISensorOpen;
    GetSensorOpenFibaro(
		paramRootUri: string,
		paramZwaveInstanceName: string,
		paramNodeName: string,
		paramChannelName: string,
		paramNotifier: INotificationIoNotifier
	): ISensorOpen;
}
