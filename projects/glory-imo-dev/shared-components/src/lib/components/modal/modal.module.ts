import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";

import { ModalDirective } from "./modal.directive";
import { ModalComponent } from "./modal.component";
import { ButtonModule } from "../button/button.module";
import { LinkmodalDirective } from "./taskLinkmodal.directive";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [ModalDirective, ModalComponent, LinkmodalDirective],
  exports: [ModalDirective, ModalComponent, LinkmodalDirective],
  imports: [MatDialogModule, ButtonModule, CommonModule, FlexLayoutModule, DragDropModule, TranslateModule],
})
export class ModalModule {}
