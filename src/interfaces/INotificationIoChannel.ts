import { INotificationIo } from "./INotificationIo";

export interface INotificationIoChannel {
    Send(paramNotificationIo: INotificationIo): void;
}
