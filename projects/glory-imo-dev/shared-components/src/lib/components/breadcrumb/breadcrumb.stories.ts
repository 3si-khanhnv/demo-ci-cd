import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { Breadcrumb } from "./breadcrumb.component.i";
import { BreadcrumbModule } from "./breadcrumb.module";
import { Icons } from "../../constants/icons";

const level1: Breadcrumb[] = [
  {
    name: "Setup",
    parent: null,
    router: "/setup",
    url: "setup",
    permission: "*",
  },
];

const level2: Breadcrumb[] = [
  {
    name: "Setup",
    parent: null,
    router: "/setup",
    url: "setup",
    permission: "*",
  },
  {
    name: "Locations",
    parent: "setup",
    router: "/locations",
    url: "locations",
    permission: "viewLocations",
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<BreadcrumbComponent> = {
  title: "Components/ Atoms/Breadcrumb",
  component: BreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SvgIconModule, RouterModule, StoryBookI18nModule, BreadcrumbModule, RouterTestingModule.withRoutes([])],
    }),
  ],
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;
export const OneLink: Story = {
  args: {
    breadcrumbs: level1,
    caretLeft: Icons.caretLeft,
  },
};

export const TwoLink: Story = {
  args: {
    breadcrumbs: level2,
  },
};
