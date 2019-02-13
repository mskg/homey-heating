import { LogService } from "@app/services";
import "mocha";

beforeEach(() => {
    LogService.setupForTest();
});