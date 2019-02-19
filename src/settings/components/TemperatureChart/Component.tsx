import deepOrange from "@material-ui/core/colors/deepOrange";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/lightBlue";
import { StyleRulesCallback, withStyles, WithStyles } from "@material-ui/core/styles";
import React, { Suspense } from "react";
import { Day, IHeatingPlan } from "../../../app/model";
import { calculateDay } from "../../state/calculateDay";
import { IndexedSetPoint } from "../../state/PlanReducer";
import { SeriesElement } from "./SeriesElement";
import { SVGGenerator } from "./SVGGenerator";

const styles: StyleRulesCallback = (theme) => ({
    high: {
        fill: deepOrange[500],

        ["& text"]: {
            fill: "white",
            fontSize: "12px",
        },
    },
    medium: {
        fill: green[500],
        ["& text"]: {
            fill: "white",
            fontSize: "12px",
        },
    },
    low: {
        fill: blue[500],
        ["& text"]: {
            fill: "white",
            fontSize: "12px",
        },
    },

    chart: {
        padding: theme.spacing.unit * 2,
        width: "100%",
    },
});

type Props = {
    plan: IHeatingPlan,
    height?: number,
    legend?: boolean,
} & WithStyles<typeof styles>;

const TemperatureChart: React.FunctionComponent<Props> = (props) => {
    const { classes, plan, height, legend } = props;
    const ref = React.createRef<HTMLDivElement>();

    React.useEffect(() => {
        const chart = new SVGGenerator(ref.current, legend);
        chart.colors = {
            HIGH: classes.high,
            MEDIUM: classes.medium,
            LOW: classes.low,
        };

        const tasks: SeriesElement[] = [];

        // setpoints get translated to [from - to]
        [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday, Day.Saturday, Day.Sunday].forEach((day) => {
            const { schedules, last } = calculateDay(plan, day);

            if (schedules.length === 0) {
                if (last == null) { return; }

                tasks.push(SeriesElement.fullDay(day, last.targetTemperature));
                return;
                // only one setpoint
            } else if (schedules.length === 1 && last == null) {
                tasks.push(SeriesElement.fullDay(day, schedules[0].targetTemperature));
                return;
            }

            let previous: IndexedSetPoint = null;

            schedules.forEach((current) => {
                if (previous == null) {
                    tasks.push(SeriesElement.firstHalf(last, current));
                } else {
                    tasks.push(new SeriesElement(previous, current));
                }

                previous = current;
            });

            // until eod
            tasks.push(new SeriesElement(previous));
        });

        chart.data(tasks);
    }, [plan]);

    return (<div style={{ height: height || 300 }} className={classes.chart} ref={ref} />);
};

// const lazy = (args: Props) => React.lazy(() => {
//     return Promise.resolve((<TemperatureChart {...args} />));
// });

// const LazyChart: React.FunctionComponent<Props> = (props) => {
//     return (
//         <Suspense fallback={<span>Loading...</span>}>
//             <TemperatureChart {...props} />
//         </Suspense>
//     );
// }

export default withStyles(styles)(TemperatureChart);
