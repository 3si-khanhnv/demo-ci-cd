import { ApexChart, ApexPlotOptions, ApexTooltip } from "ng-apexcharts";

export const HEIGHT_CHART = 327;
export const WIDTH_CHART = 520;
export const FONT_WEIGHT = "500";
export const FONT_SIZE_LABEL = "14px";
export const FONT_SIZE_NUMBER = "18px";
export const type: ApexChart["type"] = "treemap";
export const SVGNS = "http://www.w3.org/2000/svg";
export const DEFAULT_COLOR_TEXT = "#FFF";
export type ChartOptions = {
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
};

export const DEFAULT_OPTIONS_CHART = {
  chart: {
    type: type,
    height: HEIGHT_CHART,
    width: WIDTH_CHART,
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: false,
    },
  },
  tooltip: {
    enabled: true,
  },
};
