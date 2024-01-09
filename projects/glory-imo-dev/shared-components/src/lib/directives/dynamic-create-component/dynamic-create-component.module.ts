import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicCreateComponentDirective } from "./dynamic-create-component.directive";

@NgModule({
  declarations: [DynamicCreateComponentDirective],
  imports: [CommonModule],
  exports: [DynamicCreateComponentDirective],
})
export class DynamicCreateComponentDirectiveModule {}
