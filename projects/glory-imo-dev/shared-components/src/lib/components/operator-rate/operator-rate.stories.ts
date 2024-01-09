import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { ENumIconStatus } from "../status-icon/status-icon.i";
import { OperatorRateComponent } from "./operator-rate.component";
import { IDataInput, ILocationGroup, ITypeGood } from "./operator-rate.i";
import { OperatorRateModule } from "./operator-rate.module";

const locationGroup = [
  {
    label: "GroupName-1",
    value: "GroupName-1",
    subs: [
      {
        label: "Location-1",
        value: "Location-1",
      },
      {
        label: "Location-2",
        value: "Location-2",
      },
    ],
  },
  {
    label: "GroupName-2222222222222222222",
    value: "GroupName-2222222222222222222",
    subs: [
      {
        label: "Location-333333333333333333",
        value: "Location-3",
      },
      {
        label: "Location-4",
        value: "Location-4",
      },
      {
        label: "Location-5",
        value: "Location-5",
      },
      {
        label: "Location-6",
        value: "Location-6",
      },
      {
        label: "Location-7",
        value: "Location-7",
      },
      {
        label: "Location-8",
        value: "Location-8",
      },
      {
        label: "Location-9",
        value: "Location-9",
      },
    ],
  },
] as ILocationGroup[];

const labelHeaderTabs = {
  state: "State",
  locations: "Locations",
};

const labelCiConnector = {
  labelByCiConnector: "by CI-Connector",
  labelLocation: "Location",
  labelLocations: "Locations",
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<OperatorRateComponent> = {
  title: "Components / Atoms/Operator Rate",
  argTypes: {
    emitHighlightErrors: { action: "emitHighlightErrors" },
    emitLocation: { action: "emitLocation" },
    emitTabIndex: { action: "emitTabIndex" },
  },
  component: OperatorRateComponent,
  decorators: [
    moduleMetadata({
      imports: [OperatorRateModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<OperatorRateComponent>;

export const OperatorRateInformation: Story = {
  args: {
    selectedTabIndex: 0,
    labelHeaderTabs: labelHeaderTabs,
    contentChart: {
      label: "Devices",
      percent: "<span>30</span>",
    },
    isShowHightLightError: false,
    dataInput: [{ name: "CI-Connector", value: 100 } as IDataInput],
    colorScheme: {
      domain: ["#515DB6"],
    },
    dataFilters: {},
    locationGroup: locationGroup,
    totalLocations: 5,
    totalCiConnector: 2,
    labelCiConnector: labelCiConnector,
  },
};

export const OperatorRateInformationWithoutType: Story = {
  args: {
    selectedTabIndex: 0,
    labelHeaderTabs: labelHeaderTabs,
    contentChart: {
      label: "operating rate",
      percent: "<span>94</span>%",
    },
    isShowHightLightError: true,
    dataInput: [
      { name: "Good", value: 80 } as IDataInput,
      { name: "Warning", value: 10 } as IDataInput,
      { name: "Error", value: 10 } as IDataInput,
    ],
    typeGood: [
      { type: ENumIconStatus.STATUS_GOOD, name: "Good", value: 123, label: "Good" } as ITypeGood,
      { type: ENumIconStatus.STATUS_WARNING, name: "Warning", value: 15, label: "Warning" } as ITypeGood,
      { type: ENumIconStatus.STATUS_ERROR_MARKER, name: "Error", value: 9, label: "Error" } as ITypeGood,
      { type: ENumIconStatus.STATUS_MISSING, name: "Missing", value: 18, label: "Missing" } as ITypeGood,
      { type: ENumIconStatus.STATUS_CI_CONNECTOR, name: "CI-Connector", value: 30, label: "CI-Connector" } as ITypeGood,
    ],
    labelError: "Highlight Error",
    dataFilters: {},
    isCheck: true,
    locationGroup: locationGroup,
    totalLocations: 10,
    totalCiConnector: 2,
    labelCiConnector: labelCiConnector,
  },
};

export const OperatorRateInformationWithCIConnector: Story = {
  args: {
    selectedTabIndex: 0,
    labelHeaderTabs: labelHeaderTabs,
    contentChart: {
      label: "operating rate",
      percent: "<span>94</span>%",
    },
    isShowHightLightError: true,
    dataInput: [
      { name: "Good", value: 80 } as IDataInput,
      { name: "Warning", value: 10 } as IDataInput,
      { name: "Error", value: 10 } as IDataInput,
    ],
    typeGood: [
      { type: ENumIconStatus.STATUS_GOOD, name: "Good", value: 123, label: "Good" } as ITypeGood,
      { type: ENumIconStatus.STATUS_WARNING, name: "Warning", value: 15, label: "Warning" } as ITypeGood,
      { type: ENumIconStatus.STATUS_ERROR_MARKER, name: "Error", value: 9, label: "Error" } as ITypeGood,
      { type: ENumIconStatus.STATUS_MISSING, name: "Missing", value: 18, label: "Missing" } as ITypeGood,
      { type: ENumIconStatus.STATUS_CI_CONNECTOR, name: "CI-Connector", value: 30, label: "CI-Connector" } as ITypeGood,
    ],
    labelError: "Highlight Error",
    dataFilters: {},
    isCheck: true,
    locationGroup: locationGroup,
    totalLocations: 10,
    totalCiConnector: 2,
    labelCiConnector: labelCiConnector,
  },
};
