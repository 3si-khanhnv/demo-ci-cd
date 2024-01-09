import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import moment from "moment";
import { TimePickerComponent } from "./time-picker.component";
import { Labels } from "./time-picker.component.i";
import { TimePickerModule } from "./time-picker.module";

const commonConfig = {
  labels: {
    errorMessages: {
      imoTimepickerMax: "max",
      imoTimepickerMin: "min",
      imoTimepickerParse: "parse",
    },
    placeholder: "Select time",
  } as Labels,
};

const meta: Meta<TimePickerComponent> = {
  title: "Components / Atoms/TimePicker",
  component: TimePickerComponent,
  argTypes: { selectedAt: { action: "selectedAt" } },
  decorators: [
    moduleMetadata({
      imports: [TimePickerModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TimePickerComponent>;

export const Case1: Story = {
  name: "usecase",
  render: (args) => ({
    props: args,
    template: `
    <imo-time-picker [labels]="labels" (selectedAt)="selectedAt($event)"></imo-time-picker>
    `,
  }),
  args: {
    labels: commonConfig.labels,
  },
};

export const Case2: Story = {
  name: "with min max time",
  render: (args) => ({
    props: args,
    template: `
    <imo-time-picker
        [minTime]="minTime"
        [maxTime]="maxTime"
        [labels]="labels"
        (selectedAt)="selectedAt($event)">
      </imo-time-picker>
    `,
  }),
  args: {
    labels: commonConfig.labels,
    minTime: moment({ year: 2019, month: 6, day: 24, hour: 13, minute: 42 }),
    maxTime: moment({ year: 2019, month: 6, day: 24, hour: 19, minute: 30 }),
  },
};

export const Case3: Story = {
  name: "have default value",
  render: (args) => ({
    props: args,
    template: `
    <imo-time-picker [default]="default" [labels]="labels" (selectedAt)="selectedAt($event)"></imo-time-picker>
    `,
  }),
  args: {
    labels: commonConfig.labels,
    default: moment({ year: 2020, month: 10, day: 2, hour: 9, minute: 30 }),
  },
};

export const Case4: Story = {
  name: "time picker return string",
  render: (args) => ({
    props: args,
    template: `
    <imo-time-picker [stringValue]="true" [default]="default" [labels]="labels" (selectedAt)="selectedAt($event)"></imo-time-picker>
    `,
  }),
  args: {
    labels: commonConfig.labels,
    default: moment("10:00 AM", "HH:mm a"),
  },
};

export const Case5: Story = {
  name: "time picker disable",
  render: (args) => ({
    props: args,
    template: `
    <imo-time-picker [disabled]="true" [default]="default" [labels]="labels"></imo-time-picker>
    `,
  }),
  args: {
    labels: commonConfig.labels,
    default: moment({ year: 2020, month: 6, day: 5, hour: 11, minute: 29 }),
  },
};
