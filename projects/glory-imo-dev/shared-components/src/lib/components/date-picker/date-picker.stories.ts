import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import dayjs from "dayjs";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { DatePickerComponent } from "./date-picker.component";
import { Labels } from "./date-picker.component.i";
import { DatePickerModule } from "./date-picker.module";

const commonConfig: { labels: Labels } = {
  labels: {
    placeholder: "Select Date",
    errorMessages: {
      matDatepickerMax: "max",
      matDatepickerMin: "min",
      matDatepickerParse: "parse",
    },
  },
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<DatePickerComponent> = {
  title: "Components/ Atoms/DatePicker",
  argTypes: {
    // Output
    selectedDate: { action: "selectedDate" },
  },
  component: DatePickerComponent,
  decorators: [
    moduleMetadata({
      imports: [DatePickerModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<DatePickerComponent>;

export const Default: Story = {
  args: {
    // Input
    labels: commonConfig.labels,
  },
};

export const DefaultValue: Story = {
  args: {
    // Input
    default: dayjs("2020/07/06"),
    start: dayjs("2020/07/05"),
    end: dayjs("2020/07/08"),
    labels: commonConfig.labels,
  },
};

export const DisabledDatePicker: Story = {
  args: {
    // Input
    default: dayjs("2020/07/06"),
    start: dayjs("2020/07/05"),
    end: dayjs("2020/07/08"),
    labels: commonConfig.labels,
    isDisable: true,
  },
};

export const ReadonlyDatePicker: Story = {
  args: {
    // Input
    default: dayjs("2020/07/06"),
    start: dayjs("2020/07/05"),
    end: dayjs("2020/07/08"),
    labels: commonConfig.labels,
    isReadonly: true,
    // isDisable: true,
  },
};
