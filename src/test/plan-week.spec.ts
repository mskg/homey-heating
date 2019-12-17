import { BootStrapper } from "@app/services";
import { first, groupBy, map, sortBy } from "lodash";
import "mocha";
import { container } from "tsyringe";
import { slotTime } from "../app/helper";
import { IHeatingPlan } from "../app/model/heating";
import { HeatingPlanCalculator } from "../app/services/calculator";
import { FakeDate, patchDate } from "./mocks/date";

const PLANS_STRING = `
[
    {
        "id": "4ea7cb70-ac63-11e9-b2c3-d342993e61d7",
        "enabled": true,
        "name": "Bakdamer Beneden",
        "devices": [
            "30338903-fde7-4544-aedc-49a2e35aa79f"
        ],
        "schedule": [
            {
                "index": 0,
                "day": 1,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 16
            }
        ],
        "overrides": {
            "OutOfSeason": {
                "targetTemperature": 15
            }
        }
    },
    {
        "id": "6854abb0-ac63-11e9-b2c3-d342993e61d7",
        "enabled": true,
        "name": "Hal",
        "devices": [
            "52aad26d-1fba-4bd5-9b15-fc765eed05de"
        ],
        "schedule": [
            {
                "index": 0,
                "day": 1,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 16
            }
        ],
        "overrides": {
            "OutOfSeason": {
                "targetTemperature": 15
            }
        }
    },
    {
        "id": "c6caaaf0-ad3a-11e9-864e-61d05b12ea93",
        "enabled": true,
        "name": "Test",
        "devices": [
            "30338903-fde7-4544-aedc-49a2e35aa79f"
        ],
        "schedule": [
            {
                "index": 0,
                "day": 1,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 16
            }
        ],
        "overrides": {
            "OutOfSeason": {
                "targetTemperature": 15
            }
        }
    },
    {
        "id": "f514f600-c5a8-11e9-a9d3-db610fd4ee35",
        "enabled": true,
        "name": "Badkamer boven",
        "zones": [
            "8a6928ea-26b2-4922-9ead-d20ee6695dd3"
        ],
        "schedule": [
            {
                "index": 0,
                "day": 1,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 15
            }
        ],
        "overrides": {},
        "thermostatMode": 0
    },
    {
        "id": "04b34cb0-ac63-11e9-b2c3-d342993e61d7",
        "enabled": true,
        "name": "Shine room",
        "devices": [
            "286f7224-50cf-4765-85d2-3d5da9730e3b"
        ],
        "schedule": [
            {
                "index": 0,
                "day": 1,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 15
            }
        ],
        "overrides": {
            "OutOfSeason": {
                "targetTemperature": 15
            }
        }
    },
    {
        "id": "214f0f80-ac63-11e9-b2c3-d342993e61d7",
        "enabled": true,
        "name": "Slaapkamer Dylan",
        "devices": [
            "b08c8f58-f0e2-47e6-90c6-0782b7d8dff0"
        ],
        "schedule": [
            {
                "index": 0,
                "day": 1,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 15
            }
        ],
        "overrides": {
            "OutOfSeason": {
                "targetTemperature": 15
            }
        }
    },
    {
        "id": "1ccdc290-ac62-11e9-b2c3-d342993e61d7",
        "enabled": true,
        "name": "Slaapkamer Groot",
        "devices": [
            "e3ae6c05-2ef1-4888-b17a-72ecc80e0213"
        ],
        "schedule": [
            {
                "index": 0,
                "day": 1,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 15
            }
        ],
        "overrides": {
            "OutOfSeason": {
                "targetTemperature": 15
            }
        }
    },
    {
        "id": "3ce8d630-ac64-11e9-87b3-b9460bb4f65a",
        "enabled": true,
        "name": "Zit kamer",
        "schedule": [
            {
                "index": 0,
                "day": 1,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 1,
                "day": 1,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 2,
                "day": 1,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 3,
                "day": 1,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 4,
                "day": 1,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 5,
                "day": 2,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 6,
                "day": 2,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 7,
                "day": 2,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 8,
                "day": 2,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 9,
                "day": 2,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 10,
                "day": 3,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 11,
                "day": 3,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 12,
                "day": 3,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 13,
                "day": 3,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 14,
                "day": 3,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 15,
                "day": 4,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 16,
                "day": 4,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 17,
                "day": 4,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 18,
                "day": 4,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 19,
                "day": 4,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 20,
                "day": 5,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 21,
                "day": 5,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 22,
                "day": 5,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 23,
                "day": 5,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 24,
                "day": 5,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 25,
                "day": 6,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 26,
                "day": 6,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 27,
                "day": 6,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 28,
                "day": 6,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 29,
                "day": 6,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 30,
                "day": 0,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 31,
                "day": 0,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 32,
                "day": 0,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 33,
                "day": 0,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 34,
                "day": 0,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            }
        ],
        "overrides": {
            "Sleep": {
                "targetTemperature": 18
            },
            "OutOfSeason": {
                "targetTemperature": 15
            }
        },
        "devices": [
            "60e1f485-d249-454a-a769-6245f4285052"
        ]
    },
    {
        "id": "fd4e83c0-a22d-11e9-97c1-19bcf608e6fb",
        "enabled": true,
        "name": "Woonkamer",
        "schedule": [
            {
                "index": 0,
                "day": 1,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 1,
                "day": 1,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 2,
                "day": 1,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 3,
                "day": 1,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 4,
                "day": 1,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 5,
                "day": 2,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 6,
                "day": 2,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 7,
                "day": 2,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 8,
                "day": 2,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 9,
                "day": 2,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 10,
                "day": 3,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 11,
                "day": 3,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 12,
                "day": 3,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 13,
                "day": 3,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 14,
                "day": 3,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 15,
                "day": 4,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 16,
                "day": 4,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 17,
                "day": 4,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 18,
                "day": 4,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 19,
                "day": 4,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 20,
                "day": 5,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 21,
                "day": 5,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 22,
                "day": 5,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 23,
                "day": 5,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 24,
                "day": 5,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 25,
                "day": 6,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 26,
                "day": 6,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 27,
                "day": 6,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 28,
                "day": 6,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 29,
                "day": 6,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 30,
                "day": 0,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 31,
                "day": 0,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 32,
                "day": 0,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 33,
                "day": 0,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 34,
                "day": 0,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            }
        ],
        "overrides": {
            "Sleep": {
                "targetTemperature": 18
            },
            "OutOfSeason": {
                "targetTemperature": 15
            }
        },
        "devices": [
            "dcc88009-23a8-4700-bdad-994d70da80d0"
        ]
    },
    {
        "id": "25fb3130-c306-11e9-9a6a-3559bcba23a5",
        "enabled": true,
        "name": "Serre",
        "schedule": [
            {
                "index": 0,
                "day": 1,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 1,
                "day": 1,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 2,
                "day": 1,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 3,
                "day": 1,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 4,
                "day": 1,
                "hour": 22,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 5,
                "day": 2,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 6,
                "day": 2,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 7,
                "day": 2,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 8,
                "day": 2,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 9,
                "day": 2,
                "hour": 22,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 10,
                "day": 3,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 11,
                "day": 3,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 12,
                "day": 3,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 13,
                "day": 3,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 14,
                "day": 3,
                "hour": 22,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 15,
                "day": 4,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 16,
                "day": 4,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 17,
                "day": 4,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 18,
                "day": 4,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 19,
                "day": 4,
                "hour": 22,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 20,
                "day": 5,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 21,
                "day": 5,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 22,
                "day": 5,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 23,
                "day": 5,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 24,
                "day": 5,
                "hour": 22,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 25,
                "day": 6,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 26,
                "day": 6,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 27,
                "day": 6,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 28,
                "day": 6,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 29,
                "day": 6,
                "hour": 22,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 30,
                "day": 0,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 31,
                "day": 0,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 32,
                "day": 0,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 33,
                "day": 0,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 34,
                "day": 0,
                "hour": 22,
                "minute": 0,
                "targetTemperature": 18
            }
        ],
        "overrides": {
            "Sleep": {
                "targetTemperature": 18
            }
        },
        "devices": [
            "886cfdca-2cf2-4cd3-b894-3d04b3db709c"
        ]
    },
    {
        "id": "053a5a30-ac67-11e9-bef7-37c7a2d39451",
        "enabled": true,
        "name": "Keuken",
        "schedule": [
            {
                "index": 0,
                "day": 1,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 1,
                "day": 1,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 2,
                "day": 1,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 3,
                "day": 1,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 4,
                "day": 1,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 5,
                "day": 2,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 6,
                "day": 2,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 7,
                "day": 2,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 8,
                "day": 2,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 9,
                "day": 2,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 10,
                "day": 3,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 11,
                "day": 3,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 12,
                "day": 3,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 13,
                "day": 3,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 14,
                "day": 3,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 15,
                "day": 4,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 16,
                "day": 4,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 17,
                "day": 4,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 18,
                "day": 4,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 19,
                "day": 4,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 20,
                "day": 5,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 21,
                "day": 5,
                "hour": 6,
                "minute": 30,
                "targetTemperature": 20.5
            },
            {
                "index": 22,
                "day": 5,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 23,
                "day": 5,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 24,
                "day": 5,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 25,
                "day": 6,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 26,
                "day": 6,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 27,
                "day": 6,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 28,
                "day": 6,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 29,
                "day": 6,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            },
            {
                "index": 30,
                "day": 0,
                "hour": 0,
                "minute": 0,
                "targetTemperature": 18
            },
            {
                "index": 31,
                "day": 0,
                "hour": 7,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 32,
                "day": 0,
                "hour": 8,
                "minute": 0,
                "targetTemperature": 20
            },
            {
                "index": 33,
                "day": 0,
                "hour": 18,
                "minute": 0,
                "targetTemperature": 20.5
            },
            {
                "index": 34,
                "day": 0,
                "hour": 22,
                "minute": 30,
                "targetTemperature": 18
            }
        ],
        "overrides": {
            "Sleep": {
                "targetTemperature": 18
            },
            "OutOfSeason": {
                "targetTemperature": 15
            }
        },
        "devices": [
            "39e21dbc-d265-4e0e-b379-5428695757b8"
        ]
    }
]
`;

function determineNextSchedule(activePlans: IHeatingPlan[]) {
    let nextExecution: Date | null = null;
    let plansToExecute: IHeatingPlan[] = [];

    type TempArray = {
        date: Date;
        plan: IHeatingPlan;
    };

    // type GroupedTempArray = { date: Date, plans: IHeatingPlan[] };
    const allSchedules: TempArray[] = [];

    // 60 / 12 = 5 minutes
    const slots = 12;
    // we get the next schedule for all active plans
    activePlans.forEach((plan) => {
        const calculator = container.resolve(HeatingPlanCalculator);
        const nextSchedule = calculator.getNextSchedule(plan);

        if (nextSchedule != null) {
            // If the execution of the next slot is too close (difference vs. runtime),
            // we would miss the execution. Such we slot the time to a runtime of 5 minutes.
            nextSchedule.setMinutes(slotTime(nextSchedule.getMinutes(), slots), 0, 0);
            allSchedules.push({ date: nextSchedule, plan });
        }
    });

    // group by slotted date, join all plans together
    const grouped = map(groupBy(allSchedules, (d: TempArray) => d.date), (gPlans, date) => ({
        date: new Date(date),
        plans: gPlans.map((gp) => gp.plan),
    }));

    // we sort and lowest
    const lowestDate = first(sortBy(grouped, (g) => g.date));

    // if there is one -> this is all plans to look at
    nextExecution = lowestDate != null ? lowestDate.date : null;

    if (nextExecution != null) {
        // @ts-ignore
        plansToExecute = lowestDate.plans;
    }

    return {
        date: nextExecution,
        plans: plansToExecute,
    };
}

function getEndOfDay() {
    const eod = new Date();
    eod.setHours(0, 0, 0, 0);
    eod.setDate(eod.getDate() + 1);

    return eod;
}

function registerTasks(plans: IHeatingPlan[]) {
    /**
     * There is a bug in the SDK 2.0 that prevents registring more than one task a time.
     * We switch between two types of tasks.
     */

    const END_OF_DAY = getEndOfDay();

    let taskName = "schedule";
    let { date: nextDate, plans: plansToExecute } =  determineNextSchedule(plans);

    // If we have a setpoint neat EOD, we still have to cleanup
    if (nextDate == null || nextDate >= END_OF_DAY) {
        nextDate = END_OF_DAY;
        taskName = "cleanup";
    }

    if (nextDate <= new Date(Date.now())) {
        console.error(new Error("Schedule is calculated wrong, earlier than today!"), new Date(Date.now()));

        // check again one hour later
        nextDate = new Date();
        nextDate.setHours(nextDate.getHours() + 1);
        plansToExecute = [];
    }

    return {
        nextDate,
        plansToExecute,
        taskName,
    };
}

before(async () => {
    await BootStrapper(true);
    patchDate();
});

const WEEKDDAY = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

// tslint:disable: no-unused-expression
// tslint:disable: no-empty
describe("Week", () => {
    FakeDate.dateNow.setFullYear(1979, 0, 29); // MONDAY
    FakeDate.dateNow.setHours(0, 0, 0, 0);

    const endDate = new Date(FakeDate.dateNow.valueOf());
    endDate.setDate(FakeDate.dateNow.getDate() + 7);

    const plans = JSON.parse(PLANS_STRING);

    it("determineNextSchedule", () => {
        let last: Date | null = null;

        while (FakeDate.dateNow < endDate) {
            const result = registerTasks(plans);

            // tslint:disable-next-line: triple-equals
            if (last == null || result.nextDate?.valueOf() != last?.valueOf()) {
                console.log(
                    WEEKDDAY[result.nextDate?.getDay() || 0],
                    result.nextDate?.toTimeString(),
                    result.taskName,
                    result.plansToExecute.map((p) => p.name),
                );

                last = result.nextDate;
            }

            // FakeDate.dateNow.setHours(FakeDate.dateNow.getHours() + 1);
            FakeDate.dateNow.setMinutes(FakeDate.dateNow.getMinutes() + 1);
        }
    });
});
