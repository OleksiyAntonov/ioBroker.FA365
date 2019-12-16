import "mocha";
import { expect } from "chai";

import * as globalConsts from "../../src/consts/GlobalConsts";
import { NotificationsIoFactory } from "../../src/factories/NotificationsIoFactory";

describe("Initiator", () => {

    it("ctx", () => {
        expect(
            (new NotificationsIoFactory()).GetInitiator(
                globalConsts.initiators.postBox
            ).Name
        ).to.equal("postBox");
    });

    it("Code [+]", () => {
        expect(
            (new NotificationsIoFactory()).GetInitiator(
                globalConsts.initiators.balkonTuer
            ).Id
        ).to.equal(globalConsts.initiators.balkonTuer);
    });

    it("Code [-]", () => {
        expect(
            (new NotificationsIoFactory()).GetInitiator(
                globalConsts.initiators.balkonTuer
            ).Id
        ).to.not.equal(globalConsts.initiators.eingangTuer);
    });

    it("Id [+]", () => {
        expect(
            (new NotificationsIoFactory()).GetInitiator(
                globalConsts.initiators.eingangTuer
            ).Id
        ).to.equal(1);
    });

    it("Id [-]", () => {
        expect(
            (new NotificationsIoFactory()).GetInitiator(
                globalConsts.initiators.eingangTuer
            ).Id
        ).to.not.equal(2);
    });
});
