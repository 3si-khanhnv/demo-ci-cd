import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FlexLayoutModule } from "ngx-flexible-layout";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { DisplayTransactionDateTimeComponent } from "./display-transaction-date-time.component";

@NgModule({
  declarations: [DisplayTransactionDateTimeComponent],
  imports: [CommonModule, FlexLayoutModule, SvgIconModule],
  exports: [DisplayTransactionDateTimeComponent],
})
export class DisplayTransactionDateTimeModule {}
