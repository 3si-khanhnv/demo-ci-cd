import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormatModel } from "./select-format.component.i";

@Component({
  selector: "imo-select-format",
  templateUrl: "./select-format.component.html",
  styleUrls: ["./select-format.component.scss"],
})
export class SelectFormatComponent implements OnInit {
  @Input() isDisabled = false;
  @Input() itemDefault: FormatModel;
  @Input() items: FormatModel[];
  @Input() isShowMenu = true;
  @Output() selected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  public onSelectedFormat(value: string) {
    this.selected.emit(value);
  }
}
