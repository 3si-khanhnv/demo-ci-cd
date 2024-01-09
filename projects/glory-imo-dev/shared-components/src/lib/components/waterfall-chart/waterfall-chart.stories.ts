import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { WaterFallChartComponent } from "./waterfall-chart.component";
import { WaterFallChartModule } from "./waterfall-chart.module";

const dataSalesByDay = [
  {
    title: "Munich Hotel - Sales Per Device (Current)",
    id: "top-face-value-1",
    label: "Deposit Total",
    total: ["0", "94562.79999999994"],
    color: ["#F98902"],
    chartType: "barVertical",
    alert: "No data available for Wednesday",
    details: [],
  },
  {
    title: "Munich Hotel - Sales Per Device (Current)",
    id: "top-face-value-1",
    label: "Dispense Total",
    total: ["94562.79999999994", "1400"],
    color: ["#00A687"],
    chartType: "barVertical",
    alert: "No data available for Wednesday",
    details: [],
  },
  {
    title: "Munich Hotel - Sales Per Device (Current)",
    id: "top-face-value-1",
    label: "Manual",
    total: ["1400", "1400"],
    color: ["#EC3F2E"],
    chartType: "barVertical",
    alert: "No data available for Wednesday",
    details: [],
  },
  {
    title: "Munich Hotel - Sales Per Device (Current)",
    id: "top-face-value-1",
    label: "Non Cash",
    total: ["1400", "10000"],
    color: ["#018BC8"],
    chartType: "barVertical",
    alert: "No data available for Wednesday",
    details: [],
  },
  {
    title: "Munich Hotel - Sales Per Device (Current)",
    id: "top-face-value-1",
    label: "Non Cash",
    total: ["10000", "20000"],
    color: ["#018BC8"],
    chartType: "barVertical",
    alert: "No data available for Wednesday",
    details: [],
  },
];

const meta: Meta<WaterFallChartComponent> = {
  title: "Components / Atoms/WaterFall Chart",
  component: WaterFallChartComponent,
  decorators: [
    moduleMetadata({
      imports: [WaterFallChartModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<WaterFallChartComponent>;

export const UseCase: Story = {
  render: (args) => ({
    template: `<div style="width: 720px;background:#b4b9c7">
    <imo-waterfall-chart [data]="data" [title]="title" ></imo-waterfall-chart>
              </div>`,
    props: args,
  }),
  args: {
    data: dataSalesByDay,
    title: "Munich Hotel - Sales Per Device (Current)",
  },
};
