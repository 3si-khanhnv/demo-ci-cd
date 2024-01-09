import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { SelectMultiComponent } from "./select-multi.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatesPipeModule } from "../../pipes/translates/translates.pipe.module";
@NgModule({
  declarations: [SelectMultiComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    TranslateModule,
    TranslatesPipeModule,
  ],
  exports: [SelectMultiComponent],
})
export class SelectMultiModule {}
