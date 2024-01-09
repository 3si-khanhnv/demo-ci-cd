import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { UserInformationComponent } from "./user-information.component";
import { UserInformation } from "./user-information.component.i";
import { UserInformationModule } from "./user-information.module";

const user: UserInformation = {
  firstName: "John",
  lastName: "Doe",
  fullName: "Joe Bloggs",
  emailAddress: "Joe.Bloggs@server.com",
  smsAddress: "447890123456",
  phoneNumber: "441234567890",
  physicalAddress: "123 Some st",
  city: "Edinburgh",
  state: "West Lothian",
  postalCode: "AA1 1AA",
  countryCode: "44",
  timezone: "Europe/London",
  language: "English",
  roles: [
    {
      role: "Role_RegionalDemo",
    },
    {
      role: "Role 2",
    },
  ],
  permissions: {
    orders: {
      accessOrders: false,
      editOrders: false,
      deleteOrders: false,
      manualCreateEditStandardOrders: false,
      manualCreateEditEmergencyOrders: false,
      manualOverrideCitStandardOptions: false,
      manualPrintOrders: false,
      manualPrintAllFormats: false,
      manualRequestOrders: false,
      manualApproveOrders: false,
      manualRejectOrders: false,
      manualStopApprovedOrders: false,
      manualSendOrders: false,
      automaticEditOrders: false,
      automaticOverrideCitOptions: false,
      automaticPrintOrders: false,
      automaticPrintAllFormats: false,
      automaticRequestOrders: false,
      automaticApproveOrders: false,
      automaticRejectOrders: false,
      automaticStopApprovedOrders: false,
      automaticSendOrders: false,
    },
    tracking: {
      accessTransaction: false,
      accessTransactionAddComments: false,
      accessTransactionShowSourceData: false,
      accessTransactionAllowAddingTransaction: false,
      accessInventory: false,
      accessInventoryViewPieces: false,
      accessInventoryViewValues: false,
      accessProvisionalCredit: false,
      accessProvisionalCreditViewContainerBalances: false,
      accessProvisionalCreditViewCollectionDepositBalancing: false,
    },
    cits: {
      viewCits: false,
      createEditCits: false,
      deleteCits: false,
      viewGeneralSettings: false,
      createEditGeneralSettings: false,
      viewOrdersSettings: false,
      createEditOrdersSettings: false,
      viewServicesSettings: false,
      createEditServicesSettings: false,
      viewLocationsSettings: false,
      createEditLocationsSettings: false,
      viewCalendarsSettings: false,
      createEditCalendarsSettings: false,
    },
    devices: {
      viewDevices: false,
      createEditDevices: false,
      deleteDevices: false,
    },
    locations: {
      viewLocations: false,
      createEditLocations: false,
      deleteLocations: false,
      viewGeneralSettings: false,
      createEditGeneralSettings: false,
      viewDeviceSettings: false,
      createEditDeviceSettings: false,
      viewCitSettings: false,
      createEditCitSettings: false,
      viewCurrencySettings: false,
      createEditCurrencySettings: false,
      viewCalendarSettings: false,
      createEditCalendarSettings: false,
      viewOrderSettings: false,
      createEditOrderSettings: false,
      viewProvisionalCreditSettings: false,
      createEditProvisionalCreditSettings: false,
    },
    calendars: {
      viewCalendars: false,
      createEditCalendars: false,
      deleteCalendars: false,
      viewServiceSettings: false,
      createEditServiceSettings: false,
      viewServiceLocationsSettings: false,
      createEditServiceLocationsSettings: false,
      viewEmergencySettings: false,
      createEditEmergencySettings: false,
      viewEmergencyLocationsSettings: false,
      createEditEmergencyLocationsSettings: false,
      viewHolidaySettings: false,
      createEditHolidaySettings: false,
      viewHolidayLocationsSettings: false,
      createEditHolidayLocationsSettings: false,
      viewHolidayCitsSettings: false,
      createEditHolidayCitsSettings: false,
    },
    roles: {
      viewRoles: false,
      createEditRoles: false,
      deleteRoles: false,
    },
    schedules: {
      viewSchedules: false,
      createEditSchedules: false,
      deleteSchedules: false,
      viewScheduleOrder: false,
      createEditScheduleOrder: false,
      viewScheduleReport: false,
      createEditScheduleReport: false,
      viewScheduleAlert: false,
      createEditScheduleAlert: false,
    },
  },
};

const meta: Meta<UserInformationComponent> = {
  title: "Components / Atoms/UserInformation",
  component: UserInformationComponent,
  decorators: [
    moduleMetadata({
      imports: [UserInformationModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<UserInformationComponent>;

export const Normal: Story = {
  render: (args) => ({
    props: args,
    template: `<imo-user-information
      [user]="user"
    ></imo-user-information>`,
  }),
  args: {
    user,
  },
};
