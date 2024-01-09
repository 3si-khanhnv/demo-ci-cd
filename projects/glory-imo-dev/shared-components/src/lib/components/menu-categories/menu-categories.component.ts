import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { Router } from "@angular/router";

import { NavItem } from "./menu-item/menu-item.i";
import { Icons } from "../../constants/icons";
import { Constant } from "../../constants";

@Component({
  selector: "imo-menu-categories",
  templateUrl: `./menu-categories.component.html`,
  styleUrls: ["menu-item/menu-item.component.scss"],
})
export class MenuCategoriesComponent implements OnChanges {
  @ViewChildren(MatMenuTrigger) trigger: QueryList<MatMenuTrigger>;

  @ViewChild("menu") menu: any;

  @ViewChild("menuTrigger") menuTrigger: any;

  @ViewChild("navBar") navBar: ElementRef;

  @Input() navItems: NavItem[];

  @Input() customsClass = "custom-menu-header";

  @Input() iconItem = Icons.arrowRight.src;

  @Input() isUseDynamicMenu = false;

  public _navItems: NavItem[] = [];

  public activeItem = "";

  public isMenuOpen = false;

  constructor(private cdRef: ChangeDetectorRef, public router: Router) {}

  @HostListener("document:mousedown", ["$event"])
  onClick(event: MouseEvent): void {
    const temp: any = document.getElementsByClassName("custom-menu-header");
    let isExist = false;

    if (temp.length) {
      for (let i = 0; i < temp.length; i++) {
        const el = temp[i];
        if (el.contains(event.target as any)) {
          isExist = true;
          break;
        }
      }
    }

    if (!!this.trigger && !isExist) {
      this.trigger.toArray().forEach((item: MatMenuTrigger) => {
        if (item.menuOpen) {
          item.closeMenu();
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Constant.listRoutingInActive.includes(this.router.url)) {
      this.activeItem = null;
    }

    if (changes.navItems && this.navItems.length) {
      this._navItems = changes.navItems.currentValue;
      this.cdRef.detectChanges();
    }
  }

  public setActiveItem(page: string) {
    this.activeItem = page;
  }
}
