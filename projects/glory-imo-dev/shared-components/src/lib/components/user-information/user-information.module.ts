import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { UserInformationComponent } from "./user-information.component";

@NgModule({
  declarations: [UserInformationComponent],
  imports: [CommonModule, TranslateModule],
  exports: [UserInformationComponent],
})
export class UserInformationModule {}
