import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
// import dayjs from "dayjs";
// import moment from "moment";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import * as config from "../../../assets/config.json";
import { DenominationType } from "../../constants/asset";
// import { DailyRepeatOptions, PatternOptions, WorkingDayOptions } from "../../constants/calendar";
// import { CreateCalendarRes } from "../../stores/create-calendar/create-calendar.model";
// import {
//   CITCalendar,
//   CreateCITRes,
//   FileTransfer,
//   PostCreateCITBodyReq,
//   PutCreateCITBodyReq,
//   SFTPConnection,
// } from "../../stores/create-cit/create-cit.model";
// import { CreateRoleRes, InitRole } from "../../stores/create-role/create-role.model";
// import { ExistCITCustomerNumbers } from "../../stores/edit-location/edit-location.model";
// import { FilterItems } from "../../stores/orders/orders.model";
// import { FilterScheduleItems } from "../../stores/schedules/schedules.model";
// import { viewProvisionalCreditRes } from "../../stores/view-provisional-credit/view-provisional-credit.model";
// import { confEndpoints } from "../config/config.service";
// import { OrderDetailInformation, PostCreateOrderBody, UpdateCreateOrderBody } from "./../../stores/create-order/create-order.model";
import { BackendService } from "./backend.service";
import {
  ActionSchedule,
  AssetSettingsRequestBody,
  CIT,
  CitExecuteProvisionalCreditFileBody,
  CitOrderReportSampleRequestBody,
  CompanyLocationResponse,
  CompanyResponse,
  // CreateScheduleBody,
  EActionType,
  // ExportingReportRequest,
  FilterItemsCreateEditScheduleResponse,
  GetAssetListResponseBody,
  // GetCITRes,
  GetCalendarCIT,
  GetCalendarLocation,
  // GetCalendarRes,
  GetCalendarsParams,
  // GetCreateSchedule,
  GetCurrentInventoryResponse,
  GetFilterItemsCreateEditScheduleBody,
  GetLocationListResponseBody,
  // GetLocationSettingsResponseBody,
  GetLocationsParams,
  GetOrderForecastDetailsRequestBody,
  GetOrdersParams,
  GetProvisionalCreditsFilterItemsRes,
  GetReportingDataRequest,
  GetRetailerLocationsRes,
  GetRole,
  GetServiceDateParams,
  GetTransactionsRes,
  // HolidayCalendarRes,
  IDisplayFilterItemsRes,
  IFilterItemsBody,
  IFilterItemsRes,
  IListWidgetsModelResponse,
  IWidgetsDataModelBody,
  InitialReport,
  // LocationSettingsCITs,
  // LocationSettingsHolidayCalendar,
  LocationSettingsServiceAndEmergencyCalendar,
  OrderApprove,
  OrderForecastDetails,
  OrderFormatBody,
  OrderItem,
  OrderReport,
  OrderRequest,
  OrderStop,
  PCReportFormatBody,
  // PostCreateCalendarBody,
  // PostCreateRoleBody,
  // PutLocationSettingsBody,
  // PutLocationSettingsRes,
  RejectBody,
  RejectComment,
  ReportFilterItems,
  ReportFilterItemsBody,
  Reporting,
  ResendOrderBody,
  // ScheduleParamResId,
  ScheduleReportDisplayItems,
  SendBody,
  ServiceDateResponse,
  StatusConsideredAsOnOrder,
  StopBody,
  TestReportScheduleBody,
  TransactionsFilterItemsBody,
  TransactionsViewBody,
  // UpdateCreateCalendarBody,
  // UpdateScheduleBody,
  ViewSchedulesStartApiResponse,
} from "./backend.service.i";
import { confEndpoints } from "../config";

// const schedule = {
//   pattern: {
//     repeat: {
//       default: null,
//       [PatternOptions.DAILY]: {
//         default: null,
//         [DailyRepeatOptions.CIT_WORKING_DAY]: {},
//         [DailyRepeatOptions.REPEAT_FREQUENCY]: {
//           interval: null,
//           isIncludeCitWorkingDays: true,
//           recurrencePolicy: null,
//         },
//       },
//       [PatternOptions.WEEKLY]: {
//         interval: null,
//         daysOfWeekSelection: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: false, sunday: false },
//       },
//       [PatternOptions.MONTHLY]: {
//         default: null,
//         repeatOnDayOfWeek: {
//           interval: null,
//           weekNumber: null,
//           dayOfWeek: WorkingDayOptions.MON,
//         },
//         repeatOnDayOfNumber: {
//           dayNumber: null,
//           interval: null,
//           isIncludeCitWorkingDays: true,
//           recurrencePolicy: null,
//         },
//       },
//     },
//     leadDays: {
//       monday: null,
//       tuesday: null,
//       wednesday: null,
//       thursday: null,
//       friday: null,
//       saturday: null,
//       sunday: null,
//     },
//   },
//   holiday: [],
// };

describe(BackendService.name, () => {
  let service: BackendService;
  let http: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackendService],
    }),
  );

  beforeEach(() => {
    service = TestBed.inject(BackendService);
    http = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe(BackendService.prototype.getEditOrderDetail.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const orderNumber = 1;
      const expectedUrl = `${confEndpoints.bff}/${config.getEditOrderDetail}/${orderNumber}`;
      // act
      service
        .getEditOrderDetail(orderNumber)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const orderDetails = { aaa: "bbb" };
      const orderNumber = 1;
      const expectedUrl = `${confEndpoints.bff}/${config.getEditOrderDetail}/${orderNumber}`;
      const expectedMethod = "GET";
      // act
      service
        .getEditOrderDetail(orderNumber)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(orderDetails);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(orderDetails);
      http.verify();
    });
  });

  describe(BackendService.prototype.getCompanies.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getCompanies}`;

      // act
      service
        .getCompanies()
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const res: CompanyResponse[] = [{ companyId: 1, companyName: "company1" }];
      const expected = res;
      // act
      service
        .getCompanies()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getCompanyLocations.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getCompanyLocations}`;

      // act
      service
        .getCompanyLocations()
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const res: CompanyLocationResponse = {
        companies: [
          {
            companyId: 2,
            companyName: "ABC Inc",
          },
          {
            companyId: 1,
            companyName: "GLORY Ltd",
          },
        ],
        locations: [
          {
            id: 1,
            name: "2nd Floor",
            companyId: 1,
            companyName: "GLORY Ltd",
            citId: 1,
            citName: "mock cit",
          },
          {
            id: 2,
            name: "Location 01-A",
            companyId: 2,
            companyName: "ABC Inc",
            citId: 1,
            citName: "mock cit",
          },
        ],
      };
      const expected = res;
      // act
      service
        .getCompanyLocations()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.postCreateOrder.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "POST";
  //     const expectedUrl = `${confEndpoints.bff}/${config.postCreateOrder}`;
  //     const ordersData: PostCreateOrderBody = {
  //       companyId: null,
  //       citId: null,
  //       isEmergency: false,
  //       locationId: null,
  //       serviceDate: moment().add(1, "day").format("YYYY-MM-DD"),
  //       pickupCoin: false,
  //       pickupCoinCollect: false,
  //       pickupCoinCollectRemove: false,
  //       pickupNote: false,
  //       pickupNoteCollect: false,
  //       pickupNoteCollectRemove: false,
  //       deliveryCoin: false,
  //       deliveryCoinReplenish: false,
  //       deliveryNote: false,
  //       deliveryNoteReplenish: false,
  //       actualOrderQuantities: [],
  //       baseCurrencyCode: "NZD",
  //       decimalPlaces: 2,
  //       orderBasedOn: "currentInventory",
  //     };
  //     // act
  //     service
  //       .postCreateOrder(ordersData)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res: any = {
  //       orderNumber: "1",
  //     };

  //     const ordersData: PostCreateOrderBody = {
  //       companyId: null,
  //       citId: null,
  //       isEmergency: false,
  //       locationId: null,
  //       serviceDate: moment().add(1, "day").format("YYYY-MM-DD"),
  //       pickupCoin: false,
  //       pickupCoinCollect: false,
  //       pickupCoinCollectRemove: false,
  //       pickupNote: false,
  //       pickupNoteCollect: false,
  //       pickupNoteCollectRemove: false,
  //       deliveryCoin: false,
  //       deliveryCoinReplenish: false,
  //       deliveryNote: false,
  //       deliveryNoteReplenish: false,
  //       actualOrderQuantities: [],
  //       baseCurrencyCode: "NZD",
  //       decimalPlaces: 2,
  //       orderBasedOn: "currentInventory",
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .postCreateOrder(ordersData)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.updateCreateOrder.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "PUT";
  //     const ordersData: UpdateCreateOrderBody = {
  //       companyId: null,
  //       citId: null,
  //       isEmergency: false,
  //       locationId: null,
  //       serviceDate: moment().add(1, "day").format("YYYY-MM-DD"),
  //       pickupCoin: false,
  //       pickupCoinCollect: false,
  //       pickupCoinCollectRemove: false,
  //       pickupNote: false,
  //       pickupNoteCollect: false,
  //       pickupNoteCollectRemove: false,
  //       deliveryCoin: false,
  //       deliveryCoinReplenish: false,
  //       deliveryNote: false,
  //       deliveryNoteReplenish: false,
  //       actualOrderQuantities: [],
  //       baseCurrencyCode: "NZD",
  //       decimalPlaces: 2,
  //       orderBasedOn: "currentInventory",
  //     };
  //     const orderNumber = "1";
  //     const expectedUrl = `${confEndpoints.bff}/${config.updateCreateOrder}/${orderNumber}`;
  //     // act
  //     service
  //       .updateCreateOrder(orderNumber, ordersData)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res: any = {
  //       orderNumber: "1",
  //     };

  //     const ordersData: UpdateCreateOrderBody = {
  //       companyId: null,
  //       citId: null,
  //       isEmergency: false,
  //       locationId: null,
  //       serviceDate: moment().add(1, "day").format("YYYY-MM-DD"),
  //       pickupCoin: false,
  //       pickupCoinCollect: false,
  //       pickupCoinCollectRemove: false,
  //       pickupNote: false,
  //       pickupNoteCollect: false,
  //       pickupNoteCollectRemove: false,
  //       deliveryCoin: false,
  //       deliveryCoinReplenish: false,
  //       deliveryNote: false,
  //       deliveryNoteReplenish: false,
  //       actualOrderQuantities: [],
  //       baseCurrencyCode: "NZD",
  //       decimalPlaces: 2,
  //       orderBasedOn: "currentInventory",
  //     };
  //     const expected = res;
  //     const orderNumber = "1";
  //     // act
  //     service
  //       .updateCreateOrder(orderNumber, ordersData)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getOrderDetails.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getOrderDetails}?locationId=1&citId=1`;
      // act
      service
        .getOrderDetails({ selectedCitId: 1, selectedLocationId: 1 })
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    // it("should return response", (done) => {
    //   // arrange
    //   const orderDetails = <OrderDetailInformation[]>[
    //     {
    //       id: 0,
    //       currency: "NZD",
    //       symbol: "$",
    //       denominations: [
    //         {
    //           quantityPerUnit: 1,
    //           decimalPlaces: 2,
    //           type: "note",
    //           symbol: "$",
    //           exponent: 0,
    //           faceValue: 100,
    //           desiredCalculationCount: 100,
    //           recyclableInventoryCount: 10,
    //           averageUsages: {
    //             monday: 10,
    //             tuesday: 10,
    //             wednesday: 10,
    //             thursday: 10,
    //             friday: 10,
    //             saturday: 10,
    //             sunday: 10,
    //           },
    //           isDenominationOrderAvailable: true,
    //         },
    //         {
    //           quantityPerUnit: 1,
    //           decimalPlaces: 2,
    //           type: "note",
    //           symbol: "$",
    //           exponent: 0,
    //           faceValue: 50,
    //           desiredCalculationCount: 100,
    //           recyclableInventoryCount: 10,
    //           averageUsages: {
    //             monday: 10,
    //             tuesday: 10,
    //             wednesday: 10,
    //             thursday: 10,
    //             friday: 10,
    //             saturday: 10,
    //             sunday: 10,
    //           },
    //           isDenominationOrderAvailable: true,
    //         },
    //         {
    //           quantityPerUnit: 1,
    //           decimalPlaces: 2,
    //           type: "note",
    //           symbol: "$",
    //           exponent: 0,
    //           faceValue: 20,
    //           desiredCalculationCount: 100,
    //           recyclableInventoryCount: 10,
    //           averageUsages: {
    //             monday: 10,
    //             tuesday: 10,
    //             wednesday: 10,
    //             thursday: 10,
    //             friday: 10,
    //             saturday: 10,
    //             sunday: 10,
    //           },
    //           isDenominationOrderAvailable: true,
    //         },
    //         {
    //           quantityPerUnit: 1,
    //           decimalPlaces: 2,
    //           type: "note",
    //           symbol: "$",
    //           exponent: 0,
    //           faceValue: 10,
    //           desiredCalculationCount: 100,
    //           recyclableInventoryCount: 10,
    //           averageUsages: {
    //             monday: 10,
    //             tuesday: 10,
    //             wednesday: 10,
    //             thursday: 10,
    //             friday: 10,
    //             saturday: 10,
    //             sunday: 10,
    //           },
    //           isDenominationOrderAvailable: true,
    //         },
    //         {
    //           quantityPerUnit: 1,
    //           decimalPlaces: 2,
    //           type: "note",
    //           symbol: "$",
    //           exponent: 0,
    //           faceValue: 5,
    //           desiredCalculationCount: 100,
    //           recyclableInventoryCount: 10,
    //           averageUsages: {
    //             monday: 10,
    //             tuesday: 10,
    //             wednesday: 10,
    //             thursday: 10,
    //             friday: 10,
    //             saturday: 10,
    //             sunday: 10,
    //           },
    //           isDenominationOrderAvailable: true,
    //         },
    //         {
    //           quantityPerUnit: 1,
    //           decimalPlaces: 2,
    //           type: "coin",
    //           symbol: "$",
    //           exponent: 0,
    //           faceValue: 2,
    //           desiredCalculationCount: 100,
    //           recyclableInventoryCount: 10,
    //           averageUsages: {
    //             monday: 10,
    //             tuesday: 10,
    //             wednesday: 10,
    //             thursday: 10,
    //             friday: 10,
    //             saturday: 10,
    //             sunday: 10,
    //           },
    //           isDenominationOrderAvailable: true,
    //         },
    //         {
    //           quantityPerUnit: 1,
    //           decimalPlaces: 2,
    //           type: "coin",
    //           symbol: "$",
    //           exponent: 0,
    //           faceValue: 1,
    //           desiredCalculationCount: 100,
    //           recyclableInventoryCount: 10,
    //           averageUsages: {
    //             monday: 10,
    //             tuesday: 10,
    //             wednesday: 10,
    //             thursday: 10,
    //             friday: 10,
    //             saturday: 10,
    //             sunday: 10,
    //           },
    //           isDenominationOrderAvailable: true,
    //         },
    //         {
    //           quantityPerUnit: 1,
    //           decimalPlaces: 2,
    //           type: "coin",
    //           symbol: "c",
    //           exponent: -2,
    //           faceValue: 50,
    //           desiredCalculationCount: 100,
    //           recyclableInventoryCount: 10,
    //           averageUsages: {
    //             monday: 10,
    //             tuesday: 10,
    //             wednesday: 10,
    //             thursday: 10,
    //             friday: 10,
    //             saturday: 10,
    //             sunday: 10,
    //           },
    //           isDenominationOrderAvailable: true,
    //         },
    //         {
    //           quantityPerUnit: 1,
    //           decimalPlaces: 2,
    //           type: "coin",
    //           symbol: "c",
    //           exponent: -2,
    //           faceValue: 20,
    //           desiredCalculationCount: 100,
    //           recyclableInventoryCount: 10,
    //           averageUsages: {
    //             monday: 10,
    //             tuesday: 10,
    //             wednesday: 10,
    //             thursday: 10,
    //             friday: 10,
    //             saturday: 10,
    //             sunday: 10,
    //           },
    //           isDenominationOrderAvailable: true,
    //         },
    //         {
    //           quantityPerUnit: 1,
    //           decimalPlaces: 2,
    //           type: "coin",
    //           symbol: "c",
    //           exponent: -2,
    //           faceValue: 10,
    //           desiredCalculationCount: 100,
    //           recyclableInventoryCount: 10,
    //           averageUsages: {
    //             monday: 10,
    //             tuesday: 10,
    //             wednesday: 10,
    //             thursday: 10,
    //             friday: 10,
    //             saturday: 10,
    //             sunday: 10,
    //           },
    //           isDenominationOrderAvailable: true,
    //         },
    //       ],
    //     },
    //   ];
    //   const expectedUrl = `${confEndpoints.bff}/${config.getOrderDetails}?locationId=1&citId=1`;

    //   const expectedMethod = "GET";
    //   // act
    //   service
    //     .getOrderDetails({ selectedLocationId: 1, selectedCitId: 1 })
    //     .pipe(
    //       catchError(() => throwError(fail("Unexpected here"))),
    //       tap((response) => {
    //         expect(response).toEqual(orderDetails);
    //       }),
    //     )
    //     .subscribe({
    //       error: done,
    //       complete: done,
    //     });
    //   // act
    //   http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(orderDetails);
    //   http.verify();
    // });
  });

  describe(BackendService.prototype.getOrderForecastDetails.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getOrderForecastDetails}`;
      const params: GetOrderForecastDetailsRequestBody = {
        citId: 1,
        locationId: 1,
        serviceDate: "2022-08-22",
        orderBasedOn: "currentInventory",
        isEmergency: false,
      };
      // act
      service
        .getOrderForecastDetails(params)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const res: OrderForecastDetails = {
        totalValue: "100000",
        actualOrderQuantities: [],
        calculationPolicy: {
          isConsiderFloatsInCalculation: true,
          isConsiderSafetyFactorInCalculation: false,
          isSubtractQuantityOnOrder: true,
          maximumOrderValue: "1",
          orderCalculationMethod: "dynamic",
          safetyFactor: 1,
          statusConsideredAsOnOrder: StatusConsideredAsOnOrder.APPROVED_SENT,
        },
        containerAverageDeposits: [],
        inventoryUpdatedTime: "time",
      };

      const params: GetOrderForecastDetailsRequestBody = {
        citId: 1,
        locationId: 1,
        serviceDate: "2022-08-22",
        orderBasedOn: "currentInventory",
        isEmergency: true,
      };
      const expected = res;
      // act
      service
        .getOrderForecastDetails(params)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.printOrder.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "POST";
      const orderNumber = "1";
      const body: OrderFormatBody = {
        format: "pdf",
        clientDateFormat: "YYYY/MM/DD",
      };
      const expectedUrl = `${confEndpoints.bff}/print-order/${orderNumber}/create`;

      // act
      service
        .printOrder(orderNumber, body)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const orderReport: OrderReport = {
        fileName: "",
        content: "",
      };
      const orderNumber = "1";
      const body: OrderFormatBody = {
        format: "pdf",
        clientDateFormat: "YYYY/MM/DD",
      };
      const expectedUrl = `${confEndpoints.bff}/print-order/${orderNumber}/create`;
      const expectedMethod = "POST";

      // act
      service
        .printOrder(orderNumber, body)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(orderReport);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(orderReport);
      http.verify();
    });
  });

  describe(BackendService.prototype.requestOrder.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/request/${orderNumber}`;
      //act
      service
        .requestOrder(orderNumber)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const orderRequest: OrderRequest = {
        orderNumber: "1",
        status: "requested",
      };
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/request/${orderNumber}`;

      // act
      service
        .requestOrder(orderNumber)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(orderRequest);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(orderRequest);
      http.verify();
    });
  });

  describe(BackendService.prototype.rejectOrder.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/reject/${orderNumber}`;
      const reason: RejectBody = {
        reason: "reason",
      };

      //act
      service
        .rejectOrder(orderNumber, reason)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const orderReject: OrderRequest = {
        orderNumber: "1",
        status: "rejected",
      };
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/reject/${orderNumber}`;
      const reason: RejectBody = {
        reason: "reason",
      };

      // act
      service
        .rejectOrder(orderNumber, reason)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(orderReject);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(orderReject);
      http.verify();
    });
  });

  describe(BackendService.prototype.approveOrder.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/approve/${orderNumber}`;
      //act
      service
        .approveOrder(orderNumber)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const orderApprove: OrderApprove = {
        orderNumber: "1",
        status: "approved",
      };
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/approve/${orderNumber}`;

      // act
      service
        .approveOrder(orderNumber)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(orderApprove);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(orderApprove);
      http.verify();
    });
  });

  describe(BackendService.prototype.stopOrder.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "PUT";
      const body: StopBody = {
        orderFormat: "xml",
        orderTemplateName: "xml template 1",
      };
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/stop/${orderNumber}`;
      //act
      service
        .stopOrder(orderNumber, body)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const orderStop: OrderStop = {
        orderNumber: "1",
        status: "stopped",
      };
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const body: StopBody = {
        orderFormat: "xml",
        orderTemplateName: "xml template 1",
      };
      const expectedUrl = `${confEndpoints.bff}/create-order/stop/${orderNumber}`;

      // act
      service
        .stopOrder(orderNumber, body)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(orderStop);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(orderStop);
      http.verify();
    });
  });

  describe(BackendService.prototype.manualCompleteOrder.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/manual-complete/${orderNumber}`;
      //act
      service
        .manualCompleteOrder(orderNumber, {})
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const orderStop: OrderStop = {
        orderNumber: "1",
        status: "manualCompleted",
      };
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/manual-complete/${orderNumber}`;

      // act
      service
        .manualCompleteOrder(orderNumber, {})
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(orderStop);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(orderStop);
      http.verify();
    });
  });

  describe(BackendService.prototype.sendOrder.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/send/${orderNumber}`;
      const body: SendBody = {
        orderFormat: "xml",
        orderTemplateName: "xml template 1",
      };

      //act
      service
        .sendOrder(orderNumber, body)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const orderReject: OrderRequest = {
        orderNumber: "1",
        status: "rejected",
      };
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/send/${orderNumber}`;
      const body: SendBody = {
        orderFormat: "xml",
        orderTemplateName: "xml template 1",
      };

      // act
      service
        .sendOrder(orderNumber, body)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(orderReject);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(orderReject);
      http.verify();
    });
  });

  describe(BackendService.prototype.checkServiceDateCreateOrder.name, () => {
    it("should request to correct endpoint by correct http method when have params", (done) => {
      // arrange
      const expectedMethod = "GET";
      const params: GetServiceDateParams = {
        citId: 1,
        locationId: 1,
        serviceDate: "2021-05-11",
        isSubtractQuantityOnOrder: true,
        statusConsideredAsOnOrder: StatusConsideredAsOnOrder.APPROVED_SENT,
      };
      const expectedUrl = `${confEndpoints.bff}/${config.checkServiceDate}?citId=${params.citId}&locationId=${params.locationId}&serviceDate=${params.serviceDate}&isSubtractQuantityOnOrder=${params.isSubtractQuantityOnOrder}&statusConsideredAsOnOrder=${params.statusConsideredAsOnOrder}`;

      // act
      service
        .checkServiceDateCreateOrder(params)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const params: GetServiceDateParams = {
        citId: 1,
        locationId: 1,
        serviceDate: "2021-05-11",
        isSubtractQuantityOnOrder: true,
        statusConsideredAsOnOrder: StatusConsideredAsOnOrder.APPROVED_SENT,
      };
      const res: ServiceDateResponse = {
        isAllowMultipleOrders: false,
        orderNumbers: ["1", "2"],
        onOrderQuantities: [{ currencyCode: "AUD", decimalPlaces: 2, exponent: 0, faceValue: 50, quantity: 10, type: "note" }],
        canDeliver: true,
        canPickUp: false,
      };
      const expected = res;
      // act
      service
        .checkServiceDateCreateOrder(params)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getCurrentInventory.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getCurrentInventory}?locationId=1&citId=1`;
      // act
      service
        .getCurrentInventory({ locationId: "1", citId: "1" })
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const currentInventory: GetCurrentInventoryResponse = {
        currencyDenominations: [
          {
            currencyCode: "AUD",
            decimalPlaces: 2,
            symbol: "$",
            denominations: [
              {
                type: "note",
                faceValue: 100,
                exponent: 0,
                symbol: "$",
                quantityPerUnit: 1,
                recyclableInventoryCount: 8,
                averageUsages: {
                  monday: 0,
                  tuesday: 0,
                  wednesday: 0,
                  thursday: 0,
                  friday: 0,
                  saturday: 0,
                  sunday: 0,
                },
                floats: 10,
                maxCount: 100,
                isExceedMaxCountAllowed: true,
                isSelectVirtualSafe: true,
              },
            ],
          },
        ],
        containerAverageDeposits: [
          {
            denominationType: "note",
            weekDaysUsage: {
              sunday: 0,
              monday: 0,
              tuesday: 0,
              wednesday: 0,
              thursday: 0,
              friday: 0,
              saturday: 0,
            },
          },
        ],
        inventoryUpdatedTime: "2022-07-25T10:23:59+01:00",
        mirroringLocationContainerAverageDeposits: [],
      };
      const expectedUrl = `${confEndpoints.bff}/${config.getCurrentInventory}?locationId=1&citId=1`;

      const expectedMethod = "GET";
      // act
      service
        .getCurrentInventory({ locationId: "1", citId: "1" })
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(currentInventory);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(currentInventory);
      http.verify();
    });
  });

  // const workingDays: CITCalendar["workingDays"] = {
  //   monday: {
  //     isWorking: true,
  //     leadDays: 4,
  //     canDeliver: true,
  //     canPickup: true,
  //   },
  //   tuesday: {
  //     isWorking: true,
  //     leadDays: 2,
  //     canDeliver: true,
  //     canPickup: true,
  //   },
  //   wednesday: {
  //     isWorking: true,
  //     leadDays: 2,
  //     canDeliver: true,
  //     canPickup: true,
  //   },
  //   thursday: {
  //     isWorking: true,
  //     leadDays: 2,
  //     canDeliver: true,
  //     canPickup: true,
  //   },
  //   friday: {
  //     isWorking: true,
  //     leadDays: 2,
  //     canDeliver: true,
  //     canPickup: true,
  //   },
  //   saturday: {
  //     isWorking: false,
  //     leadDays: 0,
  //     canDeliver: true,
  //     canPickup: true,
  //   },
  //   sunday: {
  //     isWorking: false,
  //     leadDays: 0,
  //     canDeliver: true,
  //     canPickup: true,
  //   },
  // };

  // describe(BackendService.prototype.postCreateCIT.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "POST";
  //     const expectedUrl = `${confEndpoints.bff}/${config.postCreateCIT}`;
  //     const citData: PostCreateCITBodyReq = {
  //       name: "Armorguard",
  //       reference: "",
  //       contactName: "John Snow",
  //       contactPhoneNumber: "095801234",
  //       contactEmail: "armorguard.gmail.ag.co.jp",
  //       addressLine1: "PO Box 111184, Ellerslie, Auckland 1542",
  //       addressLine2: "PO Box 111184, Ellerslie, Auckland 1542",
  //       addressLine3: "PO Box 111184, Ellerslie, Auckland 1542",
  //       state: "Auckland",
  //       postalCode: "0612",
  //       country: "New zealand",
  //       description: "Security services in Auckland",
  //       comments: "Starting in march",
  //       pickup: {
  //         notes: true,
  //         notesCollect: true,
  //         notesCollectRemove: false,
  //         coins: true,
  //         coinsCollect: true,
  //         coinsCollectRemove: false,
  //       },
  //       delivery: {
  //         notes: true,
  //         notesReplenish: true,
  //         coins: true,
  //         coinsReplenish: true,
  //       },
  //       pavementLimit: "30",
  //       pavementLimitCurrencyCode: "",
  //       cutOffTime: "09:30 AM",
  //       workingDays,
  //       cutOffTimeZoneType: "locationTime",
  //       lateVisitAlertTime: "04:00 PM",
  //       sendTime: "09:30 AM",
  //       timezone: "Asia/Tokyo",
  //       orderFormat: "xml",
  //       orderTemplateId: "1",
  //       orderNotNeededTemplateId: "1",
  //       orderMethod: {
  //         manual: {},
  //       },
  //       retailerLocations: [
  //         {
  //           companyId: 0,
  //           locationId: 1,
  //           cits: [
  //             {
  //               citId: 1,
  //               customerNumber: "1",
  //               isLocationOrder: true,
  //               isLocationProvisionalCredit: true,
  //               isEnabledServiceEndDate: false,
  //               isEnabledServiceStartDate: false,
  //             },
  //           ],
  //           assets: [],
  //         },
  //       ],
  //       currencies: [
  //         {
  //           code: "",
  //           denominations: [],
  //         },
  //       ],
  //       holidayCalendars: [],
  //       isAllowMultipleOrders: true,
  //       provisionalCreditPolicy: {
  //         isProvideProvisionalCredit: false,
  //       },
  //     };
  //     // act
  //     service
  //       .postCreateCIT(citData)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res: CreateCITRes = {
  //       citId: "1",
  //     };

  //     const citData: PostCreateCITBodyReq = {
  //       name: "Armorguard",
  //       reference: "",
  //       contactName: "John Snow",
  //       contactPhoneNumber: "095801234",
  //       contactEmail: "armorguard.gmail.ag.co.jp",
  //       addressLine1: "PO Box 111184, Ellerslie, Auckland 1542",
  //       addressLine2: "PO Box 111184, Ellerslie, Auckland 1542",
  //       addressLine3: "PO Box 111184, Ellerslie, Auckland 1542",
  //       state: "Auckland",
  //       postalCode: "0612",
  //       country: "New zealand",
  //       description: "Security services in Auckland",
  //       comments: "Starting in march",
  //       pickup: {
  //         notes: true,
  //         notesCollect: true,
  //         notesCollectRemove: false,
  //         coins: true,
  //         coinsCollect: true,
  //         coinsCollectRemove: false,
  //       },
  //       delivery: {
  //         notes: true,
  //         notesReplenish: true,
  //         coins: true,
  //         coinsReplenish: true,
  //       },
  //       pavementLimit: "30",
  //       pavementLimitCurrencyCode: "",
  //       cutOffTime: "09:30 AM",
  //       lateVisitAlertTime: "04:00 PM",
  //       sendTime: "09:30 AM",
  //       workingDays,
  //       cutOffTimeZoneType: "locationTime",
  //       timezone: "Asia/Tokyo",
  //       orderFormat: "xml",
  //       orderTemplateId: "1",
  //       orderNotNeededTemplateId: "1",
  //       orderMethod: {
  //         manual: {},
  //       },
  //       retailerLocations: [
  //         {
  //           companyId: 0,
  //           locationId: 1,
  //           cits: [
  //             {
  //               citId: 1,
  //               customerNumber: "1",
  //               isLocationOrder: true,
  //               isLocationProvisionalCredit: true,
  //               isEnabledServiceEndDate: false,
  //               isEnabledServiceStartDate: false,
  //             },
  //           ],
  //           assets: [],
  //         },
  //       ],
  //       currencies: [
  //         {
  //           code: "",
  //           denominations: [],
  //         },
  //       ],
  //       holidayCalendars: [],
  //       isAllowMultipleOrders: true,
  //       provisionalCreditPolicy: {
  //         isProvideProvisionalCredit: false,
  //       },
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .postCreateCIT(citData)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.updateCreateCIT.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "PUT";
  //     const citData: PutCreateCITBodyReq = {
  //       name: "Armorguard",
  //       reference: "",
  //       contactName: "John Snow",
  //       contactPhoneNumber: "095801234",
  //       contactEmail: "armorguard.gmail.ag.co.jp",
  //       addressLine1: "PO Box 111184, Ellerslie, Auckland 1542",
  //       addressLine2: "PO Box 111184, Ellerslie, Auckland 1542",
  //       addressLine3: "PO Box 111184, Ellerslie, Auckland 1542",
  //       state: "Auckland",
  //       postalCode: "0612",
  //       country: "New zealand",
  //       description: "Security services in Auckland",
  //       comments: "Starting in march",
  //       pickup: {
  //         notes: true,
  //         notesCollect: true,
  //         notesCollectRemove: false,
  //         coins: true,
  //         coinsCollect: true,
  //         coinsCollectRemove: false,
  //       },
  //       delivery: {
  //         notes: true,
  //         notesReplenish: true,
  //         coins: true,
  //         coinsReplenish: true,
  //       },
  //       pavementLimit: "30",
  //       pavementLimitCurrencyCode: "",
  //       cutOffTime: "09:30 AM",
  //       lateVisitAlertTime: "04:00 PM",
  //       sendTime: "09:30 AM",
  //       workingDays,
  //       cutOffTimeZoneType: "locationTime",
  //       timezone: "Asia/Tokyo",
  //       orderFormat: "xml",
  //       orderTemplateId: "1",
  //       orderNotNeededTemplateId: "1",
  //       orderMethod: {
  //         manual: {},
  //       },
  //       retailerLocations: [
  //         {
  //           companyId: 0,
  //           locationId: 1,
  //           cits: [
  //             {
  //               citId: 1,
  //               customerNumber: "1",
  //               isLocationOrder: true,
  //               isLocationProvisionalCredit: true,
  //               isEnabledServiceEndDate: false,
  //               isEnabledServiceStartDate: false,
  //             },
  //           ],
  //           assets: [],
  //         },
  //       ],
  //       currencies: [
  //         {
  //           code: "",
  //           denominations: [],
  //         },
  //       ],
  //       holidayCalendars: [],
  //       isAllowMultipleOrders: true,
  //       provisionalCreditPolicy: {
  //         isProvideProvisionalCredit: false,
  //       },
  //     };
  //     const expectedUrl = `${confEndpoints.bff}/${config.updateCreateCIT}/${citData.citId}`;
  //     // act
  //     service
  //       .updateCreateCIT(citData.citId, citData)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res = {};

  //     const citData: PutCreateCITBodyReq = {
  //       name: "Armorguard",
  //       reference: "",
  //       contactName: "John Snow",
  //       contactPhoneNumber: "095801234",
  //       contactEmail: "armorguard.gmail.ag.co.jp",
  //       addressLine1: "PO Box 111184, Ellerslie, Auckland 1542",
  //       addressLine2: "PO Box 111184, Ellerslie, Auckland 1542",
  //       addressLine3: "PO Box 111184, Ellerslie, Auckland 1542",
  //       state: "Auckland",
  //       postalCode: "0612",
  //       country: "New zealand",
  //       description: "Security services in Auckland",
  //       comments: "Starting in march",
  //       pickup: {
  //         notes: true,
  //         notesCollect: true,
  //         notesCollectRemove: false,
  //         coins: true,
  //         coinsCollect: true,
  //         coinsCollectRemove: false,
  //       },
  //       delivery: {
  //         notes: true,
  //         notesReplenish: true,
  //         coins: true,
  //         coinsReplenish: true,
  //       },
  //       pavementLimit: "30",
  //       pavementLimitCurrencyCode: "",
  //       cutOffTime: "09:30 AM",
  //       lateVisitAlertTime: "04:00 PM",
  //       sendTime: "09:30 AM",
  //       workingDays,
  //       cutOffTimeZoneType: "locationTime",
  //       timezone: "Asia/Tokyo",
  //       orderFormat: "xml",
  //       orderTemplateId: "1",
  //       orderNotNeededTemplateId: "1",
  //       orderMethod: {
  //         manual: {},
  //       },
  //       retailerLocations: [
  //         {
  //           companyId: 0,
  //           locationId: 1,
  //           cits: [
  //             {
  //               citId: 1,
  //               customerNumber: "1",
  //               isLocationOrder: true,
  //               isLocationProvisionalCredit: true,
  //               isEnabledServiceEndDate: false,
  //               isEnabledServiceStartDate: false,
  //             },
  //           ],
  //           assets: [],
  //         },
  //       ],
  //       currencies: [
  //         {
  //           code: "",
  //           denominations: [],
  //         },
  //       ],
  //       holidayCalendars: [],
  //       isAllowMultipleOrders: true,
  //       provisionalCreditPolicy: {
  //         isProvideProvisionalCredit: false,
  //       },
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .updateCreateCIT(citData.citId, citData)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getCITList.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getCITList}`;

      // act
      service
        .getCITList()
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const res: CIT[] = [
        {
          status: "active",
          id: "1",
          name: "Armorguard",
          cashCenters: 100,
          country: "New Zealand",
          totalLocationCount: 100,
          isDeletable: false,
          isEditable: true,
        },
        {
          status: "active",
          id: "2",
          name: "CIT-Name2",
          cashCenters: 100,
          country: "Afghanistan",
          totalLocationCount: 100,
          isDeletable: true,
          isEditable: true,
        },
      ];
      const expected = res;
      // act
      service
        .getCITList()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.getCIT.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getCIT}`;

  //     // act
  //     service
  //       .getCIT()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should request to correct endpoint without params by correct http method", (done) => {
  //     // arrange

  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getCIT}`;

  //     // act
  //     service
  //       .getCIT()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should request to correct endpoint with params by correct http method", (done) => {
  //     // arrange
  //     const params: CreateCITRes = {
  //       citId: "1",
  //     };
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.editCIT}/${params.citId}`;

  //     // act
  //     service
  //       .getCIT(params)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res: GetCITRes = {
  //       name: "",
  //       reference: "",
  //       contactName: "",
  //       contactPhoneNumber: "",
  //       contactEmail: "",
  //       addressLine1: "",
  //       addressLine2: "",
  //       addressLine3: "",
  //       state: "",
  //       postalCode: "",
  //       country: "",
  //       description: "",
  //       comments: "",
  //       workingDays,
  //       cutOffTimeZoneType: [
  //         {
  //           type: "locationTime",
  //           default: true,
  //         },
  //         {
  //           type: "citTimezone",
  //           default: false,
  //         },
  //       ],
  //       timezone: "Asia/Tokyo",
  //       cutOffTime: "",
  //       lateVisitAlertTime: "04:00 PM",
  //       sendTime: "",
  //       delivery: {
  //         notes: true,
  //         notesReplenish: false,
  //         coins: true,
  //         coinsReplenish: false,
  //       },
  //       pickup: {
  //         notes: true,
  //         notesCollect: false,
  //         notesCollectRemove: false,
  //         coins: true,
  //         coinsCollect: false,
  //         coinsCollectRemove: false,
  //       },
  //       currencies: [],
  //       pavementLimit: "0",
  //       pavementLimitCurrencyCode: "",
  //       orderFormats: [],
  //       orderTemplates: [],
  //       orderMethods: [],
  //       retailerLocations: [],
  //       citCustomerNumbers: [],
  //       holidayCalendars: [],
  //       isAllowMultipleOrders: true,
  //       provisionalCreditPolicy: {
  //         isProvideProvisionalCredit: false,
  //         isDesignatedTestProvisionalCredit: false,
  //       },
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .getCIT()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.deleteCIT.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "Delete";
      const citId = "0";
      const expectedUrl = `${confEndpoints.bff}/${config.deleteCIT}/${citId}`;

      // act
      service
        .deleteCIT(citId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const citId = "0";
      const mock = jest.fn();

      service.deleteCIT(citId).subscribe({
        // assert
        next: () => {
          mock();
        },
        error: (err) => fail(err),
        complete: () => {
          expect(mock).toHaveBeenCalledTimes(1);
          done();
        },
      });

      // act
      http.expectOne({}).flush(null, { status: 204, statusText: "No Content" });
      http.verify();
    });
  });

  // describe(BackendService.prototype.checkSFTPConnection.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "POST";
  //     const expectedUrl = `${confEndpoints.bff}/${config.postCheckSFTPConnection}`;
  //     const citOrderMethodData: SFTPConnection = {
  //       serverUrl: "string",
  //       port: 1,
  //       optionalFolderPath: "string",
  //       username: "string",
  //       password: "string",
  //     };
  //     // act
  //     service
  //       .checkSFTPConnection(citOrderMethodData)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res: CreateCITRes = {
  //       citId: "1",
  //     };

  //     const citOrderMethodData: SFTPConnection = {
  //       serverUrl: "string",
  //       port: 1,
  //       optionalFolderPath: "string",
  //       username: "string",
  //       password: "string",
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .checkSFTPConnection(citOrderMethodData)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.checkFileTransfer.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "POST";
  //     const expectedUrl = `${confEndpoints.bff}/${config.postCheckFileTransfer}`;
  //     const citOrderMethodData: FileTransfer = {
  //       serverUrl: "string",
  //       port: 1,
  //       optionalFolderPath: "string",
  //       username: "string",
  //       password: "string",
  //       orderTemplateId: "string",
  //       orderTemplateFormat: "string",
  //       orderTemplateName: "string",
  //       orderTemplateFileName: "string",
  //     };
  //     // act
  //     service
  //       .checkFileTransfer(citOrderMethodData)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res: CreateCITRes = {
  //       citId: "1",
  //     };

  //     const citOrderMethodData: FileTransfer = {
  //       serverUrl: "string",
  //       port: 1,
  //       optionalFolderPath: "string",
  //       username: "string",
  //       password: "string",
  //       orderTemplateId: "string",
  //       orderTemplateFormat: "string",
  //       orderTemplateName: "string",
  //       orderTemplateFileName: "string",
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .checkFileTransfer(citOrderMethodData)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getRetailerLocations.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getRetailerLocations}`;

      // act
      service
        .getRetailerLocations()
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should request to correct endpoint by correct http method when have citId", (done) => {
      // arrange
      const expectedMethod = "GET";
      const citId = "1";
      const expectedUrl = `${confEndpoints.bff}/${config.getRetailerLocations}?citId=${citId}`;

      // act
      service
        .getRetailerLocations(citId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const res: GetRetailerLocationsRes[] = [
        {
          id: 0,
          name: "ABC Inc",
          locations: [
            {
              id: 0,
              name: "Christchurch",
              cits: [
                {
                  citId: 1,
                  customerNumber: "1",
                  isLocationOrder: true,
                  isLocationProvisionalCredit: true,
                  isEnabledServiceEndDate: false,
                  isEnabledServiceStartDate: false,
                },
              ],
            },
            {
              id: 1,
              name: "Crawley",
              cits: [
                {
                  citId: 2,
                  customerNumber: "2",
                  isLocationOrder: true,
                  isLocationProvisionalCredit: true,
                  isEnabledServiceEndDate: false,
                  isEnabledServiceStartDate: false,
                },
              ],
            },
          ],
        },
        {
          id: 1,
          name: "Adpt Ltd",
          locations: [
            {
              id: 2,
              name: "Canterbury",
              cits: [
                {
                  citId: 3,
                  customerNumber: "3",
                  isLocationOrder: true,
                  isLocationProvisionalCredit: true,
                  isEnabledServiceEndDate: false,
                  isEnabledServiceStartDate: false,
                },
              ],
            },
            {
              id: 3,
              name: "Conway",
              cits: [
                {
                  citId: 4,
                  customerNumber: "4",
                  isLocationOrder: true,
                  isLocationProvisionalCredit: true,
                  isEnabledServiceEndDate: false,
                  isEnabledServiceStartDate: false,
                },
              ],
            },
          ],
        },
      ];
      const expected = res;
      // act
      service
        .getRetailerLocations()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getOrders.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getOrders}`;

      // act
      service
        .getOrders()
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should request to correct endpoint by correct http method when have params", (done) => {
      // arrange
      const expectedMethod = "GET";
      const params: GetOrdersParams = { citId: "1", companyId: "1", startPlacedDate: "2020-01-01", sortColumn: "orderNumber", sort: "asc" };
      const expectedUrl = `${confEndpoints.bff}/${config.getOrders}?citId=1&companyId=1&startPlacedDate=2020-01-01&sortColumn=orderNumber&sort=asc`;

      // act
      service
        .getOrders(params)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const res: OrderItem[] = [
        {
          status: "Created",
          isAutomated: true,
          orderNumber: "1234567890123456",
          placeDate: "05/31/2020",
          serviceDate: "05/31/2020",
          citName: "Armorguard",
          citTimezone: "Asia/Tokyo",
          citCutOffTime: "9:30 AM",
          citCutOffTimezone: "Asia/Tokyo",
          companyName: "ABC Inc",
          locationName: "Canterbury",
          locationTimezone: "Asia/Tokyo",
          orderValue: "2000000",
          decimalPlaces: 2,
          baseCurrencyCode: "NZD",
          isEditable: true,
          isEmergency: true,
        },
        {
          status: "Created",
          isAutomated: false,
          orderNumber: "1234567890123457",
          placeDate: "05/31/2020",
          serviceDate: "05/31/2020",
          citName: "Armorguard",
          citCutOffTime: "9:30 AM",
          citCutOffTimezone: "Asia/Tokyo",
          companyName: "ABC Inc",
          locationName: "Canterbury",
          orderValue: "2000000",
          decimalPlaces: 2,
          baseCurrencyCode: "NZD",
          isEditable: true,
          isEmergency: true,
        },
      ];
      const expected = res;
      // act
      service
        .getOrders()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getRejectDetail.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/${config.getRejectDetail}?orderNumber=${orderNumber}`;

      // act
      service
        .getRejectDetail(orderNumber)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const res: RejectComment[] = [
        {
          rejectorUserName: "John Smith",
          rejectedAt: "2021/07/02",
          rejectReason:
            "To generate HTML output, see package html/template, which has the same interface as this package but automatically secures HTML output against certain attacks.",
        },
        {
          rejectorUserName: "Adam Ramsey",
          rejectedAt: "2021/07/05",
          rejectReason:
            "Once parsed, a template may be executed safely in parallel, although if parallel executions share a Writer the output may be interleaved.",
        },
      ];
      const expected = res;
      // act
      service
        .getRejectDetail("1")
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.getCalendar.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getCalendar}`;

  //     // act
  //     service
  //       .getCalendar()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should request to correct endpoint by correct http method when have params", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const params: CreateCalendarRes = { calendarId: 1 };
  //     const expectedUrl = `${confEndpoints.bff}/${config.editCalendar}/${params.calendarId}`;

  //     // act
  //     service
  //       .getCalendar(params)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res: GetCalendarRes = {
  //       name: "calendar",
  //       description: "description",
  //       calendarType: [{ default: true, id: 1, name: "service" }],
  //       startDate: "2020-01-01",
  //       endDate: "",
  //       schedule,
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .getCalendar()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getCalendarList.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getCalendarList}`;

      // act
      service
        .getCalendarList()
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should request to correct endpoint by correct http method with filter", (done) => {
      // arrange
      const expectedMethod = "GET";
      const params: GetCalendarsParams = {
        name: "test",
        calendarTypeId: "1,2,3",
        startDate: "2020-12-22",
        endDate: "2020-12-28",
        sort: "name",
        sortColumn: "asc",
      };
      const expectedUrl =
        `${confEndpoints.bff}/${config.getCalendarList}` +
        "?name=test&calendarTypeId=1,2,3&startDate=2020-12-22&endDate=2020-12-28&sort=name&sortColumn=asc";

      // act
      service
        .getCalendarList(params)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const res: any[] = [{}, {}];
      const expected = res;
      // act
      service
        .getCalendarList()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getCalendarDetail.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "GET";
      const calendarId = "1";
      const expectedUrl = `${confEndpoints.bff}/calendars/${calendarId}`;
      //act
      service
        .getCalendarDetail(calendarId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const responseData = {
        cits: [{ citId: "aaa" }, { citId: "bbb" }, { citId: "ccc" }],
        locations: [{ locationId: 1 }],
      };
      const expectedMethod = "GET";
      const calendarId = "1";
      const expectedUrl = `${confEndpoints.bff}/calendars/${calendarId}`;

      // act
      service
        .getCalendarDetail(calendarId)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = responseData;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(responseData);
      http.verify();
    });
  });

  // describe(BackendService.prototype.postCreateCalendar.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "POST";
  //     const expectedUrl = `${confEndpoints.bff}/${config.postCreateCalendar}`;
  //     const calendarData: PostCreateCalendarBody = {
  //       name: "calendar",
  //       calendarType: "service",
  //       startDate: "2020-01-01",
  //       endDate: "",
  //       cits: [],
  //       schedule,
  //     };
  //     // act
  //     service
  //       .postCreateCalendar(calendarData)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res: CreateCalendarRes = {
  //       calendarId: 1,
  //     };

  //     const calendarData: PostCreateCalendarBody = {
  //       name: "calendar",
  //       calendarType: "service",
  //       startDate: "2020-01-01",
  //       endDate: "",
  //       cits: [],
  //       schedule,
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .postCreateCalendar(calendarData)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.updateCreateCalendar.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "PUT";
  //     const calendarData: UpdateCreateCalendarBody = {
  //       calendarId: 1,
  //       name: "calendar",
  //       calendarType: "service",
  //       description: "description",
  //       startDate: "2020-01-01",
  //       endDate: "",
  //       cits: [],
  //       schedule,
  //     };
  //     const expectedUrl = `${confEndpoints.bff}/${config.updateCreateCalendar}/${calendarData.calendarId}`;
  //     // act
  //     service
  //       .updateCreateCalendar(calendarData)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res = null;
  //     const calendarData: UpdateCreateCalendarBody = {
  //       calendarId: 1,
  //       name: "calendar",
  //       calendarType: "service",
  //       startDate: "2020-01-01",
  //       endDate: "",
  //       description: "description",
  //       cits: [],
  //       schedule,
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .updateCreateCalendar(calendarData)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.deleteCalendar.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "Delete";
      const calendarId = "0";
      const expectedUrl = `${confEndpoints.bff}/${config.deleteCalendar}`.replace("{calendarId}", calendarId);
      // act
      service
        .deleteCalendar(calendarId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const calendarId = "0";
      const mock = jest.fn();

      service.deleteCalendar(calendarId).subscribe({
        // assert
        next: () => {
          mock();
        },
        error: (err) => fail(err),
        complete: () => {
          expect(mock).toHaveBeenCalledTimes(1);
          done();
        },
      });

      // act
      http.expectOne({}).flush(null, { status: 204, statusText: "No Content" });
      http.verify();
    });
  });

  // describe(BackendService.prototype.getFilters.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getFilters}`;

  //     // act
  //     service
  //       .getFilters()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   // it("should return response", (done) => {
  //   //   // arrange
  //   //   const res: FilterItems = {
  //   //     orderStatuses: [
  //   //       {
  //   //         statusCode: "created",
  //   //         statusName: "Created",
  //   //       },
  //   //       {
  //   //         statusCode: "requested",
  //   //         statusName: "Requested",
  //   //       },
  //   //     ],
  //   //     orderTypes: ["manual", "automatic"],
  //   //     cits: [
  //   //       {
  //   //         id: 1,
  //   //         status: "active",
  //   //         name: "Amorguard",
  //   //         country: "New Zealand",
  //   //         isEditable: true,
  //   //         totalLocationCount: 25,
  //   //         isDeletable: true,
  //   //       },
  //   //     ],
  //   //     companies: [
  //   //       {
  //   //         id: 1,
  //   //         name: "ABC Inc",
  //   //         locations: [
  //   //           {
  //   //             id: 1,
  //   //             name: "Christchurch",
  //   //             citId: "1",
  //   //             citName: "ABC co",
  //   //             pavementLimit: "30000",
  //   //           },
  //   //         ],
  //   //       },
  //   //     ],
  //   //   };
  //   //   const expected = res;

  //   //   // act
  //   //   service
  //   //     .getFilters()
  //   //     .pipe(
  //   //       catchError(() => throwError(fail("Unexpected here"))),
  //   //       tap((response) => {
  //   //         expect(response).toEqual(expected);
  //   //       }),
  //   //     )
  //   //     .subscribe({
  //   //       error: done,
  //   //       complete: done,
  //   //     });

  //   //   // assert
  //   //   http.expectOne({}).flush(res);
  //   //   http.verify();
  //   // });
  // });

  // describe(BackendService.prototype.getHolidayCalendars.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getHolidayCalendars}`;

  //     // act
  //     service
  //       .getHolidayCalendars()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res: HolidayCalendarRes[] = [
  //       {
  //         calendarId: "1",
  //         calendarName: "CalendarName1",
  //         holidays: [
  //           {
  //             date: "2020-01-01",
  //             name: "holidayName1",
  //             isSkippable: false,
  //             orderPlaceDate: "09-09-2022",
  //             orderServiceDate: "09-09-2022",
  //             isHolidayConsiderAsWorkingDay: true,
  //             isServiceDateConsiderAsWorkingDay: true,
  //             isPlaceDateOverrideStandardLeadDay: true,
  //           },
  //           {
  //             date: "2020-01-02",
  //             name: "holidayName2",
  //             isSkippable: false,
  //             orderPlaceDate: "09-09-2022",
  //             orderServiceDate: "09-09-2022",
  //             isHolidayConsiderAsWorkingDay: true,
  //             isServiceDateConsiderAsWorkingDay: true,
  //             isPlaceDateOverrideStandardLeadDay: true,
  //           },
  //         ],
  //       },
  //       {
  //         calendarId: "2",
  //         calendarName: "CalendarName2",
  //         holidays: [
  //           {
  //             date: "2020-01-03",
  //             name: "holidayName3",
  //             isSkippable: false,
  //             orderPlaceDate: "09-09-2022",
  //             orderServiceDate: "09-09-2022",
  //             isHolidayConsiderAsWorkingDay: true,
  //             isServiceDateConsiderAsWorkingDay: true,
  //             isPlaceDateOverrideStandardLeadDay: true,
  //           },
  //           {
  //             date: "2020-01-04",
  //             name: "holidayName4",
  //             isSkippable: false,
  //             orderPlaceDate: "09-09-2022",
  //             orderServiceDate: "09-09-2022",
  //             isHolidayConsiderAsWorkingDay: true,
  //             isServiceDateConsiderAsWorkingDay: true,
  //             isPlaceDateOverrideStandardLeadDay: true,
  //           },
  //         ],
  //       },
  //     ];
  //     const expected = res;
  //     // act
  //     service
  //       .getHolidayCalendars()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getCITCalendar.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getCITCalendar}`;

      // act
      service
        .getCITCalendar()
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const res: GetCalendarCIT[] = [
        {
          citId: 1,
          country: "vietnam",
          name: "name",
        },
      ];
      const expected = res;

      // act
      service
        .getCITCalendar()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });

      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getLocationsCalendar.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getLocationsCalendar}`;

      // act
      service
        .getLocationsCalendar()
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const res: GetCalendarLocation[] = [
        {
          id: 2,
          name: "ABC Inc",
          locations: [
            {
              id: 2,
              name: "Location 01-A",
            },
          ],
        },
        {
          id: 1,
          name: "GLORY Ltd",
          locations: [],
        },
      ];
      const expected = res;

      // act
      service
        .getLocationsCalendar()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });

      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getCitOrderReportSample.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getCitOrderReportSample}`;
      const calendarData: CitOrderReportSampleRequestBody = {
        isRequireSpecification: true,
        isOrderNotNeeded: false,
        orderTemplateId: "1",
        orderTemplateFormat: "string",
        orderTemplateName: "string",
        orderTemplateFileName: "string",
      };
      // act
      service
        .getCitOrderReportSample(calendarData)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    // it("should return response", (done) => {
    //   const res: CreateCalendarRes = {
    //     calendarId: 1,
    //   };

    //   const calendarData: CitOrderReportSampleRequestBody = {
    //     isRequireSpecification: true,
    //     isOrderNotNeeded: false,
    //     orderTemplateId: "1",
    //     orderTemplateFormat: "string",
    //     orderTemplateName: "string",
    //     orderTemplateFileName: "string",
    //   };
    //   const expected = res;
    //   // act
    //   service
    //     .getCitOrderReportSample(calendarData)
    //     .pipe(
    //       catchError(() => throwError(fail("Unexpected here"))),
    //       tap((response) => {
    //         expect(response).toEqual(expected);
    //       }),
    //     )
    //     .subscribe({
    //       error: done,
    //       complete: done,
    //     });
    //   // act
    //   http.expectOne({}).flush(res);
    //   http.verify();
    // });
  });

  // describe(BackendService.prototype.getCalendarFilterItems.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getCalendarFilterItems}`;
  //     const res = {
  //       calendarTypes: [
  //         { id: 1, type: "Service" },
  //         { id: 2, type: "Holiday" },
  //       ],
  //     };
  //     // act
  //     service
  //       .getCalendarFilterItems()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     // act
  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     // arrange
  //     const res = {
  //       calendarTypes: [
  //         { id: 1, type: "Service" },
  //         { id: 2, type: "Holiday" },
  //       ],
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .getCalendarFilterItems()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getAssetList.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const executeMethod = "GET";
      const executeUrl = `${confEndpoints.bff}/${config.getAssetList}`;

      //act
      service
        .getAssetList()
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: executeUrl, method: executeMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const res: GetAssetListResponseBody = {
        assets: [
          {
            assetId: "123",
            status: "activate",
            type: "TCR-GLR-000001",
            serial: "ABCD-1234",
            locationName: "locations",
            companyName: "companies",
            currencies: ["USD", "JPY"],
          },
          {
            assetId: "124",
            status: "inactivate",
            type: "TCR-GLR-000001",
            serial: "ABCD-1235",
            locationName: "locations",
            companyName: "companies",
            currencies: ["USD"],
          },
        ],
        totalCount: 2,
        sortField: {
          column: "companyName",
          orderBy: "asc",
        },
      };
      const expected = res;
      // act
      service
        .getAssetList()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.getLocationSettings.name, () => {
  //   it("should request to correct endpoint by correct http method and return response", (done) => {
  //     // arrange
  //     const responseData: GetLocationSettingsResponseBody = {
  //       initialValue: {} as any,
  //       setValue: {} as any,
  //     };
  //     const expectedMethod = "GET";
  //     const locationId = "1";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getLocationSettings}`.replace("{locationId}", encodeURIComponent(locationId));

  //     // act
  //     service
  //       .getLocationSettings(locationId)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           const expected = responseData;
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     // act
  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(responseData);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.putLocationSettings.name, () => {
  //   it("should request to correct endpoint by correct http method and return response", (done) => {
  //     // arrange
  //     const expectedMethod = "PUT";
  //     const locationId = "1";
  //     const expectedUrl = `${confEndpoints.bff}/${config.putLocationSettings}`.replace("{locationId}", encodeURIComponent(locationId));
  //     const data: PutLocationSettingsBody = {
  //       timezone: "Asian",
  //       eodTime: "02:00 AM",
  //       eodTimePolicy: "beforeMidnight",
  //       contactName: "Thanes",
  //       contactPhoneNumber: "098 999 6789",
  //       contactEmailAddress: "abc@mail.co.jp",
  //       calendarIds: [],
  //       cits: [
  //         {
  //           citId: 1,
  //           citName: "",
  //           country: "",
  //           lateVisitAlertTime: "04:00 AM",
  //           customerNumber: "1",
  //           pickup: {
  //             notes: true,
  //             notesCollect: true,
  //             notesCollectRemove: true,
  //             coins: true,
  //             coinsCollect: true,
  //             coinsCollectRemove: true,
  //           },
  //           delivery: {
  //             notes: true,
  //             notesReplenish: true,
  //             coins: true,
  //             coinsReplenish: true,
  //           },
  //           isEnabledServiceEndDate: false,
  //           isEnabledServiceStartDate: false,
  //           serviceEndDate: "",
  //           serviceStartDate: "",
  //         },
  //       ],

  //       currencies: [
  //         {
  //           isSelectable: true,
  //           currencyCode: "NZD",
  //           denominationType: "coin",
  //           faceValue: 1,
  //           exponent: 1,
  //           minCount: 1,
  //           idealCount: 1,
  //           maxCount: 10,
  //           floats: 10,
  //           isExceedMaxCountAllowed: true,
  //           acceptanceVariance: 0,
  //           isSelectVirtualSafe: true,
  //         },
  //       ],

  //       orderPolicy: {
  //         orderCalculationMethodId: 1,
  //         safetyFactor: 0,
  //         maximumOrderValue: "100000000",
  //         timePeriodId: 1,
  //         insuranceLimit: "99999",
  //         triggerBufferDays: 10,
  //         bufferDays: 10,
  //         isOverrideLateVisitAlertTime: true,
  //         lateVisitAlertTime: "04:00 PM",
  //         isConsiderSafetyFactorInCalculation: true,
  //         inventoryWarningCheckHours: 8,
  //         orderBasedOn: "currentInventory",
  //         cashUsageCalculationStartingDate: "2023-08-15",
  //         acceptanceVariance: {
  //           isByValue: false,
  //           byValue: "0.00",
  //           isByDenomination: false,
  //           isByPercentage: false,
  //           byPercentage: 0,
  //         },
  //         isConsiderVirtualSafeDataInOrder: false,
  //       },
  //       assets: [
  //         {
  //           assetId: 1,
  //           provisionalCreditSettings: {
  //             provisionalCreditSafeId: "1",
  //             isSupportProvisionalCredit: false,
  //           },
  //         },
  //         {
  //           assetId: 2,
  //           provisionalCreditSettings: {
  //             provisionalCreditSafeId: "2",
  //             isSupportProvisionalCredit: true,
  //           },
  //         },
  //       ],
  //       orderTypeId: 1,
  //       isAutoApproveOrdersAtCutOffTime: false,
  //       isAutoSendOrdersAtCITSendTime: true,
  //       isAlwaysOrderOnSchedule: false,
  //       baseCurrencyCode: undefined,
  //       isSubtractQuantityOnOrder: false,
  //       isConsiderFloatsInCalculation: false,
  //       automaticOrderCreateSchedule: undefined,
  //       mirroring: {
  //         mirrorEndDate: dayjs().add(8, "week").format("YYYY-MM-DD"),
  //         mirrorLocationId: undefined,
  //       },
  //       provisionalCreditPolicy: {
  //         isEnableProvisionalCredit: false,
  //         providerId: 1,
  //         providerType: "string",
  //       },
  //       statusConsideredAsOnOrder: StatusConsideredAsOnOrder.APPROVED_SENT,
  //       orderNotificationEmail: "orderNotificationEmail@gmail.com",
  //       reportAlertNotificationEmail: "reportAlertNotificationEmail@gmail.com",
  //       provisionalCreditNotificationEmail: "provisionalCreditNotificationEmail@gmail.com",
  //       isUseContactEmailForOrderNotificationEmail: false,
  //       isUseContactEmailForReportAlertNotificationEmail: false,
  //       isUseContactEmailForProvisionalCreditNotificationEmail: false,
  //       isSendOrderToLocation: false,
  //       isUseCITAcceptanceVariance: false,
  //     };
  //     const res: PutLocationSettingsRes = {
  //       locationId: 1,
  //     };

  //     // act
  //     service
  //       .putLocationSettings(locationId, data)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           const expected = res;
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.getAssetFilterItem.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getAssetFilterItems}`;

  //     // act
  //     service
  //       .getAssetFilterItem()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     // arrange
  //     const res = {
  //       companies: [
  //         {
  //           id: 1,
  //           name: "ABC Inc",
  //           locations: [
  //             {
  //               id: 1,
  //               name: "Christchurch",
  //               citId: 1,
  //               citName: "ABC co",
  //               pavementLimit: "30000",
  //             },
  //           ],
  //         },
  //       ],
  //     };
  //     const expected = res;

  //     // act
  //     service
  //       .getAssetFilterItem()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // assert
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getAuthUrl.name, () => {
    it("get url", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.loginAuth}?redirectUrl=`;

      // act
      service
        .getAuthUrl("")
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("return error", (done) => {
      const opts = { status: 400, statusText: "Bad request" };
      service.getAuthUrl("").subscribe({
        // assert
        next: (data) => fail(`should not return any data, but got ${data}`),
        error: (error) => {
          expect(error).toBeInstanceOf(HttpErrorResponse);
          done();
        },
        complete: () => fail("should return error"),
      });
      // act
      http.expectOne({}).error(new ErrorEvent("error"), opts);
      http.verify();
    });
  });

  describe(BackendService.prototype.setTokenInRedis.name, () => {
    it("get url", (done) => {
      // arrange
      const expectedMethod = "GET";
      const params = {
        redirectUrl: "",
        code: "code",
      };
      const expectedUrl = `${confEndpoints.bff}/${config.token}?redirectUrl=${params.redirectUrl}${
        (params.code && `&code=${params.code}`) || ""
      }`;

      // act
      service
        .setTokenInRedis(params.redirectUrl, params.code)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("return error", (done) => {
      const params = {
        applicationId: 4,
        redirectUrl: "",
        code: "code",
      };
      const opts = { status: 400, statusText: "Bad request" };
      service.setTokenInRedis(params.redirectUrl, params.code).subscribe({
        // assert
        next: (data) => fail(`should not return any data, but got ${data}`),
        error: (error) => {
          expect(error).toBeInstanceOf(HttpErrorResponse);
          done();
        },
        complete: () => fail("should return error"),
      });
      // act
      http.expectOne({}).error(new ErrorEvent("error"), opts);
      http.verify();
    });
  });

  describe(BackendService.prototype.getAssetSettings.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "GET";
      const assetId = 1;
      const expectedUrl = `${confEndpoints.bff}/${config.getAssetSettings}`.replace("{assetId}", encodeURIComponent(assetId));
      //act
      service
        .getAssetSettings(assetId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });
  });

  describe(BackendService.prototype.getAssetDefaultConfiguration.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "GET";
      const assetId = 1;
      const expectedUrl = `${confEndpoints.bff}/${config.getAssetDefaultConfig}`.replace("{assetId}", encodeURIComponent(assetId));
      //act
      service
        .getAssetDefaultConfiguration(assetId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });
  });

  describe(BackendService.prototype.updateAssetSettings.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "POST";
      const assetId = 1;
      const updateAssetSetting: AssetSettingsRequestBody = {
        assetCollectionTriggerSettings: [
          {
            denominationType: DenominationType.NOTE,
            count: "100000000",
            countTrigger: 75,
            value: "500000000",
            valueTrigger: 75,
            isAlwaysCheckValueTrigger: true,
          },
        ],
        assetRecycleCountSettings: [
          {
            denominationType: DenominationType.NOTE,
            currencyCode: "AUD",
            faceValue: 10,
            exponent: 0,
            minCount: 1,
            idealCount: 49,
            maxCount: 99,
            floats: 99,
          },
        ],
      };
      const expectedUrl = `${confEndpoints.bff}/${config.updateAssetSettings}`.replace("{assetId}", encodeURIComponent(assetId));
      //act
      service
        .updateAssetSettings(assetId, updateAssetSetting)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });
  });

  describe(BackendService.prototype.getLocationList.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const param: GetLocationsParams = {
        offset: 0,
        limit: 7,
      };
      const executeMethod = "GET";
      const executeUrl = `${confEndpoints.bff}/${config.getLocationList}?offset=0&limit=7`;

      //act
      service
        .getLocationList(param)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: executeUrl, method: executeMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const res: GetLocationListResponseBody = {
        locations: [
          {
            locationId: 1,
            locationName: "2nd Floor",
            companyName: "Glory",
            country: "New Zealand",
            addressLine1: "street-01",
            addressLine2: "Building01-A",
            city: "City A-1",
            state: "State A-1",
            postalCode: "100001",
            currencies: ["AUD", "NZD"],
            orderTypeName: "Automatically",
            isAutoApproveOrdersAtCutOffTime: true,
          },
          {
            locationId: 2,
            locationName: "2nd Floor",
            companyName: "Glory",
            country: "New Zealand",
            addressLine1: "street-01",
            addressLine2: "Building01-A",
            city: "City A-1",
            state: "State A-1",
            postalCode: "100001",
            currencies: ["JPY"],
            orderTypeName: "Manual",
            isAutoApproveOrdersAtCutOffTime: false,
          },
        ],
        sortField: {
          column: "locationName",
          orderBy: "asc",
        },
        totalCount: 2,
      };
      const expected = res;
      // act
      service
        .getLocationList()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.getLocationFilterItem.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getLocationFilterItems}`;

  //     // act
  //     service
  //       .getLocationFilterItem()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     // arrange
  //     const res = {
  //       companies: [
  //         {
  //           id: 1,
  //           name: "ABC Inc",
  //           locations: [
  //             {
  //               id: 1,
  //               name: "Christchurch",
  //               citId: 1,
  //               citName: "ABC co",
  //               pavementLimit: "30000",
  //             },
  //           ],
  //         },
  //       ],
  //     };
  //     const expected = res;

  //     // act
  //     service
  //       .getAssetFilterItem()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // assert
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.getLocationSettingsCITs.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const executeMethod = "GET";
  //     const executeUrl = `${confEndpoints.bff}/${config.getLocationSettingsCITs}`;

  //     //act
  //     service
  //       .getLocationSettingsCITs()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: executeUrl, method: executeMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     // arrange
  //     const res: LocationSettingsCITs = {
  //       cits: [
  //         {
  //           citId: 1,
  //           citName: "Marvel",
  //           country: "Japan",
  //           currencyCodes: ["JPY"],
  //           pickup: {
  //             notes: true,
  //             notesCollect: true,
  //             notesCollectRemove: true,
  //             coins: true,
  //             coinsCollect: true,
  //             coinsCollectRemove: true,
  //           },
  //           delivery: {
  //             notes: true,
  //             notesReplenish: true,
  //             coins: true,
  //             coinsReplenish: true,
  //           },
  //           lateVisitAlertTime: "04:00 PM",
  //           isEnabledServiceEndDate: false,
  //           isEnabledServiceStartDate: false,
  //           serviceEndDate: "",
  //           serviceStartDate: "",
  //         },
  //       ],
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .getLocationSettingsCITs()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getLocationSettingsServiceAndEmergencyCalendars.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const executeMethod = "GET";
      const executeUrl = `${confEndpoints.bff}/${config.getLocationSettingsServiceAndEmergencyCalendars}`;

      //act
      service
        .getLocationSettingsServiceAndEmergencyCalendars()
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: executeUrl, method: executeMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const res: LocationSettingsServiceAndEmergencyCalendar[] = [
        {
          calendarId: "1",
          name: "Summertime",
          type: "service",
          pattern: "Daily",
          startDate: " 2020-11-01",
          endDate: "2020-11-31",
        },
      ];
      const expected = res;
      // act
      service
        .getLocationSettingsServiceAndEmergencyCalendars()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.getLocationSettingsHolidayCalendars.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const executeMethod = "GET";
  //     const executeUrl = `${confEndpoints.bff}/${config.getLocationSettingsHolidayCalendars}`;

  //     //act
  //     service
  //       .getLocationSettingsHolidayCalendars()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: executeUrl, method: executeMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     // arrange
  //     const res: LocationSettingsHolidayCalendar[] = [
  //       {
  //         calendarId: "1",
  //         calendarName: "calendar-name1",
  //         holidays: [
  //           {
  //             date: "2020-01-01",
  //             isSkippable: false,
  //             name: "holidayName1",
  //             orderPlaceDate: "09-09-2022",
  //             orderServiceDate: "09-09-2022",
  //             isHolidayConsiderAsWorkingDay: true,
  //             isServiceDateConsiderAsWorkingDay: true,
  //             isPlaceDateOverrideStandardLeadDay: true,
  //           },
  //         ],
  //       },
  //     ];
  //     const expected = res;
  //     // act
  //     service
  //       .getLocationSettingsHolidayCalendars()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getTransactions.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getTransactions}`;
      const body: TransactionsViewBody = {
        startTransactionDate: "2021-04-11",
        endTransactionDate: "2021-04-11",
        isMostRecent: false,
      };

      // act
      service
        .getTransactions(body)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush({});
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const body: TransactionsViewBody = {
        startTransactionDate: "2021-04-11",
        endTransactionDate: "2021-04-11",
        isMostRecent: false,
      };
      const res: GetTransactionsRes = {
        transactions: [
          {
            transactionId: "123",
            transactionDateTime: "2021-04-11 18:56:12",
            timezone: "GMT",
            transactionType: "EndExchangeEvent",
            serialNumber: ["100001"],
            messageSequenceNumber: "12345",
            companyName: "ABC Inc",
            locationName: "Canterbury",
            asset: "C150 2822",
            currency: [
              {
                user: "user",
                currencyCode: "NZD",
                totalValue: 50000,
                decimalPlaces: 2,
                transactionDetail: [
                  {
                    transactionSubType: "Deposit",
                    subTypeValue: 250000,
                    denominations: [
                      {
                        type: "note",
                        denominationValue: 1,
                        quantity: 2000,
                        machineType: "RBW-150",
                        value: 200000,
                      },
                      {
                        type: "note",
                        denominationValue: 0.5,

                        quantity: 1000,
                        machineType: "RBW-150",
                        value: 50000,
                      },
                    ],
                    manualDetails: [],
                  },
                  {
                    transactionSubType: "CashOut",
                    subTypeValue: 200000,
                    denominations: [
                      {
                        type: "note",
                        denominationValue: 1,
                        quantity: 2000,
                        machineType: "RBW-150",
                        value: 200000,
                      },
                    ],
                    manualDetails: [],
                  },
                ],
              },
            ],
            changeDetail: {
              changeAmount: {
                currencyCode: "NZD",
                status: "Complete",
                salesAmount: 12.5,
                variance: 0,
                decimalPlaces: 2,
                user: "106406",
                transactionId: "0001",
              },
              transactionDetail: [
                {
                  depositAmount: 10,
                  dispenseAmount: 7.5,
                  manualAmount: 10,
                  salesAmount: 12.5,
                  currencyCode: "NZD",
                  decimalPlaces: 2,
                  machineDetail: [
                    {
                      type: "note",
                      denominationValue: 100,
                      depositQuantity: 5,
                      dispenseQuantity: 2,
                      machineType: "RBW-150",
                      depositValue: 500,
                      dispenseValue: 200,
                    },
                  ],
                  manualDetail: [
                    {
                      itemName: "note",
                      itemValue: 50,
                      denominationValue: 50,
                      quantity: 1,
                    },
                    {
                      itemName: "Credit",
                      itemValue: 50,
                    },
                  ],
                },
                {
                  depositAmount: 10,
                  dispenseAmount: 7.5,
                  manualAmount: 10,
                  salesAmount: 12.5,
                  currencyCode: "NZD",
                  decimalPlaces: 2,
                  machineDetail: [
                    {
                      type: "note",
                      denominationValue: 100,
                      depositQuantity: 5,
                      dispenseQuantity: 2,
                      machineType: "RBW-150",
                      depositValue: 500,
                      dispenseValue: 200,
                    },
                  ],
                  manualDetail: [
                    {
                      itemName: "note",
                      itemValue: 50,
                      denominationValue: 50,
                      quantity: 1,
                    },
                    {
                      itemName: "Credit",
                      itemValue: 50,
                    },
                  ],
                },
              ],
            },
            hasComments: true,
          },
        ],
        totalCount: 1000,
        sortField: {
          column: "transactionDateTime",
          orderBy: "asc",
        },
      };
      const expected = res;
      // act
      service
        .getTransactions(body)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });

      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getTransactionsFilterItems.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getTransactionsFilterItems}`;
      const body: TransactionsFilterItemsBody = {
        locationId: 1,
        assetTypes: ["C100"],
      };

      // act
      service
        .getTransactionsFilterItems(body)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const res = {
        companies: [
          {
            id: 1,
            name: "ABC Inc",
            locations: [
              {
                id: 1,
                name: "Christchurch",
                citId: 1,
                citName: "ABC co",
                pavementLimit: "30000",
              },
            ],
          },
        ],
        transactionType: ["EndDispenseATMEvent", "EndExchangeEvent"],
      };
      const expected = res;

      // act
      service
        .getTransactionsFilterItems()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // assert
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getSourceDataFile.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const transactionId = "1";
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getSourceDataFile}`.replace("{transactionId}", transactionId);

      // act
      service
        .getSourceDataFile(transactionId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const transactionId = "1";
      const res = {
        rawData:
          '{"EndDispenseATMEvent":[{"User":"01234567890123456789","Cashs":[{"cashType":"2","Denominations":[{"cc":"USD","devid":"1","fv":"100","Status":"0","rev":"0","Piece":"10","machinetype":"SDRB-100"}]}],"transactionResult":"0"}]}',
      };
      const expected = res;

      // act
      service
        .getSourceDataFile(transactionId)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });

      // assert
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getLocationSettingsDefault.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const locationId = "1";
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getLocationSettingsDefault}`.replace("{locationId}", locationId);

      // act
      service
        .getLocationSettingsDefault(locationId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const locationId = "1";
      const res = {
        currencies: [
          {
            currencyCode: "USD",
            denominations: [
              {
                exponent: 0,
                faceValue: 100,
                idealCount: 50,
                maxCount: 100,
                minCount: 10,
                isSelectable: true,
                type: "note",
              },
            ],
          },
        ],
      };
      const expected = res;

      // act
      service
        .getLocationSettingsDefault(locationId)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });

      // assert
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.getExistCITCustomerNumbers.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const citId = "1";
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getLocationSettingsCITCustomerNumbers}?citId=${citId}`;

  //     // act
  //     service
  //       .getExistCITCustomerNumbers(citId)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     // arrange
  //     const citId = "1";
  //     const res: ExistCITCustomerNumbers = {
  //       citId: 1,
  //       citRelationInfos: [
  //         {
  //           customerNumber: "1",
  //           locationId: 1,
  //           isRelation: true,
  //           isEnabledServiceEndDate: false,
  //           isEnabledServiceStartDate: false,
  //           serviceEndDate: "",
  //           serviceStartDate: "",
  //         },
  //       ],
  //     };
  //     const expected = res;

  //     // act
  //     service
  //       .getExistCITCustomerNumbers(citId)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     // assert
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getRoles.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const applicationId = 4;
      const expectedUrl = `${confEndpoints.bff}/${config.getRoles}?applicationId=${applicationId}`;
      // act
      service
        .getRoles(applicationId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush({});
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const applicationId = 4;
      const res: GetRole[] = [
        {
          roleId: 1,
          name: "Role 1",
          isActive: true,
        },
        {
          roleId: 2,
          name: "Role 2",
          isActive: true,
        },
      ];
      const expected = res;
      // act
      service
        .getRoles(applicationId)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.deleteRole.name, () => {
    it("should request to correct endpoint by correct http method when delete role inform", (done) => {
      // arrange
      const expectedMethod = "Delete";
      const roleId = "0";
      const applicationId = 5;
      const expectedUrl = `${confEndpoints.bff}/${config.deleteRole}/${roleId}?applicationId=${applicationId}`;

      // act
      service
        .deleteRole(roleId, applicationId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should request to correct endpoint by correct http method when delete role manage", (done) => {
      // arrange
      const expectedMethod = "Delete";
      const roleId = 0;
      const applicationId = 4;
      const expectedUrl = `${confEndpoints.bff}/${config.deleteRole}/${roleId}?applicationId=${applicationId}`;

      // act
      service
        .deleteRole(roleId, applicationId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response when delete role manage", (done) => {
      const roleId = "0";
      const applicationId = 4;
      const mock = jest.fn();

      service.deleteRole(roleId, applicationId).subscribe({
        // assert
        next: () => {
          mock();
        },
        error: (err) => fail(err),
        complete: () => {
          expect(mock).toHaveBeenCalledTimes(1);
          done();
        },
      });

      // act
      http.expectOne({}).flush(null, { status: 204, statusText: "No Content" });
      http.verify();
    });

    it("should return response when delete role inform", (done) => {
      const roleId = "0";
      const applicationId = 5;
      const mock = jest.fn();

      service.deleteRole(roleId, applicationId).subscribe({
        // assert
        next: () => {
          mock();
        },
        error: (err) => fail(err),
        complete: () => {
          expect(mock).toHaveBeenCalledTimes(1);
          done();
        },
      });

      // act
      http.expectOne({}).flush(null, { status: 204, statusText: "No Content" });
      http.verify();
    });
  });

  // describe(BackendService.prototype.getRole.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const params: CreateRoleRes = {
  //       applicationId: 4,
  //     };
  //     const expectedUrl = `${confEndpoints.bff}/${config.getCreateRoleStart}`;

  //     // act
  //     service
  //       .getRole(params)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl + `?applicationId=${params.applicationId}`, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should request to correct endpoint by correct http method have roleId", (done) => {
  //     // arrange
  //     const params: CreateRoleRes = {
  //       roleId: 1,
  //       applicationId: 4,
  //     };

  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getEditRoleStart}`.replace("{roleId}", encodeURIComponent(params.roleId));

  //     // act
  //     service
  //       .getRole(params)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl + `?applicationId=${params.applicationId}`, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res: InitRole = {
  //       isActive: false,
  //       applicationId: 4,
  //       applicationType: "manage",
  //       orders: {
  //         accessOrders: false,
  //         editOrders: false,
  //         deleteOrders: false,
  //         manualCreateEditStandardOrders: false,
  //         manualCreateEditEmergencyOrders: false,
  //         manualOverrideCitStandardOptions: false,
  //         manualPrintOrders: false,
  //         manualPrintAllFormats: false,
  //         manualRequestOrders: false,
  //         manualApproveOrders: false,
  //         manualRejectOrders: false,
  //         manualStopApprovedOrders: false,
  //         manualSendOrders: false,
  //         automaticEditOrders: false,
  //         automaticOverrideCitOptions: false,
  //         automaticPrintOrders: false,
  //         automaticPrintAllFormats: false,
  //         automaticRequestOrders: false,
  //         automaticApproveOrders: false,
  //         automaticRejectOrders: false,
  //         automaticStopApprovedOrders: false,
  //         automaticSendOrders: false,
  //         accessProvisionalCredit: false,
  //         accessProvisionalCreditPrintTransferFile: false,
  //         accessProvisionalCreditPrintTransferFilePrintAllFormats: false,
  //         accessProvisionalCreditSendTransferFile: false,
  //       },
  //       tracking: {
  //         accessTransaction: false,
  //         accessTransactionAddComments: false,
  //         accessTransactionShowSourceData: false,
  //         accessTransactionAllowAddingTransaction: false,
  //         accessInventory: false,
  //         accessInventoryViewPieces: false,
  //         accessInventoryViewValues: false,
  //         accessInventoryHistory: false,
  //       },
  //       cits: {
  //         viewCits: false,
  //         createEditCits: false,
  //         deleteCits: false,
  //         viewGeneralSettings: false,
  //         createEditGeneralSettings: false,
  //         viewOrdersSettings: false,
  //         createEditOrdersSettings: false,
  //         viewServicesSettings: false,
  //         createEditServicesSettings: false,
  //         viewLocationsSettings: false,
  //         createEditLocationsSettings: false,
  //         viewCalendarsSettings: false,
  //         createEditCalendarsSettings: false,
  //       },
  //       devices: {
  //         viewDevices: false,
  //         createEditDevices: false,
  //         deleteDevices: false,
  //       },
  //       locations: {
  //         viewLocations: false,
  //         createEditLocations: false,
  //         deleteLocations: false,
  //         viewGeneralSettings: false,
  //         createEditGeneralSettings: false,
  //         viewDeviceSettings: false,
  //         createEditDeviceSettings: false,
  //         viewCitSettings: false,
  //         createEditCitSettings: false,
  //         viewCurrencySettings: false,
  //         createEditCurrencySettings: false,
  //         viewCalendarSettings: false,
  //         createEditCalendarSettings: false,
  //         viewOrderSettings: false,
  //         createEditOrderSettings: false,
  //         viewProvisionalCreditSettings: false,
  //         createEditProvisionalCreditSettings: false,
  //       },
  //       calendars: {
  //         viewCalendars: false,
  //         createEditCalendars: false,
  //         deleteCalendars: false,
  //         viewServiceSettings: false,
  //         createEditServiceSettings: false,
  //         viewServiceLocationsSettings: false,
  //         createEditServiceLocationsSettings: false,
  //         viewEmergencySettings: false,
  //         createEditEmergencySettings: false,
  //         viewEmergencyLocationsSettings: false,
  //         createEditEmergencyLocationsSettings: false,
  //         viewHolidaySettings: false,
  //         createEditHolidaySettings: false,
  //         viewHolidayLocationsSettings: false,
  //         createEditHolidayLocationsSettings: false,
  //         viewHolidayCitsSettings: false,
  //         createEditHolidayCitsSettings: false,
  //       },
  //       rolesOfManage: {
  //         viewRoles: false,
  //         createEditRoles: false,
  //         deleteRoles: false,
  //       },
  //       rolesOfInform: {
  //         viewRoles: false,
  //         createEditRoles: false,
  //         deleteRoles: false,
  //       },
  //       schedules: {
  //         viewSchedules: false,
  //         createEditSchedules: false,
  //         deleteSchedules: false,
  //         viewScheduleOrder: false,
  //         createEditScheduleOrder: false,
  //         viewScheduleReport: false,
  //         createEditScheduleReport: false,
  //         viewScheduleAlert: false,
  //         createEditScheduleAlert: false,
  //         createEditGlobalSchedule: false,
  //         viewGlobalSchedule: false,
  //         viewScheduleProvisionalCredit: false,
  //         createEditScheduleProvisionalCredit: false,
  //       },
  //       reporting: {
  //         accessReports: false,
  //         accessReportTypes: [
  //           {
  //             type: "collectionCapacity",
  //             displayName: "Collection Capacity",
  //             isAccessible: false,
  //           },
  //         ],
  //       },
  //     };
  //     const params: CreateRoleRes = {
  //       applicationId: 4,
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .getRole(params)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.saveCreateRole.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "POST";
  //     const expectedUrl = `${confEndpoints.bff}/${config.saveCreateRole}`;

  //     const createRoleModal: PostCreateRoleBody = {
  //       isActive: false,
  //       applicationId: 4,
  //       applicationType: "manage",
  //       name: "string",
  //     };
  //     // act
  //     service
  //       .saveCreateRole(createRoleModal)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.saveEditRole.name, () => {
  //   it("should request to correct endpoint by correct http method and return response", (done) => {
  //     // arrange
  //     const expectedMethod = "PUT";
  //     const roleId = "1";
  //     const expectedUrl = `${confEndpoints.bff}/${config.saveEditRole}`.replace("{roleId}", encodeURIComponent(roleId));
  //     const data: PostCreateRoleBody = {
  //       isActive: false,
  //       applicationId: 4,
  //       applicationType: "manage",
  //       name: "string",
  //     };
  //     const res: CreateRoleRes = {
  //       roleId: 1,
  //       applicationId: 4,
  //     };

  //     // act
  //     service
  //       .saveEditRole(roleId, data)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           const expected = res;
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getReportList.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getReportList}`;
      const res: Reporting[] = [
        {
          displayIndex: 1,
          displayName: "name1",
          type: "type",
        },
        {
          displayIndex: 2,
          displayName: "name2",
          type: "type",
        },
      ];

      // act
      service
        .getReportList()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getDisplayItems.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "GET";
      const reportType = "report-type";
      const expectedUrl = `${confEndpoints.bff}/${config.getDisplayItems}?reportType=${reportType}`;
      const res: InitialReport = {
        displayColumns: [
          {
            columnDisplayName: "name",
            columnType: "type",
            displayAlignment: "center",
            displayIndex: 1,
            sort: {
              displayAlignment: "left",
              isSortable: true,
            },
          },
        ],
        exportFormats: ["format"],
        filterTypes: [
          {
            defaultValue: "default",
            filterDisplayName: "displayNameFilter",
            filterParamName: "paramFilterName",
            filterType: "filterType",
            format: "fomat",
            isRequired: true,
          },
        ],
      };

      // act
      service
        .getDisplayItems(reportType)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getReportingData.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getReportingData}`;
      const res = {};
      const body: GetReportingDataRequest = {
        applyDatetime: "2021-09-09T11:08:56+07:00",
        reportType: "reportName1",
        clientDateTimeFormat: "YYYY/MM/DD  hh:mm:ss",
        clientDateFormat: "YYYY/MM/DD",
        clientTimezone: "Asia/Bangkok",
      };

      // act
      service
        .getReportingData(body)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getReportFilterItems.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getReportingFilterItems}`;
      const res: ReportFilterItems = {
        companies: [
          {
            companyId: 7,
            companyName: "AD TTG",
            locations: [{ id: 25, name: "Glory Spain" }],
          },
        ],
        assetTypes: ["DTP_20", "DTP_Fitness"],
        assets: [
          {
            assetId: 105,
            type: "DTP_Fitness",
            serial: "13130313",
          },
          {
            assetId: 119,
            type: "DTP_20",
            serial: "312313",
          },
        ],
      };
      const filterItemsBody: ReportFilterItemsBody = {
        requiredFilterItems: ["1", "2"],
      };

      // act
      service
        .getReportFilterItems(filterItemsBody)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.getExportFile.name, () => {
  //   it("should request to correct endpoint by correct http method and return response", (done) => {
  //     // arrange
  //     const expectedMethod = "POST";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getReportFile}`;
  //     const res = {};
  //     const body: ExportingReportRequest = {
  //       applyDatetime: "2021-09-09T11:08:56+07:00",
  //       reportFormat: "pdf",
  //       reportType: "reportName1",
  //       clientDateFormat: "MM/DD/YYYY",
  //     };

  //     // act
  //     service
  //       .getExportFile(body)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           const expected = res;
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.getCreateEditSchedule.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getCreateSchedule}`;

  //     // act
  //     service
  //       .getCreateEditSchedule()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should request to correct endpoint by correct http method have scheduleId", (done) => {
  //     // arrange
  //     const param: ScheduleParamResId = {
  //       scheduleId: 1,
  //     };

  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getEditSchedule}`.replace("{scheduleId}", encodeURIComponent(param.scheduleId));

  //     // act
  //     service
  //       .getCreateEditSchedule(param)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res: GetCreateSchedule = {
  //       startDate: "2021-09-20",
  //       endDate: "",
  //       scheduleTypes: [
  //         {
  //           id: 1,
  //           typeName: "Orders",
  //           isDefault: true,
  //           scheduleTasks: [
  //             {
  //               id: 1,
  //               isDefault: true,
  //               taskName: "Create Orders",
  //             },
  //             {
  //               id: 2,
  //               isDefault: false,
  //               taskName: "Edit Orders",
  //             },
  //           ],
  //         },
  //       ],
  //       schedulePatterns: [
  //         {
  //           id: 1,
  //           patternName: "Minutes",
  //           isDefault: true,
  //           patternValueDefault: 15,
  //         },
  //         {
  //           id: 2,
  //           patternName: "Hours",
  //           isDefault: false,
  //           patternValueDefault: 1,
  //         },
  //       ],
  //       scopes: [
  //         {
  //           scope: "global",
  //           isDefault: true,
  //         },
  //         {
  //           scope: "local",
  //           isDefault: false,
  //         },
  //       ],
  //       reports: [{ reportName: "Report", reportType: "report" }],
  //       scheduleReportSettings: { emailSubject: "[ReportName]-[RunDate]" },
  //       scheduleAlertSettings: {
  //         alertOptions: [
  //           {
  //             taskId: 5,
  //             taskName: "Late order alert",
  //             emailSubject: "UBIQULAR Manage - [Alert Task Name]",
  //             options: [
  //               {
  //                 optionName: "companyName",
  //                 displayName: "Organisation Name",
  //                 optionValue: true,
  //                 isRequired: false,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     };
  //     const expected = res;

  //     // act
  //     service
  //       .getCreateEditSchedule()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.saveCreateSchedule.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "POST";
  //     const expectedUrl = `${confEndpoints.bff}/${config.postCreateSchedule}`;

  //     const createRoleModal: CreateScheduleBody = {
  //       name: "schedule 001",
  //       typeId: 1,
  //       description: "description 001",
  //       startDate: "2021-09-20",
  //       endDate: "2021-09-21",
  //       patternId: 1,
  //       patternValue: 1,
  //       taskId: 1,
  //       scope: "local",
  //       companyLocations: [],
  //       patternDetail: undefined,
  //       scheduleRunTimePolicy: {
  //         isAdjustForDaylightSavingTimeAutomatically: true,
  //         isUseLocationTimezone: true,
  //         isUseProviderTimezone: true,
  //         runTime: "02:00 AM",
  //         fixedTimezone: "",
  //       },
  //     };
  //     // act
  //     service
  //       .saveCreateSchedule(createRoleModal)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.saveEditSchedule.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "PUT";
  //     const scheduleId = "1";
  //     const expectedUrl = `${confEndpoints.bff}/${config.putSaveSchedule}`.replace("{scheduleId}", encodeURIComponent(scheduleId));

  //     const createRoleModal: UpdateScheduleBody = {
  //       name: "schedule 001",
  //       description: "description 001",
  //       startDate: "2021-09-20",
  //       endDate: "2021-09-21",
  //       patternId: 1,
  //       patternValue: 1,
  //       taskId: 1,
  //       scope: "local",
  //       patternDetail: undefined,
  //       companyLocations: [],
  //       scheduleRunTimePolicy: {
  //         isAdjustForDaylightSavingTimeAutomatically: true,
  //         isUseLocationTimezone: true,
  //         isUseProviderTimezone: true,
  //         runTime: "02:00 AM",
  //         fixedTimezone: "",
  //       },
  //     };
  //     // act
  //     service
  //       .saveEditSchedule(scheduleId, createRoleModal)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.switchStatusSchedule.name, () => {
    it("should request to correct endpoint by correct http method when click stop button", (done) => {
      // arrange
      const expectedMethod = "PUT";
      const scheduleId = "1";
      const expectedUrl = `${confEndpoints.bff}/${config.putStopSchedule}`.replace("{scheduleId}", encodeURIComponent(scheduleId));

      // act
      service
        .switchStatusSchedule(scheduleId, ActionSchedule.STOP)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should request to correct endpoint by correct http method when click re-start button", (done) => {
      // arrange
      const expectedMethod = "PUT";
      const scheduleId = "1";
      const expectedUrl = `${confEndpoints.bff}/${config.putReStartSchedule}`.replace("{scheduleId}", encodeURIComponent(scheduleId));

      // act
      service
        .switchStatusSchedule(scheduleId, ActionSchedule.RE_START)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should request to correct endpoint by correct http method when click paused button", (done) => {
      // arrange
      const expectedMethod = "PUT";
      const scheduleId = "1";
      const expectedUrl = `${confEndpoints.bff}/${config.putPauseSchedule}`.replace("{scheduleId}", encodeURIComponent(scheduleId));

      // act
      service
        .switchStatusSchedule(scheduleId, ActionSchedule.PAUSED)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });
  });

  describe(BackendService.prototype.getSchedules.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const executeMethod = "POST";
      const executeUrl = `${confEndpoints.bff}/${config.getSchedules}`;

      //act
      service
        .getSchedules()
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: executeUrl, method: executeMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const res: ViewSchedulesStartApiResponse = {
        totalCount: 1000,
        sortField: {
          column: "name",
          orderBy: "asc",
        },
        schedules: [
          {
            scheduleId: 1,
            status: "Active",
            name: "Schedules 001",
            startDate: "01/01/2020",
            endDate: "12/31/2021",
            patternType: "Minute",
            scheduleType: "Orders",
            scope: "Local",
            lastRunTime: "12/31/2021 23:45:02",
          },
          {
            scheduleId: 2,
            status: "Paused",
            name: "Schedules 002",
            startDate: "01/01/2020",
            endDate: "12/31/2021",
            patternType: "Hour",
            scheduleType: "Alerts",
            scope: "Global",
            lastRunTime: "12/31/2021 23:45:02",
          },
        ],
      };
      const expected = res;
      // act
      service
        .getSchedules()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getReportDisplayItemsCreateEditSchedule.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const reportType = "type";
      const executeMethod = "GET";
      const executeUrl = `${confEndpoints.bff}/${config.getReportDisplayItemsInCreateEditSchedule}?reportType=${reportType}`;

      //act
      service
        .getReportDisplayItemsCreateEditSchedule(reportType)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: executeUrl, method: executeMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const res: ScheduleReportDisplayItems = {
        filterTypes: [
          {
            filterParamName: "filterCompanies",
            filterDisplayName: "Organisation",
            filterType: "form",
            format: "DD/MM/YYYY",
            isRequired: true,
            defaultValue: "",
            filterDefaultItems: ["Completed", "Partial", "Incomplete", "NotOrdered"],
          },
        ],
        sendEachLocation: true,
        exportFormats: ["pdf"],
      };
      const expected = res;
      // act
      service
        .getReportDisplayItemsCreateEditSchedule("type")
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getFilterItemsReportCreateEditSchedule.name, () => {
    const getFilterBody: GetFilterItemsCreateEditScheduleBody = {
      reportType: "depositReport",
      requiredFilterItems: ["filterCompanies", "filterLocations", "filterAssetTypes", "filterCits"],
      selectedFilterItems: {
        companyIds: [1, 2],
        locationIds: [1, 2],
        assetTypes: ["CI100", "CI150"],
      },
    };
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const executeMethod = "POST";
      const executeUrl = `${confEndpoints.bff}/${config.getFilterItemsReportCreateEditSchedule}`;

      //act
      service
        .getFilterItemsReportCreateEditSchedule(getFilterBody)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: executeUrl, method: executeMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const res: FilterItemsCreateEditScheduleResponse = {
        companies: [
          {
            companyName: "ABC Inc",
            companyId: 1,
            locations: [
              {
                id: 1,
                name: "Honey Rd.",
              },
            ],
          },
        ],
        assetTypes: ["CI100", "CT1550"],
        assets: [
          {
            assetId: 1,
            type: "CI100",
            serial: "1535",
          },
        ],
        cits: [
          {
            id: 1,
            name: "Amorguard",
          },
        ],
      };
      const expected = res;
      // act
      service
        .getFilterItemsReportCreateEditSchedule(getFilterBody)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({}).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.deleteSchedule.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "Delete";
      const scheduleId = "0";
      const expectedUrl = `${confEndpoints.bff}/${config.deleteSchedule}/${scheduleId}`;

      // act
      service
        .deleteSchedule(scheduleId)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      const scheduleId = "0";
      const mock = jest.fn();

      service.deleteSchedule(scheduleId).subscribe({
        // assert
        next: () => {
          mock();
        },
        error: (err) => fail(err),
        complete: () => {
          expect(mock).toHaveBeenCalledTimes(1);
          done();
        },
      });

      // act
      http.expectOne({}).flush(null, { status: 204, statusText: "No Content" });
      http.verify();
    });
  });

  describe(BackendService.prototype.getUserInformation.name, () => {
    // TO DO
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getUserInformation}`;
      const res = {};

      // act
      service
        .getUserInformation()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getReleaseNotes.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getReleaseNotes}`;
      const res = {};

      // act
      service
        .getReleaseNotes()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.changePasswordUser.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.changePassword}`;
      const res = {};

      // act
      service
        .changePasswordUser()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.getCurrentInventories.name, () => {
  //   it("should request to correct endpoint by correct http method and return response", (done) => {
  //     // arrange
  //     const expectedMethod = "POST";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getCurrentInventories}`;
  //     const res = {};

  //     // act
  //     service
  //       .getCurrentInventories({})
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           const expected = res;
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.getCurrentInventoriesFilterItems.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getCurrentInventoriesFilterItems}`;
      const res = {};

      // act
      service
        .getCurrentInventoriesFilterItems()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getInventoryHistories.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getInventoryHistories}`;
      const inventoryHistoriesBody = {
        inventoryType: "all",
        companyIds: [1, 2],
        locationIds: [1, 2],
        assetTypes: ["CI100", "CI150"],
        assetIds: [1, 2],
        startDate: "2020-01-01",
        endDate: "2020-01-01",
        queryLimit: 15,
        queryOffset: 15,
      };
      const res = {};

      // act
      service
        .getInventoryHistories(inventoryHistoriesBody)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getInventoryHistoriesDetails.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "POST";
      const assetId = 1;
      const expectedUrl = `${confEndpoints.bff}/${config.getInventoryHistoriesDetails}`.replace("{assetId}", encodeURIComponent(assetId));
      const inventoryHistoriesDetailsBody = {
        inventoryType: "all",
        startDate: "2020-01-01",
        endDate: "2020-01-01",
        quantityType: "recyclingQuantities",
      };
      const res = {};

      // act
      service
        .getInventoryHistoriesDetails(inventoryHistoriesDetailsBody, assetId)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getInventoryHistoriesFilterItems.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getInventoryHistoriesFilterItems}`;
      const res = {};

      // act
      service
        .getInventoryHistoriesFilterItems()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.getFiltersSchedule.name, () => {
  //   it("should request to correct endpoint by correct http method and return response", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getSchedulesFilterItems}`;
  //     const res: FilterScheduleItems = {
  //       scheduleStatuses: ["future", "active", "paused", "stopped", "expired"],
  //       scheduleTypes: [
  //         {
  //           id: 1,
  //           typeName: "Orders",
  //           scheduleTasks: [
  //             {
  //               id: 1,
  //               taskName: "Create Orders",
  //             },
  //           ],
  //         },
  //       ],
  //       schedulePatterns: [
  //         {
  //           id: 1,
  //           patternName: "Minutes",
  //         },
  //       ],
  //       scheduleScopes: ["global", "local"],
  //     };
  //     const expected = res;

  //     // act
  //     service
  //       .getFiltersSchedule()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.testReportSchedule.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.postTestReportSchedule}`;
      const testReportData: TestReportScheduleBody = {
        typeId: 2,
        taskId: 4,
        report: {
          reportType: "collectionCapacity",
          reportFormat: "pdf",
          filterItems: {
            daysTillFull: 99,
          },
          emailAddress: "",
          emailSubject: "[ReportName]-[RunDate]",
          sendEachLocation: true,
        },
        timeZone: "Asia/Tokyo",
      };
      // act
      service
        .testReportSchedule(testReportData)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    // it("should return response", (done) => {
    //   const res: CreateCITRes = {
    //     citId: "1",
    //   };

    //   const testReportData: TestReportScheduleBody = {
    //     typeId: 2,
    //     taskId: 4,
    //     report: {
    //       reportType: "collectionCapacity",
    //       reportFormat: "pdf",
    //       filterItems: {
    //         daysTillFull: 99,
    //       },
    //       emailAddress: "",
    //       emailSubject: "[ReportName]-[RunDate]",
    //       sendEachLocation: true,
    //     },
    //     timeZone: "Asia/Tokyo",
    //   };
    //   const expected = res;
    //   // act
    //   service
    //     .testReportSchedule(testReportData)
    //     .pipe(
    //       catchError(() => throwError(fail("Unexpected here"))),
    //       tap((response) => {
    //         expect(response).toEqual(expected);
    //       }),
    //     )
    //     .subscribe({
    //       error: done,
    //       complete: done,
    //     });
    //   // act
    //   http.expectOne({}).flush(res);
    //   http.verify();
    // });
  });

  // describe(BackendService.prototype.getLocations.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.viewAssetMap}`;
  //     // act
  //     service
  //       .getLocations()
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res = {
  //       totalCount: 0,
  //       locations: [
  //         {
  //           companyName: "Glory",
  //           isCIConnector: true,
  //           locationName: "Himeji-HQ",
  //           latitude: 33.60639,
  //           longitude: 130.41806,
  //           assets: [
  //             {
  //               serial: "20220517",
  //               type: "CI10",
  //               assetStatus: "Error",
  //               publishedDate: "2022-08-10 07:06:22.721",
  //               deviceClass: "noteRecycler",
  //               subAssets: [
  //                 {
  //                   serial: "20220518",
  //                   type: "ISPK05",
  //                   errorCode: "2004",
  //                   errorDate: "2022-08-10 07:06:22.721",
  //                   deviceClass: "noteRecycler",
  //                   assetStatus: "Error",
  //                   shortErrorMessage: "Unknown error",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .getLocations()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.getLocationOrderReport.name, () => {
  //   it("should request to correct endpoint by correct http method Get", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getLocationOrder}?startDate=2022-09-22&endDate=2022-09-30&maxLocationLimit=10`;
  //     // act
  //     service
  //       .getLocationOrderReport({ startDate: "2022-09-22", endDate: "2022-09-30", maxLocationLimit: 10 })
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res = {
  //       totalValues: [
  //         {
  //           currencyCode: "EUR",
  //           decimalPlaces: 2,
  //           totalValue: 470000,
  //         },
  //       ],
  //       locationOrderValues: [
  //         {
  //           companyId: 1,
  //           companyName: "ABC",
  //           locationId: 1,
  //           locationName: "Oxford",
  //           consolidatedValues: [
  //             {
  //               currencyCode: "EUR",
  //               decimalPlaces: 0,
  //               totalValue: 51000,
  //             },
  //           ],
  //         },
  //       ],
  //       locationOrderDenominations: [
  //         {
  //           currencyCode: "EUR",
  //           decimalPlaces: 2,
  //           consolidatedDenominations: [
  //             {
  //               denominationType: "note",
  //               faceValue: 100,
  //               exponent: 0,
  //               quantity: 30,
  //               value: 3000,
  //             },
  //           ],
  //         },
  //       ],
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .getLocations()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.postLocationOrderDownload, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange

      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.postLocationOrderDownload}`.replace("{locationId}", "1");
      const params = { locationId: 1, clientDateFormat: "DD-MM-YYYY, ddd" };
      const res = {
        fileName: "locationDownload.csv",
        content: "Location content",
      };
      //act
      service
        .postLocationOrderDownload(params)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.postServiceTransactions.name, () => {
  //   it("should request to correct endpoint by correct http method POST", (done) => {
  //     // arrange
  //     const expectedMethod = "POST";

  //     const expectedUrl = `${confEndpoints.bff}/${config.postServiceTransactions}`.replace("{transactionId}", encodeURIComponent(1));

  //     // act
  //     service
  //       .postServiceTransactions({ transactionId: 1, isServiceTransaction: true })
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return success", (done) => {
  //     const res = {
  //       transactionId: 1,
  //     };
  //     const expected = res;
  //     // act
  //     service
  //       .postServiceTransactions({ transactionId: 1, isServiceTransaction: true })
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.getComments.name, () => {
  //   it("should request to correct endpoint by correct http method Get", (done) => {
  //     // arrange
  //     const expectedMethod = "GET";
  //     const id = "1";
  //     const expectedUrl = `${confEndpoints.bff}/${config.getCommentTransaction}/`;
  //     // act
  //     service
  //       .getComments(id)
  //       .pipe(catchError(() => throwError(fail("Unexpected here"))))
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });

  //     http.expectOne({ url: `${expectedUrl}${id}`, method: expectedMethod }).flush([]);
  //     http.verify();
  //   });

  //   it("should return response", (done) => {
  //     const res = [
  //       {
  //         userName: "DK",
  //         commentDatetime: "2014-06-01T12:00:00.000Z",
  //         comment: "DK",
  //         timezone: "Asia/Taipei",
  //       },
  //       {
  //         userName: "DKj",
  //         commentDatetime: "2014-06-01T12:00:00.000Z",
  //         comment: "DKj",
  //         timezone: "Asia/Taipei",
  //       },
  //     ];
  //     const id = "1";
  //     // act
  //     service
  //       .getComments(id)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           expect(response).toEqual(res);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     // act
  //     http.expectOne({}).flush(res);
  //     http.verify();
  //   });
  // });
  describe(BackendService.prototype.postAddNewComment, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const id = 1;
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getCommentTransaction}`;
      const params = {
        id: "1",
        comment: "Transactions",
        timezone: "Asia/Tokyo",
      };
      const res = "Success";
      //act
      service
        .postAddNewComment(params)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: `${expectedUrl}/${id}`, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getProvisionalCredits.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getProvisionalCredits}`;
      const res = {};

      // act
      service
        .getProvisionalCredits({
          queryLimit: 0,
          queryOffset: 0,
        })
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getProvisionalCreditsFilterItems.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getProvisionalCreditsFilterItems}`;
      const res: GetProvisionalCreditsFilterItemsRes = {
        provisionalCreditStatuses: [
          {
            statusCode: "sent",
            statusName: "Sent",
          },
        ],
        provisionalCreditProvider: [
          {
            provisionalCreditProviderId: 1,
            provisionalCreditProviderName: "mock cit",
            provisionalCreditProviderType: "CIT",
          },
          {
            provisionalCreditProviderId: 2,
            provisionalCreditProviderName: "Glory",
            provisionalCreditProviderType: "CIT",
          },
        ],
      };
      const expected = res;

      // act
      service
        .getProvisionalCreditsFilterItems()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getJsonLanguage.name, () => {
    // TO DO
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getJsonLanguage}`;
      const res = {};

      // act
      service
        .getJsonLanguage()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  // describe(BackendService.prototype.getProvisionalCreditData.name, () => {
  //   it("should request to correct endpoint by correct http method and return response", (done) => {
  //     // arrange
  //     const expectedMethod = "POST";
  //     const expectedUrl = `${confEndpoints.bff}/${config.postProvisionalCreditData}`.replace("{provisionalCreditId}", "1");
  //     const param: viewProvisionalCreditRes = {
  //       provisionalCreditId: 1,
  //     };
  //     const res = {
  //       provisionalCreditInformation: {
  //         status: "sftpSendFailure",
  //         provisionalCreditTransferFileId: 1,
  //         providerName: "Provider-01",
  //         fileCreationDate: "2021-04-26",
  //         startDate: "2021-04-26 21:39:10.382",
  //         endDate: "2021-04-26 21:39:10.382",
  //         providerTimezone: "GMT",
  //         fileName: "CCProv_Glory.csv",
  //         detailError: "Upload Failure",
  //       },
  //       provisionalCreditContent: {
  //         headerContent: "H,1,10/10/2020",
  //         detailContent: [
  //           {
  //             safeId: "TestSafe1",
  //             content: "D,2,TestSafe1,DROP,PROV,,10/01/2020 10:05,68,11570,3800,950,6820,0,0,0,0,0,0,0,0,0,0,0,0",
  //           },
  //           {
  //             safeId: "VH458951",
  //             content: "D,3,VH458951,DROP,PROV,,21/01/2020 10:05,68,11570,3800,950,6820,0,0,0,0,0,0,0,0,0,0,0,0",
  //           },
  //           {
  //             safeId: "TestSafe4",
  //             content: "D,4,TestSafe4,DROP,PROV,,21/01/2020 10:05,68,11570,3800,950,6820,0,0,0,0,0,0,0,0,0,0,0,0",
  //           },
  //         ],
  //         footerContent: "F,4",
  //       },
  //       provisionalCreditPrintFormat: [
  //         {
  //           format: "CSV",
  //           isDefault: true,
  //         },
  //       ],
  //     };

  //     // act
  //     service
  //       .getProvisionalCreditData(param)
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           const expected = res;
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
  //     http.verify();
  //   });
  // });

  // describe(BackendService.prototype.getViewProvisionalCreditFilterItems.name, () => {
  //   it("should request to correct endpoint by correct http method", (done) => {
  //     //arrange

  //     const expectedMethod = "POST";
  //     const expectedUrl = `${confEndpoints.bff}/${config.postProvisionalCreditDetailFilterItems}`;

  //     const res = {
  //       companies: [
  //         {
  //           companyId: 1,
  //           companyName: "company name",
  //           locations: [
  //             {
  //               locationId: 1,
  //               locationName: "location name",
  //               assets: [
  //                 {
  //                   assetId: 1,
  //                   assetName: "name",
  //                   safeId: "TestSafe1",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           companyId: 2,
  //           companyName: "company name2",
  //           locations: [
  //             {
  //               locationId: 2,
  //               locationName: "location name2",
  //               assets: [
  //                 {
  //                   assetId: 2,
  //                   assetName: "name2",
  //                   safeId: "VH458951",
  //                 },
  //                 {
  //                   assetId: 3,
  //                   assetName: "name3",
  //                   safeId: "TestSafe4",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     };
  //     //act
  //     service
  //       .getViewProvisionalCreditFilterItems()
  //       .pipe(
  //         catchError(() => throwError(fail("Unexpected here"))),
  //         tap((response) => {
  //           const expected = res;
  //           expect(response).toEqual(expected);
  //         }),
  //       )
  //       .subscribe({
  //         error: done,
  //         complete: done,
  //       });
  //     http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
  //     http.verify();
  //   });
  // });

  describe(BackendService.prototype.printPCReport.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "POST";
      const pcReportId = 1;
      const body: PCReportFormatBody = {
        fileFormat: "csv",
        locationIds: [1, 2],
      };
      const expectedUrl = `${confEndpoints.bff}/print-pc-report/${pcReportId}`;

      // act
      service
        .printPCReport(pcReportId, body)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const orderReport: OrderReport = {
        fileName: "",
        content: "",
      };
      const pcReportId = 1;
      const body: PCReportFormatBody = {
        fileFormat: "csv",
        locationIds: [1, 2],
      };
      const expectedUrl = `${confEndpoints.bff}/print-pc-report/${pcReportId}`;
      const expectedMethod = "POST";

      // act
      service
        .printPCReport(pcReportId, body)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(orderReport);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(orderReport);
      http.verify();
    });
  });

  describe(BackendService.prototype.resendPCReport.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "PUT";
      const id = 1;
      const expectedUrl = `${confEndpoints.bff}/provisional-credit/${id}/resend`;

      // act
      service
        .resendPCReport(id)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const id = 1;
      const expectedUrl = `${confEndpoints.bff}/provisional-credit/${id}/resend`;
      const expectedMethod = "PUT";

      // act
      service
        .resendPCReport(id)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual("success");
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush("success");
      http.verify();
    });
  });

  describe(BackendService.prototype.resendOrder.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/resend/${orderNumber}`;
      const body: ResendOrderBody = {
        orderFormat: "xml",
        orderReportTemplateName: "xml template 1",
      };

      //act
      service
        .resendOrder(orderNumber, body)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const orderReject: OrderRequest = {
        orderNumber: "1",
        status: "rejected",
      };
      const expectedMethod = "PUT";
      const orderNumber = "1";
      const expectedUrl = `${confEndpoints.bff}/create-order/resend/${orderNumber}`;
      const body: ResendOrderBody = {
        orderFormat: "xml",
        orderReportTemplateName: "xml template 1",
      };

      // act
      service
        .resendOrder(orderNumber, body)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual(orderReject);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(orderReject);
      http.verify();
    });
  });

  describe(BackendService.prototype.getMethodPCResend.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      // arrange
      const expectedMethod = "GET";
      const id = 1;
      const expectedUrl = `${confEndpoints.bff}/view-provisional-credits/${id}/provider-data`;

      // act
      service
        .getMethodPCResend(id)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });

    it("should return response", (done) => {
      // arrange
      const id = 1;
      const expectedUrl = `${confEndpoints.bff}/view-provisional-credits/${id}/provider-data`;
      const expectedMethod = "GET";

      // act
      service
        .getMethodPCResend(id)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            expect(response).toEqual("success");
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      // act
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush("success");
      http.verify();
    });
  });

  describe(BackendService.prototype.citExecuteProvisionalCreditFile.name, () => {
    it("should request to correct endpoint by correct http method", (done) => {
      //arrange
      const expectedMethod = "POST";
      const citId = 1;
      const expectedUrl = `${confEndpoints.bff}/cit/${citId}/execute-provisional-credit-file`;
      const body: CitExecuteProvisionalCreditFileBody = {
        executeUtcDatetime: "2023-12-12",
      };

      //act
      service
        .citExecuteProvisionalCreditFile(citId, body)
        .pipe(catchError(() => throwError(fail("Unexpected here"))))
        .subscribe({
          error: done,
          complete: done,
        });

      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush([]);
      http.verify();
    });
  });

  describe(BackendService.prototype.getListWidgets.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "GET";
      const expectedUrl = `${confEndpoints.bff}/${config.getListWidgets}`;
      const res: IListWidgetsModelResponse[] = [
        {
          id: "removals",
          label: "Removals",
        },
        {
          id: "sales",
          label: "Sales",
        },
      ];

      // act
      service
        .getListWidgets()
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getDisplayFilterWidgets.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "POST";
      const widgetType = "sales";
      const expectedUrl = `${confEndpoints.bff}/${config.getDisplayFilterWidgets}`;
      const res: IDisplayFilterItemsRes = {
        actions: [
          {
            label: "export/print",
            type: EActionType.EXPORT,
            items: ["pdf"],
          },
        ],
        filterItems: [
          {
            label: "Organization",
            paramName: "filterCompanies",
            filterType: "multi-select-box",
            isRequired: true,
            defaultValue: "",
          },
        ],
      };

      // act
      service
        .getDisplayFilterWidgets(widgetType)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getWidgetData.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getWidgetData}`;
      const res = {};
      const body: IWidgetsDataModelBody = {
        widgetType: "sales",
        clientDateTimeFormat: "YYYY/MM/DD  hh:mm:ss",
        clientDateFormat: "YYYY/MM/DD",
        clientTimezone: "Asia/Bangkok",
      };

      // act
      service
        .getWidgetData(body)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });

  describe(BackendService.prototype.getFilterItemsWidgets.name, () => {
    it("should request to correct endpoint by correct http method and return response", (done) => {
      // arrange
      const expectedMethod = "POST";
      const expectedUrl = `${confEndpoints.bff}/${config.getFilterItemsWidgets}`;
      const res: IFilterItemsRes = {
        filterCompanies: [
          {
            label: "7",
            value: "AD TTG",
          },
        ],
      };
      const filterItemsBody: IFilterItemsBody = {
        filterCompanies: [1],
        widgetType: "sales",
      };

      // act
      service
        .getFilterItemsWidgets(filterItemsBody)
        .pipe(
          catchError(() => throwError(fail("Unexpected here"))),
          tap((response) => {
            const expected = res;
            expect(response).toEqual(expected);
          }),
        )
        .subscribe({
          error: done,
          complete: done,
        });
      http.expectOne({ url: expectedUrl, method: expectedMethod }).flush(res);
      http.verify();
    });
  });
});
