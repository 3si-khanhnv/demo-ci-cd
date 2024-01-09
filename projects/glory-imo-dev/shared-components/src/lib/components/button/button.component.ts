import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "imo-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  @Input() required: boolean;
  @Input() isDisabled = false;
  @Output() mouseEnterEvent = new EventEmitter<boolean>();
  @Output() mouseEnterLeave = new EventEmitter<boolean>();
  @Output() clicked = new EventEmitter<any>();

  onClickButton(event: any) {
    this.clicked.emit(event);
  }
}
