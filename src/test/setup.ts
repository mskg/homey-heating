import * as mock from "mock-require";
import 'mocha';
import 'reflect-metadata';

mock("homey", {
    ManagerSettings: {
        get: () => {
            console.log("Called.");
            return null;
        }
    }
});

mock("@app/model", require("../app/model"));
mock("@app/helper", require("../app/helper"));
mock("@app/services", require("../app/services"));

(global as any).PRODUCTION = false;
