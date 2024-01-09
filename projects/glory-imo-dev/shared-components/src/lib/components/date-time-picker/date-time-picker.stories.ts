import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import moment from "moment";
import { NGX_MAT_DATE_FORMATS } from "@angular-material-components/datetime-picker";
import type { MatDateFormats } from "@angular/material/core";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { TranslateService } from "@ngx-translate/core";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { DayjsDateAdapter } from "../../utilities/dayjs-date-adapter";
import { DateTimePickerComponent } from "./date-time-picker.component";
import { DateTimePickerModule } from "./date-time-picker.module";
import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";

let timeItem = "00:00";
const timeItems = [] as LabelledValue<string>[];
for (let index = 0; index < 24; index++) {
  const value = (index < 10 && `0${index}:00`) || `${index}:00`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  if (index === 0) timeItem = value;
  const value1 = { label: value, value: value };
  const value2 = (index < 10 && `0${index}:30`) || `${index}:30`;
  const value3 = { label: value2, value: value2 };
  timeItems.push(value1);
  timeItems.push(value3);
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<DateTimePickerComponent> = {
  title: "Components/ Atoms/DateTimePicker",
  argTypes: {
    // Output
    datePickerChange: { action: "datePickerChange" },
  },
  component: DateTimePickerComponent,
  decorators: [
    moduleMetadata({
      imports: [DateTimePickerModule, StoryBookI18nModule, BrowserAnimationsModule],
      providers: [
        {
          provide: NGX_MAT_DATE_FORMATS,
          useFactory: () => {
            const format: MatDateFormats = {
              parse: {
                dateInput: `YYYY/MM/DD HH:mm`,
              },
              display: {
                dateInput: `YYYY/MM/DD HH:mm`,
                monthYearLabel: "MMMM YYYY",
                dateA11yLabel: "YYYY/MM/DD",
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
                dateInput: "YYYY/MM/DD",
              },
              display: {
                dateInput: "YYYY/MM/DD",
                monthYearLabel: "MMMM YYYY",
                dateA11yLabel: "YYYY/MM/DD",
                monthYearA11yLabel: "MMMM YYYY",
              },
            };

            return format;
          },
        },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DateTimePickerComponent>;

export const Default: Story = {
  args: {
    // Input
    type: "dateTime",
    placeholderDate: "Select date",
  },
};

export const DateTimePicker: Story = {
  args: {
    // Input
    type: "dateTime",
    placeholderDate: "Select date",
    defaultDate: moment(),
    minDate: moment(),
  },
};

export const DateTimePickerSelectTime: Story = {
  args: {
    // Input
    type: "dateTimeSelect",
    placeholderDate: "Select date",
    defaultDate: moment("2023/09/09 00:00", "YYYY/MM/DD HH:mm"),
    timeItems,
  },
};

export const DateTimePickerDisabled: Story = {
  args: {
    // Input
    type: "dateTime",
    disabled: true,
    readonly: true,
    defaultDate: moment(),
  },
};
