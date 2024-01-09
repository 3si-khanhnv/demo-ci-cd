import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgChartsModule } from "ng2-charts";
import { HorizontalGroupChartComponent } from "./horizontal-group-chart.component";
import { TranslateModule } from "@ngx-translate/core";
import { LabelColorModule } from "../label-color/label-color.module";
import { FlexLayoutModule } from "ngx-flexible-layout";

@NgModule({
  declarations: [HorizontalGroupChartComponent],
  imports: [CommonModule, NgChartsModule, TranslateModule, LabelColorModule, FlexLayoutModule],
  exports: [HorizontalGroupChartComponent],
})
export class HorizontalGroupChartModule {}
