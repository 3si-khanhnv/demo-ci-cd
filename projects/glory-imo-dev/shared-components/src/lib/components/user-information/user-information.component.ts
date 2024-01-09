import { Component, Input } from "@angular/core";
import { UserInformation } from "./user-information.component.i";
import { InformationLabel } from "./user-information.constant";

@Component({
  selector: "imo-user-information",
  templateUrl: "./user-information.component.html",
  styleUrls: ["./user-information.component.scss"],
})
export class UserInformationComponent {
  @Input() user: UserInformation;
  userInformationLabel = new InformationLabel();
}
