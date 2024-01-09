import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PluginModule } from "../../plugins/plugin.module";
import { StatusIconModule } from "../status-icon/status-icon.module";
import { StatusInfoModule } from "../status-info/status-info.module";
import { MarkerInfoComponent } from "./marker-info.component";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  declarations: [MarkerInfoComponent],
  exports: [MarkerInfoComponent],
  imports: [CommonModule, PluginModule, StatusInfoModule, StatusIconModule, TranslateModule],
})
export class MarkerInfoModule {}
