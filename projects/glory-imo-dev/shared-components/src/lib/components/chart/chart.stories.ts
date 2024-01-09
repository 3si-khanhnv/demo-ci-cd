import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { ChartType, Plugin } from "chart.js";
import { ChartComponent } from "./chart.component";
import { ChartModule } from "./chart.module";

const skipped = (ctx, value) => (ctx.p0.skip || ctx.p1.skip ? value : undefined);

const lineChart = "line";

const colorPatterns = ["#E53935", "#8E24AA", "#3949AB", "#1E88E5", "#00ACC1", "#43A047", "#C0CA33", "#FFB300"];

const chartData = [
  {
    data: [11, 15, NaN, 21, 23],
    segment: {
      borderColor: (ctx) => skipped(ctx, "rgb(0,0,0,0.2)"),
      borderDash: (ctx) => skipped(ctx, [6, 6]),
    },
    spanGaps: true,
    label: "100.00 USD",
    backgroundColor: "#E53935",
    borderColor: "#E53935",
    pointBackgroundColor: "#E53935",
    pointBorderColor: "#E53935",
    pointHoverBackgroundColor: "#E53935",
    pointHoverBorderColor: "#E53935",
  },
  {
    data: [10, null, 15, 20, 21],
    label: "50.00 USD",
    segment: {},
    spanGaps: true,
    backgroundColor: "#8E24AA",
    borderColor: "#8E24AA",
    pointBackgroundColor: "#8E24AA",
    pointBorderColor: "#8E24AA",
    pointHoverBackgroundColor: "#8E24AA",
    pointHoverBorderColor: "#8E24AA",
  },
  {
    data: [5, 10, 20, 8, 20],
    label: "20.00 USD",
    backgroundColor: "#3949AB",
    borderColor: "#3949AB",
    pointBackgroundColor: "#3949AB",
    pointBorderColor: "#3949AB",
    pointHoverBackgroundColor: "#3949AB",
    pointHoverBorderColor: "#3949AB",
  },
  {
    data: [30, 25, 14, 27, 28],
    label: "1.00 USD",
    backgroundColor: "#1E88E5",
    borderColor: "#1E88E5",
    pointBackgroundColor: "#1E88E5",
    pointBorderColor: "#1E88E5",
    pointHoverBackgroundColor: "#1E88E5",
    pointHoverBorderColor: "#1E88E5",
  },
  {
    data: [11, 13, 15, 27, 29],
    label: "0.05 USD",
    backgroundColor: "#00ACC1",
    borderColor: "#00ACC1",
    pointBackgroundColor: "#00ACC1",
    pointBorderColor: "#00ACC1",
    pointHoverBackgroundColor: "#00ACC1",
    pointHoverBorderColor: "#00ACC1",
  },
  {
    data: [12, 14, 16, 28, 22],
    label: "0.01 USD",
    backgroundColor: "#43A047",
    borderColor: "#43A047",
    pointBackgroundColor: "#43A047",
    pointBorderColor: "#43A047",
    pointHoverBackgroundColor: "#43A047",
    pointHoverBorderColor: "#43A047",
  },
  {
    data: [2, 8, 20, 25, 20],
    label: "50.00 EUR",
    backgroundColor: "#C0CA33",
    borderColor: "#C0CA33",
    pointBackgroundColor: "#C0CA33",
    pointBorderColor: "#C0CA33",
    pointHoverBackgroundColor: "#C0CA33",
    pointHoverBorderColor: "#C0CA33",
  },
  {
    data: [4, 6, 8, 10, 20],
    label: "20.00 EUR",
    backgroundColor: "#FFB300",
    borderColor: "#FFB300",
    pointBackgroundColor: "#FFB300",
    pointBorderColor: "#FFB300",
    pointHoverBackgroundColor: "#FFB300",
    pointHoverBorderColor: "#FFB300",
  },
  {
    data: [13, 15, 17, 29, 26],
    label: "0.05 EUR",
    backgroundColor: "#E53935",
    borderColor: "#E53935",
    pointBackgroundColor: "#E53935",
    pointBorderColor: "#E53935",
    pointHoverBackgroundColor: "#E53935",
    pointHoverBorderColor: "#E53935",
  },
  {
    data: [14, 14, 18, 26, 22],
    label: "0.01 EUR",
    backgroundColor: "#8E24AA",
    borderColor: "#8E24AA",
    pointBackgroundColor: "#8E24AA",
    pointBorderColor: "#8E24AA",
    pointHoverBackgroundColor: "#8E24AA",
    pointHoverBorderColor: "#8E24AA",
  },
];

const chartLabels = ["08/31 10:00:00", "11:00:00", "12:00:00", "09/01 14:00:00", "16:00:00"];

const legendLabels = [
  {
    type: "note",
    legend: "100.00 USD",
  },
  {
    type: "note",
    legend: "50.00 USD",
  },
  {
    type: "note",
    legend: "20.00 USD",
  },
  {
    type: "note",
    legend: "1.00 USD",
  },
  {
    type: "coin",
    legend: "0.05 USD",
  },
  {
    type: "coin",
    legend: "0.01 USD",
  },
  {
    type: "note",
    legend: "50.00 EUR",
  },
  {
    type: "note",
    legend: "20.00 EUR",
  },
  {
    type: "coin",
    legend: "0.05 EUR",
  },
  {
    type: "coin",
    legend: "0.01 EUR",
  },
];

const externalTooltipHandler = (context) => {
  // Tooltip Element
  let tooltipEl = document.getElementById("chartjs-tooltip");

  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table style='width: 100%'></table>";

    document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0 as any;
    return;
  }

  // Set caret Position
  tooltipEl.classList.add("custom-tooltip-line-chart");
  tooltipEl.classList.remove("above", "below", "no-transform");
  if (tooltipModel.yAlign || tooltipModel.xAlign) {
    tooltipEl.classList.add(tooltipModel.xAlign);
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add("no-transform");
  }

  // Set Text
  if (tooltipModel.body) {
    const valueLines = tooltipModel.dataPoints[0].formattedValue;
    const titleLines = tooltipModel.dataPoints.map((dataPoint) => {
      return dataPoint.dataset.label;
    });

    let innerHtml = "<thead>";
    titleLines.forEach(function (body, i) {
      // icon style
      const colors = tooltipModel.labelColors[i];
      let iconStyle = "background:" + colors.backgroundColor;
      iconStyle += "; border-color:" + colors.borderColor;
      iconStyle += "; border-width: 2px";
      iconStyle += "; height: 16px";
      iconStyle += "; width: 16px";
      iconStyle += "; border-radius: 50%";
      iconStyle += "; display: inline-block";
      const span = '<span style="' + iconStyle + '" class="chart-icon-tooltip"></span>';

      // currencyLabelToolTip
      let labelStyle = "color: #5C667D";
      labelStyle += "; font-size: 14px";
      labelStyle += "; line-height: 14px";
      const label = `<label style="${labelStyle}">${body}</label>`;

      let style = "display: flex";
      style += "; flex-direction: row";
      style += "; flex-wrap: nowrap";
      style += "; align-items: center";
      style += "; gap: 4px";
      style += "; white-space: nowrap";

      innerHtml += `<tr><td><div style="${style}">${span}${label}</div></td></tr>`;
    });
    innerHtml += "</thead><tbody>";

    innerHtml += "<tr><th style='text-align: right'>" + valueLines + "</th></tr>";
    innerHtml += "</tbody>";

    const tableRoot = tooltipEl.querySelector("table");
    tableRoot.innerHTML = innerHtml;
  }

  // Tooltip height and width
  const { height, width } = tooltipEl.getBoundingClientRect();
  const position = context.chart.canvas.getBoundingClientRect();

  const top = position.top + window.pageYOffset + tooltipModel.caretY - height - 14;
  const left = position.left + window.pageXOffset + tooltipModel.caretX - width / 2;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1 as any;
  tooltipEl.style.position = "absolute";
  tooltipEl.style.left = left + "px";
  tooltipEl.style.top = top + "px";
  tooltipEl.style.font = "16";
  tooltipEl.style.padding = "16 px " + "16 px";
  tooltipEl.style.pointerEvents = "none";
  tooltipEl.style.background = "rgba(255, 255, 255, 0.89)";
  tooltipEl.style.border = "1px solid #B4B9C7";
  tooltipEl.style.borderRadius = "4px";
  tooltipEl.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.16)";
  tooltipEl.style.minWidth = "120px";
  tooltipEl.style.minHeight = "60px";
  tooltipEl.style.padding = "7px";
  tooltipEl.style.boxSizing = "border-box";
};

const chartOptions = {
  radius: 0,
  borderWidth: 1.5,
  responsive: true,
  interaction: {
    intersect: false,
    mode: "nearest",
  },
  plugins: {
    htmlLegend: {
      containerID: "legend-container",
    },
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "QUANTITY",
      position: "left",
      color: "#5C667D",
      font: {
        size: 14,
        weight: "bold",
      },
    },
    tooltip: {
      enabled: false,
      position: "nearest",
      yAlign: "bottom",
      xAlign: "center",
      external: externalTooltipHandler,
    },
  },
  // onHover: ({x,y}, activeHover, chart) => {
  //   console.log("position",x,y);

  // }
};

const getOrCreateLegendList = (chart, id, group) => {
  const legendContainer = document.getElementById(id);
  legendContainer.style.display = "flex";
  legendContainer.style.flexFlow = "wrap";
  legendContainer.style.flexDirection = "row";

  let groupContainer: any = legendContainer.querySelector(`#${id}-${group}`);

  if (!groupContainer) {
    const header = document.createElement(`h4`);
    header.textContent = group;
    header.style.color = "#5C667D";
    header.style.fontSize = "12";
    header.style.margin = "0";
    header.style.marginLeft = "10px";
    groupContainer = document.createElement(`div`);
    groupContainer.classList.add(`${group}-legend-chart-line`);
    groupContainer.id = `${id}-${group}`;
    groupContainer.appendChild(header);
    legendContainer.appendChild(groupContainer);
  }

  let listContainer: any = groupContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.flexFlow = "wrap";
    listContainer.style.flexDirection = "row";
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    groupContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin: Plugin<ChartType> = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const noteList = getOrCreateLegendList(chart, options.containerID, "note");
    const coinList = getOrCreateLegendList(chart, options.containerID, "coin");

    // const legendContainer = document.getElementById(`${options.containerID}`);

    // Remove old legend items
    while (noteList.firstChild) {
      noteList.firstChild.remove();
    }
    while (coinList.firstChild) {
      coinList.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items: any = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "1rem";
      li.style.marginBottom = "0.75rem";

      li.onclick = () => {
        const { type } = chart.config as any;
        if (type === "pie" || type === "doughnut") {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        }
        chart.update();
      };

      // Color box
      const boxSpan: any = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.height = "1rem";
      boxSpan.style.marginRight = "0.25rem";
      boxSpan.style.width = "1rem";
      boxSpan.style.borderRadius = "50%";

      // Text
      const textContainer: any = document.createElement("p");
      textContainer.style.color = "#101624";
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.fontSize = "0.875rem";
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);

      const type = legendLabels.find((i) => i.legend === item.text)?.type;

      if (type) {
        if (type === "note") {
          noteList.appendChild(li);
        } else {
          coinList.appendChild(li);
        }
      }
    });
  },
};

const addIconYLabelPlugin: Plugin = {
  id: "iconYLabel",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const xAxis = chart.scales.x;
    const yAxis = chart.scales.y;

    const positions: { x: number; y: number; w: number; h: number }[] = [];

    const labelSizesWidths = xAxis["_labelSizes"].widths;
    xAxis["_labelItems"].forEach((value, index) => {
      const [x] = value.translation;
      const image = new Image();

      image.src = "http://localhost:6006/assets/img/icons/ok.svg";
      const xPosition = x - labelSizesWidths[index] / 2 - 20 - 8;
      const yPosition = yAxis.bottom + 6;
      positions.push({ x: xPosition, y: yPosition, w: 20, h: 20 });
      ctx.drawImage(image, xPosition, yPosition);
    });

    const canvas = chart.canvas;
    const context = canvas.getContext("2d");

    canvas.onmousemove = function (e) {
      canvas.getBoundingClientRect;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      let i = 0;
      let r;

      // context.clearRect(0, 0, canvas.width, canvas.height);

      while ((r = positions[i++])) {
        context.beginPath();
        context.rect(r.x, r.y, r.w, r.h);
        const isPointInPath = context.isPointInPath(x, y);
        if (isPointInPath) {
          canvas.style.cursor = "pointer";
          break;
        } else {
          canvas.style.cursor = "default";
        }
        // context.fill();
      }
    };

    canvas.onmousedown = function (e) {
      canvas.getBoundingClientRect;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      let i = 0;
      let r;

      // context.clearRect(0, 0, canvas.width, canvas.height);

      while ((r = positions[i])) {
        context.beginPath();
        context.rect(r.x, r.y, r.w, r.h);
        const isPointInPath = context.isPointInPath(x, y);
        if (isPointInPath) {
          alert(`index ${i}`);
          break;
        }
        i++;
        // context.fill();
      }
    };
  },
};

const plugins = [htmlLegendPlugin, addIconYLabelPlugin];

const meta: Meta<ChartComponent> = {
  title: "Components / Atoms/Chart",
  argTypes: {},
  component: ChartComponent,
  decorators: [
    moduleMetadata({
      imports: [ChartModule],
    }),
  ],
};

export default meta;

type Story = StoryObj;

export const LineChart: Story = {
  render: (args) => ({
    template: `
    <div style="width: 1024px; height: 800px;">
      <imo-chart [chartType]="chartType" [chartData]="chartData" [chartLabels]="chartLabels" [chartOptions]="chartOptions" [plugins]="plugins">
      </imo-chart>
    </div>
    `,
    props: args,
  }),
  args: {
    chartData: chartData,
    chartLabels,
    legendLabels,
    colorPatterns,
    chartType: lineChart,
    chartOptions,
    plugins,
  },
};
