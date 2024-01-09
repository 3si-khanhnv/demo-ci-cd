import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { SwitchesComponent } from "./switches.component";
import { SwitchesModule } from "./switches.module";

type NewType = SwitchesComponent;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<NewType> = {
  title: "Components / Atoms/Switches",
  argTypes: {
    changed: { action: "changed" },
  },
  component: SwitchesComponent,
  decorators: [
    moduleMetadata({
      imports: [SwitchesModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<SwitchesComponent>;

export const Switches: Story = {
  args: {},
};
