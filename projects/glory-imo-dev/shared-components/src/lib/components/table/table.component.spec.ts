import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl } from "@angular/forms";
import { MatCheckboxChange, MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatTableModule } from "@angular/material/table";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import moment from "moment";
import { HolidayNameSetting, CompanyData } from "./table.component.i";
import { FormComponent } from "../form/form.component";
import { PaginatorModule } from "../paginator/paginator.module";
import { TableComponent } from "./table.component";
import { Sorting, TableField, TableRecord } from "./table.component.i";
import { Keys, Sort } from "./table.constant";
import { Icons } from "../../constants/icons";

describe("TableComponent", () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let debugElement: DebugElement;

  const company = {
    company: "ABC Inc",
    location: "Christchurch",
  };

  const mockOrderDetailFieldNames: TableField[] = [
    { column: "currency", name: "Currency" },
    { column: "denomination", name: "Denomination" },
    { column: "currentInventory", name: "Current Inventory" },
    { column: "desiredInventory", name: "Desired Inventory" },
    { column: "suggestedNeed", name: "Suggested Need" },
    { column: "packSize", name: "Pack Size" },
    { column: "suggestedOrder", name: "Suggested Order" },
    { column: "actualOrderInputField", name: "Actual Order" },
    { column: "actualOrderValue", name: "Actual Order Value" },
  ];

  const mockOrderDetailData: TableRecord[] = [
    {
      currency: "NZD",
      denomination: 102.0,
      actualOrderInputField: {
        label: { aria: "", placeholder: "", type: "number", attrs: { min: 0 } },
        control: new FormControl(),
      },
    },
    {
      currency: "NZD",
      denomination: 50.0,
      actualOrderInputField: {
        label: { aria: "", placeholder: "", type: "number", attrs: { min: 0 } },
        control: new FormControl(),
      },
    },
    {
      currency: "JPY",
      denomination: 10000,
      actualOrderInputField: {
        label: { aria: "", placeholder: "", type: "number", attrs: { min: 0 } },
        control: new FormControl(),
      },
    },
    {
      currency: "JPY",
      denomination: 5000,
      actualOrderInputField: {
        label: { aria: "", placeholder: "", type: "number", attrs: { min: 0 } },
        control: new FormControl(),
      },
    },
  ];

  const mockCheckedRows: TableRecord[] = [
    { company: "Adopt Ltd", location: "Nakita", companyId: 2, locationId: 3, checked: true },
    { company: "Adopt Ltd", location: "Hawai", companyId: 2, locationId: 4, checked: true },
    { company: "XYZ Udt", location: "Hue", companyId: 3, locationId: 5, checked: true },
  ];

  const mockCompanyData: TableRecord[] = [
    { company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1 },
    { company: "ABC Inc", location: "Crawley", companyId: 1, locationId: 2 },
    { company: "Adopt Ltd", location: "Nakita", companyId: 2, locationId: 3 },
    { company: "Adopt Ltd", location: "Hawai", companyId: 2, locationId: 4 },
    { company: "XYZ Udt", location: "Hue", companyId: 3, locationId: 5 },
    { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 6 },
  ];

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [TableComponent, FormComponent],
      imports: [MatTableModule, MatRadioModule, MatCheckboxModule, PaginatorModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should checked default", () => {
    // arrange
    const expected = [
      { company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1, checked: false },
      { company: "ABC Inc", location: "Crawley", companyId: 1, locationId: 2, checked: false },
      { company: "Adopt Ltd", location: "Nakita", companyId: 2, locationId: 3, checked: true },
      { company: "Adopt Ltd", location: "Hawai", companyId: 2, locationId: 4, checked: true },
      { company: "XYZ Udt", location: "Hue", companyId: 3, locationId: 5, checked: true },
      { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 6, checked: false },
    ];

    // actual
    component.setCheckedRows = [...mockCheckedRows];
    component.setData = [...mockCompanyData.map((row) => (row = { ...row, checked: false }))];
    component.sortValue = { column: "name", sort: "asc" };
    const act = component.dataSource.data;

    // assert
    expect(JSON.stringify(act)).toEqual(JSON.stringify(expected));
  });

  it("should not checked default", () => {
    // arrange
    const expected = [
      { company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1, checked: false },
      { company: "ABC Inc", location: "Crawley", companyId: 1, locationId: 2, checked: false },
      { company: "Adopt Ltd", location: "Nakita", companyId: 2, locationId: 3, checked: false },
      { company: "Adopt Ltd", location: "Hawai", companyId: 2, locationId: 4, checked: false },
      { company: "XYZ Udt", location: "Hue", companyId: 3, locationId: 5, checked: false },
      { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 6, checked: false },
    ];

    // actual
    component.setCheckedRows = undefined;
    component.setData = [...mockCompanyData.map((row) => (row = { ...row, checked: false }))];
    component.sortValue = undefined;
    const act = component.dataSource.data;

    // assert
    expect(JSON.stringify(act)).toEqual(JSON.stringify(expected));
  });

  it("should nothing initial data by default", () => {
    // arrange
    const expected = [];

    // actual
    component.setCheckedRows = undefined;
    component.setData = undefined;
    const act = component.dataSource.data;

    // assert
    expect(JSON.stringify(act)).toEqual(JSON.stringify(expected));
  });

  describe("displayedColumns", () => {
    it("should change data", () => {
      // arrange
      const fields = [
        { column: "select", name: "" },
        { column: "company", name: "Company" },
        { column: "location", name: "Location" },
      ];
      const expected = ["select", "company", "location"];

      component.displayedFields = fields;

      // act
      fixture.detectChanges();

      // assert
      expect(component.displayedColumns).toEqual(expected);
    });
  });

  describe("getRecord", () => {
    it("should emit data", () => {
      // arrange
      const data: CompanyData = company;
      const spy = jest.spyOn(component.selectedRecord, "emit");
      // act
      component.setData = [data, { ...data }];
      component.getRecord(data);
      // assert
      expect(spy).toHaveBeenCalledWith(data);
    });

    it("should update checked value when multiple selection", () => {
      // arrange
      const fields = [
        { column: "checkbox", name: "" },
        { column: "company", name: "Company" },
        { column: "location", name: "Location" },
      ];
      const data: CompanyData = company;
      const spy = jest.spyOn(component.selectedRecord, "emit");
      // act
      component.displayedFields = fields;
      component.setData = [data, { ...data }];
      component.getRecord(data);
      // assert
      expect(spy).toHaveBeenCalledWith(data);
    });
  });

  describe("getSelected", () => {
    it("should emit data and reverse checked value", () => {
      // arrange
      const data = true;
      const index = 1;

      const spy = jest.spyOn(component.changeCheckbox, "emit");
      // act
      component.getChangeCheckbox(data, index);
      // assert
      const expected = {
        index: index,
        checked: true,
      };
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe("getSkipRow", () => {
    it("should emit data", () => {
      // arrange
      const data = {
        date: moment("2020-12-15"),
        day: "Tuesday",
        datePlaceHolder: {
          placeholder: "Select date",
        },
        nameInputField: {
          control: new FormControl(),
          label: {
            aria: "",
            placeHolder: "Input name",
            attrs: { name: HolidayNameSetting, maxlength: 99 },
          },
        },
        isDeletable: true,
        isSkippable: false,
        values: {
          name: "Christmas Day",
          date: "2020-12-15",
          isSkippable: false,
          isValid: true,
        },
        checked: false,
        index: 0,
      };
      const spy = jest.spyOn(component.selectedSkipRecord, "emit");
      // act
      component.setData = [data, { ...data }];
      component.getSkipRow(data, 1);
      // assert
      expect(spy).toHaveBeenCalledWith(data);
    });

    it("should update checked value when multiple selection", () => {
      // arrange
      const fields = [
        { column: "SkipCheckbox", name: "Skip" },
        { column: "whenIsHoliday", name: "WhenIsHoliday" },
        { column: "whenShouldTheOrderBePlaced", name: "WhenShouldTheOrderBePlaced" },
      ];
      const data: CompanyData = company;
      const spy = jest.spyOn(component.selectedSkipRecord, "emit");
      // act
      component.displayedFields = fields;
      component.setData = [data, { ...data }];
      component.getSkipRow(data);
      // assert
      expect(spy).toHaveBeenCalledWith(data);
    });
  });

  describe("onInputDateEnter", () => {
    it("keyboard is Enter and have next input to focus", () => {
      // arrange
      const event: Partial<KeyboardEvent> = {
        key: Keys.enterKey,
      };
      const rowIndex = 0;
      // act
      component.displayedFields = mockOrderDetailFieldNames;
      component.setData = mockOrderDetailData;
      fixture.detectChanges();
      const nextInput = component.inputFields.find((input, inputIndex) => inputIndex === rowIndex + 1);
      const spy = jest.spyOn(nextInput.inputElement.nativeElement, "focus");
      component.onInputDateEnter(event, rowIndex);
      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("keyboard is Enter and has no next input to focus", () => {
      // arrange
      const event: Partial<KeyboardEvent> = {
        key: Keys.enterKey,
      };
      const rowIndex = 5;
      // act
      component.displayedFields = mockOrderDetailFieldNames;
      component.setData = mockOrderDetailData;
      fixture.detectChanges();
      const spyNextInput = component.inputFields.find((input, inputIndex) => inputIndex === rowIndex + 1);
      component.onInputDateEnter(event, rowIndex);
      // assert
      expect(spyNextInput).toBeUndefined();
    });

    it("keyboard is not Enter", () => {
      // arrange
      const event: Partial<KeyboardEvent> = {
        key: Keys.shiftKey,
      };
      const rowIndex = undefined;
      // act
      component.displayedFields = mockOrderDetailFieldNames;
      component.setData = mockOrderDetailData;
      fixture.detectChanges();
      const spyNextInput = component.inputFields.find((input, inputIndex) => inputIndex === rowIndex + 1);
      component.onInputDateEnter(event, rowIndex);
      // assert
      expect(spyNextInput).toBeUndefined();
    });
  });

  describe("onInputFieldEnter", () => {
    it("keyboard is Enter and have next input to focus", () => {
      // arrange
      const event: Partial<KeyboardEvent> = {
        key: Keys.enterKey,
      };
      const field = {
        currency: "NZD",
        denomination: 20,
        actualOrderInputField: {
          label: { aria: "", placeholder: "", type: "number", attrs: { min: 0 } },
          control: new FormControl(null),
        },
      };
      const field2 = {
        currency: "NZD",
        denomination: 20,
        actualOrderInputField: {
          label: { aria: "", placeholder: "", type: "number", attrs: { min: 0 } },
          control: new FormControl(null),
        },
      };
      field2.actualOrderInputField.control.disable();

      component.displayedFields = mockOrderDetailFieldNames;
      component.setData = [field, field2, ...mockOrderDetailData];
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const lastField = debugElement.queryAll(By.directive(FormComponent)).pop();
        const spy = jest.spyOn(lastField.query(By.css("input")).nativeElement, "focus");

        // actual
        lastField.parent.triggerEventHandler("keyup", event);

        // assert
        expect(spy).not.toHaveBeenCalled();
      });
    });

    it("keyboard is Enter should move next to available input field", () => {
      // arrange
      const event: Partial<KeyboardEvent> = {
        key: Keys.enterKey,
      };
      const field = {
        currency: "NZD",
        denomination: 20,
        actualOrderInputField: {
          label: { aria: "", placeholder: "", type: "number", attrs: { min: 0 } },
          control: new FormControl(null),
        },
      };
      const field2 = {
        currency: "NZD",
        denomination: 20,
        actualOrderInputField: {
          label: { aria: "", placeholder: "", type: "number", attrs: { min: 0 } },
          control: new FormControl(null),
        },
      };
      field2.actualOrderInputField.control.disable();

      component.displayedFields = mockOrderDetailFieldNames;
      component.setData = [field, field2, ...mockOrderDetailData];
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const allFields = debugElement.queryAll(By.directive(FormComponent));
        const firstField = allFields[0];
        const nextEnabledField = allFields[2];
        const spy = jest.spyOn(nextEnabledField.query(By.css("input")).nativeElement, "focus");

        // actual
        firstField.parent.triggerEventHandler("keyup", event);

        // assert
        expect(spy).toHaveBeenCalled();
      });
    });

    it("keyboard is not Enter", () => {
      // arrange
      const event: Partial<KeyboardEvent> = {
        key: Keys.shiftKey,
      };
      const rowIndex = undefined;
      // act
      component.displayedFields = mockOrderDetailFieldNames;
      component.setData = mockOrderDetailData;
      fixture.detectChanges();
      const spyNextInput = component.inputFields.find((input, inputIndex) => inputIndex === rowIndex + 1);
      component.onInputFieldEnter(event, rowIndex);
      // assert
      expect(spyNextInput).toBeUndefined();
    });
  });

  describe("isTextOverflow", () => {
    it("should return true", () => {
      // arrange
      document.body.innerHTML = "<div id='name'></div>";
      const elem = document.getElementById("name");
      Object.defineProperty(elem, "offsetWidth", { configurable: true, value: 200 });
      Object.defineProperty(elem, "scrollWidth", { configurable: true, value: 500 });
      const expected = true;
      fixture.detectChanges();

      // act
      component.isTextOverflow(elem, 1);

      // assert
      expect(component.tooltips[1]).toEqual(expected);
    });
  });

  describe("onClickDeleteButton", () => {
    it("should call onClickDeleteButton and emit deleteRowId", (done) => {
      const value: TableRecord = {
        id: 1,
        status: "active",
        name: "Armorguard",
        country: "New Zealand",
        isDeletable: true,
      };

      const expected = "1";
      component.deleteRowId.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onClickDeleteButton(value);
    });

    it("should call onClickDeleteButton and emit deleteRowId without index input", (done) => {
      const value: TableRecord = {
        id: undefined,
        status: "active",
        name: "Armorguard",
        country: "New Zealand",
        isDeletable: true,
      };
      const input = 1;

      const expected = "1";
      component.deleteRowId.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onClickDeleteButton(value, input);
    });
  });

  describe("onClickEditButton", () => {
    it("should call onClickEditButton and emit editRowId", (done) => {
      // arrange
      const value: TableRecord = {
        id: 1,
        status: "active",
        name: "Armorguard",
        country: "New Zealand",
        isEditable: true,
      };
      const expected = "1";

      // act
      component.editRowId.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onClickEditButton(value);
    });
  });

  describe("onClickShowComment", () => {
    it("should call onClickShowComment and emit editRowId", (done) => {
      // arrange
      const value = {
        rejectorUserName: "John Smith",
        rejectedAt: "2021/07/02",
        rejectReason: "To generate HTML output, see package html/template",
      };
      // act
      component.showCommentRow.subscribe({
        next: (actual) => {
          expect(actual).toEqual(value);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onClickShowComment(value);
    });
  });

  describe("markCheckedItems", () => {
    it("should updated checked value", () => {
      // arrange
      const expected = [{ company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1, checked: true }];
      component.checkedRows = [...expected];
      component.data = [{ company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1, checked: false }];

      // act
      component.markCheckedItems();
      const received = component.data;

      // assert
      expect(received).toEqual(expected);
    });

    it("should updated checked value with excludedFields undefined", () => {
      // arrange
      const expected = [{ company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1, checked: true }];
      component.checkedRows = [...expected];
      component.data = [{ company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1, checked: false }];
      component.excludedFields = undefined;
      // act
      component.markCheckedItems();
      const received = component.data;

      // assert
      expect(received).toEqual(expected);
    });

    it("should not updated checked value when object is not extensible", () => {
      // arrange
      const expected = [{ company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1, checked: false }];
      component.checkedRows = [...expected];
      component.data = [{ company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1, checked: false }];
      Object.preventExtensions(component.data[0]);
      // act
      component.markCheckedItems();
      const received = component.data;

      // assert
      expect(received).toEqual(expected);
    });

    it("should not update checked value", () => {
      // arrange
      const expected = [{ company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1 }];
      component.checkedRows = undefined;
      component.data = [...expected];

      // act
      component.markCheckedItems();
      const received = component.data;

      // assert
      expect(received).toEqual(expected);
    });
  });

  describe("onKeyup", () => {
    it("should update on key up 'enter'", () => {
      // arrange
      component.displayedFields = [
        { column: "checkbox", name: "" },
        { column: "company", name: "Company" },
        { column: "location", name: "Location" },
      ];
      component.setData = [{ company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1, checked: false }];
      fixture.detectChanges();

      const spy = jest.spyOn(component.selectedRecord, "emit");
      const event = new KeyboardEvent("keyup", {
        bubbles: true,
        cancelable: true,
        code: "Enter",
        key: "Enter",
      });

      // actual
      const checkbox = debugElement.nativeElement.querySelector(".mat-mdc-cell .mat-mdc-checkbox");
      checkbox.dispatchEvent(event);

      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("should not update on key up not 'enter' or 'space", () => {
      // arrange
      component.displayedFields = [
        { column: "checkbox", name: "" },
        { column: "company", name: "Company" },
        { column: "location", name: "Location" },
      ];
      component.setData = [{ company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1, checked: false }];
      fixture.detectChanges();

      const spy = jest.spyOn(component.selectedRecord, "emit");
      const event = new KeyboardEvent("keyup", {
        bubbles: true,
        cancelable: true,
        code: "a",
      });

      // actual
      const checkbox = debugElement.nativeElement.querySelector(".mat-mdc-cell .mat-mdc-checkbox");
      checkbox.dispatchEvent(event);

      // assert
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("onSelectedItem", () => {
    it("should emit selectedRecord", (done) => {
      // arrange
      const value = "strap";
      const row: TableRecord = {
        unitSelectField: {
          selectedItem: "",
        },
      };
      const field = "unitSelectField";
      const expected = {
        unitSelectField: {
          selectedItem: "strap",
        },
      };

      // act
      component.selectedRecord.subscribe({
        next: (actual) => {
          // assert
          expect(actual).toEqual(expected);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onSelectedItem(value, row, field);
    });
  });

  describe("sortIconByCol", () => {
    it("column not match columnSelect and table has sorting", () => {
      // arrange
      component.sortColumns = ["status", "name"];
      component.isSorting = true;
      component.typeSorts = [Sort.ASC, Sort.DESC];
      component.typeSort = "asc";
      component.columnSelect = "";
      component.sortIcons = [Icons.arrows, Icons.arrowDown, Icons.arrowUp];
      const expected = Icons.arrows;

      // actual
      const act = component.sortIconByCol("status");

      // assert
      expect(act).toEqual(expected.src);
    });

    it("column match columnSelect and typeSorts equal asc", () => {
      // arrange
      component.sortColumns = ["status", "name"];
      component.isSorting = true;
      component.typeSorts = [Sort.ASC, Sort.DESC];
      component.typeSort = "asc";
      component.columnSelect = "status";
      component.sortIcons = [Icons.arrows, Icons.arrowDown, Icons.arrowUp];
      const expected = Icons.arrowDown;

      // actual
      const act = component.sortIconByCol("status");

      // assert
      expect(act).toEqual(expected.src);
    });

    it("column match columnSelect and typeSorts equal desc", () => {
      // arrange
      component.sortColumns = ["status", "name"];
      component.isSorting = true;
      component.typeSorts = [Sort.ASC, Sort.DESC];
      component.typeSort = "desc";
      component.columnSelect = "status";
      component.sortIcons = [Icons.arrows, Icons.arrowDown, Icons.arrowUp];
      const expected = Icons.arrowUp;

      // actual
      const act = component.sortIconByCol("status");

      // assert
      expect(act).toEqual(expected.src);
    });
  });

  describe("checkColumnHasSorting", () => {
    it("with isSorting is false", () => {
      // arrange
      const column = "name";
      component.isSorting = false;
      component.sortColumns = ["status", "name"];

      // actual
      const act = component.checkColumnHasSorting(column);

      // assert
      expect(act).toBe(false);
    });

    it("with  isSorting is true and sortColumns is undefined", () => {
      // arrange
      const column = "name";
      component.isSorting = true;
      component.sortColumns = undefined;

      // actual
      const act = component.checkColumnHasSorting(column);

      // assert
      expect(act).toBe(false);
    });

    it("with  isSorting is true and column is includes in sortColumns", () => {
      // arrange
      const column = "name";
      component.isSorting = true;
      component.sortColumns = ["status", "name"];

      // actual
      const act = component.checkColumnHasSorting(column);

      // assert
      expect(act).toBe(true);
    });
  });

  describe("onClickSort", () => {
    it("with not has column", () => {
      // arrange
      const column = false;
      component.sortColumns = ["status", "name"];

      // actual
      const act = component.onClickSort(column);

      // assert
      expect(act).toBe(true);
    });

    it("with isSorting is false", () => {
      // arrange
      const column = "name";
      component.isSorting = false;
      component.sortColumns = ["status", "name"];

      // actual
      const act = component.onClickSort(column);

      // assert
      expect(act).toBe(true);
    });

    it("with not has sortColumns", () => {
      // arrange
      const column = "name";
      component.isSorting = true;
      component.sortColumns = undefined;

      // actual
      const act = component.onClickSort(column);

      // assert
      expect(act).toBe(false);
    });

    it("with column not includes in sortColumns ", () => {
      // arrange
      const column = "country";
      component.isSorting = true;
      component.sortColumns = ["status", "name"];

      // actual
      const act = component.onClickSort(column);

      // assert
      expect(act).toBe(false);
    });

    it("should emit data and sort desc with column match defaultColumn ", (done) => {
      // arrange
      const column = "placeDate";
      component.sortColumns = ["status", "name", "placeDate"];
      component.typeSorts = [Sort.ASC, Sort.DESC];
      component.columnSelect = "";
      component.isSorting = true;
      component.typeSort = "asc";
      component.defaultColumn = "placeDate";
      const expected = {
        column: "placeDate",
        sort: "desc",
      };

      // actual
      component.sorted.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });

      // assert
      expect(component.onClickSort(column)).toBe(true);
    });

    it("should emit data and sort asc with column match defaultColumn ", (done) => {
      // arrange
      const column = "placeDate";
      component.sortColumns = ["status", "name", "placeDate"];
      component.typeSorts = [Sort.ASC, Sort.DESC];
      component.columnSelect = "";
      component.isSorting = true;
      component.typeSort = "desc";
      component.defaultColumn = "placeDate";
      const expected = {
        column: "placeDate",
        sort: "asc",
      };

      // actual
      component.sorted.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });

      // assert
      expect(component.onClickSort(column)).toBe(true);
    });

    it("should emit data with column not match columnSelect ", (done) => {
      // arrange
      const column = "name";
      component.sortColumns = ["status", "name"];
      component.typeSorts = [Sort.ASC, Sort.DESC];
      component.columnSelect = "";
      component.isSorting = true;
      component.typeSort = "";

      const expected = {
        column: "name",
        sort: "asc",
      };

      // actual
      component.sorted.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });

      // assert
      expect(component.onClickSort(column)).toBe(true);
    });

    it("should emit data with column has typeSort is asc ", (done) => {
      // arrange
      const column = "name";
      component.sortColumns = ["status", "name"];
      component.typeSorts = [Sort.ASC, Sort.DESC];
      component.columnSelect = "name";
      component.isSorting = true;
      component.typeSort = "asc";

      const expected = {
        column: "name",
        sort: "desc",
      };

      // actual
      component.sorted.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });

      // assert
      expect(component.onClickSort(column)).toBe(true);
    });

    it("should emit data with column has typeSort is desc ", (done) => {
      // arrange
      const column = "name";
      component.sortColumns = ["status", "name"];
      component.typeSorts = [Sort.ASC, Sort.DESC];
      component.columnSelect = "name";
      component.isSorting = true;
      component.typeSort = "desc";

      const expected = {
        column: "",
        sort: "",
      };

      // actual
      component.sorted.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });

      // assert
      expect(component.onClickSort(column)).toBe(true);
    });
  });

  describe("sortValue", () => {
    it("should update data columnSelect and typeSort", () => {
      // arrange
      const data: Sorting = {
        column: "orderNumber",
        sort: "asc",
      };

      // actual
      component.sortValue = data;

      // assert
      expect(component.columnSelect).toEqual(data.column);
      expect(component.typeSort).toEqual(data.sort);
    });

    it("should not update data columnSelect and typeSort", () => {
      // arrange
      const data = undefined;

      // actual
      component.sortValue = data;

      // assert
      expect(component.columnSelect).toEqual("");
      expect(component.typeSort).toEqual("");
    });
  });

  describe("callableFunction", () => {
    it("should call when instance of function", () => {
      // arrange
      const rowIndex = 0;
      const event = new MatCheckboxChange();
      const row = {
        a: () => {},
        b: "movie",
      };
      jest.spyOn(row, "a");

      // actual
      component.callableFunction("a", event, rowIndex, row);

      // assert
      expect(row.a).toHaveBeenCalled();
    });

    it("should not call when not a function", () => {
      // arrange
      const rowIndex = 0;
      const event = new MatCheckboxChange();
      const row = {
        a: jest.fn(),
        b: "movie",
      };

      // actual
      component.callableFunction("b", event, rowIndex, row);

      // assert
      expect(row.a).not.toHaveBeenCalled();
    });
  });

  describe("toggleRow", () => {
    it("should isExpanded is false return;", () => {
      // arrange
      component.isExpanded = false;

      // // act
      const expected = undefined;
      const value = component.toggleRow(0, 1);

      // assert
      expect(value).toEqual(expected);
    });

    it("should expandedElements return false", () => {
      // arrange
      component.data = [{ expandable: true }, { expandable: true }];
      component.expandedElements = [false, true];
      const index = 1;
      const event: Event = <any>{ stopPropagation: jest.fn() };
      // act
      component.toggleRow(index, event);
      const expected = false;
      // assert
      expect(component.expandedElements[index]).toEqual(expected);
    });

    it("should expandedElements return true", () => {
      // arrange
      component.data = [{ expandable: true }, { expandable: true }];
      component.expandedElements = [];
      const index = 0;
      const event: Event = <any>{ stopPropagation: jest.fn() };
      // act
      component.toggleRow(index, event);
      const expected = true;
      // assert
      expect(component.expandedElements[index]).toEqual(expected);
    });

    it("should expandedElements return false when nonexpendable", () => {
      // arrange
      component.data = [{ expandable: false }, { expandable: false }];
      component.expandedElements = [false, true];
      const index = 1;
      const event: Event = <any>{ stopPropagation: jest.fn() };
      // act
      component.toggleRow(index, event);
      const expected = false;
      // assert
      expect(component.expandedElements[index]).toEqual(expected);
    });
  });

  describe("expandedElementsDefault", () => {
    it("should be empty array for expandedElements", () => {
      // arrange
      component.expandedElements = undefined;
      const expected = [];

      // actual
      component.expandedElementsDefault = undefined;

      // assert
      expect(component.expandedElements).toEqual(expected);
    });

    it("should be array when have set for expandedElements", () => {
      // arrange
      component.expandedElements = undefined;
      const expected = [];

      // actual
      component.expandedElementsDefault = [];

      // assert
      expect(component.expandedElements).toEqual(expected);
    });
  });

  describe("groupRecords & isGroup & getLabelGroupRows & getValueGroupRows", () => {
    let groupRow;

    beforeEach(() => {
      groupRow = {
        currency: "USD",
        isGroup: true,
        labelTotalGroup: "Total Value (USD)",
        mainIndex: 5,
        type: "",
        valueTotalGroup: "100,000",
      };
    });

    it("should return groupRows value", () => {
      // arrange
      component.groupRows = [groupRow];

      // actual
      const actual = component.groupRecords;

      // assert
      expect(actual).toEqual([groupRow]);
    });

    it("should return empty array when groupRows undefined", () => {
      // arrange
      component.groupRows = undefined;

      // actual
      const actual = component.groupRecords;

      // assert
      expect(actual).toEqual([]);
    });

    it("should return true when the row is groupRow", () => {
      // arrange
      component.groupRows = [groupRow];

      // actual
      const actual = component.isGroup(5);

      // assert
      expect(actual).toBe(true);
    });

    it("should return undefined when no groupRows exist", () => {
      // arrange
      jest.spyOn(component, "groupRecords", "get").mockReturnValueOnce(undefined);

      // actual
      const actual = component.isGroup(5);

      // assert
      expect(actual).toBeUndefined();
    });

    it("should have empty label when groupRecords be undefined", () => {
      // arrange
      jest.spyOn(component, "groupRecords", "get").mockReturnValueOnce(undefined);

      // actual
      const actual = component.getLabelGroupRows(5);

      // assert
      expect(actual).toBe("");
    });

    it("should have empty label when record not found", () => {
      // arrange
      component.groupRows = [groupRow];

      // actual
      const actual = component.getLabelGroupRows(4);

      // assert
      expect(actual).toBe("");
    });

    it("should return label when record found", () => {
      // arrange
      component.groupRows = [groupRow];

      // actual
      const actual = component.getLabelGroupRows(5);

      // assert
      expect(actual).toBe(groupRow.labelTotalGroup);
    });

    it("should have empty value when groupRecords be undefined", () => {
      // arrange
      jest.spyOn(component, "groupRecords", "get").mockReturnValueOnce(undefined);

      // actual
      const actual = component.getValueGroupRows(5);

      // assert
      expect(actual).toBe("");
    });

    it("should have empty value when record not found", () => {
      // arrange
      component.groupRows = [groupRow];

      // actual
      const actual = component.getValueGroupRows(4);

      // assert
      expect(actual).toBe("");
    });

    it("should return value when record found", () => {
      // arrange
      component.groupRows = [groupRow];

      // actual
      const actual = component.getValueGroupRows(5);

      // assert
      expect(actual).toBe(groupRow.valueTotalGroup);
    });
  });

  describe("removeTag", () => {
    it("should return string not include tag", () => {
      // arrange
      const str = "<b>NZD</b>, <i>AUD</i>, <h1>USD</h1>, JPY, EUR, VND, MAD";
      // act
      const act = component.removeTag(str);
      // assert
      expect(act).toEqual("NZD, AUD, USD, JPY, EUR, VND, MAD");
    });
  });

  describe(TableComponent.prototype.onCheckedAll.name, () => {
    it(`should emit out check all value`, () => {
      // arrange
      const checkbox = <MatCheckboxChange>{ checked: true };
      const spy = jest.spyOn(component.onCheckedAllChanged, "emit");

      // act
      component.onCheckedAll(checkbox);

      // assert
      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe(TableComponent.prototype.isAllChecked.name, () => {
    it(`should to be true when all items are checked`, () => {
      // arrange
      component.data = [
        { isActivated: true, id: 1 },
        { isActivated: true, id: 2 },
        { isActivated: true, id: 3 },
      ];
      const checkboxFieldKey = "isActivated";

      // act
      const act = component.isAllChecked(checkboxFieldKey);

      // assert
      expect(act).toBe(true);
    });

    it(`should to be false when some items are checked`, () => {
      // arrange
      component.data = [
        { isActivated: false, id: 1 },
        { isActivated: false, id: 2 },
        { isActivated: true, id: 3 },
      ];
      const checkboxFieldKey = "isActivated";

      // act
      const act = component.isAllChecked(checkboxFieldKey);

      // assert
      expect(act).toBe(false);
    });
  });

  describe(TableComponent.prototype.isSomeChecked.name, () => {
    it(`should to be false when all items are checked`, () => {
      // arrange
      component.data = [
        { isActivated: true, id: 1 },
        { isActivated: true, id: 2 },
        { isActivated: true, id: 3 },
      ];
      const checkboxFieldKey = "isActivated";

      // act
      const act = component.isSomeChecked(checkboxFieldKey);

      // assert
      expect(act).toBe(false);
    });

    it(`should to be false when all no items are checked`, () => {
      // arrange
      component.data = [
        { isActivated: false, id: 1 },
        { isActivated: false, id: 2 },
        { isActivated: false, id: 3 },
      ];
      const checkboxFieldKey = "isActivated";

      // act
      const act = component.isSomeChecked(checkboxFieldKey);

      // assert
      expect(act).toBe(false);
    });

    it(`should to be true when some items are checked`, () => {
      // arrange
      component.data = [
        { isActivated: false, id: 1 },
        { isActivated: false, id: 2 },
        { isActivated: true, id: 3 },
      ];
      const checkboxFieldKey = "isActivated";

      // act
      const act = component.isSomeChecked(checkboxFieldKey);

      // assert
      expect(act).toBe(true);
    });
  });

  describe(TableComponent.prototype.typeOfValue.name, () => {
    it("it should return type of value", () => {
      const data = "text";
      const type = "string";
      //act
      const act = component.typeOfValue(data);

      expect(act).toEqual(type);
    });
  });
});
