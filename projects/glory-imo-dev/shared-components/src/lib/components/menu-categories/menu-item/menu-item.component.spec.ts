import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";

import { MenuCategoriesModule } from "../menu-categories.module";
import { MenuItemComponent } from "./menu-item.component";

describe("MenuItemComponent", () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCategoriesModule, TranslateModule.forRoot(), RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("setActiveItem", () => {
    it("setActiveItem has set value", () => {
      component.setActiveItem(1);
      expect(component.activeItem).toEqual(1);
    });
  });
});
