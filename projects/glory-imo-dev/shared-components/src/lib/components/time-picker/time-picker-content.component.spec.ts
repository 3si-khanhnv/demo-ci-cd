import { Injectable } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { MatOptionModule } from "@angular/material/core";
import moment from "moment";
import { TimePickerContentComponent } from "./time-picker-content.component";
import { MomentDateTimeAdapter } from "./time-picker.adapter";

@Injectable()
export class MockMomentDateTimeAdapter extends MomentDateAdapter {
  public getHour(): number {
    return;
  }
  public getMinute(): number {
    return;
  }
  public compareTime(): number {
    return;
  }
  public sameTime(): boolean {
    return;
  }
}

describe(TimePickerContentComponent.name, () => {
  let component: TimePickerContentComponent;
  let fixture: ComponentFixture<TimePickerContentComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [TimePickerContentComponent],
      imports: [MatOptionModule],
      providers: [MomentDateTimeAdapter],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerContentComponent);
    component = fixture.componentInstance;
    component.timePicker = TestBed.inject(MomentDateTimeAdapter) as any;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should set array", () => {
      // arrange
      const expected = [moment([2017])];
      component["setTime"] = jest.fn(() => expected);
      // act
      component.ngOnInit();
      // assert
      expect(component.items).toEqual(expected);
    });
  });

  describe("initKeyManager", () => {
    it("should call setActiveItem with selected", () => {
      // arrange
      const expected = 10;
      component.ngOnInit();
      component.timePicker.selected = component.items[expected];
      // act
      component.ngAfterViewInit();
      const active = component.keyManager.activeItemIndex;
      // assert
      expect(component.timePicker.selected).toBeTruthy();
      expect(active).toEqual(expected);
    });
  });

  describe("onSelect", () => {
    it("should set array", () => {
      // arrange
      const expected = moment([2018]);
      // assert
      component.selected.subscribe({
        next: (value) => expect(value).toEqual(expected),
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onSelect(expected);
    });
  });

  describe("setTime", () => {
    it("should set time list", () => {
      // arrange
      const minHour = 0;
      const maxHour = 23;
      const minuteList = [0, 30];
      const expected = [];
      for (let hour = minHour; hour < maxHour + 1; hour++) {
        for (const minute of minuteList) {
          expected.push(moment({ hour, minute }));
        }
      }
      // act
      const prop = component["setTime"]();
      // assert
      expect(prop).toEqual(expected);
    });

    it("should set time with minTime(minute > 30)", () => {
      // arrange
      jest.spyOn(component, "minTime", "get").mockReturnValue(moment({ hour: 11, minute: 31 }));
      const expected = [];
      const minuteList = [0, 30];
      for (let hour = 12; hour < 24; hour++) {
        for (const minute of minuteList) {
          expected.push(moment({ hour, minute }));
        }
      }
      // act
      const actual = component["setTime"]();
      // assert
      expect(actual).toEqual(expected);
    });

    it("should not update minMinute with minMinute lower than 30", () => {
      // arrange
      jest.spyOn(component, "minTime", "get").mockReturnValue(moment({ hour: 11, minute: 29 }));
      const expected = [];
      const minuteList = [0, 30];
      expected.push(moment({ hour: 11, minute: 30 }));
      for (let hour = 12; hour < 24; hour++) {
        for (const minute of minuteList) {
          expected.push(moment({ hour, minute }));
        }
      }
      // act
      const actual = component["setTime"]();
      // assert
      expect(actual).toEqual(expected);
    });

    it("should set time with maxTime(minute > 0)", () => {
      // arrange
      jest.spyOn(component, "maxTime", "get").mockReturnValue(moment({ hour: 11, minute: 3 }));
      const expected = [];
      const minuteList = [0, 30];
      for (let hour = 0; hour < 11; hour++) {
        for (const minute of minuteList) {
          expected.push(moment({ hour, minute }));
        }
      }
      expected.push(moment({ hour: 11, minute: 0 }));
      // act
      const actual = component["setTime"]();
      // assert
      expect(actual).toEqual(expected);
    });

    it("should not update maxTime with maxMinute equal 0", () => {
      // arrange
      jest.spyOn(component, "maxTime", "get").mockReturnValue(moment({ hour: 11, minute: 0 }));
      const expected = [];
      const minuteList = [0, 30];
      for (let hour = 0; hour < 11; hour++) {
        for (const minute of minuteList) {
          expected.push(moment({ hour, minute }));
        }
      }
      expected.pop();
      // act
      const actual = component["setTime"]();
      // assert
      expect(actual).toEqual(expected);
    });
  });
});
