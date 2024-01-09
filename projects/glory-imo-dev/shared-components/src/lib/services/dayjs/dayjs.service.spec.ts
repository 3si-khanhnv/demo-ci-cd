import { TestBed } from "@angular/core/testing";
import dayjs from "dayjs";
import { ELocale } from "./dayjs.i";
import { DayjsService } from "./dayjs.service";
let languageGetter;
describe("DayjsService", () => {
  let service: DayjsService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
    }),
  );

  beforeEach(() => {
    service = TestBed.inject(DayjsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("DayjsService ", () => {
    it("should be call DayjsService updateLocale", () => {
      const py = jest.spyOn(dayjs, "locale");
      service.updateLocale(ELocale.JA);
      expect(py).toBeCalledWith("ja");
    });
    it("should be call DayjsService toISOString", () => {
      const day = new Date();
      const expected = dayjs(day).toISOString();
      const out = service.toISOString(day);
      expect(out).toBe(expected);
    });
    it("should be call DayjsService toISOString sen undefined", () => {
      const day = undefined;
      const expected = "";
      const out = service.toISOString(day);
      expect(out).toBe(expected);
    });

    it("should be call DayjsService format", () => {
      const day = new Date();
      const expected = dayjs.utc(day).local().format("L");
      const out = service.format(day, "L");
      expect(out).toBe(expected);
    });
    it("should be call DayjsService format send undefined ", () => {
      const day = undefined;
      const expected = "";
      const out = service.format(day, "L");
      expect(out).toBe(expected);
    });
    it("should be call DayjsService format not send pattern ", () => {
      const day = new Date();
      const expected = dayjs.utc(day).local().format("LLL");
      const out = service.format(day);
      expect(out).toBe(expected);
    });
  });
});

describe("DayjsService constructor on locale set default ", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
    }),
  );
  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, "language", "get");
  });
  it("should be created set locale is vi", () => {
    languageGetter.mockReturnValue("vi");
    new DayjsService();
    expect(dayjs.locale()).toEqual("en");
  });

  it("should be created set locale is ja", () => {
    languageGetter.mockReturnValue("ja");
    new DayjsService();
    expect(dayjs.locale()).toEqual("ja");
  });
});
