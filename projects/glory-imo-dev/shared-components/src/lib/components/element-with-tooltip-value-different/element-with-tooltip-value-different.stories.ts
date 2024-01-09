import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { ElementWithTooltipValueDifferentComponent } from "./element-with-tooltip-value-different.component";
import { ElementWithTooltipValueDifferentData } from "./element-with-tooltip-value-different.component.i";
import { ElementWithTooltipValueDifferentModule } from "./element-with-tooltip-value-different.module";

const data: ElementWithTooltipValueDifferentData = {
  text: "User 1",
  isDisableTooltip: false,
  messageTooltip: "sampleuser01@mail.com",
  positionTooltip: "above",
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ElementWithTooltipValueDifferentComponent> = {
  title: "Components/ Atoms/ElementWithTooltipValueDifferent",
  component: ElementWithTooltipValueDifferentComponent,
  decorators: [
    moduleMetadata({
      imports: [ElementWithTooltipValueDifferentModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ElementWithTooltipValueDifferentComponent>;

export const Default: Story = {
  args: {
    // Input
    data: data,
  },
};
