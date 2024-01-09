import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SelectModule } from "../select/select.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { PaginatorComponent } from "./paginator.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
describe("PaginatorComponent", () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let translateService: jest.Mocked<TranslateService>;
  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      providers: [TranslateService],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        SvgIconModule,
        MatButtonModule,
        FlexLayoutModule,
        SelectModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService) as jest.Mocked<TranslateService>;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return 1 for first page", () => {
    expect(component.firstPageNumber).toBe(1);
  });

  describe("ngOnInit", () => {
    it("should set pageSizeOptions to default if not defined", () => {
      // arrange
      component.pageSizeOptions = undefined;
      const expected = component.settings.pageSizeOptionsDefault;

      // actual
      component.ngOnInit();

      // assert
      expect(component.pageSizeOptions).toEqual(expected);
    });

    it("should add new pageSizeOption when page size not in list of choice", () => {
      // arrange
      const pageSize = 17;
      component.pageSizeOptions = [15, 20];
      component.pageSize = pageSize;
      const expected = [15, pageSize, 20];

      // actual
      component.ngOnInit();

      // assert
      expect(component.pageSizeOptions).toEqual(expected);
    });
  });

  describe("displayedRecords", () => {
    it("should return number of start display", () => {
      // arrange
      component.currentPage = 1;
      component.pageSize = 15;

      // actual
      const actual = component.displayedFrom;

      // assert
      expect(actual).toBe(1);
    });

    it("should return number of end display", () => {
      // arrange
      component.currentPage = 1;
      component.pageSize = 15;

      // actual
      const actual = component.displayedEnd;

      // assert
      expect(actual).toBe(15);
    });

    it("should return number of end display with last record", () => {
      // arrange
      component.totalRecords = 25;
      component.currentPage = 2;
      component.pageSize = 15;

      // actual
      const actual = component.displayedEnd;

      // assert
      expect(actual).toBe(25);
    });

    it("should display string record from 1 - 15", (done) => {
      // arrange
      component.totalRecords = 25;
      component.currentPage = 1;
      component.pageSize = 15;
      const expected = `1 - 15 of ${component.totalRecords}`;

      jest.spyOn(translateService, "get").mockReturnValue(of("%s - %s of %s"));
      // actual
      const actual = component.displayedRecords;
      // assert
      actual.subscribe((data) => {
        console.log(data);
        expect(data).toBe(expected);
        done();
      });
    });
    it("should display 0 record", (done) => {
      // arrange
      component.totalRecords = 0;
      component.currentPage = 1;
      component.pageSize = 15;
      const expected = "inform.common.paginationNoRecords";

      jest.spyOn(translateService, "get").mockReturnValue(of("%s - %s of %s"));
      // actual
      const actual = component.displayedRecords;
      // assert
      actual.subscribe((data) => {
        console.log(data);
        expect(data).toBe(expected);
        done();
      });
    });
  });

  describe("pages", () => {
    it("should return array with 5 elements when moving page by 3 steps but only 5 pages", () => {
      // arrange
      component.totalRecords = 48;
      component.currentPage = 1;
      component.pageSize = 10;
      component.movingStep = 3;

      // actual
      const actual = component.pages;

      // assert
      expect(actual).toEqual([1, 2, 3, 4, 5]);
    });

    it("should return array with 11 elements when moving page by 3 steps", () => {
      // arrange
      component.totalRecords = 255;
      component.currentPage = 6;
      component.pageSize = 15;
      component.movingStep = 3;

      // actual
      const actual = component.pages;

      // assert
      expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, null, 17]);
    });

    it("should return array with 12 elements when moving page by 3 steps and included first page", () => {
      // arrange
      component.totalRecords = 255;
      component.currentPage = 2;
      component.pageSize = 15;
      component.movingStep = 3;

      // actual
      const actual = component.pages;

      // assert
      expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, null, 17]);
    });

    it("should return array with 11 elements when moving page by 3 steps and included last page", () => {
      // arrange
      component.totalRecords = 255;
      component.currentPage = 17;
      component.pageSize = 15;
      component.movingStep = 3;

      // actual
      const actual = component.pages;

      // assert
      expect(actual).toEqual([1, null, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
    });
  });

  describe("lastPageNumber", () => {
    it("should return last page number", () => {
      // arrange
      component.movingStep = 3;
      component.totalRecords = 91;
      component.pageSize = 10;
      const expected = 10;

      // actual
      const actual = component.lastPageNumber;

      // assert
      expect(actual).toBe(expected);
    });
  });

  describe("onPageClicked", () => {
    it("should update currentPage when select a page", () => {
      // arrange
      component.currentPage = 2;
      const spy = jest.spyOn(component, "updateOffsetValue");

      // actual
      component.onPageClicked(3);

      // assert
      expect(component.currentPage).toBe(3);
      expect(spy).toHaveBeenCalled();
    });

    it("should not update when self called", () => {
      // arrange
      component.currentPage = 3;
      const spy = jest.spyOn(component, "updateOffsetValue");

      // actual
      component.onPageClicked(3);

      // assert
      expect(component.currentPage).toBe(3);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("onClickedPrevious", () => {
    it("should decrease 1 page number", () => {
      // arrange
      component.currentPage = 2;
      const spy = jest.spyOn(component, "updateOffsetValue");

      // actual
      component.onClickedPrevious();

      // assert
      expect(component.currentPage).toBe(1);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onClickedNext", () => {
    it("should increase 1 page number", () => {
      // arrange
      component.currentPage = 1;
      const spy = jest.spyOn(component, "updateOffsetValue");

      // actual
      component.onClickedNext();

      // assert
      expect(component.currentPage).toBe(2);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onPageSizeChanged", () => {
    it("should update current page number and update offset value then emit", () => {
      // arrange
      component.pageSize = 15;
      component.offset = 74;
      component.currentPage = 5;
      component.resetOffset = false;
      const spy1 = jest.spyOn(component, "updateOffsetValue");

      // actual
      component.onPageSizeChanged(30);

      // assert
      expect(component.currentPage).toBe(3);
      expect(spy1).toHaveBeenCalled();
      expect(component.offset).toBe(60);
    });

    it("should reset offset value to zero then emit", () => {
      // arrange
      component.pageSize = 15;
      component.offset = 74;
      component.currentPage = 5;
      const spy1 = jest.spyOn(component, "updateOffsetValue");

      // actual
      component.onPageSizeChanged(30);

      // assert
      expect(component.currentPage).toBe(1);
      expect(spy1).toHaveBeenCalled();
      expect(component.offset).toBe(0);
    });

    it("should update current page become 1 when page size contains all records", () => {
      // arrange
      component.currentPage = 2;
      component.pageSize = 50;
      component.offset = 0;
      const spy1 = jest.spyOn(component, "updateOffsetValue");

      // actual
      component.onPageSizeChanged(50);

      // assert
      expect(component.currentPage).toBe(1);
      expect(spy1).toHaveBeenCalled();
    });
  });

  describe("updateOffsetValue", () => {
    it("should not update offset value of first page and without emit", () => {
      // arrange
      component.pageSize = 15;
      component.offset = 0;
      component.currentPage = 1;
      const spy1 = jest.spyOn(component.setOffset, "emit");
      const spy2 = jest.spyOn(component.selected, "emit");

      // actual
      component.updateOffsetValue(false);

      // assert
      expect(spy1).not.toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled();
    });

    it("should update offset value and and emit", () => {
      // arrange
      component.pageSize = 15;
      component.offset = 0;
      component.currentPage = 3;
      const spy1 = jest.spyOn(component.setOffset, "emit");
      const spy2 = jest.spyOn(component.selected, "emit");

      // actual
      component.updateOffsetValue();

      // assert
      expect(component.offset).toBe(30);
      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });
  });
});
