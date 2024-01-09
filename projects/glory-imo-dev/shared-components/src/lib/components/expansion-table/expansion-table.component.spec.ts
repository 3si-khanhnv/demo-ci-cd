import { Component, ContentChildren } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ExpansionPanelComponent } from "../expansion-panel/expansion-panel.component";
import { ExpansionPanelModule } from "../expansion-panel/expansion-panel.module";
import { ExpansionTableComponent } from "./expansion-table.component";
import { ExpansionTableRow } from "./expansion-table.component.i";
import { ExpansionTableModule } from "./expansion-table.module";
import { Icons } from "../../constants/icons";

@Component({
  selector: "imo-test",
  template: `
    <imo-expansion-table>
      <imo-expansion-panel [id]="1"></imo-expansion-panel>
    </imo-expansion-table>
  `,
})
class ExpansionPanelContainerComponent {
  public id: number;
  @ContentChildren(ExpansionPanelComponent) expansionPanel: ExpansionPanelComponent;
}

describe("ExpansionTableComponent", () => {
  let component: ExpansionTableComponent;
  let containerComponent: ExpansionPanelContainerComponent;
  let fixture: ComponentFixture<ExpansionTableComponent>;
  let containerFixture: ComponentFixture<ExpansionPanelContainerComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [ExpansionTableModule, ExpansionPanelModule, BrowserAnimationsModule],
      declarations: [ExpansionPanelContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionTableComponent);
    containerFixture = TestBed.createComponent(ExpansionPanelContainerComponent);
    containerComponent = containerFixture.debugElement.children[0].componentInstance;
    component = fixture.componentInstance;
    fixture.detectChanges();
    containerFixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngAfterContentInit", () => {
    it("should set ids", () => {
      // act
      containerFixture.detectChanges();
      component.ngAfterContentInit();
      // assert
      expect(containerComponent.id).toEqual(component.id);
    });

    it("should not set ids", () => {
      // arrange
      component.id = 2;
      component.panels = undefined;
      // act
      component.ngAfterContentInit();
      // assert
      expect(containerComponent.id).not.toEqual(component.id);
    });
  });

  describe("isSelected()", () => {
    it("should return checked rows", () => {
      // arrange
      const expected = [
        { checked: true, id: 2 },
        { checked: true, id: 3 },
      ];
      const data: ExpansionTableRow[] = [...expected, { checked: false, id: 1 }, { checked: false, id: 4 }];
      component.table = { data };
      // act
      const actual = component.isSelected();
      // assert
      expect(actual).toEqual(expected);
    });

    it("should not return when table invalid", () => {
      // arrange
      const expected = [
        { checked: true, id: 2 },
        { checked: true, id: 3 },
      ];
      component.table = undefined;
      // act
      const actual = component.isSelected();
      // assert
      expect(actual).not.toEqual(expected);
    });
  });

  describe("hasValue()", () => {
    it("should return true", () => {
      // arrange
      const expected = true;
      const data: ExpansionTableRow[] = [
        { checked: false, id: 1 },
        { checked: true, id: 2 },
        { checked: true, id: 3 },
        { checked: false, id: 4 },
      ];
      component.table = { data };
      // act
      const actual = component.hasValue();
      // assert
      expect(actual).toEqual(expected);
    });

    it("should return false", () => {
      // arrange
      const expected = false;
      const data: ExpansionTableRow[] = [
        { checked: false, id: 1 },
        { checked: false, id: 2 },
        { checked: false, id: 3 },
        { checked: false, id: 4 },
      ];
      component.table = { data };
      // act
      const actual = component.hasValue();
      // assert
      expect(actual).toEqual(expected);
    });

    it("should return true when table checked is 'all' ", () => {
      // arrange
      component.table = {
        checked: "all",
        data: [],
      };
      fixture.detectChanges();
      const expected = true;
      // act
      const actual = component.hasValue();
      // assert
      expect(actual).toBe(expected);
    });

    it("should not return when table is invalid", () => {
      // arrange
      const expected = false;
      component.table = undefined;
      // act
      const actual = component.hasValue();
      // assert
      expect(actual).not.toEqual(expected);
    });
  });

  describe("isAllSelected()", () => {
    it("should return true", () => {
      // arrange
      const expected = true;
      const data: ExpansionTableRow[] = [
        { checked: true, id: 1 },
        { checked: true, id: 2 },
      ];
      component.table = { data };
      // act
      const actual = component.isAllSelected();
      // assert
      expect(actual).toEqual(expected);
    });

    it("should return false", () => {
      // arrange
      const expected = false;
      const data: ExpansionTableRow[] = [
        { checked: false, id: 1 },
        { checked: true, id: 2 },
      ];
      component.table = { data };
      // act
      const actual = component.isAllSelected();
      // assert
      expect(actual).toEqual(expected);
    });

    it("should return true with all checked", () => {
      // arrange
      const expected = true;
      component.table = {
        checked: "all",
        data: [],
      };
      // act
      const actual = component.isAllSelected();
      // assert
      expect(actual).toEqual(expected);
    });

    it("should return true with intermediate", () => {
      // arrange
      const expected = false;
      component.table = {
        checked: "partial",
        data: [],
      };
      // act
      const actual = component.isAllSelected();
      // assert
      expect(actual).toEqual(expected);
    });

    it("should not return when table invalid", () => {
      // arrange
      const expected = false;
      component.table = undefined;
      // act
      const actual = component.isAllSelected();
      // assert
      expect(actual).not.toEqual(expected);
    });
  });

  describe("onCheck", () => {
    it("should emit row", (done) => {
      // arrange
      const expected: ExpansionTableRow = { id: "some identity", checked: false };
      // assert
      component.checked.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onCheck(expected);
    });
  });

  describe("onAllCheck", () => {
    it("should emit row", (done) => {
      // arrange
      const expected = false;
      const event = {};
      // assert
      component.allChecked.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onAllCheck(event as any, expected);
    });

    it("should emit row without table is valid", (done) => {
      // arrange
      const expected = false;
      const event = {};
      const data: ExpansionTableRow[] = [{ checked: true, id: 1 }];
      component.columns = ["id"];
      component.table = { data };
      //   component.checkbox = true;
      // assert
      component.allChecked.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onAllCheck(event as any, expected);
    });
  });

  describe("trackById", () => {
    it("shoud return id", () => {
      const expected = 1;
      const item: ExpansionTableRow = {
        id: 1,
        checked: true,
      };
      const act = component.trackById(1, item);
      expect(act).toEqual(expected);
    });
  });

  describe("table sort", () => {
    it("sortIconByCol column not match columnSelect and table has sorting", () => {
      component.sortColumns = ["serial", "name", "model"];
      component.typeSorts = ["asc", "desc"];
      component.typeSort = "asc";
      component.columnSelect = "";
      component.sortIcons = [Icons.arrows, Icons.arrowDown, Icons.arrowUp];
      const expectd = Icons.arrows;
      expect(component.sortIconByCol("serial")).toEqual(expectd.src);
    });

    it("sortIconByCol column match columnSelect and typeSorts equal asc", () => {
      component.sortColumns = ["serial", "name", "model"];
      component.typeSorts = ["asc", "desc"];
      component.typeSort = component.typeSorts[0];
      component.columnSelect = "serial";
      component.sortIcons = [Icons.arrows, Icons.arrowDown, Icons.arrowUp];
      const expectd = Icons.arrowDown;
      expect(component.sortIconByCol("serial")).toEqual(expectd.src);
    });

    it("sortIconByCol column match columnSelect and typeSorts equal desc", () => {
      component.sortColumns = ["serial", "name", "model"];
      component.typeSorts = ["asc", "desc"];
      component.typeSort = component.typeSorts[1];
      component.columnSelect = "serial";
      component.sortIcons = [Icons.arrows, Icons.arrowDown, Icons.arrowUp];
      const expectd = Icons.arrowUp;
      expect(component.sortIconByCol("serial")).toEqual(expectd.src);
    });

    it("sortIconByCol column match columnSelect and typeSorts equal desc", () => {
      component.sortColumns = ["serial", "name", "model"];
      component.typeSorts = ["asc", "desc"];
      component.typeSort = component.typeSorts[1];
      component.columnSelect = "serial";
      component.sortIcons = [Icons.arrows, Icons.arrowDown, Icons.arrowUp];
      const expectd = Icons.arrowUp;
      expect(component.sortIconByCol("serial")).toEqual(expectd.src);
    });

    it("classOnColumn width sortColumns is false", () => {
      const input = "name";
      expect(component.classOnColumn(input)).toEqual("table-header-name");
    });
    it("classOnColumn width sortColumns is true", () => {
      const input = "name";
      component.sortColumns = undefined;
      expect(component.classOnColumn(input)).toEqual("table-header-name");
    });

    it("classOnColumn width sortColumns is true when column not in sortColumns", () => {
      const input = "input";
      component.sortColumns = ["serial", "name", "model"];
      expect(component.classOnColumn(input)).toEqual("table-header-input");
    });

    it("classOnColumn width sortColumns is true and column not match columnSelect", () => {
      const input = "test.name";
      component.sortColumns = ["serial", "test.name", "model"];
      component.columnSelect = "serial";
      const expectd = "table-header-name sorted";
      expect(component.classOnColumn(input)).toEqual(expectd);
    });

    it("classOnColumn width sortColumns is true and column match columnSelect", () => {
      const input = "serial";
      component.sortColumns = ["serial", "name", "model"];
      component.columnSelect = "serial";
      const expectd = " sorted-select";
      expect(component.classOnColumn(input)).toEqual(expectd);
    });

    it("onColumnSort width sortColumns is false but column not includer sortColumns", () => {
      const input = "organization";
      component.sortColumns = ["serial", "name", "model"];
      expect(component.onColumnSort(input)).toEqual(false);
    });

    it("onColumnSort should return false when undefined", () => {
      const input = undefined;
      component.sortColumns = ["serial", "name", "model"];
      expect(component.onColumnSort(input)).toEqual(false);
    });

    it("onColumnSort width isSorting is true but column includer sortColumns", () => {
      const input = "serial";
      component.sortColumns = ["serial", "name", "model"];
      expect(component.onColumnSort(input)).toEqual(true);
    });

    it("onColumnSort width emit data then column not math columnSelect", (done) => {
      const input = "serial";
      component.sortColumns = ["serial", "name", "model"];
      component.typeSorts = ["asc", "desc"];
      component.columnSelect = "";
      component.typeSort = "";
      // arrange
      const expectValue = {
        column: "serial",
        sort: "asc",
      };
      component.sorted.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onColumnSort(input);
    });

    it("onColumnSort width emit data then column math columnSelect typeSort is asc", (done) => {
      const input = "serial";
      component.sortColumns = ["serial", "name", "model"];
      component.typeSorts = ["asc", "desc"];
      component.columnSelect = "serial";
      component.typeSort = "asc";
      // arrange
      const expectValue = {
        column: "serial",
        sort: "desc",
      };
      component.sorted.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onColumnSort(input);
    });

    it("onColumnSort width emit data then column math columnSelect typeSort is desc", (done) => {
      const input = "serial";
      component.sortColumns = ["serial", "name", "model"];
      component.typeSorts = ["asc", "desc"];
      component.columnSelect = "serial";
      component.typeSort = "desc";
      // arrange
      const expectValue = {
        column: "",
        sort: "",
      };
      component.sorted.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onColumnSort(input);
    });
  });
});
