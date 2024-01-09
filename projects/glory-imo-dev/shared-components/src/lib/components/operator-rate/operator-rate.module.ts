import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { ChartRateModule } from "../chart-rate/chart-rate.module";
import { SelectModule } from "../select/select.module";
import { StatusIconModule } from "../status-icon/status-icon.module";
import { StatusInfoModule } from "../status-info/status-info.module";
import { SwitchesModule } from "../switches/switches.module";
import { OperatorRateComponent } from "./operator-rate.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  declarations: [OperatorRateComponent],
  exports: [OperatorRateComponent],
  imports: [
    CommonModule,
    ChartRateModule,
    StatusIconModule,
    SwitchesModule,
    SelectModule,
    MatTabsModule,
    StatusInfoModule,
    FlexLayoutModule,
    TranslateModule,
  ],
})
export class OperatorRateModule {}
