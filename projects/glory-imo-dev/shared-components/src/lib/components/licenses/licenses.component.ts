import { Component, Input } from "@angular/core";

@Component({
  selector: "imo-licenses",
  templateUrl: "./licenses.component.html",
  styleUrls: ["./licenses.component.scss"],
})
export class LicensesComponent {
  @Input() licenses: string;
}
