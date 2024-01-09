import { Component } from "@angular/core";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { ChartRateModule } from "./chart-rate.module";

@Component({
  selector: "imo-storybookMock",
  template: `
    <div style="width:160px;  display: flex;">
      <imo-chart-rate [contentChart]="contentChart" [data]="dataInput"> </imo-chart-rate>
    </div>
    <button (click)="changeData()">change</button>
  `,
  standalone: true,
  imports: [ChartRateModule],
})
export class MockStorybookComponent {
  contentChart = {
    label: "Openrating rate",
    percent: 93,
  };
  dataInput = [
    {
      name: "Good",
      value: 80,
    },
    {
      name: "Warning",
      value: 10,
    },
    {
      name: "Error",
      value: 10,
    },
  ];

  changeData() {
    this.dataInput = [
      {
        name: "Good",
        value: Math.trunc(this.getRandomArbitrary(1, 100)),
      },
      {
        name: "Warning",
        value: Math.trunc(this.getRandomArbitrary(1, 100)),
      },
      {
        name: "Error",
        value: this.getRandomArbitrary(1, 100),
      },
    ];
    this.contentChart.percent = this.dataInput.filter((x) => x.name === "Good").map(({ value }) => value) as any;
  }
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}

const meta: Meta<MockStorybookComponent> = {
  title: "Components / Atoms/Chart-rate",
  argTypes: {},
  component: MockStorybookComponent,
  decorators: [
    moduleMetadata({
      imports: [MockStorybookComponent],
    }),
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};
