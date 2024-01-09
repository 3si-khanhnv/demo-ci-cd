import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
import { Component, Input } from "@angular/core";
import { ILabels, ILabelsByPercent } from "./removal-by-day.i";
@Component({
  selector: "imo-removal-by-day",
  templateUrl: "./removal-by-day.component.html",
  styleUrls: ["./removal-by-day.component.scss"],
  animations: [
    trigger("content", [
      transition("* => *", [
        query(":enter", style({ transform: "translateY(20%)", opacity: 0 }), { optional: true }),
        query(":enter", stagger("-150ms", [animate("300ms", style({ transform: "translateY(0%)", opacity: 1 }))]), { optional: true }),
      ]),
    ]),
  ],
})
export class RemovalByDayComponent {
  public _dataRemovalByDay: ILabelsByPercent[] = [];
  public _dataRemovalByDayTemp: ILabels[] = [];

  @Input() set dataRemovalByDay(data: ILabels[]) {
    this._dataRemovalByDayTemp = data;
    let total = 0;
    data.forEach((s) => {
      total += s.value;
    });
    this.total = total;
    this._dataRemovalByDay = data
      .filter((s) => s.value)
      .map((s) => ({
        ...s,
        percent: `${(s.value / this.total) * 100}%`,
      }));
  }
  @Input() labels: ILabels[];
  @Input() labelRemovalByDay: string;
  public total = 0;
  public height = "400px";
  public width = "280px";
}
