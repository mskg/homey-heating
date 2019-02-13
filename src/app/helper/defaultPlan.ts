
import { Day, IHeatingPlan, ISetPoint, IHeatingZone, IHeatingDevice } from "@app/model";

export const WARM: number = 20.5;
export const INTERMEDIATE: number = 18.5;
export const COOL: number = 16;

function bathroomSchedule(): ISetPoint[] {
    const setPoints: ISetPoint[] = [];

    for (const d of [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday]) {
        setPoints.push({
            day: d,
            hour: 6,
            minute: 0,
            targetTemperature: WARM,
        });

        setPoints.push({
            day: d,
            hour: 9,
            minute: 0,
            targetTemperature: COOL,
        });
    }

    for (const d of [Day.Saturday, Day.Sunday]) {
        setPoints.push({
            day: d,
            hour: 9,
            minute: 0,
            targetTemperature: INTERMEDIATE,
        });

        setPoints.push({
            day: d,
            hour: 23,
            minute: 30,
            targetTemperature: COOL,
        });
    }

    return setPoints;
}

function mainSchedule(): ISetPoint[] {
    const setPoints: ISetPoint[] = [];

    for (const d of [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday]) {
        setPoints.push({
            day: d,
            hour: 17,
            minute: 0,
            targetTemperature: INTERMEDIATE,
        });

        setPoints.push({
            day: d,
            hour: 18,
            minute: 30,
            targetTemperature: WARM,
        });

        setPoints.push({
            day: d,
            hour: 23,
            minute: 0,
            targetTemperature: COOL,
        });
    }

    for (const d of [Day.Saturday, Day.Sunday]) {
        setPoints.push({
            day: d,
            hour: 9,
            minute: 0,
            targetTemperature: WARM,
        });

        setPoints.push({
            day: d,
            hour: 23,
            minute: 30,
            targetTemperature: COOL,
        });
    }

    return setPoints;
}

function utilitySchedule(): ISetPoint[] {
    const setPoints: ISetPoint[] = [];

    for (const d of [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday]) {
        setPoints.push({
            day: d,
            hour: 17,
            minute: 0,
            targetTemperature: INTERMEDIATE,
        });

        setPoints.push({
            day: d,
            hour: 23,
            minute: 0,
            targetTemperature: COOL,
        });
    }

    for (const d of [Day.Saturday, Day.Sunday]) {
        setPoints.push({
            day: d,
            hour: 9,
            minute: 0,
            targetTemperature: INTERMEDIATE,
        });

        setPoints.push({
            day: d,
            hour: 23,
            minute: 30,
            targetTemperature: COOL,
        });
    }

    return setPoints;
}

const bedSchedule = [{ day: Day.Monday, hour: 0, minute: 0, targetTemperature: 16 }];

export const DEFAULT_HEATING_PLAN: IHeatingPlan[] = [
{
    id: "1",
    name: "Living Room",
    enabled: true,
    schedule: mainSchedule(),

    zones: ["Living Room"],
    overrides: {
        DayAtHome: {
            targetTemperature: 17
        }
    }
},
{
    id: "2",
    name: "Bathroom",
    enabled: true,
    schedule: bathroomSchedule(),

    zones: ["Bathroom"],
    overrides: {
        DayAway: {
            targetTemperature: 17
        }
    }
},
{
    id: "3",
    name: "Utility",
    enabled: true,
    schedule: utilitySchedule(),

    zones: ["Kitchen", "Study"],
    overrides: {
        Holiday: {
            targetTemperature: 17
        }
    }

},
{
    id: "4",
    name: "Bedroom",
    enabled: true,
    schedule: bedSchedule,

    zones: ["Bedroom"],
    overrides: {
        Sleep: {
            targetTemperature: 17
        }
    }
}];

export const DEFAULT_HEATING_ZONES: IHeatingZone[] = [
    {
        id: "Bathroom", 
        name: "Bathroom",
    },
    {
        id: "Bedroom", 
        name: "Bedroom",
    },
    {
        id: "Kitchen", 
        name: "Kitchen",
    },
    {
        id: "Living Room", 
        name: "Living Room",
    },
    {
        id: "Study", 
        name: "Study",
    },    
];

export const DEFAULT_HEATING_DEVICES: IHeatingDevice[] = [
    {
        id: "Bad", 
        name: "Bad",
    },
    {
        id: "Bett", 
        name: "Bett",
    },
    {
        id: "Flur", 
        name: "Flur",
    },
    {
        id: "Tür", 
        name: "Tür",
    },
    {
        id: "Mitte", 
        name: "Mitte",
    },    
    {
        id: "Sofa", 
        name: "Sofa",
    },    
    {
        id: "Tisch", 
        name: "Tisch",
    },      
    {
        id: "Büro", 
        name: "Büro",
    },            
]
