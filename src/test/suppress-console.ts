import "mocha";
import { LogService } from "@app/services";

beforeEach(function () {
    LogService.setupForTest();
});

