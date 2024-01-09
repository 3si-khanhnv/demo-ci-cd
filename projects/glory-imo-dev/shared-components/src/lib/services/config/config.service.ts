import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";

// import { environment } from "../../../environments/environment";
import { guessLocaleFormat } from "../../utilities/datetime";
import { DatetimeUtilities } from "../../utilities/common";

dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);

export interface IConfEndpoints {
  bff?: string;
  manageFE?: string;
  informFE?: string;
  manageBFF?: string;
  informBFF?: string;
}

export interface IConfClientFormats {
  dateFormat?: string;
  datetimeFormat?: string;
  timeFormat?: string;
  timeFormatWithSecond?: string;
  clientTimezone?: string;
  reportDatetimeFormat?: string;
  formatMM_DD?: string;
  formatM_D?: string;
  datetimeFormatSeconds?: string;
}

export interface IConfGoogleMaps {
  apiKey?: string;
}

export interface IConfSettings {
  inactivityTimeout?: number;
}

export let confEndpoints: IConfEndpoints = {};

export let confSettings: IConfSettings = {
  inactivityTimeout: 15,
};

export let manageApplicationId = 0;

export let informApplicationId = 0;

export let confClientFormats: IConfClientFormats = {};

export let confGoogleMaps: IConfGoogleMaps = {};

export let confOpenOtherApplicationLinkInNewTab = true;

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  constructor(private http: HttpClient) {
    guessLocaleFormat();
  }

  // configUrl = `${environment.configFolder}assets/config/app.config.json`;
  configUrl = `assets/config/app.config.json`;

  get dateTimeFormatDefault(): IConfClientFormats {
    let dateFormat = "YYYY/MM/DD";
    let timeFormat = "hh:mm:ss";
    let datetimeFormat = "YYYY/MM/DD hh:mm:ss";
    let formatMM_DD = "MM/DD";
    let formatM_D = "M/D";
    let timeFormatLTS = "hh:mm:ss";
    try {
      dateFormat = dayjs().localeData().longDateFormat("L");
    } catch (e) {}

    try {
      timeFormat = dayjs().localeData().longDateFormat("LT");
    } catch (e) {}

    try {
      datetimeFormat = dayjs().localeData().longDateFormat("LLL");
    } catch (e) {}

    try {
      const dayMonthYearFormat = dayjs().localeData().longDateFormat("L");
      formatMM_DD = DatetimeUtilities.getFormatMM_DDFromMM_DD_YYYY(dayMonthYearFormat);
    } catch (e) {}

    try {
      formatM_D = DatetimeUtilities.convertFormatMM_DDtoM_D(formatMM_DD);
    } catch (e) {}
    try {
      timeFormatLTS = dayjs().localeData().longDateFormat("LTS");
    } catch (e) {}
    dayjs.locale("en");
    return {
      dateFormat,
      reportDatetimeFormat: `${dateFormat} ${timeFormat}`,
      datetimeFormat,
      timeFormat,
      formatMM_DD,
      formatM_D,
      datetimeFormatSeconds: `${dateFormat} ${timeFormatLTS}`,
      timeFormatWithSecond: timeFormatLTS,
    };
  }

  public async load(): Promise<any> {
    return new Promise((resolve) => {
      this.http.get(this.configUrl).subscribe((response: any) => {
        confEndpoints = {
          bff: response.endpoints.bff,
          manageFE: response.endpoints.manageFE,
          informFE: response.endpoints.informFE,
          manageBFF: response.endpoints.manageBFF,
          informBFF: response.endpoints.informBFF,
        };
        confSettings = {
          inactivityTimeout: response.settings.inactivityTimeout ?? confSettings.inactivityTimeout,
        };
        manageApplicationId = response.manageApplicationId;
        informApplicationId = response.informApplicationId;
        confOpenOtherApplicationLinkInNewTab = response.openOtherApplicationLinkInNewTab;
        confClientFormats = {
          ...this.dateTimeFormatDefault,
          clientTimezone: dayjs.tz.guess(),
        };
        confGoogleMaps = {
          apiKey: response.googleMaps.apiKey,
        };
        resolve(true);
      });
    });
  }
}
