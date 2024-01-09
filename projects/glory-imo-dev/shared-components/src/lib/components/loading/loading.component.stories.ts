import { MatDialog, MatDialogModule } from "@angular/material/dialog";

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { LoadingComponent } from "./loading.component";
import { LoadingModule } from "./loading.module";

@Component({
  selector: "imo-test-story",
  template: "",
  standalone: true,
  imports: [MatDialogModule, LoadingModule, CommonModule],
})
export class TestStoryComponent {
  constructor(public dialog: MatDialog) {
    this.dialog.open(LoadingComponent, { disableClose: true });
  }
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<TestStoryComponent> = {
  title: "Components /Atoms/Loading",
  argTypes: {},
  component: TestStoryComponent,
  decorators: [
    moduleMetadata({
      imports: [TestStoryComponent, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<TestStoryComponent>;

export const Default: Story = {
  args: {},
};
