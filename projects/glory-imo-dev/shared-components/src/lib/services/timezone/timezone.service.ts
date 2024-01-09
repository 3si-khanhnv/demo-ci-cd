import { Injectable } from "@angular/core";
import { TIMEZONES } from "./timezone.constant";
import { Timezone, TimezoneData } from "./timezone.i";

@Injectable({
  providedIn: "root",
})
export class TimezoneService {
  listTimezone: Timezone[];
  readonly defaultTimezone = "Etc/UTC";
  readonly notFoundValue = undefined;

  constructor() {
    this.listTimezone = this.getListTimezone();
  }

  getListTimezone() {
    return TIMEZONES.map((v) => ({
      label: v.name,
      value: v.timezoneIdentifier,
    }));
  }

  mappingPreferTimezoneIdentifierProperty(tz: string): TimezoneData | undefined {
    return TIMEZONES.find((v) => v.timezoneIdentifier == tz);
  }

  mappingPreferMappingProperty(tz: string): TimezoneData | undefined {
    return TIMEZONES.find((v) => v.mapping.includes(tz));
  }

  mappingToSupportTimezone(tz: string): string | undefined {
    const preferTimezoneIdentifier = this.mappingPreferTimezoneIdentifierProperty(tz);
    if (preferTimezoneIdentifier) return preferTimezoneIdentifier.timezoneIdentifier;

    const preferMapping = this.mappingPreferMappingProperty(tz);
    if (preferMapping) return preferMapping.timezoneIdentifier;

    return this.notFoundValue;
  }

  /**
   * @example "Asia/Tokyo" => "(UTC+09:00) Osaka, Sapporo, Tokyo"
   */
  mappingToLabel(tz: string): string | undefined {
    const preferTimezoneIdentifier = this.mappingPreferTimezoneIdentifierProperty(tz);
    if (preferTimezoneIdentifier) return preferTimezoneIdentifier.name;

    const preferMapping = this.mappingPreferMappingProperty(tz);
    if (preferMapping) return preferMapping.name;

    return this.notFoundValue;
  }
}
