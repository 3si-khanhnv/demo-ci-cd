import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { LocationInventorySafeRecyclerComponent } from "./location-inventory-safe-recycler.component";
import { IDataChartSafeRecycler, ILabelColor, ILocationSafeRecycler } from "./location-inventory-safe-recycler.i";
import { LocationInventorySafeRecyclerModule } from "./location-inventory-safe-recycler.module";

const titleChart = "Location Inventory (Safe/Recycler)";
const data = {
  dataChart: [
    {
      locationName: "Cambridge",
      recyclerValue: 6000,
      safeValue: 5000,
    },
    {
      locationName: "Milton Keynes",
      recyclerValue: 4900,
      safeValue: 3500,
    },
    {
      locationName: "Reading",
      recyclerValue: 3000,
      safeValue: 7000,
    },
    {
      locationName: "Bedford",
      recyclerValue: 5100,
      safeValue: 7700,
    },
    {
      locationName: "Coventry",
      recyclerValue: 7500,
      safeValue: 8000,
    },
    {
      locationName: "Dunstable",
      recyclerValue: 14000,
      safeValue: 4600,
    },
    {
      locationName: "Oxford",
      recyclerValue: 16000,
      safeValue: 4600,
    },
    {
      locationName: "Basingstoke",
      recyclerValue: 9800,
      safeValue: 12500,
    },
    {
      locationName: "Luton",
      recyclerValue: 17500,
      safeValue: 4900,
    },
    {
      locationName: "Harpenden",
      recyclerValue: 17500,
      safeValue: 12500,
    },
  ] as IDataChartSafeRecycler[],
  labels: [
    {
      label: "Recycler",
      bgColor: "#0088FF",
    },
    { label: "Safe", bgColor: "#FF9100" },
  ] as ILabelColor[],
} as ILocationSafeRecycler;

const meta: Meta<LocationInventorySafeRecyclerComponent> = {
  title: "Components / Atoms/Location Inventory Safe Recycler",
  argTypes: {},
  component: LocationInventorySafeRecyclerComponent,
  decorators: [
    moduleMetadata({
      imports: [LocationInventorySafeRecyclerModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
  parameters: {
    height: "500px",
  },
};

export default meta;

type Story = StoryObj<LocationInventorySafeRecyclerComponent>;

export const Default: Story = {
  args: {
    data: data,
    titleChart: titleChart,
  },
};
