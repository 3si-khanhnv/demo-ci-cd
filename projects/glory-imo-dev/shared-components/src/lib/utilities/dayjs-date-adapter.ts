import { Inject, InjectionToken, Optional } from "@angular/core";
import { DateAdapter, MatDateFormats, MAT_DATE_LOCALE } from "@angular/material/core";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import { confClientFormats } from "../services/config/config.service";
import { TranslateService } from "@ngx-translate/core";
import * as tokens from "../../assets/i18n/token.json";
const { inform } = tokens;
export const MAT_DAYJS_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: "D/M/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "DD/MM/YYYY",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

export interface DayJsDateAdapterOptions {
  useUtc?: boolean;
}

export const MAT_DAYJS_DATE_ADAPTER_OPTIONS = new InjectionToken<DayJsDateAdapterOptions>("MAT_DAYJS_DATE_ADAPTER_OPTIONS", {
  providedIn: "root",
  factory: MAT_DAYJS_DATE_ADAPTER_OPTIONS_FACTORY,
});

export function MAT_DAYJS_DATE_ADAPTER_OPTIONS_FACTORY(): DayJsDateAdapterOptions {
  return {
    useUtc: false,
  };
}

function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

export class DayjsDateAdapter extends DateAdapter<Dayjs> {
  private localeData: {
    firstDayOfWeek: number;
    longMonths: string[];
    shortMonths: string[];
    dates: string[];
    longDaysOfWeek: string[];
    shortDaysOfWeek: string[];
    narrowDaysOfWeek: string[];
  };
  public showShortName = false;

  public dateFormat = confClientFormats.dateFormat;
  public shortDaysOfWeek: string[] = [];
  public daysOfWeek: string[] = [];
  public narrowDaysOfWeek: string[] = [];

  public shortMonthOfYear: string[] = [];
  public monthOfYear: string[] = [];

  constructor(
    private translateService: TranslateService,
    @Optional() @Inject(MAT_DATE_LOCALE) public dateLocale: string,
    @Optional() @Inject(MAT_DAYJS_DATE_ADAPTER_OPTIONS) private options?: DayJsDateAdapterOptions,
  ) {
    super();
    this.initializeParser();
    this.setLocale(dateLocale || dayjs.locale());
    const {
      shortDayOfWeekSunday,
      shortDayOfWeekMonday,
      shortDayOfWeekTuesday,
      shortDayOfWeekWednesday,
      shortDayOfWeekThursday,
      shortDayOfWeekFriday,
      shortDayOfWeekSaturday,
      dayOfWeekSunday,
      dayOfWeekMonday,
      dayOfWeekTuesday,
      dayOfWeekWednesday,
      dayOfWeekThursday,
      dayOfWeekFriday,
      dayOfWeekSaturday,
      narrowDayOfWeekSunday,
      narrowDayOfWeekMonday,
      narrowDayOfWeekTuesday,
      narrowDayOfWeekWednesday,
      narrowDayOfWeekThursday,
      narrowDayOfWeekFriday,
      narrowDayOfWeekSaturday,
      shortMonthOfYearJan,
      shortMonthOfYearFeb,
      shortMonthOfYearMar,
      shortMonthOfYearApr,
      shortMonthOfYearMay,
      shortMonthOfYearJun,
      shortMonthOfYearJul,
      shortMonthOfYearAug,
      shortMonthOfYearSep,
      shortMonthOfYearOct,
      shortMonthOfYearNov,
      shortMonthOfYearDec,
      monthOfYearJanuary,
      monthOfYearFebruary,
      monthOfYearMarch,
      monthOfYearApril,
      monthOfYearMay,
      monthOfYearJune,
      monthOfYearJuly,
      monthOfYearAugust,
      monthOfYearSeptember,
      monthOfYearOctober,
      monthOfYearNovember,
      monthOfYearDecember,
    } = inform.common;
    this.translateService
      .get([
        shortDayOfWeekSunday,
        shortDayOfWeekMonday,
        shortDayOfWeekTuesday,
        shortDayOfWeekWednesday,
        shortDayOfWeekThursday,
        shortDayOfWeekFriday,
        shortDayOfWeekSaturday,
        dayOfWeekSunday,
        dayOfWeekMonday,
        dayOfWeekTuesday,
        dayOfWeekWednesday,
        dayOfWeekThursday,
        dayOfWeekFriday,
        dayOfWeekSaturday,
        narrowDayOfWeekSunday,
        narrowDayOfWeekMonday,
        narrowDayOfWeekTuesday,
        narrowDayOfWeekWednesday,
        narrowDayOfWeekThursday,
        narrowDayOfWeekFriday,
        narrowDayOfWeekSaturday,
        shortMonthOfYearJan,
        shortMonthOfYearFeb,
        shortMonthOfYearMar,
        shortMonthOfYearApr,
        shortMonthOfYearMay,
        shortMonthOfYearJun,
        shortMonthOfYearJul,
        shortMonthOfYearAug,
        shortMonthOfYearSep,
        shortMonthOfYearOct,
        shortMonthOfYearNov,
        shortMonthOfYearDec,
        monthOfYearJanuary,
        monthOfYearFebruary,
        monthOfYearMarch,
        monthOfYearApril,
        monthOfYearMay,
        monthOfYearJune,
        monthOfYearJuly,
        monthOfYearAugust,
        monthOfYearSeptember,
        monthOfYearOctober,
        monthOfYearNovember,
        monthOfYearDecember,
      ])
      .subscribe((data) => {
        this.shortDaysOfWeek = [
          data[shortDayOfWeekSunday],
          data[shortDayOfWeekMonday],
          data[shortDayOfWeekTuesday],
          data[shortDayOfWeekWednesday],
          data[shortDayOfWeekThursday],
          data[shortDayOfWeekFriday],
          data[shortDayOfWeekSaturday],
        ].filter((s) => s);
        this.daysOfWeek = [
          data[dayOfWeekSunday],
          data[dayOfWeekMonday],
          data[dayOfWeekTuesday],
          data[dayOfWeekWednesday],
          data[dayOfWeekThursday],
          data[dayOfWeekFriday],
          data[dayOfWeekSaturday],
        ].filter((s) => s);
        this.narrowDaysOfWeek = [
          data[narrowDayOfWeekSunday],
          data[narrowDayOfWeekMonday],
          data[narrowDayOfWeekTuesday],
          data[narrowDayOfWeekWednesday],
          data[narrowDayOfWeekThursday],
          data[narrowDayOfWeekFriday],
          data[narrowDayOfWeekSaturday],
        ].filter((s) => s);
        this.shortMonthOfYear = [
          data[shortMonthOfYearJan],
          data[shortMonthOfYearFeb],
          data[shortMonthOfYearMar],
          data[shortMonthOfYearApr],
          data[shortMonthOfYearMay],
          data[shortMonthOfYearJun],
          data[shortMonthOfYearJul],
          data[shortMonthOfYearAug],
          data[shortMonthOfYearSep],
          data[shortMonthOfYearOct],
          data[shortMonthOfYearNov],
          data[shortMonthOfYearDec],
        ].filter((s) => s);
        this.monthOfYear = [
          data[monthOfYearJanuary],
          data[monthOfYearFebruary],
          data[monthOfYearMarch],
          data[monthOfYearApril],
          data[monthOfYearMay],
          data[monthOfYearJune],
          data[monthOfYearJuly],
          data[monthOfYearAugust],
          data[monthOfYearSeptember],
          data[monthOfYearOctober],
          data[monthOfYearNovember],
          data[monthOfYearDecember],
        ].filter((s) => s);
      });
  }

  initializeParser() {
    if (this.shouldUseUtc) {
      dayjs.extend(utc);
    }

    dayjs.extend(localizedFormat);
    dayjs.extend(customParseFormat);
    dayjs.extend(localeData);
  }

  dayJs(input?: any, format?: string, locale?: string): Dayjs {
    if (!this.shouldUseUtc) {
      return dayjs(input, format, locale, false);
    }
    return dayjs(input, { format, locale, utc: this.shouldUseUtc }, locale).utc();
  }

  get shouldUseUtc(): boolean {
    const { useUtc }: DayJsDateAdapterOptions = this.options || {};
    return !!useUtc;
  }

  getYear(date: Dayjs): number {
    return this.dayJs(date).year();
  }

  getMonth(date: Dayjs): number {
    return this.dayJs(date).month();
  }

  getDate(date: Dayjs): number {
    return this.dayJs(date).date();
  }

  getDayOfWeek(date: Dayjs): number {
    return this.dayJs(date).day();
  }

  getMonthNames(style: "long" | "short" | "narrow"): string[] {
    return style === "long"
      ? (this.monthOfYear.length && this.monthOfYear) || this.localeData.longMonths
      : (this.shortMonthOfYear.length && this.shortMonthOfYear) || this.localeData.shortMonths;
  }

  getDateNames(): string[] {
    return this.localeData.dates;
  }

  getDayOfWeekNames(style: "long" | "short" | "narrow"): string[] {
    if (style === "long") {
      return (this.daysOfWeek.length && this.daysOfWeek) || this.localeData.longDaysOfWeek;
    }

    if (style === "short") {
      return (this.shortDaysOfWeek.length && this.shortDaysOfWeek) || this.localeData.shortDaysOfWeek;
    }

    return (this.narrowDaysOfWeek.length && this.narrowDaysOfWeek) || this.localeData.narrowDaysOfWeek;
  }

  getYearName(date: Dayjs): string {
    return this.dayJs(date).format("YYYY");
  }

  getFirstDayOfWeek(): number {
    return this.localeData.firstDayOfWeek;
  }

  getNumDaysInMonth(date: Dayjs): number {
    return this.dayJs(date).daysInMonth();
  }

  clone(date: Dayjs): Dayjs {
    return date.clone();
  }

  createDate(year: number, month: number, date: number): Dayjs {
    const returnDayjs = this.dayJs().set("year", year).set("month", month).set("date", date);
    return returnDayjs;
  }

  today(): Dayjs {
    return this.dayJs();
  }

  parse(value: any, parseFormat: any): Dayjs {
    if (value && typeof value === "string") {
      return this.dayJs(value, parseFormat, this.locale);
    }
    return value ? this.dayJs(value).locale(this.locale) : null;
  }

  format(date: Dayjs, displayFormat: any): string {
    if (!this.isValid(date)) {
      throw Error("DayjsDateAdapter: Cannot format invalid date.");
    }

    if (this.showShortName) {
      return dayjs(date).format(this.dateFormat);
    }
    return date.locale(this.locale).format(displayFormat);
  }

  addCalendarYears(date: Dayjs, years: number): Dayjs {
    return date.add(years, "year");
  }

  addCalendarMonths(date: Dayjs, months: number): Dayjs {
    return date.add(months, "month");
  }

  addCalendarDays(date: Dayjs, days: number): Dayjs {
    return date.add(days, "day");
  }

  toIso8601(date: Dayjs): string {
    return date.toISOString();
  }

  isDateInstance(obj: any): boolean {
    return dayjs.isDayjs(obj);
  }

  isValid(date: Dayjs): boolean {
    return this.dayJs(date).isValid();
  }

  invalid(): Dayjs {
    return this.dayJs(null);
  }

  setLocale(locale: string) {
    super.setLocale(locale);

    const dayJsLocaleData = this.dayJs().localeData();
    this.localeData = {
      firstDayOfWeek: dayJsLocaleData.firstDayOfWeek(),
      longMonths: dayJsLocaleData.months(),
      shortMonths: dayJsLocaleData.monthsShort(),
      dates: range(31, (i) => this.createDate(2017, 0, i + 1).format("D")),
      longDaysOfWeek: range(7, (i) => this.dayJs().set("day", i).format("dddd")),
      shortDaysOfWeek: dayJsLocaleData.weekdaysShort(),
      narrowDaysOfWeek: dayJsLocaleData.weekdaysMin(),
    };
  }

  deserialize(value: any): Dayjs | null {
    let date: Dayjs | string | any;

    if (value instanceof Date) {
      date = this.dayJs(value);
    } else if (this.isDateInstance(value)) {
      return this.clone(value);
    }

    if (typeof value === "string") {
      if (!value) {
        return null;
      }
      date = this.dayJs(value).toISOString();
    }

    if (date && this.isValid(date)) {
      return this.dayJs(date);
    }

    return super.deserialize(value);
  }
}
