export interface TimePickerErrorMessages {
  imoTimepickerParse: string;
  imoTimepickerMax: string;
  imoTimepickerMin: string;
}

export interface Labels {
  placeholder: string;
  errorMessages: TimePickerErrorMessages;
}

export enum TabConfig {
  LABEL_WORK_DAYS = "Working days",
  LABEL_WORK_TIME = "Cut off time",
  LABEL_SEND_TIME = "Send time",
  LABEL_WORK_TIME_ZONE_TYPE = "Time zone",
  LABEL_LATE_VISIT_ALERT_TIME = "Late visit alert time",
  LABEL_ALWAYS_IN_LOCATION_TIME = "This is always in location time",
  TIME_FORMAT = "HH:mm a",
  LABEL_HOLIDAY_CALENDARS = "Holiday calendars",
  DAY_OF_WEEK = "dddd",
  SKIP_HOLIDAY_CALENDAR = "Skip",
  FORMAT_DAY_IN_STORE = "YYYY-MM-DD",
}