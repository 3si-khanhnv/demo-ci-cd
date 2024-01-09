import { Injectable } from "@angular/core";
import { MatDateFormats } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { Moment } from "moment";

@Injectable()
export class MomentDateTimeAdapter extends MomentDateAdapter {
  public getHour(date: Moment): number {
    return this.clone(date).hour();
  }
  public getMinute(date: Moment): number {
    return this.clone(date).minute();
  }
  public compareTime(first: Moment, second: Moment): number {
    return this.getHour(first) - this.getHour(second) || this.getMinute(first) - this.getMinute(second);
  }
  public sameTime(first: Moment | null, second: Moment | null): boolean {
    if (first && second) {
      return !this.compareTime(first, second);
    }

    // tslint:disable-next-line: triple-equals
    return first == second;
  }
}

export const TIME_PICKER_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: "hh:mm A",
  },
  display: {
    dateInput: "hh:mm A",
    monthYearLabel: "hh:mm A",
    dateA11yLabel: "hh:mm A",
    monthYearA11yLabel: "hh:mm A",
  },
};
