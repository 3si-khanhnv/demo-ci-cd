import { Injectable } from "@angular/core";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/en-gb";
import "dayjs/locale/ja";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import { ELocale } from "./dayjs.i";

@Injectable({
  providedIn: "root",
})
export class DayjsService {
  private default = "en";

  constructor() {
    const language = window.navigator && window.navigator.language;

    dayjs.extend(localizedFormat);
    dayjs.extend(utc);
    dayjs.locale(
      (Object.keys(ELocale)
        .map((key) => ELocale[key].toUpperCase())
        .indexOf(language.toUpperCase()) !== -1 &&
        language.toLowerCase()) ||
        this.default,
    );
  }

  updateLocale(locale: ELocale) {
    return dayjs.locale(locale);
  }

  format(value: string | Date, pattern = "LLL"): any {
    return (this.checkValid(value) && dayjs.utc(value).local().format(pattern)) || value || "";
  }

  checkValid(value: string | Date): boolean {
    return dayjs(value).isValid() && dayjs(new Date(value)).isValid();
  }

  toISOString(value: string | Date): any {
    return (this.checkValid(value) && dayjs(value).toISOString()) || value || "";
  }
}
