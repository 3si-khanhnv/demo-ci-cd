export interface DatePickerErrorMessage {
  matDatepickerMin: string;
  matDatepickerMax: string;
  matDatepickerParse: string;
}

export interface Labels {
  placeholder: string;
  errorMessages?: DatePickerErrorMessage;
}
