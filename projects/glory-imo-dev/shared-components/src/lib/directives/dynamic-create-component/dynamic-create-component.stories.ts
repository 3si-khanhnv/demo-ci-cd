import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { SwitchesComponent } from "../../components/switches/switches.component";
import { SwitchesModule } from "../../components/switches/switches.module";
import { DynamicCreateComponentDirective } from "./dynamic-create-component.directive";
import { IDynamicCreateComponent } from "./dynamic-create-component.i";

interface SwitchesInput {
  isCheck: boolean;
}

interface SwitchesOutput {
  changed: (value: boolean) => void;
}

const switches: IDynamicCreateComponent<SwitchesInput, SwitchesOutput> = {
  component: SwitchesComponent,
  inputs: {
    isCheck: true,
  },
  outputs: {
    changed: (check: boolean) => {
      alert(check);
    },
  },
};

const meta: Meta = {
  title: "Components/ Atoms/ Dynamic Crete Component",
  argTypes: {},
  decorators: [
    moduleMetadata({
      declarations: [DynamicCreateComponentDirective],
      imports: [SwitchesModule],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Switches: Story = {
  args: {
    switches,
  },
  render: (args) => ({
    template: `
    <ng-container svDynamicCreateComponent [componentData]="switches"></ng-container>
    `,
    props: args,
  }),
};

