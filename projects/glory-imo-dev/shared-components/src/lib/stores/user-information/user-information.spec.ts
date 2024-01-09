import { TestBed } from "@angular/core/testing";
import { Action, StoreModule } from "@ngrx/store";
import {
  UserInformationActionTypes,
  GetUserInformation,
  GetUserInformationFailure,
  GetUserInformationSuccess,
  userInformationInitialState,
  userInformationProjectors,
  OldUserInformationState,
  userInformationOldReducer,
} from "./user-information";
import { UserInformation } from "./user-information.model";

const userInformationSample: UserInformation = {
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
      createEditGlobalSchedule: false,
      viewGlobalSchedule: false,
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
  lastUpdate: undefined,
  otherApplicationLinks: [],
  accessAbleApplicationIds: [],
};

describe("Store for user information", () => {
  describe("create action", () => {
    (<{ name: string; action: Action; expected: string }[]>[
      {
        name: "GetUserInformation should create an action",
        action: new GetUserInformation(),
        expected: UserInformationActionTypes.GetUserInformation,
      },
      {
        name: "GetUserInformationSuccess should create an action",
        action: new GetUserInformationSuccess({} as UserInformation),
        expected: UserInformationActionTypes.GetUserInformationSuccess,
      },
      {
        name: "GetUserInformationFailure should create an action",
        action: new GetUserInformationFailure({}),
        expected: UserInformationActionTypes.GetUserInformationFailure,
      },
    ]).forEach(({ name, action, expected }) =>
      it(`${name}`, () => {
        expect(action.type).toEqual(expected);
      }),
    );
  });

  describe("user information Reducer", () => {
    describe(userInformationOldReducer.name, () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot(userInformationOldReducer)],
        });
      });

      it("should be initial state", () => {
        // arrange
        const input: any = { type: "@ngrx/init" };

        // act
        const actual = userInformationOldReducer(undefined, input);

        // assert
        expect(actual).toEqual(userInformationInitialState.userInformation);
      });

      it("GetUserInformation should add userInformationReducer in store", () => {
        // act
        const actual = userInformationOldReducer(userInformationInitialState.userInformation, new GetUserInformation());

        // assert
        expect(actual).toEqual(userInformationSample);
      });

      it("GetUserInformationSuccess should add userInformationReducer in store", () => {
        // act
        const actual = userInformationOldReducer(userInformationInitialState.userInformation, new GetUserInformationSuccess(userInformationSample));

        // assert
        expect(actual).toEqual(userInformationSample);
      });
    });
  });

  describe("projectors", () => {
    const state: OldUserInformationState = {
      userInformation: userInformationInitialState.userInformation,
    };

    it("should return userInformation", () => {
      // act
      const actual = userInformationProjectors.userInformation(state);

      // assert
      expect(actual).toEqual(state.userInformation);
    });
  });
});
