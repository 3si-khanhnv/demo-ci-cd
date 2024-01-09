import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkerComponent } from "./marker.component";
import {} from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
@NgModule({
  declarations: [MarkerComponent],
  exports: [MarkerComponent],
  imports: [CommonModule, MatButtonModule, TranslateModule],
})
export class MarkerModule {}
