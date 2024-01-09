import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { FormComponent } from "./form.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [FormComponent],
  exports: [FormComponent],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, TranslateModule],
})
export class FormModule {}
