import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TooltipComponent } from "./tooltip.component";

@Component({
  selector: "tooltip",
  template: "",
})
class MockTooltip {}

describe("TooltipComponent", () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  const data = {
    element: `<imo-form class="long-input"></imo-form>`,
    options: {
      placement: "top",
      autoPlacement: true,
      contentType: "html",
      showDelay: 0,
      hideDelay: 300,
      hideDelayMobile: 0,
      hideDelayTouchscreen: 0,
      zIndex: 0,
      animationDuration: 300,
      animationDurationDefault: 300,
      trigger: "hover",
      tooltipClass: "",
      display: true,
      displayMobile: true,
      displayTouchscreen: true,
      shadow: true,
      theme: "dark",
      offset: 8,
      maxWidth: "",
      id: false,
      hideDelayAfterClick: 2000,
    },
    elementPosition: {
      x: 425,
      y: 402.5500183105469,
      width: 140,
      height: 39.5,
      top: 402.5500183105469,
      right: 565,
      bottom: 442.0500183105469,
      left: 425,
    },
    outlineContext: undefined,
    value: '\n  <label class="title-tooltip">Device Values</label>\n  <p class="content-tooltip">300</p>\n  ',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipComponent, MockTooltip],
      imports: [CommonModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;

    component.data = data;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("transitionEnd", () => {
    it("should events call emit", () => {
      // arrange
      component._show = true;
      const spy = jest.spyOn(component.events, "emit");
      const expectedCallWith = { type: "shown" };

      // act
      component.transitionEnd();

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expectedCallWith);
    });

    it("should events not call emit", () => {
      // arrange
      component._show = false;
      const spy = jest.spyOn(component.events, "emit");

      // act
      component.transitionEnd();

      // assert
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe("get/set show", () => {
    describe("set", () => {
      it("should call setPosition when set true", () => {
        // arrange
        const spy = jest.spyOn(component, "setPosition");

        // act
        component.show = true;

        // assert
        expect(component._show).toEqual(true);
        expect(component.hostClassShow).toEqual(true);
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it("should not call setPosition when set false", () => {
        // arrange
        const spy = jest.spyOn(component, "setPosition");

        // act
        component.show = false;

        // assert
        expect(component._show).toEqual(false);
        expect(component.hostClassShow).toEqual(false);
        expect(spy).toHaveBeenCalledTimes(0);
      });
    });

    describe("get", () => {
      it("should get show value", () => {
        // arrange
        component._show = true;

        // act
        const act = component.show;

        // assert
        expect(act).toEqual(true);
      });
    });
  });

  describe("get dataOutletContext", () => {
    it("should return value", () => {
      // arrange
      component.data.dataOutletContext = "outlet-context";
      // act
      const act = component.dataOutletContext;

      // assert
      expect(act).toEqual("outlet-context");
    });
  });

  describe("ngOnInit", () => {
    it("should call setStyles", () => {
      // arrange

      component.data = {
        element: `<imo-form class="long-input"></imo-form>`,
        options: {
          placement: "top",
          autoPlacement: true,
          contentType: "html",
          showDelay: 0,
          hideDelay: 300,
          hideDelayMobile: 0,
          hideDelayTouchscreen: 0,
          zIndex: 100,
          animationDuration: 300,
          animationDurationDefault: 300,
          trigger: "hover",
          tooltipClass: "",
          display: true,
          displayMobile: true,
          displayTouchscreen: true,
          shadow: true,
          theme: "dark",
          offset: 8,
          maxWidth: "",
          id: false,
          hideDelayAfterClick: 2000,
        },
        elementPosition: {
          x: 425,
          y: 402.5500183105469,
          width: 140,
          height: 39.5,
          top: 402.5500183105469,
          right: 565,
          bottom: 442.0500183105469,
          left: 425,
        },
        outlineContext: undefined,
        value: '\n  <label class="title-tooltip">Device Values</label>\n  <p class="content-tooltip">300</p>\n  ',
      };

      // act
      component.ngOnInit();

      // assert
      expect(component.hostStyleZIndex).toEqual(100);
    });

    it("should call setAnimationDuration", () => {
      // arrange

      component.data = {
        element: `<imo-form class="long-input"></imo-form>`,
        options: {
          placement: "top",
          autoPlacement: true,
          contentType: "html",
          showDelay: 0,
          hideDelay: 300,
          hideDelayMobile: 0,
          hideDelayTouchscreen: 0,
          zIndex: 100,
          animationDuration: 300,
          animationDurationDefault: 400,
          trigger: "hover",
          tooltipClass: "",
          display: true,
          displayMobile: true,
          displayTouchscreen: true,
          shadow: true,
          theme: "dark",
          offset: 8,
          maxWidth: "",
          id: false,
          hideDelayAfterClick: 2000,
        },
        elementPosition: {
          x: 425,
          y: 402.5500183105469,
          width: 140,
          height: 39.5,
          top: 402.5500183105469,
          right: 565,
          bottom: 442.0500183105469,
          left: 425,
        },
        outlineContext: undefined,
        value: '\n  <label class="title-tooltip">Device Values</label>\n  <p class="content-tooltip">300</p>\n  ',
      };

      // act
      component.ngOnInit();

      // assert
      expect(component.hostStyleTransition).toEqual(`opacity ${data.options.animationDuration}ms`);
    });

    it("should call setPointerEvents", () => {
      // arrange

      component.data = {
        element: `<imo-form class="long-input"></imo-form>`,
        options: {
          placement: "top",
          autoPlacement: true,
          contentType: "html",
          showDelay: 0,
          hideDelay: 300,
          hideDelayMobile: 0,
          hideDelayTouchscreen: 0,
          zIndex: 100,
          animationDuration: 300,
          animationDurationDefault: 400,
          trigger: "hover",
          tooltipClass: "",
          display: true,
          displayMobile: true,
          displayTouchscreen: true,
          shadow: true,
          theme: "dark",
          offset: 8,
          maxWidth: "",
          id: false,
          hideDelayAfterClick: 2000,
          pointerEvents: "pointer-events",
        },
        elementPosition: {
          x: 425,
          y: 402.5500183105469,
          width: 140,
          height: 39.5,
          top: 402.5500183105469,
          right: 565,
          bottom: 442.0500183105469,
          left: 425,
        },
        outlineContext: undefined,
        value: '\n  <label class="title-tooltip">Device Values</label>\n  <p class="content-tooltip">300</p>\n  ',
      };

      // act
      component.ngOnInit();

      // assert
      expect(component.hostStylePointerEvents).toEqual("pointer-events");
    });

    it("should call setCustomClass", () => {
      // arrange

      component.data.options.tooltipClass = "tooltip1 tooltip2";

      // act
      const spy = jest.spyOn(component, "setCustomClass");
      component.ngOnInit();

      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("should return dataOutletContext", () => {
      // arrange

      component.data = {
        element: `<imo-form class="long-input"></imo-form>`,
        options: {
          placement: "top",
          autoPlacement: true,
          contentType: "template",
          showDelay: 0,
          hideDelay: 300,
          hideDelayMobile: 0,
          hideDelayTouchscreen: 0,
          zIndex: 100,
          animationDuration: 300,
          animationDurationDefault: 400,
          trigger: "hover",
          tooltipClass: "",
          display: true,
          displayMobile: true,
          displayTouchscreen: true,
          shadow: true,
          theme: "dark",
          offset: 8,
          maxWidth: "",
          id: false,
          hideDelayAfterClick: 2000,
          pointerEvents: "pointer-events",
        },
        elementPosition: {
          x: 425,
          y: 402.5500183105469,
          width: 140,
          height: 39.5,
          top: 402.5500183105469,
          right: 565,
          bottom: 442.0500183105469,
          left: 425,
        },
        outlineContext: undefined,
        dataOutletContext: "outlet-context",
        value: '\n  <label class="title-tooltip">Device Values</label>\n  <p class="content-tooltip">300</p>\n  ',
      };

      // act
      component.ngOnInit();

      // assert
      expect(component.data.dataOutletContext).toEqual("outlet-context");
    });
  });

  describe("setPosition", () => {
    it("should call setPlacementClass with placement 'top' ", () => {
      // arrange
      const placement = "top";
      component.data.options.placement = placement;
      // act
      const spy = jest.spyOn(component, "setPlacementClass");
      component.setPosition();

      // assert
      expect(spy).toHaveBeenCalledWith(placement);
    });

    it("should call setPlacementClass with placement 'bottom' ", () => {
      // arrange
      const placement = "bottom";
      component.data.options.placement = placement;
      // act
      const spy = jest.spyOn(component, "setPlacementClass");
      component.setPosition();

      // assert
      expect(spy).toHaveBeenCalledWith(placement);
    });

    it("should call setPlacementClass with placement 'left' ", () => {
      // arrange
      const placement = "left";
      component.data.options.placement = placement;
      // act
      const spy = jest.spyOn(component, "setPlacementClass");
      component.setPosition();

      // assert
      expect(spy).toHaveBeenCalledWith("top");
    });

    it("should call setPlacementClass with placement 'right' ", () => {
      // arrange
      const placement = "right";
      component.data.options.placement = placement;
      // act
      const spy = jest.spyOn(component, "setPlacementClass");
      component.setPosition();

      // assert
      expect(spy).toHaveBeenCalledWith(placement);
    });
  });

  describe("setHostStyle", () => {
    it("should call setHostStyle", () => {
      // arrange
      const placement = "top";
      component.data.options.placement = placement;
      // act
      const spy = jest.spyOn(component, "setHostStyle");
      component.events.emit({
        type: "shown",
      });
      component.setHostStyle(placement, false);

      // assert
      expect(spy).toHaveReturnedWith(true);
    });

    it("should set value elementHeight and elementWidth is 0", () => {
      // arrange

      component.data.elementPosition.right = undefined;
      const placement = "bottom";
      component.data.options.placement = placement;

      // act
      const spy = jest.spyOn(component, "setHostStyle");
      component.setHostStyle(placement, false);

      // assert
      expect(spy).toHaveReturnedWith(false);
    });
  });
});
