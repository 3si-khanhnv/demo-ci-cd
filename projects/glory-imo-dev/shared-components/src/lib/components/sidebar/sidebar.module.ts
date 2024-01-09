import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { SidebarComponent } from "./sidebar.component";
import { RouterModule } from "@angular/router";
import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, MatSidenavModule, RouterModule, MatListModule, SvgIconModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
