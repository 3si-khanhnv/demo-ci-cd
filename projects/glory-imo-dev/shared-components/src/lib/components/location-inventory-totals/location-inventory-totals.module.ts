import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgChartsModule } from "ng2-charts";
import { LocationInventoryTotalsComponent } from "./location-inventory-totals.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [LocationInventoryTotalsComponent],
  imports: [CommonModule, NgChartsModule, TranslateModule],
  exports: [LocationInventoryTotalsComponent],
})
export class LocationInventoryTotalsModule {}
