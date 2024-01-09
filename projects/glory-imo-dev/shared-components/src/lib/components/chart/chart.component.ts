import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Chart, ChartDataset, Plugin, registerables } from "chart.js";
import type { ChartOptions, ChartType } from "chart.js";
import "./dayjs-chartjs-adapter";
import { BaseChartDirective } from "ng2-charts";
@Component({
  selector: "imo-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements AfterViewInit {
  @Input() chartType: ChartType;
  @Input() chartData: ChartDataset[];
  @Input() chartLabels: string[];
  @Input() chartOptions: ChartOptions;
  @Input() plugins: Plugin<ChartType>[];

  @Output() reloadChartFunction = new EventEmitter<CallableFunction>();

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor() {
    Chart.register(...registerables);
  }
  ngAfterViewInit(): void {
    const reload = () => this.chart.update();
    this.reloadChartFunction.emit(reload);
  }
}
