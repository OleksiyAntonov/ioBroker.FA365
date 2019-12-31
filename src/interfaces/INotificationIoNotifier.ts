import { INotificationIo } from "./INotificationIo";
import { INotificationIoChannel } from "./INotificationIoChannel";

export interface INotificationIoNotifier {
	readonly Channels: Set<INotificationIoChannel>;
	Notify(
		paramNotificationIo: INotificationIo
	): Promise<void>;
}
