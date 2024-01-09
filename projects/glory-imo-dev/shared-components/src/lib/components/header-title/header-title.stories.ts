import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { HeaderTitleComponent } from "./header-title.component";
import { HeaderTitleModule } from "./header-title.module";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<HeaderTitleComponent> = {
  title: "Components/ Atoms/HeaderTitle",
  component: HeaderTitleComponent,
  decorators: [
    moduleMetadata({
      imports: [HeaderTitleModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<HeaderTitleComponent>;

export const Default: Story = {
  args: {
    // Input
    title: "IMO",
  },
};
