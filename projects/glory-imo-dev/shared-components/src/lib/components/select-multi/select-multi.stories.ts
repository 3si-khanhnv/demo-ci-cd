import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { SelectMultiComponent } from "./select-multi.component";
import { SelectMultiModule } from "./select-multi.module";
import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";

const items = [
  { value: "service", label: "Service" },
  { value: "emergency", label: "Emergency" },
  { value: "holiday", label: "Holiday" },
] as LabelledValue<string>[];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SelectMultiComponent> = {
  title: "Components / Atoms/SelectMulti",
  argTypes: {
    selected: { action: "selected" },
  },
  component: SelectMultiComponent,
  decorators: [
    moduleMetadata({
      imports: [SelectMultiModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<SelectMultiComponent>;

export const MultiSelect: Story = {
  args: {
    items,
    label: "Service",
    selectedItem: [],
    isStoryBook: true, // This attribute should not be added when not in the storybook, default false
  },
};

export const MultiSelectWithAll: Story = {
  args: {
    items,
    label: "Select Type",
    selectedItem: [],
    all: true, // true or false to return yes/no select all
    allValue: "all", // cannot be the same as the value of items
    isStoryBook: true, // This attribute should not be added when not in the storybook, default false
  },
};

export const MultiSelectWithError: Story = {
  args: {
    items,
    label: "Select Type",
    selectedItem: [],
    all: true, // true or false to return yes/no select all
    allValue: "all", // cannot be the same as the value of items
    isStoryBook: true, // This attribute should not be added when not in the storybook, default false
    hasError: true,
  },
};

export const MultiSelectWithAllSearchAble: Story = {
  args: {
    items,
    label: "Search or Select Organisation",
    selectedItem: [],
    all: true, // true or false to return yes/no select all
    allValue: "all", // cannot be the same as the value of items
    isStoryBook: true, // This attribute should not be added when not in the storybook, default false
    isSearchAble: true,
  },
};

export const MultiSelectSearchAbleDisableField: Story = {
  args: {
    items,
    label: "Search or Select Organisation",
    selectedItem: [],
    all: true, // true or false to return yes/no select all
    allValue: "all", // cannot be the same as the value of items
    isStoryBook: true, // This attribute should not be added when not in the storybook, default false
    isSearchAble: true,
    disabled: true,
  },
};
