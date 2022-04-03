import { INotificationIo } from "../interfaces/INotificationIo";
import { ISensorOpen } from "../interfaces/ISensorOpen";

export class NotificationIo implements INotificationIo {
	private DateTimeUtilsNow(): string {
		const currentDate: Date = new Date(Date.now());
		return currentDate.toString();
	}

	private TimeStampDiff(
		paramTimeStart: Date,
		paramTimeEnd: Date
	): string {
		return "";
	}

	public ComposeBody(
		paramSensorOpen: ISensorOpen,
		paramTimeStart: Date,
		paramTimeEnd: Date
	): string {
		const message: string =
			paramSensorOpen.ChannelName
            + " ist "
            + paramSensorOpen.StateText
            + ": "
            + this.DateTimeUtilsNow()
            + " opened for "
            + this.TimeStampDiff(paramTimeStart, paramTimeEnd)
            + " seconds";

		return message;
	}

	public ComposeHeader(
		paramSensorOpen: ISensorOpen,
		paramTimeStart: Date,
		paramTimeEnd: Date
	): string {
		//
		return "";
	}
}