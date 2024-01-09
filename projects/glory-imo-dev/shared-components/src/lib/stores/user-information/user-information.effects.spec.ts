import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import moment from "moment";
import { Observable, of, throwError } from "rxjs";
import { marbles } from "rxjs-marbles/jest";
import { BackendService, UserInformationResponse } from "../../services/backend";
import { GetUserInformation, GetUserInformationFailure, GetUserInformationSuccess } from "./user-information";
import { UserInformationEffects } from "./user-information.effects";
import { UserInformation } from "./user-information.model";

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
};

const userInformation: UserInformation = {
  lastUpdate: moment().format("YYYY-MM-DD HH:MM:ss"),
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

describe(UserInformationEffects.name, () => {
  let actions$: Observable<any>;
  let effects: UserInformationEffects;
  let service: jest.Mocked<BackendService>;

  class MockBackEndService {
    public getUserInformation = jest.fn();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInformationEffects, provideMockActions(() => actions$), { provide: BackendService, useClass: MockBackEndService }],
      imports: [HttpClientModule],
    });

    effects = TestBed.inject(UserInformationEffects);
    service = TestBed.inject(BackendService) as jest.Mocked<BackendService>;
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });

  describe("UserInformationEffects getUserInformation", () => {
    const RealDate = Date;

    beforeAll(() => {
      const offsetTime = new Date().getTimezoneOffset() * 60 * 1000;
      const time = new Date("2022-01-15T00:00:00.000Z").getTime() + offsetTime;
      global.Date.now = jest.fn(() => time);
    });

    afterAll(() => {
      global.Date = RealDate;
    });

    it(
      "should dispatch GetUserInformationSuccess with response from backend API",
      marbles((m) => {
        // arrange
        const res: UserInformationResponse = {
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
          otherApplicationLinks: [],
          accessAbleApplicationIds: [],
        };

        const lastUpdate = moment().format("YYYY-MM-DD HH:MM:ss");
        service.getUserInformation.mockReturnValue(of({ ...res, lastUpdate }));

        const action = new GetUserInformation();
        const completion = new GetUserInformationSuccess({ ...userInformation, lastUpdate });

        actions$ = m.hot("---a--a-a-", { a: action });
        const expected = m.cold("---x--x-x-", { x: completion });

        // act
        const actual = effects.getUserInformation;

        // assert
        m.expect(actual).toBeObservable(expected);
      }),
    );

    it(
      "should dispatch GetUserInformationFailure when failed to request",
      marbles((m) => {
        // arrange
        const response = {
          reason: "unknown",
        };
        service.getUserInformation.mockReturnValue(throwError(new Error("unknown")));

        const action = new GetUserInformation();
        const completion = new GetUserInformationFailure(response);

        actions$ = m.hot("---a--a-a-", { a: action });
        const expected = m.cold("---x--x-x-", { x: completion });

        // act
        const actual = effects.getUserInformation;

        // assert
        m.expect(actual).toBeObservable(expected);
      }),
    );
  });
});
