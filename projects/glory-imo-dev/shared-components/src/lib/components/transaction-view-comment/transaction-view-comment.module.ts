import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "../button/button.module";
import { CommentsModule } from "../comments/comments.module";
import { FormModule } from "../form/form.module";
import { TransactionViewCommentComponent } from "./transaction-view-comment.component";
import { TranslateModule } from "@ngx-translate/core";
import { ModalModule } from "../modal/modal.module";

@NgModule({
  declarations: [TransactionViewCommentComponent],
  exports: [TransactionViewCommentComponent],
  imports: [CommonModule, CommentsModule, FormModule, ReactiveFormsModule, ButtonModule, ModalModule, TranslateModule],
})
export class TransactionViewCommentModule {}
