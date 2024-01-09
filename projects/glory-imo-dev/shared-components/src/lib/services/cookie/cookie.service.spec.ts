import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ApiService } from "../api/api.service";
import { CookieService } from "./cookie.service";

describe("CookieService", () => {
  let service: CookieService;

  beforeEach(() => {
    jest.resetAllMocks();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CookieService,
          multi: true,
        },
        ApiService,
      ],
    });
    service = TestBed.inject(CookieService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("isLoggedIn", () => {
    it("should return observable of userLogin", (done) => {
      // arrange
      const spy = jest.spyOn(service["userLogin"], "asObservable");

      // act
      const act = service.isLoggedIn();

      // assert
      expect(spy).toHaveBeenCalled();
      act.subscribe((data) => {
        expect(data).toEqual(false);
        done();
      });
    });
  });

  describe("checkCookieValid", () => {
    it("should next isCookieValid to userLogin subject", () => {
      // arrange
      const spy = jest.spyOn(service["userLogin"], "next");
      const expected = false;
      jest.spyOn(service, "isCookieValid").mockReturnValueOnce(false);

      // act
      service.checkCookieValid();

      // assert
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe("clearSession", () => {
    it("should set storeCookie when cookie valid", () => {
      // arrange
      document.cookie = "connect.sid";
      const spy = jest.spyOn(service, "storeCookie");

      // act
      service.clearSession();

      // assert
      expect(spy).toHaveBeenCalled();
    });

    it("should not set storeCookie when cookie invalid", () => {
      // arrange
      document.cookie = "123";
      const spy = jest.spyOn(service, "clear");
      // act
      service.clearSession();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("get", () => {
    it("should return document cookie when cookie valid", () => {
      // arrange
      document.cookie = "connect.sid=***";
      // act
      const result = service.get();

      // assert
      expect(result).toContain(document.cookie);
    });

    it("should return string empty when cookie invalid", () => {
      // arrange
      document.cookie = "connect.sid=; max-age=-9999;";
      // act
      const result = service.get();

      // assert
      expect(result).toEqual("");
    });

    it("should return value by cookie name", () => {
      // arrange
      document.cookie = "a=123";
      document.cookie = "b=567";

      // act
      const result = service.get("a");

      // assert
      expect(result).toBe("123");
    });

    it("should return empty string when cookie not exist", () => {
      // arrange
      document.cookie = "a=123";
      document.cookie = "b=567";

      // act
      const result = service.get("c");

      // assert
      expect(result).toBe("");
    });
  });

  describe("set", () => {
    it("should set cookie empty value to be set and expire by session", () => {
      // arrange
      const expected = "";
      const cookieName = "connect.sid";

      // act
      service.set(cookieName);
      const cookieValue = service.get(cookieName);

      // assert
      expect(document.cookie).toContain(cookieName);
      expect(cookieValue).toBe(expected);
    });

    it("should set with value and expire by hour", () => {
      // arrange
      const expected = "123";
      const cookieName = "connect.sid";
      const hours = 24;

      // act
      service.set(cookieName, "123", hours);
      const cookieValue = service.get(cookieName);

      // assert
      expect(document.cookie).toContain(cookieName);
      expect(cookieValue).toBe(expected);
    });
  });

  describe("storeCookie", () => {
    it("should set document cookie", () => {
      // arrange
      const input = "connect.sid=***";
      // act
      service.storeCookie(input);

      // assert
      expect(document.cookie).toContain(input);
    });
  });

  describe("isCookieValid", () => {
    it("should return false when document cookie is expired", () => {
      // arrange
      document.cookie = "connect.sid=; max-age=-9999;";
      // act
      const check = service.isCookieValid();

      // assert
      expect(check).toEqual(false);
    });

    it("should return true when document cookie include connect.sid", () => {
      // arrange
      document.cookie = "connect.sid";
      // act
      const check = service.isCookieValid();

      // assert
      expect(check).toEqual(true);
    });
  });

  describe("clear", () => {
    it("cookie should be clear by name", () => {
      // arrange
      document.cookie = "connect.sid";

      // actual
      service.clear("connect.sid");

      // assert
      expect(document.cookie).not.toContain("document.cookie");
    });
  });
});
