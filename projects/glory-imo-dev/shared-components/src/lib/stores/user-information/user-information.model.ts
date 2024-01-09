import { UserInformationResponse } from "../../services/backend";

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
}

export interface ReportingPermissions {
  accessReports: boolean;
  accessReportTypes: Array<string>;
}
export interface WidgetsPermissions {
  accessWidgets: boolean;
  accessWidgetTypes: string[];
}
