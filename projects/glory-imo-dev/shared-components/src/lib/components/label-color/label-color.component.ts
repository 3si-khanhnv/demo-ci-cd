import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "imo-label-color",
  templateUrl: "./label-color.component.html",
  styleUrls: ["./label-color.component.scss"],
})
export class LabelColorComponent implements OnInit {
  @Input() label: string;
  @Input() color: string;

  public propertiesCss = {};

  ngOnInit() {
    this.propertiesCss = { background: this.color };
  }
}
