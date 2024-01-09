import { Directionality } from "@angular/cdk/bidi";
import { DOWN_ARROW, END, ESCAPE, HOME, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from "@angular/cdk/keycodes";
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { Moment } from "moment";
import { merge, Subject, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";
import { TimePickerContentComponent } from "./time-picker-content.component";
import { TimePickerInputDirective } from "./time-picker-input.directive";
import { MomentDateTimeAdapter } from "./time-picker.adapter";
import { Labels } from "./time-picker.component.i";

@Component({
  selector: "imo-time-picker",
  templateUrl: "./time-picker.component.html",
  styleUrls: ["./time-picker.component.scss"],
  exportAs: "imoTimePicker",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerComponent implements OnInit, OnDestroy, OnChanges {
  /** Sequential unique number for imo-time-picker tag. */
  static timePickerUid = 0;
  @Input() isValid = true;

  @Input() required: boolean;
  @Input() disabled: boolean;

  /** Unique id for imo-time-picker tag. */
  @Input() id = `imo-time-picker-${TimePickerComponent.timePickerUid++}`;

  /**
   * Starting time of list.
   *
   * e.g.) if minTime = 13:20, popup list has "1:30 PM", "2:00 PM", ... and so on.
   */
  @Input() set minTime(value: Moment) {
    this.min = value;
  }

  get minTime(): Moment {
    return this.min;
  }
  private min: Moment;

  /**
   * Ending time of list.
   *
   * e.g.) if maxTime = 13:20, popup list has "12:00 AM", "12:30 AM", ... "1:00 PM".
   */
  @Input() set maxTime(value: Moment) {
    this.max = value;
  }
  get maxTime(): Moment {
    return this.max;
  }
  private max: Moment;

  @Input() default: Moment;

  @Input() labels: Labels;
  @Input() stringValue = false;

  /**
   * Emits moment time which is entered in form.
   */
  @Output() selectedAt = new EventEmitter<Moment | string | null>();
  @Output() valueChanged = new EventEmitter<string | null>();
  @Output() isValidInputTime = new EventEmitter<boolean>();

  private value: Moment;
  timePickerInput: TimePickerInputDirective;
  selectedChanged = new Subject<Moment>();
  private focusedElementBeforeShowContent: Element | null = null;
  private timerPortal: ComponentPortal<TimePickerContentComponent>;
  private popupRef: OverlayRef;
  private popupComponentRef: ComponentRef<TimePickerContentComponent> | null;

  private selectSubscription = Subscription.EMPTY;

  /**
   * Gets current status that content is shown or not.
   */
  get isShown(): boolean {
    return this.contentIsShown;
  }
  private contentIsShown = false;

  selected: Moment | null = null;

  public formControl: UntypedFormControl;

  onCheckIsValid(value: boolean) {
    this.isValid = value;
    this.isValidInputTime.emit(value);
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dir: Directionality,
    private overlay: Overlay,
    private timeAdapter: MomentDateTimeAdapter,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ("default" in changes && !changes.default.firstChange) {
      this.formControl.patchValue(this.default);
    }
  }

  ngOnInit() {
    this.formControl = new UntypedFormControl(this.default);
  }

  ngOnDestroy() {
    if (this.popupRef) {
      this.popupRef.dispose();
      this.popupComponentRef = null;
    }
  }

  onSelectedChange(time: Moment): void {
    const value = time ? (this.stringValue ? time.format("hh:mm A") : time) : null;
    this.selectedAt.emit(this.formControl.errors ? null : value);
  }

  /**
   * Emits selected time when input is changed to valid time.
   */
  public onTimeChange(time: any) {
    this.isValid = true;
    this.isValidInputTime.emit(true);
    this.value = time;
    this.onSelectedChange(time);
  }

  public registerInput(input: TimePickerInputDirective) {
    if (this.timePickerInput) {
      throw new Error("A TimePicker can only be associated with a single input");
    }
    this.timePickerInput = input;
  }

  public showContent() {
    if (this.isShown || this.disabled) {
      return;
    }
    if (!this.timePickerInput) {
      throw new Error("Attempted to open an IMOTimePicker with no associated input");
    }
    if (!this.focusedElementBeforeShowContent) {
      this.focusedElementBeforeShowContent = this.document.activeElement;
    }

    this.openAsPopup();
    this.contentIsShown = true;
  }

  public openAsPopup() {
    if (!this.timerPortal) {
      this.timerPortal = new ComponentPortal<TimePickerContentComponent>(TimePickerContentComponent);
    }
    if (!this.popupRef) {
      this.createPopup();
    }
    if (!this.popupRef.hasAttached()) {
      // rendering portal to outlet
      this.popupComponentRef = this.popupRef.attach(this.timerPortal);
      this.popupComponentRef.instance.timePicker = this;
      this.selectSubscription = this.popupComponentRef.instance.selected.subscribe((value: Moment | null) => {
        this.select(value);
        this.hideContent();
      });
    }
    this.ngZone.onStable
      .asObservable()
      .pipe(take(1))
      .subscribe(() => {
        this.popupRef.updatePosition();
      });
  }

  public select(value: Moment) {
    const oldValue = this.selected;
    this.selected = value;
    if (!this.timeAdapter.sameTime(oldValue, this.selected)) {
      this.selectedChanged.next(value);
    }
  }

  public hideContent() {
    if (!this.isShown) {
      return;
    }

    if (this.popupRef && this.popupRef.hasAttached()) {
      this.selectSubscription.unsubscribe();
      this.popupRef.detach();
    }
    if (this.timerPortal && this.timerPortal.isAttached) {
      this.timerPortal.detach();
    }

    const completeClose = () => {
      this.contentIsShown = false;
      this.focusedElementBeforeShowContent = null;
      // tslint:disable-next-line:no-string-literal
      if (!this.changeDetectorRef["destroyed"]) {
        this.changeDetectorRef.detectChanges();
      }
    };

    if (this.focusedElementBeforeShowContent && typeof (this.focusedElementBeforeShowContent as HTMLElement).focus === "function") {
      (this.focusedElementBeforeShowContent as HTMLElement).focus();
      setTimeout(completeClose);
    } else {
      completeClose();
    }
  }

  private createPopup() {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this.createPopupPositionStrategy(),
      hasBackdrop: true,
      backdropClass: "mat-overlay-transparent-backdrop",
      direction: this.dir,
      panelClass: "mat-datepicker-popup",
    });

    this.popupRef = this.overlay.create(overlayConfig);
    this.popupRef.overlayElement.setAttribute("role", "dialog");

    merge(
      this.popupRef.backdropClick(),
      this.popupRef.detachments(),
      this.popupRef.keydownEvents().pipe(
        filter((event) => {
          // Closing on alt + up is only valid when there's an input associated with the timepicker
          // tslint:disable-next-line: deprecation
          return event.keyCode === ESCAPE || (this.timePickerInput && event.altKey && event.keyCode === UP_ARROW);
        }),
      ),
    ).subscribe((event) => {
      if (event) {
        event.preventDefault();
      }

      this.hideContent();
    });

    merge(
      this.popupRef.keydownEvents().pipe(
        filter((event) => {
          // tslint:disable-next-line: deprecation
          return event.keyCode === RIGHT_ARROW || event.keyCode === LEFT_ARROW;
        }),
      ),
    ).subscribe((event) => {
      if (event) {
        event.preventDefault();
      }
      (this.timePickerInput.elementRef.nativeElement as HTMLInputElement).focus();
    });

    merge(
      this.popupRef.keydownEvents().pipe(
        filter((event) => {
          // tslint:disable-next-line: deprecation
          return event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW;
        }),
      ),
    ).subscribe((event) => {
      if (event) {
        event.preventDefault();
      }
      if (this.popupComponentRef) {
        this.popupComponentRef.instance.keyManager.onKeydown(event);
      }
    });

    merge(
      this.popupRef.keydownEvents().pipe(
        filter((event) => {
          // tslint:disable-next-line: deprecation
          return event.keyCode === HOME || event.keyCode === END;
        }),
      ),
    ).subscribe((event) => {
      if (event) {
        event.preventDefault();
      }
      if (this.popupComponentRef) {
        // tslint:disable-next-line: deprecation
        if (event.keyCode === HOME) {
          this.popupComponentRef.instance.keyManager.setFirstItemActive();
        } else {
          this.popupComponentRef.instance.keyManager.setLastItemActive();
        }
      }
    });
  }

  /** Create the popup PositionStrategy. */
  private createPopupPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.timePickerInput.getConnectedOverlayOrigin())
      .withTransformOriginOn(".mat-time-picker-content")
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withLockedPosition()
      .withPositions([
        {
          originX: "start",
          originY: "bottom",
          overlayX: "start",
          overlayY: "top",
        },
        {
          originX: "start",
          originY: "top",
          overlayX: "start",
          overlayY: "bottom",
        },
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top",
        },
        {
          originX: "end",
          originY: "top",
          overlayX: "end",
          overlayY: "bottom",
        },
      ]);
  }
}
