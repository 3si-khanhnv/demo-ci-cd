import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  exports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, PipesModule],
})
export class PluginModule {}
