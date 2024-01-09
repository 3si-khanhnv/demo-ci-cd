import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NavItem } from "../menu-categories/menu-item/menu-item.i";
import { UserInformation } from "../header/header.constant";

@Component({
  selector: "imo-header-tab",
  templateUrl: "./header-tab.component.html",
  styleUrls: ["./header-tab.component.scss"],
})
export class HeaderTabComponent implements OnInit {
  @Input() tabs: Array<NavItem>;
  @Input() otherApplicationLinks: UserInformation["otherApplicationLinks"];

  @Output() changedTab = new EventEmitter<string>();
  @Output() openOtherApp = new EventEmitter<string>();

  activeRoutes: boolean[] = [];

  constructor() {}

  ngOnInit(): void {
    // this.activeRoutes = this.tabs.map(this.checkActiveTab);
    // this.onRouteUrlChange();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes["tabs"]) {
  //     if (!changes["tabs"].firstChange) {
  //       this.activeRoutes = this.tabs.map((tab) => this.checkActiveTab(tab));
  //     }
  //   }
  // }

  // checkActiveTab = (tab: { name: string; url: string; children: string[] }): boolean =>
  //   this.route.isActive(tab.url, false) || this.isChildrenActive(tab.children);

  // public isChildrenActive(urls: string[]) {
  //   return urls.map((route) => this.route.isActive(route, false)).includes(true);
  // }

  // public onRouteUrlChange() {
  //   this.route.events.subscribe(() => {
  //     this.activeRoutes = this.tabs.map(this.checkActiveTab);
  //   });
  // }

  public onClickTab(tab: string) {
    this.changedTab.emit(tab);
  }

  public openedOtherApp(applicationUrl: string): void {
    this.openOtherApp.emit(applicationUrl);
  }
}
