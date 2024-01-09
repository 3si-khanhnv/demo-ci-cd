import { UntypedFormControl } from "@angular/forms";

export interface RadioFormButton {
  name: string;
  value: string;
  isDisable?: boolean;
  formControl: UntypedFormControl;
  inputTextAlgin?: "left" | "right";
  defaultInputValue?: string;
  onBlurFormControl?: any;
}

export interface RadioFormValueChange {
  radioValue: string;
  formValue: string;
}
