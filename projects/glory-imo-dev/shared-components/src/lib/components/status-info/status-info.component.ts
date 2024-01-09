import { Component, Input } from "@angular/core";
import { IStatusInfo } from "./status-info.i";

@Component({
  selector: "imo-status-info",
  templateUrl: "./status-info.component.html",
  styleUrls: ["./status-info.component.scss"],
})
export class StatusInfoComponent {
  @Input() data: IStatusInfo;
  @Input() type: string;
  @Input() isResize = false;
}
