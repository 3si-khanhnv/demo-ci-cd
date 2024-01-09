import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OptionValue } from "../checkbox-list/checkbox-list.component.i";
import { CheckboxListWithStaticData, LabelledValue } from "./checkbox-list-with-static.component.i";

@Component({
  selector: "imo-checkbox-list-with-static",
  templateUrl: "./checkbox-list-with-static.component.html",
  styleUrls: ["./checkbox-list-with-static.component.scss"],
})
export class CheckboxListWithStaticComponent {
  _listWithCheckbox: LabelledValue<string>[];
  _listWithoutCheckbox: LabelledValue<string>[];
  _data: CheckboxListWithStaticData;

  @Input() set data(data: CheckboxListWithStaticData) {
    this._data = data;
    this._listWithoutCheckbox = data.list.filter((option) => option.readonly);
    this._listWithCheckbox = data.list.filter((option) => !option.readonly);
  }

  get data(): CheckboxListWithStaticData {
    return this._data;
  }

  get listWithCheckbox(): LabelledValue<string>[] {
    return this._listWithCheckbox;
  }

  get listWithoutCheckbox(): LabelledValue<string>[] {
    return this._listWithoutCheckbox;
  }

  @Output() checkedOptions = new EventEmitter<OptionValue>();
}
