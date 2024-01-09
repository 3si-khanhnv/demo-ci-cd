import { Component, Input } from "@angular/core";
import { OptionsMessage, StatusIcon } from "./message-options.component.i";
import { Icons } from "../../constants/icons";

@Component({
  selector: "imo-message-options",
  templateUrl: "./message-options.component.html",
  styleUrls: ["./message-options.component.scss"],
})
export class MessageOptionsComponent {
  statusWarning: StatusIcon = Icons.statusWarning;
  statusError: StatusIcon = Icons.statusError;
  checkCircleOutline: StatusIcon = Icons.checkCircleOutline;
  @Input() options: OptionsMessage;
}
