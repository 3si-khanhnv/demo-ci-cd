import { DOWN_ARROW, ENTER } from "@angular/cdk/keycodes";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AbstractControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import moment from "moment";

import { DisableControlDirective, TimePickerInputDirective } from "./time-picker-input.directive";
import { MomentDateTimeAdapter } from "./time-picker.adapter";
import { TimePickerComponent } from "./time-picker.component";
import { TimePickerModule } from "./time-picker.module";

// tslint:disable:no-string-literal
describe(TimePickerInputDirective.name, () => {
  let component: TimePickerComponent;
  let fixture: ComponentFixture<TimePickerComponent>;
  let debugElement: DebugElement;
  let directive: TimePickerInputDirective;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [TimePickerModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    directive = debugElement.query(By.directive(TimePickerInputDirective)).injector.get(TimePickerInputDirective);
  });

  it("should create an instance", () => {
    expect(component).toBeTruthy();
  });

  describe("imoTimePicker", () => {
    it("should run default when timepicker not set yet", () => {
      // arrange
      // --
      // act
      directive.imoTimePicker = undefined;

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(directive.timePicker).toBeInstanceOf(TimePickerComponent);
      });
    });
  });

  describe("HostBinding", () => {
    it("should set aria-owns", () => {
      // arrange
      const expected = directive.timePicker.id;
      debugElement.query(By.css("imo-button")).triggerEventHandler("click", {});
      // act
      fixture.detectChanges();
      const ariaOwns = debugElement.query(By.css("input")).attributes["aria-owns"];
      // assert
      expect(directive.timePicker).toBeInstanceOf(TimePickerComponent);
      expect(directive.timePicker.isShown).toBe(true);
      expect(ariaOwns).toEqual(expected);
    });
  });

  it("should set value with locale changed", () => {
    // arrange
    const spy = jest.spyOn(directive, "value", "set");
    const expected = directive.value;
    // act
    directive.timeAdapter.setLocale("ja-JP");
    // assert
    expect(spy).toHaveBeenCalledWith(expected);
  });

  describe("constructor", () => {
    it("should throw error if no adapter", () => {
      // arrange
      const expected = new Error(`No provider for ${MomentDateTimeAdapter.name}`);
      // assert
      expect(() => new TimePickerInputDirective(undefined, undefined, undefined, undefined)).toThrow(expected);
    });
    it("should throw error if no dateFormat", () => {
      // arrange
      const expected = new Error(`No provider for TIME_PICKER_FORMATS`);
      // assert
      expect(() => new TimePickerInputDirective(undefined, {} as any, undefined, undefined)).toThrow(expected);
    });
  });

  describe("value", () => {
    const testCase = [{ input: { year: 2019 }, expected: moment({ year: 2019 }) }];
    testCase.forEach((c) => {
      it(`should set value as Moment with ${c.input}`, () => {
        // arrange
        const value = moment(c.input as moment.MomentInput);
        // act
        directive.value = value;
        // assert
        expect(directive.value).toEqual(c.expected);
      });
    });
  });

  describe("minTime", () => {
    const testCase = [{ input: { year: 2019 }, expected: moment({ year: 2019 }) }];
    testCase.forEach((c) => {
      it(`should set minTime as Moment with ${c.input}`, () => {
        // arrange
        const value = moment(c.input as moment.MomentInput);
        // act
        directive.minTime = value;
        // assert
        expect(directive.minTime).toEqual(c.expected);
      });
    });

    it("should return null", () => {
      // arrange
      directive["min"] = undefined;
      // assert
      expect(directive.minTime).toEqual(null);
    });
  });

  describe("maxTime", () => {
    const testCase = [{ input: { year: 2019 }, expected: moment({ year: 2019 }) }];
    testCase.forEach((c) => {
      it(`should set maxTime as Moment with ${c.input}`, () => {
        // arrange
        const value = moment(c.input as moment.MomentInput);
        // act
        directive.maxTime = value;
        // assert
        expect(directive.maxTime).toEqual(c.expected);
      });
    });

    it("should return null", () => {
      // arrange
      directive["max"] = undefined;
      // assert
      expect(directive.maxTime).toEqual(null);
    });
  });

  describe("timePickerSubscription", () => {
    it("should subscribe timePicker selectedChanged", (done) => {
      // arrange
      const expected = moment({ year: 2017 });
      const spy = jest.spyOn(directive, "value", "set");
      // act
      directive.timePicker.selectedChanged.next(expected);
      done();
      // assert
      expect(spy).toHaveBeenCalledWith(expected);
    });

    it("should emit timeChange if selectedChanged change", () => {
      // arrange
      const input = moment({ year: 2019 });
      const expected = input;
      // assert
      directive.timeChange.subscribe({
        next: (value) => expect(value).toEqual(expected),
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      directive.timePicker.selectedChanged.next(input);
    });
  });

  describe("onChange", () => {
    it("should emit timeChange with change event", (done) => {
      // arrange
      const expected = moment({ year: 2017 });
      directive.value = expected;
      // assert
      directive.timeChange.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      directive.onChange();
    });

    it("should emit isValidDirective true when isShowError true", (done) => {
      // arrange
      directive.isShowError = true;

      // assert
      directive.isValidDirective.subscribe({
        next: (value) => {
          expect(value).toEqual(true);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      directive.onChange();
    });

    it("should emit isValidDirective false when isShowError false", (done) => {
      // arrange
      directive.isShowError = false;

      // assert
      directive.isValidDirective.subscribe({
        next: (value) => {
          expect(value).toEqual(false);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      directive.onChange();
    });
  });

  describe("onKeydown", () => {
    it("should open with keydown", () => {
      // arrange
      const altKey = "aruyo";
      const keyCode = DOWN_ARROW;
      const spy = jest.spyOn(directive.timePicker, "showContent");
      // act
      const inputElement = debugElement.query(By.css("input"));
      inputElement.triggerEventHandler("keydown", { altKey, keyCode, preventDefault: jest.fn() });
      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("should format with ENTER", () => {
      // arrange
      const expected = moment({ hour: 12 });
      directive.value = moment({ hour: 12 });
      const keyCode = ENTER;
      // act
      const inputElement = debugElement.query(By.css("input"));
      inputElement.triggerEventHandler("keydown", { keyCode, preventDefault: jest.fn() });
      // assert
      expect(directive.value).toEqual(expected);
    });
  });

  describe("onInput", () => {
    it("should set formatted changed value", () => {
      // arrange
      const def = moment({ hour: 12, minute: 0 });
      jest.spyOn(directive, "value", "get").mockReturnValue(def as any);
      const expected = moment({ hour: 1, minute: 0 });
      const spy = jest.spyOn(directive, "value", "set");
      // act
      const inputElement = debugElement.query(By.css("input"));
      inputElement.triggerEventHandler("input", { target: { value: expected } });
      // assert
      expect(directive["timeAdapter"].sameTime(def, expected)).toEqual(false);
      expect(spy).toHaveBeenCalledWith(expected);
    });

    it("should not replace value with same value", () => {
      // arrange
      const expected = moment({ hour: 1, minute: 0 });
      const def = expected;
      jest.spyOn(directive, "value", "get").mockReturnValue(def as any);

      // act
      const inputElement = debugElement.query(By.css("input"));
      inputElement.triggerEventHandler("input", { target: { value: expected } });
      // assert
      expect(directive["timeAdapter"].sameDate(def, expected)).toEqual(true);
    });
  });

  describe("onBlur", () => {
    it("should set formatted changed value", () => {
      const def = moment({ hour: 12, minute: 0 });
      jest.spyOn(directive, "value", "get").mockReturnValue(def as any);
      const expected = moment({ hour: 1, minute: 0 });
      const spy = jest.spyOn(directive, "value", "set");
      // act
      const inputElement = debugElement.query(By.css("input"));
      inputElement.triggerEventHandler("blur", { target: { value: expected } });
      // assert
      expect(directive["timeAdapter"].sameTime(def, expected)).toEqual(false);
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe("checkTimeFormat", () => {
    it("should return true", () => {
      // arrange
      const str = "10:10 AM";

      // act
      const act = directive.checkTimeFormat(str);

      // assert
      expect(act).toEqual(true);
    });

    it("should return false", () => {
      // arrange
      const str = "23:10 DM";

      // act
      const act = directive.checkTimeFormat(str);

      // assert
      expect(act).toEqual(false);
    });
  });

  describe("getConnectedOverlayOrigin", () => {
    it("should call formField method", () => {
      // arrange
      const formField = { getConnectedOverlayOrigin: jest.fn() };
      directive["formField"] = formField as any;
      const spy = jest.spyOn(formField, "getConnectedOverlayOrigin");
      // act
      directive.getConnectedOverlayOrigin();
      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("should return elementRef", () => {
      // arrange
      const expected = "expected";
      directive["elementRef"] = expected as any;
      directive["formField"] = null;
      // act
      const actual = directive.getConnectedOverlayOrigin();
      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe("formatValue", () => {
    it("should set ''", () => {
      // arrange
      const input = null;
      const expected = "";
      directive.elementRef = { nativeElement: { value: "default value" } } as any;
      // act
      directive["formatValue"](input);
      // assert
      expect(directive.elementRef.nativeElement.value).toEqual(expected);
    });
  });

  describe("setDisabledState", () => {
    it("should unset disabled flag", () => {
      // arrange
      const input = false;
      const expected = false;

      // act
      directive.setDisabledState(input);

      // assert
      expect(directive["disabled"]).toBe(expected);
    });

    it("should set disabled flag", () => {
      // arrange
      const input = true;
      const expected = true;

      // act
      directive.setDisabledState(input);

      // assert
      expect(directive["disabled"]).toBe(expected);
    });
  });

  describe("validate", () => {
    it("should set error when failed to parse", () => {
      // arrange
      const input = { value: null } as AbstractControl;
      const expected = { imoTimepickerParse: true };
      // act
      const actual = directive.validate(input);
      // assert
      expect(actual).toEqual(expected);
    });

    it("should set error when value is before minTime", () => {
      // arrange
      const input = { value: moment("2019-07-11T10:00:00") } as AbstractControl;
      const minTime = moment("2019-07-11T20:00:00");
      const expected = { imoTimepickerMin: true };
      // act
      directive.minTime = minTime;
      const actual = directive.validate(input);
      // assert
      expect(actual).toEqual(expected);
    });

    it("should set error when value is before maxTime", () => {
      // arrange
      const input = { value: moment("2019-07-11T10:00:00") } as AbstractControl;
      const maxTime = moment("2019-07-11T00:00:00");
      const expected = { imoTimepickerMax: true };
      // act
      directive.maxTime = maxTime;
      const actual = directive.validate(input);
      // assert
      expect(actual).toEqual(expected);
    });

    it("might be set multi errors", () => {
      // arrange
      const input = { value: moment("2019-07-11T10:00:00") } as AbstractControl;
      const minTime = moment("2019-07-11T20:00:00");
      const maxTime = moment("2019-07-11T00:00:00");
      const expected = {
        imoTimepickerMin: true,
        imoTimepickerMax: true,
      };
      // act
      directive.minTime = minTime;
      directive.maxTime = maxTime;
      const actual = directive.validate(input);
      // assert
      expect(actual).toEqual(expect.objectContaining(expected));
      expect(expected).toEqual(expect.objectContaining(actual));
    });
  });
});

describe(DisableControlDirective.name, () => {
  let component: TimePickerComponent;
  let fixture: ComponentFixture<TimePickerComponent>;
  let debugElement: DebugElement;
  let directive: DisableControlDirective;

  beforeEach(async () => {
    jest.restoreAllMocks();

    await TestBed.configureTestingModule({
      imports: [TimePickerModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    directive = debugElement.query(By.directive(DisableControlDirective)).injector.get(DisableControlDirective);
  });

  it("should create an instance", () => {
    expect(component).toBeTruthy();
  });

  describe("DisableControlDirective", () => {
    it("should set condition disable", () => {
      directive["disableControl"] = true;
      expect(directive.ngControl.disabled).toEqual(true);
    });
  });
});
