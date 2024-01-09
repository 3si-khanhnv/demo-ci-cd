import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LocationInventorySafeRecyclerComponent } from "./location-inventory-safe-recycler.component";
import { IDataChartSafeRecycler, ILabelColor, ILocationSafeRecycler } from "./location-inventory-safe-recycler.i";
import { LocationInventorySafeRecyclerModule } from "./location-inventory-safe-recycler.module";
import { TranslateModule } from "@ngx-translate/core";

describe("LocationInventoryComponent", () => {
  let component: LocationInventorySafeRecyclerComponent;
  let fixture: ComponentFixture<LocationInventorySafeRecyclerComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [LocationInventorySafeRecyclerModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInventorySafeRecyclerComponent);
    component = fixture.componentInstance;
    component.data = {
      dataChart: [
        {
          locationName: "Cambridge",
          recyclerValue: 5000,
          safeValue: 6000,
        },
        {
          locationName: "Milton Keynes",
          recyclerValue: 3500,
          safeValue: 4900,
        },
        {
          locationName: "Reading",
          recyclerValue: 7000,
          safeValue: 3000,
        },
        {
          locationName: "Bedford",
          recyclerValue: 7700,
          safeValue: 5100,
        },
        {
          locationName: "Coventry",
          recyclerValue: 8000,
          safeValue: 7500,
        },
        {
          locationName: "Dunstable",
          recyclerValue: 4600,
          safeValue: 14000,
        },
        {
          locationName: "Oxford",
          recyclerValue: 4600,
          safeValue: 16000,
        },
        {
          locationName: "BasingstokeBasingstokeBasingstoke",
          recyclerValue: 12500,
          safeValue: 9800,
        },
        {
          locationName: "Luton",
          recyclerValue: 4900,
          safeValue: 17500,
        },
        {
          locationName: "Harpenden",
          recyclerValue: 12500,
          safeValue: 17500,
        },
      ] as IDataChartSafeRecycler[],
      labels: [
        {
          label: "Recycler",
          bgColor: "#FF9100",
        },
        { label: "Safe", bgColor: "#0088FF" },
      ] as ILabelColor[],
    } as ILocationSafeRecycler;
    component.titleChart = "Top Location Removals (Week to Date)";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Case test data chart", () => {
    it("should call test data", () => {
      component.chartOptions = {
        aspectRatio: 1.33,
      };
      expect(component._chartOptions).toEqual({
        ...component._chartOptions,
        aspectRatio: 1.33,
      });
    });
    it("should call set chartOptions", () => {
      component.chartOptions = {
        layout: {
          padding: 20,
        },
      };

      expect(component._chartOptions).toEqual({
        ...component._chartOptions,
        layout: {
          padding: 20,
        },
      });
    });
    it("should call set afterDraw", () => {
      const jestCallTime = jest.fn();
      const chart = {
        scales: {
          r: {
            angleLines: { color: "#b4b9c736", lineWidth: 1 },
            grid: { color: "#B4B9C7", z: 1 },
            pointLabels: { color: "#101624", font: { family: "Roboto", size: 14 } },
            ticks: [
              {
                value: 40,
                label: "40",
              },
              {
                value: 50,
                label: "50",
              },
            ],
            textAlign: "center",
            font: "12px",
            getIndexAngle: () => {},
            ctx: {
              save: jestCallTime,
              beginPath: jestCallTime,
              fillText: jestCallTime,
              fill: jestCallTime,
              restore: jestCallTime,
            },
            _pointLabels: ["40", "50"],
            getPointPositionForValue: () => ({
              x: 10,
              y: 10,
            }),
          },
        },
      };
      component.afterDraw(chart);
      expect(jestCallTime).toBeCalledTimes(5);
    });
  });
});
