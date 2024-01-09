import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WaterFallChartComponent } from "./waterfall-chart.component";
import { NgChartsModule } from "ng2-charts";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [WaterFallChartComponent],
  imports: [CommonModule, NgChartsModule, TranslateModule],
  exports: [WaterFallChartComponent],
})
export class WaterFallChartModule {}
