import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import dayjs, { Dayjs } from "dayjs";
import moment, { Moment } from "moment";

import { DayjsDateAdapter } from "../../utilities/dayjs-date-adapter";
import { Labels } from "./date-picker.component.i";
import { confClientFormats } from "../../services/config/config.service";

@Component({
  selector: "imo-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"],
})
export class DatePickerComponent implements OnChanges {
  private isMomentLegacy = false;
  toDayjs(value: string | Dayjs | Moment): Dayjs {
    if (moment.isMoment(value)) {
      this.isMomentLegacy = moment.isMoment(value);
      return dayjs(value.toISOString());
    }
    if (dayjs.isDayjs(value)) return value;
    if (typeof value === "string") return dayjs(value);
  }

  @Input() required: boolean;
  @Input() isDisable: boolean;
  @Input() limitEmit = true;
  @Input() stopProp = false;
  @Input() isReadonly = true;

  @Input() showShortName = false;

  @Input() dateFormat = confClientFormats.dateFormat;

  private min: Dayjs;
  private max: Dayjs;
  @Input()
  set start(value: Dayjs | Moment | string) {
    this.min = this.toDayjs(value);

    if (this.limitEmit) {
      setTimeout(() => {
        this.selectedDate.emit(this.formControl.errors ? null : this.value);
      });
    }
  }

  get start() {
    return this.min;
  }

  @Input()
  set end(value: Dayjs) {
    this.max = this.toDayjs(value);

    if (this.limitEmit) {
      setTimeout(() => {
        this.selectedDate.emit(this.formControl.errors ? null : this.value);
      });
    }
  }
  get end(): Dayjs {
    return this.max;
  }

  private _default: Dayjs;
  @Input() set default(value: Dayjs | Moment | string) {
    this._default = this.toDayjs(value);
  }
  get default() {
    return this._default;
  }

  @Input() labels: Labels;
  @Input() filterDate: CallableFunction;

  @Output() selectedDate = new EventEmitter<Dayjs | Moment | null>();

  private value: Dayjs;
  public formControl: UntypedFormControl;

  constructor(@Inject(DateAdapter) public formatDateAdapter: DayjsDateAdapter) {
    this.formControl = new UntypedFormControl({
      value: this.default,
      disabled: this.isDisable,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formControl.patchValue(this.default || null);
    this.isDisable ? this.formControl.disable() : this.formControl.enable();
    if (changes.default) {
      this.formatDateAdapter.showShortName = this.showShortName;
      this.formatDateAdapter.dateFormat = this.dateFormat;
    }
  }

  public onSelect(date: Dayjs) {
    this.formatDateAdapter.showShortName = this.showShortName;
    this.formatDateAdapter.dateFormat = this.dateFormat;
    let selectedDate: Moment | Dayjs = dayjs.isDayjs(date) ? date.clone() : date;
    this.value = date;

    if (this.isMomentLegacy) {
      selectedDate = moment(date.toISOString());
    }

    this.selectedDate.emit(this.formControl.errors ? null : selectedDate);
  }

  onChange($event: Event) {
    if (this.stopProp) {
      $event.stopPropagation();
    }
  }
}
