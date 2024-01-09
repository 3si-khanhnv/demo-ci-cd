import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HorizontalChartComponent } from "./horizontal-chart.component";
import { TranslateModule } from "@ngx-translate/core";
import { NgChartsModule } from "ng2-charts";
import { LabelColorModule } from "../label-color/label-color.module";

@NgModule({
  declarations: [HorizontalChartComponent],
  imports: [CommonModule, NgChartsModule, TranslateModule, LabelColorModule],
  exports: [HorizontalChartComponent],
})
export class HorizontalChartModule {}
