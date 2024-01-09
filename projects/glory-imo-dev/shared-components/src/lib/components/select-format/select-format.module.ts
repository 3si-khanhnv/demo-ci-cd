import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectFormatComponent } from "./select-format.component";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { ButtonModule } from "../button/button.module";

@NgModule({
  declarations: [SelectFormatComponent],
  imports: [CommonModule, MatIconModule, MatMenuModule, ButtonModule],
  exports: [SelectFormatComponent],
})
export class SelectFormatModule {}
