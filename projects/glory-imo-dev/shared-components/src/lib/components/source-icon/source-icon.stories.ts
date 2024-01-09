import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { SourceIconComponent } from "./source-icon.component";
import { SourceIconModule } from "./source-icon.module";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SourceIconComponent> = {
  title: "Components/Atoms/Source Icon",
  argTypes: {
    onClickSourceIcon: { action: "onClickSourceIcon" },
  },
  component: SourceIconComponent,
  decorators: [
    moduleMetadata({
      imports: [SourceIconModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<SourceIconComponent>;

export const Display: Story = {
  args: {
    text: "Source",
  },
};
