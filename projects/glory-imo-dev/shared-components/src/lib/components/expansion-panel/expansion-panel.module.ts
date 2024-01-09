import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BadgeModule } from "../badge/badge.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { TableModule } from "../table/table.module";
import { ExpansionPanelComponent } from "./expansion-panel.component";
import { MatRadioModule } from "@angular/material/radio";

@NgModule({
  declarations: [ExpansionPanelComponent],
  exports: [ExpansionPanelComponent],
  imports: [CommonModule, SvgIconModule, MatCheckboxModule, BadgeModule, MatRadioModule, MatTooltipModule, TableModule, FlexLayoutModule],
})
export class ExpansionPanelModule {}
