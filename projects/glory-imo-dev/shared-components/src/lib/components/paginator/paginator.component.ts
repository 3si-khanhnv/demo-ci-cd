import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PageChangeValue } from "./paginator.component.i";
import { Settings } from "./paginator.constants";
import { Observable, of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { map } from "rxjs/operators";
import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";
@Component({
  selector: "imo-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"],
})
export class PaginatorComponent implements OnInit {
  settings = new Settings();
  pageSizeOptions: number[] = this.settings.pageSizeOptionsDefault;
  itemsPerPageOptions: LabelledValue<number>[] = this.pageSizeOptions.map((option) => ({ label: `${option}`, value: option }));

  @Input() resetOffset = true;
  @Input() pageSize = this.settings.pageSizeDefault;
  @Input("pageSizeOptions") set setPageSizeOptions(value: number[]) {
    if (value) {
      this.itemsPerPageOptions = value.map((option) => ({ label: `${option}`, value: option }));
    }
  }
  @Input() totalRecords: number;
  @Input() movingStep = this.settings.movingStepDefault;
  @Input() currentPage = 1;
  @Input() offset: number;

  @Output("offset") setOffset: EventEmitter<number> = new EventEmitter<number>();
  @Output() selected: EventEmitter<PageChangeValue> = new EventEmitter<PageChangeValue>();

  constructor(private translate: TranslateService) {
    this.updateOffsetValue(false);
  }
  sprintf(format: string, ...args: unknown[]) {
    return this.translate.get(format).pipe(
      map((res) => {
        // instant doesn't work too
        // expected: 'Translation Works'
        // result: 'testTranslation'
        let i = 0;
        return res.replace(/%s/g, () => {
          return String(args[i++]);
        });
      }),
    );
  }
  ngOnInit(): void {
    this.pageSizeOptions = this.pageSizeOptions || this.settings.pageSizeOptionsDefault;

    if (!this.pageSizeOptions.includes(this.pageSize)) {
      this.pageSizeOptions = [...this.pageSizeOptions, this.pageSize].sort((x, y) => x - y);
    }
  }

  /**
   * Displayed number records
   */
  get displayedRecords(): Observable<string> {
    // no records found
    if (!this.totalRecords) {
      return of(this.settings.labels.noRecordsFound);
    }
    return this.sprintf(this.settings.labels.displayedRecords, this.displayedFrom, this.displayedEnd, this.totalRecords);
  }

  get displayedFrom(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get displayedEnd(): number {
    const displayEnd = this.displayedFrom + this.pageSize - 1;
    return displayEnd > this.totalRecords ? this.totalRecords : displayEnd;
  }

  /**
   * Page numbers to select
   */
  get pages(): number[] {
    const steps = this.movingStep * 2 + 5;

    if (this.lastPageNumber <= steps) {
      return Array.from({ length: this.lastPageNumber }, (_, index) => {
        return index + 1;
      });
    }

    const startFrom = Math.min(Math.max(this.currentPage - this.movingStep, 3), this.lastPageNumber - this.movingStep + 3);
    const ellipseStart = this.currentPage > this.firstPageNumber + this.movingStep + 2;
    const ellipseEnd = this.currentPage + this.movingStep < this.lastPageNumber - 2;

    const pages = Array.from({ length: steps - 4 }, (_, index) => {
      if (!ellipseEnd) {
        return this.lastPageNumber - 2 - this.movingStep * 2 + index;
      }

      return startFrom + index;
    });

    return [this.firstPageNumber, ellipseStart ? null : 2, ...pages, ellipseEnd ? null : this.lastPageNumber - 1, this.lastPageNumber];
  }

  get firstPageNumber(): number {
    return 1;
  }

  get isFirstPage(): boolean {
    return this.currentPage - 1 === 0;
  }

  get lastPageNumber(): number {
    const ceil = Math.ceil(this.totalRecords / this.pageSize);
    return ceil > 0 ? ceil : 1;
  }

  /**
   * Page selected by clicked
   * @param pageNumber number
   * @returns void
   */
  onPageClicked(pageNumber: number) {
    if (this.currentPage === pageNumber) return;
    this.currentPage = pageNumber;
    this.updateOffsetValue();
  }

  /**
   * Click go previous a page
   */
  onClickedPrevious(): void {
    this.currentPage--;
    this.updateOffsetValue();
  }

  /**
   * Click next page
   */
  onClickedNext(): void {
    this.currentPage++;
    this.updateOffsetValue();
  }

  /**
   * Page size changed
   * Recalculating current page, offset and emit
   */
  onPageSizeChanged(pageSize: number): void {
    if (this.resetOffset) {
      this.offset = 0;
    }
    this.pageSize = pageSize;
    this.currentPage = Math.ceil(this.offset / this.pageSize);
    this.currentPage = this.currentPage ? this.currentPage : 1;
    this.updateOffsetValue();
  }

  /**
   * Update offset value and emit value
   * @param emit boolean
   */
  updateOffsetValue(emit = true): void {
    this.offset = (this.isFirstPage ? 0 : this.currentPage - 1) * this.pageSize;

    if (emit) {
      this.setOffset.emit(this.offset);
      this.selected.emit({ currentPage: this.currentPage, offset: this.offset, limit: this.pageSize });
    }
  }
}
