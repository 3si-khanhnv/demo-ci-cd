import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { HeaderComponent } from "./header.component";
import { MatDialog } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";
import { UserInformation } from "../../stores/user-information/user-information.model";
import { ReleaseNotes } from "../release-notes/release-notes.component.i";
import { HeaderModule } from "./header.module";
import { TranslateModule } from "@ngx-translate/core";

class MatDialogMock {
  open = jest.fn();
}

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      // declarations: [HeaderComponent],
      imports: [HeaderModule, TranslateModule.forRoot()],
      providers: [{ provide: MatDialog, useClass: MatDialogMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    (component.userInformation = {
      lastUpdate: "24/02/2023",
      fullName: "Joe Bloggs",
      firstName: "John",
      lastName: "Doe",
      emailAddress: "Joe.Bloggs@server.com",
      smsAddress: "447890123456",
      phoneNumber: "441234567890",
      countryCode: "44",
      physicalAddress: "123 Some st",
      city: "Edinburgh",
      state: "West Lothian",
      postalCode: "AA1 1AA",
      timezone: "Europe/London",
      language: "English",
      clientTimezone: "string",
      clientDateTimeFormat: "string",
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
        },
        reporting: {
          accessReports: false,
          accessReportTypes: [],
        },
      },
      otherApplicationLinks: [
        {
          applicationName: "string",
          applicationUrl: "string",
        },
      ],
    } as UserInformation),
      (component.tabs = []);
    // language = TestBed.inject(LanguageService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onClickOutsideUserMenu", () => {
    it("should click outside hide user icon", () => {
      // arrange
      const debugEl: HTMLElement = fixture.debugElement.nativeElement;
      const user: HTMLElement = debugEl.querySelector("div");
      // act
      user.click();
      // assert
      expect(component.isUserMenuOpened).toEqual(false);
    });

    it("should click outside not hide user icon", () => {
      // arrange
      const debugEl: HTMLElement = fixture.debugElement.nativeElement;
      const user: HTMLElement = debugEl.querySelector("mat-icon");
      // act
      user.click();
      // assert
      expect(component.isUserMenuOpened).toEqual(true);
    });
  });

  describe("onClickTitle", () => {
    it("should call clickedTitle", () => {
      // arrange
      const spy = jest.spyOn(component.clickedTitle, "emit");
      // act
      component.onClickTitle();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onChangedTab", () => {
    it("should call onChangedTab and emit changedTab", (done) => {
      const tab = "tab1";
      component.changedTab.subscribe({
        next: (actual) => {
          expect(actual).toEqual(tab);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onChangedTab(tab);
    });
  });

  describe("onClickUserIcon", () => {
    it("should call clickedUserIcon", () => {
      // arrange
      const spy = jest.spyOn(component.clickedUserIcon, "emit");
      // act
      component.onClickUserIcon();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onClickUserMenu", () => {
    it("should call selectedUserMenu with selected", () => {
      // arrange
      const expected = "menu";
      const spy = jest.spyOn(component.selectedUserMenu, "emit");
      // act`
      component.onClickUserMenu(expected);
      // assert
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe("openUserInformationPopup", () => {
    it("should call modal open", () => {
      // arrange
      const spy = jest.spyOn(dialog, "open");

      // act
      component.openUserInformationPopup();

      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("openReleaseNotesPopup", () => {
    it("should call modal open", () => {
      // arrange
      const spy = jest.spyOn(dialog, "open");

      // act
      component.openReleaseNotesPopup();

      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onClickUserInformation", () => {
    it("should call onClickUserInformation method", () => {
      // arrange
      const spy = jest.spyOn(component, "onClickUserInformation");
      component.isUserMenuOpened = true;
      component.userInformation = <UserInformation>{ fullName: "Join" };

      // act
      fixture.detectChanges();
      const selectModal = fixture.debugElement.query(By.css(".profile"));
      selectModal.triggerEventHandler("click", 1);

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("openLicensesPopup", () => {
    it("should call modal open", () => {
      // arrange
      const spy = jest.spyOn(dialog, "open");

      // act
      component.openLicensesPopup();

      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onClickReleaseNotes", () => {
    it("should call onClickReleaseNotes method", () => {
      // arrange
      const spy = jest.spyOn(component, "onClickReleaseNotes");
      component.isUserMenuOpened = true;
      component.userInformation = <UserInformation>{ fullName: "Join" };
      component.releaseNotes = <ReleaseNotes>{ "1.0.0": { fixed: ["fixed1"], new: ["feature"] } };

      // act
      fixture.detectChanges();
      const selectModal = fixture.debugElement.query(By.css(".release-notes"));
      selectModal.triggerEventHandler("click", 1);

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("onClickLicenses", () => {
    it("should call onClickLicenses method", () => {
      // arrange
      const spy = jest.spyOn(component, "onClickLicenses");
      component.isUserMenuOpened = true;
      component.userInformation = <UserInformation>{ fullName: "Join" };
      component.licenses = "string";

      // act
      fixture.detectChanges();
      const selectModal = fixture.debugElement.query(By.css(".licenses"));
      selectModal.triggerEventHandler("click", 1);

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("onClickChangePassword", () => {
    it("should call onClickChangePassword method", () => {
      // arrange
      const spy1 = jest.spyOn(component.clickedShowAlertChangePassword, "emit");
      const expected = component.settings.alertChangePasswordSetting;

      // act
      fixture.detectChanges();
      component.onClickChangePassword();

      // assert
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy1).toHaveBeenCalledWith(expected);
    });
  });

  describe("openedOtherApp", () => {
    it("should emit orther app", () => {
      // arrange
      const expected = "tab";
      const spy = jest.spyOn(component.openOtherApp, "emit");
      // act
      component.openedOtherApp(expected);
      // assert
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });
});
