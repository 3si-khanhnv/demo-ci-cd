import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from "@angular/core";
import { ActiveElement, Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import { formatCurrencyToString } from "../../utilities/common";
import { DEFAULT_OPTION_CHART, IDataEmitChart, PADDING_LEFT, TRANSLATION_TO_WIDTH, responsiveRange } from "./location-inventory-totals.constant";
import { ILabelColor } from "./location-inventory-totals.i";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: "imo-location-inventory-totals",
  templateUrl: "./location-inventory-totals.component.html",
  styleUrls: ["./location-inventory-totals.component.scss"],
})
export class LocationInventoryTotalsComponent {
  @Input() title = "";

  @Input() currencyCode: string;

  @Input() isShowValueZero = false;

  @Input() set configOptions(configOptions: ChartConfiguration<"bar">["options"]) {
    const format = this.chartOptions.plugins.datalabels.formatter;
    this.chartOptions = { ...this.chartOptions, ...configOptions };
    if (!configOptions?.plugins?.datalabels.formatter) this.chartOptions.plugins.datalabels.formatter = format;
  }

  @Input() height = null;

  @Input() barThickness = 28;

  @Input() isAutoResponsive = false;

  @Input() isShowFullText = false;

  @Input() set data(data: ILabelColor[]) {
    this.tempData = data;
    this.isUpdateChart = false;
    let labels: any[] = [];
    const bgColors: string[] = [];
    const values: number[] = [];
    const dataLength = this.isAutoResponsive ? data.length : this.isShowValueZero ? data.length : 10;
    for (let index = 0; index < dataLength; index++) {
      if (!data.length) break;
      if (data[index] && data[index].label) {
        if (this.isShowFullText) {
          labels.push(data[index].label);
        }
        const arrayText = data[index].label.split(" ");
        if (arrayText.length) {
          if (!this.isShowFullText) {
            let string = [];
            const text = arrayText.reduce((s1, s2, index) => {
              string.push(s2);
              if ((index % 2 !== 0 && index) || index === arrayText.length - 1) {
                s1.push(string.join(" "));
                string = [];
              }
              return s1;
            }, []);
            if (text.length >= 2) {
              const textLess = text.slice(0, 2);
              if (text.length > 2) {
                textLess[1] = textLess[1] + "...";
              }
              labels.push(textLess);
            } else {
              labels.push((text.length <= 22 && text) || `${text[0].slice(0, 22)}...`);
            }
          }
        }
      }
      if (data[index] && (this.isShowValueZero ? true : data[index].value !== 0)) {
        values.push(data[index].value);
        bgColors.push(data[index].bgColor);
      } else if (!data[index]) {
        labels.push("");
        values.push(0);
        bgColors.push("transparent");
      } else {
        values.push(0);
        bgColors.push("transparent");
      }
    }

    const { barThickness, margin } = this.dataByRange(values.length);

    if (this.isAutoResponsive) {
      this._height = this.autoHeight(456, data.length, barThickness, margin, 14);
    } else if (this.height) {
      this._height = 10 * this.height + 72;
    } else {
      const fixHeight = data.length >= 6 ? 42.2857142857 : 51.2;
      this._height = data.length * fixHeight + 72;
    }

    if (this.isShowFullText) {
      labels = labels.map((el) => this.formatLabel(el));
    }

    this._data = {
      labels: labels,
      datasets: [
        {
          indexAxis: "y",
          data: values,
          backgroundColor: bgColors,
          barThickness: this.isAutoResponsive ? barThickness : this.barThickness,
          hoverBackgroundColor: bgColors,
          minBarLength: 1,
        },
        {
          indexAxis: "y",
          data: [null],
          backgroundColor: ["transparent"],
        },
      ],
    };

    this.chartOptions = {
      ...this.chartOptions,
      indexAxis: "y",
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {
          right: 0,
        },
      },
      plugins: {
        ...this.chartOptions.plugins,
        datalabels: {
          ...this.chartOptions.plugins.datalabels,
          clamp: true,
          formatter: this.handleFormatLabels,
          padding: PADDING_LEFT,
          font: {
            size: 14,
            weight: 500,
            family: `"Roboto", sans-serif`,
          },
          anchor: this.handleAnchor,
          align: this.handleAlign,
          color: "#101624",
        },
      },
      onHover: (_event: ChartEvent, _elements: ActiveElement[], chart: Chart<"bar">) => {
        chart.canvas.style.cursor = "pointer";
      },
      scales: {
        ...this.chartOptions.scales,

        y: {
          ...this.chartOptions.scales.y,
          ticks: {
            font: {
              size: 14,
              weight: "500",
              family: `"Roboto", sans-serif`,
            },
            color: "#101624",
          },
          stacked: true,
        },
        x: {
          ...this.chartOptions.scales.x,
          max: TRANSLATION_TO_WIDTH,
          min: 0,
        },

        // TODO
        xAxis: {
          type: "linear",
          display: false,
          ...this.chartOptions.scales.xAxis,
          stacked: true,
        } as any,
      },
    };

    const plugins = {
      id: "customScale",
      beforeDatasetUpdate: this.pluginsDistance,
    };
    this.pluginChartDataLabels = [...this.pluginChartDataLabels, plugins];
    this.resizeChart(data.length, this._height);
  }
  @Input() width = "512px";
  @Output() emitDataClick = new EventEmitter<IDataEmitChart>();

  @ViewChild("myCanvas")
  private canvas: ElementRef;

  @ViewChild(BaseChartDirective)
  private chart: BaseChartDirective | undefined;

  public _height;

  public _data: ChartData<"bar">;

  public tempData: ILabelColor[] = [];

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
      this.isAutoResponsive && this.resizeChart(chart.data.labels.length, this._height, chart);
    },
  };

  public pluginChartDataLabels = [ChartDataLabels];

  public chartType: ChartType = "bar";

  private isUpdateChart = false;

  constructor(public renderer: Renderer2) {}

  public handleFormatLabels = (value) => {
    if (value == null) return "";
    return (value && formatCurrencyToString(value, this.currencyCode)) || "0.00";
  };

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

  autoHeight(minHeight: number, totalItems: number, barThickness: number, distanceColumn: number, minPaddingTB: number) {
    const countSpace = totalItems <= 1 ? 0 : totalItems - 1;
    const totalHeight = totalItems * barThickness + distanceColumn * countSpace + minPaddingTB;
    return totalHeight < minHeight ? minHeight : totalHeight;
  }

  autoPadding(chartHeight: number, totalItems: number, barThickness: number, distanceColumn: number) {
    const totalHeight = totalItems * barThickness + totalItems * distanceColumn;
    const currentUsage = Number(((chartHeight - totalHeight) / 2).toFixed());
    return currentUsage;
  }

  dataByRange(totalItems: number) {
    const data = responsiveRange.find((val) => {
      if (val.range[1]) return totalItems >= val.range[0] && totalItems <= val.range[1];
      else return totalItems >= val.range[0];
    });
    return data;
  }

  resizeChart(itemLength: number, height: number, chart?: Chart) {
    const rangeData = this.dataByRange(itemLength);
    const paddingTB = this.autoPadding(height, itemLength, rangeData.barThickness, rangeData.margin);

    const fontSize = rangeData.dataLabelSize;

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
      this.chartOptions.layout.padding = { ...(this.chartOptions.layout.padding as any), bottom: paddingTB, top: paddingTB };
      this.chartOptions.scales.x.grid = { ...this.chartOptions.scales.y.grid, drawTicks: false };
      this.chartOptions.plugins.datalabels.font = font;
    }
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

  public setContainerHeight(chartHeight: number) {
    return { height: chartHeight > 520 ? chartHeight + 72 + "px" : null };
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
          rawData = value.$context.raw > rawData ? value.$context.raw : rawData;
          const wLabel = datalabels[0]._model.size.width;
          const wBar = value.getProps(["width"], true).width;
          if (rawData > 0) {
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
        const { widthLabel, widthBar, rawData } = getMinMaxDataLabels.max;
        const marginRightChart = 45;
        const stateValue = rawData + ((widthLabel + marginRightChart) * rawData) / widthBar;

        if (stateValue && !isNaN(stateValue) && !this.isUpdateChart) {
          chart.options.scales.xAxis.max = stateValue;
          this.isUpdateChart = true;
          chart.update();
        }
      }
    }
  };

  public handleAnchor = (context: Context) => {
    const value = Number(context.dataset.data[context.dataIndex]);
    return value >= 0 ? "end" : "start";
  };

  public handleAlign = (context: Context) => {
    const value = Number(context.dataset.data[context.dataIndex]);
    return value >= 0 ? "end" : "start";
  };
}
