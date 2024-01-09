import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PluginModule } from "../../plugins/plugin.module";
import { StatusIconModule } from "../status-icon/status-icon.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { StatusInfoComponent } from "./status-info.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [StatusInfoComponent],
  exports: [StatusInfoComponent],
  imports: [CommonModule, SvgIconModule, PluginModule, StatusIconModule, TranslateModule],
})
export class StatusInfoModule {}
