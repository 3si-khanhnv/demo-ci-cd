import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopLocationRemovalComponent } from "./top-location-removal.component";
import { NgChartsModule } from "ng2-charts";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { LabelColorModule } from "../label-color/label-color.module";
import { TranslateModule } from "@ngx-translate/core";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [TopLocationRemovalComponent],
  imports: [CommonModule, MatTooltipModule, NgChartsModule, FlexLayoutModule, LabelColorModule, TranslateModule],
  exports: [TopLocationRemovalComponent],
})
export class TopLocationRemovalModule {}
