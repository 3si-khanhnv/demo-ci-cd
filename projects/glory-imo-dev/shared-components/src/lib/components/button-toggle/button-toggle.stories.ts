import { CommonModule } from "@angular/common";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { ButtonToggleComponent } from "./button-toggle.component";
import { IToggleOption } from "./button-toggle.component.i";
import { ButtonToggleModule } from "./button-toggle.module";

const listOption: IToggleOption[] = [
  {
    value: "note",
    label: "Note",
  },
  {
    value: "coin",
    label: "Coin",
  },
  {
    value: "all",
    label: "All",
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonToggleComponent> = {
  title: "Components/ Atoms/Button Toggle",
  argTypes: {
    // Output
    selectedOption: { action: "selectedOption" },
  },
  component: ButtonToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonToggleModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ButtonToggleComponent>;
export const Default: Story = {
  args: {
    // Input
    toggleOptions: listOption,
    defaultOption: "all",
  },
};

export const WithoutDefaultSelected: Story = {
  args: {
    // Input
    toggleOptions: listOption,
  },
};
