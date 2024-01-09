import { Component, EventEmitter, Output } from "@angular/core";

import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { ButtonInfoChartModule } from "./button-info-chart.module";
import { ETypeButtons } from "./button-info-char.i";

@Component({
  selector: "imo-parent",
  template: `
    <imo-button-info-chart
      [type]="assetMap"
      [title]="title.assetMap"
      [isActive]="isActive.assetMap"
      (clicked)="click(assetMapButton.type)"
      #assetMapButton
    ></imo-button-info-chart
    ><br /><br />
    <imo-button-info-chart
      [type]="removal"
      [title]="title.removal"
      [currencies]="currencies"
      [currencyCode]="currencyCode"
      [value]="value"
      [valueToolTip]="valueToolTip"
      [isActive]="isActive.removal"
      (clicked)="click(removalButton.type, removalButton.currencyCode)"
      #removalButton
    ></imo-button-info-chart>
  `,
  standalone: true,
  imports: [ButtonInfoChartModule],
})
class ParentComponent {
  assetMap = ETypeButtons.BASIC;
  removal = ETypeButtons.CURRENCY_FORMAT;
  value = `197,300.<span style="color:red;">00 GBP</span>`;
  currencyCode = "USD";
  currencies = "Currencies";
  valueToolTip = `197,300.00 USD \n 300.00 EUR \n 8,000.00 GBP`;
  isActive = {
    assetMap: true,
    removal: false,
  };
  title = {
    assetMap: "Asset Map",
    removal: "Removals",
  };
  @Output() clicked = new EventEmitter();

  click(type: string, currencyCode: string) {
    if (type === this.assetMap) {
      this.isActive = {
        assetMap: true,
        removal: false,
      };
    } else if (type === this.removal) {
      this.isActive = {
        assetMap: false,
        removal: true,
      };
      currencyCode = this.currencyCode;
    }

    this.clicked.emit({ currencyCode, type });
  }
}

const meta: Meta = {
  title: "Components / Atoms/ButtonInfoChart",
  argTypes: {
    clicked: { action: "clicked" },
  },
  decorators: [
    moduleMetadata({
      imports: [ParentComponent, ButtonInfoChartModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj;

export const AssetMapButton: Story = {
  args: {
    type: ETypeButtons.BASIC,
    title: "Asset Map",
  },
  render: (args) => ({
    props: args,
    template: `
      <imo-button-info-chart [type]='type' [title]='title' (clicked)='clicked($event)'></imo-button-info-chart>
    `,
  }),
};

export const RemovalButton: Story = {
  args: {
    type: ETypeButtons.CURRENCY_FORMAT,
    title: "Removals",
    valueToolTip: `197,300.00 \n 300.00`,
    value: `197,300.<span style="color:red;">00 GBP</span>`,
    currencyCode: `USD`,
    currencies: "Currencies",
  },
  render: (args) => ({
    props: args,
    template: `
      <imo-button-info-chart 
        [type]='type' 
        [title]='title' 
        [valueToolTip]="valueToolTip" 
        [value]='value' 
        [currencyCode]="currencyCode" 
        (clicked)='clicked($event)' 
        [currencies]='currencies'></imo-button-info-chart>
    `,
  }),
};

export const TwoButtonWithClick: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <imo-parent (clicked)="clicked($event)"></imo-parent>
    `,
  }),
};
