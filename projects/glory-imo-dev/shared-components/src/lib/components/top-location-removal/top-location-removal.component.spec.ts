import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";

import { TopLocationRemovalComponent } from "./top-location-removal.component";
import { IDataEmitChart, ILabelColor } from "./top-location-removal.i";
import { TopLocationRemovalModule } from "./top-location-removal.module";

jest.mock("../../../../../../../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js", () => ({
  __esModule: false,
}));

describe("TopLocationRemovalComponent", () => {
  let component: TopLocationRemovalComponent;
  let fixture: ComponentFixture<TopLocationRemovalComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [TopLocationRemovalModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLocationRemovalComponent);
    component = fixture.componentInstance;
    component.titleChart = "Top Location Removals (Week to Date)";
    component.totalValueChart = "11,111,111,111,111.11";
    component.addPaddingResult = {};
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngAfterViewInit", () => {
    it("should subscribe mouse hover event and check return pointer", () => {
      // arrange
      component.isMatchPoint = jest.fn(() => true);
      component.canvasSelectionRange = {
        0: {
          startX: 10,
          endX: 20,
          startY: 10,
          endY: 15,
        },
      };
      const mockCanvasElement = document.createElement("canvas");
      component.chartCanvas = {
        nativeElement: mockCanvasElement,
      };
      const event = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, "offsetX", { value: 15 });
      Object.defineProperty(event, "offsetY", { value: 12 });

      // act
      component.ngAfterViewInit();
      mockCanvasElement.dispatchEvent(event);

      // assert
      expect(component.isMatchPoint).toHaveBeenCalledTimes(1);
    });

    it("should subscribe mouse hover event and check return default", () => {
      // arrange
      component.isMatchPoint = jest.fn();
      component.canvasSelectionRange = {
        0: {
          startX: 10,
          endX: 20,
          startY: 10,
          endY: 15,
        },
      };
      const mockCanvasElement = document.createElement("canvas");
      component.chartCanvas = {
        nativeElement: mockCanvasElement,
      };
      const event = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, "offsetX", { value: 0 });
      Object.defineProperty(event, "offsetY", { value: 0 });

      // act
      component.ngAfterViewInit();
      mockCanvasElement.dispatchEvent(event);

      // assert
      expect(component.isMatchPoint).toHaveBeenCalledTimes(1);
    });

    it("should subscribe mouse hover event and not check when have element return from canvas", () => {
      // arrange
      component.cursor.next("pointer");
      component.isMatchPoint = jest.fn();
      component.canvasSelectionRange = {
        0: {
          startX: 10,
          endX: 20,
          startY: 10,
          endY: 15,
        },
      };
      const mockCanvasElement = document.createElement("canvas");
      component.chartCanvas = {
        nativeElement: mockCanvasElement,
      };

      const event = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, "offsetX", { value: 0 });
      Object.defineProperty(event, "offsetY", { value: 0 });

      // act
      component.ngAfterViewInit();
      mockCanvasElement.dispatchEvent(event);

      // assert
      expect(component.isMatchPoint).not.toHaveBeenCalled();
    });

    it("should subscribe mouse click event and check return data", () => {
      // arrange
      component.isMatchPoint = jest.fn(() => true);
      const spy = jest.spyOn(component.emitDataClick, "emit");

      component.canvasSelectionRange = {
        0: {
          startX: 10,
          endX: 20,
          startY: 10,
          endY: 15,
        },
      };
      const mockCanvasElement = document.createElement("canvas");
      component.chartCanvas = {
        nativeElement: mockCanvasElement,
      };
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, "offsetX", { value: 0 });
      Object.defineProperty(event, "offsetY", { value: 0 });

      // act
      component.ngAfterViewInit();
      mockCanvasElement.dispatchEvent(event);

      // assert
      expect(component.isMatchPoint).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should subscribe mouse click event and not return data", () => {
      // arrange
      component.isMatchPoint = jest.fn();
      const spy = jest.spyOn(component.emitDataClick, "emit");

      component.canvasSelectionRange = {
        0: {
          startX: 10,
          endX: 20,
          startY: 10,
          endY: 15,
        },
      };
      const mockCanvasElement = document.createElement("canvas");
      component.chartCanvas = {
        nativeElement: mockCanvasElement,
      };
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, "offsetX", { value: 0 });
      Object.defineProperty(event, "offsetY", { value: 0 });

      // act
      component.ngAfterViewInit();
      mockCanvasElement.dispatchEvent(event);

      // assert
      expect(component.isMatchPoint).toHaveBeenCalledTimes(1);
      expect(spy).not.toHaveBeenCalled();
    });
  });
  describe("Case test data chart", () => {
    it("should call test data", () => {
      component.data = [
        {
          value: 40,
          label: "Oxford",
          current: "40",
          bgColor: "#E02C33",
          textColor: "white",
        },
        {
          value: 60,
          label: "Dunstable",
          current: "60",
          bgColor: "#5C6061",
          textColor: ["black"],
          textSize: "18px",
        },
      ] as ILabelColor[];

      const expected = {
        color: ["white", "black"],
        font: [
          { family: "Roboto", size: "18px", weight: 500 },
          { family: "Roboto", size: "18px", weight: 500 },
        ],
        rotation: [-18, 342],
      };
      const data = {
        datasets: [
          {
            data: [40, 60],
            backgroundColor: ["#E02C33", "#5C6061"],
            hoverBackgroundColor: ["#E02C33", "#5C6061"],
            borderWidth: 0.4,
            sumValue: 100,
            valuesDisplay: ["40", "60"],
          },
        ],
      };
      expect(component.chartOptions.plugins.datalabels.color).toEqual(expected.color);
      expect(component.chartOptions.plugins.datalabels.font).toEqual(expected.font);
      expect(component.chartOptions.plugins.datalabels.rotation).toEqual(expected.rotation);
      expect(component._data).toEqual(data);
    });

    it("should call set data case show shadow", () => {
      component.data = [
        {
          value: 40,
          label: "Oxford",
          current: "40",
          bgColor: "#E02C33",
          textColor: "black",
        },
        {
          value: 60,
          label: "Dunstable",
          current: "60",
          bgColor: "#5C6061",
          textColor: ["white"],
          textSize: "18px",
        },
      ] as ILabelColor[];

      const expected = {
        color: ["black", "white"],
        font: [
          { family: "Roboto", size: "18px", weight: 500 },
          { family: "Roboto", size: "18px", weight: 500 },
        ],
        rotation: [-18, 342],
      };
      const data = {
        datasets: [
          {
            data: [40, 60],
            backgroundColor: ["#E02C33", "#5C6061"],
            hoverBackgroundColor: ["#E02C33", "#5C6061"],
            borderWidth: 0.4,
            sumValue: 100,
            valuesDisplay: ["40", "60"],
          },
        ],
      };
      expect(component.chartOptions.plugins.datalabels.color).toEqual(expected.color);
      expect(component.chartOptions.plugins.datalabels.font).toEqual(expected.font);
      expect(component.chartOptions.plugins.datalabels.rotation).toEqual(expected.rotation);
      expect(component._data).toEqual(data);
    });

    it("should call test data case isDisableZero", () => {
      component.isDisableZero = true;
      component.data = [
        {
          value: 40,
          label: "Oxford",
          current: "40",
          bgColor: "#E02C33",
        },
        {
          value: 0,
          label: "Dunstable",
          current: "0",
          bgColor: "#5C6061",
          textColor: "black",
          textSize: "18px",
          isDisableZero: true,
        },
      ] as ILabelColor[];

      const expected = {
        color: ["white", "black"],
        font: [
          { family: "Roboto", size: "18px", weight: 500 },
          { family: "Roboto", size: "18px", weight: 500 },
        ],
        rotation: [90, 450],
      };
      const data = {
        datasets: [
          {
            data: [40, 0],
            backgroundColor: ["#E02C33", "#5C6061"],
            hoverBackgroundColor: ["#E02C33", "#5C6061"],
            borderWidth: 0,
            sumValue: 40,
            valuesDisplay: ["40", "0"],
          },
        ],
      };
      expect(component.chartOptions.plugins.datalabels.color).toEqual(expected.color);
      expect(component.chartOptions.plugins.datalabels.font).toEqual(expected.font);
      expect(component.chartOptions.plugins.datalabels.rotation).toEqual(expected.rotation);
      expect(component._data).toEqual(data);
    });

    it("should call test data when countValueSmallValue ==1", () => {
      component.data = [
        {
          value: 4,
          label: "Oxford",
          current: "4",
          bgColor: "#E02C33",
        },
        {
          value: 400,
          label: "Oxford",
          current: "400",
          bgColor: "#E02C33",
        },
        {
          value: 600,
          label: "Dunstable",
          current: "600",
          bgColor: "#5C6061",
          textColor: "black",
          textSize: "18px",
        },
      ] as ILabelColor[];

      const data = {
        datasets: [
          {
            data: [4, 400, 600],
            backgroundColor: ["#E02C33", "#E02C33", "#5C6061"],
            hoverBackgroundColor: ["#E02C33", "#E02C33", "#5C6061"],
            borderWidth: 0.4,
            sumValue: 1004,
            valuesDisplay: ["4", "400", "600"],
          },
        ],
      };
      expect(component._data).toEqual(data);
    });

    it("should call test data when countValueSmallValue ==4", () => {
      component.data = [
        {
          value: 3,
          label: "Oxford",
          current: "3",
          bgColor: "#E02C33",
        },
        {
          value: 2,
          label: "Oxford",
          current: "2",
          bgColor: "#E02C33",
        },
        {
          value: 1,
          label: "Oxford",
          current: "1",
          bgColor: "#E02C33",
        },
        {
          value: 4,
          label: "Oxford",
          current: "4",
          bgColor: "#E02C33",
        },
        {
          value: 400,
          label: "Oxford",
          current: "400",
          bgColor: "#E02C33",
        },
        {
          value: 600,
          label: "Dunstable",
          current: "600",
          bgColor: "#5C6061",
          textColor: "black",
          textSize: "18px",
        },
      ] as ILabelColor[];

      const data = {
        datasets: [
          {
            data: [3, 2, 1, 4, 400, 600],
            backgroundColor: ["#E02C33", "#E02C33", "#E02C33", "#E02C33", "#E02C33", "#5C6061"],
            hoverBackgroundColor: ["#E02C33", "#E02C33", "#E02C33", "#E02C33", "#E02C33", "#5C6061"],
            borderWidth: 0.4,
            sumValue: 1010,
            valuesDisplay: ["3", "2", "1", "4", "400", "600"],
          },
        ],
      };
      expect(component._data).toEqual(data);
    });
    it("should call test data when countValueSmallValue >4", () => {
      component.data = [
        {
          value: 5,
          label: "Oxford",
          current: "5",
          bgColor: "#E02C33",
        },
        {
          value: 3,
          label: "Oxford",
          current: "3",
          bgColor: "#E02C33",
        },
        {
          value: 2,
          label: "Oxford",
          current: "2",
          bgColor: "#E02C33",
        },
        {
          value: 1,
          label: "Oxford",
          current: "1",
          bgColor: "#E02C33",
        },
        {
          value: 4,
          label: "Oxford",
          current: "4",
          bgColor: "#E02C33",
        },
        {
          value: 400,
          label: "Oxford",
          current: "400",
          bgColor: "#E02C33",
        },
        {
          value: 600,
          label: "Dunstable",
          current: "600",
          bgColor: "#5C6061",
          textColor: "black",
          textSize: "18px",
        },
      ] as ILabelColor[];

      const data = {
        datasets: [
          {
            data: [5, 3, 2, 1, 4, 400, 600],
            backgroundColor: ["#E02C33", "#E02C33", "#E02C33", "#E02C33", "#E02C33", "#E02C33", "#5C6061"],
            hoverBackgroundColor: ["#E02C33", "#E02C33", "#E02C33", "#E02C33", "#E02C33", "#E02C33", "#5C6061"],
            borderWidth: 0.4,
            sumValue: 1015,
            valuesDisplay: ["5", "3", "2", "1", "4", "400", "600"],
          },
        ],
      };
      expect(component._data).toEqual(data);
    });
    it("should call test data when sumValue = 0", () => {
      component.data = [
        {
          value: 0,
          label: "Oxford",
          current: "0",
          bgColor: "#E02C33",
          baseBgColor: "#E7EAF2",
        },
        {
          value: 0,
          label: "Dunstable",
          current: "0",
          bgColor: "#5C6061",
          textColor: "black",
          textSize: "18px",
        },
      ] as ILabelColor[];

      const expected = {
        color: ["white", "black"],
        font: [
          { family: "Roboto", size: "18px", weight: 500 },
          { family: "Roboto", size: "18px", weight: 500 },
        ],
        rotation: [],
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        hover: {
          mode: null,
        },
        animation: {
          animateRotate: false,
        },
      };

      const data = {
        datasets: [
          {
            data: [1],
            backgroundColor: "#E7EAF2",
            hoverBackgroundColor: "#E7EAF2",
            borderWidth: 0,
            sumValue: 0,
            valuesDisplay: ["0", "0"],
          },
        ],
      };
      expect(component.chartOptions.plugins.datalabels.color).toEqual(expected.color);
      expect(component.chartOptions.plugins.datalabels.font).toEqual(expected.font);
      expect(component.chartOptions.plugins.datalabels.rotation).toEqual(expected.rotation);
      expect(component.chartOptions.plugins.tooltip.enabled).toEqual(expected.tooltip.enabled);
      expect(component.chartOptions.plugins.legend.display).toEqual(expected.legend.display);
      expect(component.chartOptions.hover).toEqual(expected.hover);
      expect(component.chartOptions.animation).toEqual(expected.animation);
      expect(component._data).toEqual(data);
    });

    it("should call test data when data length is 1", () => {
      component.data = [
        {
          value: 100,
          label: "Oxford",
          current: "100.00",
          bgColor: "#E02C33",
          baseBgColor: "#E7EAF2",
        },
      ] as ILabelColor[];

      expect(component._data.datasets[0].borderWidth).toEqual(0);
    });

    it("should call handleFormatLabels return value", () => {
      component.tempData = [
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
        {
          value: 11111111111,
          label: "Dunstable",
          current: "11,111,111,111",
          bgColor: "#5C6061",
          textColor: "black",
          textSize: "18px",
        },
      ] as ILabelColor[];

      const context = {
        dataset: {
          sumValue: 500,
        },
      };
      const result = component.handleFormatLabels(11111111111, context);
      expect(result).toEqual("11,111,111,111");
    });
    it("should call handleFormatLabels return string empty", () => {
      component.tempData = [
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
        {
          value: 0,
          label: "Dunstable",
          current: "0.00",
          bgColor: "#5C6061",
          textColor: "black",
          textSize: "18px",
        },
      ] as ILabelColor[];

      const context = {
        dataset: {
          sumValue: 500,
        },
      };
      const result = component.handleFormatLabels(0, context);
      expect(result).toEqual("");
    });
    it("should call handleFormatLabels return empty", () => {
      component.tempData = [
        {
          value: 40,
          label: "Oxford",
          current: "40",
          bgColor: "#E02C33",
        },
      ] as ILabelColor[];
      const context = {
        dataset: {
          sumValue: 500,
        },
      };
      const result = component.handleFormatLabels(0, context);
      expect(result).toEqual("");
    });

    it("should call onHover and click chart", (done) => {
      const spy = jest.spyOn(component.emitDataClick, "emit");

      component.data = [
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
          value: 40,
          label: "Oxford",
          current: "40",
          bgColor: "#E02C33",
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

      //assert
      expect(spy).not.toHaveBeenCalledWith(mockData);
    });

    it("should draw title chart", () => {
      const spy = jest.spyOn(component.doughnutChartPlugins, "beforeDraw");

      // arrange
      const chartPram = {
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
        },
      };

      component.doughnutChartPlugins.beforeDraw(chartPram as any, {}, null);

      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("should be emit data", (done) => {
      const spy = jest.spyOn(component.emitDataClick, "emit");

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

      component.labelClick(0);

      //assert
      expect(spy).toHaveBeenCalledWith(mockData);
    });

    it("should calc padding before draw line", () => {
      // arrange
      const mockCanvasElement = document.createElement("canvas");
      mockCanvasElement.getContext = jest.fn(() => {
        return {
          drawImage: jest.fn(),
          font: "500 20px Roboto",
          color: "#3B475F",
          fillText: jest.fn(),
          beginPath: jest.fn(),
          moveTo: jest.fn(),
          fill: jest.fn(),
          lineTo: jest.fn(),
          stroke: jest.fn(),
          measureText: jest.fn(() => 20),
        } as any;
      });
      jest.spyOn(document, "createElement").mockReturnValueOnce(mockCanvasElement);

      component.data = [
        {
          value: 40,
          label: "Oxford",
          current: "40.00",
          bgColor: "#E02C33",
        },
        {
          value: 1,
          label: "Dunstable",
          current: "1.00",
          bgColor: "#5C6061",
        },
      ] as ILabelColor[];

      const data = {
        datasets: [
          {
            data: [40, 1],
            backgroundColor: ["#E02C33", "#5C6061"],
            hoverBackgroundColor: ["#E02C33", "#5C6061"],
            borderWidth: 0.4,
            sumValue: 41,
            valuesDisplay: ["40.00", "1.00"],
          },
        ],
      };

      expect(component._data).toEqual(data);
    });
  });

  describe("addPaddingIndex", () => {
    it("should add current padding to object by index (case side right or top)", () => {
      // arrange
      const diameter = 400;
      const index = 1;
      const paddingXY = {
        x: 450,
        y: -50,
      };
      const expected = {
        top: 50,
        bottom: 0,
        left: 0,
        right: 50,
      };

      // act
      component.addPaddingIndex(index, paddingXY.x, paddingXY.y, diameter);

      // assert
      expect(component.addPaddingResult[index]).toStrictEqual(expected);
    });

    it("should add current padding to object by index (case side left or bottom)", () => {
      // arrange
      const diameter = 400;
      const index = 1;
      const paddingXY = {
        x: -50,
        y: 450,
      };
      const expected = {
        top: 0,
        bottom: 50,
        left: 50,
        right: 0,
      };

      // act
      component.addPaddingIndex(index, paddingXY.x, paddingXY.y, diameter);

      // assert
      expect(component.addPaddingResult[index]).toStrictEqual(expected);
    });
  });

  describe("calcPadding", () => {
    it("should return max padding by side of all index", () => {
      // arrange
      component.addPaddingResult = {
        "1": {
          top: 2,
          bottom: 0,
          left: 3,
          right: 1,
        },
        "2": {
          top: 1,
          bottom: 1,
          left: 1,
          right: 1,
        },
      };

      const expected = {
        top: 2,
        bottom: 1,
        left: 3,
        right: 1,
      };

      // act
      const calcPadding = component.calcPadding();

      // assert
      expect(calcPadding).toStrictEqual(expected);
    });
  });

  describe("calcAddYValue", () => {
    it("should return result add padding Y when item hidden same region in circle", () => {
      // arrange
      const percentArrayValue = [10, 1, 100, 1, 1, 1, 1, 1, 1, 1];

      const expected = { "1": 0, "3": 0, "4": 25, "5": 50, "6": 75, "7": 100, "8": 125, "9": 150 };

      // act
      const calcAddYValue = component.calcAddYValue(percentArrayValue);

      // assert
      expect(calcAddYValue).toStrictEqual(expected);
    });

    it("should return result add padding Y when item hidden same region and near before region (1 and 5)", () => {
      // arrange
      const percentArrayValue = [1, 10, 1, 1, 1, 1, 1, 1, 1, 1];

      const expected = { "0": 200, "2": 175, "3": 150, "4": 125, "5": 100, "6": 75, "7": 50, "8": 25, "9": 0 };

      // act
      const calcAddYValue = component.calcAddYValue(percentArrayValue);

      // assert
      expect(calcAddYValue).toStrictEqual(expected);
    });

    it("should return result add padding Y when item hidden same region and near before region (4 and 8)", () => {
      // arrange
      const percentArrayValue = [0.185, 0.185, 37.03, 0.185, 0.185, 0.185, 0.185, 0.185, 61.11, 0.185, 0.185, 0.185];

      const expected = { "0": 25, "1": 0, "3": 0, "4": 25, "5": 50, "6": 75, "7": 100, "9": 0, "10": 25, "11": 50 };

      // act
      const calcAddYValue = component.calcAddYValue(percentArrayValue);

      // assert
      expect(calcAddYValue).toStrictEqual(expected);
    });
  });

  describe("afterDraw ", () => {
    it("should draw line after add padding", () => {
      // arrange

      const percentArrayValue = [94, 1, 2, 2];
      component.percentArrayValue = percentArrayValue;

      const padding = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      };

      const spyPadding = jest.spyOn(component.outPadding, "emit");

      const chartParam = {
        options: {
          layout: {
            padding: padding,
          },
        },
        chartArea: {
          left: 10,
          right: 400,
          top: 10,
          bottom: 400,
          width: 400,
          height: 400,
        },
        ctx: {
          drawImage: jest.fn(),
          font: "500 20px Roboto",
          color: "#3B475F",
          fillText: jest.fn(),
          beginPath: jest.fn(),
          moveTo: jest.fn(),
          fill: jest.fn(),
          lineTo: jest.fn(),
          stroke: jest.fn(),
          measureText: jest.fn(() => 20),
        },
        _metasets: [
          {
            data: [
              {
                x: 50,
                y: 5,
              },
              {
                x: 7,
                y: 7,
              },
            ],
          },
        ],
        data: {
          datasets: [
            {
              data: percentArrayValue,
              valuesDisplay: ["95.00", "1.00", "2.00", "2.00"],
            },
          ],
        },
        getDatasetMeta: jest.fn(() => {
          return {
            data: [
              {
                tooltipPosition: () => {
                  return {
                    x: 0,
                    y: 0,
                  };
                },
              },
              {
                tooltipPosition: () => {
                  return {
                    x: 450,
                    y: 200,
                  };
                },
              },
              {
                tooltipPosition: () => {
                  return {
                    x: 200,
                    y: 450,
                  };
                },
              },
              {
                tooltipPosition: () => {
                  return {
                    x: 0,
                    y: 0,
                  };
                },
              },
            ],
          };
        }),
        clear: jest.fn(),
        draw: jest.fn(),
        resize: jest.fn(),
      };

      // act
      component.afterDraw(chartParam as any);

      // assert
      expect(spyPadding).toHaveBeenCalled();
    });
  });

  describe("isMatchPoint", () => {
    it("should return true if point match in range", () => {
      const x = 10;
      const y = 10;

      const startX = 0;
      const endX = 20;
      const startY = 5;
      const endY = 15;

      // act
      const expected = component.isMatchPoint(x, y, startX, endX, startY, endY);

      // assert
      expect(expected).toBe(true);
    });

    it("should return false if point match in range", () => {
      const x = 0;
      const y = 0;

      const startX = 0;
      const endX = 20;
      const startY = 5;
      const endY = 15;

      // act
      const expected = component.isMatchPoint(x, y, startX, endX, startY, endY);

      // assert
      expect(expected).toBe(false);
    });
  });
});
