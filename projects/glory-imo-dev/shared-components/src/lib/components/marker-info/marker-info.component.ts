import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { IStatusInfo } from "../status-info/status-info.i";
import { IStatusInfoList, ITypeIdList } from "./marker-info.component.i";
import { config } from "./marker-info.constant";

@Component({
  selector: "imo-marker-info",
  templateUrl: "./marker-info.component.html",
  styleUrls: ["./marker-info.component.scss"],
})
export class MarkerInfoComponent implements OnChanges {
  @Input() data: IStatusInfo;
  @Input() companyName: string;
  @Input() locationName: string;
  @Input() statusInfoList: IStatusInfoList[];
  @Input() typeIdList: ITypeIdList[];
  @Input() isResize = false;
  @Input() config = config;

  @Output() clicked = new EventEmitter<any>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue) {
      this.config = { ...this.config, ...changes.config.currentValue };
    }
  }

  onCloseInfo(event: any) {
    this.clicked.emit(event);
  }

  trackByFn(index: number): number {
    return index;
  }
}
