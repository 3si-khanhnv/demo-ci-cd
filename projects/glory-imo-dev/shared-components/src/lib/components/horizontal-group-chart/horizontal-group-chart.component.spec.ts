import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";

import { HorizontalGroupChartComponent } from "./horizontal-group-chart.component";
import { HorizontalGroupChartModule } from "./horizontal-group-chart.module";
import { DEFAULT_OPTION_CHART } from "./horizontal-group-chart.constant";

jest.mock("../../../../../../../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js", () => ({
  __esModule: false,
}));

jest.mock("patternomaly", function () {
  return {
    draw: jest.fn(() => "draw"),
  };
});
import { Renderer2 } from "@angular/core";
import { IDataEmitChart } from "./horizontal-group-chart.i";

describe("HorizontalGroupChartComponent", () => {
  let component: HorizontalGroupChartComponent;
  let fixture: ComponentFixture<HorizontalGroupChartComponent>;
  let renderer2: Renderer2;
  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [HorizontalGroupChartModule, TranslateModule.forRoot()],
      providers: [Renderer2],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalGroupChartComponent);
    renderer2 = fixture.componentRef.injector.get(Renderer2);
    jest.spyOn(renderer2, "listen").mockReset();
    component = fixture.componentInstance;
    const elementMock: any = { addEventListener: jest.fn() };
    jest.spyOn(document, "getElementById").mockImplementation(() => elementMock);
    component["chart"] = {
      canvas: {
        style: {
          cursor: "default",
          resize: jest.fn(),
        },
      },
    } as any;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("should call handleFormatLabels function", () => {
    beforeEach(() => {
      component.tempData = [
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Munich Hotel Hotel Hotel Hotel",
          total: ["0", "33550"],
          color: ["#F98902"],
          groupType: ["groupType"],
          details: [],
        },
        {
          title: "Malaga Hotel - Sales Per Device (Current)",
          label: "Malaga Hotel",
          total: ["33550", "32600"],
          color: ["#00A687"],
          groupType: ["groupType"],
          details: [],
        },
      ];
    });
    it("should find item equal value", () => {
      const value = 1234567;
      component.currencyCode = "USD";
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual("1,234,567.00");
    });

    it("should can not find item equal value", () => {
      const value = null;
      const expected = "0.00";
      component.currencyCode = "USD";
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual(expected);
    });

    it("should data item onHover", () => {
      const dataInput: any = {
        e: {},
        elements: [
          {
            index: 0,
          },
        ],
        chart: {
          canvas: {
            style: {
              cursor: "pointer",
            },
          },
        },
      };

      component.data = [
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Munich Hotel Hotel Hotel Hotel",
          total: ["0", "-33550"],
          color: ["#F98902"],
          groupType: ["groupType"],
          details: [],
        },
        {
          title: "Malaga Hotel - Sales Per Device (Current)",
          label: "Malaga Hotel",
          total: ["33550", "32600"],
          color: ["#00A687"],
          groupType: ["groupType"],
          details: [],
        },
      ];

      component.chartOptions.onHover(dataInput.e, dataInput.elements, dataInput.chart);
      expect(component.chartOptions.onHover).not.toBeNull();
    });
  });

  describe("should call set data", () => {
    it("Check data chart", () => {
      component.data = [
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Munich Hotel Hotel Hotel Hotel",
          total: ["0", "33550"],
          color: ["#00A687", "#00A687"],
          groupType: ["groupType", "groupType1"],
          details: [],
        },
        {
          title: "Malaga Hotel - Sales Per Device (Current)",
          label: "Malaga Hotel",
          total: ["33550", "32600"],
          color: ["#00A687", "#00A687"],
          groupType: ["groupType", "groupType1"],
          details: [],
        },
      ];

      const expected = {
        datasets: [
          {
            label: "groupType",
            data: [0, 33550],
            barThickness: 28,
            borderColor: "rgba(0, 0, 0, 0)",
            borderWidth: 1,
            hoverBorderColor: "rgba(0, 0, 0, 0)",
            backgroundColor: ["#00A687", "#00A687"],
            hoverBackgroundColor: ["#00A687", "#00A687"],
            minBarLength: 1,
          },
          {
            label: "groupType1",
            data: [33550, 32600],
            barThickness: 28,
            borderColor: "rgba(0, 0, 0, 0)",
            borderWidth: 1,
            hoverBorderColor: "rgba(0, 0, 0, 0)",
            backgroundColor: ["#00A687", "#00A687"],
            hoverBackgroundColor: ["#00A687", "#00A687"],
            minBarLength: 1,
          },
        ],

        labels: [["Munich Hotel", "Hotel Hotel", "Hotel"], ["Malaga Hotel"]],
      };
      expect(component._data).toEqual(expected);
    });

    it("Check item total is undefined", () => {
      component.data = [
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Munich Hotel Hotel Hotel Hotel",
          total: [],
          color: [],
          groupType: ["groupType", "groupType1"],
          details: [],
        },
      ];

      const expected = {
        datasets: [],
        labels: [["Munich Hotel", "Hotel Hotel", "Hotel"]],
      };
      expect(component._data).toEqual(expected);
    });

    it("should formatLabel long", () => {
      component.data = [
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Munich Hotel Munich Hotel Munich Hotel Munich Hotel Munich Hotel Munich Hotel Munich Hotel Munich Hotel",
          total: undefined,
          color: [],
          groupType: ["groupType", "groupType1"],
          details: [],
        },
      ];
      expect(component._height).toEqual(416);
    });
  });

  it("should call set configOptions", () => {
    jest.spyOn(component["chart"].chart, "resize");
    component.data = [
      {
        title: "Munich Hotel - Sales Per Device (Current)",
        label: "Munich Hotel Hotel Hotel Hotel",
        total: ["0", "33550"],
        color: ["#00A687", "#00A687"],
        groupType: ["groupType", "groupType1"],
        details: [],
      },
      {
        title: "Malaga Hotel - Sales Per Device (Current)",
        label: "Malaga Hotel",
        total: ["33550", "32600"],
        color: ["#00A687", "#00A687"],
        groupType: ["groupType", "groupType1"],
        details: [],
      },
    ];

    component.configOptions = {
      indexAxis: "x",
      layout: {
        padding: 20,
      },
    };
    const expected = {
      indexAxis: "x",
      layout: { padding: 20 },
      plugins: {
        datalabels: {
          align: component.handleAnchorAndAlign,
          anchor: component.handleAnchorAndAlign,
          clamp: true,
          color: "#101624",
          font: { family: '"Roboto", sans-serif', size: 14, weight: 500 },
          formatter: component.handleFormatLabels,
          listeners: {
            click: component.handleClickLabelData,
          },
          padding: 2,
        },
        legend: { display: false },
        tooltip: { enabled: false },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false, drawBorder: false, offset: false },
          max: 33550,
          min: 0,
          ticks: { display: false },
        },
        y: {
          afterFit: component.afterFit,
          grid: { display: false, drawBorder: false },
          ticks: { color: "#101624", font: { weight: "500", family: '"Roboto", sans-serif', size: 14 } },
        },
      },
      onHover: expect.any(Function),
      onClick: expect.any(Function),
      onResize: expect.any(Function),
      animation: {
        onProgress: expect.any(Function),
        onComplete: expect.any(Function),
      },
    };

    expect(component.chartOptions).toStrictEqual(expected);
  });

  it("should call set configOptions when configOptions have formatter", () => {
    const mockFormat = () => {};
    component.configOptions = {
      indexAxis: "x",
      plugins: {
        datalabels: {
          formatter: mockFormat,
        },
      },
      layout: {
        padding: 20,
      },
    };
    const expected = {
      indexAxis: "x",
      layout: { padding: 20 },
      plugins: {
        datalabels: {
          formatter: mockFormat,
        },
      },
      responsive: true,
      scales: {
        x: {
          grid: { display: false, drawBorder: false, offset: false },
          ticks: { display: false },
        },
        y: {
          grid: { display: false, drawBorder: false },
          ticks: { color: "#101624", font: { lineHeight: "17px", weight: "500", family: "Roboto", size: 14 } },
        },
      },
      onHover: expect.any(Function),
      onClick: expect.any(Function),
      onResize: expect.any(Function),
    };
    expect(component.chartOptions).toStrictEqual(expected);
  });

  it("should call set configOptions when configOptions is null", () => {
    component.configOptions = null;
    const expected = {
      ...DEFAULT_OPTION_CHART,
      onHover: expect.any(Function),
      onClick: expect.any(Function),
      onResize: expect.any(Function),
    };
    expect(component.chartOptions).toStrictEqual(expected);
  });

  it("should call onHover and click chart", (done) => {
    const spy = jest.spyOn(component.emitDataClick, "emit");

    const dataInput: any = {
      e: {},
      elements: [
        {
          index: 0,
        },
      ],
      chart: {
        canvas: {
          style: {
            cursor: "pointer",
          },
        },
      },
    };
    component.chartType = "barHorizontalGroupClickSingle";
    component.tempData = [
      {
        title: "Munich Hotel - Sales Per Device (Current)",
        label: "Munich Hotel Hotel Hotel Hotel",
        total: ["0", "33550"],
        color: ["#00A687", "#00A687"],
        groupType: ["groupType", "groupType1"],
        details: [],
      },
      {
        title: "Malaga Hotel - Sales Per Device (Current)",
        label: "Malaga Hotel",
        total: ["33550", "32600"],
        color: ["#00A687", "#00A687"],
        groupType: ["groupType", "groupType1"],
        details: [],
      },
    ];
    const mockData: IDataEmitChart = {
      index: 0,
      item: {
        color: ["#00A687", "#00A687"],
        details: [],
        groupType: ["groupType", "groupType1"],
        label: "Munich Hotel Hotel Hotel Hotel",
        title: "Munich Hotel - Sales Per Device (Current)",
        total: ["0", "33550"],
      },
      indexChild: undefined,
    };

    //act

    component.emitDataClick.subscribe({
      // assert
      next: (actual) => {
        expect(actual).toEqual(mockData);
        done();
      },
      error: (error) => fail(error),
      complete: () => fail("should not complete"),
    });

    component.chartOptions.onClick(dataInput.e, dataInput.elements, dataInput.chart);
    component.chartOptions.onHover(dataInput.e, dataInput.elements, dataInput.chart);

    //assert
    expect(spy).toHaveBeenCalledWith(mockData);
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
    component.tempData = [
      {
        title: "Munich Hotel - Sales Per Device (Current)",
        label: "Munich Hotel Hotel Hotel Hotel",
        total: ["0", "33550"],
        color: ["#00A687", "#00A687"],
        groupType: ["groupType", "groupType1"],
        details: [],
      },
      {
        title: "Malaga Hotel - Sales Per Device (Current)",
        label: "Malaga Hotel",
        total: ["33550", "32600"],
        color: ["#00A687", "#00A687"],
        groupType: ["groupType", "groupType1"],
        details: [],
      },
    ];
    const mockData: IDataEmitChart = {
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

  it("should call onResize chart", () => {
    component.isAutoResponsive = true;
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
        },
      },
    };
    component.tempData = [
      {
        title: "Munich Hotel - Sales Per Device (Current)",
        label: "Munich Hotel Hotel Hotel Hotel",
        total: ["0", "33550"],
        color: ["#00A687", "#00A687"],
        groupType: ["groupType", "groupType1"],
        details: [],
      },
      {
        title: "Malaga Hotel - Sales Per Device (Current)",
        label: "Malaga Hotel",
        total: ["33550", "32600"],
        color: ["#00A687", "#00A687"],
        groupType: ["groupType", "groupType1"],
        details: [],
      },
    ];

    //act

    component.chartOptions.onResize(dataInput.chart, { width: 700, height: 456 });

    //assert
    expect(dataInput.chart.options.maintainAspectRatio).toBe(false);
  });

  it("should call handleClickLabelData function", () => {
    const context = {
      dataIndex: 0,
    };
    component.chartType = "";
    component.tempData = [
      {
        title: "Munich Hotel - Sales Per Device (Current)",
        label: "Munich Hotel Hotel Hotel Hotel",
        total: ["0", "33550"],
        color: ["#00A687", "#00A687"],
        groupType: ["groupType", "groupType1"],
        details: [],
      },
      {
        title: "Malaga Hotel - Sales Per Device (Current)",
        label: "Malaga Hotel",
        total: ["33550", "32600"],
        color: ["#00A687", "#00A687"],
        groupType: ["groupType", "groupType1"],
        details: [],
      },
    ];

    const expected = {
      index: 0,
      item: {
        color: ["#00A687", "#00A687"],
        details: [],
        groupType: ["groupType", "groupType1"],
        label: "Munich Hotel Hotel Hotel Hotel",
        title: "Munich Hotel - Sales Per Device (Current)",
        total: ["0", "33550"],
      },
      indexChild: undefined,
    };
    const spy = jest.spyOn(component.emitDataClick, "emit");

    component.handleClickLabelData(context as any);

    component.emitDataClick.subscribe({
      next: (actual) => {
        expect(actual).toEqual(expected);
      },
    });

    expect(spy).toHaveBeenCalledWith(expected);
  });
  it("should call handleAnchor function", () => {
    const input = {
      dataIndex: 0,
      dataset: {
        data: [1],
      },
    };
    const input2 = {
      dataIndex: 0,
      dataset: {
        data: [-1],
      },
    };
    const act = component.handleAnchorAndAlign(input);
    const act2 = component.handleAnchorAndAlign(input2);

    expect(act).toBe("end");
    expect(act2).toBe("start");
  });

  describe("onClickCanvas", () => {
    it("should call onClickCanvas", () => {
      const spy = jest.spyOn(component.emitDataClick, "emit");
      component.barThickness = 12;
      component._data = {
        ...component._data,
        labels: [["a"]],
      };
      const ast = component.onClickCanvas({
        chart: {
          getDatasetMeta: () => ({
            data: [{ x: 739, y: 553 }],
          }),
          data: { labels: [1] },
          scales: { y: { getPixelForValue: () => 80 } },
        },
      });
      ast({ offsetX: 400, offsetY: 79 });
      expect(spy).toHaveBeenCalledWith({
        index: 0,
      });
    });

    it("should call onClickCanvas with 1 label", () => {
      const spy = jest.spyOn(component.emitDataClick, "emit");
      component.barThickness = 12;
      component._data = {
        ...component._data,
        labels: ["a"],
      };
      const ast = component.onClickCanvas({
        chart: {
          getDatasetMeta: () => ({
            data: [{ x: 739, y: 553 }],
          }),
          data: { labels: [1] },
          scales: { y: { getPixelForValue: () => 80 } },
        },
      });
      ast({ offsetX: 400, offsetY: 79 });
      expect(spy).toHaveBeenCalledWith({
        index: 0,
      });
    });
  });

  describe("autoHeight", () => {
    it("should call autoHeight and return minHeight", () => {
      const minHeight = 500;
      const totalItems = 2;
      const barThickness = 88;
      const distanceColumn = 16;

      const result = component.autoHeight(minHeight, totalItems, barThickness, distanceColumn);

      expect(result).toEqual(minHeight);
    });

    it("should call autoHeight with totalItems <= 1", () => {
      const minHeight = 456;
      const totalItems = 1;
      const barThickness = 88;
      const distanceColumn = 8;

      const result = component.autoHeight(minHeight, totalItems, barThickness, distanceColumn);

      expect(result).toEqual(minHeight);
    });

    it("should call autoHeight and return totalHeight", () => {
      const minHeight = 100;
      const totalItems = 5;
      const barThickness = 5;
      const distanceColumn = 50;

      const result = component.autoHeight(minHeight, totalItems, barThickness, distanceColumn);
      const expected = totalItems * barThickness + totalItems * distanceColumn * 2;

      expect(result).toEqual(expected);
    });
  });

  describe("resizeChart", () => {
    beforeEach(() => {
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
    });

    it("should call with params include chart object", () => {
      const size = {
        width: 720,
        height: 456,
      };
      const dataInput: any = {
        e: {},
        elements: [],
        chart: {
          getDatasetMeta() {
            return {
              data: [
                {
                  getProps() {
                    return {
                      $datalabels: [
                        {
                          _model: {
                            size: {
                              width: 100,
                            },
                          },
                          _el: {
                            x: 200,
                          },
                        },
                      ],
                    };
                  },
                },
              ],
            };
          },
          canvas: {
            style: {
              cursor: "default",
            },
          },
          data: {
            labels: ["Harpenden", "Basingstoke"],
            datasets: [{ dataRaw: [-10, 5] }],
          },
          options: {
            maintainAspectRatio: true,
            layout: {
              padding: 0,
            },
            scales: {
              y: {
                tick: {
                  display: false,
                },
              },
            },
            plugins: {
              datalabels: {
                font: {
                  size: 14,
                  weight: 500,
                  family: `"Roboto", sans-serif`,
                },
              },
            },
          },
          resize() {},
        },
      };

      component.isAutoResponsive = true;

      const padding = { left: 0, right: 0, bottom: 72, top: 72 };
      // act
      component.resizeChart(3, size.height, 88, 8, dataInput.chart);

      // assert
      expect(dataInput.chart.options.layout.padding).toEqual(padding);
    });

    it("should call with params without chart object", () => {
      const size = {
        width: 720,
        height: 456,
      };

      const expectedPadding = {
        bottom: 124,
        right: 0,
        left: 0,
        top: 124,
      };
      // act
      component.resizeChart(2, size.height, 88, 8);

      // assert
      expect(component.chartOptions.layout.padding).toEqual(expectedPadding);
    });

    it("should call and add more padding right", () => {
      component.data = [
        {
          title: "Munich Hotel - Sales Per Device (Current)",
          label: "Munich Hotel Hotel Hotel Hotel",
          total: ["0", "-33550"],
          color: ["#F98902"],
          groupType: ["groupType"],
          details: [],
        },
        {
          title: "Malaga Hotel - Sales Per Device (Current)",
          label: "Malaga Hotel",
          total: ["33550", "32600"],
          color: ["#00A687"],
          groupType: ["groupType"],
          details: [],
        },
      ];

      const size = {
        width: 720,
        height: 456,
      };
      const expected = {
        datasets: [
          {
            label: "groupType",
            data: [0, 33550],
            barThickness: 28,
            borderColor: "rgba(0, 0, 0, 0)",
            borderWidth: 1,
            hoverBorderColor: "rgba(0, 0, 0, 0)",
            backgroundColor: ["#00A687", "#00A687"],
            hoverBackgroundColor: ["#00A687", "#00A687"],
            minBarLength: 1,
          },
          {
            label: "groupType1",
            data: [33550, 32600],
            barThickness: 28,
            borderColor: "rgba(0, 0, 0, 0)",
            borderWidth: 1,
            hoverBorderColor: "rgba(0, 0, 0, 0)",
            backgroundColor: ["#00A687", "#00A687"],
            hoverBackgroundColor: ["#00A687", "#00A687"],
            minBarLength: 1,
          },
        ],

        labels: [["Munich Hotel", "Hotel Hotel", "Hotel"], ["Malaga Hotel"]],
      };
      component._data = { ...expected };

      const mockCtx = document.createElement("canvas").getContext("2d");
      component.mockCtx = mockCtx;

      const expectedPadding = {
        bottom: 124,
        right: 208,
        left: 0,
        top: 124,
      };
      // act
      component.resizeChart(2, size.height, 88, 8);

      // assert
      expect(component.chartOptions.layout.padding).toEqual(expectedPadding);
    });
  });
});
