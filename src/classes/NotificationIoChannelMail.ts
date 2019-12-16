import { INotificationIo } from "../interfaces/INotificationIo";
import { INotificationIoChannel } from "../interfaces/INotificationIoChannel";

export class NotificationIoChannelMail implements INotificationIoChannel {
    constructor(
        paramInstanceName: string,
        paramAddressFrom: string,
        paramAddressTo: string,
        paramKey: string
    ) {
        //
    }
    public Send(paramNotification: INotificationIo): void {
        /*function NotificationEmailObjectComposeSubject(paramObject) {
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