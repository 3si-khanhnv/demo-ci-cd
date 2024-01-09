import { NavItem } from "../menu-categories/menu-item/menu-item.i";

export interface TabItem {
  name: string;
  url: string;
  children: string[];
  navItems?: NavItem[];
}
