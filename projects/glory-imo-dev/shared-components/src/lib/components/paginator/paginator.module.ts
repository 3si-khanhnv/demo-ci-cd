import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginatorComponent } from "./paginator.component";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { SelectModule } from "../select/select.module";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
  imports: [CommonModule, SelectModule, SvgIconModule, MatButtonModule, FlexLayoutModule, TranslateModule],
})
export class PaginatorModule {}
