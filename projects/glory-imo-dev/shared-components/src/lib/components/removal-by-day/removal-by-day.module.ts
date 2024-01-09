import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LabelColorModule } from "../label-color/label-color.module";
import { RemovalByDayComponent } from "./removal-by-day.component";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  declarations: [RemovalByDayComponent],
  imports: [CommonModule, LabelColorModule, TranslateModule],
  exports: [RemovalByDayComponent],
})
export class RemovalByDayModule {}
