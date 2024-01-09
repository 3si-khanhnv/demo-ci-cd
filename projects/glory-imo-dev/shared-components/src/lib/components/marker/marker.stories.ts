import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { IMarker } from "./marker.component.i";
import { MarkerModule } from "./marker.module";

@Component({
  selector: "imo-parent",
  template: `
    <div>
      <div>
        <h5>The case Active</h5>
      </div>

      <div style="margin-bottom: 30px;" *ngFor="let item of listMarkersActive">
        <imo-marker
          [marker]="item"
          (emitClickMarker)="handleClickMarker($event)"
          (emitMouseMarkerIn)="handleMouseInMarker($event)"
          (emitMouseMarkerOut)="handleMouseOutMarker($event)"
        ></imo-marker>
      </div>
    </div>
    <div>
      <h5>The case InActive</h5>
      <div style="margin-bottom: 30px;" *ngFor="let item of listMarkersInActive">
        <imo-marker
          [marker]="item"
          (emitClickMarker)="handleClickMarker($event)"
          (emitMouseMarkerIn)="handleMouseInMarker($event)"
          (emitMouseMarkerOut)="handleMouseOutMarker($event)"
        ></imo-marker>
      </div>
    </div>
  `,
  standalone: true,
  imports: [MarkerModule, CommonModule],
})
export class MarkerStorybookComponent {
  listMarkersActive: IMarker[] = [
    {
      status: "good",
      active: true,
      id: "001",
      disable: false,
      hover: false,
      markerName: "001",
    },
    {
      status: "error",
      active: true,
      label: "23hr59",
      id: "002",
      disable: false,
      hover: false,
      markerName: "002",
    },
    {
      status: "missing",
      active: true,
      id: "003",
      disable: false,
      hover: false,
      markerName: "003",
    },
    {
      status: "good-missing",
      active: true,
      id: "004",
      disable: false,
      hover: false,
      markerName: "004",
    },
    {
      status: "ci-connector",
      active: true,
      id: "005",
      disable: false,
      hover: false,
      markerName: "005",
    },
    {
      status: "warning",
      active: true,
      id: "006",
      disable: false,
      hover: false,
      markerName: "006",
    },
  ];
  listMarkersInActive: IMarker[] = [
    {
      status: "good",
      active: false,
      id: "004",
      disable: true,
      hover: false,
      markerName: "004",
    },
    {
      status: "error",
      active: false,
      label: "59min",
      id: "005",
      disable: true,
      hover: false,
      markerName: "005",
    },
    {
      status: "missing",
      active: false,
      id: "006",
      disable: true,
      hover: false,
      markerName: "006",
    },
    {
      status: "good-missing",
      active: false,
      id: "007",
      disable: true,
      hover: false,
      markerName: "007",
    },
    {
      status: "ci-connector",
      active: false,
      id: "008",
      disable: true,
      hover: false,
      markerName: "008",
    },
    {
      status: "warning",
      active: false,
      id: "009",
      disable: true,
      hover: false,
      markerName: "009",
    },
  ];
  constructor() {}
  handleClickMarker(e: IMarker) {
    this.listMarkersActive.forEach((item: IMarker) => {
      if (item.id == e.id) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
  }
  handleMouseInMarker(e) {
    this.listMarkersActive.forEach((item: IMarker) => {
      if (item.id == e.id && !item.active) {
        item.hover = true;
      } else {
        item.hover = false;
      }
    });
  }
  handleMouseOutMarker(e) {
    this.listMarkersActive.forEach((item: IMarker) => {
      item.hover = false;
    });
    return e;
  }
}

const meta: Meta<MarkerStorybookComponent> = {
  title: "Components / Atoms/Marker ",
  argTypes: {},
  component: MarkerStorybookComponent,
  decorators: [
    moduleMetadata({
      imports: [MarkerStorybookComponent, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<MarkerStorybookComponent>;

export const Default: Story = {
  args: {},
};
