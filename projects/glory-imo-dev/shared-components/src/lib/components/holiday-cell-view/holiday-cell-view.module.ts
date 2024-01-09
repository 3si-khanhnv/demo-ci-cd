import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HolidayCellViewComponent } from "./holiday-cell-view.component";
import { SvgIconModule } from "../svg-icon/svg-icon.module";

@NgModule({
  declarations: [HolidayCellViewComponent],
  imports: [CommonModule, SvgIconModule],
  exports: [HolidayCellViewComponent],
})
export class HolidayCellViewModule {}
