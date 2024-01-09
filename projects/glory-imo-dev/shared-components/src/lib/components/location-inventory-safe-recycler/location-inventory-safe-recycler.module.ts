import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { NgChartsModule } from "ng2-charts";
import { LabelColorModule } from "../label-color/label-color.module";
import { LocationInventorySafeRecyclerComponent } from "./location-inventory-safe-recycler.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [LocationInventorySafeRecyclerComponent],
  imports: [CommonModule, NgChartsModule, FlexLayoutModule, LabelColorModule, TranslateModule],
  exports: [LocationInventorySafeRecyclerComponent],
})
export class LocationInventorySafeRecyclerModule {}
