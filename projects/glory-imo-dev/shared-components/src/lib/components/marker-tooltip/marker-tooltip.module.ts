import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkerTooltipComponent } from "./marker-tooltip.component";
import { StatusIconModule } from "../status-icon/status-icon.module";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  declarations: [MarkerTooltipComponent],
  exports: [MarkerTooltipComponent],
  imports: [CommonModule, StatusIconModule, FlexLayoutModule, TranslateModule],
})
export class MarkerTooltipModule {}
