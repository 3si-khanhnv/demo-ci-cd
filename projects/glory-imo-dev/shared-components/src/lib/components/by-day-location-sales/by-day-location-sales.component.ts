import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { ActiveElement, Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { formatCurrencyToString } from "../../utilities/common";
import { IToggleOption } from "../button-toggle/button-toggle.component.i";
import { DEFAULT_OPTION_CHART, IDataEmitChart, responsiveRangeData, TRANSLATION_TO_WIDTH } from "./by-day-location-sales.constant";
import { IChartSize, ILabelColor, IResponsiveRange } from "./by-day-location-sales.i";
import { BehaviorSubject, Subscription } from "rxjs";
import { BaseChartDirective } from "ng2-charts";

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "imo-by-day-location-sales",
  templateUrl: "./by-day-location-sales.component.html",
  styleUrls: ["./by-day-location-sales.component.scss"],
})
export class LocationSalesByDayComponent implements AfterViewInit, OnDestroy {
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;

  @ViewChild("canvasContainer") canvasContainer!: ElementRef<HTMLElement>;
  @ViewChild("verticalContainer") verticalContainer!: ElementRef<HTMLElement>;

  mockCtx: CanvasRenderingContext2D;

  subscription = new Subscription();

  notifierChartWidth = new BehaviorSubject(0);

  dimensionObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      if (this.chart?.chart && entry.contentRect.width) {
        this.resizeChart(entry.contentRect.width, this.chart.chart);
      }
    });
  });

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
    this.dimensionObserver.disconnect();
  }

  ngAfterViewInit(): void {
    this.isAutoResponsive &&
      this.subscription.add(
        this.notifierChartWidth.subscribe((width) => {
          if (
            this.canvasContainer?.nativeElement &&
            this.verticalContainer?.nativeElement &&
            width > this.verticalContainer?.nativeElement.offsetWidth
          ) {
            this.verticalContainer.nativeElement.setAttributeNS(
              null,
              "style",
              `overflow-x: auto; overflow-y: hidden; max-height: ${this.height}px`,
            );
            this.canvasContainer.nativeElement.setAttributeNS(null, "style", `width: ${width}px; max-height: ${this.height}px`);
            this.chart.chart.resize(width, this.height);
          } else {
            this.verticalContainer.nativeElement.setAttributeNS(null, "style", `overflow: hidden;  max-height: ${this.height}px`);
            this.canvasContainer.nativeElement.setAttributeNS(
              null,
              "style",
              `width: ${this.verticalContainer.nativeElement.offsetWidth}px; max-height: ${this.height}px`,
            );
          }
        }),
      );

    this.isAutoResponsive && this.dimensionObserver.observe(this.verticalContainer.nativeElement);
  }

  @Input() title = "";

  @Input() currencyCode: string;

  @Input() toggleOptions: IToggleOption[] = [];

  @Input() defaultOption: string;

  @Input() set configOptions(configOptions: ChartConfiguration<"bar">["options"]) {
    const format = this.chartOptions.plugins.datalabels.formatter;
    this.chartOptions = { ...this.chartOptions, ...configOptions };
    if (!configOptions?.plugins?.datalabels.formatter) this.chartOptions.plugins.datalabels.formatter = format;
  }

  @Input() height = 456;

  @Input() barThickness = 28;

  @Input() isAutoResponsive = false;

  @Input() isShowValueZero = false;

  @Input() isShowAllDataLabel = false;

  @Input() set data(data: ILabelColor[]) {
    if (data?.length) {
      this.tempData = data;

      const labels: string[] = [];

      const bgColors: string[] = [];

      const dataRaw = [];

      let values: number[] = [];

      data.forEach((item) => {
        dataRaw.push(item.value);
        item.label && labels.push(item.label);
        if (item.value !== 0) {
          values.push(item.value);
          bgColors.push(item.bgColor);
        } else {
          values.push(0);
          const backgroundColor = this.isShowValueZero ? item.bgColor : "transparent";
          bgColors.push(backgroundColor);
        }
      });

      this.coefficient = Math.max(...values);

      if (!Number.isNaN(this.coefficient) && this.coefficient != 0) {
        values = values.map((value) => {
          return ((value / this.coefficient) * 100 * TRANSLATION_TO_WIDTH) / 100;
        });
      } else 0;

      this._data = {
        labels: labels,
        datasets: [
          {
            data: values,
            dataRaw,

            backgroundColor: bgColors,
            barThickness: this.isAutoResponsive ? this.dataByRange(values.length).barThickness : this.barThickness,
            hoverBackgroundColor: bgColors,
          },
          {
            indexAxis: "x",
            data: [undefined],
            backgroundColor: ["transparent"],
            color: ["transparent"],
            hoverBackgroundColor: ["transparent"],
            plugins: {
              datalabels: {
                display: false,
              },
            },
          },
        ] as any,
      };

      this.chartOptions = {
        ...this.chartOptions,
        interaction: {
          mode: "nearest",
        },
        plugins: {
          ...this.chartOptions.plugins,
          datalabels: {
            ...this.chartOptions.plugins.datalabels,
            clamp: true,
            formatter: this.handleFormatLabels,
            font: {
              size: this.getFontSizeByItemLength(this.dataByRange(data.length)),
              weight: 500,
              family: `"Roboto", sans-serif`,
            },
            color: "#101624",
            padding: {
              bottom: 4,
            },
          },
        },
        scales: {
          ...this.chartOptions.scales,
          x: {
            ...this.chartOptions.scales.x,
            max: TRANSLATION_TO_WIDTH + 77,
            min: 0,
            ticks: {
              font: {
                size: 14,
                weight: "500",
                family: `"Roboto", sans-serif`,
              },
              color: "#101624",
              padding: 4,
            },
            stacked: true,
          },
          y: {
            min: 0,
            ...this.chartOptions.scales.y,
          },
        },
      };

      this.chartInfos = this.dataByRange(data.length);

      if (this.isAutoResponsive && this.currentChartSize?.width) {
        this.resizeChart(this.currentChartSize.width);
      }
    }
  }

  @Input() isHide = true;

  @Input() width = 700;

  @Input() isShowFullText = false;

  @Output() emitDataClick = new EventEmitter<IDataEmitChart>();

  @Output() selectedOption = new EventEmitter<string>();

  public _data: ChartData<"bar">;

  public tempData: ILabelColor[] = [];

  public chartOptions: ChartConfiguration<"bar">["options"] = {
    ...DEFAULT_OPTION_CHART,
    onHover: (_event: ChartEvent, elements: ActiveElement[], chart: Chart<"bar">) => {
      chart.canvas.style.cursor = elements.length !== 0 ? "pointer" : "default";
    },
    onClick: (_, elements: ActiveElement[]) => {
      if (elements[0]) {
        const item = this.tempData[elements[0].index];
        this.emitDataClick.emit({ item, index: elements[0].index });
      }
    },
    onResize: (chart, size) => {
      this.currentChartSize = { width: this.verticalContainer?.nativeElement?.offsetWidth || size.width, height: size.height };
      this.isAutoResponsive && this.resizeChart(this.currentChartSize.width, chart);
    },
  };

  public pluginChartDataLabels = [ChartDataLabels];

  public chartType: ChartType = "bar";

  public coefficient;

  public currentChartSize: IChartSize;

  public chartInfos = {} as IResponsiveRange;

  onChangeOption(value: string) {
    this.selectedOption.emit(value);
  }

  handleFormatLabels = (value) => {
    const label =
      (value && formatCurrencyToString((value / TRANSLATION_TO_WIDTH) * this.coefficient, this.currencyCode)) ||
      (value === 0 || 0.0 ? "0.00" : "");
    if (label.length > 6 && this.isHide && !this.isShowAllDataLabel) {
      if (label.substring(0, 7).slice(-1) === "," || label.substring(0, 7).slice(-1) === ".") {
        return label.substring(0, 6) + "...";
      }
      return label.substring(0, 7) + "...";
    }
    return label;
  };

  autoPadding(chartWidth: number, totalItems: number, barThickness: number, paddingColumn: number, distanceColumn: number) {
    let temp = paddingColumn;
    const countSpace = totalItems <= 1 ? 0 : totalItems - 1;
    const totalWidth = totalItems * barThickness + totalItems * paddingColumn * 2 + distanceColumn * countSpace;
    let currentUsage = Number(((chartWidth - totalWidth) / 2).toFixed());

    while (currentUsage < 24) {
      temp = temp - 0.1;
      const newW = totalItems * barThickness + totalItems * temp * 2 + distanceColumn * countSpace;
      currentUsage = Number(((chartWidth - newW) / 2).toFixed());
    }
    return currentUsage;
  }

  autoPaddingMaxWidthLabel(chartWidth: number, totalItems: number, barThickness: number, distanceColumn: number) {
    const totalWidth = totalItems * barThickness + totalItems * distanceColumn;

    const currentUsage = Number(((chartWidth - totalWidth) / 2).toFixed());
    return currentUsage;
  }

  dataByRange(totalItems: number) {
    const data = responsiveRangeData.find((val) => {
      if (val.range[1]) return totalItems >= val.range[0] && totalItems <= val.range[1];
      else return totalItems >= val.range[0];
    });
    return data;
  }

  getFontSizeByItemLength(rangeData: IResponsiveRange) {
    return rangeData.dataLabelSize;
  }

  resizeChart(width: number, chart?: Chart) {
    const font = {
      size: this.chartInfos.dataLabelSize,
      weight: 500,
      family: `"Roboto", sans-serif`,
    };

    const paddingColDefault = 16;
    const totalItems = this.tempData.length;

    this.mockCtx = document.createElement("canvas").getContext("2d");
    if (this.mockCtx && !!this._data) {
      this.mockCtx.font = `${font.weight} ${this.chartInfos.dataLabelSize}px Roboto, sans-serif`;
      let maxWidthText = +this._data.datasets[0].data
        .reduce((pre: number, curr: number) => {
          const textWidth = this.mockCtx.measureText(this.handleFormatLabels(curr)).width;
          if (textWidth > pre) return textWidth;
          return pre;
        }, 0)
        .toFixed(0) as number;

      // check for x tick label
      this.mockCtx.font = `500 14px Roboto, sans-serif`;
      const labelList = this._data.labels as string[];

      const maxWidthLabel = +labelList
        .reduce((pre: number, curr: string) => {
          const labelWidth = this.mockCtx.measureText(curr).width + this.chartOptions.scales.x.ticks.padding * 2;
          if (labelWidth > pre) return labelWidth;
          return pre;
        }, 0)
        .toFixed(0) as number;

      if (maxWidthLabel > maxWidthText) maxWidthText = maxWidthLabel;

      let paddingReal = paddingColDefault;
      let marginReal = this.chartInfos.margin;
      if (maxWidthText > this.chartInfos.barThickness + paddingColDefault * 2) {
        paddingReal = (maxWidthText - this.chartInfos.barThickness) / 2 + 4;
        marginReal = 0;
      }

      const countSpace = totalItems <= 1 ? 0 : totalItems - 1;
      const totalWidth = totalItems * this.chartInfos.barThickness + totalItems * paddingReal * 2 + marginReal * countSpace + 24 * 2;
      this.notifierChartWidth.next(totalWidth);

      const paddingLR = this.autoPadding(width, totalItems, this.chartInfos.barThickness, paddingReal, marginReal);
      const autoPadding = {
        right: paddingLR,
        left: paddingLR,
        top: 40,
        bottom: 40,
      };

      if (chart) {
        chart.options.maintainAspectRatio = false;
        chart.options.layout.padding = autoPadding;
        chart.options.plugins.datalabels.font = font;
        chart.options.scales.y.ticks = {
          display: false,
        };
        chart.options.scales.y.grid = { ...this.chartOptions.scales.y.grid, drawTicks: false };
      } else {
        this.chartOptions.maintainAspectRatio = false;
        this.chartOptions.layout.padding = autoPadding;
        this.chartOptions.plugins.datalabels.font = font;
        this.chartOptions.scales.y.ticks = {
          display: false,
        };
      }
    }
  }
}
