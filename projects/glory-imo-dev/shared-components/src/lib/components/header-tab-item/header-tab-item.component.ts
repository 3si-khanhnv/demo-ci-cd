import { Component, Input } from "@angular/core";
import { NavItem } from "../menu-categories/menu-item/menu-item.i";

@Component({
  selector: "imo-header-tab-item",
  templateUrl: "./header-tab-item.component.html",
  styleUrls: ["./header-tab-item.component.scss"],
})
export class HeaderTabItemComponent {
  @Input() text: string;
  @Input() isOpenOtherApp = false;
  @Input() navItems: NavItem[];
}
