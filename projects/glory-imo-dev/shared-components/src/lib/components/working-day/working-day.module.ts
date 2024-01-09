import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { CheckboxListModule } from "../checkbox-list/checkbox-list.module";
import { FormModule } from "../form/form.module";
import { WorkingDayComponent } from "./working-day.component";

@NgModule({
  declarations: [WorkingDayComponent],
  imports: [CommonModule, CheckboxListModule, FormModule, FlexLayoutModule],
  exports: [WorkingDayComponent],
})
export class WorkingDayModule {}
