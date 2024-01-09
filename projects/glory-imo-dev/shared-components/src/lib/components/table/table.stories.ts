import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { TableComponent } from "./table.component";
import { TableField, TableRecord } from "./table.component.i";
import { TableModule } from "./table.module";

const selectFields: TableField[] = [
  {
    column: "organisationSelectField",
    name: "Organisation",
    style: {
      width: "150px",
    },
  },
];

const selectData: TableRecord[] = [
  {
    expandable: false,
    expansionData: [],
    isDeletable: false,
    organisationSelectField: {
      options: [
        { label: "ABC Inc", value: 2 },
        { label: "GLORY Ltd", value: 1 },
        { label: "Marin Development Team", value: 5 },
        { label: "Marvel Development Team", value: 3 },
        { label: "Maverick Development Team", value: 4 },
      ],
      placeholder: "Search or Select Organisation",
      selectedItem: 0,
    },
    checked: false,
  },
  {
    expandable: false,
    expansionData: [],
    isDeletable: false,
    organisationSelectField: {
      options: [
        { label: "ABC Inc", value: 2 },
        { label: "GLORY Ltd", value: 1 },
        { label: "Marin Development Team", value: 5 },
        { label: "Marvel Development Team", value: 3 },
        { label: "Maverick Development Team", value: 4 },
      ],
      placeholder: "Search or Select Organisation",
      selectedItem: 3,
    },
    checked: false,
  },
];

const selectSearchFields: TableField[] = [
  {
    column: "organisationSelectOrSearchField",
    name: "Organisation",
    style: {
      width: "150px",
    },
  },
];

const selectSearchData: TableRecord[] = [
  {
    expandable: false,
    expansionData: [],
    isDeletable: false,
    organisationSelectOrSearchField: {
      options: [
        { label: "ABC Inc", value: 2 },
        { label: "GLORY Ltd", value: 1 },
        { label: "Marin Development Team", value: 5 },
        { label: "Marvel Development Team", value: 3 },
        { label: "Maverick Development Team", value: 4 },
      ],
      placeholder: "Search or Select Organisation",
      selectedItem: 0,
    },
    checked: false,
  },
  {
    expandable: false,
    expansionData: [],
    isDeletable: false,
    organisationSelectOrSearchField: {
      options: [
        { label: "ABC Inc", value: 2 },
        { label: "GLORY Ltd", value: 1 },
        { label: "Marin Development Team", value: 5 },
        { label: "Marvel Development Team", value: 3 },
        { label: "Maverick Development Team", value: 4 },
      ],
      placeholder: "Search or Select Organisation",
      selectedItem: 3,
    },
    checked: false,
  },
];

const exportModalFields: TableField[] = [
  {
    column: "companyHeaderOpenModal",
    name: "Organisation Location",
    modalRef: { id: "modal", buttons: [{ name: "OK" }], title: "Organisation Location" },
  },
  { column: "location", name: "Location" },
];

const exportModalData: TableRecord[] = [
  { companyHeaderOpenModal: "ABC Inc", location: "Christchurch" },
  { companyHeaderOpenModal: "ABC Inc", location: "Crawley" },
  { companyHeaderOpenModal: "Adopt Ltd", location: "Nakita" },
  { companyHeaderOpenModal: "Adopt Ltd", location: "Hawai" },
  { companyHeaderOpenModal: "XYZ Udt", location: "Hue" },
  { companyHeaderOpenModal: "XYZ Udt", location: "Ha Noi" },
];

type NewType = TableComponent;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<NewType> = {
  title: "Components / Atoms/Table",
  argTypes: {
    selectedRecord: { action: "select" },
  },
  component: TableComponent,
  decorators: [
    moduleMetadata({
      imports: [TableModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<TableComponent>;

export const TableWithRadioButton: Story = {
  args: {
    displayedFields: [
      {
        column: "select",
        name: "",
        style: {
          width: "80px",
        },
      },
      { column: "company", name: "Organisation" },
      { column: "location", name: "Location" },
    ],
    data: [
      { company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1 },
      { company: "ABC Inc", location: "Crawley", companyId: 1, locationId: 2 },
      { company: "Adopt Ltd", location: "Nakita", companyId: 2, locationId: 3 },
      { company: "Adopt Ltd", location: "Hawai", companyId: 2, locationId: 4 },
      { company: "XYZ Udt", location: "Hue", companyId: 3, locationId: 5 },
      { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 6 },
    ],
  },
};

export const TableWithSelectedRadioButton: Story = {
  args: {
    displayedFields: [
      {
        column: "select",
        name: "",
        style: {
          width: "80px",
        },
      },
      { column: "company", name: "Organisation" },
      { column: "location", name: "Location" },
    ],
    data: [
      { company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1 },
      { company: "ABC Inc", location: "Crawley", companyId: 1, locationId: 2 },
      { company: "Adopt Ltd", location: "Nakita", companyId: 2, locationId: 3 },
      { company: "Adopt Ltd", location: "Hawai", companyId: 2, locationId: 4 },
      { company: "XYZ Udt", location: "Hue", companyId: 3, locationId: 5 },
      { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 6 },
    ],
    selectedIndex: 1,
  },
};

export const TableWithMultipleCheckbox: Story = {
  args: {
    displayedFields: [
      {
        column: "checkbox",
        name: "",
        style: {
          width: "80px",
        },
      },
      { column: "company", name: "Organisation" },
      { column: "location", name: "Location" },
    ],
    data: [
      { company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1 },
      { company: "ABC Inc", location: "Crawley", companyId: 1, locationId: 2 },
      { company: "Adopt Ltd", location: "Nakita", companyId: 2, locationId: 3 },
      { company: "Adopt Ltd", location: "Hawai", companyId: 2, locationId: 4 },
      { company: "XYZ Udt", location: "Hue", companyId: 3, locationId: 5 },
      { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 6 },
    ],
  },
};

export const TableWithSelectedMultipleCheckbox: Story = {
  args: {
    displayedFields: [
      {
        column: "checkbox",
        name: "",
        style: {
          width: "80px",
        },
      },
      { column: "company", name: "Organisation" },
      { column: "location", name: "Location" },
    ],
    data: [
      { company: "ABC Inc", location: "Christchurch", companyId: 1, locationId: 1 },
      { company: "ABC Inc", location: "Crawley", companyId: 1, locationId: 2 },
      { company: "Adopt Ltd", location: "Nakita", companyId: 2, locationId: 3 },
      { company: "Adopt Ltd", location: "Hawai", companyId: 2, locationId: 4 },
      { company: "XYZ Udt", location: "Hue", companyId: 3, locationId: 5 },
      { company: "XYZ Udt", location: "Ha Noi", companyId: 3, locationId: 6 },
    ],
    checkedRows: [
      { company: "Adopt Ltd", location: "Nakita", companyId: 2, locationId: 3, checked: true },
      { company: "Adopt Ltd", location: "Hawai", companyId: 2, locationId: 4, checked: true },
      { company: "XYZ Udt", location: "Hue", companyId: 3, locationId: 5, checked: true },
    ],
  },
};

export const TableWithLongText: Story = {
  args: {
    displayedFields: [
      { column: "company", name: "Organisation", style: { width: "150px" } },
      { column: "location", name: "Location" },
    ],
    data: [
      { company: "ABC Inc ABCDEFGHIJMNLKOPQRSTUWY", location: "Christchurch", companyId: 1, locationId: 1 },
      { company: "ABC Inc ABCDEFGHIJMNLKOPQRSTUWY", location: "Crawley", companyId: 1, locationId: 2 },
      { company: "Adopt Ltd ABCDEFGHIJMNLKOPQRSTUWY", location: "Nakita", companyId: 2, locationId: 3 },
      { company: "Adopt Ltd ABCDEFGHIJMNLKOPQRSTUWY", location: "Hawai", companyId: 2, locationId: 4 },
      { company: "XYZ Udt ABCDEFGHIJMNLKOPQRSTUWY", location: "Hue", companyId: 3, locationId: 5 },
      { company: "XYZ Udt ABCDEFGHIJMNLKOPQRSTUWY", location: "Ha Noi", companyId: 3, locationId: 6 },
    ],
  },
};

export const TableWithIcon: Story = {
  args: {
    displayedFields: [
      { column: "multiIconField", name: "Multi icon", style: { width: "150px" } },
      { column: "singleIconField", name: "Single icon", style: { width: "150px" } },
      { column: "multiMessageIconField", name: "Multi icon with message", style: { width: "150px" } },
      { column: "singleMessageIconField", name: "Single icon with message", style: { width: "150px" } },
      { column: "messageIconField", name: "Message", style: { width: "150px" } },
    ],
    data: [
      {
        multiIconField: {
          icons: ["warningLow", "criticalHigh"],
        },
        singleIconField: {
          icons: ["ok"],
        },
        multiMessageIconField: {
          icons: ["criticalHigh", "warningHigh"],
          message: "Message",
        },
        singleMessageIconField: {
          icons: ["ok"],
          message: "Message",
        },
        messageIconField: {
          message: "Message",
        },
      },
    ],
  },
};

export const TableWithSelectBoxField: Story = {
  args: {
    displayedFields: selectFields,
    data: selectData,
  },
};

export const TableWithFieldHaveSelectBoxCanSearch: Story = {
  args: {
    displayedFields: selectSearchFields,
    data: selectSearchData,
  },
};

export const TableOpenInNewHeader: Story = {
  render: () => ({
    template: `<imo-table
      [data]="data"
      [displayedFields]="displayedFields"
    >

    <ng-template #companyHeaderOpenModal>
      <p>aaaaaaa bbbbbbb</p>
    </ng-template>
    </imo-table>
    `,
    props: {
      displayedFields: exportModalFields,
      data: exportModalData,
    },
  }),
};
