import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA, ViewContainerRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { SwitchesModule } from "../../components/switches/switches.module";
import { DynamicCreateComponentDirective } from "./dynamic-create-component.directive";

describe("DynamicCreateComponentDirective", () => {
  let directive: DynamicCreateComponentDirective;
  let viewContainerRef: ViewContainerRef;

  class ViewContainerRefMock {
    public clear = jest.fn();
    public createComponent = jest.fn();
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DynamicCreateComponentDirective],
      providers: [{ provide: ViewContainerRef, useClass: ViewContainerRefMock }],
      imports: [SwitchesModule, CommonModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    viewContainerRef = TestBed.inject(ViewContainerRef);

    directive = new DynamicCreateComponentDirective(viewContainerRef);
  });

  it("should create an instance", () => {
    expect(directive).toBeTruthy();
  });

  describe("ngOnDestroy", () => {
    it("should complete onDestroy$", () => {
      //arrange
      const spy1 = jest.spyOn(directive.unSubscribe, "next");
      const spy2 = jest.spyOn(directive.unSubscribe, "complete");

      //act
      directive.ngOnDestroy();

      //assert
      expect(spy1).toBeCalledTimes(1);
      expect(spy2).toBeCalledTimes(1);
    });
  });
});
