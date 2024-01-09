import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: "Components/ Atoms/Button",
  argTypes: {
    clicked: { action: "clicked" },
    mouseEnterEvent: { action: "mouseEnterEvent" },
    mouseEnterLeave: { action: "mouseEnterLeave" },
  },
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const ButtonColor: Story = {
  render: (args: ButtonComponent) => ({
    props: {
      ...args,
    },
    template: `
            <div>
              <div>Default use</div>
              <imo-button fxFlex="100%" [ngClass]="class" (click)="clicked($event)">BUTTON</imo-button>
              <imo-button fxFlex="100%" class="primary" (clicked)="clicked($event)">BUTTON</imo-button>
              <imo-button fxFlex="100%" class="secondary" (clicked)="clicked($event)">BUTTON</imo-button>
              <imo-button fxFlex="100%" class="basic" (clicked)="clicked($event)">BUTTON</imo-button>
            </div>
        `,
  }),
  args: {},
};

export const MouseEvent: Story = {
  render: (args: ButtonComponent) => ({
    props: {
      ...args,
    },
    template: `
            <div>
              <div>Default use</div>
              <imo-button fxFlex="100%" class="primary" (click)="clicked($event)" (mouseEnterEvent)="mouseEnterEvent()" (mouseEnterLeave)="mouseEnterLeave()">BUTTON</imo-button>
            </div>
        `,
  }),
  args: {},
};

export const DisabledButton: Story = {
  render: (args: ButtonComponent) => ({
    props: {
      ...args,
    },
    template: `
            <div>
              <div>Disabled use</div>
              <imo-button fxFlex="100%" [ngClass]="{class: true,  disabled: true}" (click)="clicked($event)" [isDisabled]="true">BUTTON</imo-button>
              <imo-button fxFlex="100%" class="primary disabled" (clicked)="clicked($event)" [isDisabled]="true">BUTTON</imo-button>
              <imo-button fxFlex="100%" class="secondary disabled" (clicked)="clicked($event)" [isDisabled]="true">BUTTON</imo-button>
              <imo-button fxFlex="100%" class="basic disabled" (clicked)="clicked($event)" [isDisabled]="true">BUTTON</imo-button>
            </div>
        `,
  }),
  args: {},
};

export const RequiredButton: Story = {
  render: (args: ButtonComponent) => ({
    props: {
      ...args,
    },
    template: `
    <imo-button class='primary' [required]>required</imo-button>
        `,
  }),
  args: {},
};
