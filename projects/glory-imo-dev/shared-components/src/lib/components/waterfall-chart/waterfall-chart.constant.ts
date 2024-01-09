import { ChartConfiguration } from "chart.js";
export const TRANSLATION_TO_WIDTH = 1;

export const DEFAULT_OPTION_CHART: ChartConfiguration<"bar">["options"] = {
  indexAxis: "x",
  responsive: true,
  layout: {
    padding: {
      right: 70,
      top: 60,
    },
  },
  hover: {},
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
        size: 16,
        family: "Roboto",
        weight: 500,
        lineHeight: "18.75px",
      },
      color: "#101624",
    },
  },
  scales: {
    y: {
      grid: {
        offset: false,
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
        stepSize: 1,
        maxTicksLimit: 1,
      },
    },
    x: {
      grid: {
        display: false,
        drawBorder: true,
      },
      ticks: {
        font: {
          size: 14,
          family: "Roboto",
          weight: "500",
          lineHeight: "16.41px",
        },
        color: "#101624",
      },
    },
  },
};
