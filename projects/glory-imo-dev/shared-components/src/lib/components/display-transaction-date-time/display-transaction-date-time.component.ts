import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import dayjs from "dayjs";
import { IConfClientFormats } from "../../services/config/config.service";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Icons } from "../../constants/icons";
import { Transaction } from "./display-transaction-date-time.component.i";
dayjs.extend(utc);
dayjs.extend(timezone);
@Component({
  selector: "imo-display-transaction-date-time",
  templateUrl: "./display-transaction-date-time.component.html",
  styleUrls: ["./display-transaction-date-time.component.scss"],
})
export class DisplayTransactionDateTimeComponent implements AfterViewChecked {
  ngAfterViewChecked(): void {
    const timeZoneHeight = this.timeZoneChild.nativeElement.offsetHeight;
    if (timeZoneHeight > 16) {
      this.timeZoneChild.nativeElement.style.display = "inline-table";
    } else {
      this.timeZoneChild.nativeElement.style.display = "inline";
    }
  }
  public dateTime = "";
  public timeZone = "";
  public contentWidth = "100%";
  @Input() confClientFormats: IConfClientFormats;

  @ViewChild("timeZoneChild", { static: false }) timeZoneChild!: ElementRef;

  _transaction: Partial<Transaction>;
  @Input() set transaction(transaction: Partial<Transaction>) {
    const dateTimeFormat = `${this.confClientFormats.datetimeFormatSeconds}`;
    this._transaction = transaction;
    this.timeZone = transaction.timezone && transaction.timezone ? `(${transaction.timezone})` : "";
    this.dateTime =
      transaction.timezone && transaction.timezone !== ""
        ? dayjs(transaction.transactionDateTime).tz(transaction.timezone).format(dateTimeFormat)
        : dayjs(transaction.transactionDateTime).format(dateTimeFormat);
  }
  @Input() transactionIdActive = "";
  @Input() type: number;
  public iconComment = Icons.balloon;
  public plusComment = Icons.plusComment;

  @Output() clicked = new EventEmitter<any>();

  onClickComment($event) {
    $event.stopPropagation();
    const transactionDateTime = `${this.dateTime}${this.timeZone}`;
    this.clicked.emit({
      transactionId: this._transaction.transactionId,
      transactionDateTime,
      messageSequenceNumber: this._transaction.messageSequenceNumber,
    });
    return false;
  }
}
