import { NgModule } from "@angular/core";

import { LoadingComponent } from "./loading.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [LoadingComponent],
  imports: [MatDialogModule, ToastrModule],
})
export class LoadingModule {}
