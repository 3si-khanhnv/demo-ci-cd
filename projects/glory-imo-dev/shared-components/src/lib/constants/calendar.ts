export enum WorkingDayOptions {
  MON = "monday",
  TUE = "tuesday",
  WED = "wednesday",
  THU = "thursday",
  FRI = "friday",
  SAT = "saturday",
  SUN = "sunday",
}

export enum PatternOptions {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

export enum DailyRepeatOptions {
  CIT_WORKING_DAY = "onlyCitWorkingDays",
  REPEAT_FREQUENCY = "onlyEveryXDays",
}

export enum MonthlyRepeatOptions {
  BY_WEEK_DAY = "repeatOnDayOfWeek",
  BY_MONTH_DAY = "repeatOnDayOfNumber",
}

export enum PositionDay {
  FIRST = "first",
  SECOND = "second",
  THIRD = "third",
  FOURTH = "fourth",
  LAST = "last",
}

export enum RecurrenceOptions {
  NEXT = "moveNext",
  PREVIOUS = "movePrevious",
  NEAREST = "moveNearest",
}

export enum CalendarType {
  SERVICE = "service",
  HOLIDAY = "holiday",
  EMERGENCY = "emergency",
}
