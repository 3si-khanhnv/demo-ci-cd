import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";

import { LocationInventoryTotalsComponent } from "./location-inventory-totals.component";
import { DEFAULT_OPTION_CHART, IDataEmitChart } from "./location-inventory-totals.constant";
import { ILabelColor } from "./location-inventory-totals.i";
import { LocationInventoryTotalsModule } from "./location-inventory-totals.module";
import { Renderer2 } from "@angular/core";

jest.mock("../../../../../../../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js", () => ({
  __esModule: false,
}));

describe("LocationInventoryTotalsComponent", () => {
  let component: LocationInventoryTotalsComponent;
  let fixture: ComponentFixture<LocationInventoryTotalsComponent>;
  let renderer2: Renderer2;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [LocationInventoryTotalsModule, TranslateModule.forRoot()],
      providers: [Renderer2],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInventoryTotalsComponent);
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

  describe("should call handleFormatLabels function", () => {
    beforeEach(() => {
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
    });
    it("should find item equal value", () => {
      const value = 1234567;
      component.currencyCode = "USD";
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual("1,234,567.00");
    });

    it("should can not find item equal value", () => {
      const value = null;
      const expected = "";
      component.currencyCode = "USD";
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual(expected);
    });

    it("should data item label undefined", () => {
      component.data = [{}] as ILabelColor[];
      const expected = ["", "", "", "", "", "", "", "", ""];

      expect(component._data.labels).toEqual(expected);
    });

    it("should data item data undefined", () => {
      component.data = [undefined] as ILabelColor[];
      const expected = {
        labels: ["", "", "", "", "", "", "", "", "", ""],
      };
      expect(component._data.labels).toEqual(expected.labels);
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

      component.data = [{}] as any;

      component.chartOptions.onHover(dataInput.e, dataInput.elements, dataInput.chart);
      expect(component.chartOptions.onHover).not.toBeNull();
    });

    // expect(component._data.labels).toEqual(expected.labels);

    it("should data item is empty", () => {
      component.data = [] as ILabelColor[];
      ``;
      const expected = [];

      expect(component._data.labels).toEqual(expected);
    });

    it("should data item bgColor undefined", () => {
      component.data = [{}] as ILabelColor[];
      const expected = [
        undefined,
        "transparent",
        "transparent",
        "transparent",
        "transparent",
        "transparent",
        "transparent",
        "transparent",
        "transparent",
        "transparent",
      ];

      expect(component._data.datasets[0].backgroundColor).toEqual(expected);
    });

    it("should data item value undefined", () => {
      component.data = [{}] as ILabelColor[];
      const expected = [undefined, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      expect(component._data.datasets[0].data).toEqual(expected);
    });

    it("should return full item when isShowFullText truthy", () => {
      component.isShowFullText = true;
      const value = 1234567;
      component.currencyCode = "USD";
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual("1,234,567.00");
    });
  });

  describe("should call set data", () => {
    it("Check data chart", () => {
      component.height = 34;
      component.data = [
        {
          label: "HarpendenHarpendenHarpendenHarpenden",
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
        {
          label: "Basingstoke Basingstoke Basingstoke Basingstoke",
          bgColor: "#80DCF4",
          current: "14,038",
          value: 14038,
        },
        {
          label: "Basingstoke Basingstoke",
          bgColor: "#80DCF4",
          current: "14,038",
          value: 14038,
        },
        {
          label: "Basingstoke Basingstoke Basingstoke Basingstoke Basingstoke Basingstoke Basingstoke Basingstoke",
          bgColor: "#80DCF4",
          current: "14,038",
          value: 14038,
        },
      ];

      const expected = {
        datasets: [
          {
            backgroundColor: [
              "#469AD9",
              "#80DCF4",
              "#80DCF4",
              "#80DCF4",
              "#80DCF4",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
            ],
            barThickness: 28,
            data: [1234567, 14038, 14038, 14038, 14038, 0, 0, 0, 0, 0],
            hoverBackgroundColor: [
              "#469AD9",
              "#80DCF4",
              "#80DCF4",
              "#80DCF4",
              "#80DCF4",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
            ],
            indexAxis: "y",
            minBarLength: 1,
          },
          {
            backgroundColor: ["transparent"],
            data: [null],
            indexAxis: "y",
          },
        ],
        labels: [
          ["HarpendenHarpendenHarpendenHarpenden"],
          ["Basingstoke"],
          ["Basingstoke Basingstoke", "Basingstoke Basingstoke"],
          ["Basingstoke Basingstoke"],
          ["Basingstoke Basingstoke", "Basingstoke Basingstoke..."],
          "",
          "",
          "",
          "",
          "",
        ],
      };
      expect(component._data).toEqual(expected);
    });

    it("Check item value is 0", () => {
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

      const expected = {
        datasets: [
          {
            backgroundColor: [
              "transparent",
              "#80DCF4",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
            ],
            barThickness: 28,
            data: [0, 14038, 0, 0, 0, 0, 0, 0, 0, 0],
            hoverBackgroundColor: [
              "transparent",
              "#80DCF4",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
            ],
            indexAxis: "y",
            minBarLength: 1,
          },
          {
            backgroundColor: ["transparent"],
            data: [null],
            indexAxis: "y",
          },
        ],
        labels: [["Harpenden"], ["Basingstoke"], "", "", "", "", "", "", "", ""],
      };
      expect(component._data).toEqual(expected);
    });

    it("Check data chart when show value zero", () => {
      component.height = 34;
      component.isShowValueZero = true;
      component.data = [
        {
          label: "HarpendenHarpendenHarpendenHarpenden",
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
        {
          label: "Basingstoke Basingstoke Basingstoke Basingstoke",
          bgColor: "#80DCF4",
          current: "14,038",
          value: 14038,
        },
        {
          label: "Basingstoke Basingstoke",
          bgColor: "#80DCF4",
          current: "14,038",
          value: 14038,
        },
        {
          label: "Basingstoke Basingstoke Basingstoke Basingstoke Basingstoke Basingstoke Basingstoke Basingstoke",
          bgColor: "#80DCF4",
          current: "14,038",
          value: 14038,
        },
      ];

      const expected = {
        datasets: [
          {
            backgroundColor: ["#469AD9", "#80DCF4", "#80DCF4", "#80DCF4", "#80DCF4"],
            barThickness: 28,
            data: [1234567, 14038, 14038, 14038, 14038],
            hoverBackgroundColor: ["#469AD9", "#80DCF4", "#80DCF4", "#80DCF4", "#80DCF4"],
            indexAxis: "y",
            minBarLength: 1,
          },
          {
            backgroundColor: ["transparent"],
            data: [null],
            indexAxis: "y",
          },
        ],
        labels: [
          ["HarpendenHarpendenHarpendenHarpenden"],
          ["Basingstoke"],
          ["Basingstoke Basingstoke", "Basingstoke Basingstoke"],
          ["Basingstoke Basingstoke"],
          ["Basingstoke Basingstoke", "Basingstoke Basingstoke..."],
        ],
      };
      expect(component._data).toEqual(expected);
    });
  });

  it("should call set configOptions", () => {
    component.isAutoResponsive = true;
    component.isShowValueZero = true;
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
          align: component.handleAlign,
          anchor: component.handleAnchor,
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
        x: {
          grid: { display: false, drawBorder: false, drawTicks: false },
          max: 1,
          min: 0,
          ticks: { display: false, maxTicksLimit: 1, stepSize: 1 },
        },
        y: {
          grid: { display: false, drawBorder: false },
          ticks: { color: "#101624", font: { weight: "500", family: '"Roboto", sans-serif', size: 14 } },
          stacked: true,
        },
        xAxis: {
          display: false,
          grid: {
            display: false,
          },
          stacked: true,
          type: "linear",
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
        y: {
          grid: { display: false, drawBorder: false },
          ticks: { color: "#101624", font: { lineHeight: "17px", weight: "500", family: `"Roboto", sans-serif`, size: 14 } },
        },
        xAxis: {
          grid: {
            display: false,
          },
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

  it("calculator height chart when isAutoResponsive is false ", () => {
    component.isShowFullText = true;
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
      layout: {
        padding: {
          right: 0,
          bottom: 31,
          top: 31,
        },
      },
      plugins: {
        datalabels: {
          align: component.handleAlign,
          anchor: component.handleAnchor,
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
        x: {
          grid: { display: false, drawBorder: false, drawTicks: false },
          max: 1,
          min: 0,
          ticks: { display: false, maxTicksLimit: 1, stepSize: 1 },
        },
        y: {
          grid: { display: false, drawBorder: false },
          ticks: { color: "#101624", font: { weight: "500", family: '"Roboto", sans-serif', size: 14 } },
          stacked: true,
        },
        xAxis: {
          display: false,
          grid: {
            display: false,
          },
          stacked: true,
          type: "linear",
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
      layout: {
        padding: {
          right: 0,
          top: 77,
          bottom: 77,
        },
      },
      plugins: {
        datalabels: {
          align: component.handleAlign,
          anchor: component.handleAnchor,
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
        x: {
          grid: { display: false, drawBorder: false, drawTicks: false },
          max: 1,
          min: 0,
          ticks: { display: false, maxTicksLimit: 1, stepSize: 1 },
        },
        y: {
          grid: { display: false, drawBorder: false },
          stacked: true,
          ticks: { color: "#101624", font: { weight: "500", family: '"Roboto", sans-serif', size: 14 } },
        },
        xAxis: {
          display: false,
          grid: {
            display: false,
          },
          stacked: true,
          type: "linear",
        },
      },
      onHover: expect.any(Function),
      onClick: expect.any(Function),
      onResize: expect.any(Function),
    };
    expect(component.chartOptions).toStrictEqual(expected);
  });

  describe("resizeChart", () => {
    it("should call with params include chart object", () => {
      const size = 456;
      const dataInput: any = {
        e: {},
        elements: [],
        chart: {
          getDatasetMeta() {
            return {
              data: [],
            };
          },
          canvas: {
            style: {
              cursor: "default",
            },
          },
          data: {
            labels: ["Harpenden", "Basingstoke"],
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
              x: {
                grid: {},
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
        },
      };
      const totalItems = 2;
      const expectedPadding = {
        top: 148,
        bottom: 148,
      };
      // act
      component.resizeChart(totalItems, size, dataInput.chart);

      // assert
      expect(dataInput.chart.options.layout.padding).toEqual(expectedPadding);
      expect(dataInput.chart.options.plugins.datalabels.font.size).toEqual(14);
      expect(dataInput.chart.options.maintainAspectRatio).toBe(false);
    });

    it("should call with params without chart object", () => {
      const size = 456;

      const totalItems = 22;
      const expectedPadding = {
        top: -168,
        bottom: -168,

        right: 0,
      };
      const font = {
        size: 14,
        weight: 500,
        family: `"Roboto", sans-serif`,
      };
      // act
      component.resizeChart(totalItems, size);

      // assert
      expect(component.chartOptions.layout.padding).toEqual(expectedPadding);
      expect(component.chartOptions.plugins.datalabels.font).toEqual(font);
    });
  });

  describe("onResize chart", () => {
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

  describe("onResize chart", () => {
    it("should call formatLabel many labels include space", () => {
      const labels = "Basingstoke Basingstoke Basingstoke Basingstoke";
      const act = component.formatLabel(labels);
      expect(act).toEqual(["Basingstoke", "Basingstoke", "Basingstoke", "Basingstoke"]);
    });
    it("should call formatLabel many labels", () => {
      const labels = "HarpendenHarpendenHarpendenHarpenden";

      const act = component.formatLabel(labels);
      expect(act).toEqual(["HarpendenHarpe", "ndenHarpendenH"]);
    });
  });

  describe("setContainerHeight", () => {
    it("should return value when chart height is high", () => {
      // arrange
      const chartHeight = 530;
      const expected = { height: "602px" };

      // act
      const result = component.setContainerHeight(chartHeight);

      // assert
      expect(result).toEqual(expected);
    });

    it("should return null when chart height is low", () => {
      // arrange
      const chartHeight = 400;
      const expected = { height: null };

      // act
      const result = component.setContainerHeight(chartHeight);

      // assert
      expect(result).toEqual(expected);
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
                  raw: 500000,
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
      jest.spyOn(chart, "update");

      component.pluginsDistance(chart as any);

      expect(chart.update).not.toBeCalledWith();
    });
  });
});
