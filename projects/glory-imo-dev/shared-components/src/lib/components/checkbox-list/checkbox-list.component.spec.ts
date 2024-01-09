import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCheckbox } from "@angular/material/checkbox";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { CheckboxListComponent } from "./checkbox-list.component";
import { CheckboxListModule } from "./checkbox-list.module";

describe("CheckboxListComponent", () => {
  let component: CheckboxListComponent;
  let fixture: ComponentFixture<CheckboxListComponent>;
  let debugElement: DebugElement;

  const list = [
    { value: "1", label: "one" },
    { value: "2", label: "two" },
    { value: "3", label: "three" },
  ];

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [CheckboxListModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onCheck", () => {
    it("should emit 1 checked with true event", (done) => {
      // arrange
      component.list = list;
      fixture.detectChanges();
      const expected = { key: "1", value: true };
      // assert
      component.checked.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onCheck(true, "1");
    });

    it("should emit 1 checked with false event", (done) => {
      // arrange
      component.list = list;
      component.checkedItem = ["2", "3"];
      fixture.detectChanges();
      const expected = { key: "2", value: false };
      // assert
      component.checked.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onCheck(false, "2");
    });
  });

  describe("onKeyup", () => {
    it("should update on key up 'enter'", () => {
      // arrange
      component.list = list;
      fixture.detectChanges();
      const checkbox = debugElement.query(By.directive(MatCheckbox));
      const event: Partial<KeyboardEvent> = { code: "Enter" };
      const spyOnCheck = jest.spyOn(component, "onCheck");

      // act
      checkbox.triggerEventHandler("keyup", event);

      // assert
      expect(spyOnCheck).toHaveBeenCalled();
    });

    it("shout not do anything when onkeyup not a 'enter'", () => {
      // arrange
      component.list = list;
      fixture.detectChanges();
      const checkbox = debugElement.query(By.directive(MatCheckbox));
      const event: Partial<KeyboardEvent> = { code: "a" };
      const spyOnCheck = jest.spyOn(component, "onCheck");

      // act
      checkbox.triggerEventHandler("keyup", event);

      // assert
      expect(spyOnCheck).not.toHaveBeenCalled();
    });
  });
});
