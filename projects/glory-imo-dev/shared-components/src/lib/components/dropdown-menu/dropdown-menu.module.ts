import { NgModule } from "@angular/core";
// import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { DropdownMenuComponent } from "./dropdown-menu.component";
import { DropdownMenuItemComponent } from "./dropdown-menu-item.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [DropdownMenuComponent, DropdownMenuItemComponent],
  exports: [DropdownMenuComponent, DropdownMenuItemComponent],
  imports: [CommonModule, TranslateModule], //TranslateModule
})
export class DropdownMenuModule {}
