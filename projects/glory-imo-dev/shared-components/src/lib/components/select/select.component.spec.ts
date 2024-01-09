import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatesPipeModule } from "../../pipes/translates/translates.pipe.module";
import { SelectComponent } from "./select.component";

describe("SelectComponent", () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [SelectComponent],
      imports: [
        MatSelectModule,
        CommonModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        TranslatesPipeModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("position", () => {
    it("should set value when input value into component", () => {
      // arrange
      const value = "value";
      const expected = component.panelClass + ` ${value}`;

      // act
      component.position = value;

      // assert
      expect(component.panelClass).toEqual(expected);
    });

    it("should not set value when input value into component not have", () => {
      // arrange
      const value = "";
      const expected = component.panelClass;

      // act
      component.position = value;

      // assert
      expect(component.panelClass).toEqual(expected);
    });
  });

  describe("ngOnChanges", () => {
    it("should emit selected item from the list", () => {
      // arrange
      const changes: any = {
        selectedItem: {
          previousValue: "12:00 AM",
          currentValue: "12:30 AM",
          firstChange: false,
        },
      };
      component.isSetDisplayFilter = true;
      component.filterSearchControl.patchValue(changes.selectedItem.currentValue);
      //act
      component.ngOnChanges(changes);
      fixture.detectChanges();

      // assert
      expect(component.filterSearchControl.valid).toBe(true);
    });
  });

  describe("ngAfterViewInit", () => {
    it("display With value", () => {
      // arrange
      component.readonlyFormControl.patchValue("");

      //act
      component.ngAfterViewInit();
      fixture.detectChanges();

      // assert
      expect(component.filterSearchControl.valid).toBe(true);
      expect(component.readonlyFormControl.valid).toBe(false);
    });
  });

  describe("setDisabled", () => {
    it("should check setDisabled is true", () => {
      // arrange
      const action = jest.spyOn(component.filterSearchControl, "disable");

      // act
      component.setDisabled = true;
      fixture.detectChanges();

      // // assert
      expect(action).toHaveBeenCalled();
    });

    it("should check setDisabled is false", () => {
      // arrange

      const action = jest.spyOn(component.filterSearchControl, "enable");
      // act
      component.setDisabled = false;
      fixture.detectChanges();
      // // assert
      expect(action).toHaveBeenCalled();
    });
  });

  describe("setAutoComplete", () => {
    it("should check setAutoComplete", () => {
      const data = true;

      // act
      component.setAutoComplete = data;

      // assert
      expect(component.autoComplete).toEqual(true);
    });
  });

  describe("isReadonly", () => {
    it("should check isReadonly", () => {
      const readonly = true;

      // act
      component.isReadonly = readonly;
      component.readonlyFormControl.patchValue(component.selectedItemLabel);

      // assert
      expect(component._isReadonly).toEqual(true);
      expect(component.readonlyFormControl.valid).toBe(false);
    });
  });

  describe("onSelectionChange()", () => {
    it("should emit selected item from the list", (done) => {
      // arrange
      component.items = [{ label: "Manual", value: "Manual" }];
      fixture.detectChanges();
      const expected = "Manual";
      component.removeFocusAfterSelect = true;
      // assert

      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);

          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });

      // act
      component.onSelectionChange("Manual");
    });
  });

  describe("onSelectionSearchChange", () => {
    it("should emit selected value", () => {
      // arrange
      component.items = [{ label: "Change", value: "change" }];
      component.trigger = {
        closePanel: jest.fn(),
        panelOpen: true,
      } as any;
      const event = {
        isUserInput: true,
        source: {
          selected: true,
          value: "ABC",
        },
      } as any;
      const filter = "change";
      const expected = filter;
      const expectedFormValue = "Change";
      const expectedSelectionEvent = event;
      const spy = jest.spyOn(component.selected, "emit");
      const spyForm = jest.spyOn(component.filterSearchControl, "setValue");
      const spyOnSelectionOption = jest.spyOn(component, "onSelectionOption");

      // act
      component.onSelectionSearchChange(event, filter);

      // assert
      expect(component.filterValue).toEqual("");
      expect(component.selectedItem).toEqual(expected);
      expect(spy).toHaveBeenCalledWith(expected);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyForm).toHaveBeenCalledWith(expectedFormValue);
      expect(spyForm).toHaveBeenCalledTimes(1);
      expect(spyOnSelectionOption).toHaveBeenCalledWith(expectedSelectionEvent);
      expect(spyOnSelectionOption).toHaveBeenCalledTimes(1);
    });
  });

  describe("onClickSearchChange", () => {
    it("should change filter search value", () => {
      // arrange
      const spyForm = jest.spyOn(component.filterSearchControl, "setValue");

      // act
      component.onClickSearchChange();

      // assert
      expect(spyForm).toHaveBeenCalledWith("");
      expect(spyForm).toHaveBeenCalledTimes(1);
    });
  });

  describe("onSearchChange", () => {
    it("should change search value", () => {
      // arrange
      const filter = "change";
      const expected = filter;

      // act
      component.onSearchChange(filter);

      // assert
      expect(component.filterValue).toEqual(expected);
    });
  });

  describe("filteredItems", () => {
    it("should return list items have been filter", () => {
      // arrange
      component.items = [
        { label: "Change", value: "change" },
        { label: "Test", value: "test" },
      ];
      component.filterValue = "change";
      const expected = [{ label: "Change", value: "change" }];

      // act
      const act = component.filteredItems;

      // assert
      expect(act).toEqual(expected);
    });

    it("should return list items when not have filter value", () => {
      // arrange
      component.items = [
        { label: "Change", value: "change" },
        { label: "Test", value: "test" },
      ];
      component.filterValue = "";
      const expected = [
        { label: "Change", value: "change" },
        { label: "Test", value: "test" },
      ];

      // act
      const act = component.filteredItems;

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe("selectedItemLabel", () => {
    it("should get label of selected item", () => {
      // arrange
      component.items = [{ label: "Change", value: "change" }];
      const selected = [undefined, "a", "change"];
      const expected = ["", "", "Change"];

      selected.forEach((select, index) => {
        component.selectedItem = select;

        // act
        const act = component.selectedItemLabel;

        // assert
        expect(act).toEqual(expected[index]);
      });
    });
  });

  describe("onFocusSearchField", () => {
    it("should change value when focus in search field", () => {
      // arrange
      component.filterValue = "change";
      const expected = "change";
      const spy = jest.spyOn(component.filterSearchControl, "setValue");

      // act
      component.onFocusSearchField();

      // arrange
      expect(spy).toHaveBeenCalledWith(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("onBlurSearchField", () => {
    it("should call when blur input", () => {
      // arrange
      component.autoComplete = true;
      component.items = [];
      fixture.detectChanges();

      const inputSearch = fixture.debugElement.query(By.css("input"));
      jest.spyOn(component, "onBlurSearchField").mockImplementation();

      // act
      inputSearch.triggerEventHandler("blur", { target: { value: "123" } });

      // assert
      expect(component.onBlurSearchField).toHaveBeenCalledTimes(1);
    });

    it("should change value of form when blur in search field", () => {
      // arrange
      const expected = component.selectedItemLabel;
      const spy = jest.spyOn(component.filterSearchControl, "setValue");

      // act
      component.onBlurSearchField("123");

      // arrange
      expect(spy).toHaveBeenCalledWith(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should clear search value when blur", () => {
      // arrange
      const expected = "";
      component.clearSearchOnBlur = true;
      component.filterValue = "123";

      // act
      component.onBlurSearchField("123");

      // assert
      expect(component.filterValue).toEqual(expected);
    });

    it("should not clear search value when blur", () => {
      // arrange
      const expected = "123";
      component.clearSearchOnBlur = false;
      component.filterValue = "123";

      // act
      component.onBlurSearchField("123");

      // assert
      expect(component.filterValue).toEqual(expected);
    });
  });

  describe("clearSearch", () => {
    it("should clear search value", () => {
      // arrange
      const expected = "";
      component.filterValue = "123";

      // act
      component.clearSearch();

      // assert
      expect(component.filterValue).toEqual(expected);
    });
  });

  describe("displayWith", () => {
    it("display With value", () => {
      // arrange
      const value = 500;
      component.isSetDisplayFilter = true;
      const expected = 500;

      // act
      component.displayWith(value);

      // assert
      expect(value).toEqual(expected);
    });
  });

  describe("onSelectionOption", () => {
    it("should be set option", () => {
      // arrange

      const event = {
        isUserInput: true,
        source: {
          value: "ABC",
        },
      };

      // act
      component.onSelectionOption(event as any);

      // assert
      expect(component.optionSelect).toEqual(event.source.value);
    });
    it("should be not set option", () => {
      // arrange
      component.optionSelect = null;
      const event = {
        isUserInput: false,
        source: {
          value: "ABC",
        },
      };

      // act
      component.onSelectionOption(event as any);

      // assert
      expect(component.optionSelect).toEqual(null);
    });
  });

  describe("onSearchKeydown", () => {
    it("should be onEnter is true and optionSelect not null", () => {
      // arrange

      const event = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      };
      component.trigger = {
        closePanel: jest.fn(),
        panelOpen: true,
      } as any;
      // act
      component.onToggleClick(event);
      // assert

      expect(event.preventDefault).toBeCalled();
      expect(event.stopPropagation).toBeCalled();
    });
  });
});
