import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { FormControl } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OptionValue } from "../checkbox-list/checkbox-list.component.i";
import { CheckboxListModule } from "../checkbox-list/checkbox-list.module";
import { FormModule } from "../form/form.module";
import { WorkingDayComponent } from "./working-day.component";
import { WorkingDay } from "./working-day.component.i";
import { TranslateModule } from "@ngx-translate/core";

const inputData: WorkingDay = {
  checkbox: {
    label: "Monday",
    value: "monday",
    checked: true,
    disabled: false,
  },
  input: new FormControl(),
};

describe("WorkingDaysComponent", () => {
  let component: WorkingDayComponent;
  let fixture: ComponentFixture<WorkingDayComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [WorkingDayComponent],
      imports: [CommonModule, CheckboxListModule, FormModule, BrowserAnimationsModule, FlexLayoutModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingDayComponent);
    component = fixture.componentInstance;

    component.data = inputData;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should init with data input disable when checkbox = false", () => {
      // arrange

      const spy = jest.spyOn(component.data.input, "disable");
      component.checkbox = false;
      // actual
      component.ngOnInit();
      // arrange
      expect(spy).not.toHaveBeenCalled();
    });
    it("should init with data input enable when checkbox = true", () => {
      // arrange
      const spy = jest.spyOn(component.data.input, "enable");
      // actual
      component.ngOnInit();
      // arrange
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onCheckedDate", () => {
    it("should set checkbox to be checked and enable lead days field", () => {
      // arrange
      const eventData: OptionValue = {
        key: "monday",
        value: true,
      };
      const spyDataChanged = jest.spyOn(component, "onDataChanged");
      const spyDataInput = jest.spyOn(component.data.input, "enable");

      // act
      component.onCheckedDate(eventData);

      // assert
      expect(component.data.checkbox.checked).toBe(true);
      expect(spyDataChanged).toHaveBeenCalled();
      expect(spyDataInput).toHaveBeenCalled();
    });

    it("should set checkbox to be unchecked and disable lead days field", () => {
      // arrange
      const eventData: OptionValue = {
        key: "monday",
        value: false,
      };
      const spyDataChanged = jest.spyOn(component, "onDataChanged");
      const spyDataInput = jest.spyOn(component.data.input, "disable");
      // act
      component.onCheckedDate(eventData);

      // assert
      expect(component.data.checkbox.checked).toBe(false);
      expect(spyDataChanged).toHaveBeenCalled();
      expect(spyDataInput).toHaveBeenCalledTimes(1);
    });

    it("should do nothing", () => {
      // arrange
      const eventData: OptionValue = undefined;
      // act
      component.onCheckedDate(eventData);
      // assert
      expect(component.data.checkbox.checked).toBe(false);
    });
  });

  describe("validateInputFormat", () => {
    it("should return 0 string when input empty string", () => {
      // arrange
      const expected = "";

      // act
      const stringValue = component.validateInputFormat(expected);

      // assert
      expect(stringValue).toEqual("0");
    });

    it("should return 0 string when enter alphabet characters", () => {
      // arrange
      const expected = "aa";

      // act
      const stringValue = component.validateInputFormat(expected);

      // assert
      expect(stringValue).toEqual("0");
    });

    it("should subscribe on lead days change", () => {
      const spyDataChanged = jest.spyOn(component, "onDataChanged");

      component.data.input.patchValue("a1230");

      expect(spyDataChanged).toHaveBeenCalled();
    });

    it("should not change value when enter correctly", () => {
      const expected = "30";
      const spyPatchValue = jest.spyOn(component.data.input, "patchValue");

      const stringValue = component.validateInputFormat(expected);

      expect(stringValue).toEqual(expected);
      expect(spyPatchValue).not.toHaveBeenCalled();
    });
  });
});
