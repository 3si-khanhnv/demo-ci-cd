import { FormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { WorkingDayComponent } from "./working-day.component";
import type { WorkingDay } from "./working-day.component.i";
import { WorkingDayModule } from "./working-day.module";
import { StoryBookI18nModule } from "../../../stories/storybook.module";

const data: WorkingDay = {
  checkbox: {
    label: "Monday",
    value: "monday",
    checked: true,
    disabled: false,
  },
  input: new FormControl("4"),
};

const meta: Meta<WorkingDayComponent> = {
  title: "Components / Atoms/Working day",
  component: WorkingDayComponent,
  argTypes: { checked: { action: "checked" } },
  decorators: [
    moduleMetadata({
      imports: [WorkingDayModule, StoryBookI18nModule, NoopAnimationsModule],
    }),
  ],
  render: (args) => ({
    props: args,
  }),
};

export default meta;
type Story = StoryObj<WorkingDayComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<imo-working-day
      [data]="data"
      (checked)="checked($event)"
    ></imo-working-day>`,
  }),
  args: {
    data: data,
  },
};
