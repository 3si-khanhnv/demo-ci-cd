import { QueryList, SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";

import { MenuCategoriesComponent } from "./menu-categories.component";
import { MenuCategoriesModule } from "./menu-categories.module";
import { Icons } from "../../constants/icons";

describe("MenuCategoriesComponent", () => {
  let component: MenuCategoriesComponent;
  let fixture: ComponentFixture<MenuCategoriesComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCategoriesModule, TranslateModule.forRoot(), RouterTestingModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("setActiveItem", () => {
    it("setActiveItem has set value", () => {
      component.setActiveItem("1");
      expect(component.activeItem).toEqual("1");
    });
  });

  describe("ngOnChanges", () => {
    it("should change the value navItems", () => {
      // arrange
      component.navItems = [
        {
          displayName: "Manage",
          children: [],
          isDisable: true,
          class: "menu-bar",
        },
      ];

      // jest.spyOn(route, "url", "get").mockReturnValue("/users");
      const changes = [
        {
          displayName: "Manage",
          children: [
            {
              displayName: "Speakers",
              iconItem: {
                url: Icons.arrowRight.src,
              },
              children: [
                {
                  displayName: "Michael Prentice",
                  iconItem: {
                    url: Icons.arrowRight.src,
                  },
                  route: "michael-prentice",
                  children: [
                    {
                      displayName: "Delight your Organization",
                      route: "material-design",
                    },
                  ],
                },
                {
                  displayName: "Stephen Fluin",
                  iconItem: {
                    url: Icons.arrowRight.src,
                  },
                  route: "stephen-fluin",
                  children: [
                    {
                      displayName: "What's up with the Web?",
                      route: "what-up-web",
                    },
                  ],
                },
                {
                  displayName: "Mike Brocchi",
                  iconItem: {
                    url: Icons.arrowRight.src,
                  },
                  route: "mike-brocchi",
                  children: [
                    {
                      displayName: "My ally, the CLI",
                      route: "my-ally-cli",
                    },
                    {
                      displayName: "Become an Angular Tailor",
                      route: "become-angular-tailer",
                    },
                  ],
                },
              ],
            },
            {
              displayName: "Sessions",
              iconItem: {
                url: Icons.arrowRight.src,
              },
              children: [
                {
                  displayName: "Delight your Organization",
                  route: "material-design",
                },
                {
                  displayName: "What's up with the Web?",
                  route: "what-up-web",
                },
                {
                  displayName: "My ally, the CLI",
                  route: "my-ally-cli",
                },
                {
                  displayName: "Become an Angular Tailor",
                  route: "become-angular-tailer",
                },
              ],
            },
            {
              displayName: "Feedback",
              route: "feedback",
            },
          ],
          isDisable: true,
          class: "menu-bar",
        },
      ];
      // act
      component.ngOnChanges({
        navItems: new SimpleChange([], changes, true),
      });

      fixture.detectChanges();

      // assert
      expect(component._navItems).toEqual(changes);
    });

    it("check url", () => {
      jest.spyOn(router, "navigateByUrl");
      jest.spyOn(router, "url", "get").mockReturnValue("/dashboard");
      component.navItems = [
        {
          displayName: "Manage",
          children: [],
          isDisable: true,
          class: "menu-bar",
        },
      ];

      const changes = [
        {
          displayName: "Manage",
          children: [
            {
              displayName: "Speakers",
              iconItem: {
                url: Icons.arrowRight.src,
              },
              children: [
                {
                  displayName: "Michael Prentice",
                  iconItem: {
                    url: Icons.arrowRight.src,
                  },
                  route: "michael-prentice",
                  children: [
                    {
                      displayName: "Delight your Organization",
                      route: "material-design",
                    },
                  ],
                },
              ],
            },
          ],
          isDisable: true,
          class: "menu-bar",
        },
      ];

      // act
      component.ngOnChanges({
        navItems: new SimpleChange([], changes, true),
      });
      fixture.detectChanges();
      expect(component.activeItem).toBe(null);
    });
  });

  it("should be called when pressing space key on this component", () => {
    const event: any = {
      target: `<span></span>`,
    };
    const div = document.createElement("div");
    div.innerHTML = `<div class="custom-menu-header"></div>`;
    const input = [];
    jest.spyOn(document, "getElementsByClassName").mockReturnValue(input as any);
    const selectOtp1 = [
      {
        menuOpen: true,
        closeMenu: jest.fn(),
      },
      {
        menuOpen: true,
        closeMenu: jest.fn(),
      },
    ];
    component.trigger = Object.assign(new QueryList(), {
      _results: selectOtp1,
    }) as QueryList<any>;
    fixture.detectChanges();
    component.onClick(event);
    // assert
  });

  it("click have data", () => {
    const event: any = {
      target: `<span></span>`,
    };
    const div = document.createElement("div");
    div.innerHTML = `<div class="custom-menu-header"></div>`;
    const input = [{ contains: jest.fn().mockReturnValue(event.target) }];
    jest.spyOn(document, "getElementsByClassName").mockReturnValue(input as any);
    const selectOtp1 = [
      {
        menuOpen: true,
        closeMenu: jest.fn(),
      },
      {
        menuOpen: true,
        closeMenu: jest.fn(),
      },
    ];
    component.trigger = Object.assign(new QueryList(), {
      _results: selectOtp1,
    }) as QueryList<any>;
    fixture.detectChanges();
    component.onClick(event);
  });
});
