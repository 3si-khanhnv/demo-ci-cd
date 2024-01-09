import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";

import { AfterViewInit, Component, OnInit } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { IToggleOption } from "../button-toggle/button-toggle.component.i";
import { ILabelColor } from "./by-day-location-sales.i";
import { LocationSalesByDayModule } from "./by-day-location-sales.module";

const dataSalesByDay = [
  {
    label: "Sunday",
    bgColor: "#F98902",
    current: "32,085",
    value: 32085,
  },
  {
    label: "Monday",
    bgColor: "#00A687",
    current: "50,039",
    value: 50039,
  },
  {
    label: "Tuesday",
    bgColor: "#EC3F2E",
    current: "9,220",
    value: 9220,
  },
  {
    label: "Wednesday",
    bgColor: "#018BC8",
    current: "41,336",
    value: 41336,
  },
  {
    label: "Thursday",
    bgColor: "#A74AB5",
    current: "40,590",
    value: 40590,
  },
  {
    label: "Friday",
    bgColor: "#347F8C",
    current: "49,360",
    value: 49360,
  },
  {
    label: "Saturday",
    bgColor: "#5F9400",
    current: "10,470",
    value: 10470,
  },
];

const dataBreakdownPerDevice = [
  {
    label: "50.00",
    bgColor: "#004D6E",
    current: "5,000.00",
    value: 150000000000.0,
  },
  {
    label: "10.00",
    bgColor: "#004D6E",
    current: "5,000.00",
    value: 150000000000.0,
  },
  {
    label: "30.00",
    bgColor: "#004D6E",
    current: "5,000.00",
    value: 150000000000.0,
  },
  {
    label: "50.00",
    bgColor: "#004D6E",
    current: "5,000.00",
    value: 150000000000.0,
  },
  {
    label: "50.00",
    bgColor: "#004D6E",
    current: "5,000.00",
    value: 150000000000.0,
  },
  // {
  //   label: "50.00",
  //   bgColor: "#004D6E",
  //   current: "5,000.00",
  //   value: 150000000000.0,
  // },
  // {
  //   label: "50.00",
  //   bgColor: "#004D6E",
  //   current: "5,000.00",
  //   value: 150000000000.0,
  // },
  // {
  //   label: "50.00",
  //   bgColor: "#004D6E",
  //   current: "5,000.00",
  //   value: 150000000000.0,
  // },
];

const listOption: IToggleOption[] = [
  {
    value: "note",
    label: "Note",
  },
  {
    value: "coin",
    label: "Coin",
  },
  {
    value: "all",
    label: "All",
  },
];

@Component({
  selector: "imo-storybook-mock-parent",
  template: `<div>
    <imo-by-day-location-sales
      [isShowFullText]="true"
      [isAutoResponsive]="isAutoResponsive"
      [isShowValueZero]="isShowValueZero"
      [isShowAllDataLabel]="isShowAllDataLabel"
      [height]="456"
      [width]="720"
      [data]="data"
      [title]="title"
      [toggleOptions]="toggleOptions"
      [defaultOption]="defaultOption"
      (selectedOption)="selectedOption($event)"
    ></imo-by-day-location-sales>
  </div> `,
  standalone: true,
  imports: [LocationSalesByDayModule],
})
export class ParentComponent implements OnInit {
  ngOnInit(): void {
    this.data = [...dataBreakdownPerDevice];
  }
  title = "Billbao Hotel - Verified Deposit Breakdown Per Device - CI-10#2 (Current)";
  toggleOptions = listOption;
  defaultOption = listOption[0].value;
  data;
  isAutoResponsive = true;
  isShowValueZero = true;
  isShowAllDataLabel = true;
  selectedOption(option: string) {
    if (option == listOption[0].value) {
      this.data = [...dataBreakdownPerDevice].filter((_el, index) => index > 1 && index < 3);
    } else if (option == listOption[1].value) {
      this.data = [...dataBreakdownPerDevice].filter((_, index) => index > 3);
    } else {
      this.data = [...dataBreakdownPerDevice];
    }
  }
}

@Component({
  selector: "imo-storybook-mock-random-data",
  template: `<div style="background:#f3e2e2">
    <imo-by-day-location-sales
      [isShowFullText]="true"
      [isAutoResponsive]="isAutoResponsive"
      [isShowValueZero]="isShowValueZero"
      [isShowAllDataLabel]="isShowAllDataLabel"
      [height]="456"
      [width]="720"
      [data]="data"
      [title]="title"
      [toggleOptions]="toggleOptions"
      [defaultOption]="defaultOption"
      (selectedOption)="selectedOption($event)"
    ></imo-by-day-location-sales>
    <div>
      <button (click)="random()">Random Data</button>
      <div></div>
    </div>
  </div> `,
  standalone: true,
  imports: [LocationSalesByDayModule],
})
export class ParentRanDomComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.random();
  }

  ngOnInit(): void {
    // this.random;
  }

  title = "Billbao Hotel - Verified Deposit Breakdown Per Device - CI-10#2 (Current)";
  toggleOptions = listOption;
  defaultOption = listOption[0].value;
  data;
  isAutoResponsive = true;
  isShowValueZero = true;
  isShowAllDataLabel = true;

  totalValueChart = "";
  labelsData = [
    {
      value: 0,
      label: "Coventory",
      current: "0.00",
      bgColor: "#003797",
    },
    {
      value: 27213,
      label: "Milton Keynes",
      current: "27,213",
      bgColor: "#008197",
    },
    {
      value: 25009,
      label: "Cambridge",
      current: "25,009",
      bgColor: "#00ADCC",
    },
    {
      value: 21746,
      label: "Herpenden",
      current: "21,746",
      bgColor: "#30BEA8",
    },
    {
      value: 16355,
      label: "Bedford",
      current: "16,355",
      bgColor: "#8CC63E",
    },
    {
      value: 15990,
      label: "Reading",
      current: "15,990",
      bgColor: "#E3C620",
    },
    {
      value: 14888,
      label: "Reading",
      current: "14,888",
      bgColor: "#FE9801",
    },
    {
      value: 14030,
      label: "Basingstoke",
      current: "14,030",
      bgColor: "#F05235",
    },
    {
      value: 13664,
      label: "Oxford",
      current: "13,664",
      bgColor: "#E02C33",
    },
    {
      value: 12722,
      label: "Dunstable",
      current: "12,722",
      bgColor: "#5C6061",
    },
    {
      value: 12722,
      label: "Dunstable",
      current: "12,722",
      bgColor: "#5C6061",
    },
    {
      value: 12722,
      label: "Dunstable",
      current: "12,722",
      bgColor: "#5C6061",
    },
    {
      value: 12722,
      label: "Dunstable",
      current: "12,722",
      bgColor: "#5C6061",
    },
    {
      value: 12722,
      label: "Dunstable",
      current: "12,722",
      bgColor: "#5C6061",
    },
    {
      value: 12722,
      label: "Dunstable",
      current: "12,722",
      bgColor: "#5C6061",
    },
  ] as ILabelColor[];

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  random() {
    let total = 0;
    const data = [...Array(this.randomIntFromInterval(1, 15))].map((_, index) => {
      const randomValue = Math.floor(Math.random() * this.randomIntFromInterval(15000000, 150000000000)) + 1;
      total += randomValue;
      return {
        value: randomValue,
        label: this.labelsData[index].label,
        current: randomValue.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ".00",
        bgColor: this.labelsData[index].bgColor,
      };
    });
    this.data = data;
    this.totalValueChart = total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ".00";
  }

  selectedOption(option: string) {
    if (option == listOption[0].value) {
      this.data = [...dataBreakdownPerDevice].filter((_, index) => index <= 4);
    } else if (option == listOption[1].value) {
      this.data = [...dataBreakdownPerDevice].filter((_, index) => index > 4);
    } else {
      this.data = [...dataBreakdownPerDevice];
    }
  }
}

const meta: Meta = {
  title: "Components / Atoms/Location Sales Totals",
  argTypes: {
    changed: { action: "onChanged" },
    valid: { action: "onValid" },
  },
  decorators: [
    moduleMetadata({
      imports: [LocationSalesByDayModule, BrowserAnimationsModule, StoryBookI18nModule, ParentRanDomComponent, ParentComponent],
    }),
  ],
};

export default meta;

type Story = StoryObj;

export const ChartVertical: Story = {
  render: (args) => ({
    template: `
    <div style="width: 650px;">
      <imo-by-day-location-sales [barThickness]="50" [height]="460" [data]="data" [title]="title" ></imo-by-day-location-sales>
    </div>
    `,
    props: args,
  }),
  args: {
    data: dataSalesByDay,
    title: "Sales By Day",
  },
};

export const ChartWithToggleButton: Story = {
  name: "Chart vertical responsive with toggle buttons",
  render: (args) => ({
    template: `
    <imo-storybook-mock-parent></imo-storybook-mock-parent>
    `,
    props: args,
  }),
  args: {},
};

export const ChartRandomData: Story = {
  name: "Chart vertical responsive with random data",
  render: (args) => ({
    template: `
    <imo-storybook-mock-random-data></imo-storybook-mock-random-data>
    `,
    props: args,
  }),
  args: {},
};
