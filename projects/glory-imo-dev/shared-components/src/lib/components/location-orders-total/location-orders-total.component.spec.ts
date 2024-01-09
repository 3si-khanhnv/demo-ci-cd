import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LocationOrdersTotalComponent } from "./location-orders-total.component";
import { ILabelColor } from "./location-orders-total.i";
import { TranslateModule } from "@ngx-translate/core";

describe("LocationOrdersTotalComponent", () => {
  let component: LocationOrdersTotalComponent;
  let fixture: ComponentFixture<LocationOrdersTotalComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [LocationOrdersTotalComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationOrdersTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Case test data chart", () => {
    beforeEach(() => {
      jest.spyOn(document, "createElementNS").mockReturnValue({
        getBBox: () =>
          ({
            x: 100,
            y: 100,
            width: 500,
            height: 300,
          } as any),
        setAttributeNS: () => jest.fn(),
        appendChild: () => jest.fn(),
        style: {
          transform: "",
        },
      } as any);
    });
    it("should call test data", () => {
      const expected = {
        colors: ["#FFC73D", "#F6494A", "#80DCF4", "#469AD9", "#83B3B1"],
        series: [
          {
            data: [
              { x: "HarpendenHarpendenHarpendenHarpendenHarpenden", y: 21746 },
              { x: "Luton", y: 14888 },
              { x: "Basingstoke", y: 14038 },
              { x: "Oxford", y: 13664 },
              { x: "Dunstable", y: 12722 },
            ],
          },
        ],
      };
      component.data = [
        {
          label: "HarpendenHarpendenHarpendenHarpendenHarpenden",
          bgColor: "#FFC73D",
          current: "21,746",
          value: 21746,
        },
        {
          label: "Luton",
          bgColor: "#F6494A",
          current: "14,888",
          value: 14888,
        },
        {
          label: "Basingstoke",
          bgColor: "#80DCF4",
          current: "14,038",
          value: 14038,
        },
        {
          label: "Oxford",
          bgColor: "#469AD9",
          current: "21,746",
          value: 13664,
        },
        {
          label: "Dunstable",
          bgColor: "#83B3B1",
          current: "12,722",
          value: 12722,
        },
      ];
      expect(component.colors).toEqual(expected.colors);
      expect(component.series).toEqual(expected.series);
    });
    it("should call animationEnd ", () => {
      jest.useFakeTimers();
      jest.spyOn(global, "setTimeout");
      const chartContext = {
        el: {
          querySelector: jest.fn(() => ({
            appendChild: () => jest.fn(),
          })),
          querySelectorAll: jest.fn(() => [
            {
              getAttribute: () => "100",
              appendChild: () => jest.fn(),
              getBBox: () => ({
                x: 100,
                y: 100,
                width: 120,
                height: 300,
              }),
              after: () => jest.fn(),
            },
            {
              getAttribute: () => "100",
              appendChild: () => jest.fn(),
              getBBox: () => ({
                x: 10000,
                y: 10000,
                width: 1200,
                height: 3000,
              }),
              after: () => jest.fn(),
            },
            {
              getAttribute: () => "100",
              appendChild: () => jest.fn(),
              getBBox: () => ({
                x: 10000,
                y: 10000,
                width: 1,
                height: 1,
              }),
              after: () => jest.fn(),
            },
          ]),
        },
        data: {
          twoDSeriesX: ["HarpendenHarpendenHarpendenHarpendenHarpenden", undefined, "Basingstoke", "Oxford", "Dunstable"],
          twoDSeries: [12, 2],
        },
      };
      component.animationEnd(chartContext);
      jest.runAllTimers();
      expect(chartContext.el.querySelectorAll).toHaveBeenCalled();
    });

    it("should call handleFormatLabels return value", () => {
      component.dataLocationOrdersWeekToDate = [
        {
          value: 40,
          label: "Oxford",
          current: "40",
          bgColor: "#E02C33",
        },
        {
          value: 60,
          label: "Dunstable",
          current: "60",
          bgColor: "#5C6061",
          textColor: "black",
          textSize: "18px",
        },
      ] as ILabelColor[];

      const result = component.handleFormatLabels(40);
      expect(result).toEqual("40");
    });
    it("should call handleFormatLabels return empty", () => {
      component.dataLocationOrdersWeekToDate = [
        {
          value: 40,
          label: "Oxford",
          current: "40",
          bgColor: "#E02C33",
        },
      ] as ILabelColor[];

      const result = component.handleFormatLabels(60);
      expect(result).toEqual("");
    });
  });
});
