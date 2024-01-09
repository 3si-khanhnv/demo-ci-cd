import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";

import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { ButtonModule } from "../button/button.module";
import { ModalButton } from "./modal.component";
import { ModalModule } from "./modal.module";

const meta: Meta = {
  title: "Components / Atoms/Modal",
  argTypes: {
    onClick: { action: "click" },
    onAction: { action: "action" },
    click: { action: "click" },
    selectedRecord: { action: "selectedRecord" },
  },
  decorators: [
    moduleMetadata({
      imports: [ModalModule, ButtonModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    template: `
      <imo-button
        class="basic"
        imoModal
        title="Sample"
        [templateRef]="modal"
        [buttons]="buttons"
        (action)="onAction($event)"
      >Open Modal</imo-button>
      <ng-template #modal>
        <div>Here is outside Content</div>
        <imo-button class="basic" (click)="click('clicked')">Click Me</imo-button>
      </ng-template>
    `,
    props: args,
  }),
  args: {
    buttons: [
      { name: "Cancel", value: false },
      { name: "OK", class: "primary", value: true },
    ] as ModalButton[],
  },
};

export const NoContent: Story = {
  render: (args) => ({
    template: `
      <imo-button class="basic" 
        imoModal 
        title="Sample" 
        [buttons]="buttons">Open Modal</imo-button>
    `,
    props: args,
  }),
  args: {
    buttons: [
      { name: "Cancel", value: false },
      { name: "OK", class: "primary", value: true },
    ] as ModalButton[],
  },
};

export const MultiButtons: Story = {
  render: (args) => ({
    template: `
    <imo-button class="basic" imoModal title="Sample" [buttons]="buttons" (action)="onAction($event)">Open Modal</imo-button>
    `,
    props: args,
  }),
  args: {
    buttons: [
      { name: "Me!" },
      { name: "Me!", class: "basic", value: "Thx" },
      { name: "Me?", class: "primary", value: "Wo" },
      { name: "Me!", class: "secondary", value: "Good!" },
    ] as ModalButton[],
  },
};

export const CloseWhenClickOutsideDialog: Story = {
  render: (args) => ({
    template: `
    <imo-button class="basic" imoModal title="Sample" [buttons]="buttons" [disableClose]="false" (action)="onAction($event)">Open Modal</imo-button>
    `,
    props: args,
  }),
  args: {
    buttons: [{ name: "Me!" }] as ModalButton[],
  },
};

export const EnableDragDrop: Story = {
  render: (args) => ({
    template: `
      <imo-button 
        class="basic" 
        title="Sample" 
        imoModal 
        [buttons]="buttons" 
        [templateRef]="modal"
        [isDisabledDragDrop]="false" 
        (action)="onAction($event)"
      >
        Open Modal
      </imo-button>

      <ng-template #modal>
      <imo-table
        [data]="data"
        [displayedFields]="displayedFields"
        (selectedRecord)="selectedRecord($event)"
      ></imo-table>
      </ng-template>
    `,
    props: args,
  }),
  args: {
    buttons: [{ name: "Me!" }] as ModalButton[],
    displayedFields: [
      {
        column: "select",
        name: "",
        style: {
          width: "80px",
        },
      },
      { column: "company", name: "Organisation" },
      { column: "location", name: "Location" },
    ],
    data: [
      { company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1 },
      { company: "ABC Inc", location: "Crawley", companyId: 1, locationId: 2 },
      { company: "Adopt Ltd", location: "Nakita", companyId: 2, locationId: 3 },
      { company: "Adopt Ltd", location: "Hawai", companyId: 2, locationId: 4 },
      { company: "XYZ Udt", location: "Hue", companyId: 3, locationId: 5 },
      { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 6 },
      { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 7 },
      { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 8 },
      { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 9 },
      { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 10 },
    ],
  },
};
