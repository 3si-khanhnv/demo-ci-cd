import { FormControl } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { RadioFormListComponent } from "./radio-form-list.component";
import { RadioFormButton } from "./radio-form-list.component.i";
import { RadioFormListModule } from "./radio-form-list.module";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<RadioFormListComponent> = {
  title: "Components / Atoms/Radio Form List",
  argTypes: {
    radioChanged: { action: "radioChanged" },
  },
  component: RadioFormListComponent,
  decorators: [
    moduleMetadata({
      imports: [RadioFormListModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<RadioFormListComponent>;

export const Default: Story = {
  args: {
    radios: [
      { name: "Standard order", value: "standard", isDisable: false, formControl: new FormControl("11"), inputTextAlgin: "right" },
      {
        name: "Emergency order 123123 ",
        value: "emergency",
        isDisable: false,
        formControl: new FormControl("aa"),
        inputTextAlgin: "right",
      },
      { name: "Order order", value: "order", isDisable: false, formControl: new FormControl("cc") },
      { name: "May order", value: "may", isDisable: false, formControl: new FormControl("bb"), inputTextAlgin: "left" },
    ] as RadioFormButton[],
  },
};

export const FormWithoutRadio: Story = {
  args: {
    radios: [
      {
        name: "Percentage (Quantity)",
        value: "percentage",
        isDisable: false,
        formControl: new FormControl("11"),
        inputTextAlgin: "right",
      },
    ] as RadioFormButton[],
  },
};
