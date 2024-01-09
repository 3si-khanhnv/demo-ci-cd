import { ChartConfiguration } from "chart.js";
import { IResponsiveRange } from "./by-day-location-sales.i";
export const TRANSLATION_TO_WIDTH = 453;

export const PADDING_LEFT = 16;
export const PADDING_TOP = 4;

export const DEFAULT_OPTION_CHART: ChartConfiguration<"bar">["options"] = {
  indexAxis: "x",
  responsive: true,
  layout: {
    padding: {
      right: 70,
      top: 60,
    },
  },

  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      anchor: "end",
      align: "end",
      font: {
        size: 20,
        family: "Roboto",
        weight: 500,
        lineHeight: "14px",
      },
      color: "#101624",
      padding: PADDING_LEFT,
    },
  },
  scales: {
    y: {
      grid: {
        offset: true,
        display: false,
        drawBorder: false,
        drawTicks: false,
      },
      ticks: {
        display: false,
        stepSize: TRANSLATION_TO_WIDTH,
        maxTicksLimit: 1,
      },
      stacked: true,
    },
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        font: {
          size: 14,
          family: "Roboto",
          weight: "500",
          lineHeight: "17px",
        },
        color: "#101624",
      },
    },
    xAxis: {
      display: false,
      type: "linear",
      stacked: true,
    },
  },
};

export const responsiveRangeData: IResponsiveRange[] = [
  {
    range: [0, 5],
    description: "From 0 to 5",
    barThickness: 64,
    margin: 24,
    dataLabelSize: 16,
  },
  {
    range: [6, 8],
    description: "From 6 to 8",
    barThickness: 24,
    margin: 32,
    dataLabelSize: 12,
  },
  {
    range: [9, 9],
    description: "Only 9",
    barThickness: 24,
    margin: 21,
    dataLabelSize: 12,
  },
  {
    range: [10, 10],
    description: "Only 10",
    barThickness: 24,
    margin: 12,
    dataLabelSize: 12,
  },
  {
    range: [11, 11],
    description: "Only 11",
    barThickness: 24,
    margin: 6,
    dataLabelSize: 12,
  },
  {
    range: [12, undefined],
    description: "Over 12",
    barThickness: 24,
    margin: 0,
    dataLabelSize: 12,
  },
];

export interface IDataEmitChart {
  [key: string]: any;
  index: number;
}