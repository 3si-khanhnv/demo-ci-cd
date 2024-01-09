import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { SelectFormatComponent } from "./select-format.component";
import { FormatModel } from "./select-format.component.i";
import { SelectFormatModule } from "./select-format.module";

const itemDefault: FormatModel = { value: "pdf", label: "PDF", default: true };
const items: FormatModel[] = [
  { value: "csv", label: "CSV", default: false },
  { value: "xml", label: "XML", default: false },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SelectFormatComponent> = {
  title: "Components / Atoms/SelectFormat",
  argTypes: {
    selected: { action: "onSelectedFormat" },
  },
  component: SelectFormatComponent,
  decorators: [
    moduleMetadata({
      imports: [SelectFormatModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<SelectFormatComponent>;

export const NormalSelect: Story = {
  args: {
    items,
    itemDefault,
  },
};

export const DisableSelect: Story = {
  args: {
    items,
    itemDefault,
    isDisabled: true,
  },
};
