import { NgModule } from "@angular/core";
import { MatCommonModule, MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { PortalModule } from "@angular/cdk/portal";
import { OverlayModule } from "@angular/cdk/overlay";

import { TimePickerContentComponent } from "./time-picker-content.component";
import { MomentDateTimeAdapter, TIME_PICKER_DATE_FORMATS } from "./time-picker.adapter";
import { TimePickerInputDirective, TIME_PICKER_FORMATS, DisableControlDirective } from "./time-picker-input.directive";
import { TimePickerComponent } from "./time-picker.component";
import { ButtonModule } from "../button/button.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "ngx-flexible-layout";
// import { PluginModule } from "../../plugins/plugin.module";
// import { ComponentsModule } from "../components.module";
// import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  imports: [
    // PluginModule,
    // ComponentsModule,
    PortalModule,
    MatCommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    OverlayModule,
    // PipesModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    FlexLayoutModule,
  ],
  declarations: [TimePickerComponent, DisableControlDirective, TimePickerContentComponent, TimePickerInputDirective],
  exports: [TimePickerComponent, DisableControlDirective, TimePickerContentComponent, TimePickerInputDirective],
  providers: [MomentDateTimeAdapter, { provide: TIME_PICKER_FORMATS, useValue: TIME_PICKER_DATE_FORMATS }],
})
export class TimePickerModule {}
