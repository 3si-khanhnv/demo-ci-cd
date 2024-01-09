import { TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { AppState } from "../../stores";
import { GetUserInformation, GetUserInformationSuccess } from "../../stores/user-information/user-information";
import { UserInformation } from "../../stores/user-information/user-information.model";
import { BackendService, IJsonLanguage } from "../backend";
import { CookieService } from "../cookie/cookie.service";
import { UserInformationService } from "./user-information.service";
import { LanguageService } from "../languages/languages.service";

const permissions = {
  orders: {
    accessOrders: false,
    editOrders: false,
    deleteOrders: false,
    automaticEditOrders: false,
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

const manageApplicationId = 4;
const informApplicationId = 5;
const clientTimezone = "UTC";
const reportDatetimeFormat = "YYYY-MM-DD hh:mm:ss";
jest.mock("../config/config.service", () => {
  return {
    manageApplicationId: 4,
    informApplicationId: 5,
    confClientFormats: {
      clientTimezone: "UTC",
      reportDatetimeFormat: "YYYY-MM-DD hh:mm:ss",
    },
  };
});

const sampleData: UserInformation = {
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
  clientDateTimeFormat: reportDatetimeFormat,
  clientTimezone,
  otherApplicationLinks: [
    {
      applicationName: "",
      applicationUrl: "",
    },
  ],
  accessAbleApplicationIds: [manageApplicationId, informApplicationId],
};

const sampleState: Pick<AppState, "userInformation"> = {
  userInformation: {
    userInformation: sampleData,
  },
};

class BackendServiceMock {
  getUserInformation = jest.fn();
  getJsonLanguage = jest.fn();
}

class CookieServiceMock {
  isCookieValid = jest.fn();
}

class LanguageServiceMock {
  enable = jest.fn();
}

describe("UserInformationService", () => {
  let service: UserInformationService;
  let store: Store<AppState>;
  let backendService: jest.Mocked<BackendService>;
  let cookieService: jest.Mocked<CookieService>;
  let languageService: jest.Mocked<LanguageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            userInformation: (state) => state,
          },
          {
            initialState: sampleState,
            runtimeChecks: {
              strictActionImmutability: true,
              strictActionSerializability: true,
              strictStateImmutability: true,
              strictStateSerializability: true,
            },
          },
        ),
      ],
      providers: [
        { provide: BackendService, useClass: BackendServiceMock },
        { provide: CookieService, useClass: CookieServiceMock },
        { provide: LanguageService, useClass: LanguageServiceMock },
      ],
    }),
      (service = TestBed.inject(UserInformationService));
    store = TestBed.inject(Store);
    backendService = TestBed.inject(BackendService) as jest.Mocked<BackendService>;
    cookieService = TestBed.inject(CookieService) as jest.Mocked<CookieService>;
    languageService = TestBed.inject(LanguageService) as jest.Mocked<LanguageService>;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe(UserInformationService.prototype.getUserInformation.name, () => {
    it("should select data from store", (done) => {
      // arrange
      const expected = sampleState.userInformation.userInformation;
      // act
      const observable = service.getUserInformation();

      // assert
      observable.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("Should not complete"),
      });
    });
  });

  describe(UserInformationService.prototype.fetchUserInformation.name, () => {
    it("should dispatch GetUserInformation action", () => {
      // arrange
      const expected = new GetUserInformation();
      jest.spyOn(store, "dispatch");

      // act
      service.fetchUserInformation();

      // assert
      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });
  });

  describe(UserInformationService.prototype.initUserData.name, () => {
    it("should dispatch GetUserInformationSuccess action", async () => {
      // arrange
      const userInformationSample: UserInformation = sampleData;
      jest.spyOn(backendService, "getUserInformation").mockReturnValue(of(userInformationSample));
      jest.spyOn(backendService, "getJsonLanguage").mockReturnValue(of({} as IJsonLanguage));
      jest.spyOn(cookieService, "isCookieValid").mockReturnValue(true);
      jest.spyOn(languageService, "enable");
      jest.spyOn(store, "dispatch").mockImplementation(() => {});
      const expected = new GetUserInformationSuccess(sampleData);

      // act
      await service.initUserData();

      // assert
      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });

    it("should be call resolve with true", () => {
      // arrange
      jest.spyOn(cookieService, "isCookieValid").mockReturnValue(false);
      jest.spyOn(languageService, "enable");

      // act
      const act = service.initUserData();

      // assert
      act.then((value) => {
        expect(value).toEqual(true);
      });
    });
  });

  describe(UserInformationService.prototype.getUserCanAccessInThisApp.name, () => {
    it("should return true when this app id includes list access able application ids", (done) => {
      // arrange
      const mockUser: UserInformation = { ...sampleData, accessAbleApplicationIds: [1, manageApplicationId] };
      jest.spyOn(service, "getUserInformation").mockReturnValue(of(mockUser));

      // act
      const act = service.getUserCanAccessInThisApp();

      // assert
      act.subscribe({
        next: (result) => {
          expect(service.getUserInformation).toHaveBeenCalledTimes(1);
          expect(result).toEqual(true);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return false when this app id not includes list access able application ids", (done) => {
      // arrange
      const mockUser: UserInformation = { ...sampleData, accessAbleApplicationIds: [] };
      jest.spyOn(service, "getUserInformation").mockReturnValue(of(mockUser));

      // act
      const act = service.getUserCanAccessInThisApp();

      // assert
      act.subscribe({
        next: (result) => {
          expect(service.getUserInformation).toHaveBeenCalledTimes(1);
          expect(result).toEqual(false);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });
  });
});
