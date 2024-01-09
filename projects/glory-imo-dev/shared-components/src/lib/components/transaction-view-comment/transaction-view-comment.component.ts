import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommentItem } from "../comments/comments.component.i";
import { Labels } from "../form/form.component.i";
import { ICommentList, IHeader, ILabelDialog } from "./transaction-view-comment.i";

@Component({
  selector: "imo-transaction-view-comment",
  templateUrl: "./transaction-view-comment.component.html",
  styleUrls: ["./transaction-view-comment.component.scss"],
})
export class TransactionViewCommentComponent {
  @Input() dataHeader: IHeader;
  @Input() labelDialog: ILabelDialog;
  @Input("comments") set comments(data: ICommentList[]) {
    this._comments = data.map((item) => {
      return {
        userName: item.userName,
        dateTime: item.commentDatetime,
        content: item.comment,
      };
    });
  }
  @Input() accessTransactionAddComments: boolean;
  @Output() valueComment = new EventEmitter<string>();
  public _comments: CommentItem[] = [];
  public inputTextAlgin: "right";
  @Input() labels: Labels;
  public isRightDate = true;
  public defaultValue: string;
  public onChangeComment(data: string) {
    this.valueComment.emit(data);
  }
}
