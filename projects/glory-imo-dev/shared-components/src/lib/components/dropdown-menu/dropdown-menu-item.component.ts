import { Component, OnInit, Input } from "@angular/core";
import { isUndefined } from "util";

@Component({
  selector: "imo-dropdown-menu-item",
  // template: "<div>{{ this.label | translate }}</div>",
  template: "<div>{{ this.label  | translate }}</div>",
  styleUrls: ["./dropdown-menu-item.component.scss"],
})
export class DropdownMenuItemComponent implements OnInit {
  @Input() label: string;
  @Input() value: any;

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    if (isUndefined(this.value)) {
      this.value = this.label;
    }
  }
}
