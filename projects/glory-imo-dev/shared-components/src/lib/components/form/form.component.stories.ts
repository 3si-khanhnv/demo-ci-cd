import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { FormComponent } from "./form.component";
import { Labels } from "./form.component.i";
import { FormModule } from "./form.module";
import { FormControl, Validators } from "@angular/forms";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<FormComponent> = {
  title: "Components/ Atoms/Form",
  argTypes: {
    // Output
    value: { action: "value" },
  },
  component: FormComponent,
  decorators: [
    moduleMetadata({
      imports: [FormModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<FormComponent>;

export const Default: Story = {
  args: {
    // Input
    labels: {
      placeholder: "This is a placeHolder",
      aria: "This is aria-label for form",
    } as Labels,
    defaultValue: "",
  },
};

export const DefaultTextarea: Story = {
  args: {
    // Input
    labels: {
      placeholder: "This is a placeHolder",
      aria: "This is aria-label for form",
      type: "textarea",
    } as Labels,
    defaultValue: "",
  },
};

export const ReadonlyInput: Story = {
  args: {
    // Input
    labels: {
      placeholder: "This is a placeHolder",
      aria: "This is aria-label for form",
    } as Labels,
    defaultValue: "input",
    readonly: true,
  },
};

export const ReadonlyTextArea: Story = {
  args: {
    // Input
    labels: {
      placeholder: "This is a placeHolder",
      aria: "This is aria-label for form",
      type: "textarea",
    } as Labels,
    defaultValue: "text area",
    readonly: true,
  },
};

export const DisableForm: Story = {
  args: {
    // Input
    labels: {
      placeholder: "This is a placeHolder",
      aria: "This is aria-label for form",
    } as Labels,
    defaultValue: "input",
    disabled: true,
  },
};

export const DefaultHaveValue: Story = {
  args: {
    // Input
    labels: {
      placeholder: "This is a placeHolder",
      aria: "This is aria-label for form",
    } as Labels,
    defaultValue: "",
    formControl: new FormControl("Angular"),
  },
};

export const ChangeBorderColor: Story = {
  args: {
    // Input
    labels: {
      placeholder: "This is a placeHolder",
      aria: "This is aria-label for form",
    } as Labels,
    defaultValue: "",
    changeFieldColor: "warn",
  },
};

export const ErrorRequired: Story = {
  args: {
    // Input
    labels: {
      placeholder: "This is required",
      aria: "This is aria-label for form",
    } as Labels,
    defaultValue: "",
    formControl: new FormControl("", Validators.required),
  },
};
