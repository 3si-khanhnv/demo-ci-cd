import { AfterViewInit, Component } from "@angular/core";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { HorizontalGroupChartComponent } from "./horizontal-group-chart.component";
import { HorizontalGroupChartModule } from "./horizontal-group-chart.module";

const data = [
  {
    id: "top-date-right-1",
    title: "Munich Hotel - Sales Summary By Category Per Location (Current)",
    label: "Munich Hotel Hotel Hotel Hotel",
    total: ["33000", "0", "0"],
    color: ["#605DF1", "#26C6DA", "#FFB300"],
    groupType: ["Verified Total", "Manual Total", "Non Cash Total"],
    chartType: "barHorizontalGroupClickSingle",
    alert: "No data available for Wednesday",
    details: [],
    bgColor: "#9E5593",
    value: 50000,
    current: "50,000.00",
  },
  {
    id: "top-date-right-2",
    title: "Malaga Hotel - Sales Summary By Category Per Location (Current) 2",
    label: "Malaga Hotel",
    total: ["3000", "300", "180"],
    color: ["#605DD2", "#26C6D2", "#FFB399"],
    groupType: ["Verified Total", "Manual Total", "Non Cash Total"],
    chartType: "barHorizontalGroupClickSingle",
    alert: "No data available for Wednesday",
    details: [],
  },
  {
    id: "top-date-right-2",
    title: "Malaga Hotel - Sales Summary By Category Per Location (Current) 2",
    label: "Malaga Hotel",
    total: ["3000", "300", "180"],
    color: ["#605DD2", "#26C6D2", "#FFB399"],
    groupType: ["Verified Total", "Manual Total", "Non Cash Total"],
    chartType: "barHorizontalGroupClickSingle",
    alert: "No data available for Wednesday",
    details: [],
  },
  {
    id: "top-date-right-2",
    title: "Malaga Hotel - Sales Summary By Category Per Location (Current) 2",
    label: "Malaga Hotel",
    total: ["3000", "300", "180"],
    color: ["#605DD2", "#26C6D2", "#FFB399"],
    groupType: ["Verified Total", "Manual Total", "Non Cash Total"],
    chartType: "barHorizontalGroupClickSingle",
    alert: "No data available for Wednesday",
    details: [],
  },
  {
    id: "top-date-right-2",
    title: "Malaga Hotel - Sales Summary By Category Per Location (Current) 2",
    label: "Malaga Hotel",
    total: ["3000", "300", "-1800"],
    color: ["#605DD2", "#26C6D2", "#FFB399"],
    groupType: ["Verified Total", "Manual Total", "Non Cash Total"],
    chartType: "barHorizontalGroupClickSingle",
    alert: "No data available for Wednesday",
    details: [],
  },
  {
    id: "top-date-right-2",
    title: "Malaga Hotel - Sales Summary By Category Per Location (Current) 2",
    label: "Malaga Hotel",
    total: ["3000", "300", "180"],
    color: ["#605DD2", "#26C6D2", "#FFB399"],
    groupType: ["Verified Total", "Manual Total", "Non Cash Total"],
    chartType: "barHorizontalGroupClickSingle",
    alert: "No data available for Wednesday",
    details: [],
  },
  {
    id: "top-date-right-2",
    title: "Malaga Hotel - Sales Summary By Category Per Location (Current) 2",
    label: "Malaga Hotel",
    total: ["3000", "300", "180"],
    color: ["#605DD2", "#26C6D2", "#FFB399"],
    groupType: ["Verified Total", "Manual Total", "Non Cash Total"],
    chartType: "barHorizontalGroupClickSingle",
    alert: "No data available for Wednesday",
    details: [],
  },
];

@Component({
  selector: "imo-mock-storybook",
  template: `
    <div style="display: grid;">
      <div>
        <imo-horizontal-group-chart [data]="data" [title]="title" [chartType]="chartType"></imo-horizontal-group-chart>
      </div>
      <div>
        <button (click)="random()">Random Data</button>
        <div></div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [HorizontalGroupChartModule],
})
export class MockStorybookComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.random();
  }
  ngOnInit(): void {
    this.random;
  }

  title = "Munich Hotel - Sales Summary By Category Per Location (Current)";
  chartType = "barHorizontalGroupClickSingle";

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
  ] as any[];

  data = [] as any[];

  totalValueChart = "";

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  random() {
    let total = 0;
    const data = [...Array(this.randomIntFromInterval(1, 10))].map((_, index) => {
      const randomValue = Math.floor(Math.random() * this.randomIntFromInterval(1, 5000000000000)) + 1;
      total += randomValue;
      return {
        id: "top-date-right-1",
        title: "Munich Hotel - Sales Summary By Category Per Location (Current)",
        color: ["#605DF1", "#26C6DA", "#FFB300"],
        groupType: ["Verified Total", "Manual Total", "Non Cash Total"],
        chartType: "barHorizontalGroupClickSingle",
        alert: "No data available for Wednesday",
        details: [],

        value: randomValue,
        label: this.labelsData[index].label,
        current: randomValue.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ".00",
        bgColor: this.labelsData[index].bgColor,
        total: [
          (Math.random() * this.randomIntFromInterval(1, 500000)).toString(),
          (Math.random() * this.randomIntFromInterval(1, 500000)).toString(),
          (Math.random() * this.randomIntFromInterval(1, 500000)).toString(),
        ],
      };
    });
    this.data = data;
    this.totalValueChart = total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ".00";
  }
}

const meta: Meta = {
  title: "Components / Atoms/Horizontal Group Chart",
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [HorizontalGroupChartModule, MockStorybookComponent, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

export const Default: StoryObj<HorizontalGroupChartComponent> = {
  render: (args) => ({
    template: `<div>
    <imo-horizontal-group-chart [data]="data" [title]="title" [chartType]="chartType"></imo-horizontal-group-chart>
  </div>`,
    props: args,
  }),
  args: {
    data: data,
    title: "Top location Total Sales By Deposit (Current)",
    chartType: "barHorizontalGroupClickGroup",
  },
};

export const RandomData: StoryObj<MockStorybookComponent> = {
  render: (args) => ({
    template: `
      <imo-mock-storybook></imo-mock-storybook>
    `,
    props: args,
  }),
  args: {},
};
