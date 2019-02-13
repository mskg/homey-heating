import "mocha";
import * as mock from "mock-require";
import "reflect-metadata";

mock("homey", {
    ManagerSettings: {
        get: () => {
            // tslint:disable-next-line: no-console
            console.log("Called.");
            return null;
        },
    },
});

// tslint:disable: no-var-requires
mock("@app/model", require("../app/model"));
mock("@app/helper", require("../app/helper"));
mock("@app/services", require("../app/services"));

(global as any).PRODUCTION = false;
