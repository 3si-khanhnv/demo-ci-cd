import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { ChartRateComponent } from "./chart-rate.component";
import { ChartRateModule } from "./chart-rate.module";

describe("ChartRateComponent", () => {
  let component: ChartRateComponent;
  let fixture: ComponentFixture<ChartRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartRateModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("onPieSliceSelect", () => {
    it("should call", () => {
      const filteredComponent = fixture.debugElement.query(By.css("ngx-charts-pie-chart"));
      const spy = jest.spyOn(component, "onPieSliceSelect");
      filteredComponent.triggerEventHandler("select", "EOD");
      fixture.detectChanges();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });
});
