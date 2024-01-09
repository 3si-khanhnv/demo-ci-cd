import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl } from "@angular/forms";
import { MatRadioChange, MatRadioModule } from "@angular/material/radio";
import { FormModule } from "../form/form.module";
import { RadioFormListComponent } from "./radio-form-list.component";

describe("RadioFormListComponent", () => {
  let component: RadioFormListComponent;
  let fixture: ComponentFixture<RadioFormListComponent>;
  const initRadios = [
    { name: "Standard order", value: "standard", isDisable: false, formControl: new FormControl("11") },
    {
      name: "Percentage (Quantity)",
      value: "percentageQuantity",
      isDisable: false,
      formControl: new FormControl("aa"),
    },
  ];

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [RadioFormListComponent],
      imports: [MatRadioModule, FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("checkedValue", () => {
    it("should get default value of radio list follow default value", () => {
      //arrange
      component.defaultValue = "percentageQuantity";
      component.radios = initRadios;

      const expected = {
        name: "Percentage (Quantity)",
        value: "percentageQuantity",
        formControl: expect.any(FormControl),
        isDisable: false,
      };

      //act
      const act = component.checkedValue;

      //assert
      expect(act).toEqual(expected);
    });

    it("should get default value of radio list not follow default value", () => {
      //arrange
      component.defaultValue = "";
      component.radios = [
        { name: "Standard order", value: "standard", isDisable: false, formControl: new FormControl("11") },
        {
          name: "Percentage (Quantity)",
          value: "percentageQuantity",
          isDisable: false,
          formControl: new FormControl("aa"),
        },
      ];

      const expected = {
        name: "Standard order",
        value: "standard",
        formControl: expect.any(FormControl),
        isDisable: false,
      };

      //act
      const act = component.checkedValue;

      //assert
      expect(act).toEqual(expected);
    });
  });

  describe("onRadioChange", () => {
    it("should  emit radioChanged when change radio", (done) => {
      // arrange
      const event: Partial<MatRadioChange> = {
        value: "standard",
      };
      // act
      component.radios = initRadios;
      component.defaultValue = "standard";
      component.radioChanged.subscribe({
        next: () => {
          expect(component.checkedValue.value).toEqual(event.value);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onRadioChange(event);
    });
  });
});
