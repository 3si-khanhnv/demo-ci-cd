import { MomentDateTimeAdapter } from "./time-picker.adapter";
import { TestBed } from "@angular/core/testing";
import moment from "moment";
import { MomentInput } from "moment";

describe(MomentDateTimeAdapter.name, () => {
  let adapter: MomentDateTimeAdapter;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [MomentDateTimeAdapter],
    }),
  );

  beforeEach(() => {
    adapter = TestBed.inject(MomentDateTimeAdapter);
  });

  it("should be created", () => {
    expect(adapter).toBeTruthy();
  });

  describe("getHour", () => {
    it("should return hour", () => {
      // arrange
      const expected = 12;
      const input = moment([2017, 1, 1, expected, 0] as MomentInput);
      // act
      const actual = adapter.getHour(input);
      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe("getMinute", () => {
    it("should return minute", () => {
      // arrange
      const expected = 46;
      const input = moment([2017, 1, 1, 1, expected] as MomentInput);
      // act
      const actual = adapter.getMinute(input);
      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe("compareTime", () => {
    it("should return 0", () => {
      // arrange
      const hour = 4;
      const minute = 12;
      const beforeInput = moment([2017, 1, 1, hour, minute] as MomentInput);
      const afterInput = beforeInput;
      const expected = 0;
      // act
      const actual = adapter.compareTime(beforeInput, afterInput);
      // assert
      expect(actual).toEqual(expected);
    });

    it("should return value less than 0", () => {
      // arrange
      const hour = 4;
      const minute = 12;
      const beforeInput = moment([2017, 1, 1, hour - 1, minute] as MomentInput);
      const afterInput = moment([2017, 1, 1, hour, minute + 10] as MomentInput);
      // act
      const actual = adapter.compareTime(beforeInput, afterInput);
      // assert
      expect(actual).toBeLessThan(0);
    });

    it("should return value greater than 0", () => {
      // arrange
      const hour = 4;
      const minute = 12;
      const beforeInput = moment([2017, 1, 1, hour + 1, minute] as MomentInput);
      const afterInput = moment([2017, 1, 1, hour, minute - 10] as MomentInput);
      // act
      const actual = adapter.compareTime(beforeInput, afterInput);
      // assert
      expect(actual).toBeGreaterThan(0);
    });
  });
});
