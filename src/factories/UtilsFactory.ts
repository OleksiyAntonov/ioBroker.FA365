import { IUtilsFactory } from "../interfaces/factories/IUtilsFactory";
import { IDateTimeUtils } from "../interfaces/IDateTimeUtils";

import { DateTimeUtils } from "../classes/DateTimeUtils";

export class UtilsFactory implements IUtilsFactory {
    GetDateTimeUtils(): IDateTimeUtils {
        return new DateTimeUtils();
    }
}
