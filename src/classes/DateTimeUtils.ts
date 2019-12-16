import * as globalConsts from "../consts/GlobalConsts";
import { IDateTimeUtils } from "../interfaces/IDateTimeUtils";

export class DateTimeUtils implements IDateTimeUtils {

    private IsTimeStampsValid(
        paramLatestChange: number,
        paramCurrent: number
    ): boolean {
        // return (paramObject.Timestamp != numUndefined) && (paramObject.LatestChange != numUndefined);
        return (paramCurrent !== globalConsts.numUndefined) && (paramLatestChange !== globalConsts.numUndefined);
    }

    private TimeStampDiff(
        paramLatestChange: number,
        paramCurrent: number
    ): number {
        let result: number = globalConsts.numUndefined;
        if (this.IsTimeStampsValid(paramLatestChange, paramCurrent)) {
            result = paramCurrent - paramLatestChange;
        }
        return result;
    }

    private TimeStampDiffSeconds(
        paramLatestChange: number,
        paramCurrent: number
    ): number {
        let result: number = this.TimeStampDiff(paramLatestChange, paramCurrent);
        if (result !== globalConsts.numUndefined) {
            result = Math.round(result / 1000);
        }
        return result;
    }

    public NowString(): string {
        return (new Date(Date.now())).toString();
    }

    public TimeStampDiffToString(
        paramLatestChange: number,
        paramCurrent: number
    ): string {

        const diff: number = this.TimeStampDiffSeconds(paramLatestChange, paramCurrent);
        const hrs: number = Math.floor(diff / 3600);
        const mins: number = Math.floor((diff - (hrs * 3600)) / 60);
        const secs: number = diff - ((hrs * 3600) + (mins * 60));
        let result: string = globalConsts.stringEmpty;
        if (hrs !== 0) {
            if (hrs < 10) {
                result = result + "0";
            }
            result = hrs.toString();
        } else { result = "00"; }
        result = result + ":";
        if (mins !== 0) {
            if (mins < 10) {
                result = result + "0";
            }
            result = result + mins.toString();
        } else { result = result + "00"; }
        result = result + ":";
        if (secs !== 0) {
            if (secs < 10) {
                result = result + "0";
            }
            result = result + secs.toString();
        } else { result = result + "00"; }

        return result;
    }
}