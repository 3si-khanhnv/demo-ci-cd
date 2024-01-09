import { ApplicationRef, ComponentFactoryResolver, ElementRef, Injector, NO_ERRORS_SCHEMA, SimpleChange } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { TooltipOptions } from "./tooltip-options.i";
import { TooltipDirective } from "./tooltip.directive";

export class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}

describe("TooltipDirective", () => {
  let directive: TooltipDirective;

  let initOptions: any;
  let elementRef: ElementRef;
  let componentFactoryResolver: ComponentFactoryResolver;
  let appRef: ApplicationRef;
  let injector: Injector;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TooltipDirective],
      providers: [{ provide: ElementRef, useClass: MockElementRef }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    initOptions = {};
    elementRef = TestBed.inject(ElementRef);
    componentFactoryResolver = TestBed.inject(ComponentFactoryResolver);
    appRef = TestBed.inject(ApplicationRef);
    injector = TestBed.inject(Injector);
    directive = new TooltipDirective(initOptions, elementRef, componentFactoryResolver, appRef, injector);
  });

  it("should create an instance", () => {
    expect(directive).toBeTruthy();
  });

  describe("set get options", () => {
    it("set _options when have value", () => {
      // arrange
      const value = <TooltipOptions>{ animationDuration: 2000 };

      // act
      directive.options = value;

      // assert
      expect(directive._options).toEqual(value);
    });

    it("set _options when have value", () => {
      // arrange
      const value = undefined;

      // act
      directive.options = value;

      // assert
      expect(directive._options).toEqual({});
    });

    it("get options", () => {
      // arrange
      const value = <TooltipOptions>{ animationDuration: 2000 };

      // act
      directive._options = value;

      // assert
      expect(directive.options).toEqual(value);
    });
  });

  describe("set contentTypeBackwardCompatibility", () => {
    it("set _contentType when have value", () => {
      // arrange
      const value = "html";

      // act
      directive.contentTypeBackwardCompatibility = value;

      // assert
      expect(directive._contentType).toEqual(value);
    });

    it("set _contentType when not have value", () => {
      // arrange
      const value = undefined;

      // act
      directive.contentTypeBackwardCompatibility = value;

      // assert
      expect(directive._contentType).toEqual("string");
    });
  });

  describe("set get contentType", () => {
    it("set _contentType when have value", () => {
      // arrange
      const value = "html";

      // act
      directive.contentType = value;

      // assert
      expect(directive._contentType).toEqual(value);
    });

    it("set _contentType when not have value", () => {
      // arrange
      const value = undefined;

      // act
      directive.contentType = value;

      // assert
      expect(directive._contentType).toEqual("string");
    });

    it("get contentType", () => {
      // arrange
      const value = "html";

      // act
      directive._contentType = value;

      // assert
      expect(directive.contentType).toEqual(value);
    });
  });

  describe("get zIndexBackwardCompatibility", () => {
    it("set _zIndex when have value", () => {
      // arrange
      const value = 1;

      // act
      directive.zIndexBackwardCompatibility = value;

      // assert
      expect(directive._zIndex).toEqual(value);
    });

    it("set _zIndex when not have value", () => {
      // arrange
      const value = undefined;

      // act
      directive.zIndexBackwardCompatibility = value;

      // assert
      expect(directive._zIndex).toBeUndefined();
    });
  });

  describe("set get zIndex", () => {
    it("set _zIndex when have value", () => {
      // arrange
      const value = 1;

      // act
      directive.zIndex = value;

      // assert
      expect(directive._zIndex).toEqual(value);
    });

    it("set _zIndex when not have value", () => {
      // arrange
      const value = undefined;

      // act
      directive.zIndex = value;

      // assert
      expect(directive._zIndex).toBeUndefined();
    });

    it("get zIndex", () => {
      // arrange
      const value = 1;

      // act
      directive._zIndex = value;

      // assert
      expect(directive.zIndex).toEqual(value);
    });
  });

  describe("set animationDurationBackwardCompatibility", () => {
    it("set _animationDuration when have value", () => {
      // arrange
      const value = 2;

      // act
      directive.animationDurationBackwardCompatibility = value;

      // assert
      expect(directive._animationDuration).toEqual(value);
    });

    it("set _animationDuration when have value", () => {
      // arrange
      const value = undefined;

      // act
      directive.animationDurationBackwardCompatibility = value;

      // assert
      expect(directive._animationDuration).toBeUndefined();
    });
  });

  describe("set get animationDuration", () => {
    it("set _animationDuration when have value", () => {
      // arrange
      const value = 2;

      // act
      directive.animationDuration = value;

      // assert
      expect(directive._animationDuration).toEqual(value);
    });

    it("set _animationDuration when not have value", () => {
      // arrange
      const value = undefined;

      // act
      directive.animationDuration = value;

      // assert
      expect(directive._animationDuration).toBeUndefined();
    });

    it("get animationDuration", () => {
      // arrange
      directive._animationDuration = 2;

      // act
      const act = directive.animationDuration;

      // assert
      expect(act).toEqual(2);
    });
  });

  describe("set tooltipClassBackwardCompatibility", () => {
    it("set _tooltipClass when have value", () => {
      // arrange
      const value = "acb";

      // act
      directive.tooltipClassBackwardCompatibility = value;

      // assert
      expect(directive._tooltipClass).toEqual(value);
    });

    it("not set _tooltipClass when not have value", () => {
      // arrange
      const value = undefined;

      // act
      directive.tooltipClassBackwardCompatibility = value;

      // assert
      expect(directive._tooltipClass).toBeUndefined();
    });
  });

  describe("set/get tooltipClass", () => {
    it("set tooltipClass have value", () => {
      // arrange
      const value = "1000";
      // act
      directive.tooltipClass = value;

      // assert
      expect(directive._tooltipClass).toEqual("1000");
    });

    it("set tooltipClass not have value", () => {
      // arrange
      const value = undefined;
      // act
      directive.tooltipClass = value;

      // assert
      expect(directive._tooltipClass).toBeUndefined();
    });

    it("get tooltipClass", () => {
      // arrange
      directive._tooltipClass = "1000";
      // act
      const act = directive.tooltipClass;

      // assert
      expect(act).toEqual("1000");
    });
  });

  describe("set/get maxWidthBackwardCompatibility", () => {
    it("set _maxWidth have value", () => {
      // arrange
      const value = "string";
      // act
      directive.maxWidthBackwardCompatibility = value;

      // assert
      expect(directive._maxWidth).toEqual("string");
    });

    it("set _maxWidth not have value", () => {
      // arrange
      const value = undefined;
      // act
      directive.maxWidthBackwardCompatibility = value;

      // assert
      expect(directive._maxWidth).toBeUndefined();
    });
  });

  describe("set/get maxWidth", () => {
    it("set _maxWidth have value", () => {
      // arrange
      const value = "string";
      // act
      directive.maxWidth = value;

      // assert
      expect(directive._maxWidth).toEqual("string");
    });

    it("set _maxWidth not have value", () => {
      // arrange
      const value = undefined;
      // act
      directive.maxWidth = value;

      // assert
      expect(directive._maxWidth).toBeUndefined();
    });

    it("get maxWidth", () => {
      // arrange
      directive._maxWidth = "1000";
      // act
      const act = directive.maxWidth;

      // assert
      expect(act).toEqual("1000");
    });
  });

  describe("set/get showDelayBackwardCompatibility", () => {
    it("set _showDelay have value", () => {
      // arrange
      const value = 1000;
      // act
      directive.showDelayBackwardCompatibility = value;

      // assert
      expect(directive._showDelay).toEqual(value);
    });

    it("set _showDelay not have value", () => {
      // arrange
      const value = undefined;
      // act
      directive.showDelayBackwardCompatibility = value;

      // assert
      expect(directive._showDelay).toBeUndefined();
    });
  });

  describe("set/get showDelay", () => {
    it("set _showDelay have value", () => {
      // arrange
      const value = 1000;
      // act
      directive.showDelay = value;

      // assert
      expect(directive._showDelay).toEqual(1000);
    });

    it("set _showDelay not have value", () => {
      // arrange
      const value = undefined;
      // act
      directive.showDelay = value;

      // assert
      expect(directive._showDelay).toBeUndefined();
    });

    it("get showDelay", () => {
      // arrange
      directive._showDelay = 1000;
      // act
      const act = directive.showDelay;

      // assert
      expect(act).toEqual(1000);
    });
  });

  describe("set hideDelayBackwardCompatibility", () => {
    it("set _hideDelay have value", () => {
      // arrange
      const value = 1000;
      // act
      directive.hideDelayBackwardCompatibility = value;

      // assert
      expect(directive._hideDelay).toEqual(1000);
    });

    it("set _hideDelay not have value", () => {
      // arrange
      const value = undefined;
      // act
      directive.hideDelayBackwardCompatibility = value;

      // assert
      expect(directive._hideDelay).toBeUndefined();
    });
  });

  describe("set/get hideDelay", () => {
    it("set _hideDelay have value", () => {
      // arrange
      const value = 1000;
      // act
      directive.hideDelay = value;

      // assert
      expect(directive._hideDelay).toEqual(1000);
    });

    it("set _hideDelay not have value", () => {
      // arrange
      const value = undefined;
      // act
      directive.hideDelay = value;

      // assert
      expect(directive._hideDelay).toBeUndefined();
    });

    it("get hideDelay", () => {
      // arrange
      directive._hideDelay = 1000;
      // act
      const act = directive.hideDelay;

      // assert
      expect(act).toEqual(1000);
    });
  });

  describe("get/set destroyDelay", () => {
    it("get destroyDelay when _destroyDelay have value", () => {
      // arrange
      directive._destroyDelay = 1000;
      // act
      const act = directive.destroyDelay;

      // assert
      expect(act).toEqual(1000);
    });

    it("get destroyDelay when _destroyDelay have value undefine", () => {
      // arrange
      directive._destroyDelay = undefined;
      jest.spyOn(directive, "getHideDelay").mockReturnValueOnce(300);
      directive.options = <TooltipOptions>{ animationDuration: 300 };
      // act
      const act = directive.destroyDelay;

      // assert
      expect(act).toEqual(600);
    });

    it("set _hideDelay have value", () => {
      // arrange
      const value = 1000;
      // act
      directive.destroyDelay = value;

      // assert
      expect(directive._destroyDelay).toEqual(1000);
    });
  });

  describe("get tooltipPosition", () => {
    it("get tooltipPosition when position have value", () => {
      // arrange
      const expected = {
        top: 100,
        left: 100,
      };

      directive.options = <TooltipOptions>{
        position: expected,
      };
      // act
      const act = directive.tooltipPosition;

      // assert
      expect(act).toEqual(expected);
    });

    it("get tooltipPosition when position not have value", () => {
      // arrange
      const expected = {
        top: 200,
        left: 200,
      };

      directive.options = <TooltipOptions>{
        position: undefined,
      };

      directive.elementPosition = <any>{
        top: 200,
        left: 200,
      };
      // act
      const act = directive.tooltipPosition;

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe("onMouseEnter", () => {
    it("should not call show function when isDisplayOnHover false", () => {
      // arrange
      jest.spyOn(directive, "isDisplayOnHover", "get").mockReturnValueOnce(false);
      const spy = jest.spyOn(directive, "show");
      // act
      directive.onMouseEnter();
      // assert
      expect(spy).not.toHaveBeenCalled();
    });

    it("should call show function when isDisplayOnHover true", () => {
      // arrange
      jest.spyOn(directive, "isDisplayOnHover", "get").mockReturnValueOnce(true);
      const spy = jest.spyOn(directive, "show");
      // act
      directive.onMouseEnter();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onMouseLeave", () => {
    it("should call destroyTooltip function when trigger is hover", () => {
      // arrange
      directive.options = <TooltipOptions>{
        trigger: "hover",
      };
      const spy = jest.spyOn(directive, "destroyTooltip");
      // act
      directive.onMouseLeave();
      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("should not call destroyTooltip function when trigger is not hover", () => {
      // arrange
      directive.options = <TooltipOptions>{
        trigger: "abc",
      };
      const spy = jest.spyOn(directive, "destroyTooltip");
      // act
      directive.onMouseLeave();
      // assert
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("onClick", () => {
    it("should not call show function when trigger is hover", () => {
      // arrange
      jest.spyOn(directive, "isDisplayOnClick", "get").mockReturnValueOnce(false);
      const spy = jest.spyOn(directive, "show");
      // act
      directive.onClick();
      // assert
      expect(spy).not.toHaveBeenCalled();
    });

    it("should call show function when trigger is hover", () => {
      // arrange
      directive.options = <TooltipOptions>{
        hideDelayAfterClick: 0,
      };
      jest.spyOn(directive, "isDisplayOnClick", "get").mockReturnValueOnce(true);
      const spy = jest.spyOn(directive, "show");
      // act
      directive.onClick();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("ngOnChanges", () => {
    it("should call applyOptionsDefault", () => {
      // arrange
      const spy = jest.spyOn(directive, "applyOptionsDefault");
      directive.componentSubscribe = of(true).subscribe();

      const changes = {
        contentType: new SimpleChange([], "contentType", false),
      };

      // act
      directive.ngOnChanges(changes);

      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("ngOnDestroy", () => {
    it("when componentSubscribe have value", () => {
      // arrange
      const spy = jest.spyOn(directive, "destroyTooltip");
      directive.componentSubscribe = of(true).subscribe();

      // act
      directive.ngOnDestroy();

      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("when componentSubscribe have value", () => {
      // arrange
      const spy = jest.spyOn(directive, "destroyTooltip");
      directive.componentSubscribe = undefined;

      // act
      directive.ngOnDestroy();

      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("getShowDelay", () => {
    it("should return value", () => {
      // arrange
      directive.options = <TooltipOptions>{
        showDelay: 0,
      };

      // act
      const act = directive.getShowDelay();

      // assert
      expect(act).toEqual(0);
    });
  });

  describe("getHideDelay", () => {
    it("should return value when isTouchScreen true", () => {
      // arrange
      directive.options = <TooltipOptions>{
        hideDelayTouchscreen: 0,
      };

      jest.spyOn(directive, "isTouchScreen", "get").mockReturnValueOnce(true);

      // act
      const act = directive.getHideDelay();

      // assert
      expect(act).toEqual(0);
    });

    it("should return value isTouchScreen false", () => {
      // arrange
      directive.options = <TooltipOptions>{
        hideDelay: 300,
      };

      jest.spyOn(directive, "isTouchScreen", "get").mockReturnValueOnce(false);

      // act
      const act = directive.getHideDelay();

      // assert
      expect(act).toEqual(300);
    });
  });

  describe("hideTooltip", () => {
    it("should return when componentRef have value and isTooltipDestroyed true", () => {
      // arrange
      directive.componentRef = {};
      jest.spyOn(directive, "isTooltipDestroyed", "get").mockReturnValueOnce(true);
      const spy = jest.spyOn(directive.events, "emit");
      // act
      const act = directive.hideTooltip();
      // assert
      expect(act).toBeUndefined();
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe("clearTimeouts", () => {
    it("should clear createTimeoutId", () => {
      // arrange
      directive.createTimeoutId = 100;
      const spy = jest.spyOn(window, "clearTimeout");
      // act
      directive.clearTimeouts();

      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("should clear showTimeoutId", () => {
      // arrange
      directive.showTimeoutId = 100;
      const spy = jest.spyOn(window, "clearTimeout");
      // act
      directive.clearTimeouts();

      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("should clear hideTimeoutId", () => {
      // arrange
      directive.hideTimeoutId = 100;
      const spy = jest.spyOn(window, "clearTimeout");
      // act
      directive.clearTimeouts();

      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("should clear destroyTimeoutId", () => {
      // arrange
      directive.destroyTimeoutId = 100;
      const spy = jest.spyOn(window, "clearTimeout");
      // act
      directive.clearTimeouts();

      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("isDisplayOnHover", () => {
    it("should get false when option display equal false", () => {
      // arrange
      directive.options.display = false;

      // act
      const act = directive.isDisplayOnHover;

      // assert
      expect(act).toEqual(false);
    });

    it("should get false when option displayTouchscreen equal false and isTouchScreen equal true", () => {
      // arrange
      directive.options.displayTouchscreen = false;
      jest.spyOn(directive, "isTouchScreen", "get").mockReturnValue(true);

      // act
      const act = directive.isDisplayOnHover;

      // assert
      expect(act).toEqual(false);
    });

    it("should get false when option trigger equal 'hover'", () => {
      // arrange
      directive.options.trigger = "click";

      // act
      const act = directive.isDisplayOnHover;

      // assert
      expect(act).toEqual(false);
    });

    it("should alway return true when not pass any if case before it", () => {
      // arrange
      directive.options.trigger = "hover";

      // act
      const act = directive.isDisplayOnHover;

      // assert
      expect(act).toEqual(true);
    });
  });

  describe("isDisplayOnClick", () => {
    it("should get false when option display equal false", () => {
      // arrange
      directive.options.display = false;

      // act
      const act = directive.isDisplayOnClick;

      // assert
      expect(act).toEqual(false);
    });

    it("should get false when option displayTouchscreen equal false and isTouchScreen equal true", () => {
      // arrange
      directive.options.displayTouchscreen = false;
      jest.spyOn(directive, "isTouchScreen", "get").mockReturnValue(true);

      // act
      const act = directive.isDisplayOnClick;

      // assert
      expect(act).toEqual(false);
    });

    it("should get false when option trigger equal 'click'", () => {
      // arrange
      directive.options.trigger = "hover";

      // act
      const act = directive.isDisplayOnClick;

      // assert
      expect(act).toEqual(false);
    });

    it("should alway return true when not pass any if case before it", () => {
      // arrange
      directive.options.trigger = "click";

      // act
      const act = directive.isDisplayOnClick;

      // assert
      expect(act).toEqual(true);
    });
  });

  // TODO
  describe("isTouchScreen", () => {
    it("should return true when 'ontouchstart' in window", () => {
      // arrange
      window.addEventListener("touchstart", () => {}, true);

      // act
      // assert
    });
  });

  describe("get isTouchScreen", () => {
    it("TO DO", () => {
      // arrange

      // act
      directive.isTouchScreen;
      // assert
    });
  });

  describe("applyOptionsDefault", () => {
    it("should set options when call", () => {
      // arrange
      const defaultOptions = { contentType: "html" };
      const options = { placement: "left" };
      directive.options = {
        placement: "top",
        contentType: "string",
        zIndex: 99,
      };
      const expected = {
        ...defaultOptions,
        ...directive.options,
        ...options,
      };

      // act
      directive.applyOptionsDefault(defaultOptions, options);
      const act = directive.options;

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe("handleEvents", () => {
    it("should emit event when event have type 'shown'", () => {
      // arrange
      const spy = jest.spyOn(directive.events, "emit");
      const expectedCall = {
        type: "shown",
        position: directive.tooltipPosition,
      };

      // act
      directive.handleEvents({ type: "shown" });

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expectedCall);
    });

    it("should not do any thing when have type not 'shown'", () => {
      // arrange
      const spy = jest.spyOn(directive.events, "emit");

      // act
      directive.handleEvents({ type: "" });

      // assert
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe("show", () => {
    it("should return undefine when tooltipValue empty", () => {
      // arrange
      directive.tooltipValue = "";

      // act
      const act = directive.show();

      // assert
      expect(act).toBeUndefined();
    });

    it("should call createTooltip when isTooltipDestroyed true", () => {
      // arrange
      directive.tooltipValue = "222";
      jest.spyOn(directive, "isTooltipDestroyed", "get").mockReturnValueOnce(true);
      const createTooltipSpy = jest.spyOn(directive, "createTooltip").mockImplementation(() => {});

      // act
      directive.show();

      // assert
      expect(createTooltipSpy).toHaveBeenCalled();
    });

    it("should call showTooltipElem when isTooltipDestroyed false", () => {
      // arrange
      directive.tooltipValue = "222";
      jest.spyOn(directive, "isTooltipDestroyed", "get").mockReturnValueOnce(false);
      jest.spyOn(directive, "isTooltipDestroyed", "get").mockReturnValueOnce(false);
      directive.componentRef = null;
      const createTooltipSpy = jest.spyOn(directive, "showTooltipElem").mockImplementation(() => {});
      directive.componentRef = {};

      // act
      directive.show();

      // assert
      expect(createTooltipSpy).toHaveBeenCalled();
    });
  });

  describe("hide", () => {
    it("should call destroyTooltip", () => {
      // arrange
      const spy = jest.spyOn(directive, "destroyTooltip");

      // act
      directive.hide();

      // assert
      expect(spy).toHaveBeenCalled();
    });
  });
});
