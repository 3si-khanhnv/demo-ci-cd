import { Component, Input } from "@angular/core";
import { Breadcrumb } from "./breadcrumb.component.i";
import { Icons } from "../../constants/icons";
import { Constant } from "../../constants";

@Component({
  selector: "imo-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent {
  @Input() breadcrumbs: Breadcrumb[];

  @Input() listURLNotRouting = Constant.listURLNotRouting;
  public caretLeft = Icons.caretLeft;

  public checkIsRouting(router: string) {
    return this.listURLNotRouting.includes(router);
  }
}
