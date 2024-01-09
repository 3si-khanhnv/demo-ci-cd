import { AfterViewInit, Component } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { LicensesComponent } from "../licenses/licenses.component";
import { HorizontalChartComponent } from "./horizontal-chart.component";
import { ILabelColor } from "./horizontal-chart.i";
import { HorizontalChartModule } from "./horizontal-chart.module";

const gradient = document.createElement("canvas").getContext("2d").createLinearGradient(0, 0, 500, 0);
gradient.addColorStop(0, "#25c0e5");
gradient.addColorStop(0.5, "#33a5e1");
gradient.addColorStop(1, "#4287dd");
const data = [
  {
    label: "Top 1 Location Top 5 Location",
    bgColor: "#004D6E",
    current: "-5",
    value: 2804322117501,
  },
  {
    label: "Top 2 Location",
    bgColor: "#004D6E",
    current: "1.00",
    value: -122507585960,
  },
  {
    label: "Top 4 Location",
    bgColor: "#004D6E",
    current: "-100.00",
    value: 5000000000000,
  },
  {
    label: "Top5Location, Top5Location",
    bgColor: "#004D6E",
    current: "5",
    value: 0,
  },
  {
    label: "Top 4 Location",
    bgColor: "#004D6E",
    current: "-100.00",
    value: -5000000000000,
  },
];

@Component({
  selector: "imo-mock-storybook",
  template: `
    <div style="display: grid;">
      <div>
        <imo-horizontal-chart [isAutoResponsive]="true" [isShowValueZero]="true" [data]="data" [title]="titleChart"></imo-horizontal-chart>
      </div>
      <div>
        <button (click)="random()">Random Data</button>
        <div></div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [HorizontalChartModule],
})
export class MockStorybookComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.random();
  }
  ngOnInit(): void {
    this.random;
  }

  titleChart = "Top Location Removals (Week to Date)";

  labelsData = [
    {
      value: 0,
      label: "Coventory",
      current: "0.00",
      bgColor: "#003797",
      total: ["0.00"],
    },
    {
      value: 27213,
      label: "Milton Keynes",
      current: "27,213",
      bgColor: "#008197",
      total: ["27,213"],
    },
    {
      value: 25009,
      label: "Cambridge",
      current: "25,009",
      bgColor: "#00ADCC",
      total: ["25,009"],
    },
    {
      value: 21746,
      label: "Herpenden",
      current: "21,746",
      bgColor: "#30BEA8",
      total: ["21,746"],
    },
    {
      value: 16355,
      label: "Bedford",
      current: "16,355",
      bgColor: "#8CC63E",
      total: ["16,355"],
    },
    {
      value: 15990,
      label: "Reading",
      current: "15,990",
      bgColor: "#E3C620",
      textColor: "#4D5051",
      textSize: "20px",
      total: ["15,990"],
    },
    {
      value: 14888,
      label: "Reading",
      current: "14,888",
      bgColor: "#FE9801",
      total: ["14,888"],
    },
    {
      value: 14030,
      label: "Basingstoke",
      current: "14,030",
      bgColor: "#F05235",
      total: ["14,030"],
    },
    {
      value: 13664,
      label: "Oxford",
      current: "13,664",
      bgColor: "#E02C33",
      total: ["13,664"],
    },
    {
      value: 12722,
      label: "Dunstable",
      current: "12,722",
      bgColor: "#5C6061",
      total: ["12,722"],
    },
  ] as ILabelColor[];

  data = [] as ILabelColor[];

  totalValueChart = "";

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  random() {
    let total = 0;
    const data = [...Array(10)].map((_, index) => {
      const randomValue = Math.floor(Math.random() * this.randomIntFromInterval(-5000000000000, 5000000000000)) + 1;
      total += randomValue;
      return {
        value: randomValue,
        label: this.labelsData[index].label,
        current: randomValue.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ".00",
        bgColor: this.labelsData[index].bgColor,
        total: [randomValue.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ".00"],
      };
    });
    this.data = data;
    this.totalValueChart = total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ".00";
  }
}

const meta: Meta<LicensesComponent> = {
  title: "Components / Atoms/horizontal-chart",
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [MockStorybookComponent, HorizontalChartModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

export const Default: StoryObj<HorizontalChartComponent> = {
  args: {
    isAutoResponsive: true,
    isShowValueZero: true,
    data: data,
    title: "Location Inventory (Totals)",
  },
  render: (args) => ({
    template: `<div>
        <imo-horizontal-chart [isAutoResponsive]="isAutoResponsive" [isShowValueZero]="isShowValueZero" [data]="data" [title]="title"></imo-horizontal-chart>
      </div>
    `,
    props: args,
  }),
};

export const RandomData: StoryObj<MockStorybookComponent> = {
  args: {},
  render: (args) => ({
    template: `<imo-mock-storybook></imo-mock-storybook>`,
    props: args,
  }),
};
