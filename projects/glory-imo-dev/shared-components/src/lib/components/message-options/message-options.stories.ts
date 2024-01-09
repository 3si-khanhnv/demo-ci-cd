import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { MessageOptionsComponent } from "./message-options.component";
import { MessageOptionsModule } from "./message-options.module";

const meta: Meta<MessageOptionsComponent> = {
  title: "Components / Atoms/MessageOptions",
  argTypes: {},
  component: MessageOptionsComponent,
  decorators: [
    moduleMetadata({
      imports: [MessageOptionsModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<MessageOptionsComponent>;

export const TitleWarning: Story = {
  args: {
    options: {
      message: "Orders XXXXXXXXXXXXXXXXXXXX, YYYYYYYYYYYYYYYYYYYYY, ZZZZZZZZZZZZZ for this date already created",
      status: "warning",
    },
  },
};

export const TitleError: Story = {
  args: {
    options: {
      message: "Order XXXXX for this date already created. Only a single order per day is permitted. Please select another date",
      status: "danger",
    },
  },
};
