import { Component, Input } from "@angular/core";
import { CommentItem } from "./comments.component.i";

@Component({
  selector: "imo-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent {
  @Input() comments: CommentItem[];
  @Input() isRightDate: boolean;
}
