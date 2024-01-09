import { ChartConfiguration } from "chart.js";

export const PADDING_LEFT = 2;
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
        family: "Roboto",
        weight: 500,
        lineHeight: "14px",
      },
      color: "#101624",
      padding: PADDING_LEFT,
    },
  },

  scales: {
    x: {
      grid: {
        offset: false,
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
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
          family: "Roboto",
          weight: "500",
          lineHeight: "17px",
        },
        color: "#101624",
      },
    },
  },
};
