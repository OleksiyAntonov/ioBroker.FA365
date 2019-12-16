import "mocha";

import * as aeonConsts from "../../src/consts/AeonConsts";
import { SensorsFactory } from "../../src/factories/SensorsFactory";
import { ISensorOpen } from "../../src/interfaces/ISensorOpen";

import assert = require("assert");

describe("SensorOpenAeon", () => {

    it("ctx", () => {
        const testUri: string = "http://rootURI";
        const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenAeon(testUri);
        assert.equal(test.RootUri, testUri);
    });

    it("SetState [+] true", () => {
        const testUri: string = "http://rootURI";
        const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenAeon(testUri);

        test.SetState(aeonConsts.SensorOpenStateOpened);
        assert.equal(test.State, true);
    });

    it("SetState [+] false", () => {
        const testUri: string = "http://rootURI";
        const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenAeon(testUri);

        test.SetState(aeonConsts.SensorOpenStateClosed);
        assert.equal(test.State, false);
    });

    it("SetState [-] false", () => {
        const testUri: string = "http://rootURI";
        const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenAeon(testUri);

        test.SetState(32);
        assert.equal(test.State, false);
    });
});
