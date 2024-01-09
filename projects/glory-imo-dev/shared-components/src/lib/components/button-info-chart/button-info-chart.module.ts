import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ButtonModule } from "../button/button.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { ButtonInfoChartComponent } from "./button-info-chart.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [ButtonInfoChartComponent],
  imports: [CommonModule, ButtonModule, MatTooltipModule, SvgIconModule, TranslateModule],
  exports: [ButtonInfoChartComponent],
})
export class ButtonInfoChartModule {}
