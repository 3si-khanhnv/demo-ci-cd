import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { MarkerTooltipComponent } from "./marker-tooltip.component";
import { IMarkerToolTip } from "./marker-tooltip.i";
import { MarkerTooltipModule } from "./marker-tooltip.module";

const meta: Meta<MarkerTooltipComponent> = {
  title: "Components / Atoms/MarkerTooltip",
  argTypes: {},
  component: MarkerTooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [MarkerTooltipModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 4rem">
        <imo-marker-tooltip [data]="data"> </imo-marker-tooltip>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<MarkerTooltipComponent>;

export const Good: Story = {
  args: {
    data: { markerName: "Glory", goodNumber: 1 } as IMarkerToolTip,
  },
};

export const GoodAndWarning: Story = {
  args: {
    data: { markerName: "Glory", warningNumber: 2, goodNumber: 1 } as IMarkerToolTip,
  },
};

export const Error: Story = {
  args: {
    data: { markerName: "Glory-Location2", goodNumber: 1, errorNumber: 2, missingNumber: 3 } as IMarkerToolTip,
  },
};

export const ErrorAndWarning: Story = {
  args: {
    data: { markerName: "Glory-Location2", goodNumber: 1, errorNumber: 2, warningNumber: 2 } as IMarkerToolTip,
  },
};

export const Missing: Story = {
  args: {
    data: { markerName: "Glory-Location3", goodNumber: 1, missingNumber: 3 } as IMarkerToolTip,
  },
};

export const MissingAndWarning: Story = {
  args: {
    data: { markerName: "Glory-Location3", warningNumber: 1, missingNumber: 3 } as IMarkerToolTip,
  },
};

export const Warning: Story = {
  args: {
    data: { markerName: "Glory-Location3", warningNumber: 2 } as IMarkerToolTip,
  },
};

export const ErrorWarningMissingGood: Story = {
  args: {
    data: {
      markerName: "Glory-Location4 Long text Long text Long text Long text",
      errorNumber: 3,
      warningNumber: 2,
      missingNumber: 2,
      goodNumber: 3,
    } as IMarkerToolTip,
  },
};
