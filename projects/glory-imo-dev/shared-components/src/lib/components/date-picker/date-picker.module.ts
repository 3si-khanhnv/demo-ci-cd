import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { DateAdapter, MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { confClientFormats } from "../../services/config/config.service";
import { DayjsDateAdapter } from "../../utilities/dayjs-date-adapter";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { DatePickerComponent } from "./date-picker.component";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule,
    MatMomentDateModule,
    SvgIconModule,
    TranslateModule,
  ],
  providers: [
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
            dateA11yLabel: "DD/MM/YYYY",
            monthYearA11yLabel: "MMMM YYYY",
          },
        };

        return format;
      },
    },
    { provide: DateAdapter, useClass: DayjsDateAdapter, deps: [TranslateService, MAT_DATE_LOCALE, MAT_DATE_FORMATS] },
  ],
  exports: [DatePickerComponent],
})
export class DatePickerModule {}
