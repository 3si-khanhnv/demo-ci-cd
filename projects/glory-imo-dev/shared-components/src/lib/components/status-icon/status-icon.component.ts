import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Icons } from "../../constants/icons";

@Component({
  selector: "imo-status-icon",
  templateUrl: "./status-icon.component.html",
  styleUrls: ["./status-icon.component.scss"],
})
export class StatusIconComponent implements OnChanges {
  @Input() type: string;
  public url = "";
  public alt = "";
  public className = "";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type && changes.type.currentValue) {
      this.url = Icons[changes.type.currentValue].src;
      this.alt = Icons[changes.type.currentValue].alt;
      this.className = Icons[changes.type.currentValue].class;
    }
  }
}
