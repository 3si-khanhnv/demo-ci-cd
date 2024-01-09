jest.mock("../api/api.service");
import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { CredentialsService } from "./credentials.service";
import { ApiService } from "../api/api.service";
import { RouterTestingModule } from "@angular/router/testing";
import * as mockConfig from "../config/config.service";
class MockComponent {
  public title;
  public subtitle;
  public buttons;
  public tag;
}

describe("CredentialsService", () => {
  let api: jest.Mocked<ApiService>;
  let service: CredentialsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "permission-error", component: MockComponent },
          { path: "credentials-expired", component: MockComponent },
        ]),
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CredentialsService,
          multi: true,
        },
        ApiService,
      ],
    });
    service = TestBed.inject(CredentialsService);
    api = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
  });
  afterEach(() => sessionStorage.clear());

  it("should be created", () => {
    expect(service).toBeTruthy();
    expect(api).toBeTruthy();
  });

  it("should be called, withCredentials = true", (done) => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange

      // act
      http.get("/some/api").subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });

      // assert
      const request = mock.expectOne((req) => req.withCredentials);
      request.flush(JSON.stringify({ some: "json" }));
      mock.verify();
    })();
  });

  it("should be called with Authorization header", (done) => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange
      sessionStorage.setItem("ic_token_type", "dummy_type");
      sessionStorage.setItem("ic_access_token", "dummy_token");
      api.getHostUrl.mockReturnValue("http://localhost");
      // act
      http.get("http://localhost").subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });

      // assert
      const request = mock.expectOne((req) => req.withCredentials);
      expect(request.request.headers.get("Authorization")).toEqual("dummy_type dummy_token");
      request.flush(JSON.stringify({ some: "json" }));
      mock.verify();
    })();
  });
  it("should be called without Authorization header for app", (done) => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange
      sessionStorage.setItem("ic_token_type", "dummy_type");
      sessionStorage.setItem("ic_access_token", "dummy_token");

      api.getHostUrl.mockReturnValue("http://some/api");
      api.getUserAuthHostUrl.mockReturnValue("http://localhost");

      // act
      http.get("http://some/api").subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });

      // assert
      const request = mock.expectOne((req) => req.withCredentials);
      expect(request.request.headers.get("Authorization")).toEqual("dummy_type dummy_token");
      request.flush(JSON.stringify({ some: "json" }));
      mock.verify();
    })();
  });

  it("should be called without Authorization header for auth", (done) => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange
      sessionStorage.setItem("ic_token_type", "dummy_type");
      sessionStorage.setItem("ic_access_token", "dummy_token");

      api.getHostUrl.mockReturnValue("http://localhost");
      api.getUserAuthHostUrl.mockReturnValue("http://some/api");

      // act
      http.get("http://some/api").subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });

      // assert
      const request = mock.expectOne((req) => req.withCredentials);
      expect(request.request.headers.get("Authorization")).toEqual("dummy_type dummy_token");
      request.flush(JSON.stringify({ some: "json" }));
      mock.verify();
    })();
  });

  it("should be called without Authorization header", (done) => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange
      sessionStorage.setItem("ic_token_type", "dummy_type");

      api.getHostUrl.mockReturnValue("http://localhost");
      api.getUserAuthHostUrl.mockReturnValue("http://localhost");

      // act
      http.get("http://some/api").subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });

      // assert
      const request = mock.expectOne((req) => req.withCredentials);
      expect(request.request.headers.get("Authorization")).toBeNull();
      request.flush(JSON.stringify({ some: "json" }));
      mock.verify();
    })();
  });

  it("should be called next handle return error", (done) => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange

      api.getHostUrl.mockReturnValue("http://localhost");
      api.getUserAuthHostUrl.mockReturnValue("http://localhost");

      // act
      http.get("http://some/api").subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });

      // assert
      const request = mock.expectOne((req) => req.withCredentials);
      expect(request.request.headers.get("Authorization")).toBeNull();
      request.flush(JSON.stringify({ some: "json" }));
      mock.verify();
    })();
  });

  it("should be called api return 401", () => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange
      const spy = jest.spyOn(service["router"], "navigate");
      // act
      http.get("/some/api").subscribe((res) => {
        expect(res).toBeTruthy();
      });

      // assert

      const errorInitEvent: ErrorEventInit = {
        message: null,
        error: {
          errors: [
            {
              code: "401",
              description: "Validation error Authorization.",
              message: null,
              link: null,
              additionalinfo: null,
            },
          ],
        },
        lineno: null,
        colno: null,
        filename: null,
      };
      const error = new ErrorEvent("ERROR", errorInitEvent);
      mock.expectOne("/some/api").error(error, {
        status: 401,
        statusText: "Unauthorized",
      });
      mock.verify();
      expect(spy).toHaveBeenCalledWith(["credentials-expired"], { state: { isCheckAccess: true } });
    })();
  });

  it("should be called api return 403", () => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange
      const spy = jest.spyOn(service["router"], "navigate");
      // act
      http.get("/some/api").subscribe((res) => {
        expect(res).toBeTruthy();
      });

      // assert

      const errorInitEvent: ErrorEventInit = {
        message: null,
        error: {
          errors: [
            {
              code: "403",
              description: "Forbidden",
              message: null,
              link: null,
              additionalinfo: null,
            },
          ],
        },
        lineno: null,
        colno: null,
        filename: null,
      };
      const error = new ErrorEvent("ERROR", errorInitEvent);
      mock.expectOne("/some/api").error(error, {
        status: 403,
        statusText: "Forbidden",
      });
      mock.verify();
      expect(spy).toHaveBeenCalledWith(["permission-error"], { state: { isCheckAccess: true } });
    })();
  });

  it("should be called change header component", (done) => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange

      window = Object.create(window);
      const url = "/dashboard";
      Object.defineProperty(window, "location", {
        value: {
          pathname: url,
        },
        writable: true, // possibility to override
      });

      // act
      http.get(`${mockConfig.confEndpoints.bff}/some/api`).subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });

      // assert
      const request = mock.expectOne(() => true);
      request.flush(JSON.stringify({ some: "json" }));
      mock.verify();
    })();
  });
});
