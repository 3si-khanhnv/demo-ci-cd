import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { DropdownMenuComponent } from "./dropdown-menu.component";
import { DropdownMenuModule } from "./dropdown-menu.module";

const template = `
<imo-dropdown-menu>
  <imo-dropdown-menu-item [label]="first"></imo-dropdown-menu-item>
  <imo-dropdown-menu-item [label]="second"></imo-dropdown-menu-item>
  <imo-dropdown-menu-item [label]="third"></imo-dropdown-menu-item>
</imo-dropdown-menu>
`;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<DropdownMenuComponent> = {
  title: "Components/ Atoms/DropDownMenu",
  argTypes: {
    // Output
    // xxxx: { action: "xxxx" },
  },
  component: DropdownMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [DropdownMenuModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<DropdownMenuComponent>;

export const Default: Story = {
  render: (args: DropdownMenuComponent) => ({
    props: {
      ...args,
      // Input
      first: "first",
      second: "second",
      third: "third",
    },
    template,
  }),
};
