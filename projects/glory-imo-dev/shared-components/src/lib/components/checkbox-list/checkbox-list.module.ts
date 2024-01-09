import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { CheckboxListComponent } from "./checkbox-list.component";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [CheckboxListComponent],
  exports: [CheckboxListComponent],
  imports: [CommonModule, MatCheckboxModule, SvgIconModule, FormsModule, TranslateModule],
})
export class CheckboxListModule {}
