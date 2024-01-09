import { ChartConfiguration } from "chart.js";
export const TRANSLATION_TO_WIDTH = 1;

export const PADDING_LEFT = 8;
export const PADDING_TOP = 4;

export const DEFAULT_OPTION_CHART: ChartConfiguration<"bar">["options"] = {
  indexAxis: "y",
  responsive: true,
  layout: {
    padding: {
      right: 0,
      top: 0,
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
      font: {
        size: 20,
        family: '"Roboto", sans-serif',
        weight: 500,
        lineHeight: "14px",
      },
      color: "#101624",
      padding: PADDING_LEFT,
    },
  },
  scales: {
    xAxis: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        offset: true,
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
        stepSize: 1,
        maxTicksLimit: 1,
      },
    },
    y: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        font: {
          size: 14,
          family: '"Roboto", sans-serif',
          weight: "500",
          lineHeight: "17px",
        },
        color: "#101624",
      },
    },
  },
};

export const responsiveRange = [
  {
    range: [0, 5],
    description: "From 0 to 5 items",
    barThickness: 56,
    margin: 24,
    dataLabelSize: 14,
  },
  {
    range: [6, 11],
    description: "From 6 to 11 items",
    barThickness: 32,
    margin: 12,
    dataLabelSize: 14,
  },
  {
    range: [12, undefined],
    description: "Over 12 items",
    barThickness: 24,
    margin: 12,
    dataLabelSize: 14,
  },
];

export interface ILabelColor {
  value: number;
  label: string;
  current: string;
  bgColor: string;
  textColor?: string;
  textSize?: string;
  isDisabled?: boolean;
  [key: string]: any;
}
export interface IDataEmitChart {
  [key: string]: any;
  index: number;
}
