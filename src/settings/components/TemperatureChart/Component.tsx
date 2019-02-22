import { StyleRulesCallback, withStyles, WithStyles } from "@material-ui/core/styles";
import { debounce } from "lodash";
import React from "react";
import { Day, IHeatingPlan } from "../../../app/model";
import { calculateDay, sortSchedules } from "../../state/calculateDay";
import { IndexedSetPoint } from "../../state/PlanReducer";
import { SeriesElement } from "./SeriesElement";
import { SVGGenerator } from "./SVGGenerator";

const useDimensions = () => {
    const [ref, setRef] = React.useState<HTMLDivElement | null>(null);

    const [dimensions, setDimensions] = React.useState({
        width: ref ? ref.clientWidth : 0,
        height: ref ? ref.clientHeight : 0,
    });

    function updateDimensions(inner: HTMLDivElement) {
        setDimensions({
            width: inner ? inner.clientWidth : 0,
            height: inner ? inner.clientHeight : 0,
        });
    }

    // @ts-ignore
    React.useEffect(() => {
        if (ref != null) {
            updateDimensions(ref);

            const func = ((savedRef) => debounce(() => {
                updateDimensions(savedRef);
            }, 300))(ref);

            window.addEventListener("resize", func);

            return () => {
                window.removeEventListener("resize", func);
            };
        }
    }, [ref]);

    return [setRef, dimensions];
};

const styles: StyleRulesCallback = (theme) => {
    return {
        chart: {
            padding: theme.spacing.unit * 2,
            width: "100%",

            ["& .axis domain"]: {
                fill: theme.palette.text.primary,
            },

            ["& text"]: {
                fill: theme.palette.text.primary,
                fontSize: "12px",
            },
        },
    };
};

type Props = {
    plan: IHeatingPlan,
    height?: number,
    legend?: boolean,
} & WithStyles<typeof styles>;

const TemperatureChart: React.FunctionComponent<Props> = (props) => {
    const { classes, plan, height, legend } = props;
    const ref = React.createRef<HTMLDivElement>();
    const [setRef, dimensions] = useDimensions();

    React.useEffect(() => {
        if (ref.current != null) {
            const chart = new SVGGenerator(ref.current, legend,
                (dimensions as any).width,
                (dimensions as any).height);

            const tasks: SeriesElement[] = [];

            // setpoints get translated to [from - to]
            [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday, Day.Saturday, Day.Sunday].forEach((day) => {
                // schedules need to be sorted
                const { schedules, last } = calculateDay({ ...plan, schedule: sortSchedules(plan.schedule) }, day);

                if (schedules.length === 0) {
                    if (last == null) { return; }

                    tasks.push(SeriesElement.fullDay(day, last.targetTemperature));
                    return;
                    // only one setpoint
                } else if (schedules.length === 1 && last == null) {
                    tasks.push(SeriesElement.fullDay(day, schedules[0].targetTemperature));
                    return;
                }

                let previous: IndexedSetPoint | null = null;

                schedules.forEach((current) => {
                    if (previous == null) {
                        tasks.push(SeriesElement.firstHalf(last, current));
                    } else {
                        tasks.push(new SeriesElement(previous, current));
                    }

                    previous = current;
                });

                if (previous != null) {
                    // until eod
                    tasks.push(new SeriesElement(previous));
                }
            });

            chart.data(tasks);
        }
    }, [plan, dimensions]);

    React.useEffect(() => {
        (setRef as any)(ref.current);
    }, [ref]);

    return (<div style={{ height: height || 300 }} className={classes.chart} ref={ref} />);
};

export default withStyles(styles)(TemperatureChart);
