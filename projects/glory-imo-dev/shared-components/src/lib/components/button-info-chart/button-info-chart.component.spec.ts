import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonInfoChartComponent } from "./button-info-chart.component";
import { ButtonInfoChartModule } from "./button-info-chart.module";
import { TranslateModule } from "@ngx-translate/core";
import { formatCurrencyToString } from "../../utilities/common";

describe("ButtonInfoChartComponent", () => {
  let component: ButtonInfoChartComponent;
  let fixture: ComponentFixture<ButtonInfoChartComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ButtonInfoChartModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonInfoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Test ButtonInfoChart functions", () => {
    it("should be set input currencyCode not totalValues", () => {
      component.isActive = true;
      component.type = "asset-map";
      component.currencyCode = "USD";
      fixture.detectChanges();
      expect(component._value).toBe(component.handleFormatDecimalCurrency(component._value, "USD"));
    });
    it("should be set input currencyCode have totalValues", () => {
      component.isActive = true;
      component.type = "asset-map";
      component.currencyCode = "USD";
      component.totalValues = [
        {
          totalValueLabel: "Removals Total Value (USD)",
          totalValueNumber: "757,046.60",
          currencyCode: "USD",
        },
        {
          totalValueLabel: "Removals Total Value (GBP)",
          totalValueNumber: "757,046.60",
          currencyCode: "GBP",
        },

        {
          totalValueLabel: "Removals Total Value (VND)",
          totalValueNumber: "757,046.60",
          currencyCode: "VND",
        },
      ];
      fixture.detectChanges();
      expect(component._value).toBe(component.handleFormatDecimalCurrency("757,046.60", "USD"));
    });
    it("should be set input currencyCode not include totalValues", () => {
      component.isActive = true;
      component.type = "asset-map";
      component.currencyCode = "TTT";
      component.totalValues = [
        {
          totalValueLabel: "Removals Total Value (USD)",
          totalValueNumber: "757,046.60",
          currencyCode: "USD",
        },
        {
          totalValueLabel: "Removals Total Value (GBP)",
          totalValueNumber: "757,046.60",
          currencyCode: "GBP",
        },

        {
          totalValueLabel: "Removals Total Value (VND)",
          totalValueNumber: "757,046.60",
          currencyCode: "VND",
        },
      ];
      fixture.detectChanges();
      expect(component._value).toBe(component.handleFormatDecimalCurrency(formatCurrencyToString(0, component.currencyCode), "TTT"));
    });
    it("should be set input currencyCode is null and have totalValues", () => {
      component.isActive = true;
      component.type = "asset-map";
      component.currencyCode = null;
      component.totalValues = [
        {
          totalValueLabel: "Removals Total Value (USD)",
          totalValueNumber: "757,046.60",
          currencyCode: "USD",
        },
        {
          totalValueLabel: "Removals Total Value (GBP)",
          totalValueNumber: "757,046.60",
          currencyCode: "GBP",
        },

        {
          totalValueLabel: "Removals Total Value (VND)",
          totalValueNumber: "757,046.60",
          currencyCode: "VND",
        },
      ];
      fixture.detectChanges();
      expect(component._value).toBe(component.handleFormatDecimalCurrency("757,046.60", "USD"));
    });
    it("should be set input currencyCode have _totalValues", () => {
      component.isActive = true;
      component.type = "asset-map";
      component.totalValues = [
        {
          totalValueLabel: "Removals Total Value (USD)",
          totalValueNumber: "757,046.60",
          currencyCode: "USD",
        },
        {
          totalValueLabel: "Removals Total Value (GBP)",
          totalValueNumber: "757,046.60",
          currencyCode: "GBP",
        },

        {
          totalValueLabel: "Removals Total Value (VND)",
          totalValueNumber: "757,046.60",
          currencyCode: "VND",
        },
      ];
      component.currencyCode = "USD";

      fixture.detectChanges();
      expect(component._value).toBe(component.handleFormatDecimalCurrency("757,046.60", "USD"));
    });
    it("should be set input currencyCode not include have _totalValues", () => {
      component.isActive = true;
      component.value = "true";
      component.valueToolTip = "true";
      component.type = "asset-map";
      component.totalValues = [
        {
          totalValueLabel: "Removals Total Value (USD)",
          totalValueNumber: "757,046.60",
          currencyCode: "USD",
        },
        {
          totalValueLabel: "Removals Total Value (GBP)",
          totalValueNumber: "757,046.60",
          currencyCode: "GBP",
        },

        {
          totalValueLabel: "Removals Total Value (VND)",
          totalValueNumber: "757,046.60",
          currencyCode: "VND",
        },
      ];
      component.currencyCode = "USD";

      fixture.detectChanges();
      expect(component._value).toBe(component.handleFormatDecimalCurrency(formatCurrencyToString(757046.6, component.currencyCode), "USD"));
    });
    it("should call click and emit the action", (done) => {
      component.isActive = true;
      component.type = "asset-map";
      component.currencyCode = "USD";
      const event: any = {
        type: "asset-map",
        key: "",
        currencyCode: "USD",
        active: true,
      };
      component.clicked.subscribe({
        next: (actual) => {
          expect(actual).toEqual(event);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });

      component.handleClick();
    });
    it("should changes isActive is true", () => {
      const changes: any = {
        isActive: {
          currentValue: true,
        },
      };
      component.ngOnChanges(changes);
      expect(component.classes).toEqual(["is-active"]);
    });
    it("should changes isActive is false", () => {
      const changes: any = {
        isActive: {
          currentValue: false,
        },
      };
      component.ngOnChanges(changes);
      expect(component.classes).toEqual(["default"]);
    });
    it("should changes currencyCode is change", () => {
      const changes: any = {
        currencyCode: {
          currentValue: "USD",
        },
      };
      component._totalValues = [
        {
          totalValueLabel: "Removals Total Value (USD)",
          totalValueNumber: "757,046.60",
          currencyCode: "USD",
        },
        {
          totalValueLabel: "Removals Total Value (GBP)",
          totalValueNumber: "757,046.60",
          currencyCode: "GBP",
        },

        {
          totalValueLabel: "Removals Total Value (VND)",
          totalValueNumber: "757,046.60",
          currencyCode: "VND",
        },
      ];
      component.ngOnChanges(changes);
      expect(component._currencyQuantity).toBe(4);
    });
    it("should changes totalValues is change", () => {
      const changes: any = {
        totalValues: {
          currentValue: [
            {
              totalValueLabel: "Removals Total Value (USD)",
              totalValueNumber: "757,046.60",
              currencyCode: "USD",
            },
            {
              totalValueLabel: "Removals Total Value (GBP)",
              totalValueNumber: "757,046.60",
              currencyCode: "GBP",
            },

            {
              totalValueLabel: "Removals Total Value (VND)",
              totalValueNumber: "757,046.60",
              currencyCode: "VND",
            },
          ],
        },
      };
      component._totalValues = [
        {
          totalValueLabel: "Removals Total Value (USD)",
          totalValueNumber: "757,046.60",
          currencyCode: "USD",
        },
        {
          totalValueLabel: "Removals Total Value (GBP)",
          totalValueNumber: "757,046.60",
          currencyCode: "GBP",
        },

        {
          totalValueLabel: "Removals Total Value (VND)",
          totalValueNumber: "757,046.60",
          currencyCode: "VND",
        },
      ];
      component._currencyCode = "USD";
      component.ngOnChanges(changes);
      expect(component._currencyQuantity).toBe(3);
    });
  });
});
