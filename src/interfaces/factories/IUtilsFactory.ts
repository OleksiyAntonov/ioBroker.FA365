import { IDateTimeUtils } from "../IDateTimeUtils";

export interface IUtilsFactory {
    GetDateTimeUtils(): IDateTimeUtils;
}
