import { A, DOWN_ARROW, END, ESCAPE, HOME, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from "@angular/cdk/keycodes";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ComponentRef, DebugElement, Directive, SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import moment, { Moment } from "moment";
import { NEVER, of, Subject } from "rxjs";
import { TabConfig } from "./time-picker.component.i";
import { TimePickerContentComponent } from "./time-picker-content.component";
import { TimePickerComponent } from "./time-picker.component";
import { TimePickerModule } from "./time-picker.module";

@Directive({ selector: "[imoMock]" })
class MockDirective {
  constructor() {}
  get minTime(): moment.Moment | null {
    return null;
  }
  get maxTime(): moment.Moment | null {
    return null;
  }
}

export class MockPopupRef {
  constructor() {}
  hasAttached = jest.fn(() => true);
  attach = jest.fn(() => ({ instance: { selected: NEVER } }));
  detach = jest.fn();
  dispose = jest.fn();
  keydownEvents = jest.fn();
  updatePosition = jest.fn();
}

export class MockTimerPortal {
  constructor() {}
  detach = jest.fn();
  isAttached: boolean;
}

export class MockComponentRef {
  constructor() {
    this.instance = {
      keyManager: {
        onKeydown: () => {},
        setFirstItemActive: () => {},
        setLastItemActive: () => {},
      },
    };
  }
  instance;
}

// tslint:disable:no-string-literal
describe(TimePickerComponent.name, () => {
  let component: TimePickerComponent;
  let fixture: ComponentFixture<TimePickerComponent>;
  let mockDirective: MockDirective;
  let debugElement: DebugElement;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [MockDirective],
      imports: [TimePickerModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerComponent);
    component = fixture.componentInstance;
    mockDirective = new MockDirective();
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // it("should set clock icon", () => {
  //   // assert
  //   const imoButton = debugElement.query(By.css("button"));
  //   const matIconSchedule = imoButton.childNodes[0];
  //   expect(matIconSchedule).not.toBeUndefined();
  // });

  it("should update min and max values with error", () => {
    // arrange
    const time: Moment = moment();
    const minTime: Moment = time.subtract(1, "hours");
    const maxTime: Moment = time.add(1, "hours");

    //
    component.formControl.setErrors(null);
    component.minTime = minTime.clone();
    component.maxTime = maxTime.clone();

    // assert
    expect(component["min"]).toEqual(minTime);
    expect(component["max"]).toEqual(maxTime);
  });

  describe("template", () => {
    it("should call onTimeChange", () => {
      // arrange
      const expected = moment("20190613");
      const inputElement = debugElement.query(By.css("input"));
      const spy = jest.spyOn(component, "onTimeChange");
      // act
      inputElement.triggerEventHandler("timeChange", expected);
      // assert
      expect(spy).toHaveBeenCalledWith(expected);
    });

    // it("should set icon settings", () => {
    //   // arrange
    //   const icon = component.buttonIcon;
    //   const element: HTMLElement = debugElement.query(By.css("bridge-svg-icon")).query(By.css("img")).nativeElement;
    //   // assert
    //   expect(element).not.toBeNull();
    //   expect(element.getAttribute("src")).toEqual(icon.url);
    //   expect(element.getAttribute("alt")).toEqual(icon.alt);
    // });

    describe("picker", () => {
      it("should call showContent", () => {
        // arrange
        const spy = jest.spyOn(component, "showContent");
        // act
        const button = fixture.debugElement.query(By.css("imo-button"));
        button.triggerEventHandler("click", {});
        // assert
        expect(spy).toHaveBeenCalled();
      });
      it("should call showContent when disable is true", () => {
        // arrange
        component.disabled = true;
        const spy = jest.spyOn(component, "showContent");
        // act
        const button = fixture.debugElement.query(By.css("imo-button"));
        button.triggerEventHandler("click", {});
        // assert
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe("selected", () => {
    it("should set validSelected", () => {
      // arrange
      const expected = moment("20190604");
      // act
      component.selected = expected;
      // assert
      expect(component.selected).toEqual(expected);
    });
  });

  describe("isShown", () => {
    it("should return contentIsShown", () => {
      // arrange
      const expected = false;
      // act
      const actual = component.isShown;
      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe("showContent", () => {
    it("should throw error", () => {
      // arrange
      component.timePickerInput = undefined;
      const expected = new Error("Attempted to open an IMOTimePicker with no associated input");
      // assert
      expect(() => component.showContent()).toThrow(expected);
    });

    it("should open popup", () => {
      // arrange
      jest.spyOn(component, "isShown", "get").mockReturnValue(false);
      component["openAsPopup"] = jest.fn();
      component.timePickerInput = mockDirective as any;
      const spy = jest.spyOn(component, "openAsPopup" as any);
      // act
      component.showContent();
      // assert
      expect(component.isShown).toEqual(false);
      expect(!component.timePickerInput).toEqual(false);
      expect(spy).toHaveBeenCalled();
    });

    it("should not call openAsPopup if isShown", () => {
      // arrange
      jest.spyOn(component, "isShown", "get").mockReturnValue(true);
      const spy = jest.spyOn(component, "openAsPopup" as any);
      // act
      component.showContent();
      // assert
      expect(component.isShown).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it("should not update focused element", () => {
      // arrange
      jest.spyOn(component, "isShown", "get").mockReturnValue(false);
      component["focusedElementBeforeShowContent"] = { focus: jest.fn() } as any;
      const spy = jest.spyOn(component, "openAsPopup" as any);

      // act
      component.showContent();

      // assert
      expect(component.isShown).toEqual(false);
      expect(spy).toHaveBeenCalled();
    });

    it("should not update timer portal", () => {
      // arrange
      jest.spyOn(component, "isShown", "get").mockReturnValue(false);
      component["focusedElementBeforeShowContent"] = { focus: jest.fn() } as any;
      component["timerPortal"] = new ComponentPortal<TimePickerContentComponent>(TimePickerContentComponent);
      const spy = jest.spyOn(component, "openAsPopup" as any);

      // act
      component.showContent();

      // assert
      expect(component.isShown).toEqual(false);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("hideContent", () => {
    it("should set contentIsShown", () => {
      // arrange
      component["contentIsShown"] = true;
      const expected = false;
      // act
      component.hideContent();
      // assert
      expect(component.isShown).toEqual(expected);
    });

    it("should set detach & unsubscribe", () => {
      // arrange
      component["contentIsShown"] = true;
      component["popupRef"] = new MockPopupRef() as any;
      component["popupRef"].hasAttached = jest.fn(() => true);
      const popupRef = jest.spyOn(component["popupRef"], "detach");
      const subscription = jest.spyOn(component["selectSubscription"], "unsubscribe");
      const flag = component["popupRef"] && component["popupRef"].hasAttached();
      // act
      component.hideContent();
      // assert
      expect(flag).toEqual(true);
      expect(popupRef).toHaveBeenCalled();
      expect(subscription).toHaveBeenCalled();
    });

    it("should detach timerPortal", () => {
      // arrange
      component["contentIsShown"] = true;
      component["timerPortal"] = new MockTimerPortal() as any;
      (component["timerPortal"].isAttached as any) = true;
      const spy = jest.spyOn(component["timerPortal"], "detach");
      const flag = component["timerPortal"] && component["timerPortal"].isAttached;
      // act
      component.hideContent();
      // assert
      expect(flag).toEqual(true);
      expect(spy).toHaveBeenCalled();
    });

    it("should focus before open", () => {
      // arrange
      component["contentIsShown"] = true;
      component["timerPortal"] = new MockTimerPortal() as any;
      (component["timerPortal"].isAttached as any) = true;
      component["focusedElementBeforeShowContent"] = { focus: jest.fn() } as any;
      const spy = jest.spyOn(component["focusedElementBeforeShowContent"] as HTMLElement, "focus");
      // act
      component.hideContent();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("registerInput", () => {
    it("should throw error", () => {
      // arrange
      component.timePickerInput = {} as any;
      const input = {} as any;
      const expected = new Error("A TimePicker can only be associated with a single input");
      // assert
      expect(() => component.registerInput(input)).toThrow(expected);
    });

    it("should set timePickerInput", () => {
      // arrange
      const expected = new MockDirective() as any;
      component.timePickerInput = undefined;
      // act
      component.registerInput(expected);
      // assert
      expect(component.timePickerInput).toEqual(expected);
    });
  });

  describe("select", () => {
    it("should not changed value", () => {
      // arrange
      const expected = moment([0, 0, 0, 2, 30]);
      jest.spyOn(component["timeAdapter"], "sameTime").mockReturnValue(true);
      const selectedChangedSpy = jest.spyOn(component.selectedChanged, "next");

      // act
      component.select(expected);

      // assert
      expect(selectedChangedSpy).not.toHaveBeenCalled();
    });

    it("should flow with changed value", (done) => {
      // arrange
      const before = moment([0, 0, 0, 12, 30]);
      const expected = moment([0, 0, 0, 2, 30]);
      component.selected = before;
      component["timeAdapter"].sameTime = jest.fn(() => false);
      // assert
      component.selectedChanged.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.select(expected);
    });
  });

  describe("openAsPopup", () => {
    beforeEach(() => {
      component["createPopupPositionStrategy"] = jest.fn();
    });
    it("should set instance of TimePickerComponent as timerPortal", () => {
      // arrange
      component["timerPortal"] = undefined;
      component["popupRef"] = new MockPopupRef() as any;
      // act
      component["openAsPopup"]();
      // assert
      expect(component["timerPortal"]).toBeInstanceOf(ComponentPortal);
      expect(new component["timerPortal"].component()).toBeInstanceOf(TimePickerContentComponent);
    });

    it("should call popupRef", () => {
      // arrange
      component["popupRef"] = undefined;
      const spy = jest.spyOn(component, "createPopup" as any);
      // act
      component["openAsPopup"]();
      // assert
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should attach popupRef", () => {
      // arrange
      component["createPopup"]();
      component["popupRef"].hasAttached = jest.fn(() => false);
      const spy = jest.spyOn(component["popupRef"], "attach" as any);
      // act
      component["openAsPopup"]();
      // assert
      expect(component["popupComponentRef"]).toBeInstanceOf(ComponentRef);
      expect(spy).toHaveBeenCalledWith(component["timerPortal"]);
    });

    it("should subscribe timerPortal selected", () => {
      // arrange
      const selectSpy = jest.spyOn(component, "select");
      const close = jest.spyOn(component, "hideContent");
      const timestamp = moment([2017]);
      // act
      component["openAsPopup"]();
      component["popupComponentRef"].instance.selected.next(timestamp);
      // assert
      expect(selectSpy).toHaveBeenCalledTimes(1);
      expect(close).toHaveBeenCalledTimes(1);
    });

    it("should call updatePosition", () => {
      // arrange
      component["popupRef"] = new MockPopupRef() as any;
      const spy = jest.spyOn(component["popupRef"], "updatePosition");
      // no MicroTask
      (component["ngZone"].onStable as any) = new Subject();
      // act
      component["openAsPopup"]();
      component["ngZone"].onStable.next({});
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("createPopup", () => {
    let overlay: Overlay;
    let overlayRef: OverlayRef;

    beforeEach(() => {
      overlay = TestBed.inject(Overlay);
      overlayRef = {
        backdropClick: jest.fn(() => NEVER),
        detachments: jest.fn(() => NEVER),
        keydownEvents: jest.fn(() => NEVER),
        overlayElement: { setAttribute: jest.fn() },
        dispose: jest.fn(),
      } as any;
      jest.spyOn(overlay, "create").mockReturnValue(overlayRef);
      component["createPopupPositionStrategy"] = jest.fn();
    });

    it("should stop event & call hideContent if escape", () => {
      // arrange
      const event = { keyCode: ESCAPE, preventDefault: jest.fn() };
      (overlayRef.keydownEvents as jest.Mock).mockReturnValue(of(event));
      const prevent = jest.spyOn(event, "preventDefault");
      const close = jest.spyOn(component, "hideContent");
      // act
      component["createPopup"]();
      // assert
      expect(prevent).toHaveBeenCalled();
      expect(close).toHaveBeenCalled();
    });

    it("should stop event & call hideContent if alt + arrowUp", () => {
      // arrange
      component.timePickerInput = new MockDirective() as any;
      const event = { altKey: true, keyCode: UP_ARROW, preventDefault: jest.fn() };
      (overlayRef.keydownEvents as jest.Mock).mockReturnValue(of(event));
      const prevent = jest.spyOn(event, "preventDefault");
      const close = jest.spyOn(component, "hideContent");
      // act
      component["createPopup"]();
      // assert
      expect(prevent).toHaveBeenCalled();
      expect(close).toHaveBeenCalled();
    });

    it("should stop event & call hideContent if MouseEvent", () => {
      // arrange
      const event = new MouseEvent("");
      const prevent = jest.spyOn(event, "preventDefault");
      const close = jest.spyOn(component, "hideContent");
      (overlayRef.backdropClick as jest.Mock).mockReturnValue(of(event));
      // act
      component["createPopup"]();
      // assert
      expect(prevent).toHaveBeenCalled();
      expect(close).toHaveBeenCalled();
    });

    it("should stop event & focus content if arrowRight", () => {
      // arrange
      component.timePickerInput = new MockDirective() as any;
      component.timePickerInput["elementRef"] = { nativeElement: { focus: () => null } };
      const event = { keyCode: RIGHT_ARROW, preventDefault: jest.fn() };
      (overlayRef.keydownEvents as jest.Mock).mockReturnValue(of(event));
      const prevent = jest.spyOn(event, "preventDefault");
      const content = jest.spyOn(component.timePickerInput["elementRef"].nativeElement, "focus");
      // act
      component["createPopup"]();
      // assert
      expect(prevent).toHaveBeenCalled();
      expect(content).toHaveBeenCalled();
    });

    it("should stop event & focus content if arrowLeft", () => {
      // arrange
      component.timePickerInput = new MockDirective() as any;
      component.timePickerInput["elementRef"] = { nativeElement: { focus: () => null } };
      const event = { keyCode: LEFT_ARROW, preventDefault: jest.fn() };
      (overlayRef.keydownEvents as jest.Mock).mockReturnValue(of(event));
      const prevent = jest.spyOn(event, "preventDefault");
      const content = jest.spyOn(component.timePickerInput["elementRef"].nativeElement, "focus");
      // act
      component["createPopup"]();
      // assert
      expect(prevent).toHaveBeenCalled();
      expect(content).toHaveBeenCalled();
    });

    it("should stop event & pass event to keyManager if arrowDown", () => {
      // arrange
      component["popupComponentRef"] = new MockComponentRef() as any;
      const event = { keyCode: DOWN_ARROW, preventDefault: jest.fn() };
      (overlayRef.keydownEvents as jest.Mock).mockReturnValue(of(event));
      const prevent = jest.spyOn(event, "preventDefault");
      const keyManager = jest.spyOn(component["popupComponentRef"].instance.keyManager, "onKeydown");
      // act
      component["createPopup"]();
      // assert
      expect(prevent).toHaveBeenCalled();
      expect(keyManager).toHaveBeenCalledWith(event);
    });

    it("should stop event & pass event to keyManager if arrowUp", () => {
      // arrange
      component["popupComponentRef"] = new MockComponentRef() as any;
      const event = { keyCode: UP_ARROW, preventDefault: jest.fn() };
      (overlayRef.keydownEvents as jest.Mock).mockReturnValue(of(event));
      const prevent = jest.spyOn(event, "preventDefault");
      const keyManager = jest.spyOn(component["popupComponentRef"].instance.keyManager, "onKeydown");
      // act
      component["createPopup"]();
      // assert
      expect(prevent).toHaveBeenCalled();
      expect(keyManager).toHaveBeenCalledWith(event);
    });

    it("should stop event & select first if Home", () => {
      // arrange
      component["popupComponentRef"] = new MockComponentRef() as any;
      const event = { keyCode: HOME, preventDefault: jest.fn() };
      (overlayRef.keydownEvents as jest.Mock).mockReturnValue(of(event));
      const prevent = jest.spyOn(event, "preventDefault");
      const keyManager = jest.spyOn(component["popupComponentRef"].instance.keyManager, "setFirstItemActive");
      // act
      component["createPopup"]();
      // assert
      expect(prevent).toHaveBeenCalled();
      expect(keyManager).toHaveBeenCalled();
    });

    it("should stop event & select last if End", () => {
      // arrange
      component["popupComponentRef"] = new MockComponentRef() as any;
      const event = { keyCode: END, preventDefault: jest.fn() };
      (overlayRef.keydownEvents as jest.Mock).mockReturnValue(of(event));
      const prevent = jest.spyOn(event, "preventDefault");
      const keyManager = jest.spyOn(component["popupComponentRef"].instance.keyManager, "setLastItemActive");
      // act
      component["createPopup"]();
      // assert
      expect(prevent).toHaveBeenCalled();
      expect(keyManager).toHaveBeenCalled();
    });

    it("should not call preventDefault", () => {
      // arrange
      component["popupRef"] = new MockPopupRef() as any;
      const event = { keyCode: A, preventDefault: jest.fn() };
      (overlayRef.keydownEvents as jest.Mock).mockReturnValue(of(event));
      const prevent = jest.spyOn(event, "preventDefault");

      // act
      component["createPopup"]();

      // assert
      expect(prevent).not.toHaveBeenCalled();
    });
  });

  describe("onSelectedChange", () => {
    it("should emit value in string", () => {
      // arrange
      const stringFormat = "hh:mm A";
      const expected = moment();
      const selectedAtSpy = jest.spyOn(component.selectedAt, "emit");
      component.formControl = new FormControl();

      // act
      component.stringValue = true;
      component.onSelectedChange(expected.clone());

      // assert
      expect(selectedAtSpy).toHaveBeenCalledWith(expected.format(stringFormat));
    });
  });

  describe("onCheckIsValid", () => {
    it("should return isValid true", () => {
      // arrange
      component.isValid = false;
      const value = true;

      // act
      component.onCheckIsValid(value);

      // assert
      expect(component.isValid).toEqual(true);
    });

    it("should return isValid false", () => {
      // arrange
      component.isValid = true;
      const value = false;

      // act
      component.onCheckIsValid(value);

      // assert
      expect(component.isValid).toEqual(false);
    });
  });

  describe("ngOnChanges", () => {
    it("should patchValue data default", () => {
      // arrange
      component.default = moment("09:30 AM", TabConfig.TIME_FORMAT);
      const changes = {
        cutOffTime: {
          currentValue: "03:30 PM",
          previousValue: "09:30 AM",
          firstChange: false,
        },
      };

      const expected = moment("09:30 AM", TabConfig.TIME_FORMAT);

      // act
      component.ngOnChanges({
        default: new SimpleChange([], changes, false),
      });

      // assert
      fixture.detectChanges();
      expect(component.formControl.value).toEqual(expected);
    });

    it("should not patchValue data default", () => {
      // arrange
      component.default = moment("09:30 AM", TabConfig.TIME_FORMAT);
      const changes = {
        cutOffTime: {
          currentValue: "03:30 PM",
          previousValue: "09:30 AM",
          firstChange: false,
        },
      };

      const expected = moment("09:30 AM", TabConfig.TIME_FORMAT);

      // act
      component.ngOnChanges({
        default: new SimpleChange([], changes, true),
      });

      // assert
      fixture.detectChanges();
      expect(component.formControl.value).not.toEqual(expected);
    });
  });
});
