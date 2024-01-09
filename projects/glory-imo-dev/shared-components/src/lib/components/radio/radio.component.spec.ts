import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatRadioModule, MatRadioChange } from "@angular/material/radio";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { RadioComponent } from "./radio.component";
import { TranslateModule } from "@ngx-translate/core";

describe("RadioComponent", () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;
  const radios = [
    { name: "Standard order", value: "standard" },
    { name: "Emergency order", value: "emergency" },
  ];

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [RadioComponent],
      imports: [MatRadioModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onChange", () => {
    it("should emit data when defaultValue is exist", (done) => {
      // arrange
      const event: Partial<MatRadioChange> = {
        value: "standard",
      };
      // act
      component.radios = radios;
      component.defaultValue = "standard";
      component.changed.subscribe({
        next: () => {
          expect(component.checkedValue.value).toEqual(event.value);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onChange(event);
    });

    it("should emit data when defaultValue is not exist", (done) => {
      // arrange
      const event: Partial<MatRadioChange> = {
        value: "standard",
      };
      // act
      component.radios = radios;
      component.defaultValue = undefined;
      component.changed.subscribe({
        next: () => {
          expect(component.checkedValue.value).toEqual(event.value);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onChange(event);
    });
  });
});
