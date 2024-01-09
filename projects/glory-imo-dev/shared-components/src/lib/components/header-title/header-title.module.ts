import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderTitleComponent } from "./header-title.component";

@NgModule({
  declarations: [HeaderTitleComponent],
  exports: [HeaderTitleComponent],
  imports: [CommonModule],
})
export class HeaderTitleModule {}
