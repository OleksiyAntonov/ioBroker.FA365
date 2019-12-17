import * as globalConsts from "../consts/GlobalConsts";

import { IAdapterReactor } from "../interfaces/IAdapterReactor";

import { Fa365 } from "../main";

export class AdapterReactor implements IAdapterReactor {

    private adapter: unknown;

    protected adapterCurrent: Fa365;

    public get Adapter(): unknown {
        return this.adapter;
    }

    constructor(paramAdapter: unknown) {
        this.adapter = paramAdapter;
        this.adapterCurrent = (this.adapter) as Fa365;
    }

    public Subscribe(): void {
		this.adapterCurrent.subscribeForeignStates("hue-extended.0.groups.008-arbeitszimmer.action.on");
    }

}