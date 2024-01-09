import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { MatCheckbox } from "@angular/material/checkbox";
import { LabelledValue, OptionValue } from "./checkbox-list.component.i";

@Component({
  selector: "imo-checkbox-list",
  templateUrl: "./checkbox-list.component.html",
  styleUrls: ["./checkbox-list.component.scss"],
})
export class CheckboxListComponent {
  // tslint:disable: variable-name
  private _checkedItem: string[];
  private _list: LabelledValue<string>[];

  @Input()
  set list(value: LabelledValue<string>[]) {
    this._list = value;
  }
  get list() {
    return this._list || [];
  }

  @Input()
  set checkedItem(value: string[]) {
    this._checkedItem = value;
  }
  get checkedItem() {
    return this._checkedItem || [];
  }

  @Input() isColumn = true;
  @Output() checked = new EventEmitter<OptionValue>();

  @ViewChildren(MatCheckbox) matCheckboxes: QueryList<MatCheckbox>;

  public onCheck(check: boolean, content: string) {
    const value: OptionValue = {
      key: content,
      value: check,
    };
    this.checked.emit(value);
  }

  public isChecked(content: string) {
    return this.checkedItem.includes(content);
  }

  onKeyup(event: KeyboardEvent, index: number) {
    if (event.code === "Enter") {
      const checkbox = this.matCheckboxes.find((item, i) => index === i);
      const result = { checked: !checkbox.checked, source: checkbox };
      checkbox.checked = result.checked;
      checkbox.change.next(result);
    }
  }
}
