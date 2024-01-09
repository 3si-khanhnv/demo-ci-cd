import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";

@Component({
  selector: "imo-switches",
  templateUrl: "./switches.component.html",
  styleUrls: ["./switches.component.scss"],
})
export class SwitchesComponent {
  @Input() isCheck = false;
  @Input() isDisabled = false;
  @Output() changed = new EventEmitter<boolean>();

  onChange(ob: MatSlideToggleChange) {
    return this.changed.emit(ob.checked);
  }
}
