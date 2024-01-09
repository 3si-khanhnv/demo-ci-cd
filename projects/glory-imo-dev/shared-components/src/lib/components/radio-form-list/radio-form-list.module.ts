import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatRadioModule } from "@angular/material/radio";
import { FormModule } from "../form/form.module";
import { RadioFormListComponent } from "./radio-form-list.component";

@NgModule({
  declarations: [RadioFormListComponent],
  imports: [CommonModule, FormModule, MatRadioModule],
  exports: [RadioFormListComponent],
})
export class RadioFormListModule {}
