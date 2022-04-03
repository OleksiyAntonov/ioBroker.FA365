import "mocha";

import { UtilsFactory } from "../../src/factories/UtilsFactory";
import { IDateTimeUtils } from "../../src/interfaces/IDateTimeUtils";

import assert = require("assert");

describe("DateTimeUtils", () => {

	it("TimeStampDiffToString", () => {
		const test: IDateTimeUtils = (new UtilsFactory()).GetDateTimeUtils();

		const result: string = test.TimeStampDiffToString(5531166778, 5541166778);

		assert.strictEqual(result, "2:46:40");
	});
});
