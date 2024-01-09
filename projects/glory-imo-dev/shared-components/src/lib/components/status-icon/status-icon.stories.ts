import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { StatusIconComponent } from "./status-icon.component";
import { ENumIconStatus } from "./status-icon.i";
import { StatusIconModule } from "./status-icon.module";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<StatusIconComponent> = {
  title: "Components / Atoms/StatusIcon",
  argTypes: {},
  component: StatusIconComponent,
  decorators: [
    moduleMetadata({
      imports: [StatusIconModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<StatusIconComponent>;

export const GoodIcon: Story = {
  args: {
    type: ENumIconStatus.STATUS_GOOD,
  },
};

export const ErrorIcon: Story = {
  args: {
    type: ENumIconStatus.STATUS_ERROR_MARKER,
  },
};

export const MissingIcon: Story = {
  args: {
    type: ENumIconStatus.STATUS_MISSING,
  },
};

export const WarningIcon: Story = {
  args: {
    type: ENumIconStatus.STATUS_WARNING,
  },
};
