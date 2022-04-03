import "mocha";
import { expect } from "chai";

import * as globalConsts from "../../src/consts/GlobalConsts";
import { NotificationsIoFactory } from "../../src/factories/NotificationsIoFactory";

describe("Initiator", () => {
	it("ctx-postbox", () => {
		const initiatorTest = (new NotificationsIoFactory()).GetInitiator(
			globalConsts.initiators.postBox
		);
		expect(initiatorTest.Name).to.equal("postBox");
		expect(initiatorTest.Id).to.equal(globalConsts.initiators.postBox);
	});
	it("ctx-balkontuer", () => {
		const initiatorTest = (new NotificationsIoFactory()).GetInitiator(
			globalConsts.initiators.balkonTuer
		);
		expect(initiatorTest.Name).to.equal("Balkontuer");
		expect(initiatorTest.Id).to.equal(globalConsts.initiators.balkonTuer);
	});
	it("ctx-eingangtuer", () => {
		const initiatorTest = (new NotificationsIoFactory()).GetInitiator(
			globalConsts.initiators.eingangTuer
		);
		expect(initiatorTest.Name).to.equal("Eingangtuer");
		expect(initiatorTest.Id).to.equal(globalConsts.initiators.eingangTuer);
	});
});
