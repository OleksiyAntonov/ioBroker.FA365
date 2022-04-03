import "mocha";
import assert = require("assert");

import * as aeonConsts from "../../src/consts/AeonConsts";
import { INotificationIoNotifier } from "../../src/interfaces/INotificationIoNotifier";
import { ISensorOpen } from "../../src/interfaces/ISensorOpen";
import { NotificationsIoFactory } from "../../src/factories/NotificationsIoFactory";
import { SensorsFactory } from "../../src/factories/SensorsFactory";

describe("SensorOpenAeon", () => {

	it("ctx", () => {
		const testUri = "http://rootURI";
		const testInstance = "zwave2.0";
		const testNode = "NODE03";
		const testChannel = "CHANNEL02";
		const testNotifier: INotificationIoNotifier = (new NotificationsIoFactory()).GetNotificationIoNotifier();

		const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenAeon(
			testUri,
			testInstance,
			testNode,
			testChannel,
			testNotifier
		);
		assert.strictEqual(test.RootUri, testUri);
		assert.strictEqual(test.Fqnn, "zwave2.0.NODE03.BASIC.Basic");
	});

/*	it("SetState [+] true", () => {
		const testUri = "http://rootURI0";
		const testInstance = "zwave2.00";
		const testNode = "NODE030";
		const testChannel = "CHANNEL020";
		const testNotifier: INotificationIoNotifier = (new NotificationsIoFactory()).GetNotificationIoNotifier();
		const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenAeon(
			testUri,
			testInstance,
			testNode,
			testChannel,
			testNotifier
		);

		// TODO: to fix
		// test.SetState(aeonConsts.SensorOpenStateOpened);
		// assert.strictEqual(test.State, true);
	});

	it("SetState [+] false", () => {
		const testUri = "http://rootURI1";
		const testInstance = "zwave2.1";
		const testNode = "NODE031";
		const testChannel = "CHANNEL021";
		const testNotifier: INotificationIoNotifier = (new NotificationsIoFactory()).GetNotificationIoNotifier();
		const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenAeon(
			testUri,
			testInstance,
			testNode,
			testChannel,
			testNotifier
		);

		//test.UpdateState(testUri, aeonConsts.SensorOpenStateClosed);
		//assert.strictEqual(test.State, false);
	});

	it("SetState [-] false", () => {
		const testUri = "http://rootURI";
		const test: ISensorOpen = (new SensorsFactory()).GetSensorOpenAeon(testUri);

		test.SetState(32);
		assert.strictEqual(test.State, false);
	});*/
});
