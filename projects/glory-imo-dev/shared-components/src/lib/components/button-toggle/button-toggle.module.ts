import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonToggleComponent } from "./button-toggle.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [ButtonToggleComponent],
  imports: [CommonModule, TranslateModule, MatButtonToggleModule],
  exports: [ButtonToggleComponent],
})
export class ButtonToggleModule {}
