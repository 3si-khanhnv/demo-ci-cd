import { Component, Input } from "@angular/core";
import { Icons } from "../../constants/icons";

@Component({
  selector: "imo-holiday-cell-view",
  templateUrl: "./holiday-cell-view.component.html",
  styleUrls: ["./holiday-cell-view.component.scss"],
})
export class HolidayCellViewComponent {
  @Input() holidayDate = "";
  @Input() options: string[] = [];
  public check = Icons.check;
}
