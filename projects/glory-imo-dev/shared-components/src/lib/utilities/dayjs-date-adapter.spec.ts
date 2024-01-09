import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { of } from "rxjs";

import { DayjsDateAdapter, DayJsDateAdapterOptions, MAT_DAYJS_DATE_ADAPTER_OPTIONS_FACTORY } from "./dayjs-date-adapter";

describe(MAT_DAYJS_DATE_ADAPTER_OPTIONS_FACTORY.name, () => {
  it("should return data", () => {
    // arrange
    const expected: DayJsDateAdapterOptions = {
      useUtc: false,
    };

    // act
    const actual = MAT_DAYJS_DATE_ADAPTER_OPTIONS_FACTORY();

    // assert
    expect(actual).toEqual(expected);
  });
});

describe("DayjsDateAdapter", () => {
  let translate: any;

  let dayjsDateAdapterClass: DayjsDateAdapter;
  beforeEach(() => {
    translate = {
      get: () => of({}),
    } as any;
    dayjsDateAdapterClass = new DayjsDateAdapter(translate, "en");
  });

  it("should be created", () => {
    expect(dayjsDateAdapterClass).toBeTruthy();
  });

  describe("initializeParser", () => {
    it("should call extend dayjs", () => {
      // arrange
      jest.spyOn(dayjsDateAdapterClass, "shouldUseUtc", "get").mockReturnValueOnce(true);
      const spy = jest.spyOn(dayjs, "extend");

      // act
      dayjsDateAdapterClass.initializeParser();

      // assert
      expect(spy).toHaveBeenCalledTimes(4);
    });
  });

  describe("dayjs", () => {
    it("should return data type Dayjs", () => {
      dayjs.extend(utc);
      // arrange
      const input = "11/23/2011";
      const format = "MM/DD/YYYY";
      const locale = "en";
      jest.spyOn(dayjsDateAdapterClass, "shouldUseUtc", "get").mockReturnValueOnce(true);
      const expected = dayjs(input, { format, locale, utc: true }, locale).utc();

      // act
      const act = dayjsDateAdapterClass.dayJs(input, format, "en");

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe("getYear", () => {
    it("should return Year", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");

      // act
      const act = dayjsDateAdapterClass.getYear(date);

      // expect
      expect(act).toEqual(2021);
    });
  });

  describe("getMonth", () => {
    it("should return Month", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");

      // act
      const act = dayjsDateAdapterClass.getMonth(date);

      // expect
      expect(act).toEqual(10);
    });
  });

  describe("getDate", () => {
    it("should return Date", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");

      // act
      const act = dayjsDateAdapterClass.getDate(date);

      // expect
      expect(act).toEqual(1);
    });
  });

  describe("getDayOfWeek", () => {
    it("should return day of week", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");

      // act
      const act = dayjsDateAdapterClass.getDayOfWeek(date);

      // expect
      expect(act).toEqual(1);
    });
  });

  describe("getMonthNames", () => {
    it("should return month by name", () => {
      // arrange
      const expected = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // act
      const act = dayjsDateAdapterClass.getMonthNames("long");

      // expect
      expect(act).toEqual(expected);
    });

    it("should return month by short name", () => {
      // arrange
      const expected = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      // act
      const act = dayjsDateAdapterClass.getMonthNames("short");

      // expect
      expect(act).toEqual(expected);
    });

    it("should be has short language", () => {
      dayjsDateAdapterClass.shortMonthOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      // arrange
      const expected = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      // act
      const act = dayjsDateAdapterClass.getMonthNames("short");

      // expect
      expect(act).toEqual(expected);
    });
    it("should be has long language", () => {
      dayjsDateAdapterClass.monthOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      // arrange
      const expected = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      // act
      const act = dayjsDateAdapterClass.getMonthNames("long");

      // expect
      expect(act).toEqual(expected);
    });
  });

  describe("getDateNames", () => {
    it("should return data", () => {
      // arrange
      dayjsDateAdapterClass["localeData"] = {
        firstDayOfWeek: 1,
        longMonths: [],
        shortMonths: [],
        dates: ["1", "2"],
        longDaysOfWeek: [],
        shortDaysOfWeek: [],
        narrowDaysOfWeek: [],
      };

      // act
      const act = dayjsDateAdapterClass.getDateNames();

      // expect

      expect(act).toEqual(["1", "2"]);
    });
  });

  describe("getDayOfWeekNames", () => {
    it("should return longDaysOfWeek", () => {
      // arrange
      dayjsDateAdapterClass["localeData"] = {
        firstDayOfWeek: 1,
        longMonths: [],
        shortMonths: [],
        dates: ["1", "2"],
        longDaysOfWeek: ["Monday", "Tuesday"],
        shortDaysOfWeek: [],
        narrowDaysOfWeek: [],
      };

      const expected = ["Monday", "Tuesday"];

      // act
      const act = dayjsDateAdapterClass.getDayOfWeekNames("long");

      // expect

      expect(act).toEqual(expected);
    });

    it("should return longDaysOfWeek by language", () => {
      dayjsDateAdapterClass.daysOfWeek = ["Monday", "Tuesday"];
      // arrange

      const expected = ["Monday", "Tuesday"];

      // act
      const act = dayjsDateAdapterClass.getDayOfWeekNames("long");

      // expect

      expect(act).toEqual(expected);
    });
    it("should return shortDaysOfWeek by language", () => {
      dayjsDateAdapterClass.shortDaysOfWeek = ["Monday", "Tuesday"];
      // arrange

      const expected = ["Monday", "Tuesday"];

      // act
      const act = dayjsDateAdapterClass.getDayOfWeekNames("short");

      // expect

      expect(act).toEqual(expected);
    });

    it("should return narrowDaysOfWeek by language", () => {
      dayjsDateAdapterClass.narrowDaysOfWeek = ["Monday", "Tuesday"];
      // arrange

      const expected = ["Monday", "Tuesday"];

      // act
      const act = dayjsDateAdapterClass.getDayOfWeekNames("narrow");

      // expect

      expect(act).toEqual(expected);
    });

    it("should return shortDaysOfWeek", () => {
      // arrange
      dayjsDateAdapterClass["localeData"] = {
        firstDayOfWeek: 1,
        longMonths: [],
        shortMonths: [],
        dates: ["1", "2"],
        longDaysOfWeek: ["Monday", "Tuesday"],
        shortDaysOfWeek: ["Mon", "Tue"],
        narrowDaysOfWeek: [],
      };

      const expected = ["Mon", "Tue"];

      // act
      const act = dayjsDateAdapterClass.getDayOfWeekNames("short");

      // expect

      expect(act).toEqual(expected);
    });

    it("should return narrowDaysOfWeek", () => {
      // arrange
      dayjsDateAdapterClass["localeData"] = {
        firstDayOfWeek: 1,
        longMonths: [],
        shortMonths: [],
        dates: ["1", "2"],
        longDaysOfWeek: ["Monday", "Tuesday"],
        shortDaysOfWeek: ["Mon", "Tue"],
        narrowDaysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      };

      const expected = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

      // act
      const act = dayjsDateAdapterClass.getDayOfWeekNames("narrow");

      // expect

      expect(act).toEqual(expected);
    });
  });

  describe("getYearName", () => {
    it("should return year format", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");

      // act
      const act = dayjsDateAdapterClass.getYearName(date);

      // expect
      expect(act).toEqual("2021");
    });
  });

  describe("getFirstDayOfWeek", () => {
    it("should return firstDayOfWeek", () => {
      // arrange
      dayjsDateAdapterClass["localeData"] = {
        firstDayOfWeek: 1,
        longMonths: [],
        shortMonths: [],
        dates: ["1", "2"],
        longDaysOfWeek: ["Monday", "Tuesday"],
        shortDaysOfWeek: [],
        narrowDaysOfWeek: [],
      };

      const expected = 1;

      // act
      const act = dayjsDateAdapterClass.getFirstDayOfWeek();

      // expect

      expect(act).toEqual(expected);
    });
  });

  describe("getNumDaysInMonth", () => {
    it("should return firstDayOfWeek", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");

      dayjsDateAdapterClass["localeData"] = {
        firstDayOfWeek: 1,
        longMonths: [],
        shortMonths: [],
        dates: ["1", "2"],
        longDaysOfWeek: ["Monday", "Tuesday"],
        shortDaysOfWeek: [],
        narrowDaysOfWeek: [],
      };

      const expected = 30;

      // act
      const act = dayjsDateAdapterClass.getNumDaysInMonth(date);

      // expect
      expect(act).toEqual(expected);
    });
  });

  describe("clone", () => {
    it("should return clone date", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");
      const expected = date.clone();

      // act
      const act = dayjsDateAdapterClass.clone(date);

      // expect
      expect(act).toEqual(expected);
    });
  });

  describe("today", () => {
    it("should return today date", () => {
      // arrange
      const expected = dayjs();

      // act
      const act = dayjsDateAdapterClass.today();

      // expect
      expect(act.date()).toEqual(expected.date());
      expect(act.month()).toEqual(expected.month());
      expect(act.year()).toEqual(expected.year());
    });
  });

  describe("parse", () => {
    it("should return value have type is string", () => {
      // arrange
      const value = "11/01/2021";
      const parseFormat = "MM/DD/YYYY";
      const expected = dayjsDateAdapterClass.dayJs(value, parseFormat, "en");

      // act

      const act = dayjsDateAdapterClass.parse(value, parseFormat);

      // assert
      expect(act).toEqual(expected);
    });

    it("should return value have type is not string", () => {
      // arrange
      const parseFormat = "MM/DD/YYYY";
      const value = dayjs("11/01/2021", parseFormat);
      const expected = dayjsDateAdapterClass.dayJs(value).locale("en");

      // act

      const act = dayjsDateAdapterClass.parse(value, parseFormat);

      // assert
      expect(act).toEqual(expected);
    });

    it("should return value have type is not string and have value null", () => {
      // arrange
      const parseFormat = "MM/DD/YYYY";
      const value = null;
      const expected = null;

      // act

      const act = dayjsDateAdapterClass.parse(value, parseFormat);

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe("format", () => {
    it("should return value when is show short name", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");
      const expected = "2021-11-01";
      const temp = dayjs(expected).format("YYYY-MM-DDTHH:mm:ssZ");
      dayjsDateAdapterClass.showShortName = true;
      // act
      const act = dayjsDateAdapterClass.format(date, "");

      // expect
      expect(act).toEqual(temp);
    });

    it("should return valid date", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");
      const format = "YYYY/MM/DD";
      const expected = "2021/11/01";

      // act
      const act = dayjsDateAdapterClass.format(date, format);

      // expect
      expect(act).toEqual(expected);
    });

    it("should return when invalid date", () => {
      // arrange
      const date: Dayjs = dayjs("xxx");
      const format = "YYYY/MM/DD";
      const expected = "DayjsDateAdapter: Cannot format invalid date.";

      // act
      const act = () => {
        dayjsDateAdapterClass.format(date, format);
      };

      // expect
      expect(act).toThrowError(expected);
    });
  });

  describe("addCalendarYears", () => {
    it("should return result was added year", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");
      const years = 5;
      const expected = date.add(years, "year");

      // act
      const act = dayjsDateAdapterClass.addCalendarYears(date, years);

      // expect
      expect(act).toEqual(expected);
    });
  });

  describe("addCalendarMonths", () => {
    it("should return result was added month", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");
      const months = 5;
      const expected = date.add(months, "month");

      // act
      const act = dayjsDateAdapterClass.addCalendarMonths(date, months);

      // expect
      expect(act).toEqual(expected);
    });
  });

  describe("addCalendarDays", () => {
    it("should return result was added day", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");
      const day = 5;
      const expected = date.add(day, "day");

      // act
      const act = dayjsDateAdapterClass.addCalendarDays(date, day);

      // expect
      expect(act).toEqual(expected);
    });
  });

  describe("toIso8601", () => {
    it("should return result convert toIso8601", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");
      const expected = date.toISOString();

      // act
      const act = dayjsDateAdapterClass.toIso8601(date);

      // expect
      expect(act).toEqual(expected);
    });
  });

  describe("isDateInstance", () => {
    it("should return boolean type", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");
      const expected = true;

      // act
      const act = dayjsDateAdapterClass.isDateInstance(date);

      // expect
      expect(act).toEqual(expected);
    });
  });

  describe("isValid", () => {
    it("should check valid date", () => {
      // arrange
      const date: Dayjs = dayjs("2021-11-1");
      const expected = true;

      // act
      const act = dayjsDateAdapterClass.isValid(date);

      // expect
      expect(act).toEqual(expected);
    });
  });

  describe("invalid", () => {
    it("should check invalid", () => {
      // act
      const act = dayjsDateAdapterClass.invalid();

      // expect
      expect(act).toBeInstanceOf(dayjs);
      expect(act.isValid()).toEqual(false);
    });
  });

  describe("deserialize", () => {
    it("should return when value is Date type", () => {
      // arrange
      const value = new Date("11/23/2021");
      const expected = dayjsDateAdapterClass.dayJs(value);

      // act
      const act = dayjsDateAdapterClass.deserialize(value);

      // assert
      expect(act).toEqual(expected);
    });

    it("should return when value is not Date type and isDateInstance true", () => {
      // arrange
      const value = dayjs("11/23/2021");
      jest.spyOn(dayjsDateAdapterClass, "isDateInstance").mockReturnValueOnce(true);
      const expected = dayjsDateAdapterClass.clone(value);

      // act
      const act = dayjsDateAdapterClass.deserialize(value);

      // assert
      expect(act).toEqual(expected);
    });

    it("should return when value is string type", () => {
      // arrange
      const value = "11/23/2021";
      const expected = dayjsDateAdapterClass.dayJs(value);

      // act
      const act = dayjsDateAdapterClass.deserialize(value);

      // assert
      expect(act).toEqual(expected);
    });

    it("should return when value is string type and have value null", () => {
      // arrange
      const value = "";
      const expected = null;

      // act
      const act = dayjsDateAdapterClass.deserialize(value);

      // assert
      expect(act).toEqual(expected);
    });

    it("should return null when value is null", () => {
      // arrange
      const value = null;
      const expected = null;

      // act
      const act = dayjsDateAdapterClass.deserialize(value);

      // assert
      expect(act).toEqual(expected);
    });
  });
});
