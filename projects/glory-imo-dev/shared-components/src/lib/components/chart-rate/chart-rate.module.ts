import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartRateComponent } from "./chart-rate.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
  declarations: [ChartRateComponent],
  exports: [ChartRateComponent],
  imports: [CommonModule, NgxChartsModule],
})
export class ChartRateModule {}
