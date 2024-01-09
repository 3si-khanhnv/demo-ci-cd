import type { AfterViewInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { ILabelColor } from "./top-location-removal.i";
import { TopLocationRemovalModule } from "./top-location-removal.module";

@Component({
  selector: "cie-parent",
  standalone: true,
  template: `<div>
    <imo-top-location-removal [isDisableZero]="isDisableZero" [data]="data" [titleChart]="titleChart"></imo-top-location-removal>
  </div> `,
  imports: [TopLocationRemovalModule],
})
export class ParentComponent {
  isDisableZero = true;
  titleChart = "Top Location Removals (Week to Date)";
  data = [
    {
      value: 0,
      label: "Coventory",
      current: "0.00",
      bgColor: "#003797",
      total: ["0.00"],
      isDisabled: true,
    },
    {
      value: 1000,
      label: "Milton Keynes",
      current: "1,000",
      bgColor: "#008197",
      total: ["1,000"],
    },
    {
      value: 2000,
      label: "Cambridge",
      current: "2,000",
      bgColor: "#00ADCC",
      total: ["2000"],
    },
    {
      value: 2500,
      label: "Herpenden",
      current: "2,500",
      bgColor: "#30BEA8",
      total: ["2,500"],
    },
    {
      value: 163555,
      label: "Bedford",
      current: "16,355",
      bgColor: "#8CC63E",
      total: ["16,355"],
    },
    {
      value: 1599,
      label: "Reading",
      current: "15,990",
      bgColor: "#E3C620",
      textColor: "#4D5051",
      textSize: "20px",
      total: ["15,990"],
    },
    {
      value: 1488,
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
      value: 136644,
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
    {
      value: 19722,
      label: "Dunstable",
      current: "12,722",
      bgColor: "#5C6061",
      total: ["12,722"],
    },
    {
      value: 20722,
      label: "Dunstable",
      current: "12,722",
      bgColor: "#5C6061",
      total: ["12,722"],
    },
  ] as ILabelColor[];
}

@Component({
  selector: "fit-text-parent",
  template: `
    <div style="display: flex;">
      <div>
        <imo-top-location-removal [data]="data" [titleChart]="titleChart" [totalValueChart]="totalValueChart"></imo-top-location-removal>
      </div>
      <div>
        <label>Max Value</label>
        <br />
        <input type="number" [(ngModel)]="randomSize" /> <button (click)="random()">Random Data</button>
        <div></div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [TopLocationRemovalModule, FormsModule],
})
export class ParentFitTextComponent implements AfterViewInit {
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

  randomSize = 9999999;
  random() {
    let total = 0;
    const data = [...Array(10)].map((_, index) => {
      const randomValue = Math.floor(Math.random() * this.randomSize) + 1;
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

const data1Value = [
  {
    value: 0,
    label: "Coventory",
    current: "0.00",
    bgColor: "#003797",
    total: ["0.00"],
    isDisabled: true,
  },
  {
    value: 1000,
    label: "Milton Keynes",
    current: "1,000",
    bgColor: "#008197",
    total: ["1,000"],
  },
  {
    value: 0,
    label: "Cambridge",
    current: "2,000",
    bgColor: "#00ADCC",
    total: ["2000"],
  },
] as ILabelColor[];

const meta: Meta = {
  title: "Components / Atoms/TopLocationRemoval",
  decorators: [
    moduleMetadata({
      imports: [ParentComponent, ParentFitTextComponent, StoryBookI18nModule, TopLocationRemovalModule],
    }),
  ],
};

export default meta;

export const Case1: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
      <cie-parent></cie-parent>
    `,
  }),
  name: "use case",
};

export const Case2: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
      <fit-text-parent></fit-text-parent>
    `,
  }),
  name: "auto fit text size",
};

export const Case3: StoryObj = {
  render: (args) => ({
    props: args,
    template: `<div>
      <imo-top-location-removal [isDisableZero]="isDisableZero" [data]="data" [titleChart]="titleChart"></imo-top-location-removal>
    </div>`,
  }),
  args: {
    isDisableZero: true,
    data: data1Value,
    titleChart: "Munich Hotel - Sales Per Device (Current)",
  },
  name: "only 1 data have value > 0",
};
