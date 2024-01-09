import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { DisplayTransactionDateTimeComponent } from "./display-transaction-date-time.component";
import { DisplayTransactionDateTimeModule } from "./display-transaction-date-time.module";
import { StoryBookI18nModule } from "../../../stories/storybook.module";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<DisplayTransactionDateTimeComponent> = {
  title: "Components/ Atoms/Display Transaction Date Time",
  argTypes: {
    // Output
    clicked: { action: "clicked" },
  },
  component: DisplayTransactionDateTimeComponent,
  decorators: [
    moduleMetadata({
      imports: [DisplayTransactionDateTimeModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<DisplayTransactionDateTimeComponent>;

export const NoComment: Story = {
  args: {
    // Input
    type: 1,
    transaction: {
      transactionDateTime: new Date().toDateString(),
      timezone: "UTC",
    },
    confClientFormats: {
      reportDatetimeFormat: "YYYY/MM/DD hh:mm:ss",
      datetimeFormatSeconds: "YYYY/MM/DD hh:mm:ss A",
    },
  },

  render: (args: DisplayTransactionDateTimeComponent) => ({
    props: {
      ...args,
      type: 1,
      transaction: {
        transactionDateTime: new Date().toDateString(),
        timezone: "UTC",
      },
      confClientFormats: {
        reportDatetimeFormat: "YYYY/MM/DD hh:mm:ss",
        datetimeFormatSeconds: "YYYY/MM/DD hh:mm:ss A",
      },
    },
    template: `
    <div style="width:120px">
      <imo-display-transaction-date-time
      [confClientFormats]="confClientFormats"
      [type]="type"
      [transaction]="transaction"
      (clicked)="clicked($event)"
      >
      </imo-display-transaction-date-time>
    </div> `,
  }),
};

export const PlusComment: Story = {
  render: (args: DisplayTransactionDateTimeComponent) => ({
    props: {
      ...args,
      type: 2,
      transaction: {
        transactionDateTime: new Date().toDateString(),
        timezone: "UTC",
      },
      confClientFormats: {
        reportDatetimeFormat: "YYYY/MM/DD hh:mm:ss",
        datetimeFormatSeconds: "YYYY/MM/DD hh:mm:ss A",
      },
    },
    template: `
    <div style="width:120px">
      <imo-display-transaction-date-time
      [confClientFormats]="confClientFormats"
      [type]="type"
      [transaction]="transaction"
      (clicked)="clicked($event)"
      >
      </imo-display-transaction-date-time>
    </div> `,
  }),
};

export const Comment: Story = {
  render: (args: DisplayTransactionDateTimeComponent) => ({
    props: {
      ...args,
      // Input
      type: 3,
      transaction: {
        transactionDateTime: new Date().toDateString(),
        timezone: "UTC",
      },
      confClientFormats: {
        reportDatetimeFormat: "YYYY/MM/DD hh:mm:ss",
        datetimeFormatSeconds: "YYYY/MM/DD hh:mm:ss A",
      },
    },
    template: `
    <div style="width:120px">
      <imo-display-transaction-date-time
      [confClientFormats]="confClientFormats"
      [type]="type"
      [transaction]="transaction"
      (clicked)="clicked($event)"
      >
      </imo-display-transaction-date-time>
    </div> `,
  }),
};
