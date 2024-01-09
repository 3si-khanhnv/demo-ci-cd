import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CommentsComponent } from "./comments.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [CommentsComponent],
  imports: [CommonModule, TranslateModule],
  exports: [CommentsComponent],
})
export class CommentsModule {}
