import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "imo-badge",
  templateUrl: "./badge.component.html",
  styleUrls: ["./badge.component.scss"],
})
export class BadgeComponent implements OnInit {
  constructor() {}

  @Output() clicked = new EventEmitter();

  ngOnInit() {}

  onClick() {
    this.clicked.emit();
  }
}
