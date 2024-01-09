import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavigationEnd, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { Observable } from "rxjs";

import { HeaderTabComponent } from "./header-tab.component";
import { HeaderTabModule } from "./header-tab.module";

describe("HeaderTabComponent", () => {
  let component: HeaderTabComponent;
  let fixture: ComponentFixture<HeaderTabComponent>;
  // let router: Router;

  class MockRouter {
    public nav = new NavigationEnd(0, "http://localhost:4200/order", "http://localhost:4200/dashboard");
    public events = new Observable((observer) => {
      observer.next(this.nav);
      observer.complete();
    });
  }

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [
        HeaderTabModule,
        RouterTestingModule.withRoutes([{ path: "**", component: HeaderTabComponent }]),
        TranslateModule.forRoot(),
      ],
      providers: [{ provide: Router, useClass: MockRouter }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTabComponent);
    // router = TestBed.inject(Router);
    component = fixture.componentInstance;
    // component.tabs = [
    //   {
    //     displayName: "inform",
    //     route: "",
    //     children: Constant.tabsManageChild,
    //     isPermission: true,
    //     keyCheckPermission: "manage",
    //   },
    //   {
    //     displayName: "manage",
    //     route: "",
    //     children: Constant.tabsInformChild,
    //     isPermission: true,
    //     keyCheckPermission: "inform",
    //   },
    // ];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // describe("ngOnChanges", () => {
  //   it("should update active tab when tabs change", () => {
  //     // arrange
  //     component.tabs = [
  //       {
  //         displayName: "inform",
  //         route: "",
  //         children: Constant.tabsManageChild,
  //         isPermission: true,
  //         keyCheckPermission: "manage",
  //       },
  //     ];
  //     const changes: SimpleChanges = {
  //       tabs: {
  //         currentValue: component.tabs,
  //         firstChange: false,
  //         previousValue: [
  //           {
  //             displayName: "manage",
  //             route: "",
  //             children: Constant.tabsInformChild,
  //             isPermission: true,
  //             keyCheckPermission: "inform",
  //           },
  //         ],
  //         isFirstChange: jest.fn(() => false),
  //       },
  //     };
  //     jest.spyOn(component, "checkActiveTab");

  //     // act
  //     component.ngOnChanges(changes);

  //     // assert
  //     expect(component.checkActiveTab).toHaveBeenCalledWith(component.tabs[0]);
  //   });
  // });

  // describe("checkActiveTab", () => {
  //   it("should return true when current route url equal tab url", () => {
  //     // arrange
  //     const tab = { name: "Reporting", url: "reporting", children: [] };
  //     const expected = true;
  //     jest.spyOn(component, "isChildrenActive");
  //     jest.spyOn(router, "isActive").mockReturnValue(true);

  //     // act
  //     const act = component.checkActiveTab(tab);

  //     // assert
  //     expect(act).toEqual(expected);
  //     expect(router.isActive).toHaveBeenCalledWith(tab.url, false);
  //     expect(component.isChildrenActive).not.toHaveBeenCalled();
  //   });

  //   it("should return true when current route url equal child in tab url", () => {
  //     // arrange
  //     const tab = { name: "Reporting", url: "reporting", children: ["child1", "child2"] };
  //     const expected = true;
  //     jest.spyOn(component, "isChildrenActive").mockReturnValue(true);
  //     jest.spyOn(router, "isActive").mockReturnValue(false);

  //     // act
  //     const act = component.checkActiveTab(tab);

  //     // assert
  //     expect(act).toEqual(expected);
  //     expect(router.isActive).toHaveBeenCalledWith(tab.url, false);
  //     expect(component.isChildrenActive).toHaveBeenCalledWith(["child1", "child2"]);
  //   });
  // });

  // describe("isChildrenActive", () => {
  //   it("should return true if current children tab is active", () => {
  //     // arrange
  //     const urls: string[] = ["child1", "child2"];
  //     const expected = true;
  //     jest.spyOn(router, "isActive").mockImplementationOnce((a) => a === "child1");

  //     // act
  //     const actual = component.isChildrenActive(urls);
  //     // assert
  //     expect(actual).toBe(expected);
  //   });

  //   it("should return false if current children tab is not active", () => {
  //     // arrange
  //     const urls: string[] = ["child1", "child2"];
  //     const expected = false;
  //     jest.spyOn(router, "isActive").mockImplementationOnce((a) => a === "another child");
  //     // act
  //     const actual = component.isChildrenActive(urls);
  //     // assert
  //     expect(actual).toBe(expected);
  //   });
  // });

  // describe("onRouteUrlChange", () => {
  //   it("should update activeRoutes array when url changed", () => {
  //     // arrange
  //     component.tabs = [
  //       {
  //         displayName: "manage",
  //         route: "",
  //         children: Constant.tabsInformChild,
  //         isPermission: true,
  //         keyCheckPermission: "inform",
  //       },
  //     ];
  //     jest.spyOn(component, "checkActiveTab");

  //     // act
  //     jest.spyOn(router, "isActive");
  //     component.onRouteUrlChange();
  //     fixture.whenStable().then(() => {
  //       // assert
  //       expect(router.isActive).toHaveBeenCalled();
  //       expect(component.checkActiveTab).toHaveBeenCalledTimes(2);
  //       expect(component.checkActiveTab).toHaveBeenNthCalledWith(1, component.tabs[0]);
  //       expect(component.checkActiveTab).toHaveBeenNthCalledWith(2, component.tabs[1]);
  //     });
  //   });
  // });

  describe("onClickTab", () => {
    it("should emit tab", () => {
      // arrange
      const expected = "tab";
      const spy = jest.spyOn(component.changedTab, "emit");
      // act
      component.onClickTab(expected);
      // assert
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe("openedOtherApp", () => {
    it("should emit orther app", () => {
      // arrange
      const expected = "tab";
      const spy = jest.spyOn(component.openOtherApp, "emit");
      // act
      component.openedOtherApp(expected);
      // assert
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });
});
