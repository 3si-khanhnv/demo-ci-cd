import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReleaseNotesComponent } from "./release-notes.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [ReleaseNotesComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ReleaseNotesComponent],
})
export class ReleaseNotesModule {}
