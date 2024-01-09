import { AppState } from "..";
import { UserInformation } from "./user-information.model";
import { selectPermissions, selectUserInformationState } from "./user-information.selectors";

const permissions = {
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
    accessProvisionalCredit: false,
    accessProvisionalCreditPrintTransferFile: false,
    accessProvisionalCreditPrintTransferFilePrintAllFormats: false,
    accessProvisionalCreditSendTransferFile: false,
  },
  tracking: {
    accessTransaction: false,
    accessTransactionAddComments: false,
    accessTransactionShowSourceData: false,
    accessTransactionAllowAddingTransaction: false,
    accessInventory: false,
    accessInventoryViewPieces: false,
    accessInventoryViewValues: false,
    accessInventoryHistory: false,
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
    viewProvisionalCreditSettings: false,
    createEditProvisionalCreditSettings: false,
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
  rolesOfManage: {
    viewRoles: false,
    createEditRoles: false,
    deleteRoles: false,
  },
  rolesOfInform: {
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
    viewGlobalSchedule: false,
    createEditGlobalSchedule: false,
    viewScheduleProvisionalCredit: false,
    createEditScheduleProvisionalCredit: false,
  },
  reporting: {
    accessReports: false,
    accessReportTypes: [],
  },
  widgets: {
    accessWidgets: false,
    accessWidgetTypes: [],
  },
};

const userSample: UserInformation = {
  fullName: "",
  firstName: "",
  lastName: "",
  emailAddress: "",
  smsAddress: "",
  phoneNumber: "",
  countryCode: "",
  physicalAddress: "",
  city: "",
  state: "",
  postalCode: "",
  timezone: "",
  language: "",
  roles: [],
  permissions: permissions,
  clientDateTimeFormat: undefined,
  clientDateTimeSecondFormat: undefined,
  clientTimezone: undefined,
  otherApplicationLinks: [],
  accessAbleApplicationIds: [],
};

const sampleState: Pick<AppState, "userInformation"> = {
  userInformation: {
    userInformation: userSample,
  },
};

describe("User Information Selectors", () => {
  describe(selectUserInformationState.name, () => {
    it("userInformationSelector should return init user data", () => {
      // arrange
      const state = sampleState;
      const expected: UserInformation = userSample;

      // act
      const act = selectUserInformationState(state as any);

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe(selectPermissions.name, () => {
    it("permissionsSelector should return data", () => {
      // arrange
      const state = sampleState;
      const expected = [
        [
          { accessOrders: false, group: "orders" },
          { editOrders: false, group: "orders" },
          { deleteOrders: false, group: "orders" },
          { group: "orders", manualCreateEditStandardOrders: false },
          { group: "orders", manualCreateEditEmergencyOrders: false },
          { group: "orders", manualOverrideCitStandardOptions: false },
          { group: "orders", manualPrintOrders: false },
          { group: "orders", manualPrintAllFormats: false },
          { group: "orders", manualRequestOrders: false },
          { group: "orders", manualApproveOrders: false },
          { group: "orders", manualRejectOrders: false },
          { group: "orders", manualStopApprovedOrders: false },
          { group: "orders", manualSendOrders: false },
          { group: "orders", automaticEditOrders: false },
          { automaticOverrideCitOptions: false, group: "orders" },
          { automaticPrintOrders: false, group: "orders" },
          { automaticPrintAllFormats: false, group: "orders" },
          { automaticRequestOrders: false, group: "orders" },
          { automaticApproveOrders: false, group: "orders" },
          { automaticRejectOrders: false, group: "orders" },
          { automaticStopApprovedOrders: false, group: "orders" },
          { automaticSendOrders: false, group: "orders" },
          { accessProvisionalCredit: false, group: "orders" },
          { accessProvisionalCreditPrintTransferFile: false, group: "orders" },
          { accessProvisionalCreditPrintTransferFilePrintAllFormats: false, group: "orders" },
          { accessProvisionalCreditSendTransferFile: false, group: "orders" },
        ],
        [
          { accessTransaction: false, group: "tracking" },
          { accessTransactionAddComments: false, group: "tracking" },
          { accessTransactionShowSourceData: false, group: "tracking" },
          { accessTransactionAllowAddingTransaction: false, group: "tracking" },
          { accessInventory: false, group: "tracking" },
          { accessInventoryViewPieces: false, group: "tracking" },
          { accessInventoryViewValues: false, group: "tracking" },
          { accessInventoryHistory: false, group: "tracking" },
        ],
        [
          { group: "cits", viewCits: false },
          { createEditCits: false, group: "cits" },
          { deleteCits: false, group: "cits" },
          { group: "cits", viewGeneralSettings: false },
          { createEditGeneralSettings: false, group: "cits" },
          { group: "cits", viewOrdersSettings: false },
          { createEditOrdersSettings: false, group: "cits" },
          { group: "cits", viewServicesSettings: false },
          { createEditServicesSettings: false, group: "cits" },
          { group: "cits", viewLocationsSettings: false },
          { createEditLocationsSettings: false, group: "cits" },
          { group: "cits", viewCalendarsSettings: false },
          { createEditCalendarsSettings: false, group: "cits" },
          { group: "cits", viewProvisionalCreditSettings: false },
          { createEditProvisionalCreditSettings: false, group: "cits" },
        ],
        [
          { group: "devices", viewDevices: false },
          { createEditDevices: false, group: "devices" },
          { deleteDevices: false, group: "devices" },
        ],
        [
          { group: "locations", viewLocations: false },
          { createEditLocations: false, group: "locations" },
          { deleteLocations: false, group: "locations" },
          { group: "locations", viewGeneralSettings: false },
          { createEditGeneralSettings: false, group: "locations" },
          { group: "locations", viewDeviceSettings: false },
          { createEditDeviceSettings: false, group: "locations" },
          { group: "locations", viewCitSettings: false },
          { createEditCitSettings: false, group: "locations" },
          { group: "locations", viewCurrencySettings: false },
          { createEditCurrencySettings: false, group: "locations" },
          { group: "locations", viewCalendarSettings: false },
          { createEditCalendarSettings: false, group: "locations" },
          { group: "locations", viewOrderSettings: false },
          { createEditOrderSettings: false, group: "locations" },
          { group: "locations", viewProvisionalCreditSettings: false },
          { createEditProvisionalCreditSettings: false, group: "locations" },
        ],
        [
          { group: "calendars", viewCalendars: false },
          { createEditCalendars: false, group: "calendars" },
          { deleteCalendars: false, group: "calendars" },
          { group: "calendars", viewServiceSettings: false },
          { createEditServiceSettings: false, group: "calendars" },
          { group: "calendars", viewServiceLocationsSettings: false },
          { createEditServiceLocationsSettings: false, group: "calendars" },
          { group: "calendars", viewEmergencySettings: false },
          { createEditEmergencySettings: false, group: "calendars" },
          { group: "calendars", viewEmergencyLocationsSettings: false },
          { createEditEmergencyLocationsSettings: false, group: "calendars" },
          { group: "calendars", viewHolidaySettings: false },
          { createEditHolidaySettings: false, group: "calendars" },
          { group: "calendars", viewHolidayLocationsSettings: false },
          { createEditHolidayLocationsSettings: false, group: "calendars" },
          { group: "calendars", viewHolidayCitsSettings: false },
          { createEditHolidayCitsSettings: false, group: "calendars" },
        ],
        [
          { group: "rolesOfManage", viewRoles: false },
          { createEditRoles: false, group: "rolesOfManage" },
          { deleteRoles: false, group: "rolesOfManage" },
        ],
        [
          { group: "rolesOfInform", viewRoles: false },
          { createEditRoles: false, group: "rolesOfInform" },
          { deleteRoles: false, group: "rolesOfInform" },
        ],
        [
          { group: "schedules", viewSchedules: false },
          { createEditSchedules: false, group: "schedules" },
          { deleteSchedules: false, group: "schedules" },
          { group: "schedules", viewScheduleOrder: false },
          { createEditScheduleOrder: false, group: "schedules" },
          { group: "schedules", viewScheduleReport: false },
          { createEditScheduleReport: false, group: "schedules" },
          { group: "schedules", viewScheduleAlert: false },
          { createEditScheduleAlert: false, group: "schedules" },
          {
            group: "schedules",
            viewGlobalSchedule: false,
          },
          {
            createEditGlobalSchedule: false,
            group: "schedules",
          },
          { group: "schedules", viewScheduleProvisionalCredit: false },
          { createEditScheduleProvisionalCredit: false, group: "schedules" },
        ],
        [
          { accessReports: false, group: "reporting" },
          { accessReportTypes: [], group: "reporting" },
        ],
        [
          {
            accessWidgets: false,
            group: "widgets",
          },
          {
            accessWidgetTypes: [],
            group: "widgets",
          },
        ],
      ];

      // act
      const act = selectPermissions(state as any);

      // assert
      expect(act).toEqual(expected);
    });
  });
});
