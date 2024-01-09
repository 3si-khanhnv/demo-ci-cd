import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";
import { RadioButton } from "./radio.component.i";
import { MatRadioChange } from "@angular/material/radio";

@Component({
  selector: "imo-radio",
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.scss"],
})
export class RadioComponent {
  @Input() radios: RadioButton[];
  @Input() defaultValue: string;
  @Input() isDisabled: boolean;

  @Output() changed = new EventEmitter<string>();
  @HostBinding("attr.role") role = "radio";

  get checkedValue() {
    let result: RadioButton;

    if (this.defaultValue) {
      result = this.radios.find((x) => x.value === this.defaultValue);
    } else {
      result = this.radios.find((x, index) => index === 0);
    }

    return result;
  }

  onChange(event: Partial<MatRadioChange>) {
    this.changed.emit(event.value);
  }
}
