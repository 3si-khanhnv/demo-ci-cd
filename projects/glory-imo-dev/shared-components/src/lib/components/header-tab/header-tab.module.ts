import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderTabItemModule } from "../header-tab-item/header-tab-item.module";
import { HeaderTabComponent } from "./header-tab.component";

@NgModule({
  declarations: [HeaderTabComponent],
  exports: [HeaderTabComponent],
  imports: [HeaderTabItemModule, CommonModule, TranslateModule],
})
export class HeaderTabModule {}
