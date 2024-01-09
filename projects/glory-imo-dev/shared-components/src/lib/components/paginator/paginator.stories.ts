import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { PaginatorComponent } from "./paginator.component";
import { PaginatorModule } from "./paginator.module";

const meta: Meta<PaginatorComponent> = {
  title: "Components / Atoms/Paginator",
  argTypes: {
    offset: { action: "offsetChanged" },
    selected: { action: "pageSelected" },
  },
  component: PaginatorComponent,
  decorators: [
    moduleMetadata({
      imports: [PaginatorModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type NewType = PaginatorComponent;

type Story = StoryObj<NewType>;

export const Default: Story = {
  args: {
    pageSize: 15,
    currentPage: 1,
    movingStep: 2,
    totalRecords: 24,
  },
};
