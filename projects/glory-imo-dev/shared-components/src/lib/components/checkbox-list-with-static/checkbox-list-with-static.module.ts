import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckboxListWithStaticComponent } from "./checkbox-list-with-static.component";
import { CheckboxListModule } from "../checkbox-list/checkbox-list.module";

@NgModule({
  declarations: [CheckboxListWithStaticComponent],
  imports: [CommonModule, CheckboxListModule],
  exports: [CheckboxListWithStaticComponent],
})
export class CheckboxListWithStaticModule {}
