import { OnInit, Component, Output, EventEmitter, ViewChildren, AfterViewInit, QueryList, Optional } from "@angular/core";
import { FocusKeyManager } from "@angular/cdk/a11y";

import { Moment, isMoment } from "moment";
import moment from "moment";

import { MomentDateTimeAdapter } from "./time-picker.adapter";
import { TimePickerComponent } from "./time-picker.component";
import { MatOption } from "@angular/material/core";

@Component({
  selector: "imo-time-picker-content",
  templateUrl: "./time-picker-content.component.html",
  styleUrls: ["./time-picker-content.component.scss"],
})
export class TimePickerContentComponent implements OnInit, AfterViewInit {
  // Dialog & Popup
  @Output() selected = new EventEmitter<Moment>();
  @ViewChildren("option") matOptions: QueryList<MatOption>;

  get timePicker(): TimePickerComponent {
    return this.timePickerInstance;
  }
  set timePicker(value: TimePickerComponent) {
    this.timePickerInstance = value;
  }
  private timePickerInstance: TimePickerComponent;
  public items: Moment[];

  public keyManager: FocusKeyManager<MatOption>;

  get minTime(): Moment | null {
    return this.timePicker && this.timePicker.minTime;
  }

  get maxTime(): Moment | null {
    return this.timePicker && this.timePicker.maxTime;
  }

  constructor(@Optional() public timeAdapter: MomentDateTimeAdapter) {}

  ngOnInit() {
    this.items = this.setTime();
  }

  ngAfterViewInit(): void {
    this.initKeyManager();
  }

  private initKeyManager() {
    this.keyManager = new FocusKeyManager<MatOption>(this.matOptions).withWrap();
    if (this.timePicker.selected) {
      return this.keyManager.setActiveItem(this.items.findIndex((option) => this.timeAdapter.sameTime(option, this.timePicker.selected)));
    }
    this.keyManager.setFirstItemActive();
  }

  public onSelect(time: Moment) {
    this.selected.emit(time);
  }

  private setTime(): Array<Moment> {
    const timeSteps = [];
    let minMinute = 0;
    let minHour = 0;
    let maxMinute = 60;
    let maxHour = 24;

    // Minutes per step per hour
    const minStep = 30;

    // Updating minimum hour/minute limited
    if (isMoment(this.minTime)) {
      minMinute = this.timeAdapter.getMinute(this.minTime);
      minHour = this.timeAdapter.getHour(this.minTime);
      if (minMinute > 30) {
        minHour++;
        minMinute = 0;
      }
    }

    // Updating maximum hour/minute limited
    if (isMoment(this.maxTime)) {
      maxMinute = this.timeAdapter.getMinute(this.maxTime);
      maxHour = this.timeAdapter.getHour(this.maxTime);
      if (maxMinute > 0) {
        maxHour++;
      }
    }

    // Generating time steps for drop down list
    for (let hour = minHour; hour < maxHour; hour++) {
      // Looping and make sure steps limited minutes per hour (default: 30 mins)
      for (let minute = 0; minute < 60; minute += minStep) {
        if ((hour !== minHour || minute >= minMinute) && (hour !== maxHour - 1 || minute <= maxMinute)) {
          timeSteps.push(moment({ hour, minute }));
        }
      }
    }
    return timeSteps;
  }
}
