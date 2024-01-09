import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from "@angular/core";
import { getFriendlyClass } from "../../utilities/common";
import { ExpansionPanelComponent } from "../expansion-panel/expansion-panel.component";
import { ExpandColumn, ExpandColumnType } from "../expansion-panel/expansion-panel.component.i";
import { ExpansionTable, ExpansionTableRow, Labels } from "./expansion-table.component.i";
import { Icons } from "../../constants/icons";

@Component({
  selector: "imo-expansion-table",
  templateUrl: "./expansion-table.component.html",
  styleUrls: ["./expansion-table.component.scss"],
})
export class ExpansionTableComponent implements AfterContentInit, OnInit {
  columns: string[] = [];
  expandColumns: ExpandColumnType[] = [];

  @Input() checkbox: boolean;
  @Input() radio: boolean;
  @Input("columns") set setColumns(data: (string | ExpandColumn)[]) {
    if (data && Array.isArray(data) && data.length) {
      if (typeof data[0] === "string") {
        this.columns = <string[]>data;
        this.expandColumns = (<string[]>data).map((x: string) => ({ column: x, name: x }));
      } else {
        this.columns = data.map((x: ExpandColumn) => x.name);
        this.expandColumns = <ExpandColumn[]>data;
      }
    }
  }
  @Input() table: ExpansionTable;

  @Input() expansion: TemplateRef<any>;

  @Input() labels: Labels;

  @Output() allChecked = new EventEmitter<boolean>();
  @Output() checked = new EventEmitter<ExpansionTableRow>();
  @Output() sorted = new EventEmitter<any>();

  @ContentChildren(ExpansionPanelComponent) panels: QueryList<ExpansionPanelComponent>;

  public sort = Icons.sort;
  public id = 1;
  public sortColumns = [];
  public columnSelect = "";
  public typeSort = "";
  public typeSorts = ["asc", "desc"];
  public sortIcons = [Icons.arrows, Icons.arrowUp, Icons.arrowDown];
  public getHeaderClass = getFriendlyClass;

  ngOnInit() {
    this.sortColumns = this.columns;
  }
  ngAfterContentInit() {
    if (this.panels) {
      this.panels.map((panel) => {
        panel.id = this.id;
      });
    }
  }

  public isSelected() {
    if (this.table && this.table.data) {
      return this.table.data.filter((row) => row.checked);
    }
  }

  public hasValue() {
    if (this.table) {
      return this.table.checked ? this.table.checked !== "none" : this.isSelected().length > 0;
    }
  }

  public isAllSelected() {
    if (this.table) {
      return this.table.checked ? this.table.checked === "all" : this.isSelected().length === this.table.data.length;
    }
  }

  public onCheck(data: ExpansionTableRow) {
    this.checked.emit(data);
  }

  public onAllCheck(event: Event, flag: boolean) {
    if (this.table) {
      this.table.data.map((row) => (row.checked = flag));
    }
    this.allChecked.emit(flag);
  }

  public trackById(index: number, item: ExpansionTableRow): number | string {
    return item.id;
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
  onColumnSort(col: string): boolean {
    if (col === undefined) {
      return false;
    }
    if (!this.sortColumns || this.sortColumns.includes(col) === false) {
      return false;
    }
    if (col !== this.columnSelect) {
      this.columnSelect = col;
      this.typeSort = this.typeSorts[0];
    } else if (this.typeSort === this.typeSorts[0]) {
      this.typeSort = this.typeSorts[1];
    } else {
      this.columnSelect = "";
      this.typeSort = "";
    }

    this.sorted.emit({ column: this.columnSelect, sort: this.typeSort });
    return true;
  }
  classOnColumn(col: string) {
    const taskHeaderClass = this.getHeaderClass(col, "table-header");
    if (!this.sortColumns) {
      return taskHeaderClass;
    }
    let classCol = this.sortColumns.includes(col) ? `${taskHeaderClass} sorted` : taskHeaderClass;
    if (col === this.columnSelect) {
      classCol = " sorted-select";
    }
    return classCol;
  }
}
