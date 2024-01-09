import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { UserInformation } from "../../stores/user-information/user-information.model";
import { UserInformationService } from "../user-information/user-information.service";
import { PermissionService } from "./permission.service";
import { Router } from "@angular/router";

const permission = {
  orders: {
    accessOrders: true,
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
    viewLocations: true,
    createEditLocations: true,
    deleteLocations: true,
    viewGeneralSettings: true,
    createEditGeneralSettings: true,
    viewDeviceSettings: true,
    createEditDeviceSettings: true,
    viewCitSettings: true,
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
    viewRoles: true,
    createEditRoles: false,
    deleteRoles: false,
  },
  rolesOfInform: {
    viewRoles: true,
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

const userInformationData: UserInformation = {
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
  permissions: permission,
  clientDateTimeFormat: undefined,
  clientTimezone: undefined,
  otherApplicationLinks: [],
  accessAbleApplicationIds: [],
};

class UserInformationServiceMock {
  getUserInformation = jest.fn().mockReturnValue(of(userInformationData));
  getUserCanAccessInThisApp = jest.fn();
}

describe("PermissionService", () => {
  let service: PermissionService;
  let router: Router;
  let userInfoService: UserInformationService;

  beforeEach(async () => {
    jest.restoreAllMocks();

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: UserInformationService, useClass: UserInformationServiceMock }],
    });

    service = TestBed.inject(PermissionService);
    router = TestBed.inject(Router);
    userInfoService = TestBed.inject(UserInformationService) as jest.Mocked<UserInformationService>;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
    expect(router).toBeTruthy();
    expect(userInfoService).toBeTruthy();
  });

  it("constant value", () => {
    expect(service.pagesInTab).toEqual(["ordering", "tracking", "reporting", "setup"]);
  });

  describe(PermissionService.prototype.checkPermission.name, () => {
    it("should return true when uri is ''", (done) => {
      // arrange
      const uri = "";
      // act
      const act = service.checkPermission(uri);

      // assert
      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(true);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return true when uri is 'dashboard'", (done) => {
      // arrange
      const uri = "dashboard";
      // act
      const act = service.checkPermission(uri);

      // assert
      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(true);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return true when uri is a page list", (done) => {
      // arrange
      const uri = "orders";
      // act
      const act = service.checkPermission(uri);

      // assert
      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(true);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return true when uri is a page edit has no permission edit but has permission view", (done) => {
      // arrange
      const uri = "edit-order";
      jest.spyOn(service, "checkPermissionPagesInHeaderTab");

      // act
      const act = service.checkPermission(uri);

      // assert
      act.subscribe({
        next: (actual) => {
          expect(service.checkPermissionPagesInHeaderTab).not.toHaveBeenCalled();
          expect(actual).toEqual(true);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return false when uri is a page edit has no permission edit and has no permission view", (done) => {
      // arrange
      const uri = "edit-calendar";
      jest.spyOn(service, "checkPermissionPagesInHeaderTab");

      // act
      const act = service.checkPermission(uri);

      // assert
      act.subscribe({
        next: (actual) => {
          expect(service.checkPermissionPagesInHeaderTab).not.toHaveBeenCalled();
          expect(actual).toEqual(false);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return true when permission = accessProvisionalCredit and uri is a page list", (done) => {
      // arrange
      const uri = "provisional-credit";
      jest.spyOn(service, "checkPermissionPagesInHeaderTab");

      // act
      const act = service.checkPermission(uri);

      // assert
      act.subscribe({
        next: (actual) => {
          expect(service.checkPermissionPagesInHeaderTab).not.toHaveBeenCalled();
          expect(actual).toEqual(false);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should check permission of pages in header tabs", (done) => {
      // arrange
      const uri = "setup";
      jest.spyOn(service, "checkPermissionPagesInHeaderTab");

      // act
      const act = service.checkPermission(uri);

      // assert
      act.subscribe({
        next: (actual) => {
          expect(service.checkPermissionPagesInHeaderTab).toHaveBeenCalledWith("setup", userInformationData.permissions);
          expect(actual).toEqual(true);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });
  });

  describe(PermissionService.prototype.getPermissionsByGroup.name, () => {
    it("should return value by group", (done) => {
      const permissionPage = "tracking";
      const act = service.getPermissionsByGroup(permissionPage);

      const expected = {
        accessInventory: false,
        accessInventoryViewPieces: false,
        accessInventoryViewValues: false,
        accessTransaction: false,
        accessTransactionAddComments: false,
        accessTransactionAllowAddingTransaction: false,
        accessTransactionShowSourceData: false,
        accessInventoryHistory: false,
      };

      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });
  });

  describe(PermissionService.prototype.checkPermissions.name, () => {
    it("should return permission is false with condition is AND-1", (done) => {
      const group = "schedules";
      const condition = "AND-1";
      const permissionsPrams: string[] = [
        "viewSchedules",
        "createEditSchedules",
        "viewScheduleOrder",
        "createEditScheduleOrder",
        "viewScheduleReport",
        "createEditScheduleReport",
        "viewScheduleAlert",
        "createEditScheduleAlert",
      ];
      const act = service.checkPermissions(group, condition, ...permissionsPrams);

      const expected = false;

      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return permission is true with condition is OR-0", (done) => {
      const group = "schedules";
      const condition = "OR-0";
      const permissionsPrams: string[] = [
        "createEditSchedules",
        "createEditScheduleOrder",
        "createEditScheduleReport",
        "createEditScheduleAlert",
      ];
      const act = service.checkPermissions(group, condition, ...permissionsPrams);

      const expected = true;

      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return permission deleteSchedules is true with condition is AND-0", (done) => {
      const group = "schedules";
      const condition = "AND-0";
      const permissionsPrams: string[] = ["deleteSchedules"];
      const act = service.checkPermissions(group, condition, ...permissionsPrams);

      const expected = true;

      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return permission deleteSchedules is false with condition is OR-1", (done) => {
      const group = "schedules";
      const condition = "OR-1";
      const permissionsPrams: string[] = ["deleteSchedules"];
      const act = service.checkPermissions(group, condition, ...permissionsPrams);

      const expected = false;

      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return permission viewRoles is true with condition is OR-1", (done) => {
      const group = "rolesOfManage";
      const condition = "OR-1";
      const permissionsPrams: string[] = ["viewRoles"];
      const act = service.checkPermissions(group, condition, ...permissionsPrams);

      const expected = true;

      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return permission viewRoles is true with condition is AND-1", (done) => {
      const group = "rolesOfManage";
      const condition = "AND-1";
      const permissionsPrams: string[] = ["viewRoles"];
      const act = service.checkPermissions(group, condition, ...permissionsPrams);

      const expected = true;

      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return permission viewRoles is false with condition is AND-0", (done) => {
      const group = "rolesOfManage";
      const condition = "AND-0";
      const permissionsPrams: string[] = ["viewRoles"];
      const act = service.checkPermissions(group, condition, ...permissionsPrams);

      const expected = false;

      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });

    it("should return permission viewRoles is false with condition is OR-0", (done) => {
      const group = "rolesOfManage";
      const condition = "OR-0";
      const permissionsPrams: string[] = ["viewRoles"];
      const act = service.checkPermissions(group, condition, ...permissionsPrams);

      const expected = false;

      act.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (err) => {
          fail(err);
        },
      });
    });
  });

  describe(PermissionService.prototype.checkHavePermissionToAccessThisApp.name, () => {
    it("should return false redirect to dashboard when user not have permission in this app", () => {
      // arrange
      const uri = "orders";
      jest.spyOn(userInfoService, "getUserCanAccessInThisApp").mockReturnValue(of(false));
      jest.spyOn(router, "navigate").mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(true);
        });
      });
      const expectedRedirectToDashboard = ["/dashboard"];

      // act
      const act = service.checkHavePermissionToAccessThisApp(uri);

      // assert
      return act
        .toPromise()
        .then((actual) => {
          expect(actual).toEqual(false);
          expect(router.navigate).toHaveBeenCalledWith(expectedRedirectToDashboard);
        })
        .catch((err) => fail(err));
    });

    it("should return false not redirect to 'dashboard' when user not have permission in this app and current url is 'dashboard'", () => {
      // arrange
      jest.restoreAllMocks();
      const uri = "dashboard";
      jest.spyOn(userInfoService, "getUserCanAccessInThisApp").mockReturnValue(of(false));
      jest.spyOn(router, "navigate");

      // act
      const act = service.checkHavePermissionToAccessThisApp(uri);

      // assert
      return act
        .toPromise()
        .then((actual) => {
          expect(actual).toEqual(false);
          expect(router.navigate).toHaveBeenCalledTimes(0);
        })
        .catch((err) => fail(err));
    });

    it("should return true not redirect page when user have permission in this app", () => {
      // arrange
      const uri = "orders";
      jest.spyOn(router, "navigate");
      jest.spyOn(userInfoService, "getUserCanAccessInThisApp").mockReturnValue(of(true));

      // act
      const act = service.checkHavePermissionToAccessThisApp(uri);

      // assert
      return act
        .toPromise()
        .then((actual) => {
          expect(actual).toEqual(true);
          expect(router.navigate).toHaveBeenCalledTimes(0);
        })
        .catch((err) => fail(err));
    });
  });

  describe(PermissionService.prototype.checkPermissionPagesInHeaderTab.name, () => {
    it("should return permission page ordering", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        orders: {
          accessOrders: false,
          accessProvisionalCredit: false,
        },
      } as UserInformation["permissions"];
      const expected = false;
      jest.spyOn(service, "checkPermissionPageOrdering");

      // act
      const act = service.checkPermissionPagesInHeaderTab("ordering", userPermissions);

      // assert
      expect(act).toEqual(expected);
      expect(service.checkPermissionPageOrdering).toHaveBeenCalledWith(userPermissions);
    });

    it("should return permission page tracking", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        tracking: {
          accessInventory: false,
          accessInventoryHistory: false,
          accessTransaction: false,
        },
      } as UserInformation["permissions"];
      const expected = false;
      jest.spyOn(service, "checkPermissionPageTracking");

      // act
      const act = service.checkPermissionPagesInHeaderTab("tracking", userPermissions);

      // assert
      expect(act).toEqual(expected);
      expect(service.checkPermissionPageTracking).toHaveBeenCalledWith(userPermissions);
    });

    it("should return permission page reporting", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        reporting: {
          accessReports: false,
          accessReportTypes: [],
        },
      } as UserInformation["permissions"];
      const expected = false;
      jest.spyOn(service, "checkPermissionPageReporting");

      // act
      const act = service.checkPermissionPagesInHeaderTab("reporting", userPermissions);

      // assert
      expect(act).toEqual(expected);
      expect(service.checkPermissionPageReporting).toHaveBeenCalledWith(userPermissions);
    });

    it("should return permission page setup", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        calendars: {
          viewCalendars: false,
        },
        cits: {
          viewCits: false,
        },
        devices: {
          viewDevices: false,
        },
        locations: {
          viewLocations: false,
        },
        rolesOfManage: {
          viewRoles: false,
        },
        rolesOfInform: {
          viewRoles: false,
        },
        schedules: {
          viewSchedules: false,
        },
      } as UserInformation["permissions"];
      const expected = false;
      jest.spyOn(service, "checkPermissionPageSetup");

      // act
      const act = service.checkPermissionPagesInHeaderTab("setup", userPermissions);

      // assert
      expect(act).toEqual(expected);
      expect(service.checkPermissionPageSetup).toHaveBeenCalledWith(userPermissions);
    });
  });

  describe(PermissionService.prototype.checkPermissionPageOrdering.name, () => {
    it("should have permission when user can access page orders list", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        orders: {
          accessOrders: true,
          accessProvisionalCredit: false,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageOrdering(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should have permission when user can access page provisional credit list", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        orders: {
          accessOrders: false,
          accessProvisionalCredit: true,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageOrdering(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should not have permission when user can't access page provisional credit list and orders list", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        orders: {
          accessOrders: false,
          accessProvisionalCredit: false,
        },
      } as UserInformation["permissions"];
      const expected = false;

      // act
      const act = service.checkPermissionPageOrdering(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe(PermissionService.prototype.checkPermissionPageTracking.name, () => {
    it("should have permission when user can access page inventory history", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        tracking: {
          accessInventory: false,
          accessInventoryHistory: true,
          accessTransaction: false,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageTracking(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should have permission when user can access page current inventory", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        tracking: {
          accessInventory: true,
          accessInventoryHistory: false,
          accessTransaction: false,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageTracking(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should have permission when user can access page transactions", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        tracking: {
          accessInventory: false,
          accessInventoryHistory: false,
          accessTransaction: true,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageTracking(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should not have permission when user can't access page provisional inventory history, current inventory and transactions", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        tracking: {
          accessInventory: false,
          accessInventoryHistory: false,
          accessTransaction: false,
        },
      } as UserInformation["permissions"];
      const expected = false;

      // act
      const act = service.checkPermissionPageTracking(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe(PermissionService.prototype.checkPermissionPageReporting, () => {
    it("should have permission when user can access page reporting", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        reporting: {
          accessReports: true,
          accessReportTypes: ["collect capacity"],
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageReporting(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should not have permission when user can access page reports but not have any report to access", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        reporting: {
          accessReports: true,
          accessReportTypes: [],
        },
      } as UserInformation["permissions"];
      const expected = false;

      // act
      const act = service.checkPermissionPageReporting(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should not have permission when user can't access page reports", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        reporting: {
          accessReports: false,
          accessReportTypes: [],
        },
      } as UserInformation["permissions"];
      const expected = false;

      // act
      const act = service.checkPermissionPageReporting(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });
  });

  describe(PermissionService.prototype.checkPermissionPageSetup.name, () => {
    it("should have permission when user can access page calendars", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        calendars: {
          viewCalendars: true,
        },
        cits: {
          viewCits: false,
        },
        devices: {
          viewDevices: false,
        },
        locations: {
          viewLocations: false,
        },
        rolesOfManage: {
          viewRoles: false,
        },
        rolesOfInform: {
          viewRoles: false,
        },
        schedules: {
          viewSchedules: false,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageSetup(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should have permission when user can access page cits", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        calendars: {
          viewCalendars: false,
        },
        cits: {
          viewCits: true,
        },
        devices: {
          viewDevices: false,
        },
        locations: {
          viewLocations: false,
        },
        rolesOfManage: {
          viewRoles: false,
        },
        rolesOfInform: {
          viewRoles: false,
        },
        schedules: {
          viewSchedules: false,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageSetup(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should have permission when user can access page devices", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        calendars: {
          viewCalendars: false,
        },
        cits: {
          viewCits: false,
        },
        devices: {
          viewDevices: true,
        },
        locations: {
          viewLocations: false,
        },
        rolesOfManage: {
          viewRoles: false,
        },
        rolesOfInform: {
          viewRoles: false,
        },
        schedules: {
          viewSchedules: false,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageSetup(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should have permission when user can access page locations", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        calendars: {
          viewCalendars: false,
        },
        cits: {
          viewCits: false,
        },
        devices: {
          viewDevices: false,
        },
        locations: {
          viewLocations: true,
        },
        rolesOfManage: {
          viewRoles: false,
        },
        rolesOfInform: {
          viewRoles: false,
        },
        schedules: {
          viewSchedules: false,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageSetup(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should have permission when user can access page roles manage", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        calendars: {
          viewCalendars: false,
        },
        cits: {
          viewCits: false,
        },
        devices: {
          viewDevices: false,
        },
        locations: {
          viewLocations: false,
        },
        rolesOfManage: {
          viewRoles: true,
        },
        rolesOfInform: {
          viewRoles: false,
        },
        schedules: {
          viewSchedules: false,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageSetup(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should have permission when user can access page roles inform", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        calendars: {
          viewCalendars: false,
        },
        cits: {
          viewCits: false,
        },
        devices: {
          viewDevices: false,
        },
        locations: {
          viewLocations: false,
        },
        rolesOfManage: {
          viewRoles: false,
        },
        rolesOfInform: {
          viewRoles: true,
        },
        schedules: {
          viewSchedules: false,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageSetup(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should have permission when user can access page schedules", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        calendars: {
          viewCalendars: false,
        },
        cits: {
          viewCits: false,
        },
        devices: {
          viewDevices: false,
        },
        locations: {
          viewLocations: false,
        },
        rolesOfManage: {
          viewRoles: false,
        },
        rolesOfInform: {
          viewRoles: false,
        },
        schedules: {
          viewSchedules: true,
        },
      } as UserInformation["permissions"];
      const expected = true;

      // act
      const act = service.checkPermissionPageSetup(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });

    it("should not have permission when user can't access page calendars, cits, devices, locations, roles and schedules", () => {
      // arrange
      const userPermissions: UserInformation["permissions"] = {
        calendars: {
          viewCalendars: false,
        },
        cits: {
          viewCits: false,
        },
        devices: {
          viewDevices: false,
        },
        locations: {
          viewLocations: false,
        },
        rolesOfManage: {
          viewRoles: false,
        },
        rolesOfInform: {
          viewRoles: false,
        },
        schedules: {
          viewSchedules: false,
        },
      } as UserInformation["permissions"];
      const expected = false;

      // act
      const act = service.checkPermissionPageSetup(userPermissions);

      // assert
      expect(act).toEqual(expected);
    });
  });
});
