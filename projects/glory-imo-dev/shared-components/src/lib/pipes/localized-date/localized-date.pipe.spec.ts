import { TestBed } from "@angular/core/testing";
import { LocalizedDatePipe } from "./localized-date.pipe";
import { DayjsService } from "../../services";

describe("LocalizedDatePipe", () => {
  let dayjsService: DayjsService
  let pipe: LocalizedDatePipe;

  const date = "2020-08-10T12:46:15Z";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizedDatePipe],
    });
  });

  beforeEach(() => {
    dayjsService = TestBed.inject(DayjsService);
    pipe = new LocalizedDatePipe(dayjsService);
  });

  it("should create LocalizedDatePipe", () => {
    expect(pipe).toBeTruthy();
  });

  describe(LocalizedDatePipe.prototype.transform.name, () => {
    it("should transform default", () => {
      pipe.transform(date);
    });

    it("should transform has data", () => {
      pipe.transform("", "YYYY/MM/DD");
    });

    it("should transform has data", () => {
      pipe.transform("abc", "YYYY/MM/DD");
    });
  });
});
