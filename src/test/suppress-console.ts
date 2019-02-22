import { ILogger, LogService } from "@app/services";
import "mocha";

/**
 * Saves the log until end of test.
 */
class TestLogger implements ILogger {
    public lines: any[] = [];

    public debug(...args: any[]) {
        this.lines.push(args);
    }

    public information(...args: any[]) {
        this.lines.push(args);
    }

    public error(...args: any[]) {
        this.lines.push(args);
    }
}

/**
 * Suppress startup code
 */
before(() => {
    (LogService as any).instance.loggers = [];
});

beforeEach(() => {
    (LogService as any).instance.loggers = [new TestLogger()];
});

/**
 * Dumps the saved log if a test has failed
 */
afterEach(function() {
    // @ts-ignore
    if (this.currentTest.state === "failed") {
        const log = ((LogService as any).instance.loggers[0] as TestLogger);

        log.lines.forEach((l) => {
            // tslint:disable-next-line: no-console
            console.log(...l);
        });
    }
});
