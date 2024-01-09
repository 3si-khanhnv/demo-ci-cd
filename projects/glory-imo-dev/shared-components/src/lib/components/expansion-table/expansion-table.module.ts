import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { ExpansionPanelModule } from "../expansion-panel/expansion-panel.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { ExpansionTableComponent } from "./expansion-table.component";

@NgModule({
  declarations: [ExpansionTableComponent],
  exports: [ExpansionTableComponent],
  imports: [CommonModule, ExpansionPanelModule, SvgIconModule, MatCheckboxModule, FlexLayoutModule, MatRadioModule],
})
export class ExpansionTableModule {}
