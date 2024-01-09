import { NgModule } from "@angular/core";

import { AlertComponent } from "./alert.component";
import { ButtonModule } from "../button/button.module";
import { CommonModule } from "@angular/common";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { TranslateModule } from "@ngx-translate/core";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [AlertComponent],
  imports: [MatDialogModule, ButtonModule, CommonModule, SvgIconModule, TranslateModule],
})
export class AlertModule {}
