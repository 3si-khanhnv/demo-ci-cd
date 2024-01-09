import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { RadioComponent } from "./radio.component";
import { RadioButton } from "./radio.component.i";
import { RadioModule } from "./radio.module";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<RadioComponent> = {
  title: "Components / Atoms/Radio",
  argTypes: {
    changed: { action: "Changed" },
  },
  component: RadioComponent,
  decorators: [
    moduleMetadata({
      imports: [RadioModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<RadioComponent>;

export const Usage: Story = {
  args: {
    radios: [
      { name: "Standard order", value: "standard" },
      { name: "Emergency order", value: "emergency" },
    ] as RadioButton[],
    defaultValue: "standard",
  },
};

export const DisableAElement: Story = {
  args: {
    radios: [
      { name: "Standard order", value: "standard", isDisable: false },
      { name: "Emergency order", value: "emergency", isDisable: true },
    ] as RadioButton[],
    defaultValue: "standard",
  },
};
