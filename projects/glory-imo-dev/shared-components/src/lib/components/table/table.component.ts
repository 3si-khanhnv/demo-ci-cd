import { animate, state, style, transition, trigger } from "@angular/animations";
import { ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChildren } from "@angular/core";
import { shallowEqual } from "../../utilities/common";
import { FormComponent } from "../form/form.component";
import { OptionsMessage, StatusIcon } from "../message-options/message-options.component.i";
import { ChangeCheckbox, RowData, Sorting, TableField, TableRecord, TotalCurrencyValue } from "./table.component.i";
import { Actions, Keys, Sort } from "./table.constant";
import { PageChangeValue } from "../paginator/paginator.component.i";
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { MatTableDataSource } from "@angular/material/table";
import { Icons } from "../../constants/icons";
import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";

@Component({
  selector: "imo-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]),
  ],
})
export class TableComponent implements DoCheck {
  checkedRows: TableRecord[] = [];
  data: TableRecord[] = [];
  columnSelect = "";
  typeSort = "";
  typeSorts = [Sort.ASC, Sort.DESC];
  sortIcons = [Icons.arrows, Icons.arrowUp, Icons.arrowDown];
  readonly openInNewIcon = Icons.openInNew.icon;
  tooltips = [];

  @Input() headless = false;
  @Input() groupRows: TotalCurrencyValue[] = [];
  @Input() displayedFields: TableField[];
  @Output() onElementExpanded = new EventEmitter<boolean[]>();
  @Input("checkedRows") set setCheckedRows(data: TableRecord[]) {
    if (data) {
      this.checkedRows = data;
      this.markCheckedItems();
    }
  }
  @Input() selectedIndex: number;
  @Input("data") set setData(data: TableRecord[]) {
    this.data = data;
    this.markCheckedItems();
  }

  @Input() rowSelectable = true;
  @Input() selectedItem: string;
  @Input() items: LabelledValue<string>[];
  @Input() excludedFields: string[] = [];
  @Input() showBorderCols = false;

  @Output() selectedRecord = new EventEmitter<TableRecord>();
  @Output() changeCheckbox = new EventEmitter<{ index: number; checked: boolean }>();
  @Output() selectedSkipRecord = new EventEmitter<TableRecord>();
  @Output() editRowId = new EventEmitter<string>();
  @Output() showCommentRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<TableRecord>();
  @Output() deleteRowId = new EventEmitter<string>();
  @Output() reAssignRow = new EventEmitter<TableRecord>();

  @Input() sortColumns: string[] = [];
  @Input() sortParamColumns?: string[] = [];
  @Input() isSorting = false;
  @Input("sortValue") set sortValue(data: Sorting) {
    if (data) {
      this.columnSelect = data.column;
      this.typeSort = data.sort;
    }
  }
  @Input() defaultColumn = "";

  @Input() displayedGroupFooter: string[];

  @ViewChildren(FormComponent) inputFields: QueryList<FormComponent>;
  @ViewChildren(MatCheckbox) matCheckboxes: QueryList<MatCheckbox>;

  public dataSource = new MatTableDataSource<TableRecord>();
  get displayedColumns(): string[] {
    return (this.displayedFields || []).map((field) => field.column);
  }

  @Output() sorted = new EventEmitter<Sorting>();
  @Output() changeCheckboxField = new EventEmitter<ChangeCheckbox>();

  actionLabels = Actions;

  // For footer
  @Input() footerData: { [key: string]: any };
  @Input() totalBy: string;
  @Input() totalValue: string;

  @Input() isNoDataMessage: boolean;
  @Input() messageOptions: OptionsMessage;
  statusWarning: StatusIcon = Icons.statusWarning;
  balloon: StatusIcon = Icons.balloon;
  // expansion
  expandedElements: boolean[] = [];
  @Input() expansionField: string;
  @Input() expansionTmplRef: TemplateRef<any>;
  @Input("expandedDefault")
  set expandedElementsDefault(data: boolean[]) {
    this.expandedElements = data || [];
  }

  // display pagination
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];
  @Input() currentPage: number;
  @Input() totalRecords: number;
  // ---->>
  @Output() onPageChanged: EventEmitter<PageChangeValue> = new EventEmitter<PageChangeValue>();
  // ---->>

  @Output("onCheckedAll") onCheckedAllChanged = new EventEmitter<boolean>();

  @Output() onToggleRow = new EventEmitter<RowData>();
  @Input() isExpanded = true;

  constructor(private cd: ChangeDetectorRef) {}

  toggleRow(index: number, event) {
    if (!this.isExpanded) return;
    event.stopPropagation();

    if ("expandable" in this.data[index] && !this.data[index].expandable) {
      this.expandedElements[index] = false;
      return;
    }

    this.expandedElements[index] = this.expandedElements[index] ? false : true;

    this.onToggleRow.emit({ index, value: this.expandedElements[index] });
    this.onElementExpanded.emit(this.expandedElements);
  }

  /**
   * use for table have select row
   */
  markCheckedItems(): void {
    (this.data || []).forEach((row) => {
      if (Object.isExtensible(row)) {
        this.excludedFields = this.excludedFields || [];
        row.checked =
          (this.checkedRows || []).findIndex((item) => shallowEqual({ ...item }, { ...row }, ["checked", ...this.excludedFields])) > -1;
      }
    });

    this.dataSource = new MatTableDataSource(this.data);
  }

  get isMultiSelection() {
    return (this.displayedFields || []).findIndex((row) => row.column === "checkbox") > -1;
  }

  getRecord(row: TableRecord) {
    if (this.isMultiSelection) {
      row.checked = !row.checked;
    }
    this.selectedRecord.emit(row);
  }

  getChangeCheckbox(checked: boolean, index: number) {
    this.changeCheckbox.emit({ index, checked: checked });
  }

  get isMultiSkipSelection() {
    return (this.displayedFields || []).findIndex((row) => row.column === "SkipCheckbox") > -1;
  }

  getSkipRow(row: TableRecord, index?: number) {
    if (this.isMultiSkipSelection) {
      row.checked = !row.checked;
    }
    if (index >= 0) {
      row.index = index;
    }
    this.selectedSkipRecord.emit(row);
  }

  onInputFieldEnter(event: Partial<KeyboardEvent>, inputField: FormComponent) {
    if (event.key === Keys.enterKey) {
      const fields = this.inputFields.toArray();
      let colIndex: number = fields.indexOf(inputField);

      while (fields[colIndex + 1]?.formControl.disabled) {
        colIndex++;
      }

      const nextInput = fields.find((_, i) => i == colIndex + 1);

      if (nextInput) {
        nextInput.inputElement.nativeElement.focus();
        nextInput.inputElement.nativeElement.select();
      }
    }
  }

  onInputDateEnter(event: Partial<KeyboardEvent>, rowIndex: number) {
    if (event.key === Keys.enterKey) {
      const nextInput = this.inputFields.find((input, inputIndex) => inputIndex === rowIndex + 1);
      if (nextInput) {
        nextInput.inputElement.nativeElement.focus();
      }
    }
  }

  isTextOverflow(element: HTMLElement, i: number) {
    this.tooltips[i] = element.offsetWidth < element.scrollWidth;
  }

  ngDoCheck() {
    this.cd.detectChanges();
  }

  onClickEditButton(row: TableRecord) {
    this.editRowId.emit(row.id.toString());
  }

  onClickReAssignButton(row: TableRecord) {
    this.reAssignRow.emit(row);
  }

  onClickShowComment(row: any) {
    this.showCommentRow.emit(row);
  }

  onClickDeleteButton(row: TableRecord, index?: number) {
    const deleteRow: string = row.id?.toString() || index.toString();
    this.deleteRowId.emit(deleteRow);
    this.deleteRow.emit(row);
  }

  onKeyup(event: KeyboardEvent, index: number) {
    if (event.code === "Enter") {
      const checkbox = this.matCheckboxes.find((item, i) => index === i);
      const result = { checked: !checkbox.checked, source: checkbox };
      checkbox.checked = result.checked;
      checkbox.change.next(result);
    }
  }

  public onSelectedItem(value: string, row: TableRecord, field: string) {
    row[field].selectedItem = value;
    this.selectedRecord.emit(row);
  }

  sortIconByCol(col: string) {
    if (col !== this.columnSelect) {
      return this.sortIcons[0].src;
    }
    if (col === this.columnSelect && this.typeSort === this.typeSorts[0]) {
      return this.sortIcons[1].src;
    }
    return this.sortIcons[2].src;
  }

  checkColumnHasSorting(col: string): boolean {
    if (this.isSorting === false || !this.sortColumns) {
      return false;
    }
    return this.sortColumns.includes(col);
  }

  onClickSort(col?: string | false): boolean {
    if (!col) {
      return true;
    }

    if (this.isSorting === false) {
      return true;
    }

    if (!this.sortColumns || this.sortColumns.includes(col) === false) {
      return false;
    }

    if (col === this.defaultColumn) {
      this.columnSelect = col;
      this.typeSort = this.typeSort === Sort.ASC ? Sort.DESC : Sort.ASC;
    } else if (col !== this.columnSelect) {
      this.columnSelect = col;
      this.typeSort = Sort.ASC;
    } else if (this.typeSort === Sort.ASC) {
      this.typeSort = Sort.DESC;
    } else {
      this.columnSelect = "";
      this.typeSort = "";
    }

    const sorting: Sorting = {
      column: this.columnSelect,
      sort: this.typeSort,
    };

    this.sorted.emit(sorting);
    return true;
  }

  callableFunction(name: string, event: MatCheckboxChange, index: number, row: TableRecord): void {
    const change: ChangeCheckbox = {
      key: name,
      label: row.label,
      checked: event.checked,
      row: { key: row.key, keyParent: row.keyParent },
    };
    this.changeCheckboxField.emit(change);
    if (typeof row[name] === "function") {
      row[name](event, index, row);
    }
  }

  isArrayValue(value: unknown) {
    return Array.isArray(value);
  }

  get groupRecords() {
    return this.groupRows || [];
  }

  isGroup(index) {
    return this.groupRecords?.some((row) => row.mainIndex === index);
  }

  getLabelGroupRows(mainIndex) {
    const row = this.groupRecords?.find((row) => row.mainIndex === mainIndex);
    return row ? row.labelTotalGroup : "";
  }

  getValueGroupRows(mainIndex) {
    const row = this.groupRecords?.find((row) => row.mainIndex === mainIndex);
    return row ? row.valueTotalGroup : "";
  }

  removeTag(str: string): string {
    return str.replace(/<[^>]+>/g, "");
  }

  onCheckedAll(checkBox: MatCheckboxChange) {
    this.onCheckedAllChanged.emit(checkBox.checked);
  }

  isAllChecked(key: string): boolean {
    return this.data.filter((x) => x[key]).length === this.data.length;
  }

  isSomeChecked(key: string): boolean {
    const checkedItems = this.data.filter((x) => x[key]);
    return this.data.length > checkedItems.length && checkedItems.length > 0;
  }

  typeOfValue(value: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" {
    return typeof value;
  }
}
