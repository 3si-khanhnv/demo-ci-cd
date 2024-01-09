import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { BadgeComponent } from "./badge.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<BadgeComponent> = {
  title: "Components/ Atoms/Badge",
  argTypes: {
    clicked: { action: "clicked" },
  },
  component: BadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const ButtonColor: Story = {
  render: (args: BadgeComponent) => ({
    props: {
      ...args,
    },
    template: `
          <imo-badge [ngClass]="'status-created short'">Created</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-expired short'">Expired</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-noorder short'">No Order</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-requested short'">Requested</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-paused short'">Paused</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-future short'">Future</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-approved short'">Approved</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-sent short'">Sent</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-rejected short'">Rejected</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-cancelled short'">Cancelled</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-stopped short'">Stopped</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-overdue short'">Overdue</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-completed short'">Completed</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-incomplete short'">Incomplete</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-sendfailure short'">Send Failure</imo-badge><br /><br />
          <imo-badge [ngClass]="'status-completedvariance short'">Completed</imo-badge><br /><br />
        `,
  }),
  args: {},
};
