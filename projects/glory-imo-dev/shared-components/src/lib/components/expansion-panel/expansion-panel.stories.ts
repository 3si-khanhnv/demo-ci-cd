import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { ExpansionTableRow } from "../expansion-table/expansion-table.component.i";
import { ExpansionPanelComponent } from "./expansion-panel.component";
import { ExpansionPanelModule } from "./expansion-panel.module";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ExpansionPanelComponent> = {
  title: "Components/ Atoms/Expansion Panel",
  argTypes: {
    // Output
    onCheck: { action: "onCheck" },
  },
  component: ExpansionPanelComponent,
  decorators: [
    moduleMetadata({
      imports: [ExpansionPanelModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ExpansionPanelComponent>;

export const Default: Story = {
  args: {
    // Input
    checkbox: true,
    radio: true,
    columns: [{ column: "name", name: "Name" }],
    data: { id: 1, calendarName: "holiday", checked: false } as ExpansionTableRow,
    showChild: true,
    labels: {
      checkbox: { aria: "checkbox" },
      headerButton: { aria: "header button" },
    },
  },
};
