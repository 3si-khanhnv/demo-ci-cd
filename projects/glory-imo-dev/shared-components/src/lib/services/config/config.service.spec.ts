import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { ConfigService, confEndpoints, confGoogleMaps } from "./config.service";

class MockHttpClient {
  public get = jest.fn();
}

describe("ConfigService", () => {
  let http: HttpClient;
  let service: ConfigService;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: HttpClient, useClass: MockHttpClient }],
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(ConfigService);
  });

  describe("ConfigService prototype load", () => {
    it("should be created", () => {
      expect(service).toBeTruthy();
    });

    it("should load config file", () => {
      // arrange
      jest.spyOn(http, "get").mockReturnValue(
        of({
          endpoints: {
            bff: "http://localhost:1234",
          },
          googleMaps: {
            apiKey: "apiKeyapiKeyapiKeyapiKeyapiKey",
          },
          settings: {
            inactivityTimeout: 15,
          },
          applicationId: 1,
        }),
      );

      const expected = {
        bff: "http://localhost:1234",
        apiKey: "apiKeyapiKeyapiKeyapiKeyapiKey",
      };

      // act
      const act = service.load();

      // assert
      act.then(() => {
        expect(confEndpoints.bff).toEqual(expected.bff);
        expect(confGoogleMaps.apiKey).toEqual(expected.apiKey);
      });
    });
    it("should load config file not field settings", () => {
      // arrange
      jest.spyOn(http, "get").mockReturnValue(
        of({
          endpoints: {
            bff: "http://localhost:1234",
          },
          googleMaps: {
            apiKey: "apiKeyapiKeyapiKeyapiKeyapiKey",
          },
          settings: {},
          applicationId: 1,
        }),
      );

      const expected = {
        bff: "http://localhost:1234",
        apiKey: "apiKeyapiKeyapiKeyapiKeyapiKey",
      };

      // act
      const act = service.load();

      // assert
      act.then(() => {
        expect(confEndpoints.bff).toEqual(expected.bff);
        expect(confGoogleMaps.apiKey).toEqual(expected.apiKey);
      });
    });
  });
});
