import { INotificationIo } from "../interfaces/INotificationIo";
import { INotificationIoChannel } from "../interfaces/INotificationIoChannel";

export class NotificationIoChannelTelegram implements INotificationIoChannel {
    constructor(
        paramTelegramInstanceName: string,
        paramTelegramChatId: string
    ) {
        //
    }

    public Send(paramNotification: INotificationIo): void {
        /*
        function NotificationEmailObjectComposeSubject(paramObject) {
            return emailKey + " " + paramObject.Initiator + "@" + paramObject.State;
        }

        /*
            sendTo(emailTarget, {
                from: emailAddressFrom,
                to: emailAddressTo,
                subject: NotificationEmailObjectComposeSubject(paramObject),
                text: NotificationObjectComposeBody(paramObject, SensorOpenObjectTimeStampDiffToString(paramObject))
            });
*/
    }
}