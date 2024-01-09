import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IToggleOption } from "./button-toggle.component.i";

@Component({
  selector: "imo-button-toggle",
  templateUrl: "./button-toggle.component.html",
  styleUrls: ["./button-toggle.component.scss"],
})
export class ButtonToggleComponent {
  @Input() toggleOptions: IToggleOption[] = [];
  @Input() defaultOption: string;

  @Output() selectedOption = new EventEmitter<string>();

  onChangeOption(value: string) {
    this.selectedOption.emit(value);
  }
}
