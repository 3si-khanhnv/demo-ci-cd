import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { IChartRateData } from "./chart-rate.i";

@Component({
  selector: "imo-chart-rate",
  templateUrl: "./chart-rate.component.html",
  styleUrls: ["./chart-rate.component.scss"],
})
export class ChartRateComponent implements OnInit {
  @Input() data: IChartRateData[];
  @Input() view: any[] = [160, 160];
  @Input() animations = true;
  @Input() isDoughnut = true;
  @Input() labels = false;
  @Input() arcWidth = 0.25;
  @Output() select = new EventEmitter<any>();
  // options
  @Input() gradient = true;

  @Input() colorScheme = {
    domain: ["#22BB86", "#FFD800", "#E74E30"],
  };

  @Input() contentChart: any;

  ngOnInit(): void {
    Object.assign(this, { single: this.data });
  }
  onPieSliceSelect($event) {
    this.select.emit($event);
  }
}
