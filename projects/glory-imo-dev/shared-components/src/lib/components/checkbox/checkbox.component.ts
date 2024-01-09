import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CheckboxData } from "./checkbox.component.i";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: "imo-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent {
  constructor() {}

  @Input() data: CheckboxData;
  @Input() disabled = false;
  @Output() onCheckedValue = new EventEmitter<CheckboxData>();
  @Output() onClickedTemp = new EventEmitter<boolean>();

  onClickChanged(change: MatCheckboxChange): void {
    this.data.value = change.checked;
    this.handleWhenOnChecked();
  }

  onCheckAfterClickedTemp($event) {
    if (this.onClickedTemp.observers.length) {
      $event.preventDefault();
      $event.stopPropagation();
      this.onClickedTemp.emit(!this.data.value);
      return;
    }
  }

  onChildrenCheckChanged(change: CheckboxData): void {
    this.onCheckedValue.emit(change);
  }

  onDisable(children: CheckboxData[]) {
    children?.forEach((child) => {
      if (!this.data.value && !child.alwayDisabledAndKeepValue) {
        child.disabled = true;
        child.value = false;
      }

      if (this.data.children) {
        // disable all child
        this.onDisable(child.children);
      }
    });
  }

  onKeyupChange(event: KeyboardEvent) {
    if (event.code === "Enter") {
      this.data.value = !this.data.value;
      this.handleWhenOnChecked();
    }
  }

  handleWhenOnChecked() {
    if (this.data.value) {
      this.data.children?.forEach((child) => {
        if (!child.alwayDisabledAndKeepValue) {
          child.disabled = false;
          child.value = false;
        }
      });
    } else {
      this.onDisable(this.data.children);
    }

    this.onCheckedValue.emit(this.data);
  }
}
