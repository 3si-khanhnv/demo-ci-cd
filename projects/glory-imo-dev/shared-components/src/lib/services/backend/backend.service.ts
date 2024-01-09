import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  CitExecuteProvisionalCreditFileBody,
  // ExportingReportRequest,
  GetWidgetBodyRequest,
  IDisplayFilterItemsRes,
  IFilterItemsBody,
  IFilterItemsRes,
  IListWidgetsModelResponse,
  IWidgetsDataModelBody,
  IWidgetsDataModelResponse,
  InventoryHistoriesBody,
  InventoryHistoriesFilterItemsBody,
  ResendOrderBody,
  ResendPCReport,
} from ".";
import config from "../../../assets/config.json";



// import { FilterItems } from "../../stores/orders/orders.model";
import { confEndpoints } from "../config/config.service";
import {
  ActionSchedule,
  AssetSettingsRequestBody,
  CIT,
  CalendarDetail,
  CitOrderReportSample,
  CitOrderReportSampleRequestBody,
  CompanyLocationRequestBody,
  CompanyLocationResponse,
  CompanyResponse,
  CurrentInventoriesFilterItemsBody,
  CurrentInventoriesFilterItemsResponse,
  EditOrderStart,
  FilterItemsCreateEditScheduleResponse,
  GetAssetDefaultConfigRes,
  GetAssetListResponseBody,
  GetAssetSettingsRes,
  GetAssetsParams,
  GetCalendarCIT,
  GetCalendarLocation,
  GetCalendarsParams,
  GetCurrentInventoryParams,
  GetCurrentInventoryResponse,
  GetFilterItemsCreateEditScheduleBody,
  GetLocationListResponseBody,
  GetLocationsParams,
  GetOrderDetailsParams,
  GetOrderForecastDetailsRequestBody,
  GetOrdersParams,
  GetOrdersRes,
  GetProvisionalCreditsFilterItemsRes,
  GetReportingDataRequest,
  GetRetailerLocationsRes,
  GetRole,
  GetServiceDateParams,
  GetTransactionsRes,
  GetViewProvisionalCreditsReqBody,
  GetViewProvisionalCreditsRes,
  IDownloadCalendarParams,
  IDownloadCalendarResponse,
  IJsonLanguage,
  ILoginUrl,
  InitialReport,
  InventoryHistoriesDetailsBody,
  InventoryHistoriesDetailsResponse,
  InventoryHistoriesFilterItemsResponse,
  InventoryHistoriesResponse,
  LocationCITResponse,
  LocationSettingsDefaultResponse,
  LocationSettingsServiceAndEmergencyCalendar,
  ManualCompleteOrderBody,
  MethodResendPCReport,
  OrderApprove,
  OrderForecastDetails,
  OrderFormatBody,
  OrderManualComplete,
  OrderReject,
  OrderReport,
  OrderRequest,
  OrderSend,
  OrderStop,
  PCReport,
  PCReportFormatBody,
  PostCreateRoleBody,
  RejectBody,
  RejectComment,
  ReleaseNotesResponse,
  ReportFilterItems,
  ReportFilterItemsBody,
  Reporting,
  ReportingDataResponse,
  ScheduleReportDisplayItems,
  ScheduleResponse,
  SendBody,
  ServiceDateResponse,
  SourceDataFileTransaction,
  StopBody,
  TestReportScheduleBody,
  Token,
  TransactionsFilterItems,
  TransactionsFilterItemsBody,
  TransactionsViewBody,
  UserInformationResponse,
  ViewCalendarsStartApiResponse,
  ViewSchedulesBody,
  ViewSchedulesStartApiResponse
} from "./backend.service.i";
import { BulkDataObject } from "../../stores/index.model";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  constructor(private httpClient: HttpClient) {}

  public getEditOrderDetail(orderNumber: string | number): Observable<EditOrderStart> {
    const endpoint = `${confEndpoints.bff}/${config.getEditOrderDetail}/${orderNumber}`;
    return this.httpClient.get<EditOrderStart>(endpoint);
  }

  public getCompanies(): Observable<CompanyResponse[]> {
    const endpoint = `${confEndpoints.bff}/${config.getCompanies}`;
    return this.httpClient.get<CompanyResponse[]>(endpoint);
  }

  public getCompanyLocations(body?: CompanyLocationRequestBody): Observable<CompanyLocationResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getCompanyLocations}`;
    return this.httpClient.post<CompanyLocationResponse>(endpoint, body);
  }

  public getOrderDetails(params: GetOrderDetailsParams): Observable<LocationCITResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getOrderDetails}?locationId={locationId}&citId={citId}`
      .replace("{locationId}", encodeURIComponent(params.selectedLocationId))
      .replace("{citId}", encodeURIComponent(params.selectedCitId));
    return this.httpClient.get<LocationCITResponse>(endpoint);
  }

  public getOrderForecastDetails(reqBody: GetOrderForecastDetailsRequestBody): Observable<OrderForecastDetails> {
    const endpoint = `${confEndpoints.bff}/${config.getOrderForecastDetails}`;
    return this.httpClient.post<OrderForecastDetails>(endpoint, reqBody);
  }

  public printOrder(orderNumber: string, body: OrderFormatBody): Observable<OrderReport> {
    const endpoint = `${confEndpoints.bff}/${config.printOrder}`.replace("{orderNumber}", encodeURIComponent(orderNumber));
    return this.httpClient.post<OrderReport>(endpoint, body);
  }

  public approveOrder(orderNumber: string): Observable<OrderApprove> {
    const endpoint = `${confEndpoints.bff}/${config.approveOrder}`.replace("{orderNumber}", encodeURIComponent(orderNumber));
    const body = {};

    return this.httpClient.put<OrderApprove>(endpoint, body);
  }

  public requestOrder(orderNumber: string): Observable<OrderRequest> {
    const endpoint = `${confEndpoints.bff}/${config.requestOrder}`.replace("{orderNumber}", encodeURIComponent(orderNumber));
    const body = {};

    return this.httpClient.put<OrderRequest>(endpoint, body);
  }

  public rejectOrder(orderNumber: string, body: RejectBody): Observable<OrderReject> {
    const endpoint = `${confEndpoints.bff}/${config.rejectOrder}`.replace("{orderNumber}", encodeURIComponent(orderNumber));
    return this.httpClient.put<OrderReject>(endpoint, body);
  }

  public stopOrder(orderNumber: string, body: StopBody): Observable<OrderStop> {
    const endpoint = `${confEndpoints.bff}/${config.stopOrder}`.replace("{orderNumber}", encodeURIComponent(orderNumber));

    return this.httpClient.put<OrderStop>(endpoint, body);
  }

  public manualCompleteOrder(orderNumber: string, body: ManualCompleteOrderBody): Observable<OrderManualComplete> {
    const endpoint = `${confEndpoints.bff}/${config.manualCompleteOrder}`.replace("{orderNumber}", encodeURIComponent(orderNumber));

    return this.httpClient.put<OrderManualComplete>(endpoint, body);
  }

  public sendOrder(orderNumber: string, body: SendBody): Observable<OrderSend> {
    const endpoint = `${confEndpoints.bff}/${config.sendOrder}`.replace("{orderNumber}", encodeURIComponent(orderNumber));
    return this.httpClient.put<OrderStop>(endpoint, body);
  }

  public resendOrder(orderNumber: string, body: ResendOrderBody): Observable<OrderSend> {
    const endpoint = `${confEndpoints.bff}/${config.resendOrder}`.replace("{orderNumber}", encodeURIComponent(orderNumber));
    return this.httpClient.put<OrderStop>(endpoint, body);
  }

  public checkServiceDateCreateOrder(data: GetServiceDateParams): Observable<ServiceDateResponse> {
    const endpoint = `${confEndpoints.bff}/${config.checkServiceDate}?citId=${data.citId}&locationId=${data.locationId}&serviceDate=${data.serviceDate}&isSubtractQuantityOnOrder=${data.isSubtractQuantityOnOrder}&statusConsideredAsOnOrder=${data.statusConsideredAsOnOrder}`;
    return this.httpClient.get<ServiceDateResponse>(endpoint);
  }

  public getCurrentInventory(params: GetCurrentInventoryParams): Observable<GetCurrentInventoryResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getCurrentInventory}?locationId={locationId}&citId={citId}`
      .replace("{locationId}", encodeURIComponent(params.locationId))
      .replace("{citId}", encodeURIComponent(params.citId));
    return this.httpClient.get<GetCurrentInventoryResponse>(endpoint);
  }

  public getCITList(): Observable<CIT[]> {
    const endpoint = `${confEndpoints.bff}/${config.getCITList}`;
    return this.httpClient.get<CIT[]>(endpoint);
  }

  public deleteCIT(citId: string): Observable<any> {
    const endpoint = `${confEndpoints.bff}/${config.deleteCIT}/${citId}`;
    return this.httpClient.delete<null>(endpoint);
  }

  public getRetailerLocations(citId?: number | string): Observable<GetRetailerLocationsRes[]> {
    const endpoint = `${confEndpoints.bff}/${config.getRetailerLocations}`;
    if (citId) {
      return this.httpClient.get<GetRetailerLocationsRes[]>(endpoint + `?citId=${citId}`);
    } else {
      return this.httpClient.get<GetRetailerLocationsRes[]>(endpoint);
    }
  }

  public getOrders(data?: GetOrdersParams): Observable<GetOrdersRes> {
    const endpoint = `${confEndpoints.bff}/${config.getOrders}`;
    const params = new HttpParams({
      fromObject: {
        ...data,
      },
    });
    return this.httpClient.get<GetOrdersRes>(endpoint, { params });
  }

  public getRejectDetail(orderNumber: string): Observable<RejectComment[]> {
    const endpoint = `${confEndpoints.bff}/${config.getRejectDetail}?orderNumber=${orderNumber}`;
    return this.httpClient.get<RejectComment[]>(endpoint);
  }

  public getCalendarList(data?: GetCalendarsParams): Observable<ViewCalendarsStartApiResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getCalendarList}`;
    const params = new HttpParams({
      fromObject: {
        ...data,
      },
    });
    return this.httpClient.get<ViewCalendarsStartApiResponse>(endpoint, { params });
  }

  public getCalendarDetail(calendarId: string): Observable<CalendarDetail> {
    const endpoint = `${confEndpoints.bff}/${config.getCalendarDetail}`.replace("{calendarId}", encodeURIComponent(calendarId));
    return this.httpClient.get<CalendarDetail>(endpoint);
  }

  public deleteCalendar(calendarId: string): Observable<any> {
    const endpoint = `${confEndpoints.bff}/${config.deleteCalendar}`.replace("{calendarId}", encodeURIComponent(calendarId));
    return this.httpClient.delete<null>(endpoint);
  }

  // public getFilters(): Observable<FilterItems> {
  //   const endpoint = `${confEndpoints.bff}/${config.getFilters}`;
  //   return this.httpClient.get<FilterItems>(endpoint);
  // }

  public getCITCalendar(): Observable<GetCalendarCIT[]> {
    const endpoint = `${confEndpoints.bff}/${config.getCITCalendar}`;
    return this.httpClient.get<GetCalendarCIT[]>(endpoint);
  }

  public getLocationsCalendar(): Observable<GetCalendarLocation[]> {
    const endpoint = `${confEndpoints.bff}/${config.getLocationsCalendar}`;
    return this.httpClient.get<GetCalendarLocation[]>(endpoint);
  }

  public getCitOrderReportSample(params: CitOrderReportSampleRequestBody) {
    const endpoint = `${confEndpoints.bff}/${config.getCitOrderReportSample}`;
    const body: CitOrderReportSampleRequestBody = params;
    return this.httpClient.post<CitOrderReportSample>(endpoint, body);
  }

  public getAssetList(data?: GetAssetsParams): Observable<GetAssetListResponseBody> {
    const endpoint = `${confEndpoints.bff}/${config.getAssetList}`;
    const params = new HttpParams({
      fromObject: {
        ...data,
      },
    });
    return this.httpClient.get<GetAssetListResponseBody>(endpoint, { params });
  }

  public getLocationList(data?: GetLocationsParams): Observable<GetLocationListResponseBody> {
    const endpoint = `${confEndpoints.bff}/${config.getLocationList}`;
    const params = new HttpParams({
      fromObject: {
        ...data,
      },
    });
    return this.httpClient.get<GetLocationListResponseBody>(endpoint, { params });
  }

  public getAssetSettings(assetId: number): Observable<GetAssetSettingsRes> {
    const endpoint = `${confEndpoints.bff}/${config.getAssetSettings}`.replace("{assetId}", encodeURIComponent(assetId));
    return this.httpClient.get<GetAssetSettingsRes>(endpoint);
  }

  public getAssetDefaultConfiguration(assetId: number): Observable<GetAssetDefaultConfigRes> {
    const endpoint = `${confEndpoints.bff}/${config.getAssetDefaultConfig}`.replace("{assetId}", encodeURIComponent(assetId));
    return this.httpClient.get<GetAssetDefaultConfigRes>(endpoint);
  }

  public updateAssetSettings(assetId: number, assetSettingsRequestBody: AssetSettingsRequestBody): Observable<number> {
    const endpoint = `${confEndpoints.bff}/${config.updateAssetSettings}`.replace("{assetId}", encodeURIComponent(assetId));
    return this.httpClient.post<number>(endpoint, assetSettingsRequestBody);
  }

  public getLocationSettingsServiceAndEmergencyCalendars(): Observable<LocationSettingsServiceAndEmergencyCalendar[]> {
    const endpoint = `${confEndpoints.bff}/${config.getLocationSettingsServiceAndEmergencyCalendars}`;
    return this.httpClient.get<LocationSettingsServiceAndEmergencyCalendar[]>(endpoint);
  }


  public getLocationSettingsDefault(locationId: string): Observable<LocationSettingsDefaultResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getLocationSettingsDefault}`.replace("{locationId}", encodeURIComponent(locationId));
    return this.httpClient.get<LocationSettingsDefaultResponse>(endpoint);
  }

  public getTransactions(transactionBody?: TransactionsViewBody): Observable<GetTransactionsRes> {
    const endpoint = `${confEndpoints.bff}/${config.getTransactions}`;
    return this.httpClient.post<GetTransactionsRes>(endpoint, transactionBody);
  }

  public getTransactionsFilterItems(filterItemsBody?: TransactionsFilterItemsBody): Observable<TransactionsFilterItems> {
    const endpoint = `${confEndpoints.bff}/${config.getTransactionsFilterItems}`;
    return this.httpClient.post<TransactionsFilterItems>(endpoint, filterItemsBody);
  }

  public getSourceDataFile(transactionId: string): Observable<SourceDataFileTransaction> {
    const endpoint = `${confEndpoints.bff}/${config.getSourceDataFile}`.replace("{transactionId}", encodeURIComponent(transactionId));
    return this.httpClient.get<SourceDataFileTransaction>(endpoint);
  }

  public getRoles(applicationId: number): Observable<GetRole[]> {
    const endpoint = `${confEndpoints.bff}/${config.getRoles}?applicationId=${applicationId}`;
    return this.httpClient.get<GetRole[]>(endpoint);
  }

  public deleteRole(roleId: string | number, applicationId: number): Observable<null> {
    const endpoint = `${confEndpoints.bff}/${config.deleteRole}/${roleId}?applicationId=${applicationId}`;
    return this.httpClient.delete<null>(endpoint);
  }

  public saveEditRole(roleId: string, roleBody: PostCreateRoleBody): Observable<null> {
    const endpoint = `${confEndpoints.bff}/${config.saveEditRole}`.replace("{roleId}", encodeURIComponent(roleId));
    return this.httpClient.put<null>(endpoint, roleBody);
  }

  public getReportList(): Observable<Reporting[]> {
    const endpoint = `${confEndpoints.bff}/${config.getReportList}`;
    return this.httpClient.get<Reporting[]>(endpoint);
  }

  public getDisplayItems(reportType: string): Observable<InitialReport> {
    const endpoint = `${confEndpoints.bff}/${config.getDisplayItems}?reportType=${reportType}`;
    return this.httpClient.get<InitialReport>(endpoint);
  }

  public getReportingData(params: GetReportingDataRequest): Observable<ReportingDataResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getReportingData}`;
    return this.httpClient.post<ReportingDataResponse>(endpoint, params);
  }

  public getWidgetData(body: IWidgetsDataModelBody | GetWidgetBodyRequest): Observable<IWidgetsDataModelResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getWidgetData}`;
    return this.httpClient.post<IWidgetsDataModelResponse>(endpoint, body);
  }

  public getReportFilterItems(filterItemsBody?: ReportFilterItemsBody): Observable<ReportFilterItems> {
    const endpoint = `${confEndpoints.bff}/${config.getReportingFilterItems}`;
    return this.httpClient.post<ReportFilterItems>(endpoint, filterItemsBody);
  }

  public switchStatusSchedule(scheduleId: string, action: ActionSchedule): Observable<ScheduleResponse> {
    const body = {};
    let endpoint: string;
    switch (action) {
      case ActionSchedule.STOP:
        endpoint = `${confEndpoints.bff}/${config.putStopSchedule}`.replace("{scheduleId}", encodeURIComponent(scheduleId));
        break;
      case ActionSchedule.RE_START:
        endpoint = `${confEndpoints.bff}/${config.putReStartSchedule}`.replace("{scheduleId}", encodeURIComponent(scheduleId));
        break;
      case ActionSchedule.PAUSED:
        endpoint = `${confEndpoints.bff}/${config.putPauseSchedule}`.replace("{scheduleId}", encodeURIComponent(scheduleId));
        break;
    }

    return this.httpClient.put<ScheduleResponse>(endpoint, body);
  }

  public getSchedules(viewSchedulesBody?: ViewSchedulesBody): Observable<ViewSchedulesStartApiResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getSchedules}`;
    return this.httpClient.post<ViewSchedulesStartApiResponse>(endpoint, viewSchedulesBody);
  }

  public getReportDisplayItemsCreateEditSchedule(reportType: string): Observable<ScheduleReportDisplayItems> {
    const endpoint = `${confEndpoints.bff}/${config.getReportDisplayItemsInCreateEditSchedule}?reportType=${reportType}`;
    return this.httpClient.get<ScheduleReportDisplayItems>(endpoint);
  }

  public getFilterItemsReportCreateEditSchedule(
    getFilterBody: GetFilterItemsCreateEditScheduleBody,
  ): Observable<FilterItemsCreateEditScheduleResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getFilterItemsReportCreateEditSchedule}`;
    return this.httpClient.post<FilterItemsCreateEditScheduleResponse>(endpoint, getFilterBody);
  }

  public deleteSchedule(scheduleId: string): Observable<null> {
    const endpoint = `${confEndpoints.bff}/${config.deleteSchedule}/${scheduleId}`;
    return this.httpClient.delete<null>(endpoint);
  }

  public getUserInformation(): Observable<UserInformationResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getUserInformation}`;
    return this.httpClient.get<UserInformationResponse>(endpoint);
  }

  public changePasswordUser(): Observable<null> {
    const endpoint = `${confEndpoints.bff}/${config.changePassword}`;
    return this.httpClient.post<null>(endpoint, {});
  }
  public getJsonLanguage(): Observable<IJsonLanguage> {
    const endpoint = `${confEndpoints.bff}/${config.getJsonLanguage}`;
    return this.httpClient.get<IJsonLanguage>(endpoint);
  }

   /**
   * send GET requests to BFF Login endpoint
   * @param redirectUrl required URL to redirect after authentication
   */
   public getAuthUrl(redirectUrl: string) {
    const endpoint = `${confEndpoints.bff}/${config.loginAuth}?redirectUrl=${redirectUrl}`;
    return this.httpClient.get<BulkDataObject<ILoginUrl>>(endpoint);
  }


  /**
   * send GET requests to BFF Token endpoint
   * @param  applicationId required Type of Application ID
   * @param redirectUrl required URL to redirect after authentication
   * @param code Authorization code (OAuth2 grant type = authorization_code)
   */
  public setTokenInRedis(redirectUrl: string, code?: string) {
    return this.httpClient.get<Token>(`${confEndpoints.bff}/${config.token}?redirectUrl=${redirectUrl}${(code && `&code=${code}`) || ""}`);
  }

  public getReleaseNotes(): Observable<ReleaseNotesResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getReleaseNotes}`;
    return this.httpClient.get<ReleaseNotesResponse>(endpoint);
  }

  public getCurrentInventoriesFilterItems(
    filterItemsBody?: CurrentInventoriesFilterItemsBody,
  ): Observable<CurrentInventoriesFilterItemsResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getCurrentInventoriesFilterItems}`;
    return this.httpClient.post<CurrentInventoriesFilterItemsResponse>(endpoint, filterItemsBody);
  }

  public getInventoryHistories(inventoryHistoriesBody: InventoryHistoriesBody): Observable<InventoryHistoriesResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getInventoryHistories}`;
    return this.httpClient.post<InventoryHistoriesResponse>(endpoint, inventoryHistoriesBody);
  }

  public getInventoryHistoriesDetails(
    inventoryHistoriesDetailsBody: InventoryHistoriesDetailsBody,
    assetId: number,
  ): Observable<InventoryHistoriesDetailsResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getInventoryHistoriesDetails}`.replace("{assetId}", encodeURIComponent(assetId));
    return this.httpClient.post<InventoryHistoriesDetailsResponse>(endpoint, inventoryHistoriesDetailsBody);
  }

  public getInventoryHistoriesFilterItems(
    filterItemsBody?: InventoryHistoriesFilterItemsBody,
  ): Observable<InventoryHistoriesFilterItemsResponse> {
    const endpoint = `${confEndpoints.bff}/${config.getInventoryHistoriesFilterItems}`;
    return this.httpClient.post<InventoryHistoriesFilterItemsResponse>(endpoint, filterItemsBody);
  }

  public testReportSchedule(testReportBody: TestReportScheduleBody): Observable<any> {
    const endpoint = `${confEndpoints.bff}/${config.postTestReportSchedule}`;
    return this.httpClient.post<any>(endpoint, testReportBody);
  }

  public postLocationOrderDownload(params: IDownloadCalendarParams): Observable<IDownloadCalendarResponse> {
    const endpoint = `${confEndpoints.bff}/${config.postLocationOrderDownload}`.replace(
      "{locationId}",
      encodeURIComponent(params.locationId),
    );
    const body = {
      clientDateFormat: params.clientDateFormat,
    };
    return this.httpClient.post<IDownloadCalendarResponse>(endpoint, body);
  }
  
  public postAddNewComment(params: { id: string; comment: string; timezone: string }): Observable<any> {
    const endpoint = `${confEndpoints.bff}/${config.getCommentTransaction}/${params.id}`;
    const body = {
      comment: params.comment,
      timezone: params.timezone,
    };
    return this.httpClient.post<any>(endpoint, body);
  }

  public getProvisionalCredits(body: GetViewProvisionalCreditsReqBody): Observable<GetViewProvisionalCreditsRes> {
    const endpoint = `${confEndpoints.bff}/${config.getProvisionalCredits}`;
    return this.httpClient.post<GetViewProvisionalCreditsRes>(endpoint, body);
  }

  public getProvisionalCreditsFilterItems(): Observable<GetProvisionalCreditsFilterItemsRes> {
    const endpoint = `${confEndpoints.bff}/${config.getProvisionalCreditsFilterItems}`;
    return this.httpClient.get<GetProvisionalCreditsFilterItemsRes>(endpoint);
  }

  public printPCReport(pcReportId: number, body: PCReportFormatBody): Observable<PCReport> {
    const endpoint = `${confEndpoints.bff}/${config.postPrintPCreport}`.replace("{pcReportId}", encodeURIComponent(pcReportId));
    return this.httpClient.post<PCReport>(endpoint, body);
  }

  public resendPCReport(id: number): Observable<ResendPCReport> {
    const endpoint = `${confEndpoints.bff}/${config.getResendPCreport}`.replace("{id}", encodeURIComponent(id));
    return this.httpClient.put<ResendPCReport>(endpoint, null);
  }

  public getMethodPCResend(id: number): Observable<MethodResendPCReport> {
    const endpoint = `${confEndpoints.bff}/${config.getMethodPCResendReport}`.replace("{id}", encodeURIComponent(id));
    return this.httpClient.get<MethodResendPCReport>(endpoint);
  }

  public citExecuteProvisionalCreditFile(citId: number, body: CitExecuteProvisionalCreditFileBody) {
    const endpoint = `${confEndpoints.bff}/${config.citExecuteProvisionalCreditFile}`.replace("{citId}", encodeURIComponent(citId));
    return this.httpClient.post(endpoint, body);
  }

  // reporting-widgets
  public getListWidgets(): Observable<IListWidgetsModelResponse[]> {
    const endpoint = `${confEndpoints.bff}/${config.getListWidgets}`;
    return this.httpClient.get<IListWidgetsModelResponse[]>(endpoint);
  }

  public getDisplayFilterWidgets(widgetType: string): Observable<IDisplayFilterItemsRes> {
    const body = {
      widgetType: widgetType,
    };
    const endpoint = `${confEndpoints.bff}/${config.getDisplayFilterWidgets}`;
    return this.httpClient.post<IDisplayFilterItemsRes>(endpoint, body);
  }

  public getFilterItemsWidgets(body: IFilterItemsBody): Observable<IFilterItemsRes> {
    const endpoint = `${confEndpoints.bff}/${config.getFilterItemsWidgets}`;
    return this.httpClient.post<IFilterItemsRes>(endpoint, body);
  }
}
