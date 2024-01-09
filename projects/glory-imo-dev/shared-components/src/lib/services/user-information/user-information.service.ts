import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import { Observable } from "rxjs";
import { finalize, map, switchMap } from "rxjs/operators";
import {
  // AppState,
   UserInformation } from "../../stores";
import * as userStore from "../../stores/user-information";
import {
  GetUserInformation
  // GetUserInformationSuccess
} from "../../stores/user-information/user-information";
// import { permissionsSelector, userInformationSelector } from "../../stores/user-information/user-information.selectors";
import { BackendService } from "../backend";
import { confClientFormats, informApplicationId, manageApplicationId } from "../config/config.service";
import { CookieService } from "../cookie/cookie.service";
import { LanguageService } from "../languages/languages.service";
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);

@Injectable({
  providedIn: "root",
})
export class UserInformationService {
  userInformationSelector$;
  permissionsSelector$;

  constructor(
    private store: Store,
    private backendService: BackendService,
    private cookie: CookieService,
    private languageService: LanguageService,
  ) {}

  getUserInformation(): Observable<UserInformation> {
    return this.store.select(userStore.selectUserInformation);
  }

  getUserCanAccessInThisApp(): Observable<boolean> {
    return this.getUserInformation().pipe(
      map((userInfo) => {
        return [informApplicationId, manageApplicationId].some(
          (appId) => !!userInfo.accessAbleApplicationIds.find((accessAppId) => accessAppId === appId),
        );
      }),
    );
  }

  getPermissions() {
    return this.store.select(userStore.selectPermissions);
  }

  fetchUserInformation() {
    this.store.dispatch(new GetUserInformation());
  }

  public async initUserData(): Promise<any> {
    return new Promise((resolve) => {
      if (this.cookie.isCookieValid()) {
        this.backendService
          .getUserInformation()
          .pipe(
            switchMap((response) => {
              this.languageService.enable();
              this.store.dispatch(
                userStore.getUserInformationSuccess({
                  userInformation: {
                    ...response,
                    clientDateTimeFormat: confClientFormats.reportDatetimeFormat,
                    clientTimezone: confClientFormats.clientTimezone,
                    clientDateTimeSecondFormat: confClientFormats.datetimeFormatSeconds,
                  },
                }),
              );
              return this.backendService.getJsonLanguage().pipe(
                map((response) => {
                  this.languageService.addLang("inform-language", response.translationJson);
                  this.languageService.setLang("inform-language");
                  return null;
                }),
              );
            }),
            finalize(() => resolve(true)),
          )
          .subscribe();
      } else {
        resolve(true);
      }
    });
  }
}
