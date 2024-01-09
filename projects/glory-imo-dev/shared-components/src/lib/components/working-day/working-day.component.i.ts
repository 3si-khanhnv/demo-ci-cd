import { UntypedFormControl } from "@angular/forms";
import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";

export interface WorkDayCheckbox extends LabelledValue<string> {
  checked?: boolean;
}

export interface WorkingDay {
  checkbox: WorkDayCheckbox;
  input: UntypedFormControl;
}

export interface WorkingDayValue {
  isWorking: boolean;
  leadDays: number;
}
