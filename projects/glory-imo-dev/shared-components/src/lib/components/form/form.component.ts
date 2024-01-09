import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Labels } from "./form.component.i";
import { MatFormField } from "@angular/material/form-field";

@Component({
  selector: "imo-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() autosize = false;
  @Input() labels: Labels = { placeholder: "", aria: "" };
  @Input() defaultValue = "";
  @Input() formControl: UntypedFormControl = new UntypedFormControl();
  @Input() showError = true;
  @Input() changeFieldColor: string;

  @Input() readonly = false;

  @Input() set disabled(disabled: boolean) {
    disabled ? this.formControl.disable({ emitEvent: false }) : this.formControl.enable({ emitEvent: false });
  }
  @Input() inputTextAlgin: "right" | "left" | undefined;

  @Output() value = new EventEmitter<string>();
  @Output() isKeyUp = new EventEmitter<boolean>(false);
  @Output("blur") blurChange: EventEmitter<Event> = new EventEmitter<Event>();
  @Output("afterViewInit") callAfterViewInit: EventEmitter<void> = new EventEmitter<void>();

  alive: Subject<any> = new Subject();
  inputElement: ElementRef;
  @ViewChild("inputElement") set setInputElement(content: ElementRef) {
    if (content) {
      this.inputElement = content;
    }
  }

  @ViewChild(MatFormField) matFormField: MatFormField;

  constructor() {}

  ngAfterViewInit(): void {
    Object.keys(this.labels?.attrs || {}).forEach((attr) => {
      this.inputElement.nativeElement.setAttribute(attr, this.labels.attrs[attr]);
    });

    Promise.resolve().then(() => this.callAfterViewInit.emit());
  }

  ngOnInit() {
    if (this.formControl && this.defaultValue !== "") {
      this.formControl.valueChanges.pipe(takeUntil(this.alive)).subscribe({
        next: (event) => {
          this.value.emit(event);
        },
      });

      this.formControl.patchValue(this.defaultValue || "");
    }
  }

  ngOnDestroy() {
    this.alive.next(true);
    this.alive.complete();
  }

  onKeyUp() {
    this.isKeyUp.emit(true);
    const element = this.inputElement.nativeElement;
    const fixScrollHeight = 4; // Remove blink effect
    element.style.height = "initial";
    element.style.height = element.scrollHeight - fixScrollHeight + "px";
  }

  get isShowErrorAndDisableForm(): boolean {
    return !!this.formControl.getError("showErrorAndDisable");
  }
}
