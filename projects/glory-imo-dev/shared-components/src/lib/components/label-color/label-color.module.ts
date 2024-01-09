import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { LabelColorComponent } from "./label-color.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [LabelColorComponent],
  imports: [CommonModule, TranslateModule],
  exports: [LabelColorComponent],
})
export class LabelColorModule {}
