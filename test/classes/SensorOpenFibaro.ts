import "mocha";

import * as fibaroConsts from "../../src/consts/FibaroConsts";
import { SensorsFactory } from "../../src/factories/SensorsFactory";
import { ISensorOpen } from "../../src/interfaces/ISensorOpen";

import assert = require("assert");

describe("SensorOpenFibaro", () => {

    it("ctx", () => {
        const testUri: string = "http://rootURI";
        const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenFibaro(testUri);
        assert.equal(test.RootUri, testUri);
    });

    it("SetState [+] true", () => {
        const testUri: string = "http://rootURI";
        const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenFibaro(testUri);

        test.SetState(fibaroConsts.SensorOpenStateOpened);
        assert.equal(test.State, true);
    });

    it("SetState [+] false", () => {
        const testUri: string = "http://rootURI";
        const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenFibaro(testUri);

        test.SetState(fibaroConsts.SensorOpenStateClosed);
        assert.equal(test.State, false);
    });

    it("SetState [-] false", () => {
        const testUri: string = "http://rootURI";
        const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenFibaro(testUri);

        test.SetState(32);
        assert.equal(test.State, false);
    });
});
