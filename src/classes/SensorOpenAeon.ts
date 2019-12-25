// company: Aeon
// model: Door/ Window Sensor 6 (ZW112-C)
// https://products.z-wavealliance.org/products/1615/configs

import * as aeonConsts from "../consts/AeonConsts";
import { SensorOpen } from "./SensorOpen";

export class SensorOpenAeon extends SensorOpen {

	protected getSensorSourceEventName(): string {
		return aeonConsts.SensorOpenStateName;
	}

	public ConvertState(paramState: ioBroker.State): boolean {
		return (paramState.val === aeonConsts.SensorOpenStateOpened);
	}
}