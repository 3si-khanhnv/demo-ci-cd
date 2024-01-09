import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DateTimePickerComponent } from "./date-time-picker.component";
import { NO_ERRORS_SCHEMA, SimpleChanges } from "@angular/core";
import { DateTimePickerModule } from "./date-time-picker.module";
import moment from "moment";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import dayjs from "dayjs";
import { TranslateModule } from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("DateTimePickerComponent", () => {
  let component: DateTimePickerComponent;
  let fixture: ComponentFixture<DateTimePickerComponent>;
  const timeItems = [
    {
      label: "00:00",
      value: "00:00",
    },
    {
      label: "00:30",
      value: "00:30",
    },
    {
      label: "01:00",
      value: "01:00",
    },
    {
      label: "01:30",
      value: "01:30",
    },
    {
      label: "02:00",
      value: "02:00",
    },
    {
      label: "02:30",
      value: "02:30",
    },
    {
      label: "03:00",
      value: "03:00",
    },
    {
      label: "03:30",
      value: "03:30",
    },
    {
      label: "04:00",
      value: "04:00",
    },
    {
      label: "04:30",
      value: "04:30",
    },
    {
      label: "05:00",
      value: "05:00",
    },
    {
      label: "05:30",
      value: "05:30",
    },
    {
      label: "06:00",
      value: "06:00",
    },
    {
      label: "06:30",
      value: "06:30",
    },
    {
      label: "07:00",
      value: "07:00",
    },
    {
      label: "07:30",
      value: "07:30",
    },
    {
      label: "08:00",
      value: "08:00",
    },
    {
      label: "08:30",
      value: "08:30",
    },
    {
      label: "09:00",
      value: "09:00",
    },
    {
      label: "09:30",
      value: "09:30",
    },
    {
      label: "10:00",
      value: "10:00",
    },
    {
      label: "10:30",
      value: "10:30",
    },
    {
      label: "11:00",
      value: "11:00",
    },
    {
      label: "11:30",
      value: "11:30",
    },
    {
      label: "12:00",
      value: "12:00",
    },
    {
      label: "12:30",
      value: "12:30",
    },
    {
      label: "13:00",
      value: "13:00",
    },
    {
      label: "13:30",
      value: "13:30",
    },
    {
      label: "14:00",
      value: "14:00",
    },
    {
      label: "14:30",
      value: "14:30",
    },
    {
      label: "15:00",
      value: "15:00",
    },
    {
      label: "15:30",
      value: "15:30",
    },
    {
      label: "16:00",
      value: "16:00",
    },
    {
      label: "16:30",
      value: "16:30",
    },
    {
      label: "17:00",
      value: "17:00",
    },
    {
      label: "17:30",
      value: "17:30",
    },
    {
      label: "18:00",
      value: "18:00",
    },
    {
      label: "18:30",
      value: "18:30",
    },
    {
      label: "19:00",
      value: "19:00",
    },
    {
      label: "19:30",
      value: "19:30",
    },
    {
      label: "20:00",
      value: "20:00",
    },
    {
      label: "20:30",
      value: "20:30",
    },
    {
      label: "21:00",
      value: "21:00",
    },
    {
      label: "21:30",
      value: "21:30",
    },
    {
      label: "22:00",
      value: "22:00",
    },
    {
      label: "22:30",
      value: "22:30",
    },
    {
      label: "23:00",
      value: "23:00",
    },
    {
      label: "23:30",
      value: "23:30",
    },
  ];
  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [DateTimePickerModule, SvgIconModule, TranslateModule.forRoot(), BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimePickerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("form invalid when empty Date From", () => {
    component.dateTimeFormControl.patchValue(new Date());
    expect(component.dateTimeFormControl.valid).toBeTruthy();
  });

  describe("ngOnChanges", () => {
    it("should change defaultDate is dayjs and type !== dateTimeSelect and isFirstChange", () => {
      // arrange
      component.showSeconds = false;
      component.disabled = true;
      const date = dayjs();
      const change: SimpleChanges = {
        defaultDate: {
          currentValue: date,
          firstChange: true,
          isFirstChange: () => true,
          previousValue: null,
        },
      };

      //act
      component.toDayjs(change.defaultDate.currentValue);
      const sy = jest.spyOn(component.dateTimeFormControl, "setValue");
      component.ngOnChanges(change);

      // assert
      expect(sy).toBeCalledWith(date);
    });

    it("should change defaultDate is dayjs and type === dateTimeSelect and isFirstChange", () => {
      // arrange
      component.showSeconds = false;
      component.type = "dateTimeSelect";
      const date = dayjs();
      const change: SimpleChanges = {
        defaultDate: {
          currentValue: date,
          firstChange: true,
          isFirstChange: () => true,
          previousValue: null,
        },
      };
      component.toDayjs(change.defaultDate.currentValue);
      const sy = jest.spyOn(component.dateFormControl, "setValue");
      const sy1 = jest.spyOn(component.dateTimeFormControl, "setValue");
      component.ngOnChanges(change);
      expect(sy).toBeCalledWith(date);
      // arrange
      expect(sy1).toBeCalledWith(date);
    });

    it("should change defaultDate is moment", () => {
      // arrange
      component.showSeconds = false;
      const date = moment();
      const exp = dayjs(date.toISOString());
      const change: SimpleChanges = {
        defaultDate: {
          currentValue: date,
          firstChange: true,
          isFirstChange: () => true,
          previousValue: null,
        },
      };

      //act
      component.toDayjs(change.defaultDate.currentValue);
      const sy = jest.spyOn(component.dateTimeFormControl, "setValue");
      component.ngOnChanges(change);

      // assert
      expect(sy).toBeCalledWith(exp);
    });

    it("should change defaultDate is string", () => {
      // arrange
      component.showSeconds = false;
      const date = "2023-03-29T06:56:46.963Z";
      const exp = dayjs(date);
      const change: SimpleChanges = {
        defaultDate: {
          currentValue: date,
          firstChange: true,
          isFirstChange: () => true,
          previousValue: null,
        },
      };

      //act
      component.toDayjs(change.defaultDate.currentValue);
      const sy = jest.spyOn(component.dateTimeFormControl, "setValue");
      component.ngOnChanges(change);

      // assert
      expect(sy).toBeCalledWith(exp);
    });
  });

  describe("handleDateChange", () => {
    it("change date have a day ", () => {
      // arrange
      const date = dayjs();
      component.dateFormControl.patchValue(date);
      jest.spyOn(component.datePickerChange, "emit");
      // act
      component.handleDateChange(date);
      fixture.detectChanges();
      // assert
      expect(component.dateFormControl.valid).toBe(true);
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("change date haven't a day", () => {
      // arrange
      const date = moment();
      component.dateFormControl.patchValue(date);
      jest.spyOn(component.datePickerChange, "emit");
      // act
      component.handleDateChange(date as any);
      fixture.detectChanges();
      // assert
      expect(component.dateFormControl.valid).toBe(true);
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleDateTimeChange", () => {
    it("change date time have a day", () => {
      // arrange
      const date = dayjs();
      jest.spyOn(component.datePickerChange, "emit");
      // act
      component.handleDateTimeChange(date);
      fixture.detectChanges();

      // assert
      expect(component.dateFormControl.valid).toBe(true);
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("change date time haven't a day", () => {
      // arrange
      const date = new Date();
      jest.spyOn(component.datePickerChange, "emit");
      // act
      component.handleDateTimeChange(date as any);
      fixture.detectChanges();

      // assert
      expect(component.dateFormControl.valid).toBe(true);
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleBlurSearch", () => {
    it("search selectedTimeItem with value = '' ", () => {
      // arrange
      const value = "";
      component.valueSelectTime = "23:00";
      component.timeItems = timeItems;
      component.formatClient.timeFormat = "HH:mm";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search selectedTimeItem with choice time", () => {
      // arrange
      const value = "23:00";
      component.timeItems = timeItems;
      component._selectedTimeItem = "23:00";
      component.formatClient.timeFormat = "HH:mm";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search with enter time format > two length", () => {
      // arrange
      const value = "4444444";
      component.timeItems = timeItems;
      component._selectedTimeItem = "04:44";
      component.formatClient.timeFormat = "h:mm A";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search with enter time includes PM", () => {
      // arrange
      const value = "11PM";
      component.timeItems = timeItems;
      component._selectedTimeItem = "23:00";
      component.formatClient.timeFormat = "HH:mm";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search with enter time includes AM", () => {
      // arrange
      const value = "11AM";
      component.timeItems = timeItems;
      component._selectedTimeItem = "11:00";
      component.formatClient.timeFormat = "HH:mm";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search with format indexOf(.)", () => {
      // arrange
      const value = "23.00";
      component.timeItems = timeItems;
      component._selectedTimeItem = "23.00";
      component.formatClient.timeFormat = "HH.mm";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search with format indexOf(;)", () => {
      // arrange
      const value = "23;00";
      component.timeItems = timeItems;
      component._selectedTimeItem = "23;00";
      component.formatClient.timeFormat = "HH;mm";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search with format indexOf(,)", () => {
      // arrange
      const value = "01";
      component.timeItems = timeItems;
      component._selectedTimeItem = "01,01";
      component.formatClient.timeFormat = "HH,mm";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search selectedTimeItem with Number onlyNumber.replace 0 === 24 and index = 0 and index = 1 = 24", () => {
      // arrange
      const value = "2400";
      component.timeItems = timeItems;
      component._selectedTimeItem = "02:40";
      component.formatClient.timeFormat = "HH:mm";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search selectedTimeItem with Number onlyNumber.replace 0 === 24 and index = 0, index = 1 = 24, index = 2 > 0", () => {
      // arrange
      const value = "2410";
      component.timeItems = timeItems;
      component._selectedTimeItem = "02:41";
      component.formatClient.timeFormat = "HH:mm";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search selectedTimeItem with Number of onlyNumber  index = 0 and index = 1 > 24", () => {
      // arrange
      const value = "2510";
      component.timeItems = timeItems;
      component._selectedTimeItem = "02:51";
      component.formatClient.timeFormat = "HH:mm";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search dateTime isValid", () => {
      // arrange
      const value = "25:00";
      component.timeItems = timeItems;
      component._selectedTimeItem = "25:00";
      component.formatClient.dateFormat = "DD/MM/YYYY";
      component.formatClient.timeFormat = "HH:mm";
      component._selectedDateItem = moment();
      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    it("search dateTime with timeDayjs isValid", () => {
      // arrange
      const value = "10 20";
      component.timeItems = timeItems;
      component._logTimeItems = timeItems;
      component._selectedTimeItem = "22:31";
      component.formatClient.dateFormat = "YYYY/MM/DD";
      component.formatClient.timeFormat = "HH:mm";
      component._selectedDateItem = moment();

      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleBlurSearch(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleSelectTime", () => {
    it("select time", () => {
      // arrange
      const value = "23:00";
      component._selectedDateItem = moment();

      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleSelectTime(value);
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleChooseDateTimeSelect", () => {
    it("choose time is not correct format", () => {
      // arrange
      const value = "23:69";
      component._selectedDateItem = moment();
      component._selectedTimeItem = value;

      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleChooseDateTimeSelect();
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });
  });
  describe("handleBlurSearch", () => {
    const inputs24 = [
      {
        time: "00:00",
        export: "00:00",
      },
      {
        time: "1:00",
        export: "01:00",
      },
      {
        time: "2:00",
        export: "02:00",
      },
      {
        time: "3:00",
        export: "03:00",
      },
      {
        time: "15:00",
        export: "15:00",
      },
      {
        time: "1am",
        export: "01:00",
      },
      {
        time: "15am",
        export: "15:00",
      },
      {
        time: "1pm",
        export: "13:00",
      },
      {
        time: "15pm",
        export: "15:00",
      },
      {
        time: "8a",
        export: "08:00",
      },
      {
        time: "8p",
        export: "20:00",
      },
      {
        time: "0.5",
        export: "00:05",
      },
      {
        time: "1.5",
        export: "01:05",
      },
      {
        time: "2.1",
        export: "02:01",
      },
      {
        time: "5.2",
        export: "05:02",
      },
      {
        time: "12.12",
        export: "12:12",
      },
      {
        time: "12.1",
        export: "12:01",
      },
      {
        time: "1620",
        export: "16:20",
      },
      {
        time: "1000",
        export: "10:00",
      },
      {
        time: "1500",
        export: "15:00",
      },
      {
        time: "550",
        export: "05:50",
      },
      {
        time: "2155",
        export: "21:55",
      },
      {
        time: "6666",
        export: "23:30",
      },
    ];
    const inputs12 = [
      {
        time: "00:00",
        export: "12:00 AM",
      },
      {
        time: "1:00",
        export: "1:00 AM",
      },
      {
        time: "2:00",
        export: "2:00 AM",
      },
      {
        time: "3:00",
        export: "3:00 AM",
      },
      {
        time: "15:00",
        export: "3:00 PM",
      },
      {
        time: "1am",
        export: "1:00 AM",
      },
      {
        time: "15am",
        export: "3:00 PM",
      },
      {
        time: "1pm",
        export: "1:00 PM",
      },
      {
        time: "15pm",
        export: "3:00 PM",
      },
      {
        time: "8a",
        export: "8:00 AM",
      },
      {
        time: "8p",
        export: "8:00 PM",
      },
      {
        time: "0.5",
        export: "12:05 AM",
      },
      {
        time: "1.5",
        export: "1:05 AM",
      },
      {
        time: "2.1",
        export: "2:01 AM",
      },
      {
        time: "5.2",
        export: "5:02 AM",
      },
      {
        time: "12.12",
        export: "12:12 PM",
      },
      {
        time: "12.1",
        export: "12:01 PM",
      },
      {
        time: "1620",
        export: "4:20 PM",
      },
      {
        time: "1000",
        export: "10:00 AM",
      },
      {
        time: "1500",
        export: "3:00 PM",
      },
      {
        time: "550",
        export: "5:50 AM",
      },
      {
        time: "2155",
        export: "9:55 PM",
      },
      {
        time: "6666",
        export: "11:30 PM",
      },
      {
        time: "666",
        export: "11:30 PM",
      },
    ];
    it("choose time is not correct format", () => {
      // arrange
      const value = "23:69";
      component._selectedDateItem = moment();
      component._selectedTimeItem = value;

      jest.spyOn(component.datePickerChange, "emit");

      // act
      component.handleChooseDateTimeSelect();
      fixture.detectChanges();

      // assert
      expect(component.datePickerChange.emit).toHaveBeenCalledTimes(1);
    });

    // arrange

    inputs24.forEach((input) => {
      it(`choose 24h time by for format ${input.time} - ${input.export}`, () => {
        // act
        component.formatClient.timeFormat = "HH:mm";
        component.formatClient.dateFormat = "YYY-MM-DD";
        component._timeItems = [
          {
            value: "23:30",
            label: "23:30",
          },
        ];
        component._selectedDateItem = moment();
        component.handleBlurSearch(input.time);
        // assert
        expect(component._selectedTimeItem).toBe(input.export);
      });
    });

    // arrange

    inputs12.forEach((input) => {
      it(`choose time 12h by for format ${input.time} - ${input.export}`, () => {
        component.formatClient.timeFormat = "h:mm A";
        component._selectedDateItem = moment();
        component.formatClient.dateFormat = "YYY-MM-DD";
        component._timeItems = [
          {
            value: "11:30 PM",
            label: "11:30 PM",
          },
        ];
        // act
        component.handleBlurSearch(input.time);
        // assert
        expect(component._selectedTimeItem).toBe(input.export);
      });
    });
  });
});
