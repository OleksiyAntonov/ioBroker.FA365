// company: Aeon
// model: Door/ Window Sensor 6 (ZW112-C)
// https://products.z-wavealliance.org/products/1615/configs

import * as aeonConsts from "../consts/AeonConsts";
import { SensorOpen } from "./SensorOpen";

export class SensorOpenAeon extends SensorOpen {

	protected getSensorEventName(): string {
		return aeonConsts.SensorOpenStateName;
	}

	public SetState(paramState: boolean | number): void {
		this.state = (paramState === aeonConsts.SensorOpenStateOpened);
	}
}