import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { animateText } from "../../animations/animations";
import { StatusIcon } from "../message-options/message-options.component.i";
import { INavItem } from "./sidebar.component.i";
import { Icons } from "../../constants/icons";

@Component({
  selector: "imo-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  animations: [animateText],
})
export class SidebarComponent {
  @Input() items: INavItem[];
  @Input() sideNavState: boolean;
  @Input() linkText = true;
  @Input() pageTo = "/view-reports";
  checkCircleOutline: StatusIcon = Icons.checkCircleOutline;
  caretDoubleLeft: StatusIcon = Icons.caretDoubleLeft;
  caretDoubleRight: StatusIcon = Icons.caretDoubleRight;

  @Output() controlNavState = new EventEmitter();
  constructor(public router: Router) {}

  onItemSelected(item) {
    this.router.navigate([`${this.pageTo}` + item.route]);
  }
  onSineNavToggle() {
    this.controlNavState.emit();
  }
}
