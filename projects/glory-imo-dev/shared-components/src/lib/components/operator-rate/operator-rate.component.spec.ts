import { NO_ERRORS_SCHEMA } from "@angular/compiler";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { OperatorRateComponent } from "./operator-rate.component";
import { OperatorRateModule } from "./operator-rate.module";
import { TranslateModule } from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("OperatorRateComponent", () => {
  let component: OperatorRateComponent;
  let fixture: ComponentFixture<OperatorRateComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [OperatorRateModule, TranslateModule.forRoot(), BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("On changed Output", () => {
    expect(component).toBeTruthy();
  });

  describe("handleHighlightErrors", () => {
    it("should emit 1 emitHighlightErrors with true event", (done) => {
      component.emitHighlightErrors.subscribe({
        next: (value) => {
          expect(value).toEqual(true);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.handleHighlightErrors(true);
    });

    it("should emit 1 emitHighlightErrors with false event", (done) => {
      component.emitHighlightErrors.subscribe({
        next: (value) => {
          expect(value).toEqual(false);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.handleHighlightErrors(false);
    });
  });

  describe("Click on chart emit value", () => {
    it("click on the operator-rate info emit the value", () => {
      const filteredComponent = fixture.debugElement.query(By.css(".imo-chart"));
      const spy = jest.spyOn(component, "selectItemInfo");
      filteredComponent.triggerEventHandler("emitItem", {
        name: "Error",
        type: "errorStatus",
        value: "7 <small class='item-text'>Stores</small>",
      });
      fixture.detectChanges();
      // assert
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({
        name: "Error",
        type: "errorStatus",
        value: "7 <small class='item-text'>Stores</small>",
      });
    });
    it("click on the operator-rate info emit the null", () => {
      const filteredComponent = fixture.debugElement.query(By.css(".imo-chart"));
      const spy = jest.spyOn(component, "selectItemInfo");
      filteredComponent.triggerEventHandler("emitItem", "EOD");
      fixture.detectChanges();
      // assert
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith("EOD");
    });
  });

  describe("onTabChanged", () => {
    it("onTabChanged has emit value", () => {
      const sy = jest.spyOn(component.emitTabIndex, "emit");
      fixture.detectChanges();
      component.onTabChanged({ index: 1 });
      expect(sy).toHaveBeenCalledWith(1);
    });
  });

  describe("selectLocation", () => {
    it("selectLocation has emit value", () => {
      const sy = jest.spyOn(component.emitLocation, "emit");
      fixture.detectChanges();
      component.selectLocation({ value: "0001", label: "ddd" }, { value: "0001", label: "ddd" });
      expect(sy).toHaveBeenCalledWith({ companyName: "0001", locationName: "0001" });
    });
  });
});
