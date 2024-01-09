import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import moment from "moment";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { TableField } from "../table/table.component.i";
import { TableModule } from "../table/table.module";
import { ExpansionTableComponent } from "./expansion-table.component";
import { ExpansionTableRow, ExpansionTable } from "./expansion-table.component.i";
import { ExpansionTableModule } from "./expansion-table.module";

const displayedFields: TableField[] = [
  { column: "spaceLeft", name: "", style: { width: "2.5%" } },
  { column: "name", name: "Name", style: { width: "19.5%" } },
  { column: "date", name: "When is the holiday?", style: { width: "25.1666666667%" } },
  { column: "orderPlaceDate", name: "When should the order be placed?", style: { width: "25.1666666667%" } },
  { column: "orderServiceDate", name: "When is the new service date?", style: { width: "25.1666666667%" } },
  { column: "spaceRight", name: "", style: { width: "2.5%" } },
];

const template = `<imo-expansion-table
    [checkbox]="checkbox"
    [radio]="radio"
    [columns]="columns"
    [table]="table"
    [labels]="labels"
    [expansion]="ExpansionContent"
    (allChecked)="onAllCheck($event)"
    (checked)="onCheck($event)"
    (sorted)="onColumnSort($event)"
    ></imo-expansion-table>

    <ng-template #ExpansionContent let-data>
     <imo-table [data]="table.data" [displayedFields]="displayedFields"></imo-table>
    </ng-template>
    `;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ExpansionTableComponent> = {
  title: "Components/ Atoms/Expansion Table",
  argTypes: {
    // Output
    allChecked: { action: "allChecked" },
    checked: { action: "checked" },
    sorted: { action: "sorted" },
  },
  component: ExpansionTableComponent,
  decorators: [
    moduleMetadata({
      imports: [ExpansionTableModule, StoryBookI18nModule, BrowserAnimationsModule, TableModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ExpansionTableComponent>;

export const Default: Story = {
  render: (args: ExpansionTableComponent) => ({
    props: {
      // Input
      ...args,
      checkbox: false,
      radio: false,
      columns: ["name"],
      table: {
        data: [
          {
            id: 1,
            name: "holiday",
            date: "2021-01-01",
            day: moment().format("dddd"),
            skip: "",
            isSkippable: false,
            orderPlaceDate: "09-09-2022",
            orderServiceDate: "09-09-2022",
            calendarName: "holiday-name 1",
          } as ExpansionTableRow,
          {
            id: 2,
            name: "holiday2",
            date: "2021-01-02",
            day: moment().add(1, "days").format("dddd"),
            skip: "",
            isSkippable: false,
            orderPlaceDate: "09-09-2022",
            orderServiceDate: "09-09-2022",
            calendarName: "holiday-name 2",
          } as ExpansionTableRow,
        ],
      } as ExpansionTable,
      labels: {
        checkbox: { aria: "checkbox" },
        expansion: {
          checkbox: { aria: "checkbox" },
          headerButton: { aria: "header buttons" },
        },
      },
      displayedFields: displayedFields,
    },
    template,
  }),
};
