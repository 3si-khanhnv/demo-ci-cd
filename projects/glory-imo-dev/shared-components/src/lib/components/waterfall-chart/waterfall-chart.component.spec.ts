import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WaterFallChartComponent } from "./waterfall-chart.component";
import { WaterFallChartModule } from "./waterfall-chart.module";
import { TranslateModule } from "@ngx-translate/core";
import { ElementRef } from "@angular/core";
import { DEFAULT_OPTION_CHART } from "./waterfall-chart.constant";

jest.mock("../../../../../../../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js", () => ({
  __esModule: false,
}));

jest.mock("patternomaly", function () {
  return {
    draw: jest.fn(() => "draw"),
  };
});
describe("WaterFallChartComponent", () => {
  let component: WaterFallChartComponent;
  let fixture: ComponentFixture<WaterFallChartComponent>;

  const mockElementRef: any = {
    nativeElement: {
      offsetWidth: 100,
      setAttributeNS: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [WaterFallChartModule, TranslateModule.forRoot()],
      providers: [{ provide: ElementRef, useValue: mockElementRef }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterFallChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("should call set data", () => {
    it("Check data chart", () => {
      component.data = [
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Deposit Total",
          total: ["0", "-33550"],
          color: ["#F98902"],
          details: [],
        },
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Dispense Total",
          total: ["33550", "32600"],
          color: ["#00A687"],
          details: [],
        },
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Change",
          total: ["0", "32600"],
          color: ["#EC3F2E"],
          details: [],
        },
      ];

      const currents = [-33550, 66150, 32600];

      const expected = {
        datasets: [
          {
            backgroundColor: ["#F98902", "#00A687", "#EC3F2E"],
            hoverBackgroundColor: ["#F98902", "#00A687", "#EC3F2E"],
            data: [
              ["0", "-33550"],
              ["33550", "32600"],
              ["0", "32600"],
            ],
            barPercentage: 0.8,
            barThickness: 80,
            categoryPercentage: 0.8,
          },
        ],
        labels: [["Deposit", "Total"], ["Dispense", "Total"], "Change"],
      };
      expect(component._data).toEqual(expected);
      expect(component.currents).toEqual(currents);
    });

    it("should call onHover chart", () => {
      const spy = jest.spyOn(component.emitDataClick, "emit");

      const dataInput: any = {
        e: {},
        elements: [],
        chart: {
          canvas: {
            style: {
              cursor: "default",
            },
          },
        },
      };
      const mockData = {
        index: 0,
        item: {
          label: "Harpenden",
          bgColor: "#469AD9",
          current: "0",
          value: 0,
        },
      };

      //act

      component.chartOptions.onHover(dataInput.e, dataInput.elements, dataInput.chart);

      //assert
      expect(spy).not.toHaveBeenCalledWith(mockData);
    });

    it("should call onHover chart (pointer)", () => {
      const spy = jest.spyOn(component.emitDataClick, "emit");

      const dataInput: any = {
        e: {},
        elements: [{}],
        chart: {
          canvas: {
            style: {
              cursor: "pointer",
            },
          },
        },
      };
      const mockData = {
        index: 0,
        item: {
          label: "Harpenden",
          bgColor: "#469AD9",
          current: "0",
          value: 0,
        },
      };

      //act

      component.chartOptions.onHover(dataInput.e, dataInput.elements, dataInput.chart);

      //assert
      expect(spy).not.toHaveBeenCalledWith(mockData);
    });

    it("should call onClick chart", () => {
      const spy = jest.spyOn(component.emitDataClick, "emit");

      const dataInput: any = {
        e: {},
        elements: [{ index: 1 }],
        chart: {
          canvas: {
            style: {
              cursor: "default",
            },
          },
        },
      };

      component.tempData = [
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Deposit Total",
          total: ["0", "33550"],
          color: ["#F98902"],
          details: [],
        },
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Dispense Total",
          total: ["33550", "32600"],
          color: ["#00A687"],
          details: [
            {
              title: "Munich Hotel - Sales Per Device (Current)",
              label: "Dispense Total",
              total: ["33550", "32600"],
              color: ["#00A687"],
            },
          ],
        },
      ];

      //act

      component.chartOptions.onClick(dataInput.e, dataInput.elements, dataInput.chart);
      const expected = {
        item: {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Dispense Total",
          total: ["33550", "32600"],
          color: ["#00A687"],
          details: [
            {
              title: "Munich Hotel - Sales Per Device (Current)",
              label: "Dispense Total",
              total: ["33550", "32600"],
              color: ["#00A687"],
            },
          ],
        },
        index: 1,
      };
      //assert
      expect(spy).toHaveBeenCalledWith(expected);
    });

    it("Check data chart negative", () => {
      component.data = [
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Deposit Total",
          total: ["0", "33550"],
          color: ["#F98902"],
          details: [],
        },
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Dispense Total",
          total: ["33550", "-32600"],
          color: ["#00A687"],
          details: [],
        },
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Change",
          total: ["0", "32600"],
          color: ["#EC3F2E"],
          details: [],
        },
      ];

      const currents = [33550, -66150, 32600];

      expect(component.currents).toEqual(currents);
    });
  });

  describe("should call handleFormatLabels function", () => {
    it("should find item equal value", () => {
      const context = {
        dataIndex: 0,
      };
      component.currencyCode = "USD";
      component.currents = [33550, -950, 32600];
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(undefined, context as any)).toEqual("33,550.00");
    });

    it("should find item equal value (...)", () => {
      const context = {
        dataIndex: 0,
      };

      component.currencyCode = "USD";
      component.currents = [335500, -950, 32600];
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(undefined, context as any)).toEqual("335,500.00");
    });

    it("should find item equal value (,)", () => {
      const context = {
        dataIndex: 0,
      };

      component.currencyCode = "USD";
      component.currents = [3355000, -950, 32600];
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(undefined, context as any)).toEqual("3,355,000.00");
    });

    it("should find item equal value undefined", () => {
      const context = {
        dataIndex: 3,
      };

      component.currencyCode = "USD";
      component.currents = [3355000, -950, 32600];
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(undefined, context as any)).toEqual("0.00");
    });
  });

  describe("should call handelAnchorAlign function", () => {
    it("should find item equal value end", () => {
      const context = {
        dataIndex: 0,
      };
      component.currents = [10, -10];

      expect(component.handelAnchorAlign(context as any)).toEqual("end");
    });

    it("should find item equal value start", () => {
      const context = {
        dataIndex: 1,
      };
      component.currents = [10, -10];
      expect(component.handelAnchorAlign(context as any)).toEqual("start");
    });
  });

  describe("should call clickDataLabel function", () => {
    it("should find item equal value", () => {
      const context = {
        dataIndex: 1,
      };

      component.tempData = [
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Deposit Total",
          total: ["0", "33550"],
          color: ["#F98902"],
          details: [],
        },
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Dispense Total",
          total: ["33550", "32600"],
          color: ["#00A687"],
          details: [
            {
              title: "Munich Hotel - Sales Per Device (Current)",
              label: "Dispense Total",
              total: ["33550", "32600"],
              color: ["#00A687"],
            },
          ],
        },
      ];

      const expected = {
        item: {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Dispense Total",
          total: ["33550", "32600"],
          color: ["#00A687"],
          details: [
            {
              title: "Munich Hotel - Sales Per Device (Current)",
              label: "Dispense Total",
              total: ["33550", "32600"],
              color: ["#00A687"],
            },
          ],
        },
        index: 1,
      };
      const spy = jest.spyOn(component.emitDataClick, "emit");

      component.clickDataLabel(context as any);

      component.emitDataClick.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
        },
      });

      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe("should call drawLine function", () => {
    it("should find drawLine", () => {
      const chart = {
        chartArea: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
        ctx: {
          drawImage: jest.fn(),
          font: "500 20px Roboto",
          color: "#3B475F",
          fillText: jest.fn(),
          save: jest.fn(),
          restore: jest.fn(),
          fillRect: jest.fn(),
        },
        getDatasetMeta() {
          return {
            data: [
              {
                x: 1,
                y: 2,
                height: 3,
              },
              {
                x: 2,
                y: 2,
                height: 4,
              },
              {
                x: 2,
                y: 6,
                height: 4,
              },
              {
                x: 2,
                y: 5,
                height: 4,
              },
            ],
          };
        },
      };
      component.currents = [10, -10];
      component.drawLine(chart);

      expect(chart.ctx.fillRect).toBeCalledTimes(3);
      expect(chart.ctx.fillRect).toHaveBeenLastCalledWith(2, 9, 0, 0.1);
    });
  });

  describe("ngAfterViewInit", () => {
    beforeEach(() => {});

    it("should subscribe notifierChartWidth to resize chart width", () => {
      // arrange
      const spy = jest.spyOn(component.chart.chart, "resize");
      const spySetAttributeNS = jest.spyOn(component.canvasContainer.nativeElement, "setAttributeNS");
      // act
      component.ngAfterViewInit();
      component.notifierChartWidth.next(1000);
      // assert
      expect(spy).toHaveBeenCalled();
      expect(spySetAttributeNS).toHaveBeenCalled();
    });
  });

  describe("setWidthChart", () => {
    it("setWidthChart t when label has width more than width barThickness", () => {
      const spy = jest.spyOn(component, "getWidthText");
      HTMLCanvasElement.prototype.getContext = jest.fn(() => {
        return {
          font: "",
          measureText: jest.fn(() => {
            return {
              width: 200,
            };
          }),
        } as any;
      });
      component.data = [
        {
          id: "top-face-value-1-l-1-s-1",
          title: "Manukau - Sales Summary By Category Per Location (Last 30 Days)",
          label: "Deposit Total",
          chartType: "barHorizontal",
          total: ["0", "94562.79999999994"],
          color: ["#004D6E"],
          details: [
            {
              label: "CI50 #20575",
              total: ["94,562.80"],
              color: ["#004D6E"],
            },
          ],
          bgColor: "#004D6E",
          value: 0,
          current: "0",
        },
        {
          id: "top-face-value-1-l-1-s-2",
          title: "Manukau - Sales Summary By Category Per Location (Last 30 Days)",
          label: "Dispense Total",
          chartType: "barHorizontal",
          total: ["94562.79999999994", "14400"],
          color: ["#375587"],
          details: [
            {
              label: "CI50 #20575",
              total: ["14,400.00"],
              color: ["#375587"],
            },
          ],
          bgColor: "#375587",
          value: 94562.79999999994,
          current: "94562.79999999994",
        },
        {
          id: "top-face-value-1-l-1-s-3",
          title: "Manukau - Sales Summary By Category Per Location (Last 30 Days)",
          label: "Change",
          chartType: "barHorizontal",
          total: ["14400", "1"],
          color: ["#6E5794"],
          alert: "No data available for Change",
          details: [],
          bgColor: "#6E5794",
          value: 14400,
          current: "14400",
        },
        {
          id: "top-face-value-1-l-1-s-4",
          title: "Manukau - Sales Summary By Category Per Location (Last 30 Days)",
          label: "Manual",
          chartType: "barHorizontal",
          total: ["1", "0"],
          color: ["#9E5593"],
          alert: "No data available for Manual",
          details: [],
          bgColor: "#9E5593",
          value: 0,
          current: "0",
        },
        {
          id: "top-face-value-1-l-1-s-5",
          title: "Manukau - Sales Summary By Category Per Location (Last 30 Days)",
          label: "Non Cash",
          chartType: "barHorizontal",
          total: ["0", "0"],
          color: ["#C35284"],
          alert: "No data available for Non Cash",
          details: [],
          bgColor: "#C35284",
          value: 0,
          current: "0",
        },
        {
          id: "top-face-value-1-l-1-s-6",
          title: "Manukau - Sales Summary By Category Per Location (Last 30 Days)",
          label: "Total Sales",
          chartType: "barHorizontal",
          total: ["0", "108962.79999999994"],
          color: ["#D95C67"],
          details: [
            {
              label: "CI50 #20575",
              total: ["108,962.80"],
              color: ["#D95C67"],
            },
          ],
          bgColor: "#D95C67",
          value: 0,
          current: "0",
        },
      ] as any;
      // arrange
      const dataInput: any = {
        e: {},
        elements: [],
        chart: {
          canvas: {
            style: {
              cursor: "default",
            },
          },
        },
        options: {
          ...DEFAULT_OPTION_CHART,
          layout: { padding: 20 },
        },
      };
      component.setWidthChart(dataInput);
      expect(spy).toHaveBeenCalled();
    });

    it("setWidthChart when label has width less than width barThickness", () => {
      const spy = jest.spyOn(component, "getWidthText");
      HTMLCanvasElement.prototype.getContext = jest.fn(() => {
        return {
          font: "",
          measureText: jest.fn(() => {
            return {
              width: 50,
            };
          }),
        } as any;
      });
      component.data = [
        {
          id: "top-face-value-1-l-1-s-1",
          title: "Manukau - Sales Summary By Category Per Location (Last 30 Days)",
          label: "Deposit Total",
          chartType: "barHorizontal",
          total: ["0", "1111"],
          color: ["#004D6E"],
          details: [
            {
              label: "CI50 #20575",
              total: ["94,562.80"],
              color: ["#004D6E"],
            },
          ],
          bgColor: "#004D6E",
          value: 0,
          current: "0",
        },
        {
          id: "top-face-value-1-l-1-s-2",
          title: "Manukau - Sales Summary By Category Per Location (Last 30 Days)",
          label: "Dispense Total",
          chartType: "barHorizontal",
          total: ["1111", "14400"],
          color: ["#375587"],
          details: [
            {
              label: "CI50 #20575",
              total: ["14,400.00"],
              color: ["#375587"],
            },
          ],
          bgColor: "#375587",
          value: 94562.79999999994,
          current: "94562.79999999994",
        },
        {
          id: "top-face-value-1-l-1-s-2",
          title: "Manukau - Sales Summary By Category Per Location (Last 30 Days)",
          label: "Dispense Total",
          chartType: "barHorizontal",
          total: ["1111", "14400"],
          color: ["#375587"],
          details: [
            {
              label: "CI50 #20575",
              total: ["14,400.00"],
              color: ["#375587"],
            },
          ],
          bgColor: "#375587",
          value: 94562.79999999994,
          current: "94562.79999999994",
        },
        {
          id: "top-face-value-1-l-1-s-6",
          title: "Manukau - Sales Summary By Category Per Location (Last 30 Days)",
          label: "Total Sales",
          chartType: "barHorizontal",
          total: ["0", "-108962.79999999994"],
          color: ["#D95C67"],
          details: [
            {
              label: "CI50 #20575",
              total: ["108,962.80"],
              color: ["#D95C67"],
            },
          ],
          bgColor: "#D95C67",
          value: 0,
          current: "0",
        },
      ] as any;
      // arrange
      const dataInput: any = {
        e: {},
        elements: [],
        chart: {
          canvas: {
            style: {
              cursor: "default",
            },
          },
        },
        options: {
          ...DEFAULT_OPTION_CHART,
          layout: { padding: 20 },
          plugins: {
            afterRender: expect.any(Function),
          },
        },
      };
      component.pluginChartDataLabels = [
        ...component.pluginChartDataLabels,
        {
          id: "linePlugin",

          afterRender: expect.any(Function),
        },
      ];
      component.setWidthChart(dataInput);
      expect(spy).toHaveBeenCalled();
    });
  });

  it("should call onResize chart", () => {
    component.chartOptions = {
      ...component.chartOptions,
      onResize: jest.fn(),
    };
    const dataInput: any = {
      e: {},
      elements: [],
      chart: {
        canvas: {
          style: {
            cursor: "default",
          },
        },
        data: {
          labels: ["123"],
        },
        options: {
          maintainAspectRatio: true,
          layout: {
            padding: 0,
          },
          onResize: expect.any(Function),
        },
        plugins: {
          afterRender: expect.any(Function),
        },
      },
    };
    component.data = [
      {
        title: "Munich Hotel - Sales Per Device (Current)",
        label: "Munich Hotel Hotel Hotel Hotel",
        total: ["0", "33550"],
        color: ["#00A687", "#00A687"],
        details: [],
      },
      {
        title: "Malaga Hotel - Sales Per Device (Current)",
        label: "Malaga Hotel",
        total: ["33550", "32600"],
        color: ["#00A687", "#00A687"],
        details: [],
      },
    ];
    component.pluginChartDataLabels = [...component.pluginChartDataLabels];
    //act
    component.chartOptions.onResize(dataInput.chart, { width: 200, height: 200 });
    //assert
    expect(dataInput.chart.options.maintainAspectRatio).toBe(true);
  });

  it("should call drawLine", () => {
    const linePlugin = {
      id: "linePlugin",
      beforeInit: jest.fn(),
      afterDraw: jest.fn(),
      afterRender: jest.fn(),
    };
    HTMLCanvasElement.prototype.getContext = jest.fn(() => {
      return {
        font: "",
        measureText: jest.fn(() => {
          return {
            width: 200,
          };
        }),
      } as any;
    });
    component.data = [
      {
        title: "Munich Hotel - Sales Per Device (Current)",
        label: "Munich Hotel Hotel Hotel Hotel",
        total: ["0", "33550"],
        color: ["#00A687", "#00A687"],
        details: [],
      },
      {
        title: "Malaga Hotel - Sales Per Device (Current)",
        label: "Malaga Hotel",
        total: ["33550", "32600"],
        color: ["#00A687", "#00A687"],
        details: [],
      },
      {
        title: "Munich Hotel - Sales Per Device (Current)",

        label: "Manual",
        total: ["1400", "1400"],
        color: ["#EC3F2E"],
        details: [],
      },
    ];

    component.drawSuccess = false;

    component.pluginChartDataLabels = [...component.pluginChartDataLabels, linePlugin];
    component.pluginChartDataLabels[1].afterRender = jest.fn().mockImplementation(() => {
      expect(component.drawSuccess).toEqual(false);
    });
  });
});
