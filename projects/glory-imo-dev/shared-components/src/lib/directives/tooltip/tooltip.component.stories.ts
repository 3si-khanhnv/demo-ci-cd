import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { FormComponent } from "../../components/form/form.component";
import { TooltipModule } from "./tooltip.module";

const meta: Meta = {
  title: "Components/ Atoms/ TooltipTest",
  argTypes: {},
  decorators: [
    moduleMetadata({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, TooltipModule],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const DefaultTooltip: Story = {
  args: {},
  render: (args) => ({
    template: `
    <span imoTooltip tooltip="Tooltip" placement="top">Tooltip on top</span>
    `,
    props: args,
  }),
};

export const HTMLTooltip: Story = {
  name: "pass HTML tooltip",
  args: {},
  render: (args) => ({
    template: `
    <span imoTooltip tooltip="<h1>Title</h1><h2>Content</h2>" placement="bottom" contentType="html" offset="10">Tooltip HTML</span>
    `,
    props: args,
  }),
};

export const TemplateTooltip: Story = {
  name: "pass template tooltip",
  args: {},
  render: (args) => ({
    template: `
    <ng-template #HtmlContent>
      <p>Hello i'm a <strong>bold</strong> text!</p>
    </ng-template>

    <span imoTooltip [tooltip]="HtmlContent" contentType="template">
      Tooltip with template content
    </span>
    `,
    props: args,
  }),
};
