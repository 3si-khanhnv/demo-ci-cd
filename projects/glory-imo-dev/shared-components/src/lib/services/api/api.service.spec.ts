import { TestBed } from "@angular/core/testing";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

// target import
import { ApiService, API_DEFAULT_AUTHORITY } from "./api.service";
import { confEndpoints } from "../config/config.service";

const errorResponses = [
  {
    title: "should emit a error event when got 400 response",
    opts: { status: 400, statusText: "Bad request" },
  },
  {
    title: "should emit a error event when got 401 response",
    opts: { status: 401, statusText: "Not authenticated" },
  },
  {
    title: "should emit a error event when got 500 response",
    opts: { status: 500, statusText: "Internal Server error." },
  },
];

describe("ApiProvider", () => {
  let apiService: ApiService = null;
  let http: HttpTestingController;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }),
  );

  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  it("should create", () => {
    expect(apiService).toBeTruthy();
  });

  describe("getEnv$", () => {
    it("should return value 1", (done) => {
      // arrange
      apiService.isEnv = true;
      const expected = null;
      // act
      const actual$ = apiService.getEnv$();
      // assert
      actual$.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
      });
    });

    it("isEnv should be set to true", (done) => {
      // arrange
      apiService.getEnv$().subscribe({
        error: (err) => fail(err),
        complete: () => done(),
      });

      // act
      http.expectOne({ url: confEndpoints.bff + "/api/env", method: "GET" }).flush([]);

      // assert
      http.verify();
    });

    it("should return data from backend", (done) => {
      // arrange
      const res = {
        app_site_server: "res_app_site_server",
        user_auth_server: "res_user_auth_server",
      };
      apiService.getEnv$().subscribe({
        next: () => expect(apiService.server).toEqual(res.app_site_server),
        error: (err) => fail(err),
        complete: () => done(),
      });

      // act
      http.expectOne({}).flush(res);

      // assert
      http.verify();
    });

    errorResponses.forEach((c) => {
      it(c.title, (done) => {
        // arrange
        apiService.getEnv$().subscribe({
          // assert
          next: (data) => fail(`should not return any data, but got ${data}`),
          error: (error) => {
            expect(error).toBeInstanceOf(HttpErrorResponse);
            done();
          },
          complete: () => fail("should return error"),
        });

        // act
        http.expectOne({}).error(new ErrorEvent("error"), c.opts);
        http.verify();
      });
    });
  });

  describe("getHostUrl", () => {
    it("should return empty data", () => {
      // arrange
      const server = "test_server";
      apiService.server = server;
      // act
      // assert
      expect(apiService.getHostUrl()).toEqual(server);
    });
  });

  describe("getUserAuthHostUrl", () => {
    it("should return empty data", () => {
      // arrange
      const server = "test_user_authserver";
      apiService.userAuthServer = server;
      // act
      // assert
      expect(apiService.getUserAuthHostUrl()).toEqual(server);
    });
  });

  describe("getLoginUrl", () => {
    it("should return valid data. [GLORY-MANAGER-SERVICE]", () => {
      // arrange
      confEndpoints.bff = "https://test_user_authserver";
      const expected = "https://test_user_authserver/user-authentication/login";
      // act
      // assert
      expect(apiService.getLoginUrl()).toEqual(expected);
    });
  });

  describe("getLogoutUrl", () => {
    it("should get logout endpoint from config", () => {
      // arrange
      confEndpoints.bff = "https://test_user_authserver";
      const expected = "https://test_user_authserver/user-authentication/logout";
      // act
      // assert
      expect(apiService.getLogoutUrl()).toEqual(expected);
    });
  });

  describe("getTokenUrl", () => {
    it("should return valid data. [code='']", () => {
      // arrange
      const userAuthServer = "https://test_user_authserver";
      apiService.userAuthServer = userAuthServer;
      const expected = userAuthServer + apiService.apiPath.userManagerToken;
      // act
      // assert
      expect(apiService.getTokenUrl()).toEqual(expected);
    });
    it("should return valid data. [code='bbb', default Type]", () => {
      // arrange
      const code = "bbb";
      const server = "https://test_user_authserver";
      apiService.server = server;
      const userAuthServer = "https://test_user_authserver";
      apiService.userAuthServer = userAuthServer;
      const expected =
        userAuthServer +
        apiService.apiPath.token +
        "?redirectUrl=" +
        server +
        apiService.apiPath.loginCallback +
        "&code=" +
        code +
        "&applicationId=" +
        API_DEFAULT_AUTHORITY;
      // assert
      expect(apiService.getTokenUrl(code)).toEqual(expected);
    });
    test("should return valid data. [code='bbb', type='ccc']", () => {
      // arrange
      const code = "bbb";
      const type = "ccc";
      const server = "https://test_user_authserver";
      apiService.server = server;
      const userAuthServer = "https://test_user_authserver";
      apiService.userAuthServer = userAuthServer;
      const expected =
        userAuthServer +
        apiService.apiPath.token +
        "?redirectUrl=" +
        server +
        apiService.apiPath.loginCallback +
        "&code=" +
        code +
        "&applicationId=" +
        type;
      // assert
      expect(apiService.getTokenUrl(code, type)).toEqual(expected);
    });
  });

  describe("getUserIgetUserInfoUrlnfo", () => {
    it("should return valid data", () => {
      // arrange
      const userAuthServer = "https://test_user_authserver";
      apiService.userAuthServer = userAuthServer;
      // act
      // assert
      expect(apiService.getUserInfoUrl()).toEqual(userAuthServer + apiService.apiPath.userinfo);
    });
  });

  describe("getLoginStartUrl", () => {
    it("should return url login", () => {
      // arrange
      const userAuthServer = "https://test_user_authserver";
      confEndpoints.bff = userAuthServer;
      // act
      // assert
      expect(apiService.getLoginStartUrl()).toEqual(userAuthServer + "/user-authentication/start");
    });
  });

  describe("getCloudLoginUrl", () => {
    it("should return cloud url login", () => {
      // arrange
      const userAuthServer = "https://test_user_authserver";
      apiService.userAuthServer = userAuthServer;
      const managerLogin = apiService.apiPath.userManagerLogin;
      const urlCallback = apiService.getHostUrl() + apiService.apiPath.userManagerLoginCallback;
      // act
      // assert
      expect(apiService.getCloudLoginUrl()).toEqual(userAuthServer + managerLogin + "?redirectUrl=" + urlCallback);
    });
  });
});
