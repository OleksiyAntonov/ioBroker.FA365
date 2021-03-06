﻿// company: Fibaro
// model: Door/ Window Sensor FGK-10X
// https://products.z-wavealliance.org/products/1356/configs

import * as fibaroConsts from "../consts/FibaroConsts";
import { SensorOpen } from "./SensorOpen";

export class SensorOpenFibaro extends SensorOpen {

	protected getSensorSourceEventName(): string {
		return fibaroConsts.SensorOpenStateName;
	}

	public ConvertState(paramState: ioBroker.State): boolean {
		return (paramState.val === fibaroConsts.SensorOpenStateOpened);
	}
}