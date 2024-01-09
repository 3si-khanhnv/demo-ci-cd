import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatesPipe } from "./translates.pipe";

@NgModule({
  declarations: [TranslatesPipe],
  providers: [TranslatesPipe],
  exports: [TranslatesPipe],
  imports: [TranslateModule],
})
export class TranslatesPipeModule {}
