import { NgModule } from "@angular/core";
import { LocalizedDatePipe } from "./localized-date/localized-date.pipe";
import { ObjectKeysPipe } from "./object-keys.pipe";

@NgModule({
  declarations: [ObjectKeysPipe, LocalizedDatePipe],
  providers: [LocalizedDatePipe],
  exports: [ObjectKeysPipe, LocalizedDatePipe],
  imports: [],
})
export class PipesModule {}
