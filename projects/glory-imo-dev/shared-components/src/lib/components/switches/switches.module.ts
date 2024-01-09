import { NgModule } from "@angular/core";
import { SwitchesComponent } from "./switches.component";
import { CommonModule } from "@angular/common";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  declarations: [SwitchesComponent],
  imports: [CommonModule, MatSlideToggleModule],
  exports: [SwitchesComponent],
})
export class SwitchesModule {}
