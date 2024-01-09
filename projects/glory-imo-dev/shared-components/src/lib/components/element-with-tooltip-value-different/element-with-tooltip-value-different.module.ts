import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ElementWithTooltipValueDifferentComponent } from "./element-with-tooltip-value-different.component";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [ElementWithTooltipValueDifferentComponent],
  imports: [CommonModule, MatTooltipModule],
  exports: [ElementWithTooltipValueDifferentComponent],
})
export class ElementWithTooltipValueDifferentModule {}
