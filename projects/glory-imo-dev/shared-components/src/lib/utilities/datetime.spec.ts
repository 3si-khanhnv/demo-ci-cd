import dayjs from "dayjs";
import { guessLocaleFormat } from "./datetime";

describe(guessLocaleFormat.name, () => {
  it(`should not do anything when language not found`, () => {
    // arrange
    jest.spyOn(navigator, "languages", "get").mockReturnValueOnce(undefined);
    jest.spyOn(navigator, "language", "get").mockReturnValueOnce(undefined);
    jest.spyOn(dayjs, "locale");

    // act
    guessLocaleFormat();

    // assert
    expect(dayjs.locale).not.toHaveBeenCalled();
  });

  it(`should call dayjs to set locale`, () => {
    // arrange
    jest.spyOn(navigator, "languages", "get").mockReturnValueOnce(undefined);
    jest.spyOn(navigator, "language", "get").mockReturnValueOnce("ja");
    jest.spyOn(dayjs, "locale");

    // act
    guessLocaleFormat();

    // assert
    expect(dayjs.locale).toHaveBeenCalled();
  });

  it(`should call dayjs to set locale full`, () => {
    // arrange
    jest.spyOn(navigator, "languages", "get").mockReturnValueOnce(["en-UK"]);
    jest.spyOn(dayjs, "locale");

    // act
    guessLocaleFormat();

    // assert
    expect(dayjs.locale).toHaveBeenCalled();
  });
});
