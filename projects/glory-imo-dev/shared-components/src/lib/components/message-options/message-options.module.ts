import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageOptionsComponent } from "./message-options.component";
import { SvgIconModule } from "../svg-icon/svg-icon.module";

@NgModule({
  declarations: [MessageOptionsComponent],
  exports: [MessageOptionsComponent],
  imports: [CommonModule, SvgIconModule],
})
export class MessageOptionsModule {}
