import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";

import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { MenuCategoriesComponent } from "./menu-categories.component";
import { ButtonModule } from "../button/button.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [MenuItemComponent, MenuCategoriesComponent],
  imports: [CommonModule, MatSidenavModule, RouterModule, MatListModule, SvgIconModule, MatMenuModule, ButtonModule, TranslateModule],
  exports: [MenuItemComponent, MenuCategoriesComponent],
})
export class MenuCategoriesModule {}
