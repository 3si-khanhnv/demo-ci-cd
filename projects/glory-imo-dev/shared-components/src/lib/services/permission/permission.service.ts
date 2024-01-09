import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Constant } from "../../constant";
import { capitalizeFirstLetter } from "../../utilities/common";
// import { UserInformation } from "@imo-micro-fe/shared";
import { UserInformationService } from "../user-information/user-information.service";
import { UserInformation } from "../../stores/user-information";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  skippedUrls = ["dashboard", ""];
  pagesInTab = ["ordering", "tracking", "reporting", "setup"];
  conditionPermission = Constant.conditionPermission;
  userInformationService = inject(UserInformationService);

  constructor(private router: Router) {}

  checkPermission(uri = ""): Observable<boolean> {
    const routers = Constant.routers;
    const resultRouter = routers.find((item) => item.url === uri);

    if (this.pagesInTab.includes(uri)) {
      return this.userInformationService.getUserInformation().pipe(
        map((userInfo) => this.checkPermissionPagesInHeaderTab(uri, userInfo.permissions)),
        map((res) => {
          !res ? this.router.navigate(["/dashboard"]) : "";
          return res;
        }),
      );
    }

    if (!resultRouter || this.skippedUrls.includes(uri) || resultRouter.permission === "*") return of(true);

    return this.userInformationService.getUserInformation().pipe(
      switchMap((userInfo) => {
        const permissions = userInfo.permissions[resultRouter.groupRole];
        if (resultRouter.permission === "accessProvisionalCredit" && resultRouter.groupRole === "orders") {
          !permissions[resultRouter.permission] ? this.router.navigate(["/dashboard"]) : "";
          return of(permissions[resultRouter.permission]);
        } else {
          if (resultRouter.permission.toLowerCase().includes("edit")) {
            return this.checkPermissionForCreateEdit(permissions, resultRouter.groupRole).pipe(
              switchMap((res) => {
                !res ? this.router.navigate(["/dashboard"]) : "";
                return of(res);
              }),
            );
          } else {
            !permissions[resultRouter.permission] ? this.router.navigate(["/dashboard"]) : "";
            return of(permissions[resultRouter.permission]);
          }
        }
      }),
    );
  }

  getPermissionsByGroup(permissionPage: string) {
    return this.userInformationService.getUserInformation().pipe(map((response) => response.permissions[permissionPage]));
  }

  checkPermissions(group: string, condition: string, ...permissionsPrams: string[]): Observable<boolean> {
    return this.userInformationService.getUserInformation().pipe(
      map((roles) => {
        if (roles.permissions[group]) {
          return Object.keys(roles.permissions[group])
            .filter((role) => permissionsPrams.includes(role))
            .map((item) => roles.permissions[group][item]);
        } else return [];
      }),
      map((permissions) => {
        if (condition === this.conditionPermission.andTrue) {
          //AND true; return true if all roles is true
          return permissions.includes(false) ? false : true;
        } else if (condition === this.conditionPermission.andFalse) {
          //AND false; return true if all roles is false
          return permissions.includes(true) ? false : true;
        } else if (condition === this.conditionPermission.orTrue) {
          //OR true; return true if has a role is true
          return permissions.includes(true) ? true : false;
        } else {
          //OR false; return true if has a role is false
          return permissions.includes(false) ? true : false;
        }
      }),
    );
  }

  checkPermissionForCreateEdit(roles, group: string) {
    const roleFalse = Object.keys(roles)
      .filter(
        (key) =>
          key === `view${capitalizeFirstLetter(group)}` ||
          key === `access${capitalizeFirstLetter(group)}` ||
          key === `edit${capitalizeFirstLetter(group)}`,
      )
      .find((item) => roles[item] === false);

    return !!roleFalse ? of(false) : of(true);
  }

  checkHavePermissionToAccessThisApp(uri = ""): Observable<boolean> {
    return this.userInformationService.getUserCanAccessInThisApp().pipe(
      map((canAccess) => {
        if (canAccess) {
          return true;
        } else {
          if (!this.skippedUrls.includes(uri)) {
            this.router.navigate(["/dashboard"]);
          }

          return false;
        }
      }),
    );
  }

  checkPermissionPagesInHeaderTab(uri: string, userPermissions: UserInformation["permissions"]): boolean {
    switch (uri) {
      case "ordering": {
        return this.checkPermissionPageOrdering(userPermissions);
      }

      case "tracking": {
        return this.checkPermissionPageTracking(userPermissions);
      }

      case "reporting": {
        return this.checkPermissionPageReporting(userPermissions);
      }

      case "setup": {
        return this.checkPermissionPageSetup(userPermissions);
      }

      default: {
        return true;
      }
    }
  }

  checkPermissionPageOrdering(userPermissions: UserInformation["permissions"]): boolean {
    return userPermissions.orders?.accessOrders || userPermissions.orders?.accessProvisionalCredit;
  }

  checkPermissionPageTracking(userPermissions: UserInformation["permissions"]): boolean {
    return (
      userPermissions.tracking.accessInventory ||
      userPermissions.tracking.accessTransaction ||
      userPermissions.tracking.accessInventoryHistory
    );
  }

  checkPermissionPageReporting(userPermissions: UserInformation["permissions"]): boolean {
    return userPermissions.reporting.accessReports && userPermissions.reporting.accessReportTypes.length > 0;
  }

  checkPermissionPageSetup(userPermissions: UserInformation["permissions"]): boolean {
    return (
      userPermissions.cits?.viewCits ||
      userPermissions.calendars?.viewCalendars ||
      userPermissions.devices?.viewDevices ||
      userPermissions.locations?.viewLocations ||
      userPermissions.rolesOfInform?.viewRoles ||
      userPermissions.rolesOfManage?.viewRoles ||
      userPermissions.schedules.viewSchedules
    );
  }
}
