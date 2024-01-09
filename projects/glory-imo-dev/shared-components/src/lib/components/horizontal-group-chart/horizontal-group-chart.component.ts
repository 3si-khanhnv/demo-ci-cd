import { Component, EventEmitter, Input, Output, Renderer2, ViewChild } from "@angular/core";
import { ActiveElement, Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { BaseChartDirective } from "ng2-charts";
import pattern from "patternomaly";

import { formatCurrencyToString } from "../../utilities/common";
import { DEFAULT_OPTION_CHART, PADDING_LEFT } from "./horizontal-group-chart.constant";
import { IDataChart, IDataEmitChart, IDataTotal } from "./horizontal-group-chart.i";

@Component({
  selector: "imo-horizontal-group-chart",
  templateUrl: "./horizontal-group-chart.component.html",
  styleUrls: ["./horizontal-group-chart.component.scss"],
})
export class HorizontalGroupChartComponent {
  @Input() title = "";

  @Input() currencyCode: string;

  @Input() chartType: string;

  @Input() set configOptions(configOptions: ChartConfiguration<"bar">["options"]) {
    const format = this.chartOptions.plugins.datalabels.formatter;
    this.chartOptions = { ...this.chartOptions, ...configOptions };
    if (!configOptions?.plugins?.datalabels.formatter) this.chartOptions.plugins.datalabels.formatter = format;
  }

  @Input() height = null;

  @Input() width = 512;

  @Input() isAutoResponsive = true;

  @Input() barThickness = 28;

  @Input() set data(data: IDataChart[]) {
    if (this.isLoadCompletedChart) {
      this.totalBarThickness = 0;
      this.distanceColumn = 0;
      this.labelColors = [];
      this.coefficient = 0;
      this.values = [];
      if (data.length) {
        const dataTotal: any[] = data.map((item) => {
          const labelColorItem = item.total?.map((value, index) => {
            return {
              label: item.groupType && item.groupType[index],
              bgColor: item.color && item.color[index],
              value: Number(value),
            };
          });

          return {
            label: item.label,
            labelColorItem,
          };
        });

        const labels = dataTotal.map((item) => {
          const formatLabel = this.formatLabel(item.label);
          return formatLabel;
        });

        if (dataTotal.length) {
          dataTotal[0].labelColorItem?.map((colorItem, index) => {
            const labelColor = {
              label: colorItem.label,
              color: colorItem.bgColor,
            };
            this.labelColors.push(labelColor);
            dataTotal.map((item) => this.values.push(item.labelColorItem[index].value));
          });
          this.tempData = data;
          this.coefficient = Math.max(...this.values) === 0 ? 1 : Math.max(...this.values);

          const arrBg = this.createBg(dataTotal);

          this._data = {
            labels: labels,
            datasets: dataTotal[0].labelColorItem?.map((colorItem, index) => {
              const dataChart = {
                label: colorItem.label,
                data: dataTotal.map((item) => item.labelColorItem[index].value),
                barThickness: this.barThickness,
                borderColor: this.colorBorderHide,
                borderWidth: this.borderWidth,
                hoverBorderColor: this.colorBorderHide,
                backgroundColor: arrBg[index],
                hoverBackgroundColor: arrBg[index],
                minBarLength: 1,
              };
              return dataChart;
            }),
          };

          const datasetsCount = this._data?.datasets?.length ? this._data.datasets.length : 0;
          this.totalBarThickness = datasetsCount * this.barThickness + (datasetsCount - 1) * 2;
          this.distanceColumn = datasetsCount <= 4 ? (5 - datasetsCount) * 4 : 4;
          this._height = this.autoHeight(416, data.length, this.totalBarThickness, this.distanceColumn);

          if (this.chart?.chart) {
            this.chart.chart.canvas?.style && this?.chart?.chart?.resize(this.chart.chart.width, this._height);
          }

          this.chartOptions = {
            ...this.chartOptions,
            maintainAspectRatio: false,
            responsive: true,
            layout: {
              padding: 0,
            },
            plugins: {
              ...this.chartOptions.plugins,
              datalabels: {
                ...this.chartOptions.plugins.datalabels,
                clamp: true,
                formatter: this.handleFormatLabels,
                padding: PADDING_LEFT,

                anchor: this.handleAnchorAndAlign,
                align: this.handleAnchorAndAlign,
                font: {
                  size: 14,
                  weight: 500,
                  family: `"Roboto", sans-serif`,
                },
                color: "#101624",
                listeners: {
                  click: this.handleClickLabelData,
                },
              },
            },
            onHover: (_event: ChartEvent, _elements: ActiveElement[], chart: Chart<"bar">) => {
              chart.canvas.style.cursor = "pointer";
            },

            scales: {
              ...this.chartOptions.scales,
              y: {
                ...this.chartOptions.scales.y,
                afterFit: this.afterFit,
                ticks: {
                  font: {
                    size: 14,
                    weight: "500",
                    family: `"Roboto", sans-serif`,
                  },
                  color: "#101624",
                },
              },
              x: {
                ...this.chartOptions.scales.x,
                max: this.coefficient,
                min: 0,
              },
            },
            animation: {
              onProgress: () => {
                this.isLoadCompletedChart = false;
              },
              onComplete: () => {
                this.isLoadCompletedChart = true;
              },
            },
          };

          this.isAutoResponsive && this.resizeChart(data.length, this._height, this.totalBarThickness, this.distanceColumn);
        }
      }
    }
  }

  @Output() emitDataClick = new EventEmitter<IDataEmitChart>();

  public pluginChartDataLabels = [ChartDataLabels];

  public chartTypeDraw: ChartType = "bar";

  public _height;

  public _data: ChartData<"bar">;

  public tempData: IDataChart[] = [];

  public labelColors = [];

  private coefficient: number;

  public borderWidth = 1;

  public colorBorderHide = "rgba(0, 0, 0, 0)";

  private values: number[] = [];

  private totalBarThickness = 0;

  private distanceColumn = 0;

  private isLoadCompletedChart = true;

  @ViewChild(BaseChartDirective)
  private chart: BaseChartDirective | undefined;

  mockCtx: CanvasRenderingContext2D;

  constructor(public renderer: Renderer2) {}

  onClickCanvas(chartCanVas) {
    return (evt) => {
      const { offsetY: y } = evt;
      chartCanVas.chart.data.labels.forEach((_, index: number) => {
        // const { x: barX } = barWidth.data[index];
        const yIndex = chartCanVas.chart.scales.y.getPixelForValue(index);
        const xClick = Array.isArray(this._data.labels[index]) ? (this._data.labels[index] as string[]).length : 1;
        if (Math.abs(yIndex - y) < 7 * xClick && this.chartType !== "barHorizontalGroupClickSingle") {
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

  public handleFormatLabels = (value) => {
    const valueItem = (value && formatCurrencyToString(value, this.currencyCode)) || "0.00";
    return valueItem;
  };

  public handleClickLabelData = (event) => {
    const item = this.tempData[event.dataIndex];
    this.emitDataClick.emit({ item, index: event.dataIndex, indexChild: event.datasetIndex });
  };

  public chartOptions: ChartConfiguration<"bar">["options"] = {
    ...DEFAULT_OPTION_CHART,

    onHover: (_event: ChartEvent, elements: ActiveElement[], chart: Chart<"bar">) => {
      chart.canvas.style.cursor = elements.length !== 0 ? "pointer" : "default";
    },

    onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
      if (elements[0]) {
        const item = this.tempData[elements[0].index];
        this.emitDataClick.emit({ item, index: elements[0].index, indexChild: elements[0].datasetIndex });
      }
    },
    onResize: (chart) => {
      this.isAutoResponsive && this.resizeChart(chart.data.labels.length, this._height, this.totalBarThickness, this.distanceColumn, chart);
    },
  };

  private createBg(dataTotal: IDataTotal[]) {
    return dataTotal.reduce((out, item) => {
      item.labelColorItem?.map((el, i) => {
        if (!out[i]) {
          out[i] = [];
        }

        if (el.value < 0) {
          return out[i].push(pattern.draw("diagonal-right-left", el.bgColor));
        } else {
          return out[i].push(el.bgColor);
        }
      });
      return out;
    }, []);
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

  public afterFit(scale) {
    scale.width = 130;
  }

  public handleAnchorAndAlign(context) {
    const value = Number(context.dataset.data[context.dataIndex]);

    return value >= 0 ? "end" : "start";
  }

  autoHeight(minHeight: number, totalItems: number, totalBarThickness: number, distanceColumn: number) {
    const totalHeight = totalItems * totalBarThickness + totalItems * distanceColumn * 2;
    return totalHeight < minHeight ? minHeight : totalHeight;
  }

  autoPadding(chartHeight: number, totalItems: number, totalBarThickness: number, distanceColumn: number) {
    const totalHeight = totalItems * totalBarThickness + totalItems * distanceColumn * 2;
    const currentUsage = Number(((chartHeight - totalHeight) / 2).toFixed());
    return currentUsage;
  }

  resizeChart(itemLength: number, height: number, totalBarThickness: number, distanceColumn: number, chart?: Chart) {
    let addPaddingRight = 0;
    this.mockCtx = document.createElement("canvas").getContext("2d");
    if (this.mockCtx && !!this._data) {
      this.mockCtx.font = `${this.chartOptions.plugins.datalabels.font["weight"]} ${this.chartOptions.plugins.datalabels.font["size"]}px Roboto, sans-serif`;
      addPaddingRight = this.mockCtx.measureText(this.handleFormatLabels(this.coefficient)).width + PADDING_LEFT + 6;
    }

    const paddingTB = this.autoPadding(height, itemLength, totalBarThickness, distanceColumn);

    if (chart) {
      chart.options.maintainAspectRatio = false;
      chart.options.layout.padding = { right: addPaddingRight, left: 0, bottom: paddingTB, top: paddingTB };
    } else {
      this.chartOptions.maintainAspectRatio = false;
      this.chartOptions.layout.padding = { right: addPaddingRight, left: 0, bottom: paddingTB, top: paddingTB };
    }
  }
}
