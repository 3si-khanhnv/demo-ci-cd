import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { CheckboxListComponent } from "./checkbox-list.component";
import { CheckboxListModule } from "./checkbox-list.module";
import { LabelledValue } from "./checkbox-list.component.i";

const list = [
  { value: "coin", label: "Request coin pickup" },
  { value: "note", label: "Request note pickup" },
] as LabelledValue<string>[];

const listIcon = [
  { value: "icon1", label: "Request icon pickup", icon: "criticalHigh" },
  { value: "icon2", label: "Request icon pickup", icon: "criticalLow" },
  { value: "icon3", label: "Request icon pickup", icon: "warningHigh" },
  { value: "icon4", label: "Request icon pickup", icon: "warningLow" },
  { value: "icon5", label: "Request icon pickup", icon: "ok" },
] as LabelledValue<string>[];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<CheckboxListComponent> = {
  title: "Components/ Atoms/CheckboxList",
  argTypes: {
    // Output
    checked: { action: "checked" },
  },
  component: CheckboxListComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxListModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CheckboxListComponent>;

export const Default: Story = {
  args: {
    // Input
    list,
  },
};

export const OptionWithDefaultChecked: Story = {
  args: {
    // Input
    list,
    checkedItem: ["coin"],
  },
};

export const OptionWithIcon: Story = {
  args: {
    // Input
    list: listIcon,
    checkedItem: ["icon1"],
  },
};
