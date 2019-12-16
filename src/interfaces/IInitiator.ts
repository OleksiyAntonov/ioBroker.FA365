import * as globalConsts from "../consts/GlobalConsts";

export interface IInitiator {
    readonly Id: number;
    readonly Code: globalConsts.initiators;
    readonly Name: string;

    SaveToStorage(): void;
    RestoreFromStorage(): void;
}