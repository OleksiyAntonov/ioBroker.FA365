import { IAdapterReactorFactory } from "../interfaces/factories/IAdapterReactorFactory";
import { IAdapterReactor } from "../interfaces/IAdapterReactor";

import { AdapterReactor } from "../classes/AdapterReactor";

export class AdapterReactorFactory implements IAdapterReactorFactory {
    GetAdapterReactor(paramAdapter: unknown): IAdapterReactor {
        return new AdapterReactor(paramAdapter);
    }
}
