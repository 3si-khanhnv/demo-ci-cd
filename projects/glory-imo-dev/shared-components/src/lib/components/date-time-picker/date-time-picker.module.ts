import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS } from "@angular-material-components/datetime-picker";
import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MatDateFormats,
  MatNativeDateModule,
  MatRippleModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { DatePickerModule } from "../date-picker/date-picker.module";
import { SelectModule } from "../select/select.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { DateTimePickerComponent } from "./date-time-picker.component";
import { confClientFormats } from "../../services/config/config.service";
import { DayjsDateAdapter } from "../../utilities/dayjs-date-adapter";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
// If using Moment

@NgModule({
  declarations: [DateTimePickerComponent],
  exports: [DateTimePickerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMatMomentModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatRippleModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SvgIconModule,
    SelectModule,
    DatePickerModule,
    TranslateModule,
  ],
  providers: [
    {
      provide: NGX_MAT_DATE_FORMATS,
      useFactory: () => {
        const format: MatDateFormats = {
          parse: {
            dateInput: `${confClientFormats.dateFormat} ${confClientFormats.timeFormat}`,
          },
          display: {
            dateInput: `${confClientFormats.dateFormat} ${confClientFormats.timeFormat}`,
            monthYearLabel: "MMMM YYYY",
            dateA11yLabel: confClientFormats.dateFormat,
            monthYearA11yLabel: "MMMM YYYY",
          },
        };

        return format;
      },
    },
    { provide: DateAdapter, useClass: DayjsDateAdapter, deps: [TranslateService, MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    {
      provide: MAT_DATE_FORMATS,
      useFactory: () => {
        const format: MatDateFormats = {
          parse: {
            dateInput: confClientFormats.dateFormat,
          },
          display: {
            dateInput: confClientFormats.dateFormat,
            monthYearLabel: "MMMM YYYY",
            dateA11yLabel: confClientFormats.dateFormat,
            monthYearA11yLabel: "MMMM YYYY",
          },
        };

        return format;
      },
    },
  ],
})
export class DateTimePickerModule {}
