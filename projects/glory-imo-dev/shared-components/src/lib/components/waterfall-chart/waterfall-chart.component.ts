import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import Big from "big.js";
import { ActiveElement, Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import { BaseChartDirective } from "ng2-charts";
import pattern from "patternomaly";
import { BehaviorSubject, Subscription } from "rxjs";

import { formatCurrencyToString } from "../../utilities/common";
import { IChartSize, IResponsiveRange } from "../by-day-location-sales/by-day-location-sales.i";
import { DEFAULT_OPTION_CHART } from "./waterfall-chart.constant";
import { IDataChart, IDataEmitChart } from "./waterfall-chart.i";

@Component({
  selector: "imo-waterfall-chart",
  templateUrl: "./waterfall-chart.component.html",
  styleUrls: ["./waterfall-chart.component.scss"],
})
export class WaterFallChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;

  @ViewChild("canvasContainer") canvasContainer!: ElementRef<HTMLElement>;

  @ViewChild("waterfallContainer") waterfallContainer!: ElementRef<HTMLElement>;

  subscription = new Subscription();

  notifierChartWidth = new BehaviorSubject(0);

  public _data: ChartData<"bar", string[]>;

  public currents: any[] = [];

  public pluginChartDataLabels = [ChartDataLabels];

  public chartType: ChartType = "bar";

  public colorLine = "#B4B9C7";

  public tempData: IDataChart[] = [];

  private paddingLabelChart = 2;

  private barThickness = 80;

  public drawSuccess = false;

  private mockCtx: CanvasRenderingContext2D;

  public currentChartSize: IChartSize;

  @Input() title = "";

  @Input() currencyCode: string;

  @Input() width = 700;

  @Input() height = 424;

  @Output() emitDataClick = new EventEmitter<IDataEmitChart>();

  @Input() set data(data: IDataChart[]) {
    // reset value when change data
    const dataChart = [];

    const labels = [];

    const bgColors = [];

    this.paddingLabelChart = 2;

    data.forEach((item, index) => {
      item.label && labels.push((item.label.length <= 12 && item.label) || item.label.split(" "));
      dataChart.push(item.total);
      bgColors.push(item.color[0]);
      if (index === 0 || index === data.length - 1) this.currents.push(Number(item.total[1]));
      else {
        const value1 = new Big(item.total[1]);
        const value = value1.minus(data[index - 1].total[1]);
        this.currents.push(Number(value));
      }
    });

    let isNegative = false;

    for (let index = 0; index < this.currents.length; index++) {
      if (index != 0 && this.currents[index] != 0 && this.currents[index] + this.currents[index - 1] <= 0) {
        isNegative = true;
        break;
      }
    }

    if (isNegative) {
      const heightLabel = 15;
      const marginChartWithLabel = 8;
      this.paddingLabelChart = heightLabel + marginChartWithLabel;
    }

    this.createBg(dataChart, bgColors);

    this._data = {
      labels: labels,
      datasets: [
        {
          data: dataChart,
          backgroundColor: bgColors,
          barThickness: this.barThickness,
          hoverBackgroundColor: bgColors,
          barPercentage: 0.8,
          categoryPercentage: 0.8,
        },
      ],
    };

    this.tempData = data;
    const linePlugin = {
      id: "linePlugin",
      beforeInit: this.setWidthChart,
      afterDraw: this.drawLine,
      afterRender: () => {
        this.drawSuccess = true;
      },
    };

    this.chartInfos = {
      range: [0, 5],
      description: "From 0 to 5",
      barThickness: 80,
      margin: 24,
      dataLabelSize: 16,
    };

    this.chartOptions = {
      ...this.chartOptions,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        ...this.chartOptions.plugins,
        datalabels: {
          ...this.chartOptions.plugins.datalabels,
          anchor: this.handelAnchorAlign,
          align: this.handelAnchorAlign,
          formatter: this.handleFormatLabels,
          listeners: {
            click: this.clickDataLabel,
          },
        },
      },
      layout: {
        padding: {
          top: 25,
          bottom: 33,
        },
      },
      scales: {
        ...this.chartOptions.scales,
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            ...this.chartOptions.scales.x.ticks,
            padding: this.paddingLabelChart,
          },
        },
        y: {
          display: false,
          max: Math.max(...this.currents),
        },
      },

      onResize: (chart) => {
        this.setWidthChart(chart);
      },
    };

    this.pluginChartDataLabels = [ChartDataLabels, linePlugin];
  }

  private createBg(dataTotal: number[][], color: any[]) {
    dataTotal.forEach((item, index) => {
      if (Math.min(...item) < 0 && index === dataTotal.length - 1) {
        color[index] = pattern.draw("diagonal-right-left", color[index]);
      }
    });
  }

  public chartOptions: ChartConfiguration<"bar">["options"] = {
    ...DEFAULT_OPTION_CHART,
    onHover: (_data: ChartEvent, elements: ActiveElement[], chart: Chart) => {
      chart.canvas.style.cursor = elements.length !== 0 ? "pointer" : "pointer";
    },
    onClick: (_data, elements: ActiveElement[]) => {
      if (elements[0]) this.emitDataClick.emit({ item: this.tempData[elements[0].index], index: elements[0].index });
    },
  };

  public chartInfos = {} as IResponsiveRange;

  handleFormatLabels = (_, context: Context) => {
    const value = this.currents[context.dataIndex];
    const label = (value && formatCurrencyToString(value, this.currencyCode)) || "0.00";

    return label;
  };

  handelAnchorAlign = (context: Context) => {
    return this.currents[context.dataIndex] >= 0 ? "end" : "start";
  };

  clickDataLabel = (context: Context) => {
    this.emitDataClick.emit({ item: this.tempData[context.dataIndex], index: context.dataIndex });
  };

  drawLine(chart) {
    if (this.drawSuccess) return;
    const { ctx } = chart;
    ctx.save();
    ctx.fillStyle = this.colorLine;
    const columns = chart.getDatasetMeta(0).data;

    for (let i = 0; i < columns.length - 1; i++) {
      const a = columns[i];
      const b = columns[i + 1];
      const x = columns[i].x;

      let y;

      if (a.y === b.y) y = a.y;
      else if (a.y + a.height === b.y) y = b.y;
      else y = b.y + b.height;

      ctx.fillRect(x, y, columns[i + 1].x - columns[i].x, 0.1);
    }
    ctx.restore();
  }

  setWidthChart = (chart: Chart) => {
    const weight = 500;
    const size = 16;

    const marginLR = 60;

    const marginLabel = 4;

    let maxWidthLabel = 0;

    this.currents.map((value) => {
      const label = (value && formatCurrencyToString(value, this.currencyCode)) || "0.00";
      const widthLabel = this.getWidthText(label, weight, size);

      maxWidthLabel = maxWidthLabel > widthLabel ? maxWidthLabel : widthLabel;
    });
    maxWidthLabel = maxWidthLabel > this.barThickness ? maxWidthLabel : this.barThickness;

    const w = maxWidthLabel * this.currents.length + 24 * (this.currents.length - 1) + (marginLR - marginLabel) * 2;

    chart.options.layout.padding = {
      ...(chart.options.layout.padding as any),
      left: 50,
      right: 50,
    };
    this.notifierChartWidth.next(w);
  };

  getWidthText(value: string, weight: number, size: number) {
    this.mockCtx = document.createElement("canvas").getContext("2d");
    this.mockCtx.font = `${weight} ${size}px Roboto, sans-serif`;
    return this.mockCtx.measureText(value).width;
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.notifierChartWidth.subscribe((width) => {
        if (
          this.canvasContainer?.nativeElement &&
          this.waterfallContainer?.nativeElement &&
          width > this.waterfallContainer?.nativeElement.offsetWidth
        ) {
          this.waterfallContainer.nativeElement.setAttributeNS(
            null,
            "style",
            `overflow-x: auto; overflow-y: hidden; max-height: ${this.height}px`,
          );
          this.canvasContainer.nativeElement.setAttributeNS(null, "style", `width: ${width}px;`);
          this.chart.chart.resize(width, this.height);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
