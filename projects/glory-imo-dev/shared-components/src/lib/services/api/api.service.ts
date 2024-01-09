import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Env } from "./api.service.i";
import config from "../../../assets/config.json";
import { confEndpoints } from "../config/config.service";

// IMO
export const API_DEFAULT_AUTHORITY = "4";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public isEnv = false;
  public server = "";
  public userAuthServer = "";

  public apiPath = {
    // -------------Common API
    // User Auth ApplicationManager
    userinfo: "/userinfo",

    // -------------The following APIs are used by "customer-manager-service" and "glory-manager-service"
    userManagerLoginCallback: "/sample",

    // User Auth - App ID
    userManagerLogin: "/userManager/login",
    userManagerToken: "/userManager/token",

    // -------------Use the following APIs in "Dummy-app-site"
    loginCallback: "/sample",

    // User Auth ApplicationManger API
    login: "/login",
    token: "/token",
  };

  constructor(public http: HttpClient) {}

  // /**
  //  * get a environment infomation.
  //  */
  public getEnv$(): Observable<null> {
    if (this.isEnv) {
      return of(null);
    }
    console.log("calling env -> ", confEndpoints.bff + "/api/env");

    return this.http.get(confEndpoints.bff + "/api/env").pipe(
      map((result: Env) => {
        this.server = result.app_site_server;
        this.userAuthServer = result.user_auth_server;
        this.isEnv = true;
        return null;
      }),
      catchError((error) => {
        console.log("Error ===> " + error);
        return throwError(error);
      }),
    );
  }

  public getHostUrl() {
    return this.server;
  }

  public getUserAuthHostUrl() {
    return this.userAuthServer;
  }

  /**
   * to validate login page with service-side
   */
  public getLoginStartUrl(): string {
    let url = "";
    url = `${confEndpoints.bff}/${config.loginAuth}`;

    return url;
  }

  /**
   * to get login endpoint from config
   */
  public getLoginUrl() {
    let url = "";
    url = `${confEndpoints.bff}/${config.login}`;

    return url;
  }

  /**
   * to get logout endpoint from config
   */
  public getLogoutUrl() {
    let url = "";
    url = `${confEndpoints.bff}/${config.logout}`;

    return url;
  }

  public getCloudLoginUrl() {
    let url = this.getUserAuthHostUrl() + this.apiPath.userManagerLogin;
    url = url + "?redirectUrl=" + this.getHostUrl() + this.apiPath.userManagerLoginCallback;

    return url;
  }

  public getTokenUrl(code = "", type: string = API_DEFAULT_AUTHORITY) {
    let url = "";
    if (code === "") {
      url = this.getUserAuthHostUrl() + this.apiPath.userManagerToken;
    } else {
      url = this.getUserAuthHostUrl() + this.apiPath.token;
      url = url + "?redirectUrl=" + this.getHostUrl() + this.apiPath.loginCallback + "&code=" + code;
      url = url + "&applicationId=" + type;
    }
    return url;
  }

  public getUserInfoUrl() {
    return this.getUserAuthHostUrl() + this.apiPath.userinfo;
  }
}
