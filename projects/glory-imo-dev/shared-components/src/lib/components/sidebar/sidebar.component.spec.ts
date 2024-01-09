import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { SidebarComponent } from "./sidebar.component";
import { INavItem } from "./sidebar.component.i";

describe("SidebarComponent", () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const dataListSideBar: INavItem[] = [
    {
      displayName: "Collection capacity",
      route: "collection-capacity",
      isShowIcon: true,
    },
    {
      displayName: "CIT Performance",
      route: "cit-performance",
      isShowIcon: false,
    },
    {
      displayName: "Report name 1",
      route: "report-name1",
      isShowIcon: true,
    },
    {
      displayName: "Report name 2",
      route: "report-name2",
      isShowIcon: false,
    },
    {
      displayName: "Report name 3",
      route: "report-name3",
      isShowIcon: false,
    },
  ];

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [CommonModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([{ path: "", component: SidebarComponent }])],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    component.items = dataListSideBar;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onItemSelected", () => {
    it("router navigate to '/view-reports/collectionCapacity'", () => {
      // arrange
      const expected = ["/view-reports/collectionCapacity"];
      const item = {
        route: "/collectionCapacity",
      };
      const spy = jest.spyOn(component.router, "navigate").mockImplementationOnce(() => {
        return new Promise((r) => r(true));
      });
      // act
      component.onItemSelected(item);
      // assert
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe("onSineNavToggle", () => {
    it("onSineNavToggle should be emit controlNavState", () => {
      const sy = jest.spyOn(component.controlNavState, "emit");
      component.onSineNavToggle();
      expect(sy).toBeCalled();
    });
  });
});
