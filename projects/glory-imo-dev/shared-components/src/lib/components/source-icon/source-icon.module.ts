import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { SourceIconComponent } from "./source-icon.component";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  declarations: [SourceIconComponent],
  imports: [CommonModule, SvgIconModule, TranslateModule],
  exports: [SourceIconComponent],
})
export class SourceIconModule {}
