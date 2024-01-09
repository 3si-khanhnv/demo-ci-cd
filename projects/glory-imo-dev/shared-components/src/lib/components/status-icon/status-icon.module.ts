import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StatusIconComponent } from "./status-icon.component";

@NgModule({
  declarations: [StatusIconComponent],
  exports: [StatusIconComponent],
  imports: [CommonModule],
})
export class StatusIconModule {}
