import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TranslateModule } from "@ngx-translate/core";
import { DynamicCreateComponentDirectiveModule } from "../../directives/dynamic-create-component";
import { TooltipModule } from "../../directives/tooltip/tooltip.module";
import { BadgeModule } from "../badge/badge.module";
import { ButtonModule } from "../button/button.module";
import { DatePickerModule } from "../date-picker/date-picker.module";
import { ModalModule } from "../modal/modal.module";
import { PaginatorModule } from "../paginator/paginator.module";
import { SelectModule } from "../select/select.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { FormModule } from "./../form/form.module";
import { TableComponent } from "./table.component";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatRadioModule,
    FormModule,
    MatTooltipModule,
    ButtonModule,
    MatCheckboxModule,
    BadgeModule,
    SelectModule,
    DatePickerModule,
    SvgIconModule,
    PaginatorModule,
    FlexLayoutModule,
    TooltipModule,
    ModalModule,
    DynamicCreateComponentDirectiveModule,
    TranslateModule,
  ],
  exports: [TableComponent],
})
export class TableModule {}
