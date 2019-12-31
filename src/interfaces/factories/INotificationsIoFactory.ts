import * as globalConsts from "../../consts/GlobalConsts";

import { IInitiator } from "../IInitiator";
import { INotificationIo } from "../INotificationIo";
import { INotificationIoChannel } from "../INotificationIoChannel";
import { INotificationIoNotifier } from "../INotificationIoNotifier";

export interface INotificationsIoFactory {
    GetInitiator(paramCode: globalConsts.initiators): IInitiator;

    GetNotificationIo(): INotificationIo;

    GetNotificationIoChannelMail(
        paramInstanceName: string,
        paramAddressFrom: string,
        paramAddressTo: string,
        paramKey: string
    ): INotificationIoChannel;
    GetNotificationIoChannelTelegram(
        paramTelegramInstanceName: string,
        paramTelegramChatId: string
	): INotificationIoChannel;

	GetNotificationIoNotifier(): INotificationIoNotifier;
}
