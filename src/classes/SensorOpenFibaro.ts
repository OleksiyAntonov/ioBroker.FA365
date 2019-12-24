// company: Fibaro
// model: Door/ Window Sensor FGK-10X
// https://products.z-wavealliance.org/products/1356/configs

import * as fibaroConsts from "../consts/FibaroConsts";
import { SensorOpen } from "./SensorOpen";

export class SensorOpenFibaro extends SensorOpen {

	protected getSensorEventName(): string {
		return fibaroConsts.SensorOpenStateName;
	}

	public SetState(paramState: boolean | number): void {
		this.state = (paramState === fibaroConsts.SensorOpenStateOpened);
	}
}