/**
 * Inspired by https://github.com/dk8996/Gantt-Chart
 */

import * as d3 from "d3";
import { Axis, ScaleBand, ScaleTime } from "d3";
import translate from "../../i18n/Translation";
import { SeriesElement } from "./SeriesElement";

export const MIN_DATE = new Date(1979, 1, 29, 0, 0, 0, 0);
export const MAX_DATE = new Date(1979, 1, 30, 0, 0, 0, 0);

export class SVGGenerator {
    public tickFormat = "%H:%M";
    public colors = {};

    public margin = {
        top: 0,
        right: 16,
        bottom: 16,
        left: 24,
    };

    private minTime: Date;
    private maxTime: Date;

    private rootElement: HTMLElement;

    private height: number;
    private width: number;

    private xScale: ScaleTime<number, number>;
    private yScale: ScaleBand<string>;

    private xAxis: Axis<any>;
    private yAxis: Axis<string>;

    private series = [];
    private showLegend;

    constructor(rootElement: HTMLElement, showLegend = true, width?: number, height?: number) {
        this.rootElement = rootElement;
        this.showLegend = showLegend;

        this.minTime = MIN_DATE;
        this.maxTime = MAX_DATE;

        if (!this.showLegend) {
            this.margin = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            };
        }

        this.height = (height ? height : rootElement.clientHeight) - this.margin.top - this.margin.bottom;
        this.width = (width ? width : rootElement.clientWidth) - 32 - this.margin.right - this.margin.left;

        this.series = [
            translate("schedule.Monday"),
            translate("schedule.Tuesday"),
            translate("schedule.Wednesday"),
            translate("schedule.Thursday"),
            translate("schedule.Friday"),
            translate("schedule.Saturday"),
            translate("schedule.Sunday"),
        ];

        this.initAxis();
    }

    public data(data: SeriesElement[]) {
        const svg = this.createChart();
        const chart = svg.select(".chart");

        const allData = chart.selectAll("g").data<SeriesElement>(
            data, (d: SeriesElement) => d.start + d.taskName + d.end);

        const timeslot = allData.enter()
            .insert("g")
            .attr("class", (d) => {
                if (this.colors[d.color] == null) { return "rect"; }
                return this.colors[d.color];
            })
            .attr("transform", (d) => "translate(" + this.xScale(d.start) + "," + this.yScale(d.taskName) + ")");

        const rect = timeslot.insert("rect")
            .attr("height", this.yScale.bandwidth)
            .attr("width", (d: SeriesElement) => {
                return Math.max(1, (this.xScale(d.end) - this.xScale(d.start)));
            });

        if (this.showLegend) {
            const text = timeslot.insert("text")
                .attr("text-anchor", "start")
                .attr("x", 8)
                .attr("y", 20)
                .attr("width", (d: SeriesElement) => {
                    return Math.max(1, (this.xScale(d.end) - this.xScale(d.start) - 6));
                })
                .text((d) => this.fixedDigits(d.temperature, 1));

            this.dotme(text);
            }
        allData.exit().remove();
    }

    private initAxis() {
        this.xScale = d3.scaleTime()
            .domain([this.minTime, this.maxTime])
            .range([0, this.width])
            .clamp(true); // cut off longer entries (should not happen)

        this.yScale = d3.scaleBand()
            .domain(this.series)
            .rangeRound([0, this.height - this.margin.top - this.margin.bottom])
            .padding(this.showLegend ? .1 : 0); // some space between

        this.xAxis = d3.axisBottom(this.xScale)
            .tickFormat(d3.timeFormat(this.tickFormat))
            .tickSize(this.showLegend ? 8 : 0)
            .tickPadding(this.showLegend ? 8 : 0);

        this.yAxis = d3
            .axisLeft(this.yScale)
            .tickPadding(this.showLegend ? 8 : 0)
            .tickSize(0); // no ticks
    }

    private dotme(textNode) {
        textNode.each(function() {
            const text = d3.select(this);
            const characters = text.text().split("");
            // const numChars = characters.length;

            const ellipsis = text.text("").append("tspan").attr("class", "elip").text("...");
            const width = parseFloat(text.attr("width")) - ellipsis.node().getComputedTextLength();

            const tspan = text.insert("tspan", ":first-child").text(characters.join(""));

            // Try the whole word
            // While it's too long, and we have characters left, keep removing them
            while (tspan.node().getComputedTextLength() > width && characters.length) {
                characters.pop();
                tspan.text(characters.join(""));
            }

            // if (characters.length === numChars) {
            ellipsis.remove();
            // }
        });
    }

    private fixedDigits(value: number, digits: number) {
        return (Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits);
    }

    private createChart() {
        let svg = d3.select(this.rootElement).select("svg");

        if (svg.empty()) {
            svg = d3.select(this.rootElement)
                .append("svg")
                .attr("width", this.width + this.margin.left + this.margin.right)
                .attr("height", this.height + this.margin.top + this.margin.bottom);

            svg.append("g")
                .attr("class", "chart")
                .attr("width", this.width + this.margin.left + this.margin.right)
                .attr("height", this.height + this.margin.top + this.margin.bottom)
                .attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")");

            if (this.showLegend) {
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(" + this.margin.left + ", " + (this.height - this.margin.top - this.margin.bottom) + ")")
                    .call(this.xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + this.margin.left + ", 0)")
                    .call(this.yAxis);
            }
        }

        return svg;
    }
}
