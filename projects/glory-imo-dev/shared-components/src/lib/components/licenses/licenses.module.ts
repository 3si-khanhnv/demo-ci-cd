import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LicensesComponent } from "./licenses.component";

@NgModule({
  declarations: [LicensesComponent],
  imports: [CommonModule],
  exports: [LicensesComponent],
})
export class LicensesModule {}
