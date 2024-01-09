import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { CheckboxListWithStaticComponent } from "./checkbox-list-with-static.component";
import { CheckboxListWithStaticData } from "./checkbox-list-with-static.component.i";
import { CheckboxListWithStaticModule } from "./checkbox-list-with-static.module";

const data: CheckboxListWithStaticData = {
  list: [
    { value: "option1", label: "Option 1", readonly: true },
    { value: "option2", label: "Option 2", readonly: true },
    { value: "option3", label: "Option 3", readonly: false },
    { value: "option4", label: "Option 4", readonly: false },
  ],
  checkedItem: [],
};
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<CheckboxListWithStaticComponent> = {
  title: "Components/ Atoms/Checkbox List With Static",
  argTypes: {
    // Output
    checkedOptions: { action: "checkedOptions" },
  },
  component: CheckboxListWithStaticComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxListWithStaticModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CheckboxListWithStaticComponent>;

export const Default: Story = {
  args: {
    // Input
    data: data,
  },
};
