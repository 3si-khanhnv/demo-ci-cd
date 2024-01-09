import { Component, Input, ViewChild } from "@angular/core";
import { MatMenu } from "@angular/material/menu";

import { NavItem } from "./menu-item.i";
import { Icons } from "../../../constants/icons";

@Component({
  selector: "imo-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"],
})
export class MenuItemComponent {
  @ViewChild("childMenu") childMenu!: MatMenu | any;

  @Input() items: NavItem[] = [];

  @Input() customsClass = "";

  @Input() iconItem = Icons.arrowRight.src;

  @Input() indexElement = null;

  public activeItem: number = null;

  constructor() {}

  public setActiveItem(page: number) {
    this.activeItem = page;
  }
}
