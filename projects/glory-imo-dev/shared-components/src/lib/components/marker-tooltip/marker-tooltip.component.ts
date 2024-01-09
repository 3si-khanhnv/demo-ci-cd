import { Component, Input } from "@angular/core";
import { ENumIconStatus } from "../status-icon/status-icon.i";
import { IMarkerToolTip } from "./marker-tooltip.i";

@Component({
  selector: "imo-marker-tooltip",
  templateUrl: "./marker-tooltip.component.html",
  styleUrls: ["./marker-tooltip.component.scss"],
})
export class MarkerTooltipComponent {
  @Input() data: IMarkerToolTip;
  public iconStatus = ENumIconStatus;
}
