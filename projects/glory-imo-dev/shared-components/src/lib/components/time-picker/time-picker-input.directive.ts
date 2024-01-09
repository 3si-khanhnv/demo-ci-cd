import { DOWN_ARROW } from "@angular/cdk/keycodes";
import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  Output,
} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { MatDateFormats } from "@angular/material/core";
import { MatFormField } from "@angular/material/form-field";
import moment, { Moment } from "moment";
import { Subscription } from "rxjs";
import { MomentDateTimeAdapter } from "./time-picker.adapter";
import { TimePickerComponent } from "./time-picker.component";
import { MAT_INPUT_VALUE_ACCESSOR } from "@angular/material/input";

export type DirectiveKeyboardEvent = KeyboardEvent;
export const TIME_PICKER_FORMATS = new InjectionToken<MatDateFormats>("time-picker-formats");

@Directive({
  selector: "input[imoTimePicker]",
  exportAs: "imoTimePickerInput",
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimePickerInputDirective), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => TimePickerInputDirective), multi: true },
    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: forwardRef(() => TimePickerInputDirective) },
  ],
})
export class TimePickerInputDirective implements ControlValueAccessor, OnDestroy, Validator {
  timePicker: TimePickerComponent;

  private min: Moment | null;
  private max: Moment | null;
  private valued: Moment | null;
  private localeSubscription: Subscription;
  private timePickerSubscription: Subscription = Subscription.EMPTY;
  private disabled: boolean;

  @Input()
  set imoTimePicker(value: TimePickerComponent) {
    if (!!value) {
      this.timePicker = value;
      this.timePicker.registerInput(this);

      // Subscription should be unsubscribed before create new one
      // default: timePickerSubscription is empty subscription
      this.timePickerSubscription.unsubscribe();

      // Renew subscription for timePickerSubscription
      this.timePickerSubscription = this.timePicker.selectedChanged.subscribe((selected: Moment) => {
        this.value = selected;
        this.formatValue(this.value);
        this.cvaOnChange(selected);
        this.onTouched();
        this.timeChange.emit(this.value);
      });
    }
  }

  @HostBinding("attr.aria-owns")
  get owns() {
    return (this.timePicker && this.timePicker.isShown && this.timePicker.id) || null;
  }

  @Input()
  get value(): Moment | null {
    return this.valued || null;
  }
  set value(value: Moment | null) {
    value = this.timeAdapter.deserialize(value);
    value = this.getValidDateOrNull(value);
    this.valued = value;
  }

  @Input()
  get minTime(): Moment | null {
    return this.min || null;
  }
  set minTime(value: Moment) {
    value = this.timeAdapter.deserialize(value);
    value = this.getValidDateOrNull(value);
    this.min = value;
    this.validatorOnChange();
  }

  @Input()
  get maxTime(): Moment | null {
    return this.max || null;
  }
  set maxTime(value: Moment) {
    value = this.timeAdapter.deserialize(value);
    value = this.getValidDateOrNull(value);
    this.max = value;
    this.validatorOnChange();
  }

  @Output() readonly timeChange = new EventEmitter<Moment | null>();
  @Output() isValidDirective = new EventEmitter<boolean>();
  isShowError = true;

  @HostListener("change")
  public onChange() {
    this.timeChange.emit(this.value);
    this.isShowError ? this.isValidDirective.emit(true) : this.isValidDirective.emit(false);
  }

  @HostListener("keydown", ["$event"])
  public onkeydown(event: DirectiveKeyboardEvent) {
    // tslint:disable-next-line: deprecation
    const isAltDownArrow = event.altKey && event.keyCode === DOWN_ARROW;
    if (this.timePicker && isAltDownArrow && !this.checkReadOnly()) {
      this.timePicker.showContent();
      event.preventDefault();
    }
  }

  @HostListener("input", ["$event"])
  public onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = moment(value, "HH:mm a");
    this.isValidDirective.subscribe((isValidValue) => {
      this.isShowError = isValidValue;
    });

    this.checkTimeFormat(value) ? this.isValidDirective.emit(true) : this.isValidDirective.emit(false);
  }

  @HostListener("blur", ["$event"])
  public onBlur(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = moment(value, "HH:mm a");
    this.isValidDirective.subscribe((isValidValue) => {
      this.isShowError = isValidValue;
    });
    this.checkTimeFormat(value) ? this.isValidDirective.emit(true) : this.isValidDirective.emit(false);
  }

  @HostListener("keyup", ["$event"])
  public onKeyup(event: DirectiveKeyboardEvent) {
    if (event.code === "Enter") {
      const { value } = event.target as HTMLInputElement;
      this.value = moment(value, "HH:mm a");
      this.isValidDirective.subscribe((isValidValue) => {
        this.isShowError = isValidValue;
      });
      this.checkTimeFormat(value) ? this.isValidDirective.emit(true) : this.isValidDirective.emit(false);
    }
  }

  constructor(
    public elementRef: ElementRef,
    @Optional() public timeAdapter: MomentDateTimeAdapter,
    @Optional() @Inject(TIME_PICKER_FORMATS) private dateFormats: MatDateFormats,
    @Optional() private formField: MatFormField,
  ) {
    if (!this.timeAdapter) {
      throw new Error(`No provider for ${MomentDateTimeAdapter.name}`);
    }
    if (!this.dateFormats) {
      throw new Error("No provider for TIME_PICKER_FORMATS");
    }

    this.localeSubscription = this.timeAdapter.localeChanges.subscribe(() => {
      this.value = this.value;
    });
  }

  private validatorOnChange = () => {};
  private cvaOnChange: (value: any) => void = () => {};
  private onTouched = () => {};

  public ngOnDestroy() {
    this.localeSubscription.unsubscribe();
    this.timePickerSubscription.unsubscribe();
  }

  private formatValue(value: Moment | null) {
    this.elementRef.nativeElement.value = value ? this.timeAdapter.format(value, this.dateFormats.display.dateInput) : "";
  }

  private getValidDateOrNull(obj: any): Moment | null {
    return this.checkTimeFormat(obj?._i) || (this.timeAdapter.isDateInstance(obj) && this.timeAdapter.isValid(obj)) ? obj : null;
  }

  private checkReadOnly() {
    return this.elementRef.nativeElement.readOnly;
  }

  checkTimeFormat(string: string) {
    const regex = /^(0[1-9]|1[012])(:[0-5]\d) [AP][M]$/;
    return regex.test(string);
  }

  /**
   * Gets the element that the datepicker popup should be connected to.
   * @return The element to connect the popup to.
   */
  getConnectedOverlayOrigin(): ElementRef {
    return this.formField ? this.formField.getConnectedOverlayOrigin() : this.elementRef;
  }

  // #region Interfaces of ControlValueAccessor

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.cvaOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors {
    const errors: ValidationErrors = {};

    if (control.value) {
      this.formatValue(this.getValidDateOrNull(control.value));
    } else {
      return { imoTimepickerParse: true };
    }

    if (this.maxTime && this.timeAdapter.compareTime(this.maxTime, control.value) < 0) {
      errors.imoTimepickerMax = true;
    }

    if (this.minTime && this.timeAdapter.compareTime(this.minTime, control.value) > 0) {
      errors.imoTimepickerMin = true;
    }

    return errors;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorOnChange = fn;
  }
}

@Directive({
  selector: "[disableControl]",
})
export class DisableControlDirective {
  @Input() set disableControl(condition: boolean) {
    const action = condition ? "disable" : "enable";
    this.ngControl.control[action]();
  }

  constructor(public ngControl: NgControl) {}
}
