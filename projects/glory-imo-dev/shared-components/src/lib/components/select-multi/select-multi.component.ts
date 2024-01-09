import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { textLabel } from "./select-multi.constan";
import { MatAutocomplete, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatOptionSelectionChange } from "@angular/material/core";
import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";
interface LabelledValueSearch<T> extends LabelledValue<T> {
  isSelected: boolean;
}

@Component({
  selector: "imo-select-multi",
  templateUrl: "./select-multi.component.html",
  styleUrls: ["./select-multi.component.scss"],
})
export class SelectMultiComponent implements OnChanges {
  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
  @ViewChild("trigger", { read: MatAutocompleteTrigger }) trigger: MatAutocompleteTrigger;
  @Input() label: string | string[];
  @Input() all = false;
  @Input() allValue = "";
  @Input() items: LabelledValue<string>[];
  @Input() displayAllText = false;
  @Input() selectedItem: string[] = [];
  @Input() isStoryBook = false;
  @Input() placeholder: string;
  @Input() hasError: boolean;
  @Input() disabled: boolean;
  @Input() emptyLabel = "";
  @Input() allowEmpty: boolean;
  @Input() initEmitter = true;
  @Input() clearSearchOnBlur = false;
  @Input() panelWidth = "175px";
  @Input() textLabel = textLabel;
  @Input() showLabelAll = false;

  isSearchAble = false;
  @Input("isSearchAble") set setIsSearchAble(isSearchAble: boolean) {
    if (typeof isSearchAble === "boolean") {
      this.isSearchAble = isSearchAble;
    }
  }
  @Input() isClearLastSearch = false;
  public formControl = new UntypedFormControl();
  public itemsSearch: LabelledValueSearch<string>[];
  public itemsSearchFilter: LabelledValueSearch<string>[];
  public isSelectedAll = false;
  public isDisplayAll = true;

  @Output() selected = new EventEmitter<string[]>();

  public allSelected = false;
  public tempSelected = [];
  public oldSelected = [];
  public lastSearch = "";
  public scrollTopPosition = 0;
  public lastSelectedItem: LabelledValue<string>;

  constructor(private cdRef: ChangeDetectorRef) {
    this.tempSelected = [...this.selectedItem];
  }
  ngOnInit(): void {
    if (this.isSearchAble && !this.itemsSearch) {
      this.itemsSearchFilter = this.items.map(
        (value: LabelledValue<string>): LabelledValueSearch<string> => ({ ...value, isSelected: false }),
      );
      this.itemsSearch = [...this.itemsSearchFilter];
    }
  }

  filter(filter: string) {
    if (filter) {
      this.isDisplayAll = false;
      this.itemsSearchFilter = this.itemsSearch.filter((option) => option.label.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
    } else {
      this.isDisplayAll = true;
      this.itemsSearchFilter = [...this.itemsSearch];
    }
    this.lastSearch = filter;
  }

  onSearchChange(searchValue: string) {
    this.filter(searchValue);
  }

  optionClicked(event: Event, item: LabelledValueSearch<string>) {
    event.stopPropagation();
    this.toggleSelection(item);
  }

  optionEnter(event: MatOptionSelectionChange, item: LabelledValueSearch<string>) {
    if (event.source.selected) {
      this.toggleSelection(item);
    }
  }

  get lastSelectedItemIndex(): number {
    if (this.lastSelectedItem) {
      if (this.lastSelectedItem.value == "ALL") return 0;
      const index = this.itemsSearchFilter.findIndex((item) => item.value === this.lastSelectedItem.value);
      return this.isDisplayAll ? index + 1 : index;
    } else {
      return -1;
    }
  }

  optionClickedAll(event?: Event, matOptionChange?: MatOptionSelectionChange) {
    if (matOptionChange && !matOptionChange.source.selected) return;
    if (event) {
      event.stopPropagation();
    }
    this.isSelectedAll = !this.isSelectedAll;
    // update all item.selected is true or false
    this.itemsSearch = this.itemsSearchFilter = this.itemsSearch.map(
      (value: LabelledValueSearch<string>): LabelledValueSearch<string> => ({ ...value, isSelected: this.isSelectedAll }),
    );
    this.itemsSearchFilter = [...this.itemsSearch];

    if (this.isSelectedAll) {
      this.selectedItem = this.itemsSearch.map((item: LabelledValueSearch<string>) => item.value);
      this.setDisplayValue();
      this.selected.emit(this.selectedItem);
    } else {
      this.formControl.setValue("");
      this.selectedItem = [];
      this.selected.emit([]);
    }
    this.scrollTopPosition = this.matAutocomplete._getScrollTop();
    this.lastSelectedItem = { label: "ALL", value: "ALL" };
  }

  onKeydownEnter() {
    this.trigger.openPanel();
    requestAnimationFrame(() => {
      this.matAutocomplete._keyManager.updateActiveItem(this.lastSelectedItemIndex);
      this.matAutocomplete._setScrollTop(this.scrollTopPosition);
    });
  }

  toggleSelection(item: LabelledValueSearch<string>) {
    item.isSelected = !item.isSelected;

    if (item.isSelected && (!this.selectedItem || !this.selectedItem.includes(item.value))) {
      this.selectedItem = [...this.selectedItem, item.value];
      this.isSelectedAll = this.items.length === this.selectedItem.length;
    } else if (!item.isSelected) {
      this.selectedItem = this.selectedItem.filter((i: string) => i !== item.value);
      this.isSelectedAll = false;
    }
    const findIndex = this.itemsSearch.findIndex((itemSearch) => item.value === itemSearch.value);
    this.itemsSearch[findIndex].isSelected = item.isSelected;

    this.setDisplayValue();
    this.selected.emit(this.selectedItem);

    this.lastSelectedItem = item;
    this.scrollTopPosition = this.matAutocomplete._getScrollTop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ("selectedItem" in changes) {
      if (!this.isSearchAble) {
        if (!changes.selectedItem.firstChange) {
          this.selectedItem = this.selectedItem || [];
          this.allSelected = !this.items.map((item) => this.selectedItem.includes(item.value)).includes(false);
          this.tempSelected = this.allSelected ? [this.allValue, ...this.selectedItem] : [...this.selectedItem];
        } else {
          if (this.items && this.selectedItem) {
            const allSelected = !this.items.map((item) => this.selectedItem.includes(item.value)).includes(false);
            if (allSelected) {
              this.onSelectionChange([...this.selectedItem], this.initEmitter);
            }
          }
        }
      } else {
        if ("isClearLastSearch" in changes && !changes.isClearLastSearch.firstChange) {
          this.lastSearch = "";
          this.isDisplayAll = true;
          this.itemsSearchFilter = [...this.itemsSearch];
        }

        this.selectedItem = this.selectedItem || [];
        this.itemsSearch = this.items.map((value) => ({ ...value, isSelected: this.selectedItem.includes(value.value) }));
        this.itemsSearchFilter = this.itemsSearchFilter ? this.itemsSearchFilter : [...this.itemsSearch];
        if (this.itemsSearchFilter) {
          this.itemsSearchFilter.forEach((value, index) => {
            const isSelected = this.selectedItem.includes(value.value);
            this.itemsSearchFilter[index].isSelected = isSelected;
          });
        } else {
          this.itemsSearchFilter = [...this.itemsSearch];
        }
        this.isSelectedAll = this.items.length === this.selectedItem.length;

        // remove allValue in selectedItem if have
        this.isSelectedAll = false;
        if (this.items.length) {
          if (this.items.length === this.selectedItem.length) {
            this.isSelectedAll = true;
          } else if (this.items.length + 1 === this.selectedItem.length) {
            this.isSelectedAll = true;
            this.selectedItem.shift();
          }
        }

        this.setDisplayValue();
      }
    }

    if ("items" in changes) {
      if (this.isSearchAble) {
        this.itemsSearch = this.items.map((value) => ({ ...value, isSelected: this.selectedItem.includes(value.value) }));
        this.filter(this.lastSearch);
        this.disabled ? this.formControl.disable() : this.formControl.enable();
      }
    }

    if ("disabled" in changes) {
      this.disabled ? this.formControl.disable({ emitEvent: false }) : this.formControl.enable({ emitEvent: false });
    }
  }

  public onSelectionChange(value: string[], isInit = true) {
    if (this.all && this.allValue !== "") {
      if (this.allSelected === false) {
        if (value.includes(this.allValue)) {
          value = [this.allValue, ...this.items.map((item) => item.value)];
          this.allSelected = true;
        } else {
          if (value.filter((item) => item !== this.allValue).length >= this.items.length) {
            value = [this.allValue, ...value];
            this.allSelected = true;
          }
        }
      } else {
        if (!value.includes(this.allValue)) {
          if (this.oldSelected.includes(this.allValue)) {
            value = [];
            this.allSelected = false;
          }
        } else {
          value = value.filter((item) => item !== this.allValue);
          this.allSelected = false;
        }
      }
    }

    this.tempSelected = value;
    this.oldSelected = value;

    if (isInit) {
      this.selected.emit(value);
    }
  }

  getSelectNotAll(): any {
    let items = [];
    if (this.items && this.items.length > 0) {
      const selectedValue = (this.selectedItem && this.selectedItem) || [];
      items = this.isStoryBook
        ? this.items.filter((item) => this.tempSelected.includes(item.value)).map((item) => item.label)
        : this.items.filter((item) => selectedValue.includes(item.value)).map((item) => item.label);
    }
    return items.filter((item) => item !== this.allValue);
  }

  setDisplayValue(): void {
    if (this.isSearchAble && this.selectedItem.length > 0) {
      const item = this.items.find((item) => item.value === this.selectedItem[0]);
      if (item) {
        const firstLabel = item.label;
        if (this.selectedItem.length === 1) {
          this.formControl.setValue(`${firstLabel}`);
        } else if (this.selectedItem.length > 1) {
          if (this.showLabelAll && this.isSelectedAll) {
            this.formControl.setValue("All");
          } else {
            this.formControl.setValue(
              `${firstLabel} (+${this.selectedItem.length - 1} ${this.selectedItem.length - 1 > 1 ? "others" : "other"})`,
            );
          }
        }
      } else this.formControl.setValue("");
    } else {
      this.formControl.setValue("");
    }

    if (this.clearSearchOnBlur) {
      this.lastSearch = "";
    }
  }

  onFocus() {
    if (this.isSearchAble) this.formControl.setValue(this.lastSearch);
  }

  public clearSearch(): void {
    this.lastSearch = "";
  }
}
