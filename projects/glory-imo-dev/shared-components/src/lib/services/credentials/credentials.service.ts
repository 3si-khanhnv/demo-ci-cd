import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, finalize } from "rxjs/operators";
import { NavigationExtras, Router } from "@angular/router";
import { confEndpoints } from "../config/config.service";
import { Constant } from "../../constant";
@Injectable({
  providedIn: "root",
})
export class CredentialsService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;
    let headers = new HttpHeaders();
    if (!!sessionStorage.getItem("ic_access_token")) {
      headers = headers.set("Authorization", sessionStorage.getItem("ic_token_type") + " " + sessionStorage.getItem("ic_access_token"));
    }

    if (request.url.indexOf(confEndpoints.bff) !== -1) {
      const key = Object.keys(Constant.components).find((s) => window.location.pathname.includes(s));
      const component = Constant.components[key];
      if (component && key) {
        headers = headers.set("Component", component);
      }
    }
    return next.handle(request.clone({ headers, withCredentials: true })).pipe(
      tap({
        next: (event) => (ok = event instanceof HttpResponse ? "succeeded" : ""),
        error: (err) => {
          ok = "failed";
          const navigationExtras: NavigationExtras = { state: { isCheckAccess: true } };
          if (err.status === 401) {
            this.router.navigate(["credentials-expired"], navigationExtras);
          } else if (err.status === 403) {
            this.router.navigate(["permission-error"], navigationExtras);
          }
        },
      }),
      finalize(() => {
        const elapsed = Date.now() - started;
        console.log(`${request.method} "${request.urlWithParams}" ${ok} in ${elapsed} ms.`);
      }),
    );
  }
}
