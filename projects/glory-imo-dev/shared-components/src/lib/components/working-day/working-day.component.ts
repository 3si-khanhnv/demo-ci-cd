import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { convertToString } from "../../utilities/common";
import { OptionValue } from "../checkbox-list/checkbox-list.component.i";
import { WorkingDay, WorkingDayValue } from "./working-day.component.i";

@Component({
  selector: "imo-working-day",
  templateUrl: "./working-day.component.html",
  styleUrls: ["./working-day.component.scss"],
})
export class WorkingDayComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  @Input() checkbox = true;
  @Input() config: { [key: string]: any } = {
    maxLength: 2,
  };
  @Input() data: WorkingDay;
  @Output() checked = new EventEmitter<{ [key: string]: WorkingDayValue }>();

  onCheckedDate(event: OptionValue) {
    if (event) {
      this.data.checkbox.checked = event.value;
      this.onDataChanged();
    }

    event?.value ? this.data.input.enable({ emitEvent: false }) : this.data.input.disable({ emitEvent: false });
  }

  onDataChanged() {
    const workingDay: { [key: string]: WorkingDayValue } = {
      [this.data.checkbox.value]: {
        isWorking: this.data.checkbox.checked || false,
        leadDays: Number(this.data.input.value),
      },
    };

    this.checked.emit(workingDay);
  }

  ngOnInit() {
    this.subscription = this.data.input.valueChanges
      .pipe(map((value) => this.validateInputFormat(value)))
      .subscribe(() => this.onDataChanged());

    if (this.checkbox) {
      this.data.checkbox.checked ? this.data.input.enable({ emitEvent: false }) : this.data.input.disable({ emitEvent: false });
    }
  }

  validateInputFormat(value: string): string {
    const formattedValue: string = convertToString((value || "").toString().slice(0, this.config.maxLength), true);
    const patchedValue: string = formattedValue === "" ? "0" : formattedValue;

    if (value.charAt(0) === "0" || formattedValue.charAt(0) === "" || value.length > this.config.maxLength || !/^\d*$/gi.test(value)) {
      this.data.input.patchValue(patchedValue, { emitEvent: false });
    }

    return patchedValue;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
