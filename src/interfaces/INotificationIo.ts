import { ISensorOpen } from "./ISensorOpen";

export interface INotificationIo {
    ComposeBody(
        paramSensorOpen: ISensorOpen,
        paramTimeStart: Date,
        paramTimeEnd: Date
    ): string;
    ComposeHeader(
        paramSensorOpen: ISensorOpen,
        paramTimeStart: Date,
        paramTimeEnd: Date
    ): string;
}
