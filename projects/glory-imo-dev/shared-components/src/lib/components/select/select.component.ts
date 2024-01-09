import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { MatOptionSelectionChange } from "@angular/material/core";
import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";

@Component({
  selector: "imo-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class SelectComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild("trigger", { read: MatAutocompleteTrigger }) trigger: MatAutocompleteTrigger;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedItem && this.isSetDisplayFilter) {
      this.filterSearchControl.setValue(changes.selectedItem.currentValue);
    }
  }
  @Input() panelCustomClass = "imo-panel-custom-class";
  panelClass = "imo-select-box";
  notifier = new Subject();

  @Input() set position(value: string) {
    if (value) {
      this.panelClass += ` ${value}`;
    }
  }
  @Input() label: string | string[];
  @Input() placeholder: string | string[];
  @Input() items: LabelledValue<string>[];
  @Input() selectedItem: string;
  disabled: boolean;
  @Input("disabled") set setDisabled(disabled: boolean) {
    disabled ? this.filterSearchControl.disable({ emitEvent: false }) : this.filterSearchControl.enable({ emitEvent: false });
    this.disabled = disabled;
  }
  @Input() emptyLabel = "";
  @Input() allowEmpty = false;
  @Input() hasError: boolean;
  @Input() errorMessage: string;
  @Input() stopProp: boolean;
  autoComplete = false;
  @Input("autoComplete") set setAutoComplete(autoComplete: boolean) {
    if (typeof autoComplete === "boolean") {
      this.autoComplete = autoComplete;
    }
  }
  @Input() removeFocusAfterSelect = false;
  @Input() clearSearchOnBlur = false;
  @Input() isIconTimeSelect: boolean;
  @Input() optionDisplayTemplate: TemplateRef<any> | undefined;

  readonlyFormControl = new UntypedFormControl();
  _isReadonly = false;
  @Input() set isReadonly(readonly: boolean) {
    if (typeof readonly === "boolean") {
      this._isReadonly = readonly;
      this.readonlyFormControl.setValue(this.selectedItemLabel, { emitEvent: false });
    }
  }
  get isReadonly(): boolean {
    return this._isReadonly;
  }

  @Output() selected = new EventEmitter<string>();
  @Output() onBlur = new EventEmitter<string>();
  @Input() onEnter = false;
  @Input() isSetDisplayFilter = false;

  @ViewChild("selector", { static: false }) selector: MatSelect;

  filterSearchControl = new UntypedFormControl();
  filterValue = "";
  optionSelect = null;

  ngAfterViewInit(): void {
    // should find better solution
    if (this.selector) {
      this.selector.openedChange.pipe(takeUntil(this.notifier)).subscribe((open) => {
        if (open) {
          const selectedOptionRef = this.selector.panel.nativeElement.querySelector("mat-option[aria-selected='true']");
          if (selectedOptionRef) {
            selectedOptionRef.scrollIntoView();
          }
        }
      });
    }

    this.disabled ? this.filterSearchControl.disable({ emitEvent: false }) : this.filterSearchControl.enable({ emitEvent: false });
    this.filterSearchControl.setValue(this.selectedItemLabel, { emitEvent: false });
    this.readonlyFormControl.disable({ emitEvent: false });
    this.readonlyFormControl.setValue(this.selectedItemLabel, { emitEvent: false });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  public onSelectionChange(value: string) {
    this.selected.emit(value);
    if (this.removeFocusAfterSelect) this.selector.close();
  }

  public onSelectionSearchChange(event: MatOptionSelectionChange, value: string) {
    if (event.source.selected) {
      this.filterValue = "";
      this.selectedItem = value;
      this.filterSearchControl.setValue(this.selectedItemLabel);
      this.selected.emit(value);
      this.onSelectionOption(event);
      this.trigger.closePanel();
    }
  }

  public onClickSearchChange() {
    this.filterSearchControl.setValue(this.selectedItemLabel);
  }

  public onSelectionOption(event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      this.optionSelect = event.source.value;
    }
  }

  onSearchChange(filter: string) {
    this.filterValue = filter;
    this.optionSelect = filter;
  }
  public async onSearchKeydown() {
    if (this.onEnter) {
      if (this.optionSelect) {
        this.filterSearchControl.setValue(this.optionSelect);
        this.filterValue = this.optionSelect;
        this.optionSelect = null;
      }
      this.onBlur.emit(this.filterSearchControl.value);
      this.trigger.closePanel();
    }
  }
  get filteredItems(): LabelledValue<string>[] {
    if (this.filterValue) {
      const filterToLowercase = this.filterValue.toLowerCase();

      return this.items.filter((item) => {
        const labelSearch = this.optionDisplayTemplate ? item.customLabel.fullContentToSearch : item.label;

        return labelSearch.toLowerCase().includes(filterToLowercase);
      });
    } else {
      return this.items;
    }
  }

  get selectedItemLabel(): string {
    if (this.selectedItem) {
      const find = this.items.find((item) => item.value === this.selectedItem);
      return find ? find.label : "";
    } else {
      return "";
    }
  }

  onFocusSearchField() {
    return this.filterSearchControl.setValue(this.filterValue);
  }

  onBlurSearchField(value) {
    if (this.clearSearchOnBlur) {
      this.filterValue = "";
    }
    this.onBlur.emit(value);
    this.filterSearchControl.setValue(this.selectedItemLabel);
  }

  clearSearch() {
    this.filterValue = "";
  }
  displayWith(value) {
    return (this.isSetDisplayFilter && (this.selectedItemLabel || this.selectedItem)) || value;
  }
  onToggleClick($event) {
    if (this.trigger.panelOpen) {
      $event.stopPropagation();
      $event.preventDefault();
      this.trigger.closePanel();
      return true;
    }
  }
}
