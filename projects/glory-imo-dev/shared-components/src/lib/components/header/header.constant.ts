import { ModalButton } from "../modal/modal.component";
import * as tokens from "../../../assets/i18n/token.json";
import { AlertDialogData } from "../alert/alert.model";
const { inform } = tokens;

export class UserInformationSettings {
  public static profile = inform.common.menuPersonProfile;
  public static labelIconPerson = "person";
  public static modalConfig = {
    width: "50rem",
    height: "52rem",
    panelClass: "dialog-information",
    buttons: [{ name: inform.common.buttonOk, value: true }] as ModalButton[],
  };

  public static modalReleaseSetting = {
    width: "50rem",
    maxHeight: "39.875rem",
    panelClass: "dialog-release-notes",
    buttons: [{ name: inform.common.buttonOk, value: true }] as ModalButton[],
  };
  public static releaseNotes = inform.common.menuPersonReleaseNotes;

  public static modalLicensesSetting = {
    width: "50rem",
    maxHeight: "39.875rem",
    panelClass: "dialog-licenses",
    buttons: [{ name: inform.common.buttonOk, value: true }] as ModalButton[],
  };
  public static licenses = inform.common.menuPersonLicenses;

  public static alertChangePasswordSetting: AlertDialogData = {
    text: inform.common.modalContentConfirmChangePassword,
    buttonLabels: {
      cancel: inform.common.buttonNo,
      ok: inform.common.buttonYes,
    },
    style: {
      width: "34.25rem",
      padding: "2rem 1rem 0.5625rem 0.5rem",
    },
  };

  public static changePassword = inform.common.menuPersonChangePassword;
}



export interface UserInformationResponse {
  fullName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  smsAddress: string;
  phoneNumber: string;
  countryCode: string;
  physicalAddress: string;
  city: string;
  state: string;
  postalCode: string;
  timezone: string;
  language: string;
  roles: Array<{ role: string; applicationId: number }>;
  permissions: {
    orders?: OrdersPermissions;
    tracking: TrackingPermissions;
    cits?: CitsPermissions;
    devices?: DevicesPermissions;
    locations?: LocationsPermissions;
    calendars?: CalendarsPermissions;
    rolesOfManage?: RolesPermissions;
    rolesOfInform?: RolesPermissions;
    schedules: SchedulesPermissions;
    reporting: ReportingPermissions;
    widgets: WidgetsPermissions;
  };
  otherApplicationLinks: Array<{
    applicationName: string;
    applicationUrl: string;
  }>;
  accessAbleApplicationIds: number[];
}


export interface UserInformation {
  lastUpdate?: string;
  fullName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  smsAddress: string;
  phoneNumber: string;
  countryCode: string;
  physicalAddress: string;
  city: string;
  state: string;
  postalCode: string;
  timezone: string;
  language: string;
  clientTimezone: string;
  clientDateTimeFormat: string;
  clientDateTimeSecondFormat?: string;
  roles: Role[];
  permissions: {
    orders?: OrdersPermissions;
    tracking: TrackingPermissions;
    cits?: CitsPermissions;
    devices?: DevicesPermissions;
    locations?: LocationsPermissions;
    calendars?: CalendarsPermissions;
    rolesOfManage?: RolesPermissions;
    rolesOfInform?: RolesPermissions;
    schedules: SchedulesPermissions;
    reporting: ReportingPermissions;
    widgets: WidgetsPermissions;
  };
  otherApplicationLinks: UserInformationResponse["otherApplicationLinks"];
  accessAbleApplicationIds: number[];
}

export interface Permission {
  [key: string]: any;
  group: string;
}

export interface Role {
  role: string;
  applicationId: number;
}

export interface DynamicKeyValue {
  [key: string]: any;
}

export interface FailedReason {
  code?: number;
  reason?: string;
}

export interface OrdersPermissions {
  accessOrders: boolean;
  editOrders: boolean;
  deleteOrders: boolean;
  manualCreateEditStandardOrders: boolean;
  manualCreateEditEmergencyOrders: boolean;
  manualOverrideCitStandardOptions: boolean;
  manualPrintOrders: boolean;
  manualPrintAllFormats: boolean;
  manualRequestOrders: boolean;
  manualApproveOrders: boolean;
  manualRejectOrders: boolean;
  manualStopApprovedOrders: boolean;
  manualSendOrders: boolean;
  automaticEditOrders: boolean;
  automaticOverrideCitOptions: boolean;
  automaticPrintOrders: boolean;
  automaticPrintAllFormats: boolean;
  automaticRequestOrders: boolean;
  automaticApproveOrders: boolean;
  automaticRejectOrders: boolean;
  automaticStopApprovedOrders: boolean;
  automaticSendOrders: boolean;
  accessProvisionalCredit: boolean;
  accessProvisionalCreditPrintTransferFile: boolean;
  accessProvisionalCreditPrintTransferFilePrintAllFormats: boolean;
  accessProvisionalCreditSendTransferFile: boolean;
}

export interface TrackingPermissions {
  accessTransaction: boolean;
  accessTransactionAddComments: boolean;
  accessTransactionShowSourceData: boolean;
  accessTransactionAllowAddingTransaction: boolean;
  accessInventory: boolean;
  accessInventoryViewPieces: boolean;
  accessInventoryViewValues: boolean;
  accessInventoryHistory: boolean;
}

export interface CitsPermissions {
  viewCits: boolean;
  createEditCits: boolean;
  deleteCits: boolean;
  viewGeneralSettings: boolean;
  createEditGeneralSettings: boolean;
  viewOrdersSettings: boolean;
  createEditOrdersSettings: boolean;
  viewServicesSettings: boolean;
  createEditServicesSettings: boolean;
  viewLocationsSettings: boolean;
  createEditLocationsSettings: boolean;
  viewCalendarsSettings: boolean;
  createEditCalendarsSettings: boolean;
  viewProvisionalCreditSettings: boolean;
  createEditProvisionalCreditSettings: boolean;
}

export interface DevicesPermissions {
  viewDevices: boolean;
  createEditDevices: boolean;
  deleteDevices: boolean;
}

export interface LocationsPermissions {
  viewLocations: boolean;
  createEditLocations: boolean;
  deleteLocations: boolean;
  viewGeneralSettings: boolean;
  createEditGeneralSettings: boolean;
  viewDeviceSettings: boolean;
  createEditDeviceSettings: boolean;
  viewCitSettings: boolean;
  createEditCitSettings: boolean;
  viewCurrencySettings: boolean;
  createEditCurrencySettings: boolean;
  viewCalendarSettings: boolean;
  createEditCalendarSettings: boolean;
  viewOrderSettings: boolean;
  createEditOrderSettings: boolean;
  viewProvisionalCreditSettings: boolean;
  createEditProvisionalCreditSettings: boolean;
}

export interface CalendarsPermissions {
  viewCalendars: boolean;
  createEditCalendars: boolean;
  deleteCalendars: boolean;
  viewServiceSettings: boolean;
  createEditServiceSettings: boolean;
  viewServiceLocationsSettings: boolean;
  createEditServiceLocationsSettings: boolean;
  viewEmergencySettings: boolean;
  createEditEmergencySettings: boolean;
  viewEmergencyLocationsSettings: boolean;
  createEditEmergencyLocationsSettings: boolean;
  viewHolidaySettings: boolean;
  createEditHolidaySettings: boolean;
  viewHolidayLocationsSettings: boolean;
  createEditHolidayLocationsSettings: boolean;
  viewHolidayCitsSettings: boolean;
  createEditHolidayCitsSettings: boolean;
}

export interface RolesPermissions {
  viewRoles: boolean;
  createEditRoles: boolean;
  deleteRoles: boolean;
}

export interface SchedulesPermissions {
  viewSchedules: boolean;
  createEditSchedules: boolean;
  deleteSchedules: boolean;
  viewScheduleOrder?: boolean;
  createEditScheduleOrder?: boolean;
  viewScheduleReport: boolean;
  createEditScheduleReport: boolean;
  viewScheduleAlert: boolean;
  createEditScheduleAlert: boolean;
  viewGlobalSchedule?: boolean;
  createEditGlobalSchedule?: boolean;
  viewScheduleProvisionalCredit?: boolean;
  createEditScheduleProvisionalCredit?: boolean;
  reAssignScheduleAlert: boolean;
  reAssignScheduleReport: boolean;
}

export interface ReportingPermissions {
  accessReports: boolean;
  accessReportTypes: Array<string>;
}
export interface WidgetsPermissions {
  accessWidgets: boolean;
  accessWidgetTypes: string[];
}


export interface State {
  userInformation: UserInformation;
}

export const initialState: State = {
  userInformation: {
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
      rolesOfInform: {
        viewRoles: false,
        createEditRoles: false,
        deleteRoles: false,
      },
      rolesOfManage: {
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
        createEditScheduleProvisionalCredit: false,
        viewScheduleProvisionalCredit: false,
        reAssignScheduleAlert: false,
        reAssignScheduleReport: false,
      },
      reporting: {
        accessReports: false,
        accessReportTypes: [],
      },
      widgets: {
        accessWidgets: false,
        accessWidgetTypes: [],
      },
    },
    clientDateTimeFormat: undefined,
    clientDateTimeSecondFormat: undefined,
    clientTimezone: undefined,
    otherApplicationLinks: [],
    accessAbleApplicationIds: [],
  },
};
