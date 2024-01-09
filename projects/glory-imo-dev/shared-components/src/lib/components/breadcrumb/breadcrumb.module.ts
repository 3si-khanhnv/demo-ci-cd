import { NgModule } from "@angular/core";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { CommonModule } from "@angular/common";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, SvgIconModule, RouterModule, TranslateModule],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
