import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { ETypeButtons, IButton, ITotalValue } from "./button-info-char.i";
import { formatCurrencyToString } from "../../utilities/common";

@Component({
  selector: "imo-button-info-chart",
  templateUrl: "./button-info-chart.component.html",
  styleUrls: ["./button-info-chart.component.scss"],
})
export class ButtonInfoChartComponent implements OnChanges {
  classes: string[] = ["default"];
  cstButtons = ETypeButtons;
  @Input() type = "";
  @Input() title = "";

  @Input() key = "";
  @Input() isActive = false;
  _currencyCode = null;
  @Input() set currencyCode(code: string) {
    this._currencyCode = code;
    if (this._totalValues) {
      const topTotal = this._totalValues.find((s) => s.currencyCode === this._currencyCode);
      if (topTotal) {
        this._value = this.handleFormatDecimalCurrency(topTotal.totalValueNumber, topTotal.currencyCode);
      } else {
        this._value = this.handleFormatDecimalCurrency(formatCurrencyToString(0, this._currencyCode), this._currencyCode);
      }
    } else {
      this._value = this.handleFormatDecimalCurrency(this._value, this._currencyCode);
    }
  }
  @Input() set value(value: string) {
    this._value = this.handleFormatDecimalCurrency(value, this._currencyCode);
  }
  @Input() set valueToolTip(value: string) {
    this._valueToolTip = value;
  }

  @Input() icon = "";
  @Input() currencies = "";
  @Input() currency = "";

  @Input() set totalValues(values: ITotalValue[]) {
    if (values) {
      this._totalRealValues = values;
      this._totalValues = this._totalRealValues.filter((s) => !s.isNotToolTip);
      this._valueToolTip = this._totalValues.map((item) => item.totalValueNumber.concat(" ", item.currencyCode)).join("\n");
      if (this._currencyCode) {
        const topTotal = this._totalRealValues.find((s) => s.currencyCode === this._currencyCode);
        if (topTotal) {
          this._currencyCode = topTotal.currencyCode;
          this._value = this.handleFormatDecimalCurrency(topTotal.totalValueNumber, topTotal.currencyCode);
        } else {
          this._value = this.handleFormatDecimalCurrency(formatCurrencyToString(0, this._currencyCode), this._currencyCode);
        }
      } else {
        const topTotal = values[0];
        this._currencyCode = topTotal.currencyCode;
        this._value = this.handleFormatDecimalCurrency(topTotal.totalValueNumber, topTotal.currencyCode);
      }
    }
  }

  @Output() clicked = new EventEmitter<IButton>();
  _currencyQuantity = 1;
  _totalValues: ITotalValue[] = undefined;
  _totalRealValues: ITotalValue[] = undefined;
  _value = "";
  _valueToolTip = "";
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currencyCode || changes.totalValues) {
      if (this._totalValues && this._totalValues.length) {
        this._currencyQuantity = this._totalValues.find((item) => item.currencyCode === this._currencyCode)
          ? this._totalValues.length
          : this._totalValues.length + 1;
      }
    }
    if (changes.isActive && changes.isActive.currentValue === true) {
      this.classes = ["is-active"];
    } else {
      this.classes = ["default"];
    }
  }

  handleClick() {
    const event: IButton = { type: this.type, currencyCode: this._currencyCode, active: this.isActive, key: this.key };
    this.clicked.emit(event);
  }

  handleFormatDecimalCurrency(str: string, currencyCode: string) {
    if (str) {
      const arr = str.trim().split("");
      const decimalCharacter = arr.reverse().find((el) => el === "," || el === ".");
      const arrDigit = str.trim().split(decimalCharacter);
      return `${arrDigit[0]}${decimalCharacter || ""}${(arrDigit[1] && `<span>${arrDigit[1]}</span>`) || ""} ${
        (currencyCode && `<span>${currencyCode}</span>`) || ""
      }`;
    }
    return "";
  }
}
