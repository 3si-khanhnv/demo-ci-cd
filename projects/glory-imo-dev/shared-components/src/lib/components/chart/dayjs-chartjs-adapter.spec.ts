const _adapters: any = {
  _date: {
    override: function (data) {
      _adapters._date = { ..._adapters._date, ...data };
    },
  },
};
jest.mock("chart.js", () => {
  return {
    _adapters,
  };
});
import dayjs from "dayjs";
import "./dayjs-chartjs-adapter";

describe("DayjsChartjsAdapter", () => {
  describe("formats", () => {
    it("should get formats adapter day in chartjs", () => {
      // arrange
      const expected = {
        datetime: "MMM D, YYYY, h:mm:ss a",
        millisecond: "h:mm:ss.SSS a",
        second: "h:mm:ss a",
        minute: "h:mm a",
        hour: "hA",
        day: "MMM D",
        week: "ll",
        month: "MMM YYYY",
        quarter: "[Q]Q - YYYY",
        year: "YYYY",
      };

      // act
      const act = _adapters._date.formats();

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe("parse", () => {
    it("should should return null when have parse value is null or undefined", () => {
      // arrange
      const expected = null;

      // act
      const act1 = _adapters._date.parse(null);
      const act2 = _adapters._date.parse(undefined);

      // assert
      expect(act1).toEqual(expected);
      expect(act2).toEqual(expected);
    });

    it("should should return value when have parse value and format have type string", () => {
      // arrange
      const expected1 = dayjs("2021", "YYYY").valueOf();
      const expected2 = null;

      // act
      const act1 = _adapters._date.parse("2021", "YYYY");
      const act2 = _adapters._date.parse("0", "DD");

      // assert
      expect(act1).toEqual(expected1);
      expect(act2).toEqual(expected2);
    });

    it("should should return value when have parse value type not dayjs", () => {
      // arrange
      const expected1 = dayjs("12/10/2021").valueOf();
      const expected2 = null;

      // act
      const act1 = _adapters._date.parse("12/10/2021");
      const act2 = _adapters._date.parse("0 0");

      // assert
      expect(act1).toEqual(expected1);
      expect(act2).toEqual(expected2);
    });

    it("should should return null when value type of dayjs", () => {
      // arrange
      const expected = null;

      // act
      const act1 = _adapters._date.parse(dayjs());

      // assert
      expect(act1).toEqual(expected);
    });
  });

  describe("format", () => {
    it("should format value", () => {
      // arrange
      const expected = "2021";

      // act
      const act = _adapters._date.format("12/10/2021", "YYYY");

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe("add", () => {
    it("should add date", () => {
      // arrange
      const expected = dayjs("12/10/2021").add(1, "day").valueOf();

      // act
      const act = _adapters._date.add("12/10/2021", 1, "day");

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe("diff", () => {
    it("should diff date", () => {
      // arrange
      const expected = 1;

      // act
      const act = _adapters._date.diff("12/10/2021", "12/9/2021", "day");

      // assert
      expect(expected).toEqual(act);
    });
  });

  describe("startOf", () => {
    it("should get startOf date when unit isoWeek", () => {
      // arrange
      const expected1 = dayjs("12/10/2021").isoWeekday(2).startOf("day").valueOf();
      const expected2 = dayjs("12/10/2021").isoWeekday(1).startOf("day").valueOf();

      // act
      const act1 = _adapters._date.startOf("12/10/2021", "isoWeek", 2);
      const act2 = _adapters._date.startOf("12/10/2021", "isoWeek");

      // assert
      expect(act1).toEqual(expected1);
      expect(act2).toEqual(expected2);
    });

    it("should get startOf date when unit not equal isoWeek", () => {
      // arrange
      const expected = dayjs("12/10/2021").startOf("day").valueOf();

      // act
      const act = _adapters._date.startOf("12/10/2021", "day");

      // assert
      expect(act).toEqual(expected);
    });

    describe("endOf", () => {
      it("should return endOf date", () => {
        // arrange
        const expected = dayjs("12/10/2021").endOf("day").valueOf();

        // act
        const act = _adapters._date.endOf("12/10/2021", "day");

        // assert
        expect(expected).toEqual(act);
      });
    });
  });
});
