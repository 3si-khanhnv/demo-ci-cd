import { DebugElement, SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatesPipeModule } from "../../pipes/translates/translates.pipe.module";
import { SelectMultiComponent } from "./select-multi.component";
import { SelectMultiModule } from "./select-multi.module";

describe("SelectMultiComponent", () => {
  let component: SelectMultiComponent;
  let fixture: ComponentFixture<SelectMultiComponent>;
  let debugElement: DebugElement;

  const items = [
    { value: "CI100", label: "CI100" },
    { value: "CI200", label: "CI200" },
    { value: "CI50", label: "CI50" },
  ];
  const values = ["CI100", "CI200", "CI50"];
  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [SelectMultiModule, NoopAnimationsModule, TranslateModule.forRoot(), TranslatesPipeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultiComponent);
    component = fixture.componentInstance;
    component.items = items;
    component.tempSelected = component.items;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should set value for search items when in search mode", () => {
      // arrange
      component.isSearchAble = true;
      component.items = [{ label: "Label", value: "value" }];
      const expected = [{ label: "Label", value: "value", isSelected: false }];

      // act
      component.ngOnInit();

      // assert
      expect(component.itemsSearch).toEqual(expected);
    });
  });

  describe("filter", () => {
    it("should filter select list by key value", () => {
      // arrange
      const filter = "a";
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: false },
        { value: "b", label: "Bct", isSelected: true },
      ];
      const expected = [{ value: "a", label: "Act", isSelected: false }];

      // act
      component.filter(filter);

      // assert
      expect(component.itemsSearchFilter).toEqual(expected);
      expect(component.isDisplayAll).toEqual(false);
    });

    it("should return all items when not filter", () => {
      // arrange
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: false },
        { value: "b", label: "Bct", isSelected: true },
      ];
      const expected = [
        { value: "a", label: "Act", isSelected: false },
        { value: "b", label: "Bct", isSelected: true },
      ];

      // act
      component.filter("");

      // assert
      expect(component.itemsSearchFilter).toEqual(expected);
      expect(component.isDisplayAll).toEqual(true);
    });
  });

  describe("onSearchChange", () => {
    it("should filter selected items", () => {
      // arrange
      const searchValue = "search";
      const spy = jest.spyOn(component, "filter");
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: false },
        { value: "b", label: "Bct", isSelected: true },
      ];

      // act
      component.onSearchChange(searchValue);

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toBeCalledWith(searchValue);
    });
  });

  describe("optionClicked", () => {
    it("should call toggleSelection", () => {
      // arrange
      const event: Event = <any>{ stopPropagation: jest.fn() };
      const item = { value: "a", label: "Act", isSelected: false };
      const spy = jest.spyOn(component, "toggleSelection");
      const spy1 = jest.spyOn(event, "stopPropagation");
      component.matAutocomplete = {
        _getScrollTop: jest.fn().mockReturnValue(0),
      } as any;
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: false },
        { value: "b", label: "Bct", isSelected: true },
      ];

      // act
      component.optionClicked(event, item);

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(item);
    });
  });

  describe("optionEnter", () => {
    it("should call toggleSelection when event source select is true", () => {
      // arrange
      const event = {
        source: {
          selected: true,
        },
      } as any;
      const item = { value: "a", label: "Act", isSelected: false };
      const spy = jest.spyOn(component, "toggleSelection");
      component.matAutocomplete = {
        _getScrollTop: jest.fn().mockReturnValue(0),
      } as any;
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: false },
        { value: "b", label: "Bct", isSelected: true },
      ];

      // act
      component.optionEnter(event, item);

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(item);
    });

    it("should not doing anything when event source select is false", () => {
      // arrange
      const event = {
        source: {
          selected: false,
        },
      } as any;
      const item = { value: "a", label: "Act", isSelected: false };
      const spy = jest.spyOn(component, "toggleSelection");

      // act
      component.optionEnter(event, item);

      // assert
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("lastSelectedItemIndex", () => {
    it("should get index of last selected item", () => {
      // arrange
      component.itemsSearchFilter = [{ label: "Change", value: "change", isSelected: false }];
      const selected = [
        { select: undefined, isDisplayAll: true },
        { select: { label: "Change", value: "change" }, isDisplayAll: false },
        { select: { label: "Change", value: "change" }, isDisplayAll: true },
        { select: { label: "ALL", value: "ALL" }, isDisplayAll: true },
      ];
      const expected = [-1, 0, 1, 0];
      selected.forEach((select, index) => {
        component.lastSelectedItem = select.select;
        component.isDisplayAll = select.isDisplayAll;

        // act
        const act = component.lastSelectedItemIndex;

        // assert
        expect(act).toEqual(expected[index]);
      });
    });
  });

  describe("optionClickedAll", () => {
    it("should all unselected option and emit selected when select by click", () => {
      // arrange
      component.matAutocomplete = {
        _getScrollTop: jest.fn().mockReturnValue(0),
      } as any;
      const event: Event = <any>{ stopPropagation: jest.fn() };
      const spy1 = jest.spyOn(event, "stopPropagation");
      const spy2 = jest.spyOn(component.selected, "emit");
      const spy3 = jest.spyOn(component, "setDisplayValue");
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: true },
        { value: "b", label: "Bct", isSelected: true },
      ];
      const expected = [
        { value: "a", label: "Act", isSelected: false },
        { value: "b", label: "Bct", isSelected: false },
      ];
      const expectedLabel = "";
      const expectedSelectedItems = [];
      component.isSelectedAll = true;

      // act
      component.optionClickedAll(event);

      // assert
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
      expect(component.selectedItem).toEqual(expectedSelectedItems);
      expect(spy2).toHaveBeenCalledWith(expectedSelectedItems);
      expect(spy3).not.toHaveBeenCalled();
      expect(component.itemsSearch).toEqual(expected);
      expect(component.isSelectedAll).toEqual(false);
      expect(component.formControl.value).toEqual(expectedLabel);
      expect(component.scrollTopPosition).toEqual(0);
      expect(component.lastSelectedItem).toEqual({ label: "ALL", value: "ALL" });
    });

    it("should all selected option and emit selected", () => {
      // arrange
      component.matAutocomplete = {
        _getScrollTop: jest.fn().mockReturnValue(0),
      } as any;
      const event: Event = <any>{ stopPropagation: jest.fn() };
      const spy1 = jest.spyOn(event, "stopPropagation");
      const spy2 = jest.spyOn(component.selected, "emit");
      const spy3 = jest.spyOn(component, "setDisplayValue");
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: true },
        { value: "b", label: "Bct", isSelected: false },
      ];
      const expected = [
        { value: "a", label: "Act", isSelected: true },
        { value: "b", label: "Bct", isSelected: true },
      ];
      const expectedSelectedItems = ["a", "b"];
      component.isSelectedAll = false;

      // act
      component.optionClickedAll(event);

      // assert
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
      expect(component.selectedItem).toEqual(expectedSelectedItems);
      expect(spy2).toHaveBeenCalledWith(expectedSelectedItems);
      expect(spy3).toHaveBeenCalledTimes(1);
      expect(component.itemsSearch).toEqual(expected);
      expect(component.isSelectedAll).toEqual(true);
    });

    it("should all unselected option and emit selected when select by press enter", () => {
      // arrange
      const matOptionChange = {
        source: {
          selected: true,
        },
      } as any;
      component.matAutocomplete = {
        _getScrollTop: jest.fn().mockReturnValue(0),
      } as any;
      const spy = jest.spyOn(component.selected, "emit");
      const spy2 = jest.spyOn(component, "setDisplayValue");
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: true },
        { value: "b", label: "Bct", isSelected: true },
      ];
      const expected = [
        { value: "a", label: "Act", isSelected: false },
        { value: "b", label: "Bct", isSelected: false },
      ];
      const expectedLabel = "";
      const expectedSelectedItems = [];
      component.isSelectedAll = true;

      // act
      component.optionClickedAll(null, matOptionChange);

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.selectedItem).toEqual(expectedSelectedItems);
      expect(spy).toHaveBeenCalledWith(expectedSelectedItems);
      expect(spy2).not.toHaveBeenCalled();
      expect(component.itemsSearch).toEqual(expected);
      expect(component.isSelectedAll).toEqual(false);
      expect(component.formControl.value).toEqual(expectedLabel);
      expect(component.scrollTopPosition).toEqual(0);
      expect(component.lastSelectedItem).toEqual({ label: "ALL", value: "ALL" });
    });

    it("should all selected option and emit selected when select by press enter", () => {
      // arrange
      const matOptionChange = {
        source: {
          selected: true,
        },
      } as any;
      component.matAutocomplete = {
        _getScrollTop: jest.fn().mockReturnValue(0),
      } as any;
      const spy = jest.spyOn(component.selected, "emit");
      const spy2 = jest.spyOn(component, "setDisplayValue");
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: true },
        { value: "b", label: "Bct", isSelected: false },
      ];
      const expected = [
        { value: "a", label: "Act", isSelected: true },
        { value: "b", label: "Bct", isSelected: true },
      ];
      const expectedSelectedItems = ["a", "b"];
      component.isSelectedAll = false;

      // act
      component.optionClickedAll(null, matOptionChange);

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.selectedItem).toEqual(expectedSelectedItems);
      expect(spy).toHaveBeenCalledWith(expectedSelectedItems);
      expect(spy2).toHaveBeenCalledTimes(1);
      expect(component.itemsSearch).toEqual(expected);
      expect(component.isSelectedAll).toEqual(true);
    });

    it("should not doing anything when matOptionChange.source.selected is false", () => {
      // arrange
      const matOptionChange = {
        source: {
          selected: false,
        },
      } as any;

      const spy = jest.spyOn(component.selected, "emit");
      const spy2 = jest.spyOn(component, "setDisplayValue");
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: true },
        { value: "b", label: "Bct", isSelected: true },
      ];

      component.isSelectedAll = true;

      // act
      component.optionClickedAll(null, matOptionChange);

      // assert
      expect(spy).not.toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled();
    });
  });

  describe("toggleSelection", () => {
    it("should check select option", () => {
      // arrange
      component.matAutocomplete = {
        _getScrollTop: jest.fn().mockReturnValue(0),
      } as any;
      component.selectedItem = [];
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: false },
        { value: "b", label: "Bct", isSelected: false },
      ];
      const item = { value: "a", label: "Act", isSelected: false };
      const expectedSelectedItem = ["a"];
      const expectedItemsSearch = [
        { value: "a", label: "Act", isSelected: true },
        { value: "b", label: "Bct", isSelected: false },
      ];
      const expectedLastSelectedItem = item;
      const spy = jest.spyOn(component.selected, "emit");

      // act
      component.toggleSelection(item);

      // assert
      expect(component.selectedItem).toEqual(expectedSelectedItem);
      expect(component.itemsSearch).toEqual(expectedItemsSearch);
      expect(component.lastSelectedItem).toEqual(expectedLastSelectedItem);
      expect(component.scrollTopPosition).toEqual(0);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expectedSelectedItem);
    });

    it("should uncheck select option", () => {
      // arrange
      component.matAutocomplete = {
        _getScrollTop: jest.fn().mockReturnValue(0),
      } as any;
      component.selectedItem = ["a", "b"];
      component.itemsSearch = [
        { value: "a", label: "Act", isSelected: true },
        { value: "b", label: "Bct", isSelected: true },
      ];
      const item = { value: "a", label: "Act", isSelected: true };
      const expectedSelectedItem = ["b"];
      const expectedItemsSearch = [
        { value: "a", label: "Act", isSelected: false },
        { value: "b", label: "Bct", isSelected: true },
      ];
      const spy = jest.spyOn(component.selected, "emit");

      // act
      component.toggleSelection(item);

      // assert
      expect(component.selectedItem).toEqual(expectedSelectedItem);
      expect(component.itemsSearch).toEqual(expectedItemsSearch);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expectedSelectedItem);
    });
  });

  it("should validate the drop down option with Input items", () => {
    // arrange
    component.items = items;

    // act
    fixture.detectChanges();
    const matSelectTrigger = debugElement.query(By.css(".mat-mdc-select-trigger")).nativeElement;
    matSelectTrigger.click();
    fixture.detectChanges();

    const selectPanel = debugElement.query(By.css(".mat-mdc-select-panel"));
    const optionElement = debugElement.queryAll(By.css(".mat-mdc-option"));

    // assert
    expect(selectPanel).toBeTruthy();
    expect(optionElement[0].nativeElement.innerHTML).toContain("CI100");
    expect(optionElement[1].nativeElement.innerHTML).toContain("CI200");
    expect(optionElement[2].nativeElement.innerHTML).toContain("CI50");
  });

  it("should validate the drop down option select All", () => {
    // arrange
    component.items = items;
    component.all = true;
    component.allValue = "All";
    // act
    fixture.detectChanges();
    const matSelectTrigger = debugElement.query(By.css(".mat-mdc-select-trigger")).nativeElement;
    matSelectTrigger.click();
    fixture.detectChanges();
    const selectPanel = debugElement.query(By.css(".mat-mdc-select-panel"));
    const optionElement = debugElement.queryAll(By.css(".mat-mdc-option"));
    // assert
    expect(selectPanel).toBeTruthy();
    expect(optionElement[0].nativeElement.innerHTML).toContain("ALL");
    expect(optionElement[1].nativeElement.innerHTML).toContain("CI100");
    expect(optionElement[2].nativeElement.innerHTML).toContain("CI200");
    expect(optionElement[3].nativeElement.innerHTML).toContain("CI50");
  });

  it("should validate the default selected value", () => {
    // arrange
    component.items = items;
    component.selectedItem = ["CI100"];

    const expected = ["CI100"];

    // act
    fixture.detectChanges();

    const selectTrigger = debugElement.query(By.css(".mat-mdc-select-trigger")).nativeElement;
    selectTrigger.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const defaultSelectedValue = debugElement.query(By.css(".mat-select-value .mat-select-value-text")).nativeElement;
      // assert
      expect(defaultSelectedValue.innerHTML).toContain(expected);
    });
  });

  it("should call onSelectionChange method on select", () => {
    // arrange
    component.items = items;
    // act
    fixture.detectChanges();
    const selectBox = debugElement.query(By.css(".mat-mdc-select"));
    const onSelectionChangeMock = jest.spyOn(component, "onSelectionChange");
    selectBox.nativeElement.dispatchEvent(new Event("selectionChange"));
    fixture.detectChanges();
    // assert
    expect(onSelectionChangeMock).toHaveBeenCalled();
  });

  describe("ngOnChanges()", () => {
    it("should call ngOnChanges and not change tempSelected with selectedItem not in changes", () => {
      // arrange
      component.tempSelected = [];
      component.selectedItem = ["1", "2"];

      //act
      component.ngOnChanges({
        item: new SimpleChange([], "changes", false),
      });
      // assert
      expect(component.tempSelected).toEqual([]);
    });
    it("should call ngOnChanges then change tempSelected with selectedItem in changes", () => {
      // arrange
      component.tempSelected = [];
      component.selectedItem = ["1", "2"];

      //act
      component.ngOnChanges({
        selectedItem: new SimpleChange([], "changes", false),
      });
      // assert
      expect(component.tempSelected).toEqual(["1", "2"]);
    });

    it("should call ngOnChanges then change tempSelected with selectedItem and allValue", () => {
      // arrange
      component.items = items;
      component.tempSelected = [];
      component.selectedItem = ["CI100", "CI200", "CI50"];
      component.allValue = "all";

      //act
      component.ngOnChanges({
        selectedItem: new SimpleChange([], "changes", false),
      });
      // assert
      expect(component.tempSelected).toEqual([component.allValue, ...component.selectedItem]);
    });

    it("should call onSelectionChange & tempSelected equal to selectedItem on firstChange=true, items & selectedItem is not empty", () => {
      // arrange
      component.items = items;
      component.tempSelected = [];
      component.selectedItem = ["CI100", "CI200", "CI50"];
      component.allValue = "all";

      //act
      const spy = jest.spyOn(component, "onSelectionChange");
      component.ngOnChanges({
        selectedItem: new SimpleChange([], "changes", true),
      });
      // assert
      expect(component.tempSelected).toEqual([...component.selectedItem]);
      expect(spy).toHaveBeenCalled();
    });

    it("should not call onSelectionChange on firstChange=true, but items have no data", () => {
      // arrange
      component.items = undefined;
      component.tempSelected = [];
      component.selectedItem = ["CI100", "CI200", "CI50"];
      component.allValue = "all";

      //act

      const spy = jest.spyOn(component, "onSelectionChange");
      component.ngOnChanges({
        selectedItem: new SimpleChange([], "changes", true),
      });
      // assert
      expect(spy).not.toHaveBeenCalled();
    });

    it("should not call onSelectionChange when firstChange is true, but selectedItem has not all items", () => {
      // arrange
      component.items = items;
      component.tempSelected = [];
      component.selectedItem = ["CI100"];
      component.allValue = "all";

      //act
      component.ngOnChanges({
        selectedItem: new SimpleChange([], "changes", true),
      });
      const spy = jest.spyOn(component, "onSelectionChange");
      // assert
      expect(spy).not.toHaveBeenCalled();
    });

    it("should set value when in search mode", () => {
      // arrange
      component.isSearchAble = true;
      component.items = [
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
      ];
      component.selectedItem = ["1"];
      const expectedItemsSearch = [
        {
          label: "1",
          value: "1",
          isSelected: true,
        },
        {
          label: "2",
          value: "2",
          isSelected: false,
        },
      ];
      const spy = jest.spyOn(component, "setDisplayValue");

      //act
      component.ngOnChanges({
        selectedItem: new SimpleChange(undefined, ["1"], false),
      });

      // assert
      expect(component.itemsSearch).toEqual(expectedItemsSearch);
      expect(spy).toHaveBeenCalled();
    });

    it("should set flag isSelectedAll is true when allowed search in select multiple and selected all item no have checkbox 'all' ", () => {
      component.items = [
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
      ];

      component.isSearchAble = true;
      component.isSelectedAll = false;

      component.selectedItem = ["1", "2"];

      //act
      component.ngOnChanges({
        selectedItem: new SimpleChange(["1"], ["1", "2"], false),
      });

      // assert
      expect(component.isSelectedAll).toEqual(true);
    });

    it("should set flag isSelectedAll is true when allowed search in select multiple and selected all item have checkbox 'all' ", () => {
      component.items = [
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
      ];

      component.isSearchAble = true;
      component.isSelectedAll = false;

      component.selectedItem = ["all", "1", "2"];

      //act
      component.ngOnChanges({
        selectedItem: new SimpleChange(["1"], ["1", "2"], false),
      });

      // assert
      expect(component.isSelectedAll).toEqual(true);
    });

    it("should enable search form control when not disable select box", () => {
      // arrange
      const spy1 = jest.spyOn(component.formControl, "enable");
      const spy2 = jest.spyOn(component.formControl, "disable");
      component.disabled = false;

      //act
      component.ngOnChanges({
        disabled: new SimpleChange(undefined, false, false),
      });

      // assert
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(0);
      expect(spy1).toHaveBeenCalledWith({ emitEvent: false });
    });

    it("should disable search form control when disable select box", () => {
      // arrange
      const spy1 = jest.spyOn(component.formControl, "disable");
      const spy2 = jest.spyOn(component.formControl, "enable");
      component.disabled = true;

      //act
      component.ngOnChanges({
        disabled: new SimpleChange(false, true, false),
      });

      // assert
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(0);
      expect(spy1).toHaveBeenCalledWith({ emitEvent: false });
    });
  });

  describe("onSelectionChange() all is false", () => {
    it("should call onSelectionChange then allValue is not empty", (done) => {
      // arrange
      component.items = items;
      component.all = false;
      component.allValue = "All";
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(values);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(values);
    });
    it("should call onSelectionChange then allValue is empty", (done) => {
      // arrange
      component.items = items;
      component.all = false;
      component.allValue = "";
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(values);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(values);
    });
  });
  describe("onSelectionChange() all is true", () => {
    it("should call onSelectionChange allValue empty", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allValue = "";
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(values);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(values);
    });

    it("should call onSelectionChange click ALL when allSelected false", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = false;
      component.allValue = "All";
      component.oldSelected = [];
      component.tempSelected = [];
      const input = [component.allValue];
      const expectValue = [component.allValue, ...items.map((item) => item.value)];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });

    it("should call onSelectionChange click option when allSelected false return null", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = false;
      component.allValue = "All";
      component.oldSelected = ["CI200", "CI50"];
      component.tempSelected = ["CI200", "CI50"];
      const input = ["CI100", "CI200", "CI50"];
      const expectValue = ["All", "CI100", "CI200", "CI50"];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });

    it("should call onSelectionChange click option when allSelected true change to ALL", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = true;
      component.allValue = "All";
      component.oldSelected = ["All", "CI200", "CI50"];
      component.tempSelected = ["CI200", "CI50"];
      const input = ["CI100", "CI200", "CI50"];
      const expectValue = [];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });

    it("should call onSelectionChange click option when allSelected true change to UN-ALL", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = true;
      component.allValue = "All";
      component.oldSelected = ["All", "CI100", "CI200", "CI50"];
      component.tempSelected = ["All", "CI100", "CI200", "CI50"];
      const input = ["All", "CI100", "CI200"];
      const expectValue = ["CI100", "CI200"];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });

    it("should call onSelectionChange click ALL when allSelected true", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = true;
      component.allValue = "All";
      component.oldSelected = [];
      component.tempSelected = [];
      const input = [];
      const expectValue = [];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });

    it("should call onSelectionChange click ALL when allSelected false", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = false;
      component.allValue = "All";
      component.oldSelected = ["All", "CI100", "CI200", "CI50"];
      component.tempSelected = ["All", "CI100", "CI200", "CI50"];
      const input = [];
      const expectValue = [];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });
  });

  describe("getSelectNotAll()", () => {
    it("should return selectedItem when isStoryBook is false", () => {
      // arrange
      component.isStoryBook = false;
      component.selectedItem = values;
      component.tempSelected = [];
      // assert
      expect(component.getSelectNotAll()).toEqual(values);
    });
    it("should return tempSelected when isStoryBook is true", () => {
      // arrange
      component.isStoryBook = true;
      component.selectedItem = [];
      component.tempSelected = values;
      // assert
      expect(component.getSelectNotAll()).toEqual(values);
    });
    it("should return false when no input", () => {
      // arrange
      component.isStoryBook = false;
      component.selectedItem = [];
      // assert
      expect(component.getSelectNotAll()).toEqual([]);
    });
    it("should return false when no input", () => {
      // arrange
      component.isStoryBook = true;
      component.tempSelected = [];
      // assert
      expect(component.getSelectNotAll()).toEqual([]);
    });
    it("should return selected items", () => {
      // arrange
      const input = ["all", "CI200", "CI50"];
      component.allValue = "all";
      component.all = true;
      component.selectedItem = input;
      const expected = ["CI200", "CI50"];
      // assert
      expect(component.getSelectNotAll()).toEqual(expected);
    });
    it("should call when param null items length == 0", () => {
      // arrange
      component.allValue = "all";
      component.all = true;
      component.selectedItem = [];
      component.items = [];
      // assert
      expect(component.getSelectNotAll()).toEqual([]);
    });
    it("should call when param selectedItem is undefined", () => {
      // arrange
      component.allValue = "all";
      component.all = true;
      component.selectedItem = undefined;
      component.isStoryBook = false;
      component.tempSelected = [];
      component.items = items;
      // assert
      expect(component.getSelectNotAll()).toEqual([]);
    });
  });

  describe("setDisplayValue", () => {
    it("should call when blur select box", () => {
      // arrange
      component.items = [];
      component.isSearchAble = true;
      fixture.detectChanges();
      jest.spyOn(component, "setDisplayValue").mockImplementation();
      const inputSearch = fixture.debugElement.query(By.css("input"));

      // act
      inputSearch.triggerEventHandler("blur", {});

      // assert
      expect(component.setDisplayValue).toHaveBeenCalledTimes(1);
    });

    it("should set display input in search mode", () => {
      // arrange
      component.isSearchAble = true;
      const lastSearch = "abc";
      component.lastSearch = lastSearch;
      component.selectedItem = ["1"];
      component.items = [
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
      ];
      const itemsSelected = [["1"], ["1", "2"], ["1", "2", "3"], [], ["4"]];
      const expected = ["1", "1 (+1 other)", "1 (+2 others)", "", ""];

      itemsSelected.forEach((item: string[], index: number) => {
        // arrange
        component.selectedItem = item;

        //act
        component.setDisplayValue();

        // assert
        expect(component.formControl.value).toEqual(expected[index]);
      });
    });

    it("should clear search value when blur", () => {
      // arrange
      component.isSearchAble = true;
      component.clearSearchOnBlur = true;
      const lastSearch = "abc";
      component.lastSearch = lastSearch;
      component.selectedItem = ["1"];
      component.items = [
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
      ];
      component.selectedItem = ["1"];
      const expected = "";

      //act
      component.setDisplayValue();

      // assert
      expect(component.lastSearch).toEqual(expected);
    });

    it("should not clear search value when blur", () => {
      // arrange
      component.isSearchAble = true;
      component.clearSearchOnBlur = false;
      const lastSearch = "abc";
      component.lastSearch = lastSearch;
      component.selectedItem = ["1"];
      component.items = [
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
      ];
      component.selectedItem = ["1"];
      const expected = lastSearch;

      //act
      component.setDisplayValue();

      // assert
      expect(component.lastSearch).toEqual(expected);
    });

    it("should be show All", () => {
      // arrange
      component.isSearchAble = true;
      component.clearSearchOnBlur = false;
      const lastSearch = "All";
      component.lastSearch = lastSearch;
      component.selectedItem = ["1"];
      component.isSelectedAll = true;
      component.showLabelAll = true;
      component.items = [
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
      ];
      component.selectedItem = ["1", "2", "3"];
      const expected = "All";

      //act
      component.setDisplayValue();

      // assert
      expect(component.lastSearch).toEqual(expected);
    });
  });

  describe("onFocus", () => {
    it("should set to last search when focus into input search", () => {
      // arrange
      component.isSearchAble = true;
      const expected = component.lastSearch;
      const spy = jest.spyOn(component.formControl, "setValue");

      // act
      component.onFocus();

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expected);
    });

    it("should not doing anything when not in search mode", () => {
      // arrange
      component.isSearchAble = false;
      const spy = jest.spyOn(component.formControl, "setValue");

      // act
      component.onFocus();

      // assert
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("clearSearch", () => {
    it("should clear search value when call", () => {
      // arrange
      component.lastSearch = "132";
      const expected = "";

      // act
      component.clearSearch();

      // assert
      expect(component.lastSearch).toEqual(expected);
    });
  });

  describe("onKeydownEnter", () => {
    it("should open panel and set active item", () => {
      // arrange
      component.trigger = {
        openPanel: jest.fn(),
        panelOpen: true,
      } as any;
      component.matAutocomplete = {
        _keyManager: {
          updateActiveItem: jest.fn(),
        },
        _setScrollTop: jest.fn(),
        panelOpen: true,
      } as any;
      const scrollTopPosition = 0;
      Object.defineProperty(component, "lastSelectedItemIndex", { value: 0 });
      component.scrollTopPosition = scrollTopPosition;

      const spy = jest.spyOn(component.matAutocomplete, "_setScrollTop");
      const spy2 = jest.spyOn(component.matAutocomplete._keyManager, "updateActiveItem");
      jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback: FrameRequestCallback): number => {
        callback(0);
        return 0;
      });

      // act
      component.onKeydownEnter();

      // assert
      expect(spy).toHaveBeenCalledWith(scrollTopPosition);
      expect(spy2).toHaveBeenCalledWith(0);
      expect(component.trigger.openPanel).toHaveBeenCalled();
    });
  });
});
