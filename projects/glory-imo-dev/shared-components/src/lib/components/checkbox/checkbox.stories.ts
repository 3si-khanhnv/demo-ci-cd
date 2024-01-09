import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { CheckboxComponent } from "./checkbox.component";
import { CheckboxData } from "./checkbox.component.i";
import { CheckboxModule } from "./checkbox.module";

const data: CheckboxData = {
  label: "Parent",
  key: "parent",
  value: false,
  disabled: false,
  children: [
    {
      label: "Child 1",
      key: "child1",
      value: false,
      disabled: true,
    },
    {
      label: "Child 2",
      key: "child2",
      value: false,
      disabled: true,
      children: [
        { label: "Child 2.1", key: "child2.1", value: true, disabled: true, alwayDisabledAndKeepValue: true },
        {
          label: "Child 2.2",
          key: "child2.2",
          value: false,
          disabled: true,
          children: [{ label: "Child 2.2.1", key: "child2.2.1", value: false, disabled: true }],
        },
      ],
    },
    {
      label: "Child 3",
      key: "child3",
      value: false,
      disabled: true,
    },
    {
      label: "Child 4",
      key: "child4",
      value: true,
      disabled: true,
      alwayDisabledAndKeepValue: true,
    },
  ],
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<CheckboxComponent> = {
  title: "Components/ Atoms/Checkbox",
  argTypes: {
    // Output
    onCheckedValue: { action: "onCheckedValue" },
  },
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    // Input
    data: data,
  },
};

export const ErrorChecked: Story = {
  args: {
    // Input
    data: { ...data, value: true, isError: true, children: undefined },
  },
};
