// import * as store from ".";
// import { StatusConsideredAsOnOrder } from "../services/backend/backend.service.i";
// import * as AssetsStore from "./assets/assets";
// import * as CalendarsStore from "./calendar/calendar";
// import * as CITStore from "./cit/cit";
// import * as CommonStore from "./common/common";
// import * as CreateCalendarStore from "./create-calendar/create-calendar";
// import * as CreateCITStore from "./create-cit/create-cit";
// import * as CreateOrderStore from "./create-order/create-order";
// import { AppState } from "./index";
// import * as LocationsStore from "./locations/locations";
// import * as OrdersStore from "./orders/orders";
// jest.mock("../../environments/environment", () => {
//   return {
//     environment: {
//       production: null,
//     },
//   };
// });

// const createState = ({
//   createOrder = null,
//   cits = null,
//   createCIT = null,
//   router = null,
//   orders = null,
//   createCalendar = null,
//   calendars = null,
//   calendarDetail = null,
//   common = null,
//   assets = null,
//   assetSettings = null,
//   editLocation = null,
//   locations = null,
//   transactions = null,
//   createRoleManage = null,
//   createRoleInform = null,
//   roles = null,
//   reporting = null,
//   createSchedule = null,
//   schedules = null,
//   currentInventories = null,
//   userInformation = null,
//   inventoryHistories = null,
//   releaseNotes = null,
//   dashboard = null,
//   removalReport = null,
//   locationInventoryReport = null,
//   locationOrderReport = null,
//   salesReport = null,
//   widgets = null,
// }) => ({
//   createOrder,
//   createCIT,
//   cits,
//   orders,
//   router,
//   createCalendar,
//   calendars,
//   calendarDetail,
//   common,
//   assets,
//   assetSettings,
//   editLocation,
//   locations,
//   transactions,
//   createRoleManage,
//   createRoleInform,
//   roles,
//   reporting,
//   createSchedule,
//   schedules,
//   currentInventories,
//   userInformation,
//   inventoryHistories,
//   releaseNotes,
//   dashboard,
//   removalReport,
//   locationInventoryReport,
//   locationOrderReport,
//   salesReport,
//   widgets,
// });

// const sampleDataCreateOrder: Pick<AppState, "createOrder"> = {
//   createOrder: {
//     processing: undefined,
//     companiesLocations: {},
//     updateCompaniesLocation: {},
//     createOrder: {
//       isCurrentCITRelationOrder: false,
//       eodTime: "10:00 PM",
//       inventoryWarningCheckHours: 8,
//       companyId: 1,
//       companyName: "aaa",
//       citId: 1,
//       citName: "ccc",
//       pavementLimit: "300000",
//       orderFormat: "pdf",
//       orderMethod: "email",
//       sendTime: "11:30 AM",
//       orderTemplateName: "xml template1",
//       pavementLimitCurrencyCode: "USD",
//       locationId: 1,
//       locationName: "bbb",
//       isEmergency: true,
//       isAutomated: false,
//       serviceDate: "2020-10-15T00:05:32.000Z",
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
//       orderNumber: "0",
//       status: "",
//       statusDetail: {
//         dateTime: "",
//         userName: "",
//       },
//       createdAt: "",
//       createdUserName: "",
//       actualOrderQuantities: [],
//       baseCurrencyCode: "NZD",
//       decimalPlaces: undefined,
//       bufferDays: 2,
//       safetyFactor: 30,
//       orderCalculationMethodName: undefined,
//       isSubtractQuantityOnOrder: false,
//       isConsiderFloatsInCalculation: false,
//       isConsiderSafetyFactorInCalculation: false,
//       orderTypeId: 1,
//       locationTimezone: "Europe/London",
//       containerAverageDeposits: [
//         {
//           denominationType: "note",
//           weekDaysUsage: {
//             sunday: 100,
//             monday: 200,
//             tuesday: 300,
//             wednesday: 150,
//             thursday: 250,
//             friday: 350,
//             saturday: 100,
//           },
//         },
//       ],
//       orderBasedOn: "currentInventory",
//       forecastDetails: undefined,
//       statusConsideredAsOnOrder: StatusConsideredAsOnOrder.APPROVED_SENT,
//       serviceEndDate: null,
//       isEnabledServiceEndDate: false,
//       calendars: {
//         finalEmergencyDate: [],
//         finalServiceDate: [],
//       },
//       isConsiderVirtualSafeDataInOrder: false,
//     },
//     orderDetails: {
//       ids: ["0"],
//       entities: {
//         0: {
//           id: 0,
//           currency: "NZD",
//           symbol: "$",
//           denominations: [
//             {
//               type: "note",
//               symbol: "$",
//               exponent: 0,
//               faceValue: 100,
//               quantityPerUnit: 1,
//               decimalPlaces: 2,
//               desiredCalculationCount: 100,
//               recyclableInventoryCount: 10,
//               averageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               isDenominationOrderAvailable: true,
//               totalOnOrder: 0,
//               floats: 0,
//               maxCount: 100,
//               isExceedMaxCountAllowed: true,
//               startOfDayRecycleInventory: 2,
//               mirroringLocationAverageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               recyclableInventoryStartOfDayCount: 2,
//             },
//             {
//               type: "note",
//               symbol: "$",
//               exponent: 0,
//               faceValue: 50,
//               quantityPerUnit: 1,
//               decimalPlaces: 2,
//               desiredCalculationCount: 100,
//               recyclableInventoryCount: 10,
//               averageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               isDenominationOrderAvailable: true,
//               totalOnOrder: 0,
//               floats: 0,
//               maxCount: 100,
//               isExceedMaxCountAllowed: true,
//               startOfDayRecycleInventory: 2,
//               mirroringLocationAverageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               recyclableInventoryStartOfDayCount: 2,
//             },
//             {
//               type: "note",
//               symbol: "$",
//               exponent: 0,
//               faceValue: 20,
//               quantityPerUnit: 1,
//               decimalPlaces: 2,
//               desiredCalculationCount: 100,
//               recyclableInventoryCount: 10,
//               averageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               isDenominationOrderAvailable: true,
//               totalOnOrder: 0,
//               floats: 0,
//               maxCount: 100,
//               isExceedMaxCountAllowed: true,
//               startOfDayRecycleInventory: 2,
//               mirroringLocationAverageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               recyclableInventoryStartOfDayCount: 2,
//             },
//             {
//               type: "note",
//               symbol: "$",
//               exponent: 0,
//               faceValue: 10,
//               quantityPerUnit: 1,
//               decimalPlaces: 2,
//               desiredCalculationCount: 100,
//               recyclableInventoryCount: 10,
//               averageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               isDenominationOrderAvailable: true,
//               totalOnOrder: 0,
//               floats: 0,
//               maxCount: 100,
//               isExceedMaxCountAllowed: true,
//               startOfDayRecycleInventory: 2,
//               mirroringLocationAverageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               recyclableInventoryStartOfDayCount: 2,
//             },
//             {
//               type: "note",
//               symbol: "$",
//               exponent: 0,
//               faceValue: 5,
//               quantityPerUnit: 1,
//               decimalPlaces: 2,
//               desiredCalculationCount: 100,
//               recyclableInventoryCount: 10,
//               averageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               isDenominationOrderAvailable: true,
//               totalOnOrder: 0,
//               floats: 0,
//               maxCount: 100,
//               isExceedMaxCountAllowed: true,
//               startOfDayRecycleInventory: 2,
//               mirroringLocationAverageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               recyclableInventoryStartOfDayCount: 2,
//             },
//             {
//               type: "coin",
//               symbol: "$",
//               exponent: 0,
//               faceValue: 2,
//               quantityPerUnit: 1,
//               decimalPlaces: 2,
//               desiredCalculationCount: 100,
//               recyclableInventoryCount: 10,
//               averageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               isDenominationOrderAvailable: true,
//               totalOnOrder: 0,
//               floats: 0,
//               maxCount: 100,
//               isExceedMaxCountAllowed: true,
//               startOfDayRecycleInventory: 2,
//               mirroringLocationAverageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               recyclableInventoryStartOfDayCount: 2,
//             },
//             {
//               type: "coin",
//               symbol: "$",
//               exponent: 0,
//               faceValue: 1,
//               quantityPerUnit: 1,
//               decimalPlaces: 2,
//               desiredCalculationCount: 100,
//               recyclableInventoryCount: 10,
//               averageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               isDenominationOrderAvailable: true,
//               totalOnOrder: 0,
//               floats: 0,
//               maxCount: 100,
//               isExceedMaxCountAllowed: true,
//               startOfDayRecycleInventory: 2,
//               mirroringLocationAverageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               recyclableInventoryStartOfDayCount: 2,
//             },
//             {
//               type: "coin",
//               symbol: "c",
//               exponent: -2,
//               faceValue: 50,
//               quantityPerUnit: 1,
//               decimalPlaces: 2,
//               desiredCalculationCount: 100,
//               recyclableInventoryCount: 10,
//               averageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               isDenominationOrderAvailable: true,
//               totalOnOrder: 0,
//               floats: 0,
//               maxCount: 100,
//               isExceedMaxCountAllowed: true,
//               startOfDayRecycleInventory: 2,
//               mirroringLocationAverageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               recyclableInventoryStartOfDayCount: 2,
//             },
//             {
//               type: "coin",
//               symbol: "c",
//               exponent: -2,
//               faceValue: 20,
//               quantityPerUnit: 1,
//               decimalPlaces: 2,
//               desiredCalculationCount: 100,
//               recyclableInventoryCount: 10,
//               averageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               isDenominationOrderAvailable: true,
//               totalOnOrder: 0,
//               floats: 0,
//               maxCount: 100,
//               isExceedMaxCountAllowed: true,
//               startOfDayRecycleInventory: 2,
//               mirroringLocationAverageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               recyclableInventoryStartOfDayCount: 2,
//             },
//             {
//               type: "coin",
//               symbol: "c",
//               exponent: -2,
//               faceValue: 10,
//               quantityPerUnit: 1,
//               decimalPlaces: 2,
//               desiredCalculationCount: 100,
//               recyclableInventoryCount: 10,
//               averageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               isDenominationOrderAvailable: true,
//               totalOnOrder: 0,
//               floats: 0,
//               maxCount: 100,
//               isExceedMaxCountAllowed: true,
//               startOfDayRecycleInventory: 2,
//               mirroringLocationAverageUsages: {
//                 monday: 10,
//                 tuesday: 10,
//                 wednesday: 10,
//                 thursday: 10,
//                 friday: 10,
//                 saturday: 10,
//                 sunday: 10,
//               },
//               recyclableInventoryStartOfDayCount: 2,
//             },
//           ],
//         },
//       },
//     },
//     loading: false,
//     orderCalendars: {
//       finalEmergencyDate: [],
//       finalServiceDate: [],
//     },
//     pickupOptionsDefault: {
//       pickupCoin: true,
//       pickupCoinCollect: true,
//       pickupCoinCollectRemove: true,
//       pickupNote: true,
//       pickupNoteCollect: true,
//       pickupNoteCollectRemove: true,
//     },
//     pickupOptionsIsEnabled: {
//       pickupCoin: true,
//       pickupCoinCollect: true,
//       pickupCoinCollectRemove: true,
//       pickupNote: true,
//       pickupNoteCollect: true,
//       pickupNoteCollectRemove: true,
//     },
//     deliveryOptionsDefault: {
//       deliveryCoin: true,
//       deliveryCoinReplenish: true,
//       deliveryNote: true,
//       deliveryNoteReplenish: true,
//     },
//     deliveryOptionsIsEnabled: {
//       deliveryCoin: true,
//       deliveryCoinReplenish: true,
//       deliveryNote: true,
//       deliveryNoteReplenish: true,
//     },
//     orderFormats: [
//       {
//         format: "pdf",
//         default: true,
//       },
//       {
//         format: "xml",
//         default: false,
//       },
//       {
//         format: "csv",
//         default: false,
//       },
//     ],
//     serviceDateValues: {
//       isAllowMultipleOrders: true,
//       onOrderQuantities: [],
//       orderNumbers: [],
//       date: undefined,
//       canDeliver: true,
//       canPickUp: true,
//       isWorkingDay: true,
//     },
//     isSaveSuccess: false,
//     citCutOffTime: {
//       time: "12:00 AM",
//       timezone: "GMT",
//     },
//     displayOrderDetails: {
//       totalValue: "100000",
//       actualOrderQuantities: [],
//       calculationPolicy: {
//         isConsiderFloatsInCalculation: true,
//         isConsiderSafetyFactorInCalculation: false,
//         isSubtractQuantityOnOrder: true,
//         maximumOrderValue: "1",
//         orderCalculationMethod: "dynamic",
//         safetyFactor: 1,
//         statusConsideredAsOnOrder: StatusConsideredAsOnOrder.APPROVED_SENT,
//       },
//       containerAverageDeposits: [],
//       inventoryUpdatedTime: "2022-08-03T00:13:2501:00",
//     },
//   },
// };

// const sampleDataCITs: Pick<AppState, "cits"> = {
//   cits: {
//     citList: {
//       ids: ["0"],
//       entities: {
//         1: {
//           status: "active",
//           id: "1",
//           name: "Armorguard",
//           cashCenters: 100,
//           country: "New Zealand",
//           totalLocationCount: 100,
//           isDeletable: true,
//           isEditable: true,
//         },
//         2: {
//           status: "active",
//           id: "2",
//           name: "CIT-Name2",
//           cashCenters: 100,
//           country: "Afghanistan",
//           totalLocationCount: 100,
//           isDeletable: true,
//           isEditable: false,
//         },
//         3: {
//           status: "active",
//           id: "3",
//           name: "CIT-Name3",
//           cashCenters: 100,
//           country: "Afghanistan",
//           totalLocationCount: 100,
//           isDeletable: true,
//           isEditable: true,
//         },
//       },
//     },
//     loading: false,
//   },
// };

// const sampleDataAssets: Pick<AppState, "assets"> = {
//   assets: {
//     assetList: {
//       ids: ["1"],
//       entities: {
//         1: {
//           id: "f099079a-05f6-4b13-8aee-ec4fc40ea68e",
//           status: "active",
//           type: "TCR-GLR100",
//           serial: "1001",
//           companyName: "ABC inc.",
//           locationName: "Canterbury",
//           currency: "AUD",
//           isSettings: true,
//         },
//       },
//     },
//     pagination: {
//       currentPage: 1,
//       totalCount: 2,
//       pageSizeOptions: [10, 11, 15],
//     },
//     loading: false,
//     filterItems: {
//       companies: [],
//     },
//     filterAndSort: {},
//   },
// };

// const sampleDataLocations: Pick<AppState, "locations"> = {
  // locations: {
  //   locationList: {
  //     ids: ["1"],
  //     entities: {
  //       1: {
  //         id: 1,
  //         locationName: "2nd Floor",
  //         companyName: "Glory",
  //         country: "New Zealand",
  //         addressLine1: "street-01",
  //         addressLine2: "Building01-A",
  //         city: "City A-1",
  //         state: "State A-1",
  //         postalCode: "100001",
  //         currencies: ["AUD", "NZD"],
  //         orderTypeName: "Automatically",
  //         isAutoApproveOrdersAtCutOffTime: true,
  //         isEditable: true,
  //       },
  //     },
  //   },
  //   loading: false,
  //   filterAndSort: {},
  //   filterItems: { companies: [{ id: 1, name: "company a", locations: [] }] },
  //   pagination: {
  //     currentPage: 1,
  //     totalCount: 0,
  //     pageSizeOptions: undefined,
  //   },
  // },
// };

describe("store index", () => {
  describe("userInformationFeatureSelector", () => {
    test('should return userInformationFeatureSelector', () => {
    })
  })
  // describe(`createOrderSelector`, () => {
  //   test("should return createOrder", () => {
  //     // arrange
  //     const initialState = createState({
  //       createOrder: sampleDataCreateOrder.createOrder.createOrder,
  //     });
  //     const expected = {
  //       isCurrentCITRelationOrder: false,
  //       companyId: 1,
  //       companyName: "aaa",
  //       locationId: 1,
  //       locationName: "bbb",
  //       citId: 1,
  //       citName: "ccc",
  //       pavementLimit: "300000",
  //       orderFormat: "pdf",
  //       orderMethod: "email",
  //       sendTime: "11:30 AM",
  //       orderTemplateName: "xml template1",
  //       pavementLimitCurrencyCode: "USD",
  //       isEmergency: true,
  //       isAutomated: false,
  //       serviceDate: "2020-10-15T00:05:32.000Z",
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
  //       orderNumber: "0",
  //       status: "",
  //       statusDetail: {
  //         dateTime: "",
  //         userName: "",
  //       },
  //       createdAt: "",
  //       createdUserName: "",
  //       actualOrderQuantities: [],
  //       baseCurrencyCode: "NZD",
  //       decimalPlaces: undefined,
  //       bufferDays: 2,
  //       safetyFactor: 30,
  //       orderCalculationMethodName: undefined,
  //       isSubtractQuantityOnOrder: false,
  //       isConsiderFloatsInCalculation: false,
  //       isConsiderSafetyFactorInCalculation: false,
  //       orderTypeId: 1,
  //       locationTimezone: "Europe/London",
  //       containerAverageDeposits: [
  //         {
  //           denominationType: "note",
  //           weekDaysUsage: {
  //             sunday: 100,
  //             monday: 200,
  //             tuesday: 300,
  //             wednesday: 150,
  //             thursday: 250,
  //             friday: 350,
  //             saturday: 100,
  //           },
  //         },
  //       ],
  //       orderBasedOn: "currentInventory",
  //       statusConsideredAsOnOrder: StatusConsideredAsOnOrder.APPROVED_SENT,
  //       eodTime: "10:00 PM",
  //       forecastDetails: undefined,
  //       inventoryWarningCheckHours: 8,
  //       serviceEndDate: null,
  //       isEnabledServiceEndDate: false,
  //       calendars: {
  //         finalEmergencyDate: [],
  //         finalServiceDate: [],
  //       },
  //       isConsiderVirtualSafeDataInOrder: false,
  //     };
  //     // act
  //     const actual = store.createOrderSelector(initialState);
  //     // assert
  //     expect(actual).toEqual(expected);
  //   });
  // });

  // describe(`citsSelector`, () => {
  //   test("should return cits", () => {
  //     // arrange
  //     const initialState = createState({
  //       cits: sampleDataCITs.cits.citList.entities,
  //     });
  //     const expected = {
  //       1: {
  //         status: "active",
  //         id: "1",
  //         name: "Armorguard",
  //         cashCenters: 100,
  //         country: "New Zealand",
  //         totalLocationCount: 100,
  //         isDeletable: true,
  //         isEditable: true,
  //       },
  //       2: {
  //         status: "active",
  //         id: "2",
  //         name: "CIT-Name2",
  //         cashCenters: 100,
  //         country: "Afghanistan",
  //         totalLocationCount: 100,
  //         isDeletable: true,
  //         isEditable: false,
  //       },
  //       3: {
  //         status: "active",
  //         id: "3",
  //         name: "CIT-Name3",
  //         cashCenters: 100,
  //         country: "Afghanistan",
  //         totalLocationCount: 100,
  //         isDeletable: true,
  //         isEditable: true,
  //       },
  //     };

  //     // act
  //     const actual = store.citsSelector(initialState);
  //     // assert
  //     expect(actual).toEqual(expected);
  //   });
  // });

  // describe("assetsSelector", () => {
  //   test("should return assets", () => {
  //     // arrange
  //     const initialState = createState({
  //       assets: sampleDataAssets.assets.assetList.entities,
  //     });
  //     const expected = {
  //       1: {
  //         id: "f099079a-05f6-4b13-8aee-ec4fc40ea68e",
  //         status: "active",
  //         type: "TCR-GLR100",
  //         serial: "1001",
  //         companyName: "ABC inc.",
  //         locationName: "Canterbury",
  //         currency: "AUD",
  //         isSettings: true,
  //       },
  //     };
  //     // act
  //     const actual = store.assetsSelector(initialState);
  //     expect(actual).toEqual(expected);
  //   });
  // });

  // describe("locationsSelector", () => {
  //   test("should return locations", () => {
  //     // arrange
  //     const initialState = createState({
  //       locations: sampleDataLocations.locations.locationList.entities,
  //     });
  //     const expected = {
  //       1: {
  //         id: 1,
  //         locationName: "2nd Floor",
  //         companyName: "Glory",
  //         country: "New Zealand",
  //         addressLine1: "street-01",
  //         addressLine2: "Building01-A",
  //         city: "City A-1",
  //         state: "State A-1",
  //         postalCode: "100001",
  //         currencies: ["AUD", "NZD"],
  //         orderTypeName: "Automatically",
  //         isAutoApproveOrdersAtCutOffTime: true,
  //         isEditable: true,
  //       },
  //     };
  //     // act
  //     const actual = store.locationsSelector(initialState);
  //     expect(actual).toEqual(expected);
  //   });
  // });

  // describe(store.getReducers.name, () => {
  //   test(`metaReducers should return empty array on production`, () => {
  //     // arrange
  //     const expected = [];

  //     // act
  //     const act = store.metaReducers;

  //     // assert
  //     expect(act).toEqual(expected);
  //   });

  //   test(`getReducers has been called`, () => {
  //     // arrange
  //     const expected = {
  //       assetSettings: expect.any(Function),
  //       assets: expect.any(Function),
  //       calendarDetail: expect.any(Function),
  //       calendars: expect.any(Function),
  //       cits: expect.any(Function),
  //       common: expect.any(Function),
  //       createCIT: expect.any(Function),
  //       provisionalCredits: expect.any(Function),
  //       createCalendar: expect.any(Function),
  //       createOrder: expect.any(Function),
  //       createRoleManage: expect.any(Function),
  //       createRoleInform: expect.any(Function),
  //       createSchedule: expect.any(Function),
  //       currentInventories: expect.any(Function),
  //       editLocation: expect.any(Function),
  //       inventoryHistories: expect.any(Function),
  //       locations: expect.any(Function),
  //       orders: expect.any(Function),
  //       reporting: expect.any(Function),
  //       roles: expect.any(Function),
  //       router: expect.any(Function),
  //       schedules: expect.any(Function),
  //       transactions: expect.any(Function),
  //       userInformation: expect.any(Function),
  //       releaseNotes: expect.any(Function),
  //       dashboard: expect.any(Function),
  //       removalReport: expect.any(Function),
  //       locationInventoryReport: expect.any(Function),
  //       locationOrderReport: expect.any(Function),
  //       salesReport: expect.any(Function),
  //       viewProvisionalCredit: expect.any(Function),
  //       widgets: expect.any(Function),
  //     };

  //     // act
  //     const act = store.getReducers();

  //     // assert
  //     expect(act).toEqual(expected);
  //   });

  //   test("createOrderSelector should return createOrder", () => {
  //     // arrange
  //     const expected = CreateOrderStore.reducer;

  //     // act
  //     const actual = store.getReducers().createOrder;

  //     // assert
  //     expect(actual).toEqual(expected);
  //   });

  //   test("createCITSelector should return createCIT", () => {
  //     // arrange
  //     const expected = CreateCITStore.reducer;

  //     // act
  //     const actual = store.getReducers().createCIT;

  //     // assert
  //     expect(actual).toEqual(expected);
  //   });

  //   test("citsSelector should return cits", () => {
  //     // arrange
  //     const expected = CITStore.reducer;

  //     // act
  //     const actual = store.getReducers().cits;

  //     // assert
  //     expect(actual).toEqual(expected);
  //   });

  //   test("ordersSelector should return orders", () => {
  //     // arrange
  //     const expected = OrdersStore.mainOrdersReducer;

  //     // act
  //     const actual = store.getReducers().orders;

  //     // assert
  //     expect(actual).toEqual(expected);
  //   });

  //   test("createCalendarSelector should return createCalendar", () => {
  //     // arrange
  //     const expected = CreateCalendarStore.reducer;

  //     // act
  //     const actual = store.getReducers().createCalendar;

  //     // assert
  //     expect(actual).toEqual(expected);
  //   });

  //   test("calendarsSelector should return calendars", () => {
  //     // arrange
  //     const expected = CalendarsStore.reducer;

  //     // act
  //     const actual = store.getReducers().calendars;

  //     // assert
  //     expect(actual).toEqual(expected);
  //   });

  //   test("commonSelector should return common", () => {
  //     // arrange
  //     const expected = CommonStore.commonReducer;

  //     // act
  //     const actual = store.getReducers().common;

  //     // assert
  //     expect(actual).toEqual(expected);
  //   });

  //   test("assetsSelector should return assets", () => {
  //     // arrange
  //     const expected = AssetsStore.reducer;
  //     // act
  //     const actual = store.getReducers().assets;
  //     // assert
  //     expect(actual).toEqual(expected);
  //   });

  //   test("locationsSelector should return locations", () => {
  //     // arrange
  //     const expected = LocationsStore.reducer;
  //     // act
  //     const actual = store.getReducers().locations;
  //     // assert
  //     expect(actual).toEqual(expected);
  //   });
  // });
});
