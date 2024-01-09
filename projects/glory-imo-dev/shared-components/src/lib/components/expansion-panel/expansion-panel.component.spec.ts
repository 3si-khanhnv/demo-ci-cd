import { SPACE } from "@angular/cdk/keycodes";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ExpansionPanelComponent } from "./expansion-panel.component";
import { ExpansionPanelModule } from "./expansion-panel.module";

describe("ExpansionPanelComponent", () => {
  let component: ExpansionPanelComponent;
  let fixture: ComponentFixture<ExpansionPanelComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [ExpansionPanelModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("toggle", () => {
    it("should toggle showChild", () => {
      // act
      component.toggle();
      // assert
      expect(component.showChild).toEqual(true);
      // act
      component.toggle();
      // assert
      expect(component.showChild).toEqual(false);
    });

    it("should be called when clicking the header", () => {
      // arrange
      const spy = jest.spyOn(component, "toggle");
      const event = { preventDefault: jest.fn() };
      // act
      const toggle = fixture.debugElement.query(By.css(".header > button"));
      toggle.triggerEventHandler("click", event);
      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("should not be called when clicking the body", () => {
      // arrange
      const spy = jest.spyOn(component, "toggle");
      const event = { preventDefault: jest.fn() };
      // act
      const toggle = fixture.debugElement.query(By.css(".body"));
      toggle.triggerEventHandler("click", event);
      // assert
      expect(spy).not.toHaveBeenCalled();
    });

    it("should be called when pressing space key on this component", () => {
      // arrange
      const spy = jest.spyOn(component, "toggle");
      const event = { preventDefault: jest.fn(), keyCode: SPACE };
      // act
      const toggle = fixture.debugElement;
      toggle.triggerEventHandler("keydown", event);
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onCheck", () => {
    it("should emit checked", (done) => {
      // arrange
      const expected = false;
      component.data = { id: 1, checked: true };
      fixture.detectChanges();
      // assert
      component.check.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onCheck(component.data.checked);
    });

    it("should be called", () => {
      // arrange
      const spy = jest.spyOn(component, "onCheck");
      component.checkbox = true;
      component.data = { id: 1, checked: true };
      const expected = true;
      fixture.detectChanges();
      const event = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
      // act
      const toggle = fixture.debugElement.query(By.css("mat-checkbox"));
      toggle.triggerEventHandler("change", event);
      // assert
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe("isTextOverflow", () => {
    it("should return true", () => {
      // arrange
      document.body.innerHTML = "<div id='expansionDate'></div>";
      const elementId = "expansionDate";
      const elem = document.getElementById(elementId);
      Object.defineProperty(elem, "offsetWidth", { configurable: true, value: 200 });
      Object.defineProperty(elem, "scrollWidth", { configurable: true, value: 500 });
      const expected = true;
      fixture.detectChanges();
      // act
      const actual = component.isTextOverflow(elem);
      // assert
      expect(actual).toEqual(expected);
    });

    it("should return false", () => {
      // arrange
      document.body.innerHTML = "<div id='expansionDate'></div>";
      const elementId = "expansionDate";
      const elem = document.getElementById(elementId);
      Object.defineProperty(elem, "offsetWidth", { configurable: true, value: 500 });
      Object.defineProperty(elem, "scrollWidth", { configurable: true, value: 200 });
      const expected = false;
      fixture.detectChanges();
      // act
      const actual = component.isTextOverflow(elem);
      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe("isArrayData", () => {
    it("should check is array?", () => {
      // arrange
      const data = [{ id: 1, calendarName: "holiday" }];
      // act
      const actual = component.isArrayData(data);
      // assert
      const expected = true;
      expect(actual).toEqual(expected);
    });
  });
});
