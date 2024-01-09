import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationSalesByDayComponent } from "./by-day-location-sales.component";
import { NgChartsModule } from "ng2-charts";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonToggleModule } from "../button-toggle/button-toggle.module";

@NgModule({
  declarations: [LocationSalesByDayComponent],
  imports: [CommonModule, NgChartsModule, TranslateModule, ButtonToggleModule],
  exports: [LocationSalesByDayComponent],
})
export class LocationSalesByDayModule {}
