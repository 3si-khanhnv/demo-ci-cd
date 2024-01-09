import { Component, EventEmitter, Input, Output, Renderer2, ViewChild } from "@angular/core";
import { ActiveElement, Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import { BaseChartDirective } from "ng2-charts";
import pattern from "patternomaly";

import { formatCurrencyToString } from "../../utilities/common";
import { DEFAULT_OPTION_CHART, IDataEmitChart, ILabelColor, PADDING_LEFT, responsiveRange } from "./horizontal-chart.i";

@Component({
  selector: "imo-horizontal-chart",
  templateUrl: "./horizontal-chart.component.html",
  styleUrls: ["./horizontal-chart.component.scss"],
})
export class HorizontalChartComponent {
  @Input() width = "512px";

  @Input() height = null;

  @Input() title = "";

  @Input() currencyCode: string;

  @Input() isShowValueZero = false;

  @Input() set configOptions(configOptions: ChartConfiguration<"bar">["options"]) {
    const format = this.chartOptions.plugins.datalabels.formatter;
    this.chartOptions = { ...this.chartOptions, ...configOptions };
    if (!configOptions?.plugins?.datalabels.formatter) this.chartOptions.plugins.datalabels.formatter = format;
  }

  @Input() barThickness = 28;

  @Input() isAutoResponsive = false;
  isUpdateChart = false;
  @Input() set data(data: ILabelColor[]) {
    this.isUpdateChart = false;
    this.tempData = data;

    let labels: any[] = [];

    const bgColors: any[] = [];

    const values: any = [];

    for (let index = 0; index < data.length; index++) {
      if (data[index] && data[index].label) {
        labels.push(data[index].label);
      }
      if (data[index] && (this.isShowValueZero ? true : data[index].value !== 0)) {
        values.push(data[index].value);
        if (data[index].value < 0) {
          bgColors.push(pattern.draw("diagonal-right-left", data[index].bgColor));
        } else {
          bgColors.push(data[index].bgColor);
        }
      } else if (!data[index]) {
        values.push(0);
        bgColors.push("transparent");
      } else {
        values.push(0);
        bgColors.push("transparent");
      }
    }

    labels = labels.map((el) => this.formatLabel(el));

    const { barThickness, margin } = this.dataByRange(values.length);

    if (this.isAutoResponsive) {
      this._height = this.autoHeight(432, data.length, barThickness, margin, 14);
    } else if (this.height) {
      this._height = 10 * this.height + 72;
    } else {
      const fixHeight = data.length >= 6 ? 42.2857142857 : 51.2;
      this._height = data.length * fixHeight + 72;
    }

    this.coefficient = this.checkCoefficient(values);

    this.totalCollectValue = data.reduce(
      (out, el) => {
        if (!!el && el.value != null) {
          out.min = el.value < out.min ? el.value : out.min;
          out.max = el.value > out.max ? el.value : out.max;
        }
        return out;
      },
      {
        min: 0,
        max: 0,
      },
    );

    this._data = {
      labels: labels,
      datasets: [
        {
          indexAxis: "y",
          data: values,
          backgroundColor: bgColors,
          barThickness: this.isAutoResponsive ? barThickness : this.barThickness,
          hoverBackgroundColor: bgColors,
        },
        {
          indexAxis: "y",
          data: [null],
          backgroundColor: ["transparent"],
        },
      ],
    };

    const rangeData = this.dataByRange(labels.length);

    const fontSize = labels.length > 12 ? rangeData.dataLabelSize - (labels.length - 12) / 2 : rangeData.dataLabelSize;

    this.chartOptions = {
      ...this.chartOptions,
      indexAxis: "y",
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {
          right: 11 + (formatCurrencyToString(this.totalCollectValue?.max || 1, this.currencyCode).length - 1) * 11,
        },
      },
      plugins: {
        ...this.chartOptions.plugins,
        datalabels: {
          ...this.chartOptions.plugins.datalabels,
          clamp: true,
          formatter: this.handleFormatLabels,
          padding: PADDING_LEFT,

          anchor: this.handelAnchor,
          align: this.handelAlign,
          font: {
            size: fontSize,
            weight: 500,
            family: `"Roboto", sans-serif`,
          },
          color: "#101624",
        },
      },
      onHover: (_event: ChartEvent, _elements: ActiveElement[], chart: Chart<"bar">) => {
        chart.canvas.style.cursor = "pointer";
      },
      scales: {
        ...this.chartOptions.scales,
        y: {
          display: true,
          ...this.chartOptions.scales.y,
          ticks: {
            font: {
              size: 14,
              weight: "500",
              family: `"Roboto", sans-serif`,
            },
            color: "#101624",
            padding: 0,
          },
          stacked: true,
        },

        x: {
          display: true,
          ...this.chartOptions.scales.x,
        },

        // TODO
        xAxis: {
          type: "linear",
          display: false,
          ...this.chartOptions.scales.xAxis,
          stacked: true,
        } as any,

        yAxes: {
          display: false,
          grid: {
            display: false,
          },
          ticks: {
            padding: 0,
          },
        },
      },
    };

    const plugins = {
      id: "customScale",
      beforeDatasetUpdate: this.pluginsDistance,
    };

    this.pluginChartDataLabels = [...this.pluginChartDataLabels, plugins];
  }
  @Output() emitDataClick = new EventEmitter<IDataEmitChart>();

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective | undefined;

  public _height;

  public _data: ChartData<"bar">;

  public tempData: ILabelColor[] = [];

  private widthItems = [];

  private totalCollectValue: {
    min: number;
    max: number;
  };

  public chartOptions: ChartConfiguration<"bar">["options"] = {
    ...DEFAULT_OPTION_CHART,

    onHover: (_event: ChartEvent, elements: ActiveElement[], chart: Chart<"bar">) => {
      chart.canvas.style.cursor = elements.length !== 0 ? "pointer" : "default";
    },

    onClick: (_event: ChartEvent, elements: ActiveElement[], subPerf) => {
      if (elements[0]) {
        const item = this.tempData[elements[0].index];
        this.emitDataClick.emit({ item, index: elements[0].index });
      } else {
        const { y } = _event;
        subPerf.data.labels.forEach((_, index) => {
          const yIndex = subPerf.scales.y.getPixelForValue(index);
          if (yIndex - this.barThickness <= y && y <= yIndex) {
            const item = this.tempData[index];
            this.emitDataClick.emit({ item, index });
            return false;
          }
        });
      }
    },

    onResize: (chart) => {
      this.widthItems = [];
      this.chartOptions.scales.xAxis = {
        ...this.chartOptions.scales.xAxis,
      };
      this.isAutoResponsive && this.resizeChart(chart.data.labels.length, this._height, chart);
    },
  };

  public pluginChartDataLabels = [ChartDataLabels];

  public chartType: ChartType = "bar";

  public coefficient = 0;

  constructor(public renderer: Renderer2) {}

  onClickCanvas(chartCanVas) {
    return (evt) => {
      const { offsetY: y, offsetX: x } = evt;
      const barWidth = chartCanVas.chart.getDatasetMeta(0);
      chartCanVas.chart.data.labels.forEach((_, index) => {
        const { x: barX } = barWidth.data[index];
        const yIndex = chartCanVas.chart.scales.y.getPixelForValue(index);
        if (yIndex - this.barThickness <= y && y <= yIndex && x <= barX) {
          const item = this.tempData[index];
          this.emitDataClick.emit({ item, index });
          return false;
        }
      });
    };
  }

  ngAfterViewInit() {
    this.renderer.listen(this.chart.chart.canvas, "click", this.onClickCanvas(this.chart));
  }

  private dataByRange(totalItems: number) {
    const data = responsiveRange.find((val) => {
      if (val.range[1]) return totalItems >= val.range[0] && totalItems <= val.range[1];
      else return totalItems >= val.range[0];
    });
    return data;
  }

  private autoPadding(chartHeight: number, totalItems: number, barThickness: number, distanceColumn: number) {
    const totalHeight = totalItems * barThickness + totalItems * distanceColumn;
    const currentUsage = Number(((chartHeight - totalHeight) / 2).toFixed());
    return currentUsage;
  }

  private resizeChart(itemLength: number, height: number, chart?: Chart) {
    const rangeData = this.dataByRange(itemLength);
    const paddingTB = this.autoPadding(height, itemLength, rangeData.barThickness, rangeData.margin);
    const fontSize = itemLength > 12 ? rangeData.dataLabelSize - (itemLength - 12) / 2 : rangeData.dataLabelSize;

    const font = {
      size: fontSize,
      weight: 500,
      family: `"Roboto", sans-serif`,
    };
    if (chart) {
      chart.options.maintainAspectRatio = false;
      chart.options.layout.padding = { ...(chart.options.layout.padding as any), bottom: paddingTB, top: paddingTB };
      chart.options.scales.x.grid = { ...this.chartOptions.scales.y.grid, drawTicks: false };
      chart.options.plugins.datalabels.font = font;
    } else {
      this.chartOptions.maintainAspectRatio = false;
      this.chartOptions.scales.x.grid = { ...this.chartOptions.scales.y.grid, drawTicks: false };
      this.chartOptions.layout.padding = { ...(this.chartOptions.layout.padding as any), bottom: paddingTB, top: paddingTB };
      this.chartOptions.plugins.datalabels.font = font;
    }
  }

  public handleFormatLabels = (value) => {
    if (!value) return "";
    return (value && formatCurrencyToString(value, this.currencyCode)) || "0.00";
  };

  private checkCoefficient(values: number[]) {
    const maxValue = Math.max(...values);
    if (maxValue <= 0) {
      return 1;
    }
    return maxValue;
  }

  public formatLabel(labelValue: string) {
    const tempArray = labelValue.split(" ");
    let rsArray = [];

    tempArray.reduce((pre: string, curr: string, index: number) => {
      if (curr.length > 14) {
        pre && rsArray.push(pre);
        const xArray = curr.match(/.{1,14}/g);
        let lastItem = "";
        if (xArray.length) {
          lastItem = xArray[xArray.length - 1];
          xArray.pop();
        }
        rsArray = [...rsArray, ...xArray];
        return lastItem;
      } else {
        const temp = pre ? `${pre} ${curr}` : curr;

        if (temp.length > 14) {
          rsArray.push(pre);
          if (index + 1 !== tempArray.length) {
            return curr;
          } else rsArray.push(curr);
        } else {
          if (index + 1 !== tempArray.length) {
            return temp;
          } else rsArray.push(temp);
        }
      }
    }, "");

    return rsArray;
  }

  autoHeight(minHeight: number, totalItems: number, barThickness: number, distanceColumn: number, minPaddingTB: number) {
    const countSpace = totalItems <= 1 ? 0 : totalItems - 1;
    const totalHeight = totalItems * barThickness + distanceColumn * countSpace + minPaddingTB;
    return totalHeight < minHeight ? minHeight : totalHeight;
  }

  public pluginsDistance = (chart: Chart) => {
    if (!this.isUpdateChart) {
      const data = chart.getDatasetMeta(0).data;

      let maxWidthLabel = -1;
      let rawData = 0;

      const listWidthLabel = [];

      data.map((value: any) => {
        const datalabels = value.$datalabels;
        if (datalabels) {
          rawData = value.$context.raw < rawData ? value.$context.raw : rawData;
          const wLabel = datalabels[0]._model.size.width;
          const wBar = value.getProps(["width"], true).width;
          if (rawData < 0) {
            maxWidthLabel = wLabel;
          }

          listWidthLabel.push({
            widthLabel: datalabels[0]._model.size.width,
            widthBar: wBar,
            rawData: value.$context.raw,
          });
        }
      });

      const getMinMaxDataLabels: { min: any; max: any } = listWidthLabel.reduce(
        (out, item) => {
          return {
            min: item.rawData < out.min.rawData ? item : out.min,
            max: item.rawData > out.max.rawData ? item : out.max,
          };
        },
        {
          min: { rawData: 0 },
          max: { rawData: 0 },
        },
      );

      if (maxWidthLabel != -1) {
        const { widthLabel, widthBar, rawData } = getMinMaxDataLabels.min;

        const stateValue = rawData + ((widthLabel + 80) * rawData) / widthBar;

        if (stateValue && !isNaN(stateValue) && !this.isUpdateChart) {
          chart.options.scales.xAxis.min = stateValue;

          this.isUpdateChart = true;
          chart.update();
        }
      }
    }
  };

  public handelAnchor = (context: Context) => {
    const value = Number(context.dataset.data[context.dataIndex]);

    return value >= 0 ? "end" : "start";
  };

  public handelAlign = (context: Context) => {
    const value = Number(context.dataset.data[context.dataIndex]);
    const chart = context.chart;
    const meta = chart.getDatasetMeta(context.datasetIndex);
    const model: any = meta.data[context.dataIndex];

    const { width } = model.getProps(["width"], true);

    this.widthItems.push({ value: model.$context.raw, width: width });

    return value >= 0 ? "end" : "start";
  };
}
