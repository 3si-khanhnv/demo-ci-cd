import { TestBed } from "@angular/core/testing";
import { TimezoneService } from "./timezone.service";
import { TIMEZONES } from "./timezone.constant";
import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

describe("TimezoneService", () => {
  let service: TimezoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimezoneService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("TimezoneService constructor should create the listTimezone", () => {
    it("TimezoneService should construct the listTimezone", () => {
      const listTimezone = service.getListTimezone();

      expect(service.listTimezone).toEqual(listTimezone);
    });
  });

  describe(TimezoneService.prototype.getListTimezone.name, () => {
    it("Should return a list of time zone", () => {
      const listTimezone = TIMEZONES.map((v) => ({
        label: v.name,
        value: v.timezoneIdentifier,
      }));

      expect(service.getListTimezone()).toEqual(listTimezone);
    });
  });

  describe(TimezoneService.prototype.mappingToSupportTimezone.name, () => {
    it("Should return a support time zone", () => {
      const expected = "Asia/Bangkok";
      const expectedLondon = "Europe/London";

      const result = service.mappingToSupportTimezone("Asia/Saigon");
      const resultLondon = service.mappingToSupportTimezone("Europe/Dublin");

      expect(result).toBe(expected);
      expect(resultLondon).toBe(expectedLondon);
    });

    it(`Should return a falsy value if not found`, () => {
      const expected = service.notFoundValue;
      const unsupportedTimezone = "Etc/GMT+10";

      const result = service.mappingToSupportTimezone(unsupportedTimezone);

      expect(result).toBe(expected);
    });

    it("Should return the first prefer property", () => {
      const expected = "America/Los_Angeles";

      const result = service.mappingToSupportTimezone("America/Los_Angeles");

      expect(result).toBe(expected);
    });

    it("Should not run the sencond prefer when the first one hit", () => {
      const expected = "Asia/Bangkok";
      const spyMappingPreferMappingProperty = jest.spyOn(service, "mappingPreferMappingProperty");

      const result = service.mappingToSupportTimezone("Asia/Bangkok");

      expect(spyMappingPreferMappingProperty).not.toHaveBeenCalled();
      expect(result).toBe(expected);
    });

    it("Should run the sencond prefer when the first one is not hit", () => {
      const expected = "Asia/Bangkok";
      const spyMappingPreferMappingProperty = jest.spyOn(service, "mappingPreferMappingProperty");

      const result = service.mappingToSupportTimezone("Asia/Saigon");

      expect(spyMappingPreferMappingProperty).toHaveBeenCalled();
      expect(result).toBe(expected);
    });
  });

  describe(TimezoneService.prototype.mappingToLabel.name, () => {
    it("Should return a label if found", () => {
      const expected = "(UTC+07:00) Bangkok, Hanoi, Jakarta";
      const expectedLondon = "(UTC+00:00) Dublin, Edinburgh, Lisbon, London";

      const result = service.mappingToLabel("Asia/Saigon");
      const resultLondon = service.mappingToLabel("Europe/Dublin");

      expect(result).toBe(expected);
      expect(resultLondon).toBe(expectedLondon);
    });

    it(`Should return a falsy value if not found`, () => {
      const expected = service.notFoundValue;
      const unsupportedTimezone = "Etc/GMT+10";

      const result = service.mappingToLabel(unsupportedTimezone);

      expect(result).toBe(expected);
    });

    it("Should return the first prefer property", () => {
      dayjs.tz.setDefault("Asia/Saigon");
      const today = dayjs.utc(new Date().toDateString()).tz("Asia/Saigon");
      jest.useFakeTimers().setSystemTime(today.toDate());
      const expected = "(UTC+07:00) Bangkok, Hanoi, Jakarta";
      const result = service.mappingToLabel("Asia/Saigon");
      expect(result).toBe(expected);
    });

    it("Should not run the sencond prefer when the first one hit", () => {
      const expected = "(UTC+07:00) Bangkok, Hanoi, Jakarta";
      const spyMappingPreferMappingProperty = jest.spyOn(service, "mappingPreferMappingProperty");

      const result = service.mappingToLabel("Asia/Bangkok");

      expect(spyMappingPreferMappingProperty).not.toHaveBeenCalled();
      expect(result).toBe(expected);
    });

    it("Should run the sencond prefer when the first one is not hit", () => {
      const expected = "(UTC+07:00) Bangkok, Hanoi, Jakarta";
      const spyMappingPreferMappingProperty = jest.spyOn(service, "mappingPreferMappingProperty");

      const result = service.mappingToLabel("Asia/Saigon");

      expect(spyMappingPreferMappingProperty).toHaveBeenCalled();
      expect(result).toBe(expected);
    });
  });
});
