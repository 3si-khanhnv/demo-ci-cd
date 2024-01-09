import { FormControl } from "@angular/forms";

import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { TagInputComponent } from "./tag-input.component";
import { TagInputModule } from "./tag-input.module";

const formControl = new FormControl<string>("");

formControl.valueChanges.subscribe((data) => {
  console.log(data);
});

const meta: Meta<TagInputComponent> = {
  title: "Components / Atoms/Tag Input",
  component: TagInputComponent,
  argTypes: { changed: { action: "changed" } },
  decorators: [
    moduleMetadata({
      imports: [TagInputModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TagInputComponent>;

export const Default: Story = {
  name: "tag input default",
  render: (args) => ({
    props: args,
    template: `
    <imo-tag-input
      [value]="value"
      [default]="default"
      [requiredPlaceholder]="requiredPlaceholder"
      (changed)="changed($event)"
    ></imo-tag-input>
    `,
  }),
  args: {
    value: "Something [Place Holder] Title - Difference",
    default: "Something [Place Holder] Title",
    requiredPlaceholder: ["Something [Place Holder]"],
  },
};
