import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CompleteInnerHtmlRenderDirective } from "./complete-inner-html-render.directive";

@NgModule({
  declarations: [CompleteInnerHtmlRenderDirective],
  imports: [CommonModule],
  exports: [CompleteInnerHtmlRenderDirective],
})
export class CompleteInnerHtmlRenderDirectiveModule {}
