import { IAdapterReactor } from "../IAdapterReactor";

export interface IAdapterReactorFactory {
    GetAdapterReactor(paramAdapter: unknown): IAdapterReactor;
}
