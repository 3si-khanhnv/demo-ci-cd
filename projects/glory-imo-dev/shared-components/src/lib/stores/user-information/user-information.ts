import { Action, ActionReducer, combineReducers } from "@ngrx/store";
import { FailedReason, UserInformation } from "./user-information.model";

// Actions
export enum UserInformationActionTypes {
  GetUserInformation = "[User Information] Get user Information",
  GetUserInformationSuccess = "[User Information] Get user information success",
  GetUserInformationFailure = "[User Information] Get user information failure",
}

export class GetUserInformation implements Action {
  readonly type = UserInformationActionTypes.GetUserInformation;
  constructor() {}
}

export class GetUserInformationSuccess implements Action {
  readonly type = UserInformationActionTypes.GetUserInformationSuccess;
  constructor(public payload: UserInformation) {}
}

export class GetUserInformationFailure implements Action {
  readonly type = UserInformationActionTypes.GetUserInformationFailure;
  constructor(public payload: FailedReason) {}
}

export type UserInformationActionsUnion = GetUserInformation | GetUserInformationSuccess | GetUserInformationFailure;

export interface OldUserInformationState {
  userInformation: UserInformation;
}

export const userInformationInitialState: OldUserInformationState = {
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

// Reducers
export const userInformationMainReducer: ActionReducer<OldUserInformationState, Action> = combineReducers({
  userInformation: userInformationOldReducer,
});

export function userInformationOldReducer(state: UserInformation = userInformationInitialState.userInformation, action: UserInformationActionsUnion): UserInformation {
  switch (action.type) {
    case UserInformationActionTypes.GetUserInformation:
      return { ...state, lastUpdate: undefined };
    case UserInformationActionTypes.GetUserInformationSuccess: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

// Projectors
export const userInformationProjectors = {
  userInformation: (state: OldUserInformationState) => state.userInformation,
};
