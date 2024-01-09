import { OnChanges, SimpleChanges } from "@angular/core";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import dayjs, { Dayjs } from "dayjs";
import moment, { Moment } from "moment";
import { confClientFormats, IConfClientFormats } from "../../services/config/config.service";
import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";

@Component({
  selector: "imo-date-time-picker",
  templateUrl: "./date-time-picker.component.html",
  styleUrls: ["./date-time-picker.component.scss"],
})
export class DateTimePickerComponent implements OnInit, OnChanges {
  @Input() showSpinner = true;
  @Input() showSeconds = false;
  @Input() stepHour = 1;
  @Input() stepMinute = 1;
  @Input() stepSecond = 1;
  @Input() hideTime = false;
  @Input() touchUi = false;
  @Input() enableMeridian = true;
  @Input() type = "dateTime";
  @Input() readonly = true;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() disabledTime = false;
  @Input() iconDatePicker = "date_range";
  @Input() minDate: Moment;
  @Input() maxDate: Moment;
  @Input() appearance = "outline";
  @Input() placeholderDate = "";
  @Input() defaultDate: Moment;
  isIconTimeSelect = true;
  _timeItems: LabelledValue<string>[] = [];
  _logTimeItems: LabelledValue<string>[] = [];
  @Input() formatClient: IConfClientFormats = confClientFormats;
  @Input() set timeItems(timeItems: LabelledValue<string>[]) {
    this._timeItems = timeItems;
    this._logTimeItems = timeItems;
  }
  @Input() isReadonly = false;

  public _selectedTimeItem = "";
  public _selectedDateItem: Moment | Dayjs;

  public dateTimeFormControl: UntypedFormControl;
  public dateFormControl: UntypedFormControl;

  public tempDate: Moment;

  @Output() datePickerChange = new EventEmitter<Dayjs | Moment | undefined | null>();

  constructor() {
    this.dateFormControl = new UntypedFormControl({
      value: this.defaultDate,
      disabled: this.disabled,
    });
    this.dateTimeFormControl = new UntypedFormControl({
      value: this.defaultDate,
      disabled: this.disabled,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.disabled ? this.dateFormControl.disable() : this.dateFormControl.enable();
    this.disabled ? this.dateTimeFormControl.disable() : this.dateTimeFormControl.enable();
    if (changes.defaultDate) {
      const currentValue = this.toDayjs(changes.defaultDate.currentValue);
      if (this.type === "dateTimeSelect") {
        this._selectedTimeItem = currentValue.format(this.formatClient.timeFormat);
        this._selectedDateItem = currentValue;
        this.dateFormControl && this.dateFormControl.setValue(this.toDayjs(changes.defaultDate.currentValue));
      }

      if (changes.defaultDate.isFirstChange()) {
        this.dateTimeFormControl && this.dateTimeFormControl.setValue(this.toDayjs(changes.defaultDate.currentValue));
      }
    }
  }
  toDayjs(value: string | Dayjs | Moment): Dayjs {
    if (moment.isMoment(value)) {
      return dayjs(value.toISOString());
    }
    if (dayjs.isDayjs(value)) return value;
    if (typeof value === "string") return dayjs(value);
  }
  ngOnInit(): void {
    this.dateTimeFormControl = new UntypedFormControl({ value: this.defaultDate, disabled: this.disabled });
    this.tempDate = this.defaultDate;
  }

  public handleDateTimeChange(date: Dayjs) {
    const selectedDate: Moment | Dayjs = dayjs.isDayjs(date) ? date.clone() : date;
    this.dateTimeFormControl.setValue(selectedDate);
    this.datePickerChange.emit(selectedDate);
  }

  public handleDateChange(date: Dayjs) {
    this._selectedDateItem = date;
    const selectedDate: Moment | Dayjs = dayjs.isDayjs(date) ? date.clone() : date;
    this.dateFormControl.setValue(selectedDate);
    this.handleChooseDateTimeSelect();
  }

  public handleBlurSearch(value: string) {
    if (value) {
      if (this._timeItems.some((s) => s.value === value)) {
        this._selectedTimeItem = value;
      } else {
        let toTime = "";
        let times = [];

        let isApPm =
          (value.toLocaleUpperCase().indexOf("PM") !== -1 && "PM") || (value.toLocaleUpperCase().indexOf("AM") !== -1 && "AM") || "";

        let is12Hour = (this.formatClient.timeFormat.toLocaleUpperCase().indexOf("A") === -1 && isApPm && " A") || "";
        let index = 0;
        const splitSpecial =
          (this.formatClient.timeFormat.indexOf(":") !== -1 && ":") ||
          (this.formatClient.timeFormat.indexOf(".") !== -1 && ".") ||
          (this.formatClient.timeFormat.indexOf(";") !== -1 && ";") ||
          (this.formatClient.timeFormat.indexOf(",") !== -1 && ",");
        const splitItemSpecial =
          (value.indexOf(":") !== -1 && ":") ||
          (value.indexOf(".") !== -1 && ".") ||
          (value.indexOf(";") !== -1 && ";") ||
          (value.indexOf(",") !== -1 && ",") ||
          "";
        const splitItemAmPmSpecial =
          (value.toUpperCase().indexOf("A") !== -1 && "AM") ||
          (value.toUpperCase().indexOf("P") !== -1 && "PM") ||
          (value.toUpperCase().indexOf("AM") !== -1 && "AM") ||
          (value.toUpperCase().indexOf("PM") !== -1 && "PM") ||
          "";

        const forNextNumber = this.formatClient.timeFormat.split(splitSpecial);
        let onlyNumber = value.trim().replace(/\D/g, "");

        if (splitItemSpecial !== "") {
          if (onlyNumber.length === 3 && Number(value.split(splitItemSpecial)[0]) < 10) {
            onlyNumber = "0" + onlyNumber;
          } else if (onlyNumber.length === 2) {
            const convertTime = value.split(splitItemSpecial);
            const stringArray = [];
            convertTime.forEach((el) => {
              if (el.length === 1) {
                stringArray.push("0" + el);
              }
            });
            onlyNumber = stringArray.toString().trim().replace(/\D/g, "");
          }
        } else if (splitItemAmPmSpecial !== "") {
          let convertAmPmTime = "";
          const stringArray = [];
          value.split(splitItemAmPmSpecial).forEach((el) => {
            if (el === "") {
              stringArray.push("");
            } else stringArray.push(el);
          });
          convertAmPmTime = stringArray.toString().trim().replace(/\D/g, "");
          isApPm = splitItemAmPmSpecial;
          is12Hour = (this.formatClient.timeFormat.toLocaleUpperCase().indexOf("A") === -1 && splitItemAmPmSpecial && " A") || "";
          onlyNumber = convertAmPmTime;
        } else {
          if (onlyNumber.length >= 3) {
            if (
              (onlyNumber.length === 3 && Number(onlyNumber[0]) > 5 && Number(`${onlyNumber[1]}${onlyNumber[2]}`) > 59) ||
              (onlyNumber.length >= 4 && Number(`${onlyNumber[0]}${onlyNumber[1]}`) > 23 && Number(`${onlyNumber[2]}${onlyNumber[3]}`) > 59)
            ) {
              const arrayItem = this._timeItems.filter((s) => s.isHidden !== true);
              onlyNumber = arrayItem.splice(-1)[0].value.trim().replace(/\D/g, "");
              isApPm = "PM";
            }
          } else {
            if (onlyNumber.slice(0, 1) === "0" && onlyNumber.slice(0, 2) !== "00") {
              onlyNumber = "0" + onlyNumber;
            }
          }
        }

        forNextNumber.forEach((element, index1) => {
          let toDayString = "";
          if (!index1) {
            if (Number(`${onlyNumber[0]}${onlyNumber[1]}`) === 24) {
              if (Number(onlyNumber.replace(/0/g, "")) === 24) {
                times.push(`${onlyNumber[0]}${onlyNumber[1]}`);
                index = 2;
              } else {
                times.push(`${onlyNumber[0]}`);
                index = 1;
              }
            } else if (Number(`${onlyNumber[0]}${onlyNumber[1]}`) < 24) {
              times.push(`${onlyNumber[0]}${onlyNumber[1]}`);
              index = 2;
            } else {
              times.push(`${onlyNumber[0]}`);
              index = 1;
            }
          } else {
            for (let index2 = 0; index2 < ((element.length > 2 && 2) || element.length); index2++) {
              if (onlyNumber[index]) toDayString += onlyNumber[index];
              index++;
            }
            times.push(toDayString);
          }
        });

        times = times
          .filter((s) => s)
          .map((s) => s.trim().replace(/\D/g, ""))
          .filter((s) => s)
          .map((s) => (s.length < 2 ? `0${s}` : s));
        times.length < 2 && times.push("00");
        toTime = `${dayjs().format(this.formatClient.dateFormat)} ${
          Number(times[0]) <= 12 ? `${times.join(splitSpecial)} ${isApPm}` : times.join(splitSpecial)
        }`;

        let timeDayjs = dayjs(toTime, `${this.formatClient.dateFormat} ${this.formatClient.timeFormat}${is12Hour}`);
        if (!timeDayjs.isValid()) {
          timeDayjs = dayjs(toTime);
        }
        if (timeDayjs.isValid()) {
          const timeString = timeDayjs.format(this.formatClient.timeFormat);
          if (!this._timeItems.some((s) => s.value === timeString)) {
            this._timeItems = [
              ...this._logTimeItems,
              {
                value: timeString,
                label: timeString,
                isHidden: true,
              },
            ];
          }
          this._selectedTimeItem = timeString;
        }
      }
    }
    this.handleChooseDateTimeSelect();
  }
  public handleChooseDateTimeSelect() {
    const dateTime = moment(
      `${this._selectedDateItem.format(this.formatClient.dateFormat)} ${this._selectedTimeItem}`,
      `${this.formatClient.dateFormat} ${this.formatClient.timeFormat}`,
    );
    const temp = dateTime.isValid() ? dateTime : this.tempDate;
    this.datePickerChange.emit(temp);
  }
  valueSelectTime = "";
  public handleSelectTime(value: string) {
    this._selectedTimeItem = value;
    this.valueSelectTime = value;
    this.handleChooseDateTimeSelect();
  }
}
