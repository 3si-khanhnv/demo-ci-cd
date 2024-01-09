import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import { DropdownMenuModule } from "../dropdown-menu/dropdown-menu.module";
import { HeaderTabModule } from "../header-tab/header-tab.module";
import { HeaderTitleModule } from "../header-title/header-title.module";
import { ReleaseNotesModule } from "../release-notes/release-notes.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { UserInformationModule } from "../user-information/user-information.module";
import { HeaderComponent } from "./header.component";
import { LicensesModule } from "../licenses/licenses.module";

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    DropdownMenuModule,
    SvgIconModule,
    CommonModule,
    HeaderTitleModule,
    HeaderTabModule,
    MatIconModule,
    UserInformationModule,
    ReleaseNotesModule,
    TranslateModule,
    LicensesModule,
  ],
})
export class HeaderModule {}
