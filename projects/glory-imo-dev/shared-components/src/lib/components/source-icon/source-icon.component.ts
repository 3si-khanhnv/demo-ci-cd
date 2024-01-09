import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Icons } from "../../constants/icons";
import { Transaction } from "./source-icon.component.i";

@Component({
  selector: "imo-source-icon",
  templateUrl: "./source-icon.component.html",
  styleUrls: ["./source-icon.component.scss"],
})
export class SourceIconComponent {
  @Input() transaction: Transaction;
  @Input() text: string;
  public openInNew = Icons.openInNew;
  @Output() clickSourceIcon = new EventEmitter<Transaction>();
  onClickSourceIcon($event) {
    $event.stopPropagation();
    this.clickSourceIcon.emit(this.transaction);
    return false;
  }
}
