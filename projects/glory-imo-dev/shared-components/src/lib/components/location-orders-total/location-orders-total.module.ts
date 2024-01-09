import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { NgApexchartsModule } from "ng-apexcharts";
import { LabelColorModule } from "../label-color/label-color.module";
import { LocationOrdersTotalComponent } from "./location-orders-total.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [LocationOrdersTotalComponent],
  imports: [NgApexchartsModule, FlexLayoutModule, LabelColorModule, CommonModule, TranslateModule],
  exports: [LocationOrdersTotalComponent],
})
export class LocationOrdersTotalModule {}
