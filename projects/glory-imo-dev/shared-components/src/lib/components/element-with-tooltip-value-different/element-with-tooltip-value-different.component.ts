import { Component, Input, OnInit } from "@angular/core";
import { ElementWithTooltipValueDifferentData } from "./element-with-tooltip-value-different.component.i";

@Component({
  selector: "imo-element-with-tooltip-value-different",
  templateUrl: "./element-with-tooltip-value-different.component.html",
  styleUrls: ["./element-with-tooltip-value-different.component.scss"],
})
export class ElementWithTooltipValueDifferentComponent implements OnInit {
  @Input() data: ElementWithTooltipValueDifferentData;
  constructor() {}
  ngOnInit(): void {}
}
