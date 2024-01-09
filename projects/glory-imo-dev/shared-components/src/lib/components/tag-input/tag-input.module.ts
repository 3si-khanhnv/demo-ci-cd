import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagInputComponent } from "./tag-input.component";
import { CompleteInnerHtmlRenderDirectiveModule } from "../../directives/complete-inner-html-render/complete-inner-html-render.module";

@NgModule({
  declarations: [TagInputComponent],
  providers: [],
  imports: [CommonModule, CompleteInnerHtmlRenderDirectiveModule],
  exports: [TagInputComponent],
})
export class TagInputModule {}
