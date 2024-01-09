export const WIDTH_CHART = "31rem";

export const BORDER_WIDTH = "4";

export const RECYCLER = "Recycler";

export const TEXT_FONT_FAMILY_CHART = "Roboto";

export const TEXT_FONT_SIZE_CHART = 12;

export const TEXT_COLOR_CHART = "#101624";

export const DEFAULT_OPTION_CHART = {
  aspectRatio: 1.31,
  font: {
    lineHeight: 1,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  responsive: true,
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    r: {
      angleLines: {
        color: "#b4b9c736",
        lineWidth: 1,
      },
      ticks: {
        z: 1,
        maxTicksLimit: 5,
        showLabelBackdrop: false,
        backdropPadding: 0,
        display: false,
      },
      grid: {
        z: 1,
        color: "#B4B9C7",
      },
      pointLabels: {
        font: {
          size: 14,
          family: TEXT_FONT_FAMILY_CHART,
        },
        color: TEXT_COLOR_CHART,
      },
      beginAtZero: true,
    },
  },
};
