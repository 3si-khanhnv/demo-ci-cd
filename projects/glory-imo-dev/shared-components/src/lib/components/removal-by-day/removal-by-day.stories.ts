import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { RemovalByDayComponent } from "./removal-by-day.component";
import { RemovalByDayModule } from "./removal-by-day.module";

const dataRemovalByDayValueAllZeros = [
  { value: 0, current: "0", bgColor: "#F98902", label: "Sunday" },
  { value: 0, current: "0", bgColor: "#00A687", label: "Monday" },
  { value: 0, current: "0", bgColor: "#EC3F2E", label: "Tuesday" },
  { value: 0, current: "0", bgColor: "#018BC8", label: "Wednesday" },
  { value: 0, current: "0", bgColor: "#A74AB5", label: "Thursday" },
  { value: 0, current: "0", bgColor: "#347F8C", label: "Friday" },
  { value: 0, current: "0", bgColor: "#5F9400", label: "Saturday" },
];
const dataRemovalByDay = [
  { value: 32085, current: "32,085", bgColor: "#F98902", label: "Sunday" },
  { value: 50039, current: "50,039", bgColor: "#00A687", label: "Monday" },
  { value: 9220, current: "9,220", bgColor: "#EC3F2E", label: "Tuesday" },
  { value: 41336, current: "41,336", bgColor: "#018BC8", label: "Wednesday" },
  { value: 40590, current: "40,590", bgColor: "#A74AB5", label: "Thursday" },
  { value: 49360, current: "49,360", bgColor: "#347F8C", label: "Friday" },
  { value: 10470, current: "10,470", bgColor: "#5F9400", label: "Saturday" },
];
const dataRemovalByDayHaveZero = [
  { current: "0", bgColor: "#F98902", label: "Sunday" },
  { value: 50039, current: "50,039", bgColor: "#00A687", label: "Monday" },
  { value: 9220, current: "9,220", bgColor: "#EC3F2E", label: "Tuesday" },
  { value: 41336, current: "41,336", bgColor: "#018BC8", label: "Wednesday" },
  { value: 40590, current: "40,590", bgColor: "#A74AB5", label: "Thursday" },
  { value: 49360, current: "49,360", bgColor: "#347F8C", label: "Friday" },
  { value: 10470, current: "10,470", bgColor: "#5F9400", label: "Saturday" },
];
const dataRemovalByDayValueTooSmall = [
  { value: 1, current: "1", bgColor: "#F98902", label: "Sunday" },
  { value: 50039, current: "50,039", bgColor: "#00A687", label: "Monday" },
  { value: 9220, current: "9,220", bgColor: "#EC3F2E", label: "Tuesday" },
  { value: 41336, current: "41,336", bgColor: "#018BC8", label: "Wednesday" },
  { value: 40590, current: "40,590", bgColor: "#A74AB5", label: "Thursday" },
  { value: 49360, current: "49,360", bgColor: "#347F8C", label: "Friday" },
  { value: 10470, current: "10,470", bgColor: "#5F9400", label: "Saturday" },
];
const labelRemovalByDay = "Removals by Day";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<RemovalByDayComponent> = {
  title: "Components / Atoms/Removals By Day",
  argTypes: {},
  component: RemovalByDayComponent,
  decorators: [
    moduleMetadata({
      imports: [RemovalByDayModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<RemovalByDayComponent>;

export const UseCaseHaveValueAllZeros: Story = {
  render: () => ({
    template: `<imo-removal-by-day
      [dataRemovalByDay]="dataRemovalByDay"
      [labelRemovalByDay]="labelRemovalByDay"
    ></imo-removal-by-day>`,
    props: {
      dataRemovalByDay: dataRemovalByDayValueAllZeros,
      labelRemovalByDay: labelRemovalByDay,
    },
  }),
};

export const UseCase: Story = {
  render: () => ({
    template: `<imo-removal-by-day
      [dataRemovalByDay]="dataRemovalByDay"
      [labelRemovalByDay]="labelRemovalByDay"
    ></imo-removal-by-day>`,
    props: {
      dataRemovalByDay: dataRemovalByDay,
      labelRemovalByDay: labelRemovalByDay,
    },
  }),
};

export const UseCaseHaveValue0: Story = {
  render: () => ({
    template: `<imo-removal-by-day
      [dataRemovalByDay]="dataRemovalByDay"
      [labelRemovalByDay]="labelRemovalByDay"
    ></imo-removal-by-day>`,
    props: {
      dataRemovalByDay: dataRemovalByDayHaveZero,
      labelRemovalByDay: labelRemovalByDay,
    },
  }),
};

export const UseCaseHaveValueTooSmall: Story = {
  render: () => ({
    template: `<imo-removal-by-day
      [dataRemovalByDay]="dataRemovalByDay"
      [labelRemovalByDay]="labelRemovalByDay"
    ></imo-removal-by-day>`,
    props: {
      dataRemovalByDay: dataRemovalByDayValueTooSmall,
      labelRemovalByDay: labelRemovalByDay,
    },
  }),
};
