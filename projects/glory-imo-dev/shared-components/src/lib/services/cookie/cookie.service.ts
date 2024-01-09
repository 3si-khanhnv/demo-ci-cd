import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CookiePromptOption } from "../../constants/asset";
import { ApiService } from "../api/api.service";

enum CookieName {
  CONNECT_SID = "connect.sid",
}

@Injectable({
  providedIn: "root",
})
export class CookieService {
  private userLogin = new BehaviorSubject<boolean>(false);

  constructor(public api: ApiService) {
    this.checkCookieValid();
  }

  isLoggedIn(): Observable<boolean> {
    return this.userLogin.asObservable();
  }

  checkCookieValid() {
    this.userLogin.next(this.isCookieValid());
  }

  clearSession(name = CookieName.CONNECT_SID) {
    if (this.isCookieValid()) {
      this.storeCookie(`${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`);
    }
  }

  /**
   * To get cookie
   */
  get(name: string = null): string {
    if (name) {
      const result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)");
      return result ? result.pop() : "";
    }

    return this.isCookieValid() ? document.cookie : "";
  }

  /**
   *
   * @param name Cookie name
   * @param value Cookie value
   * @param hours Expire in hour
   */
  set(name: string, value = "", hours: number = null): void {
    let expires = "";

    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }

    const cookie = `${name}=${value}${expires}; path=/`;
    this.storeCookie(cookie);
  }

  /**
   *
   * @param cookie
   **/
  storeCookie(cookie: string): Observable<any> {
    document.cookie = cookie;

    return of(null);
  }

  /**
   * Validating cookie is exist
   **/
  isCookieValid(cookie = document.cookie): boolean {
    const isValid = cookie.includes(CookieName.CONNECT_SID);

    if (!isValid) {
      console.log("Cookie is invalid");
      Object.values(CookiePromptOption).forEach((cookieName) => this.clear(cookieName));
    }

    return isValid;
  }

  /**
   * Clear cookie by name
   * @param name Cookie name
   **/
  clear(name: string): void {
    this.set(name, null, -1);
  }
}
