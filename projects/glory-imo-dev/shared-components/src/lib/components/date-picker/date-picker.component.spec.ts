import { SimpleChanges } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerInput, MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { fail } from "assert";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";

import { DayjsDateAdapter, MAT_DAYJS_DATE_ADAPTER_OPTIONS, MAT_DAYJS_DATE_FORMATS } from "../../utilities/dayjs-date-adapter";
import { FormModule } from "../form/form.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { DatePickerComponent } from "./date-picker.component";

describe("DatePickerComponent", () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [DatePickerComponent],
      imports: [
        MatInputModule,
        MatDatepickerModule,
        BrowserAnimationsModule,
        SvgIconModule,
        ReactiveFormsModule,
        FormModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        // NOTE: If MatMomentDateModule works fine, use it.
        { provide: DateAdapter, useClass: DayjsDateAdapter, deps: [TranslateService, MAT_DATE_LOCALE, MAT_DAYJS_DATE_ADAPTER_OPTIONS] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_DAYJS_DATE_FORMATS },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnChanges", () => {
    it("should set placeholder", () => {
      // arrange
      const input = "This is for accessibility, this is ...";
      const expected = input;
      component.labels = {
        placeholder: input,
        errorMessages: {} as any,
      };

      fixture.detectChanges();

      const nativeElement: HTMLElement = fixture.nativeElement;
      const element = nativeElement.querySelector("input");

      // assert
      expect(element).not.toBeNull();
      expect(element.placeholder).toEqual(expected);
    });

    it("should show date select", () => {
      // arrange
      const expected = dayjs();
      const inputValue = expected.clone();
      const date = new Date();
      const change: SimpleChanges = {
        default: {
          currentValue: date,
          firstChange: false,
          isFirstChange: () => false,
          previousValue: null,
        },
      };

      // act
      component.default = inputValue;
      component.ngOnChanges(change);

      // assert
      expect(component.formControl.value).toEqual(expected);
    });

    it("should show date select null", () => {
      // arrange
      const expected = null;
      const date = new Date();
      const change: SimpleChanges = {
        default: {
          currentValue: date,
          firstChange: false,
          isFirstChange: () => false,
          previousValue: null,
        },
      };
      // act
      component.default = null;
      component.ngOnChanges(change);

      // assert
      expect(component.formControl.value).toEqual(expected);
    });

    it("should be enable", () => {
      // arrange
      component.isDisable = false;
      const spy = jest.spyOn(component.formControl, "enable");
      const date = new Date();
      const change: SimpleChanges = {
        default: {
          currentValue: date,
          firstChange: false,
          isFirstChange: () => false,
          previousValue: null,
        },
      };
      // act
      component.ngOnChanges(change);
      // assert
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });

    it("should be disable", () => {
      // arrange
      component.isDisable = true;
      const date = new Date();
      const change: SimpleChanges = {
        default: {
          currentValue: date,
          firstChange: false,
          isFirstChange: () => false,
          previousValue: null,
        },
      };
      const spy = jest.spyOn(component.formControl, "disable");
      // act
      component.ngOnChanges(change);
      // assert
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onSelect", () => {
    const RealDate = Date;
    beforeAll(() => {
      const offsetTime = new Date().getTimezoneOffset() * 60 * 1000;
      const time = new Date("2022-01-15T00:00:00.000Z").getTime() + offsetTime;
      global.Date.now = jest.fn(() => time);
    });

    afterAll(() => {
      global.Date = RealDate;
    });

    it("should emit date", (done) => {
      // arrange
      component.start = moment();
      component.formControl.setErrors(null);
      const input = dayjs("2020-07-01T00:00:00Z");
      const expected = input;
      // assert
      component.selectedDate.subscribe({
        next: (date) => {
          expect(dayjs(date)).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onSelect(input);
    });

    it("should emit null when error exists", (done) => {
      // arrange
      component.formControl.setErrors({ sampleError: "Hey, MUST NOT send any date!" });
      const input = null;
      const expected = input;
      // assert
      component.selectedDate.subscribe({
        next: (date) => {
          expect(date).toBe(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onSelect(input);
    });
  });

  describe("Input", () => {
    it("should set minDate", () => {
      // arrange
      const input = dayjs("2020-01-01T00:00:00Z");
      const expected = input;
      component.start = input as Dayjs;

      // act
      fixture.detectChanges();
      const inputDirective = fixture.debugElement.query(By.directive(MatDatepickerInput)).injector.get(MatDatepickerInput);
      // assert
      expect(inputDirective.min).toEqual(expected);
    });

    it("should set start is dayjs", () => {
      const tomorrow = () => {
        const now = moment();
        return now.add(1, "days");
      };
      const date = tomorrow().format("YYYY-MM-DD");
      component.start = date;
      // arrange
      const expected = dayjs(date);

      // act
      fixture.detectChanges();
      const inputDirective = fixture.debugElement.query(By.directive(MatDatepickerInput)).injector.get(MatDatepickerInput);
      // assert
      expect(inputDirective.min).toEqual(expected);
    });

    it("should set start is moment", () => {
      const tomorrow = (): any => {
        const now = moment();
        return now.add(1, "days");
      };
      const date = tomorrow();
      component.start = tomorrow();
      // arrange
      const expected = dayjs(date);

      // act
      fixture.detectChanges();
      const inputDirective = fixture.debugElement.query(By.directive(MatDatepickerInput)).injector.get(MatDatepickerInput);
      // assert
      expect(inputDirective.min).toEqual(expected);
    });

    it("should not set minDate", () => {
      // arrange
      const input = null;
      component.limitEmit = false;
      component.start = input;
      // act
      fixture.detectChanges();
      const inputDirective = fixture.debugElement
        .query(By.directive(MatDatepickerInput))
        .injector.get(MatDatepickerInput) as MatDatepickerInput<any>;
      // assert

      expect(inputDirective.min).toBeUndefined();
    });

    it("should set maxDate", () => {
      // arrange
      const input = dayjs("2020-01-07T00:00:00Z");
      const expected = input;
      component.end = input as Dayjs;

      // act
      fixture.detectChanges();
      const inputDirective = fixture.debugElement.query(By.directive(MatDatepickerInput)).injector.get(MatDatepickerInput);
      // assert
      expect(inputDirective.max).toEqual(expected);
    });

    it("should not set maxDate", () => {
      // arrange
      const input = null;
      component.limitEmit = false;
      component.end = input;
      // act
      fixture.detectChanges();
      const inputDirective = fixture.debugElement.query(By.directive(MatDatepickerInput)).injector.get(MatDatepickerInput);
      // assert
      expect(inputDirective.max).toBeUndefined();
    });

    it("should not set minDate when error exists", async () => {
      // arrange
      component.limitEmit = true;
      jest.spyOn(component.selectedDate, "emit");
      component.formControl.setErrors({ sampleError: "Cannot set minDate!" });
      const input = null;
      component.start = input;

      // act
      fixture.detectChanges();
      jest.runAllTimers();
      const inputDirective = fixture.debugElement.query(By.directive(MatDatepickerInput)).injector.get(MatDatepickerInput);
      // assert
      expect(inputDirective.min).toBeUndefined();
      await setTimeout(() => {
        expect(component.selectedDate.emit).toHaveBeenCalledWith(null);
      }, 10);
    });

    it("should not set maxDate when error exists", async () => {
      // arrange
      jest.spyOn(component.selectedDate, "emit");
      component.formControl.setErrors({ sampleError: "Cannot set maxDate" });
      const input = null;
      component.end = input;
      fixture.detectChanges();

      // act
      const inputDirective = fixture.debugElement.query(By.directive(MatDatepickerInput)).injector.get(MatDatepickerInput);

      // assert
      expect(inputDirective.max).toBeUndefined();
      await setTimeout(() => {
        expect(component.selectedDate.emit).toHaveBeenCalledWith(null);
      }, 10);
    });
  });

  describe("onChange", () => {
    it("should not call stop propagation when default", () => {
      // arrange
      const event: Event = new Event("change");
      const spy = jest.spyOn(event, "stopPropagation");
      fixture.detectChanges();
      // arrange
      // actual
      component.onChange(event);
      // assert
      expect(spy).not.toHaveBeenCalled();
    });

    it("should call stop propagation when enable", () => {
      // arrange
      const tomorrow = (): any => {
        const now = moment();
        return now.add(1, "days");
      };
      component.start = tomorrow();
      component.stopProp = true;
      const event: Event = new Event("change");
      const spy = jest.spyOn(event, "stopPropagation");
      // actual
      component.onChange(event);
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });
});
