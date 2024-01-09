import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { ActiveElement, Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { BaseChartDirective } from "ng2-charts";

import { IDataEmitChart, IDoughnutPadding, ILabelColor, initPadding } from "./top-location-removal.i";
import { BehaviorSubject, EMPTY, Subscription, combineLatest, from, fromEvent, of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: "imo-top-location-removal",
  templateUrl: "./top-location-removal.component.html",
  styleUrls: ["./top-location-removal.component.scss"],
})
export class TopLocationRemovalComponent implements AfterViewInit, OnDestroy {
  @ViewChild("chartCanvas") chartCanvas!: ElementRef;

  notifier = new BehaviorSubject(initPadding);
  cursor = new BehaviorSubject("default");

  ngAfterViewInit(): void {
    this.subscription.add(
      combineLatest([fromEvent(this.chartCanvas.nativeElement, "mousemove"), this.cursor])
        .pipe(
          switchMap(([event, cursor]) => {
            if (cursor !== "pointer") {
              this.chart.chart.canvas && (this.chart.chart.canvas.style.cursor = "default");
              const { offsetX: x, offsetY: y } = event as MouseEvent;
              return from(Object.keys(this.canvasSelectionRange)).pipe(
                switchMap((id) => {
                  if (
                    this.isMatchPoint(
                      x,
                      y,
                      this.canvasSelectionRange[id].startX,
                      this.canvasSelectionRange[id].endX,
                      this.canvasSelectionRange[id].startY,
                      this.canvasSelectionRange[id].endY,
                    )
                  ) {
                    return of("pointer");
                  } else {
                    return EMPTY;
                  }
                }),
                tap((cursor) => {
                  this.chart.chart.canvas.style.cursor = cursor;
                }),
              );
            } else {
              return EMPTY;
            }
          }),
        )
        .subscribe(),
    );

    this.subscription.add(
      fromEvent(this.chartCanvas.nativeElement, "click")
        .pipe(
          switchMap((event: MouseEvent) => {
            const { offsetX: x, offsetY: y } = event;
            return from(Object.keys(this.canvasSelectionRange)).pipe(
              switchMap((id) => {
                if (
                  this.isMatchPoint(
                    x,
                    y,
                    this.canvasSelectionRange[id].startX,
                    this.canvasSelectionRange[id].endX,
                    this.canvasSelectionRange[id].startY,
                    this.canvasSelectionRange[id].endY,
                  )
                ) {
                  return of(id);
                } else {
                  return EMPTY;
                }
              }),
              tap((id) => {
                const item = this.tempData[id];
                this.emitDataClick.emit({ item, index: +id });
              }),
            );
          }),
        )
        .subscribe(),
    );

    this.subscription.add(
      this.notifier.subscribe((padding) => {
        this.chart.chart.resize(this.width + padding.left + padding.right, this.height + padding.top + padding.bottom);
      }),
    );
  }
  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  @Input() titleChart: string;
  @Input() width = 400;
  @Input() height = 400;
  @Input() fitSizeItemLabel = 18;
  @Input() fitSizeTotalLabel = 20;
  @Input() charLengthFitSize = 12;
  @Input() isDisableZero = false;

  @Output() outPadding = new EventEmitter<IDoughnutPadding>();

  subscription = new Subscription();
  flagDraw = false;
  percentArrayValue: number[] = [];
  addPaddingResult = {};
  canvasSelectionRange = {};
  tooltipArrayValue = [];
  lastUpdated: IDoughnutPadding = { ...initPadding };
  ctx: CanvasRenderingContext2D;
  addY = {};

  @Input() set data(data: ILabelColor[]) {
    this.addY = {};
    this.tooltipArrayValue = [];
    this.lastUpdated = { ...initPadding };
    this.addPaddingResult = {};
    this.canvasSelectionRange = {};

    this.tempData = Object.assign([], data).map((chartValue: ILabelColor) => {
      return { ...chartValue, isDisabled: this.isDisableZero && chartValue.isDisabled };
    });

    const values = [];
    const bgColors = [];
    const textColors = [];
    const textSizes = [];
    let isShadow = false;

    let sumValue = 0;
    let zeroBgColor = "#E7EAF2";
    const rotationValue: number[] = [];
    this.tempDataBySort = data;

    this.tempDataBySort.forEach((item) => {
      const textColor = (Array.isArray(item.textColor) && item.textColor.length && item.textColor[0]) || item.textColor || "white";
      values.push(item.value);
      bgColors.push(item.bgColor);
      textColors.push(textColor);
      textSizes.push({
        size: item.textSize || this.textFitSize(this.fitSizeItemLabel, this.charLengthFitSize, item.current.length) || "20px",
        family: "Roboto",
        weight: 500,
      });
      sumValue += item.value;
      zeroBgColor = item.zeroBgColor ? item.zeroBgColor : zeroBgColor;
      isShadow = textColor === "white" || textColor === "#FFFFFF";
    });

    values.reduce((pre, current) => {
      const angle = ((pre + current / 2) / sumValue) * 360;
      if (angle <= 180 && angle >= 0) rotationValue.push(angle - 90);
      else if (angle <= 360 && angle > 180) rotationValue.push(angle + 90);
      return pre + current;
    }, 0);

    this.percentArrayValue = data.map((el) => {
      return Number((el.value * 100) / sumValue);
    });

    values.reduce((pre, current) => {
      const angle = ((pre + current / 2) / sumValue) * 360;
      let mathAngle = 0;

      if (angle >= 0 && angle <= 90) {
        mathAngle = 90 - angle;
      }
      if (angle > 90 && angle <= 180) {
        mathAngle = 90 * 3 + (180 - angle);
      }
      if (angle > 180 && angle <= 270) {
        mathAngle = 90 * 2 + (270 - angle);
      }
      if (angle > 270 && angle <= 360) {
        mathAngle = 90 + (360 - angle);
      }

      let x = Math.abs((this.width / 2) * Math.cos(mathAngle * (Math.PI / 180)));
      let y = Math.abs((this.width / 2) * Math.sin(mathAngle * (Math.PI / 180)));

      if (angle >= 0 && angle <= 90) {
        x = this.width / 2 + x;
        y = this.height / 2 - y;
      }
      if (angle > 90 && angle <= 180) {
        x = this.width / 2 + x;
        y = this.height / 2 + y;
      }
      if (angle > 180 && angle <= 270) {
        x = this.width / 2 - x;
        y = this.height / 2 + y;
      }
      if (angle > 270 && angle <= 360) {
        x = this.width / 2 - x;
        y = this.height / 2 - y;
      }

      this.tooltipArrayValue.push({ x, y });

      return pre + current;
    }, 0);

    this._data = {
      datasets: [
        {
          data: data.map((el) => el.value),
          backgroundColor: bgColors,
          borderWidth:
            values.length && (values.length === 1 || values.filter((value) => value === 0).length === values.length - 1) ? 0 : 0.4,
          hoverBackgroundColor: bgColors,
          sumValue,
          valuesDisplay: data.map((el) => el.current),
        },
      ] as any,
    };

    this.chartOptions = {
      plugins: {
        datalabels: {
          color: textColors,
          textShadowBlur: isShadow ? 5 : 0,
          textShadowColor: isShadow ? "rgb(0, 0, 0, 0.75)" : null,
          rotation: rotationValue,
          font: textSizes,
          formatter: this.handleFormatLabels,
        },
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
      onHover: (_event: ChartEvent, elements: ActiveElement[], chart: Chart) => {
        chart.canvas.style.cursor = elements.length !== 0 ? "pointer" : "default";
        this.cursor.next(chart.canvas.style.cursor);
      },
      onClick: (_, elements: ActiveElement[]) => {
        if (elements[0]) {
          const item = this.tempDataBySort[elements[0].index];
          this.emitDataClick.emit({ item, index: elements[0].index });
        }
      },
      hover: {},
      responsive: true,
      animation: {
        animateRotate: true,
      },
      maintainAspectRatio: false,
      cutout: "40%",
      layout: {
        padding: { ...initPadding },
      },
    };

    const ctx = document.createElement("canvas").getContext("2d");

    if (ctx && data.length) {
      const drawHalfwidth = this.width / 2;
      const drawHalfheigh = this.height / 2;
      const fontSize = 18;
      this.addY = this.calcAddYValue(this.percentArrayValue);

      this.tooltipArrayValue.forEach((position, index, arr) => {
        if (this.percentArrayValue[index] !== 0 && this.percentArrayValue[index] < 3) {
          ctx.lineWidth = 1.5;
          ctx.font = `500 ${fontSize}px Roboto`;
          ctx.textBaseline = "middle";

          const { x, y } = position;
          const extraLine = x >= drawHalfwidth ? 30 : -30;
          const xLine = x >= drawHalfwidth ? x + 25 : x - 25;
          let yLine = y >= drawHalfheigh ? y + 25 : y - 25;
          yLine = y >= drawHalfheigh ? yLine + this.addY[index] : yLine - this.addY[index];

          const plusFivePx = x >= drawHalfwidth ? 5 : -5;
          const textWidth = ctx.measureText(this.tempDataBySort[index].current).width + 5;

          const plusPaddingWidth = x >= drawHalfwidth ? textWidth : -textWidth;
          const plusPaddingHeight = y >= drawHalfheigh ? 20 : -20;

          this.addPaddingIndex(index, xLine + extraLine + plusFivePx + plusPaddingWidth, yLine + plusPaddingHeight, this.width + 2);
        }
        if (index === arr.length - 1) {
          const padding: IDoughnutPadding = this.calcPadding();
          this.chartOptions.layout.padding = { ...padding };
          this.lastUpdated = { ...padding };
          this.notifier.next(padding);
        }
      });
    }

    if (sumValue === 0) {
      this._data.datasets[0] = {
        ...this._data.datasets[0],
        data: [1],
        backgroundColor: zeroBgColor,
        hoverBackgroundColor: zeroBgColor,
        borderWidth: 0,
      };
      this.chartOptions = {
        ...this.chartOptions,
        plugins: {
          ...this.chartOptions.plugins,
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
        hover: {
          mode: null,
        },
        animation: {
          animateRotate: false,
        },
      };
    }

    this.pluginChartDataLabels = [
      ChartDataLabels,
      {
        id: "afterDraw",
        afterDraw: this.afterDraw,
      },
    ];
  }

  @Input() set totalValueChart(data: string) {
    if (!!data) {
      const fontSize = this.textFitSize(this.fitSizeTotalLabel, this.charLengthFitSize, data.length);

      this.doughnutChartPlugins = {
        beforeDraw(chart: Chart) {
          const ctx = chart.ctx;
          const txt = data;

          //Get options from the center object in options
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

          ctx.font = `700 ${fontSize} Roboto`;
          ctx.fillStyle = "#3B475F";

          // txt = txt.length > 13 ? txt.slice(0, 11).concat("...") : txt;
          // Draw text in center
          ctx.fillText(txt, centerX, centerY);
        },
      };

      this.pluginChartDataLabels = [...this.pluginChartDataLabels, this.doughnutChartPlugins];
    }
  }

  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;
  @Output() emitDataClick = new EventEmitter<IDataEmitChart>();

  public doughnutChartPlugins: any = {};

  public _data: ChartData<"doughnut">;

  public tempData: ILabelColor[] = [];

  public tempDataBySort: ILabelColor[] = [];

  public chartType: ChartType = "doughnut";

  public chartOptions: ChartConfiguration<"doughnut">["options"] = {};

  public handleFormatLabels = (value, context) => {
    const percentage = Number((value * 100) / context.dataset.sumValue);
    if (percentage >= 3) {
      const valueItem = this.tempData.find((item) => item.value === value)?.current || "";
      return valueItem;
    }
    return "";
  };

  public pluginChartDataLabels = [];

  labelClick(index: number) {
    !this.tempData[index].isDisabled && this.emitDataClick.emit({ item: this.tempData[index], index: index });
  }

  textFitSize(fitSize: number, maxCharLength: number, currentCharLength: number) {
    const reduce = currentCharLength <= 18 ? currentCharLength - maxCharLength : (currentCharLength - maxCharLength) * 0.8;
    const range = currentCharLength > maxCharLength ? reduce : 0;
    return `${fitSize - range}px`;
  }

  calcAddYValue(array: number[]) {
    const result = {};
    const rid = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
    };
    let percentage = 0;

    array.forEach((val, index) => {
      percentage += val;
      const calcPer = val / 2;

      let rangeIndex = Math.ceil((percentage - calcPer) / 12.5);
      rangeIndex = rangeIndex > 8 ? 8 : rangeIndex;

      val !== 0 && val < 3 && rid[rangeIndex].push(index);
    });

    Object.keys(rid).forEach((key) => {
      const indexRange = Number(key);

      let startAdd = 0;
      if ([4, 8].includes(indexRange) && rid[key].length && rid[indexRange - 1].length && rid[key][0] - 1 === rid[indexRange - 1].at(-1)) {
        startAdd = rid[indexRange - 1].length * 25;
      }
      if ([1, 5].includes(indexRange) && rid[key].length && rid[indexRange + 1].length && rid[key].at(-1) === rid[indexRange + 1][0] - 1) {
        startAdd = rid[indexRange + 1].length * 25;
      }
      rid[key].forEach((valByRangeId, index) => {
        if ([3, 4, 7, 8].includes(indexRange)) {
          result[valByRangeId] = startAdd + index * 25;
        }
        if ([1, 2, 5, 6].includes(indexRange)) {
          const length = rid[key].length;
          result[valByRangeId] = startAdd + (length - index - 1) * 25;
        }
      });
    });
    return result;
  }

  addPaddingIndex(index: number, x: number, y: number, diameter: number) {
    const addPadding = { ...initPadding };

    x = Math.round(x);
    y = Math.round(y);
    if (x > diameter) {
      addPadding.right = x - diameter;
    }
    if (x < 0) {
      addPadding.left = Math.abs(x);
    }

    if (y > diameter) {
      addPadding.bottom = y - diameter;
    }
    if (y < 0) {
      addPadding.top = Math.abs(y);
    }
    this.addPaddingResult[index] = addPadding;
  }

  calcPadding(): IDoughnutPadding {
    const resultPadding = { ...initPadding };

    Object.keys(this.addPaddingResult).forEach((key) => {
      Object.keys(resultPadding).forEach((rsKey) => {
        if (this.addPaddingResult[key][rsKey] > resultPadding[rsKey]) resultPadding[rsKey] = this.addPaddingResult[key][rsKey];
      });
    });
    return resultPadding;
  }

  afterDraw = (chart) => {
    const {
      ctx,
      chartArea: { width, height },
    } = chart as Chart;

    const padding = chart.options.layout.padding as IDoughnutPadding;
    this.outPadding.emit(this.lastUpdated);

    const cx = chart._metasets[0].data[0]?.x - padding.left;
    const cy = chart._metasets[0].data[0]?.y - padding.top;

    const cutout = 0.4;
    const defaultHypotenuse = width / 4;
    const currentHypotenuse = (width * cutout) / 2 + (width - width * cutout) / 4;

    const calcRange = (coordinate: number, radius: number, startPadding: number) => {
      if (coordinate >= radius) {
        return Math.abs(radius - (radius * 2 - coordinate) - startPadding);
      } else return Math.abs(radius - coordinate + startPadding);
    };

    const getRadian = (d: number, h: number) => {
      return Math.asin(d / h) * (180 / Math.PI) || 0;
    };

    const halfwidth = width / 2;
    const halfheight = height / 2;

    const drawHalfwidth = halfwidth + padding.left;
    const drawHalfheigh = halfheight + padding.top;

    const fontSize = 18;

    chart.data.datasets?.forEach((dataset, i) => {
      const valuesDisplay: string[] = dataset.valuesDisplay;

      chart.getDatasetMeta(i).data.forEach((dataPoint, index) => {
        const currentPercentage = this.percentArrayValue[index];

        if (currentPercentage !== 0 && currentPercentage < 3) {
          // start position
          const { x: a, y: b } = dataPoint.tooltipPosition();

          const dX = calcRange(a, halfwidth, padding.left);
          const dY = calcRange(b, halfheight, padding.top);

          const angleA = getRadian(dX, currentHypotenuse);
          const angleB = getRadian(dY, currentHypotenuse);

          const setX = defaultHypotenuse * Math.sin(angleA * (Math.PI / 180));
          const setY = defaultHypotenuse * Math.sin(angleB * (Math.PI / 180));

          const reduceX = a - padding.left >= halfwidth ? halfwidth + setX : halfwidth - setX;
          const reduceY = b - padding.top >= halfheight ? halfheight + setY : halfheight - setY;

          const x = 2 * reduceX - cx + padding.left;
          const y = 2 * reduceY - cy + padding.top;

          // draw line
          const extraLine = x >= drawHalfwidth ? 30 : -30;
          const xLine = x >= drawHalfwidth ? x + 25 : x - 25;
          let yLine = y >= drawHalfheigh ? y + 25 : y - 25;
          yLine = y >= drawHalfheigh ? yLine + this.addY[index] : yLine - this.addY[index];

          ctx.beginPath();
          // ctx.moveTo(x, y);
          // ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
          // ctx.fill();
          ctx.moveTo(x, y);
          ctx.lineTo(xLine, yLine);
          ctx.lineTo(xLine + extraLine, yLine);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = "#3B475F";

          const textXPosition = x >= drawHalfwidth ? "left" : "right";
          const plusFivePx = x >= drawHalfwidth ? 5 : -5;

          // draw text
          ctx.font = `500 ${fontSize}px Roboto`;
          ctx.textAlign = textXPosition;
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#101624";

          // ready display and calc range hover - click
          const textWidth = ctx.measureText(valuesDisplay[index]).width + 5;
          const textHeight = fontSize * 1.2;

          const plusPaddingWidth = x >= drawHalfwidth ? textWidth : -textWidth;

          ctx.stroke();
          ctx.fillText(valuesDisplay[index], xLine + extraLine + plusFivePx, yLine);

          const startX = x >= drawHalfwidth ? xLine + extraLine + plusFivePx : xLine + extraLine + plusFivePx + plusPaddingWidth;
          const endX = x >= drawHalfwidth ? xLine + extraLine + plusFivePx + plusPaddingWidth : xLine + extraLine + plusFivePx;
          const startY = yLine - textHeight / 2;
          const endY = yLine + textHeight / 2;

          this.canvasSelectionRange[index] = {
            startX,
            endX,
            startY,
            endY,
          };
        }
      });
    });
  };

  isMatchPoint(x: number, y: number, startX: number, endX: number, startY: number, endY: number) {
    return x >= startX && x <= endX && y >= startY && y <= endY ? true : false;
  }
}
