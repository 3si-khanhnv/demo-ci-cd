import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { LabelColorComponent } from "./label-color.component";
import { LabelColorModule } from "./label-color.module";

const meta: Meta<LabelColorComponent> = {
  title: "Components / Atoms/Label Color",
  argTypes: {},
  component: LabelColorComponent,
  decorators: [
    moduleMetadata({
      imports: [LabelColorModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<LabelColorComponent>;

export const LabelColors: Story = {
  args: {
    label: "Coventory",
    color: "#003797",
  },
  render: (args) => ({
    props: args,
    template: `<imo-label-color [label]="label" [color]="color"></imo-label-color><br />
    <imo-label-color [label]="'Milton Keynes'" [color]="'#008197'"></imo-label-color><br />
    <imo-label-color [label]="'Cambridge'" [color]="'#00ADCC'"></imo-label-color><br />
    <imo-label-color [label]="'Herpenden'" [color]="'#30BEA8'"></imo-label-color><br />
    <imo-label-color [label]="'Bedford'" [color]="'#8CC63E'"></imo-label-color><br />
    <imo-label-color [label]="'Reading'" [color]="'#E3C620'"></imo-label-color><br />
    <imo-label-color [label]="'Luton'" [color]="'#FE9801'"></imo-label-color><br />
    <imo-label-color [label]="'Basingstoke'" [color]="'#F05235'"></imo-label-color><br />
    <imo-label-color [label]="'Oxford'" [color]="'#E02C33'"></imo-label-color><br />
    <imo-label-color [label]="'Dunstable'" [color]="'#5C6061'"></imo-label-color><br />`,
  }),
};
