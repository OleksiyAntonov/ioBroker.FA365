import "mocha";
import assert = require("assert");

import * as fibaroConsts from "../../src/consts/FibaroConsts";
import { INotificationIoNotifier } from "../../src/interfaces/INotificationIoNotifier";
import { ISensorOpen } from "../../src/interfaces/ISensorOpen";
import { NotificationsIoFactory } from "../../src/factories/NotificationsIoFactory";
import { SensorsFactory } from "../../src/factories/SensorsFactory";

describe("SensorOpenFibaro", () => {
	it("ctx", () => {
		const testUri = "http://rootURIF0";
		const testInstance = "zwave2.0F0";
		const testNode = "NODE03F0";
		const testChannel = "CHANNEL02F0";
		const testNotifier: INotificationIoNotifier = (new NotificationsIoFactory()).GetNotificationIoNotifier();

		const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenFibaro(
			testUri,
			testInstance,
			testNode,
			testChannel,
			testNotifier
		);
		assert.strictEqual(test.RootUri, testUri);
		assert.strictEqual(test.Fqnn, "zwave2.0F0.NODE03F0.SENSOR_BINARY.Sensor_1");
	});

/*
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
    });*/
});
