import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderTabItemComponent } from "./header-tab-item.component";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { MenuCategoriesModule } from "../menu-categories/menu-categories.module";

@NgModule({
  declarations: [HeaderTabItemComponent],
  exports: [HeaderTabItemComponent],
  imports: [CommonModule, SvgIconModule, MenuCategoriesModule],
})
export class HeaderTabItemModule {}
