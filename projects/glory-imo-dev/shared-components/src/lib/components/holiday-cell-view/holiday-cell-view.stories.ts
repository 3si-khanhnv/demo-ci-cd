import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { HolidayCellViewComponent } from "./holiday-cell-view.component";
import { HolidayCellViewModule } from "./holiday-cell-view.module";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<HolidayCellViewComponent> = {
  title: "Components/ Atoms/HolidayCellView",
  component: HolidayCellViewComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule, HolidayCellViewModule, StoryBookI18nModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<HolidayCellViewComponent>;

export const Default: Story = {
  render: (args: HolidayCellViewComponent) => ({
    props: {
      ...args,
      options: ["Skip", "Consider as working day for order calculation"],
      holidayDate: "11/11/2022 (Fri)",
    },
    template: `
      <div fxLayout="column" fxLayoutGap="2px">
        <imo-holiday-cell-view [options]="options" [holidayDate]="holidayDate"></imo-holiday-cell-view>
      </div>
    `,
  }),
};
