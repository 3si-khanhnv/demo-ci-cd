import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IMarker } from "./marker.component.i";

@Component({
  selector: "imo-marker",
  templateUrl: "./marker.component.html",
  styleUrls: ["./marker.component.scss"],
})
export class MarkerComponent {
  @Input() marker: IMarker;
  @Output() emitClickMarker = new EventEmitter<IMarker>();
  @Output() emitMouseMarkerIn = new EventEmitter<IMarker>();
  @Output() emitMouseMarkerOut = new EventEmitter<IMarker>();

  handleMouseInMarker(marker: IMarker) {
    this.emitMouseMarkerIn.emit(marker);
  }
  handleMouseOutMarker(marker: IMarker) {
    this.emitMouseMarkerOut.emit(marker);
  }
  handleClickMarker(marker: IMarker) {
    this.emitClickMarker.emit(marker);
  }
}
