import { EventEmitter } from "events";

import { INotificationIoChannel } from "../interfaces/INotificationIoChannel";
import { INotificationIoNotifier } from "../interfaces/INotificationIoNotifier";
import { INotificationIo } from "../interfaces/INotificationIo";

export class NotificationIoNotifier implements INotificationIoNotifier {
	private channels: Set<INotificationIoChannel>;

	public get Channels(): Set<INotificationIoChannel> {
		return this.channels;
	}

	public async Notify(
		paramNotificationIo: INotificationIo
	): Promise<void> {
		for (const channel of this.Channels) {
			channel.Send(paramNotificationIo);
		}
	}

	constructor() {
		this.channels = new Set<INotificationIoChannel>();
	}
}