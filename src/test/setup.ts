import * as mock from "mock-require";
import "reflect-metadata";

// tslint:disable: no-var-requires
mock("@app/model", require("../app/model"));
mock("@app/helper", require("../app/helper"));

import "./mocks/atom";
import "./mocks/date";
import "./mocks/homey";

(global as any).__PRODUCTION__ = false;

// tslint:disable: no-var-requires
mock("@app/services", require("../app/services"));
