export interface IDateTimeUtils {
    TimeStampDiffToString(
        paramLatestChange: number,
        paramCurrent: number
    ): string;
    NowString(): string;
}
