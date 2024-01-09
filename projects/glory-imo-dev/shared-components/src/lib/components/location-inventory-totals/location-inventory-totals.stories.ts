import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";

import { AfterViewInit, Component, OnInit } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { LocationInventoryTotalsComponent } from "./location-inventory-totals.component";
import { ILabelColor } from "./location-inventory-totals.i";
import { LocationInventoryTotalsModule } from "./location-inventory-totals.module";

const gradient = document.createElement("canvas").getContext("2d").createLinearGradient(0, 0, 500, 0);
gradient.addColorStop(0, "#25c0e5");
gradient.addColorStop(0.5, "#33a5e1");
gradient.addColorStop(1, "#4287dd");
const data = [
  [
    {
      label: "Harpenden",
      bgColor: "#FFC73D",
      current: "0.00",
      value: 0,
    },
    {
      label: "Luton",
      bgColor: "#F6494A",
      current: "14,888",
      value: 14888,
    },
    {
      label: "Dunstable",
      bgColor: "#83B3B1",
      current: "12,722",
      value: 12722,
    },
    {
      label: "Coventry",
      bgColor: "#97E640",
      current: "12,084",
      value: 12084,
    },
    {
      label: "Bedford",
      bgColor: "#4BE1BC",
      current: "8,583",
      value: 8583,
    },
    {
      label: "Reading",
      bgColor: "#BCB0A2",
      current: "8,544",
      value: 8544,
    },
    {
      label: "Milton",
      bgColor: "#E3518E",
      current: "7,213",
      value: 7213,
    },
    {
      label: "Cambridge",
      bgColor: "#354F4D",
      current: "5,009",
      value: 5009,
    },
  ],
  [
    {
      label: "Oxford",
      bgColor: "#469AD9",
      current: "51,234",
      value: 51234,
    },
    {
      label: "Harpenden",
      bgColor: "#FFC73D",
      current: "21,746",
      value: 21746,
    },
    {
      label: "Luton",
      bgColor: "#F6494A",
      current: "14,888",
      value: 14888,
    },
    {
      label: "Basingstoke",
      bgColor: "#80DCF4",
      current: "14,038",
      value: 14038,
    },
  ],
  [
    {
      label: "HarpendenHarpenden",
      bgColor: "#469AD9",
      current: "1,234,567",
      value: 1234567,
    },
    {
      label: "Oxford",
      bgColor: "#FFC73D",
      current: "21,746",
      value: 21746,
    },
    {
      label: "Luton",
      bgColor: "#F6494A",
      current: "14,888",
      value: 14888,
    },
    {
      label: "Basingstoke",
      bgColor: "#80DCF4",
      current: "14,038",
      value: 14038,
    },
  ],
  [
    {
      label: "HarpendenHarpenden",
      bgColor: "#469AD9",
      current: "21,746",
      value: 21746,
    },
    {
      label: "Oxford",
      bgColor: "#FFC73D",
      current: "0",
      value: 0,
    },
    {
      label: "Luton",
      bgColor: "#F6494A",
    },
    {
      label: "Basingstoke",
    },
  ],
  [
    {
      label: "Harpenden",
      bgColor: gradient,
      current: "21,746",
      value: 0,
    },
    {
      label: "Luton",
      bgColor: gradient,
      current: "14,888",
      value: 14888,
    },
    {
      label: "Basingstoke",
      bgColor: gradient,
      current: "14,038",
      value: 14038,
    },
    {
      label: "Oxford",
      bgColor: gradient,
      current: "21,746",
      value: 13664,
    },
    {
      label: "Dunstable",
      bgColor: gradient,
      current: "12,722",
      value: 12722,
    },
    {
      label: "Coventry",
      bgColor: gradient,
      current: "12,084",
      value: 12084,
    },
    {
      label: "Bedford",
      bgColor: gradient,
      current: "8,583",
      value: 8583,
    },
    {
      label: "Reading",
      bgColor: gradient,
      current: "8,544",
      value: 8544,
    },
    {
      label: "Milton",
      bgColor: gradient,
      current: "7,213",
      value: 7213,
    },
    {
      label: "Cambridge",
      bgColor: gradient,
      current: "5,009",
      value: 5009,
    },
  ],
  [
    {
      label: "Top 1 Location",
      bgColor: "#004D6E",
      current: "99,990,000.50",
      value: 1111111111111,
    },
    {
      label: "Top 2 Location",
      bgColor: "#004D6E",
      current: "80,000,000.50",
      value: 0,
    },
    {
      label: "Top 3 Location",
      bgColor: "#004D6E",
      current: "70,000,000.50",
      value: 0,
    },
    {
      label: "Top 4 Location",
      bgColor: "#004D6E",
      current: "60,000,000.50",
      value: 0,
    },
    {
      label: "Top 5 Location",
      bgColor: "#004D6E",
      current: "50,000,000.50",
      value: 0,
    },
  ],
];

@Component({
  selector: "imo-mock-storybook",
  template: `
    <div style="display: grid;">
      <div>
        <imo-location-inventory-totals
          [isAutoResponsive]="true"
          [isShowFullText]="true"
          [isShowValueZero]="true"
          [data]="data"
          [title]="titleChart"
        ></imo-location-inventory-totals>
      </div>
      <div>
        <button (click)="random()">Random Data</button>
        <div></div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [LocationInventoryTotalsModule],
})
export class MockStorybookComponent implements OnInit, AfterViewInit {
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
    const data = [...Array(this.randomIntFromInterval(1, 10))].map((_, index) => {
      const randomValue = Math.floor(Math.random() * this.randomIntFromInterval(0, 5000000000000)) + 1;
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

const meta: Meta<LocationInventoryTotalsComponent> = {
  title: "Components / Atoms / Inventory History Table Row",
  argTypes: {},
  component: LocationInventoryTotalsComponent,
  decorators: [
    moduleMetadata({
      imports: [LocationInventoryTotalsModule, MockStorybookComponent, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj;

export const DataLengthIs10: Story = {
  args: {
    data: data[0],
    title: "Location Inventory (Totals)",
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 760px; height: 560px;">
    <imo-location-inventory-totals [barThickness]="28" [height]="36" [data]="data" [title]="title" ></imo-location-inventory-totals>
              </div>`,
  }),
};

export const DataLengthIsLessThan10: Story = {
  args: {
    data: data[1],
    title: "Location Inventory (Totals)",
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 760px; height: 560px;">
    <imo-location-inventory-totals [data]="data" [title]="title"></imo-location-inventory-totals>
  </div>`,
  }),
};

export const DataToBig: Story = {
  args: {
    data: data[2],
    title: "Location Inventory (Totals)",
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 760px; height: 560px;">
    <imo-location-inventory-totals [data]="data" [title]="title"></imo-location-inventory-totals>
  </div>`,
  }),
};

export const NoData: Story = {
  args: {
    data: [],
    title: "Location Inventory (Totals)",
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 760px; height: 560px;">
                <imo-location-inventory-totals [data]="data" [title]="title"></imo-location-inventory-totals>
              </div>`,
  }),
};

export const Other: Story = {
  args: {
    data: data[3],
    title: "Location Inventory (Totals)",
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 760px; height: 560px;">
    <imo-location-inventory-totals [data]="data" [title]="title"></imo-location-inventory-totals>
  </div>`,
  }),
};

export const Gradient: Story = {
  args: {
    data: data[4],
    title: "Location Inventory (Totals)",
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 520px; height: 560px;">
                <imo-location-inventory-totals [data]="data"
                [isShowFullText]="true"
                [isShowValueZero]="true" 
                [title]="title"></imo-location-inventory-totals>
              </div>`,
  }),
};

export const AutoResponsive: Story = {
  args: {
    isAutoResponsive: true,
    isShowValueZero: true,
    data: data[5],
    title: "Location Inventory (Totals)",
  },
  render: (args) => ({
    props: args,
    template: `<div>
    <imo-location-inventory-totals
     [isAutoResponsive]="isAutoResponsive"
    [isShowFullText]="true" [isShowValueZero]="isShowValueZero" [height]="36" [data]="data" [title]="title"
    ></imo-location-inventory-totals>
  </div>`,
  }),
};

export const RandomData: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <imo-mock-storybook></imo-mock-storybook>
    `,
  }),
};
