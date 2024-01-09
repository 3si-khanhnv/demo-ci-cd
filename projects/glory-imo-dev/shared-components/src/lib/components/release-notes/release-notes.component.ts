import { Component, Input } from "@angular/core";
import { ReleaseNotes, labelReleaseNotes } from "./release-notes.component.i";

@Component({
  selector: "imo-release-notes",
  templateUrl: "./release-notes.component.html",
  styleUrls: ["./release-notes.component.scss"],
})
export class ReleaseNotesComponent {
  @Input() releaseNotes: ReleaseNotes;
  @Input() labelReleaseNotes = labelReleaseNotes;
  get releaseNotesKeys() {
    return Object.keys(this.releaseNotes);
  }
}
