import * as globalConsts from "../consts/GlobalConsts";

import { IInitiator } from "../interfaces/IInitiator";

export class Initiator implements IInitiator {
	private id: number;
	private code: globalConsts.initiators;

	constructor(paramCode: globalConsts.initiators) {
		this.code = paramCode;
		this.id = this.code;
	}

	public get Id(): number {
		return this.id;
	}

	public get Name(): string {
		return globalConsts.initiatorsNames[this.code - 1];
	}

	public get Code(): globalConsts.initiators {
		return this.code;
	}

	SaveToStorage(): void {
		//
	}

	RestoreFromStorage(): void {
		//
	}

}