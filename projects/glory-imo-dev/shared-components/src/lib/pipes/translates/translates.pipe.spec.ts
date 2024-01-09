import { TestBed } from "@angular/core/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslatesPipe } from "./translates.pipe";

describe("translatesPipe", () => {
  let translateService: TranslateService;
  let pipe: TranslatesPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslatesPipe],
      imports: [TranslateModule.forRoot()],
    });
  });

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);
    pipe = new TranslatesPipe(translateService);
  });

  it("should create translatesPipe", () => {
    expect(pipe).toBeTruthy();
  });

  it("transform value is array", () => {
    jest.spyOn(pipe["translateService"], "instant").mockReturnValue({ TEST: "ABC", TEST1: "ABC" });
    const values = ["TEST", "TEST1"];
    const params = {};

    const expected = "ABC ABC";

    // act
    const actual = pipe.transform(values, " ", params);

    // assert
    expect(actual).toEqual(expected);
  });
  it("transform value is string", () => {
    const values = "Select Organisation";
    const params = {};

    const expected = "Select Organisation";

    // act
    const actual = pipe.transform(values, " ", params);

    // assert
    expect(actual).toEqual(expected);
  });

  it("transform value is params is empty", () => {
    jest.spyOn(pipe["translateService"], "instant").mockReturnValue({});
    const values = ["TEST"];

    const expected = "";

    // act
    const actual = pipe.transform(values);

    // assert
    expect(actual).toEqual(expected);
    expect(pipe["translateService"].instant).toBeCalledWith(values, {});
  });

  it("transform value is undefined", () => {
    const values = undefined;
    const params = {};

    const expected = "";

    // act
    const actual = pipe.transform(values, "", params);

    // assert
    expect(actual).toEqual(expected);
  });
});
