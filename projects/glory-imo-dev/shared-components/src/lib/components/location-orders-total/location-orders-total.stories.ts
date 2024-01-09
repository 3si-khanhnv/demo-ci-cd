import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { LocationOrdersTotalComponent } from "./location-orders-total.component";
import { LocationOrdersTotalModule } from "./location-orders-total.module";

const data = [
  {
    label: "Herpenden",
    bgColor: "#5D6275",
    current: "67,000.00",
    value: 670000,
  },
  {
    label: "Oxford",
    bgColor: "#EE3B5B",
    current: "51,000.00",
    value: 51000,
  },
  {
    label: "Luton",
    bgColor: "#4AC5BB",
    current: "51,000.00",
    value: 51000,
  },
  {
    label: "Dunstable",
    bgColor: "#805D01",
    current: "51,000.00",
    value: 51000,
  },
  {
    label: "Milton Keynes",
    bgColor: "#09645D",
    current: "51,000.00",
    value: 51000,
  },
  {
    label: "Basingstoke",
    bgColor: "#E9A81A",
    current: "51,000.00",
    value: 51000,
  },
  {
    label: "Reading",
    bgColor: "#54165E",
    current: "51,000.00",
    value: 51000,
  },
  {
    label: "Bedford",
    bgColor: "#749585",
    current: "51,000.00",
    value: 51000,
  },
  {
    label: "Cambridge",
    bgColor: "#A86E55",
    current: "51,000.00",
    value: 51000,
  },
  {
    label: "Coventory",
    bgColor: "#026CA0",
    current: "51,000.00",
    value: 51000,
  },
];
const titleChart = "Location Order (Week to Date)";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<LocationOrdersTotalComponent> = {
  title: "Components/ Atoms/Location Orders Total",
  component: LocationOrdersTotalComponent,
  decorators: [
    moduleMetadata({
      imports: [LocationOrdersTotalModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<LocationOrdersTotalComponent>;

export const Default: Story = {
  args: {
    // Input
    data,
    titleChart,
  },
};
