import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HorizontalChartComponent } from "./horizontal-chart.component";
import { Renderer2 } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HorizontalChartModule } from "./horizontal-chart.module";
import { DEFAULT_OPTION_CHART, IDataEmitChart } from "./horizontal-chart.i";

jest.mock("../../../../../../../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js", () => ({
  __esModule: false,
}));

jest.mock("patternomaly", function () {
  return {
    draw: jest.fn(() => "draw"),
  };
});

describe("HorizontalChartComponent", () => {
  let component: HorizontalChartComponent;
  let fixture: ComponentFixture<HorizontalChartComponent>;

  let renderer2: Renderer2;
  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [HorizontalChartModule, TranslateModule.forRoot()],
      providers: [Renderer2],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalChartComponent);
    renderer2 = fixture.componentRef.injector.get(Renderer2);
    jest.spyOn(renderer2, "listen").mockReset();
    component = fixture.componentInstance;
    const elementMock: any = { addEventListener: jest.fn() };
    jest.spyOn(document, "getElementById").mockImplementation(() => elementMock);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call set configOptions", () => {
    component.isAutoResponsive = true;
    component.height = 130;
    component.isShowValueZero = true;
    component.data = [
      {
        label: "Top 1 Location Top 5 Location",
        bgColor: "#004D6E",
        current: "-5",
        value: -500000000,
      },
      {
        label: "Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 1,
      },
      {
        label: "Top 4 Location",
        bgColor: "#004D6E",
        current: "-100.00",
        value: 5000000000000,
      },
      {
        label: "Top5Location, Top5Location",
        bgColor: "#004D6E",
        current: "5",
        value: 0,
      },
      {
        label: "Top 4 Location",
        bgColor: "#004D6E",
        current: "-100.00",
        value: -5000000000000,
      },
    ];

    component.configOptions = {
      indexAxis: "y",
      layout: {
        padding: 20,
      },
    };

    const expected = {
      indexAxis: "y",
      maintainAspectRatio: false,
      layout: { padding: 20 },
      plugins: {
        datalabels: {
          clamp: true,
          align: expect.any(Function),
          anchor: expect.any(Function),
          color: "#101624",
          font: { family: '"Roboto", sans-serif', size: 14, weight: 500 },
          formatter: expect.any(Function),
          padding: 8,
        },
        legend: { display: false },
        tooltip: { enabled: false },
      },
      responsive: true,
      scales: {
        x: {
          display: true,
          grid: { display: false, drawBorder: false, offset: true },

          ticks: { display: false, maxTicksLimit: 1, stepSize: 1 },
        },
        xAxis: {
          stacked: true,
          display: false,
          type: "linear",
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          display: true,
          grid: { display: false, drawBorder: false },
          ticks: { color: "#101624", font: { family: '"Roboto", sans-serif', size: 14, weight: "500" }, padding: 0 },
        },
        yAxes: {
          display: false,
          grid: {
            display: false,
          },
          ticks: {
            padding: 0,
          },
        },
      },
      onHover: expect.any(Function),
      onClick: expect.any(Function),
      onResize: expect.any(Function),
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
          grid: { display: false, drawBorder: false, offset: true },
          ticks: { display: false, maxTicksLimit: 1, stepSize: 1 },
        },
        xAxis: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: { display: false, drawBorder: false },
          ticks: { color: "#101624", font: { lineHeight: "17px", weight: "500", family: '"Roboto", sans-serif', size: 14 } },
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

  it("calculator height chart when isAutoResponsive is false ", () => {
    component.data = [
      undefined,
      {
        label: "Top 1 Location Top 5 Location",
        bgColor: "#004D6E",
        current: "-5",
        value: -5000000,
      },
      {
        label: "Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 1,
      },
      {
        label: "Top 4 Location",
        bgColor: "#004D6E",
        current: "-100.00",
        value: 500,
      },
      {
        label: "Top5Location, Top5Location",
        bgColor: "#004D6E",
        current: "5",
        value: 0,
      },
      {
        label: "Top 4 Location",
        bgColor: "#004D6E",
        current: "-100.00",
        value: -500,
      },
    ];
    component.isShowValueZero = false;
    component.isAutoResponsive = false;
    component.height = 130;
    const expected = {
      indexAxis: "y",
      maintainAspectRatio: false,
      layout: { padding: { right: 66 } },
      plugins: {
        datalabels: {
          clamp: true,
          align: expect.any(Function),
          anchor: expect.any(Function),
          color: "#101624",
          font: { family: '"Roboto", sans-serif', size: 14, weight: 500 },
          formatter: expect.any(Function),
          padding: 8,
        },
        legend: { display: false },
        tooltip: { enabled: false },
      },
      responsive: true,
      scales: {
        x: {
          display: true,
          grid: { display: false, drawBorder: false, offset: true },

          ticks: { display: false, maxTicksLimit: 1, stepSize: 1 },
        },
        xAxis: {
          type: "linear",
          stacked: true,
          display: false,
          grid: {
            display: false,
          },
        },
        y: {
          display: true,
          grid: { display: false, drawBorder: false },
          ticks: { color: "#101624", font: { family: '"Roboto", sans-serif', size: 14, weight: "500" }, padding: 0 },
          stacked: true,
        },
        yAxes: {
          display: false,
          grid: {
            display: false,
          },
          ticks: {
            padding: 0,
          },
        },
      },
      onHover: expect.any(Function),
      onClick: expect.any(Function),
      onResize: expect.any(Function),
    };
    expect(component.chartOptions).toStrictEqual(expected);
  });

  it("calculator height chart when isAutoResponsive is false and not set height", () => {
    component.data = [
      {
        label: "Top 2 Location, Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: -1111111111110,
      },
      {
        label: "Top 2 Location, Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
      {
        label: "Top 2 Location, Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
      {
        label: "Top 2 Location, Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
      {
        label: "Top 2 Location, Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
      {
        label: "Top 2 Location, Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
      {
        label: "Top 2 Location, Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
      {
        label: "Top 2 Location, Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
      {
        label: "Top 2 Location, Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
      {
        label: "Top 2 Location, Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
      {
        label: "Top 2 Location, Top 2 Location",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
      {
        label: "Basingstoke Basingstoke Basingstoke Basingstoke",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
      {
        label: "HarpendenHarpendenHarpendenHarpenden",
        bgColor: "#004D6E",
        current: "1.00",
        value: 0,
      },
    ];
    component.isShowValueZero = false;
    component.isAutoResponsive = false;
    component.height = 130;
    const expected = {
      indexAxis: "y",
      maintainAspectRatio: false,
      layout: { padding: { right: 44 } },
      plugins: {
        datalabels: {
          clamp: true,
          align: expect.any(Function),
          anchor: expect.any(Function),
          color: "#101624",
          font: { family: '"Roboto", sans-serif', size: 13.5, weight: 500 },
          formatter: expect.any(Function),
          padding: 8,
        },
        legend: { display: false },
        tooltip: { enabled: false },
      },
      responsive: true,
      scales: {
        x: {
          display: true,
          grid: { display: false, drawBorder: false, offset: true },
          ticks: { display: false, maxTicksLimit: 1, stepSize: 1 },
        },
        xAxis: {
          display: false,
          type: "linear",
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          display: true,
          grid: { display: false, drawBorder: false },
          ticks: { color: "#101624", font: { family: '"Roboto", sans-serif', size: 14, weight: "500" }, padding: 0 },
          stacked: true,
        },
        yAxes: {
          display: false,
          grid: {
            display: false,
          },
          ticks: {
            padding: 0,
          },
        },
      },
      onHover: expect.any(Function),
      onClick: expect.any(Function),
      onResize: expect.any(Function),
    };
    expect(component.chartOptions).toStrictEqual(expected);
  });

  describe("should call handleFormatLabels function", () => {
    it("should find item equal value", () => {
      const value = 1234567;
      component.coefficient = 1234567;
      component.currencyCode = "USD";
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual("1,234,567.00");
    });
    it("should find item equal value is null", () => {
      const value = null;
      component.coefficient = 1234567;
      component.currencyCode = "USD";
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual("");
    });
  });

  it("should call set configOptions", () => {
    component.data = [
      {
        label: "Harpenden",
        bgColor: "#469AD9",
        current: "0",
        value: 0,
      },
      {
        label: "Basingstoke",
        bgColor: "#80DCF4",
        current: "14,038",
        value: 14038,
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
      maintainAspectRatio: false,
      layout: { padding: 20 },
      plugins: {
        datalabels: {
          align: expect.any(Function),
          anchor: expect.any(Function),
          clamp: true,
          color: "#101624",
          font: { family: '"Roboto", sans-serif', size: 14, weight: 500 },
          formatter: component.handleFormatLabels,
          padding: 8,
        },
        legend: { display: false },
        tooltip: { enabled: false },
      },
      responsive: true,
      scales: {
        ...component.chartOptions.scales,
        x: {
          display: true,
          grid: { display: false, drawBorder: false, offset: true },

          ticks: { display: false, maxTicksLimit: 1, stepSize: 1 },
        },
        y: {
          ...component.chartOptions.scales.y,
          grid: { display: false, drawBorder: false },
          ticks: { color: "#101624", font: { weight: "500", family: '"Roboto", sans-serif', size: 14 }, padding: 0 },
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

  it("should call onHover and click  chart", (done) => {
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
    component.tempData = [
      {
        label: "Harpenden",
        bgColor: "#469AD9",
        current: "0",
        value: 0,
      },
      {
        label: "Basingstoke",
        bgColor: "#80DCF4",
        current: "14,038",
        value: 14038,
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

  it("should call onHover and click chart (element null)", (done) => {
    const spy = jest.spyOn(component.emitDataClick, "emit");

    const dataInput: any = {
      e: { y: 10 },
      elements: [],
      chart: {
        canvas: {
          style: {
            cursor: "pointer",
          },
        },
        data: {
          labels: ["A", "B"],
        },
        scales: {
          y: {
            getPixelForValue() {
              return 10;
            },
          },
        },
      },
    };
    component.tempData = [
      {
        label: "Harpenden",
        bgColor: "#469AD9",
        current: "0",
        value: 0,
      },
      {
        label: "Basingstoke",
        bgColor: "#80DCF4",
        current: "14,038",
        value: 14038,
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
    component.barThickness = 5;
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
        label: "Harpenden",
        bgColor: "#469AD9",
        current: "0",
        value: 0,
      },
      {
        label: "Basingstoke",
        bgColor: "#80DCF4",
        current: "14,038",
        value: 14038,
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

  it("should call ngAfterViewInit", () => {
    component.ngAfterViewInit();
    expect(renderer2.listen).toHaveBeenCalled();
  });

  it("should onClickCanvas", () => {
    const spy = jest.spyOn(component.emitDataClick, "emit");
    component.barThickness = 12;
    component.tempData = [
      {
        label: "HarpendenHarpenden",
        bgColor: "#469AD9",
        current: "1,234,567",
        value: 1234567,
      },
      {
        label: "Basingstoke",
        bgColor: "#80DCF4",
        current: "14,038",
        value: 14038,
      },
    ];
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
      item: {
        label: "HarpendenHarpenden",
        bgColor: "#469AD9",
        current: "1,234,567",
        value: 1234567,
      },
      index: 0,
    });
  });

  describe("autoHeight", () => {
    it("should call autoHeight and return minHeight", () => {
      const minHeight = 500;
      const totalItems = 5;
      const barThickness = 5;
      const distanceColumn = 50;
      const minPaddingTB = 5;

      const result = component.autoHeight(minHeight, totalItems, barThickness, distanceColumn, minPaddingTB);

      expect(result).toEqual(minHeight);
    });

    it("should call autoHeight with totalItems <= 1", () => {
      const minHeight = 100;
      const totalItems = 1;
      const barThickness = 5;
      const distanceColumn = 50;
      const minPaddingTB = 5;

      const result = component.autoHeight(minHeight, totalItems, barThickness, distanceColumn, minPaddingTB);

      expect(result).toEqual(minHeight);
    });

    it("should call autoHeight and return totalHeight", () => {
      const minHeight = 100;
      const totalItems = 5;
      const barThickness = 5;
      const distanceColumn = 50;
      const minPaddingTB = 5;

      const result = component.autoHeight(minHeight, totalItems, barThickness, distanceColumn, minPaddingTB);
      const expected = totalItems * barThickness + distanceColumn * (totalItems - 1) + minPaddingTB;

      expect(result).toEqual(expected);
    });
  });

  describe("onResize chart", () => {
    beforeEach(() => {});

    it("should call onResize chart", () => {
      const spy = jest.spyOn(component as any, "resizeChart");
      component._height = 500;
      component.isAutoResponsive = true;
      const chart: any = {
        canvas: {
          style: {
            cursor: "default",
          },
        },
        data: {
          labels: {
            length: 5,
          },
        },
        options: {
          ...DEFAULT_OPTION_CHART,
        },
      };
      const size: any = {
        width: 500,
        height: 500,
      };

      component.chartOptions.onResize(chart, size);

      expect(spy).toHaveBeenCalled();
    });

    it("should call onResize chart with many labels", () => {
      const spy = jest.spyOn(component as any, "resizeChart");
      component._height = 500;
      component.isAutoResponsive = true;
      const chart: any = {
        canvas: {
          style: {
            cursor: "default",
          },
        },
        data: {
          labels: {
            length: 15,
          },
        },
        options: {
          ...DEFAULT_OPTION_CHART,
        },
      };
      const size: any = {
        width: 500,
        height: 500,
      };

      component.chartOptions.onResize(chart, size);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Should call pluginsDistance", () => {
    it("chart update", () => {
      const chart = {
        options: {
          scales: {
            xAxis: {
              min: 10,
            },
          },
        },
        getDatasetMeta() {
          return {
            data: [
              {
                $datalabels: [
                  {
                    _model: {
                      size: {
                        width: 100,
                      },
                    },
                  },
                ],
                $context: {
                  raw: -5000,
                },
                getProps() {
                  return {
                    width: 10,
                  };
                },
              },
            ],
          };
        },
        update() {},
      };
      component.isUpdateChart = false;
      jest.spyOn(chart, "update");

      component.pluginsDistance(chart as any);

      expect(chart.update).toBeCalledWith();
    });

    it("datalabels null", () => {
      const chart = {
        getDatasetMeta() {
          return {
            data: [{}],
          };
        },
        update() {},
      };
      component.isUpdateChart = false;
      jest.spyOn(chart, "update");

      component.pluginsDistance(chart as any);

      expect(chart.update).not.toBeCalledWith();
    });
  });

  describe("Should call handelAnchor", () => {
    it("return end", () => {
      const context = {
        dataset: {
          data: [10],
        },
        dataIndex: 0,
      };
      expect(component.handelAnchor(context as any)).toEqual("end");
    });

    it("return start", () => {
      const context = {
        dataset: {
          data: [-10],
        },
        dataIndex: 0,
      };
      expect(component.handelAnchor(context as any)).toEqual("start");
    });
  });

  describe("Should call handelAlign", () => {
    it("return end", () => {
      const context = {
        dataset: {
          data: [10],
        },
        dataIndex: 0,
        chart: {
          getDatasetMeta() {
            return {
              data: [
                {
                  getProps() {
                    return {
                      width: 10,
                    };
                  },
                  $context: {
                    raw: 100,
                  },
                },
              ],
            };
          },
        },
      };

      expect(component.handelAlign(context as any)).toEqual("end");
    });

    it("return start", () => {
      const context = {
        dataset: {
          data: [-10],
        },
        dataIndex: 0,
        chart: {
          getDatasetMeta() {
            return {
              data: [
                {
                  getProps() {
                    return {
                      width: 10,
                    };
                  },
                  $context: {
                    raw: 100,
                  },
                },
              ],
            };
          },
        },
      };

      expect(component.handelAlign(context as any)).toEqual("start");
    });
  });
});
