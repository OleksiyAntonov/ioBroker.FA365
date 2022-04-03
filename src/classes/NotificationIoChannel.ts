import * as utils from "@iobroker/adapter-core";

import { INotificationIo } from "../interfaces/INotificationIo";
import { INotificationIoChannel } from "../interfaces/INotificationIoChannel";

abstract class NotificationIoChannel implements INotificationIoChannel {
	public abstract Send(paramNotification: INotificationIo): void;
}