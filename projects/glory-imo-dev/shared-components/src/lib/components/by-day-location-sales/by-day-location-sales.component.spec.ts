import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LocationSalesByDayComponent } from "./by-day-location-sales.component";
import { DEFAULT_OPTION_CHART, IDataEmitChart, responsiveRangeData } from "./by-day-location-sales.constant";
import { ILabelColor } from "./by-day-location-sales.i";
import { LocationSalesByDayModule } from "./by-day-location-sales.module";
import { TranslateModule } from "@ngx-translate/core";
import { ElementRef } from "@angular/core";

jest.mock("../../../../../../../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js", () => ({
  __esModule: false,
}));

describe("LocationSalesByDayComponent", () => {
  let component: LocationSalesByDayComponent;
  let fixture: ComponentFixture<LocationSalesByDayComponent>;

  const mockElementRef: any = {
    nativeElement: {
      offsetWidth: 100,
      setAttributeNS: jest.fn(),
    },
  };

  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [LocationSalesByDayModule, TranslateModule.forRoot()],
      providers: [{ provide: ElementRef, useValue: mockElementRef }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSalesByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngAfterViewInit", () => {
    beforeEach(() => {});

    it("should subscribe notifierChartWidth to resize chart width", () => {
      // arrange
      component.isAutoResponsive = true;
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
      component.coefficient = 1234567;
      component.currencyCode = "USD";
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual("3,364,5...");
    });

    it("should can not find item equal value", () => {
      const value = null;
      const expected = "";
      component.coefficient = 1;
      component.currencyCode = "USD";
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual(expected);
    });

    it("should data item label undefined", () => {
      component.data = [{}] as ILabelColor[];
      const expected = [];

      expect(component._data.labels).toEqual(expected);
    });

    it("should data item bgColor undefined", () => {
      component.data = [{}] as ILabelColor[];
      const expected = [undefined];

      expect(component._data.datasets[0].backgroundColor).toEqual(expected);
    });

    it("should data item value undefined", () => {
      component.data = [{}] as ILabelColor[];
      const expected = [undefined];
      expect(component._data.datasets[0].data).toEqual(expected);
    });
    it("should check last letter of label ", () => {
      const value = 553;
      component.coefficient = 60000;
      component.isHide = false;
      component.currencyCode = "USD";
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual("73,245.03");
    });

    it("should format with show zero value", () => {
      const value = 0;
      component.isShowValueZero = true;
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual("0.00");
    });

    it("should format with show length > 6", () => {
      const value = 10000000;
      component.isShowValueZero = true;
      component.isHide = true;
      component.isShowAllDataLabel = false;
      component.coefficient = 1;
      component.currencyCode = "USD";
      jest.spyOn(window.navigator, "language", "get").mockReturnValue("en");
      expect(component.handleFormatLabels(value)).toEqual("22,075...");
    });
  });

  describe("should call set data", () => {
    it("Check data chart", () => {
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
      ];

      const expected = {
        datasets: [
          {
            backgroundColor: ["#469AD9", "#80DCF4"],
            barThickness: 28,
            data: [453, 5.150967100205984],
            dataRaw: [1234567, 14038],
            hoverBackgroundColor: ["#469AD9", "#80DCF4"],
          },
          {
            backgroundColor: ["transparent"],
            color: ["transparent"],
            data: [undefined],
            hoverBackgroundColor: ["transparent"],
            indexAxis: "x",
            plugins: { datalabels: { display: false } },
          },
        ],
        labels: ["HarpendenHarpendenHarpendenHarpenden", "Basingstoke"],
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
            backgroundColor: ["transparent", "#80DCF4"],
            barThickness: 28,
            data: [0, 453],
            dataRaw: [0, 14038],
            hoverBackgroundColor: ["transparent", "#80DCF4"],
          },
          {
            backgroundColor: ["transparent"],
            color: ["transparent"],
            data: [undefined],
            hoverBackgroundColor: ["transparent"],
            indexAxis: "x",
            plugins: { datalabels: { display: false } },
          },
        ],
        labels: ["Harpenden", "Basingstoke"],
      };
      expect(component._data).toEqual(expected);
    });

    it("Check item value is 0 and option show value is true", () => {
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

      const expected = {
        datasets: [
          {
            backgroundColor: ["#469AD9", "#80DCF4"],
            barThickness: 28,
            data: [0, 453],
            dataRaw: [0, 14038],
            hoverBackgroundColor: ["#469AD9", "#80DCF4"],
          },
          {
            backgroundColor: ["transparent"],
            color: ["transparent"],
            data: [undefined],
            hoverBackgroundColor: ["transparent"],
            indexAxis: "x",
            plugins: { datalabels: { display: false } },
          },
        ],
        labels: ["Harpenden", "Basingstoke"],
      };
      expect(component._data).toEqual(expected);
    });

    it("Check data chart value statePadding is 25", () => {
      component.data = [
        {
          label: "HarpendenHarpendenHarpendenHarpenden",
          bgColor: "#469AD9",
          current: "1,234,567",
          value: 123456789000,
        },
        {
          label: "Basingstoke",
          bgColor: "#80DCF4",
          current: "14,038",
          value: 123456789000,
        },
      ];

      const expected = {
        datasets: [
          {
            backgroundColor: ["#469AD9", "#80DCF4"],
            barThickness: 28,
            data: [453, 453],
            dataRaw: [123456789000, 123456789000],
            hoverBackgroundColor: ["#469AD9", "#80DCF4"],
          },
          {
            backgroundColor: ["transparent"],
            color: ["transparent"],
            data: [undefined],
            hoverBackgroundColor: ["transparent"],
            indexAxis: "x",
            plugins: { datalabels: { display: false } },
          },
        ],
        labels: ["HarpendenHarpendenHarpendenHarpenden", "Basingstoke"],
      };

      expect(component._data).toEqual(expected);
    });

    it("Check data chart value statePadding is 20", () => {
      component.data = [
        {
          label: "HarpendenHarpendenHarpendenHarpenden",
          bgColor: "#469AD9",
          current: "1,234,567",
          value: 123456789,
        },
        {
          label: "Basingstoke",
          bgColor: "#80DCF4",
          current: "14,038",
          value: 123456789,
        },
      ];

      const expected = {
        datasets: [
          {
            backgroundColor: ["#469AD9", "#80DCF4"],
            barThickness: 28,
            data: [453, 453],
            dataRaw: [123456789, 123456789],
            hoverBackgroundColor: ["#469AD9", "#80DCF4"],
          },
          {
            backgroundColor: ["transparent"],
            color: ["transparent"],
            data: [undefined],
            hoverBackgroundColor: ["transparent"],
            indexAxis: "x",
            plugins: { datalabels: { display: false } },
          },
        ],
        labels: ["HarpendenHarpendenHarpendenHarpenden", "Basingstoke"],
      };

      expect(component._data).toEqual(expected);
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
      onHover: expect.any(Function),
      onClick: expect.any(Function),
      onResize: expect.any(Function),
      indexAxis: "x",
      interaction: {
        mode: "nearest",
      },
      layout: { padding: 20 },
      plugins: {
        datalabels: {
          align: "end",
          anchor: "end",
          clamp: true,
          color: "#101624",
          font: { family: `"Roboto", sans-serif`, size: 16, weight: 500 },
          formatter: component.handleFormatLabels,
          padding: {
            bottom: 4,
          },
        },
        legend: { display: false },
        tooltip: { enabled: false },
      },
      responsive: true,
      scales: {
        xAxis: {
          display: false,
          stacked: true,
          type: "linear",
        },
        x: {
          grid: { display: false, drawBorder: false },
          max: 530,
          min: 0,
          stacked: true,
          ticks: { color: "#101624", font: { size: 14, weight: "500", family: `"Roboto", sans-serif` }, padding: 4 },
        },
        y: {
          min: 0,
          stacked: true,
          grid: { display: false, drawBorder: false, drawTicks: false, offset: true },
          ticks: { display: false, maxTicksLimit: 1, stepSize: 453 },
        },
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
      onHover: expect.any(Function),
      onClick: expect.any(Function),
      onResize: expect.any(Function),
      indexAxis: "x",
      layout: { padding: 20 },
      plugins: { datalabels: { formatter: mockFormat } },
      responsive: true,

      scales: {
        xAxis: {
          display: false,
          stacked: true,
          type: "linear",
        },
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { color: "#101624", font: { family: "Roboto", lineHeight: "17px", size: 14, weight: "500" } },
        },
        y: {
          stacked: true,
          grid: { display: false, drawBorder: false, drawTicks: false, offset: true },
          ticks: { display: false, maxTicksLimit: 1, stepSize: 453 },
        },
      },
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

  describe("Case auto responsive chart layout", () => {
    it("get barThickness from constant range data", () => {
      component.isAutoResponsive = true;
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
      const barThickness = component.dataByRange(2).barThickness;
      const expected = {
        datasets: [
          {
            backgroundColor: ["transparent", "#80DCF4"],
            barThickness: barThickness,
            data: [0, 453],
            dataRaw: [0, 14038],
            hoverBackgroundColor: ["transparent", "#80DCF4"],
          },
          {
            backgroundColor: ["transparent"],
            color: ["transparent"],
            data: [undefined],
            hoverBackgroundColor: ["transparent"],
            indexAxis: "x",
            plugins: { datalabels: { display: false } },
          },
        ],
        labels: ["Harpenden", "Basingstoke"],
      };
      expect(component._data).toEqual(expected);
    });

    it("call resizeChart when set data with responsive flag true and chart size truthy", () => {
      component.isAutoResponsive = true;
      component.currentChartSize = {
        width: 720,
        height: 456,
      };
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
            backgroundColor: ["transparent", "#80DCF4"],
            barThickness: 64,
            data: [0, 453],
            dataRaw: [0, 14038],
            hoverBackgroundColor: ["transparent", "#80DCF4"],
          },
          {
            backgroundColor: ["transparent"],
            color: ["transparent"],
            data: [undefined],
            hoverBackgroundColor: ["transparent"],
            indexAxis: "x",
            plugins: { datalabels: { display: false } },
          },
        ],
        labels: ["Harpenden", "Basingstoke"],
      };
      expect(component._data).toEqual(expected);
    });
  });

  describe("onResize chart", () => {
    it("should call resizeChart", () => {
      component.isAutoResponsive = true;
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
            datasets: [
              {
                dataRaw: [10, 20],
              },
            ],
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

      const size = {
        width: 720,
        height: 456,
      };

      //act
      component.chartOptions.onResize(dataInput.chart, size);

      //assert
      expect(component.currentChartSize).toEqual(size);
    });

    it("should call resizeChart chart over 12 items", () => {
      component.isAutoResponsive = true;
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
            datasets: [{ dataRaw: [-5, 100000000000] }],
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

      const size = {
        width: 720,
        height: 456,
      };

      //act
      component.chartOptions.onResize(dataInput.chart, size);

      //assert

      //assert
      expect(component.currentChartSize).toEqual(size);
    });
  });
  describe("onChangeOption", () => {
    it("should call onChangeOption and emit the action", (done) => {
      const event = "all";
      component.selectedOption.subscribe({
        next: (actual) => {
          expect(actual).toEqual(event);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });

      component.onChangeOption(event);
    });
  });

  describe("autoPadding", () => {
    it("should call autoPadding with min 2 columns", () => {
      // arrange
      const width = 1056;
      const totalItems = 15;
      const barThickness = 24;
      const paddingColumn = 16;
      const distanceColumn = 0;

      const expected = 108;

      // act
      const result = component.autoPadding(width, totalItems, barThickness, paddingColumn, distanceColumn);

      // assert
      expect(result).toEqual(expected);
    });

    it("should call autoPadding with less than or equal to 1 columns", () => {
      // arrange
      const width = 720;
      const totalItems = 1;
      const barThickness = 64;
      const paddingColumn = 16;
      const distanceColumn = 0;

      const expected = 312;

      // act
      const result = component.autoPadding(width, totalItems, barThickness, paddingColumn, distanceColumn);

      // assert
      expect(result).toEqual(expected);
    });

    it("should call autoPadding and return number is greater than or equal to minimal padding", () => {
      // arrange
      const width = 520;
      const totalItems = 15;
      const barThickness = 24;
      const paddingColumn = 16;
      const distanceColumn = 0;

      const expected = 24;

      // act
      const result = component.autoPadding(width, totalItems, barThickness, paddingColumn, distanceColumn);

      // assert
      expect(result).toEqual(expected);
    });
  });

  describe("dataByRange", () => {
    it("should call dataByRange with params is satisfactory to any item range", () => {
      // arrange
      const expected = responsiveRangeData[0];

      // act
      const result = component.dataByRange(5);

      // assert
      expect(result).toEqual(expected);
    });

    it("should call dataByRange with params is over last item range", () => {
      // arrange
      const expected = responsiveRangeData[5];

      // act
      const result = component.dataByRange(15);

      // assert
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
    it("should call with params include chart object have items > 12", () => {
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

      component.isShowFullText = true;
      component.isAutoResponsive = true;
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
      const padding = { bottom: 40, left: 144, right: 144, top: 40 };
      // act
      component.resizeChart(size.width, dataInput.chart);

      // assert
      expect(dataInput.chart.options.layout.padding).toEqual(padding);
      expect(dataInput.chart.options.plugins.datalabels.font.size).toEqual(16);
      expect(dataInput.chart.options.maintainAspectRatio).toBe(false);
      expect(dataInput.chart.options.scales.y.ticks).toEqual({
        display: false,
      });
      expect(dataInput.chart.options.scales.y.grid.drawTicks).toBe(false);
    });

    it("should call with params without chart object", () => {
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

      const size = {
        width: 720,
        height: 456,
      };

      const expectedPadding = {
        bottom: 40,
        left: 144,
        right: 144,
        top: 40,
      };
      const font = { family: '"Roboto", sans-serif', size: 16, weight: 500 };
      // act
      component.resizeChart(size.width);

      // assert
      expect(component.chartOptions.layout.padding).toEqual(expectedPadding);
      expect(component.chartOptions.plugins.datalabels.font).toEqual(font);
    });
  });

  describe("should call autoPaddingMaxWidthLabel", () => {
    it("it return success", () => {
      expect(component.autoPaddingMaxWidthLabel(1, 2, 3, 4)).toEqual(-7);
    });
  });
});
