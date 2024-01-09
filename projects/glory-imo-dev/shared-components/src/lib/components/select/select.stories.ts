import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { SelectComponent } from "./select.component";
import { SelectModule } from "./select.module";
import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";

const items = [
  { label: "Once", value: "once" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
] as LabelledValue<string>[];

const itemsCustomLabel = [
  {
    label: "Alec Rowland",
    value: 1,
    customLabel: {
      name: "Alec Rowland",
      email: "alec012345@example.com",
      fullContentToSearch: "Alec Rowland : alec012345@example.com",
    },
  },
  {
    label: "Cecil Michael",
    value: 2,
    customLabel: {
      name: "Cecil Michael",
      email: "0123ceci@example.com",
      fullContentToSearch: "Cecil Michael : 0123ceci",
    },
  },
  {
    label: "Marty Atwood",
    value: 3,
    customLabel: {
      name: "Marty Atwood",
      email: "atw010101@example.com",
      fullContentToSearch: "Marty Atwood : atw010101@example.com",
    },
  },
] as LabelledValue<number, { name: string; email: string }>[];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SelectComponent> = {
  title: "Components / Atoms/Select",
  argTypes: {
    selected: { action: "onSelectionChange" },
    onBlur: { action: "onBlur" },
  },
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [SelectModule, FlexLayoutModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<SelectComponent>;

export const Normal: Story = {
  args: {
    label: "repeat",
    items,
    placeholder: "Select a item",
  },
  name: "Without Select",
};

export const WithSelected: Story = {
  args: {
    label: "repeat",
    items,
    selectedItem: "once",
  },
};

export const WithSelectedError: Story = {
  args: {
    label: "repeat",
    items,
    hasError: true,
    selectedItem: "once",
  },
};

export const WithSelectedAllowEmpty: Story = {
  args: {
    label: "repeat",
    items,
    selectedItem: "once",
    hasError: false,
    allowEmpty: true,
  },
};

export const SelectWithSearchDefault: Story = {
  args: {
    label: "repeat",
    items,
    selectedItem: "once",
    hasError: true,
    isIconTimeSelect: true,
    autoComplete: true,
  },
};

export const DisableSelect: Story = {
  args: {
    label: "repeat",
    items,
    selectedItem: "once",
    disabled: true,
  },
};

export const SelectWithSearchHaveSelectedValueAndDisableSelectField: Story = {
  args: {
    label: "repeat",
    items,
    selectedItem: "once",
    hasError: false,
    disabled: true,
    isIconTimeSelect: true,
  },
};

export const ReadonlySelect: Story = {
  args: {
    label: "repeat",
    items,
    selectedItem: "once",
    isReadonly: true,
  },
};

export const ReadonlyAutoCompleteSelect: Story = {
  args: {
    label: "repeat",
    items,
    selectedItem: "once",
    isReadonly: true,
    isIconTimeSelect: true,
  },
};

export const CustomSelectOption: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <imo-select
        [label]="label"
        [items]="items"
        [placeholder]="placeholder"
        [optionDisplayTemplate]="customSelectionOption"
        (selected)="selected($event)"
      ></imo-select>

      <ng-template #customSelectionOption let-label="label">
        <strong>{{label.name}}</strong> : {{label.email}}
      </ng-template>
    `,
  }),
  args: {
    label: "repeat",
    items: itemsCustomLabel as any,
    placeholder: "Select a item",
  },
};

export const CustomSelectOptionWithSearch: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <imo-select
        [hasError]="hasError"
        [label]="label"
        [items]="items"
        [selectedItem]="selectedItem"
        [autoComplete]="true"
        [optionDisplayTemplate]="customSelectionOption"
        (selected)="selected($event)"
      ></imo-select>

      <ng-template #customSelectionOption let-label="label">
      <strong>{{label.name}}</strong> : {{label.email}}
    </ng-template>
    `,
  }),
  args: {
    label: "repeat",
    items: itemsCustomLabel as any,
    selectedItem: "",
    hasError: true,
  },
};
