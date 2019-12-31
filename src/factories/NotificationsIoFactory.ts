import * as globalConsts from "../consts/GlobalConsts";

import { IInitiator } from "../interfaces/IInitiator";
import { INotificationIo } from "../interfaces/INotificationIo";
import { INotificationIoChannel } from "../interfaces/INotificationIoChannel";

import { INotificationsIoFactory } from "../interfaces/factories/INotificationsIoFactory";

import { Initiator } from "../classes/Initiator";
import { NotificationIo } from "../classes/NotificationIo";
import { NotificationIoChannelMail } from "../classes/NotificationIoChannelMail";
import { NotificationIoChannelTelegram } from "../classes/NotificationIoChannelTelegram";
import { INotificationIoNotifier } from "../interfaces/INotificationIoNotifier";
import { NotificationIoNotifier } from "../classes/NotificationIoNotifier";

export class NotificationsIoFactory implements INotificationsIoFactory {

	GetInitiator(paramCode: globalConsts.initiators): IInitiator {
		return new Initiator(paramCode);
	}

	GetNotificationIo(): INotificationIo {
		return new NotificationIo();
	}

	GetNotificationIoChannelMail(
		paramInstanceName: string,
		paramAddressFrom: string,
		paramAddressTo: string,
		paramKey: string
	): INotificationIoChannel {
		return new NotificationIoChannelMail(
			paramInstanceName,
			paramAddressFrom,
			paramAddressTo,
			paramKey
		);
	}
	GetNotificationIoChannelTelegram(
		paramTelegramInstanceName: string,
		paramTelegramChatId: string
	): INotificationIoChannel {
		return new NotificationIoChannelTelegram(
			paramTelegramInstanceName,
			paramTelegramChatId
		);
	}

	GetNotificationIoNotifier(): INotificationIoNotifier {
		return new NotificationIoNotifier();
	}
}
