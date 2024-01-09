import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatRadioChange } from "@angular/material/radio";
import { RadioFormButton } from "./radio-form-list.component.i";

@Component({
  selector: "imo-radio-form-list",
  templateUrl: "./radio-form-list.component.html",
  styleUrls: ["./radio-form-list.component.scss"],
})
export class RadioFormListComponent implements OnInit {
  @Input() radios: RadioFormButton[];
  @Input() defaultValue: string;
  @Input() isDisabled: boolean;
  @Input() isHideRadioWhenHaveAOption = true;

  @Output() radioChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  get checkedValue() {
    let result: RadioFormButton;

    if (this.defaultValue) {
      result = this.radios.find((x) => x.value === this.defaultValue);
    } else {
      result = this.radios.find((x, index) => index === 0);
    }

    return result;
  }

  onRadioChange(event: Partial<MatRadioChange>) {
    this.defaultValue = event.value;
    this.radioChanged.emit(this.defaultValue);
  }
}
