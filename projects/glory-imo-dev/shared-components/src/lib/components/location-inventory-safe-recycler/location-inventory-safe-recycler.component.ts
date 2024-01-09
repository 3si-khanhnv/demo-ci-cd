import { Component, Input } from "@angular/core";
import { ChartConfiguration, ChartData, ChartType } from "chart.js";
import {
  BORDER_WIDTH,
  DEFAULT_OPTION_CHART,
  RECYCLER,
  TEXT_COLOR_CHART,
  TEXT_FONT_FAMILY_CHART,
  TEXT_FONT_SIZE_CHART,
  WIDTH_CHART,
} from "./location-inventory-safe-recycler.constant";
import { ILabelColor, ILocationSafeRecycler } from "./location-inventory-safe-recycler.i";
import { formatCurrencyToString } from "../../utilities/common";
@Component({
  selector: "imo-location-inventory-safe-recycler",
  templateUrl: "./location-inventory-safe-recycler.component.html",
  styleUrls: ["./location-inventory-safe-recycler.component.scss"],
})
export class LocationInventorySafeRecyclerComponent {
  @Input() set chartOptions(option: ChartConfiguration<"radar">["options"]) {
    this._chartOptions = {
      ...this._chartOptions,
      ...option,
    };
  }

  @Input() ChartWidth = WIDTH_CHART;

  @Input() titleChart: string;

  @Input() currencyCode: string;

  @Input() set data(data: ILocationSafeRecycler) {
    const valueLabels = [];
    const recyclerValues = [];
    const safeValues = [];

    data.dataChart.forEach((item) => {
      const lessLabel =
        (item.locationName && item.locationName.length <= 13 && item.locationName) || `${item.locationName.slice(0, 13)}...`;
      valueLabels.push(lessLabel);
      recyclerValues.push(item.recyclerValue);
      safeValues.push(item.safeValue);
    });
    this.labelsColor = data.labels;
    const datasets = [];
    data.labels.map((item) => {
      item.label === RECYCLER
        ? datasets.push({
            label: item.label,
            fill: false,
            data: recyclerValues,
            borderWidth: item.borderWidth || BORDER_WIDTH,
            borderColor: item.bgColor,
          })
        : datasets.push({
            label: item.label,
            fill: false,
            data: safeValues,
            borderWidth: item.borderWidth || BORDER_WIDTH,
            borderColor: item.bgColor,
          });
    });
    this._data = {
      datasets: datasets,
      labels: valueLabels,
    };
    const maxSuggest = Math.max(...recyclerValues, ...safeValues);
    this._chartOptions.scales.r.suggestedMax = maxSuggest;
    this._chartOptions.scales.r.suggestedMin = 0;
  }

  chartType: ChartType = "radar";

  _data: ChartData<"radar">;
  _chartOptions: ChartConfiguration<"radar">["options"] = DEFAULT_OPTION_CHART;

  labelsColor: ILabelColor[];

  afterDraw = (chart: any) => {
    const scale = chart.scales.r;
    const r = scale.drawingArea;
    const ctx = scale.ctx;
    const angle = scale.getIndexAngle(0) - Math.PI / 2;
    const x = scale.xCenter + Math.cos(angle) * r;
    ctx.save();
    ctx.beginPath();

    scale.ticks.forEach((tick, index) => {
      if (index !== 0) {
        ctx.textAlign = "center";
        ctx.font = `${TEXT_FONT_SIZE_CHART}px ${TEXT_FONT_FAMILY_CHART}`;
        ctx.fillStyle = TEXT_COLOR_CHART;
        const point = scale.getPointPositionForValue(index * scale._pointLabels.length, tick.value);
        ctx.fillText(formatCurrencyToString(tick.value, this.currencyCode), x, point.y + 9);
      }
    });
    ctx.fill();
    ctx.restore();
  };

  barChartPlugins = [
    {
      id: "custom_labels",
      afterDraw: this.afterDraw,
    },
  ];
}
