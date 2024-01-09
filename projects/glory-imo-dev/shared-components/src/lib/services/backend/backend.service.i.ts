import { DenominationType } from "../../constants/asset";
import { WidgetsPermissions } from "../../stores/user-information";

export interface CompanyResponse {
  companyId: number;
  companyName: string;
}

export interface LocationResponse extends CompanyResponse {
  id: number;
  name: string;
  citId: number;
  citName?: string;
}

export interface CompanyLocationResponse {
  companies?: CompanyResponse[];
  locations?: LocationResponse[];
}

export interface CompanyLocationRequestBody {
  linkedCit?: boolean;
  linkedCitId?: number;
  isOnlyCompany?: boolean;
  isOnlyLocation?: boolean;
  companyIds?: number[];
}

export interface GetOrderDetailsParams {
  selectedLocationId: number | string;
  selectedCitId: number | string;
}

export interface DaysOfTheWeek {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

export type OrderDetails = {
  currencyCode: string;
  decimalPlaces: number;
  symbol: string;
  denominations: {
    type: string;
    faceValue: number;
    exponent: number;
    symbol: string;
    quantityPerUnit: number;
    desiredCalculationCount?: number;
    recyclableInventoryCount: number;
    averageUsages: {
      monday: number;
      tuesday: number;
      wednesday: number;
      thursday: number;
      friday: number;
      saturday: number;
      sunday: number;
    };
    mirroringLocationAverageUsages?: {
      monday: number;
      tuesday: number;
      wednesday: number;
      thursday: number;
      friday: number;
      saturday: number;
      sunday: number;
    };
    isDenominationOrderAvailable: boolean;
    floats: number;
    maxCount: number;
    isExceedMaxCountAllowed: boolean;
    recyclableInventoryStartOfDayCount: number;
  }[];
}[];

export interface EditOrderStart {
  orderDetail: {
    order: {
      orderId: number;
      orderNumber: string;
      companyId: number;
      locationId: number;
      citId: number;
      isAutomated: boolean;
      isEmergency: boolean;
      serviceDate: string;
      pickupCoin: boolean;
      pickupCoinCollect: boolean;
      pickupCoinCollectRemove: boolean;
      pickupNote: boolean;
      pickupNoteCollect: boolean;
      pickupNoteCollectRemove: boolean;
      deliveryCoin: boolean;
      deliveryCoinReplenish: boolean;
      deliveryNote: boolean;
      deliveryNoteReplenish: boolean;
      status: string;
      statusDetail: {
        userName: string;
        dateTime: string;
      };
      createdAt: string;
      createdUserName: string;
      rejectedDetail?: RejectedDetail[];
      actualOrderQuantities: {
        currencyCode: string;
        decimalPlaces: number;
        type: string;
        faceValue: number;
        exponent: number;
        symbol: string;
        quantity: number;
        quantityPerUnit: number;
        desiredCalculationCount?: number;
        currentRecycleInventory: number;
        averageUsages: {
          monday: number;
          tuesday: number;
          wednesday: number;
          thursday: number;
          friday: number;
          saturday: number;
          sunday: number;
        };
        mirroringLocationAverageUsages?: {
          monday: number;
          tuesday: number;
          wednesday: number;
          thursday: number;
          friday: number;
          saturday: number;
          sunday: number;
        };
        isDenominationOrderAvailable: boolean;
        currentInventory: number;
        forecastUsageDetail: {
          date: string;
          dayOfWeek: string;
          isMirroring: boolean;
          mirrorLocationId: number;
          mirrorLocationName: string;
          count: number;
        }[];
        forecastUsageTotal: number;
        forecastInventory: number;
        desiredInventory: number;
        onOrder: number;
        suggestedNeed: number;
        packSize: number;
        suggestedOrder: number;
        floats: number;
        maxCount: number;
        isExceedMaxCountAllowed: boolean;
        startOfDayRecycleInventory?: number;
        isEnabledVirtualSafe: boolean;
        currentVirtualSafeInventory: number;
      }[];
      manualCompletedInfo?: {
        userName: string;
        comment?: string;
        manualCompletedAt: string;
      };
      completedUserName?: string;
      completedAt?: string;
      containerAverageDeposits: CreateEditOderAverageDeposit[];
      mirroringLocationContainerAverageDeposits?: CreateEditOderAverageDeposit[];
      storedContainerAverageDeposits?: {
        denominationType: string;
        averageDeposits: {
          date: string;
          dayOfWeek: string;
          isMirroring: boolean;
          mirrorLocationId: number;
          mirrorLocationName: string;
          isBufferDay: boolean;
          count: number;
        }[];
      }[];
      storedInventoryUpdatedTime?: string;
      currentInventoryUpdatedTime?: string;
      forecastDetails: OrderForecastDetails;
      orderBasedOn: string;
      startOfDayInventoryUpdatedTime?: string;
      mailOrders: mailOrdersStatus[];
    };
    location: {
      id: number;
      name: string;
      companyId: number;
      companyName: string;
      mirroringLocation?: {
        id: number;
        name: string;
        endDate: string;
      };
      eodTime: string;
      inventoryWarningCheckHours: number;
      serviceEndDate: string;
      isEnabledServiceEndDate: boolean;
      isCurrentCITRelationOrder: boolean;
    };
    cit: {
      citId: string;
      name: string;
      pavementLimit: string;
      orderFormat: string;
      orderTemplateName: string;
      orderMethod: string;
      sendTime: string;
    };
  };
  companies: {
    id: number;
    name: string;
    locations: {
      id: number;
      name: string;
      citId: number;
      citName: string;
      pavementLimit: string;
    }[];
  }[];
  calendars: LocationCITResponse["calendars"];
  pickupOptions: PickupOptions;
  deliveryOptions: DeliveryOptions;
  exchangeRates?: {
    baseCurrencyCode: string;
    rates: { code: string; rate: number }[];
  };
  orderFormats: OrderFormats[];
  baseCurrencyCode: string;
  pavementLimitCurrencyCode: string;
  decimalPlaces: number;
  bufferDays: number;
  orderCalculationMethodName: EOrderCalculationMethod;
  safetyFactor: number;
  isSubtractQuantityOnOrder: boolean;
  statusConsideredAsOnOrder: StatusConsideredAsOnOrder;
  isConsiderFloatsInCalculation: boolean;
  isConsiderSafetyFactorInCalculation: boolean;
  onOrderQuantities: {
    currencyCode: string;
    decimalPlaces: number;
    exponent: number;
    faceValue: number;
    quantity: number;
    type: string;
  }[];
  orderTypeId: number;
  citCutOffTime: {
    time: string;
    timezone?: string;
  };
  locationTimezone: string;
  citOrderMethod: string;
  citContactEmailAddress?: string;
  citOrderEmailAddress?: string;
  isConsiderVirtualSafeDataInOrder: boolean;
  // serviceEndDate: string;
}

export interface mailOrdersStatus {
  emailAddress: string;
  sendTime: string;
  status: string;
  isCitEmail: boolean;
}

export interface GetOrderForecastDetailsRequestBody {
  locationId: number;
  citId: number;
  serviceDate?: string;
  orderBasedOn: string;
  isEmergency: boolean;
  excludedOrderNumber?: string;
}

export interface CreateEditOderAverageDeposit {
  denominationType: string;
  weekDaysUsage: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
}

export interface ForecastUsageDetail {
  date: string;
  dayOfWeek: string;
  isMirroring: boolean;
  mirrorLocationId?: number;
  mirrorLocationName?: string;
  count: number;
  isServiceDate: boolean;
  isBufferDay: boolean;
  isOrdered: boolean;
}

export interface OrderForecastDetailsGetCalculationPolicy {
  isConsiderSafetyFactorInCalculation: boolean;
  isConsiderFloatsInCalculation: boolean;
  isSubtractQuantityOnOrder: boolean;
  statusConsideredAsOnOrder: StatusConsideredAsOnOrder;
  safetyFactor: number;
  orderCalculationMethod: string;
  maximumOrderValue: string;
}

export interface OrderForecastDetailsActualOrderQuantities {
  currencyCode: string;
  faceValue: number;
  type: string;
  exponent: number;
  currentInventory: number;
  forecastUsageDetail: ForecastUsageDetail[];
  forecastUsageTotal: number;
  desiredInventory: number;
  safetyFactorQuantity: number;
  forecastEndingInventory: number;
  floats: number;
  isTriggerAnOrder: boolean;
  forecastUsageUpToDelivery: number;
  quantityOnOrder: number;
  forecastInventoryAtEndOfDeliveryDate: number;
  suggestedNeed: number;
  packSize: number;
  orderAdjustedPackSize: number;
  totalInventoryAfterDelivery: number;
  maxForDenomination: number;
  isExceedMaxCountAllowed: boolean;
  orderValue: number;
  orderToPlace: number;
  quantity: number;
  suggestedOrder: number;
  decimalPlaces: number;
  isEnabledVirtualSafe: boolean;
  currentVirtualSafeInventory: number;
}

export interface OrderForecastDetailsContainerAverageDeposits {
  containerType: string;
  containerDepositDetail: {
    date: string;
    dayOfWeek: string;
    isMirroring: boolean;
    mirrorLocationId?: number;
    mirrorLocationName?: string;
    count: number;
  }[];
  containerCapacity: number;
  floats: number;
  currentInventory: number;
  orderToPlace: string;
  isTriggerAnOrder: boolean;
  forecastDepositTotal: number;
  forecastEndingInventory: number;
  quantityOnOrder: number;
}

export interface OrderForecastDetails {
  totalValue: string;
  inventoryUpdatedTime: string;
  calculationPolicy: OrderForecastDetailsGetCalculationPolicy;
  actualOrderQuantities: OrderForecastDetailsActualOrderQuantities[];
  containerAverageDeposits: OrderForecastDetailsContainerAverageDeposits[];
}

export type OrderReportTemplate = "Armaguard AUD CSV";

export interface OrderFormatBody {
  format: string;
  clientDateFormat: string;
  orderTemplateName?: OrderReportTemplate;
}

export interface OrderReport {
  fileName: string;
  content: string;
}

export interface OrderRequest {
  orderNumber: string;
  status: string;
}

export interface OrderApprove {
  orderNumber: string;
  status: string;
}

export interface OrderReject {
  orderNumber: string;
  status: string;
}

export type OrderManualComplete = OrderReject;

export interface RejectBody {
  reason: string;
}

export interface ManualCompleteOrderBody {
  comment?: string;
}

export interface OrderStop {
  orderNumber: string;
  status: string;
}

export interface SendBody {
  orderFormat: string;
  orderTemplateName: string;
}

export interface ResendBody {
  orderFormat: string;
  orderReportTemplateName: string;
}

export interface ResendOrderBody {
  orderFormat: string;
  orderReportTemplateName: string;
}

export interface StopBody {
  orderFormat: string;
  orderTemplateName: string;
}

export interface OrderSend {
  orderNumber: string;
  status: string;
}

export interface GetServiceDateParams {
  locationId: string | number;
  citId: number;
  serviceDate: string;
  isSubtractQuantityOnOrder: boolean;
  statusConsideredAsOnOrder: StatusConsideredAsOnOrder;
}

export interface GetCurrentInventoryParams {
  locationId: string;
  citId: string;
}

export interface CurrencyDenominations {
  currencyCode: string;
  decimalPlaces: number;
  symbol: string;
  denominations: {
    type: string;
    faceValue: number;
    exponent: number;
    symbol: string;
    quantityPerUnit: number;
    desiredCalculationCount?: number;
    recyclableInventoryCount: number;
    averageUsages: DaysOfTheWeek;
    mirroringLocationAverageUsages?: DaysOfTheWeek;
    floats: number;
    maxCount: number;
    isExceedMaxCountAllowed: boolean;
    isSelectVirtualSafe: boolean;
  }[];
}

export interface GetCurrentInventoryResponse {
  currencyDenominations: CurrencyDenominations[];
  containerAverageDeposits: Array<{
    denominationType: string;
    weekDaysUsage: DaysOfTheWeek;
  }>;
  mirroringLocationContainerAverageDeposits: Array<{
    denominationType: string;
    weekDaysUsage: DaysOfTheWeek;
  }>;
  inventoryUpdatedTime: string;
}

export interface OnOrderQuantity {
  currencyCode: string;
  decimalPlaces: number;
  exponent: number;
  faceValue: number;
  quantity: number;
  type: string;
}

export interface ServiceDateResponse {
  isAllowMultipleOrders: boolean;
  orderNumbers: string[];
  onOrderQuantities: OnOrderQuantity[];
  canPickUp: boolean;
  canDeliver: boolean;
}

export interface CIT {
  status?: string;
  id: string;
  name: string;
  cashCenters?: number | string;
  country: string;
  totalLocationCount: number;
  isEditable: boolean;
  isDeletable: boolean;
}

export interface CITProvisionalCredit {
  provisionalCreditPolicy: {
    isProvideProvisionalCredit: boolean;
    transferTime?: string;
    provisionalCreditFormat?: string;
    provisionalCreditTemplateName?: string;
    provisionalCreditTemplateId?: number;
    provisionalCreditTransferMethod?: "sftp" | "email" | "manual";
    provisionalCreditTransferMethodSelected?: string;
    isUseOrderTransferSetting?: boolean;
    email?: {
      emailAddress: string;
    };
    sftp?: {
      url: string;
      optionalFolder?: string;
      port: number;
      sftpAuthMethodName: string;
      sftpAuthMethodId: number;
      user: string;
      password: string;
    };
    manual?: unknown;
    notificationEmailAddress?: string;
    isDesignatedTestProvisionalCredit?: boolean;
  };
}

export interface GetRetailerLocationsRes {
  id: number;
  name: string;
  locations: RetailerCITLocation[];
}

export interface RetailerCITLocation {
  id: number;
  name: string;
  cits: RetailerCITLinkLocation[];
}

export interface RetailerCITLinkLocation {
  citId: number;
  customerNumber?: string;
  isLocationOrder: boolean;
  isLocationProvisionalCredit: boolean;
  isEnabledServiceStartDate: boolean;
  serviceStartDate?: string;
  isEnabledServiceEndDate: boolean;
  serviceEndDate?: string;
}

export interface Assets {
  assetId: number;
  status: string;
  type: string;
  serial: string;
  isSupportProvisionalCredit: boolean;
  provisionalCreditSafeId: string;
}

export interface GetOrdersRes {
  sortField: SortField;
  orders: OrderItem[];
  totalCount: number;
}

export interface SortField {
  column: EOrdersSortColumn;
  orderBy: EOrdersSort;
}

export enum EOrdersSortColumn {
  STATUS = "status",
  TYPE = "type",
  ORDER_NUMBER = "orderNumber",
  PLACE_DATE = "placeDate",
  SERVICE_DATE = "serviceDate",
  CIT = "cit",
  CUT_OFF_TIME = "cutOffTime",
  COMPANY = "company",
  LOCATION = "location",
  ORDER_VALUE = "orderValue",
}

export enum EOrdersSort {
  ASC = "asc",
  DESC = "desc",
}

export interface OrderCitServiceProgress {
  requestedServiceName: string;
  requestedServiceStatus: string;
}

export interface OrderItem {
  orderNumber: string;
  status: string;
  citServiceProgress?: OrderCitServiceProgress[];
  isAutomated: boolean;
  placeDate: string;
  serviceDate: string;
  citName: string;
  citTimezone?: string;
  citCutOffTime: string;
  citCutOffTimezone?: string;
  companyName: string;
  locationName: string;
  locationTimezone?: string;
  orderValue: string;
  decimalPlaces: number;
  isEditable: boolean;
  isEmergency: boolean;
  baseCurrencyCode: string;
  currencyCodes?: string[];
  manualCompletedInfo?: {
    userName: string;
    comment?: string;
    manualCompletedAt: string;
  };
}

export interface ViewCalendarsStartApiResponse {
  sortField: {
    column: string;
    orderBy: string;
  };
  calendars: Calendar[];
}
export interface Calendar {
  calendarId: string;
  name: string;
  type: string;
  startDate?: string;
  endDate?: string;
  linkedLocation?: number;
  linkedCit?: number;
  isDeletable: boolean;
}

export interface CalendarDetail {
  cits?: Array<CalendarDetailCitParams>;
  locations?: Array<CalendarDetailLocationParams>;
}

export interface CalendarDetailLocationParams {
  locationId: number;
}

export interface CalendarDetailCitParams {
  citId: string;
}

export interface CalendarType {
  default: boolean;
  id: number;
  name: string;
}
export interface GetCalendarCIT {
  citId: number;
  name: string;
  country: string;
}

export interface LocationOfCalendar {
  id: number;
  name: string;
  companyId: number;
  companyName: string;
}

export interface GetCalendarLocation {
  id: number;
  name: string;
  locations: Array<{
    id: number;
    name: string;
  }>;
}

export class CitOrderReportSampleRequestBody {
  isRequireSpecification: boolean;
  isOrderNotNeeded: boolean;
  orderTemplateId: string;
  orderTemplateFormat: string;
  orderTemplateName: string;
  orderTemplateFileName: string;
}

export type CitOrderReportSample = {
  fileName: string;
  content: string;
};

export interface GetOrdersParams {
  status?: string;
  type?: string;
  orderNumber?: string;
  citId?: string;
  companyId?: string;
  locationId?: string;
  startPlacedDate?: string;
  endPlacedDate?: string;
  startServiceDate?: string;
  endServiceDate?: string;
  isEmergency?: string;
  sortColumn?: string;
  sort?: string;
  limit?: string;
  offset?: string;
}

export interface GetCalendarsParams {
  name?: string;
  calendarTypeId?: string;
  startDate?: string;
  endDate?: string;
  sortColumn?: string;
  sort?: string;
}

export interface AssetItem {
  assetId: string;
  status: string;
  type: string;
  serial: number | string;
  companyName: string;
  locationName: string;
  currencies: Array<string>;
  locationId?: number;
  provisionalCreditSettings?: PCSettings;
}

interface PCSettings {
  isCreditCoinContainer: boolean;
  isCreditCoinRecycler: boolean;
  isCreditManualDepositCheques: boolean;
  isCreditManualDepositCoins: boolean;
  isCreditManualDepositNotes: boolean;
  isCreditManualDepositOther: boolean;
  isCreditNoteContainer: boolean;
  isCreditNoteRecycler: boolean;
  isSupportProvisionalCredit: boolean;
  provisionalCreditSafeId: string;
}
export interface GetAssetListResponseBody {
  assets: AssetItem[];
  totalCount: number;
  sortField: {
    column: string;
    orderBy: string;
  };
}

export interface Denomination {
  isSelectable: boolean;
  type: string;
  faceValue: number;
  exponent: number;
  minCount: number;
  idealCount: number;
  maxCount: number;
  floats: number;
  isExceedMaxCountAllowed: boolean;
  acceptanceVariance: number;
  citAcceptanceVariance?: number;
  isSelectVirtualSafe: boolean;
}

export interface CITCustomerNumber {
  citId: number;
  customerNumber: string;
  isRelation?: boolean;
}

export interface Asset {
  assetId: number;
  status: string;
  type: string;
  serial: string;
  provisionalCreditSettings?: LocationAssetsProvisionalCreditSettingsSetValue;
}

export interface LocationAssetsProvisionalCreditSettingsSetValue extends NoteCoinManualDepositsOptions {
  provisionalCreditSafeId?: string;
  isSupportProvisionalCredit?: boolean;
}

export interface LocationProvisionalCreditPolicySetValue extends NoteCoinManualDepositsOptions {
  isEnableProvisionalCredit: boolean;
  providerId?: number;
  providerType?: string;
}

export interface AutomaticOrderCreateSchedule {
  startDate: string;
  endDate: string;
  createOrderTime: string;
}

export enum StatusConsideredAsOnOrder {
  APPROVED_SENT = "approvedSent",
  CREATED_REQUESTED_APPROVED_SENT = "createdRequestedApprovedSent ",
}

export interface InitialLocationProvisionalCreditProviders {
  providerId: number;
  providerName: string;
  providerType: string;
  assetSafeIdsContainer: InitialLocationAssetSafeIdsContainer[];
}

export interface InitialLocationAssetSafeIdsContainer {
  assetId: number;
  safeId: string;
}

export interface SelectItemType {
  id: number;
  name: string;
  isDefault: boolean;
}
export type OrderCalculationMethod = SelectItemType;
export type OrderTimePeriod = SelectItemType;
export type OrderType = SelectItemType;

export interface OrderPolicy {
  safetyFactor: number;
  maximumOrderValue: string;
  timePeriodId: number;
  timePeriodName: string;
  insuranceLimit: string;
  triggerBufferDays: number;
  bufferDays: number;
  orderCalculationMethodId: number;
  orderCalculationMethodName: string;
  lateVisitAlertTime: string;
  isOverrideLateVisitAlertTime: boolean;
  isConsiderSafetyFactorInCalculation: boolean;
  inventoryWarningCheckHours: number;
  orderBasedOn: string;
  cashUsageCalculationStartingDate: string;
  acceptanceVariance: AcceptanceVarianceOrderPolicy;
  isConsiderVirtualSafeDataInOrder: boolean;
  isConsiderVirtualSafeNote?: boolean;
  isConsiderVirtualSafeCoin?: boolean;
}

export interface LocationAssetBody {
  assetId: number;
  provisionalCreditSettings?: LocationAssetsProvisionalCreditSettingsAssetBody;
}

export interface LocationAssetsProvisionalCreditSettingsAssetBody extends NoteCoinManualDepositsOptions {
  provisionalCreditSafeId?: string;
  isSupportProvisionalCredit?: boolean;
}

export interface LocationProvisionalCreditPolicyBody extends NoteCoinManualDepositsOptions {
  isEnableProvisionalCredit: boolean;
  providerId?: number;
  providerType?: string;
}

export interface NoteCoinManualDepositsOptions {
  isCreditNoteContainer?: boolean;
  isCreditNoteRecycler?: boolean;
  isCreditCoinContainer?: boolean;
  isCreditCoinRecycler?: boolean;
  isCreditManualDepositNotes?: boolean;
  isCreditManualDepositCoins?: boolean;
  isCreditManualDepositCheques?: boolean;
  isCreditManualDepositOther?: boolean;
  isSendPCNotificationEmailToLocation?: boolean;
}

export interface PutLocationsOrderPolicy {
  safetyFactor: number;
  maximumOrderValue: string;
  timePeriodId: number;
  insuranceLimit: string;
  bufferDays: number;
  triggerBufferDays: number;
  orderCalculationMethodId: number;
  lateVisitAlertTime: string;
  isOverrideLateVisitAlertTime: boolean;
  isConsiderSafetyFactorInCalculation: boolean;
  inventoryWarningCheckHours: number;
  orderBasedOn: string;
  cashUsageCalculationStartingDate: string;
  acceptanceVariance: AcceptanceVarianceOrderPolicy;
  isConsiderVirtualSafeDataInOrder: boolean;
  isConsiderVirtualSafeNote?: boolean;
  isConsiderVirtualSafeCoin?: boolean;
}
export interface AcceptanceVarianceOrderPolicy {
  isByValue: boolean;
  byValue: string;
  isByDenomination: boolean;
  isByPercentage: boolean;
  byPercentage: number;
}

export type PutLocationSettingsCurrency = {
  isSelectable: boolean;
  currencyCode: string;
  denominationType: string;
  faceValue: number;
  exponent: number;
  minCount: number;
  idealCount: number;
  maxCount: number;
  floats: number;
  isExceedMaxCountAllowed: boolean;
  acceptanceVariance: number;
  isSelectVirtualSafe: boolean;
}[];

export interface PutLocationSettingsRes {
  locationId: number;
}
export interface GetAssetsParams {
  companyId?: string;
  locationId?: string | number[];
  limit?: number;
  offset?: number;
  sortColumn?: string;
  sort?: string;
}

export interface Location {
  locationId: number;
  locationName: string;
  companyName: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  currencies: Array<string>;
  orderTypeName: string;
  isAutoApproveOrdersAtCutOffTime: boolean;
}

export interface GetLocationListResponseBody {
  sortField: {
    column: string;
    orderBy: string;
  };
  totalCount: number;
  locations: Location[];
}

export interface GetLocationsParams {
  locationName?: string;
  companyId?: string;
  limit?: number;
  offset?: number;
  sortColumn?: string;
  sort?: string;
}

export interface PickupOptions {
  pickupCoin: {
    default: boolean;
    isEnabled: boolean;
  };
  pickupCoinCollect: {
    default: boolean;
    isEnabled: boolean;
  };
  pickupCoinCollectRemove: {
    default: boolean;
    isEnabled: boolean;
  };
  pickupNote: {
    default: boolean;
    isEnabled: boolean;
  };
  pickupNoteCollect: {
    default: boolean;
    isEnabled: boolean;
  };
  pickupNoteCollectRemove: {
    default: boolean;
    isEnabled: boolean;
  };
}
export interface DeliveryOptions {
  deliveryCoin: {
    default: boolean;
    isEnabled: boolean;
  };
  deliveryCoinReplenish: {
    default: boolean;
    isEnabled: boolean;
  };
  deliveryNote: {
    default: boolean;
    isEnabled: boolean;
  };
  deliveryNoteReplenish: {
    default: boolean;
    isEnabled: boolean;
  };
}
export interface OrderFormats {
  format: string;
  default: boolean;
}

export interface RejectedDetail {
  rejectorUserName: string;
  rejectReason: string;
  rejectedAt: string;
}

export interface LocationCITResponse {
  calendars: OrderCalendars;
  currencyDenominations: OrderDetails;
  pickupOptions: PickupOptions;
  deliveryOptions: DeliveryOptions;
  exchangeRates?: {
    baseCurrencyCode: string;
    rates: { code: string; rate: number }[];
  };
  orderFormats: OrderFormats[];
  baseCurrencyCode: string;
  pavementLimitCurrencyCode: string;
  decimalPlaces: number;
  bufferDays: number;
  orderCalculationMethodName: EOrderCalculationMethod;
  safetyFactor: number;
  isSubtractQuantityOnOrder: boolean;
  statusConsideredAsOnOrder: StatusConsideredAsOnOrder;
  isConsiderFloatsInCalculation: boolean;
  isConsiderSafetyFactorInCalculation: boolean;
  orderTypeId: number;
  citCutOffTime: {
    time: string;
    timezone?: string;
  };
  citOrderFormat: string;
  citOrderTemplateName: string;
  locationTimezone: string;
  mirroringLocation?: {
    id: number;
    name: string;
    endDate: string;
  };
  containerAverageDeposits: CreateEditOderAverageDeposit[];
  mirroringLocationContainerAverageDeposits?: CreateEditOderAverageDeposit[];
  currentInventoryUpdatedTime?: string;
  startOfDayInventoryUpdatedTime?: string;
  orderBasedOn: string;
  citOrderMethod: string;
  citContactEmailAddress: string;
  citOrderEmailAddress?: string;
  inventoryWarningCheckHours: number;
  eodTime: string;
  isConsiderVirtualSafeDataInOrder: boolean;
}

export interface OrderCalendars {
  finalServiceDate: {
    finalOrderDate: string;
    finalFirstServiceDate: string;
    finalSecondServiceDate: string;
  }[];
  finalEmergencyDate?: {
    finalOrderDate: string;
    finalEmergencyDate: string;
  }[];
}

export enum EOrderCalculationMethod {
  MANUAL = "manual",
  MINIMUM = "minimum",
  IDEAL = "ideal",
  MAXIMUM = "maximum",
  DYNAMIC = "dynamic",
}

export interface GetAssetSettingsRes {
  assetId: number;
  companyName: string;
  locationName: string;
  assetType: string;
  assetSerial: string;
  note: {
    assetRecycleCountSettings: AssetRecycleCountSettings[];
    assetCollectionTriggerSettings: AssetCollectionTriggerSettings;
  };
  coin: {
    assetRecycleCountSettings: AssetRecycleCountSettings[];
    assetCollectionTriggerSettings: AssetCollectionTriggerSettings;
  };
}

export interface GetAssetDefaultConfigRes {
  assetId: number;
  assetRecyclableDenominationCapacity: AssetRecycleCountSettings[];
  assetCollectionContainerMaximumCapacity: AssetCollectionContainerMaximumCapacity[];
}

export interface AssetRecycleCountSettings {
  currencyCode: string;
  denominationType?: DenominationType;
  faceValue: number;
  exponent: number;
  minCount?: number;
  idealCount?: number;
  maxCount?: number;
  decimalPlaces?: number;
  floats: number;
}

export type AssetCollectionContainerMaximumCapacity = {
  denominationType: DenominationType;
  count: string;
};

export interface AssetCollectionTriggerSettings {
  denominationType?: DenominationType;
  count?: string;
  countTrigger?: number;
  value?: string;
  valueTrigger?: number;
  weight?: string;
  weightTrigger?: number;
  isAlwaysCheckValueTrigger: boolean;
}

export interface LocationSettingsServiceAndEmergencyCalendar {
  calendarId: string;
  name: string;
  type: string;
  pattern: string;
  startDate: string;
  endDate: string;
}

export interface TransactionsViewBody {
  type?: string[];
  companyId?: number;
  locationId?: number;
  startTransactionDate?: string;
  endTransactionDate?: string;
  assetTypes?: string[];
  assetId?: number;
  sortColumn?: string;
  sort?: string;
  queryLimit?: number;
  queryOffset?: number;
  isMostRecent: boolean;
}

export interface GetTransactionsRes {
  sortField: {
    column: string;
    orderBy: string;
  };
  totalCount: number;
  transactions: Array<{
    transactionId: string;
    transactionDateTime: string;
    messageSequenceNumber: string;
    timezone: string;
    transactionType: string;
    serialNumber: string[];
    companyName: string;
    locationName: string;
    asset: string;
    currency: TransactionsCurrencyItem[];
    changeDetail?: {
      changeAmount: ChangeAmountDetail;
      transactionDetail: Array<TransactionDetailRes>;
    };
    hasComments: boolean;
    isServiceTransaction?: boolean;
  }>;
}

export interface ChangeAmountDetail {
  currencyCode: string;
  status: string;
  salesAmount: number;
  variance: number;
  decimalPlaces: number;
  user: string;
  transactionId: string;
}

export interface TransactionDetailRes {
  depositAmount: number;
  dispenseAmount: number;
  manualAmount: number;
  salesAmount: number;
  currencyCode: string;
  decimalPlaces: number;
  machineDetail?: Array<MachineDetailRes>;
  manualDetail?: Array<ManualDetailRes>;
}

export interface MachineDetailRes {
  type: string;
  denominationValue: number;
  depositQuantity?: number;
  dispenseQuantity?: number;
  machineType?: string;
  depositValue?: number;
  dispenseValue?: number;
}

export interface ManualDetailRes {
  itemName: string;
  itemValue: number;
  denominationValue?: number;
  quantity?: number;
}

export interface TransactionsCurrencyItem {
  user: string;
  currencyCode: string;
  totalValue: number;
  decimalPlaces: number;
  transactionDetail: TransactionDetail[];
}

export interface TransactionDetail {
  transactionSubType: string;
  subTypeValue: number;
  denominations: TransactionDetailDenomination[];
  manualDetails: TransactionDetailManual[];
}

export interface TransactionDetailDenomination {
  denominationValue: number;
  type: string;
  quantity: number;
  machineType: string;
  value: number;
}

export interface TransactionDetailManual {
  itemName: string;
  itemValue: number;
}

export interface TransactionsFilterItems {
  transactionTypes: string[];
  companies: TransactionsCompany[];
  assetTypes: string[];
  assets: AssetTransaction[];
  serialNumbers: string[];
}

export interface SourceDataFileTransaction {
  rawData: string;
}

export interface AssetTransaction {
  assetId?: number;
  type?: string;
  serial?: string;
}

export interface TransactionsCompany {
  companyId: number;
  companyName: string;
  locations: TransactionsLocation[];
}

export interface TransactionsLocation {
  id: number;
  name: string;
  citId: string;
  citName: string;
  pavementLimit?: string;
}

export interface TransactionsFilterItemsBody {
  locationId?: number;
  assetTypes?: string[];
  assetId?: number;
  serialNumbers?: string[];
}

export interface DenominationResponse {
  isSelectable: boolean;
  faceValue: number;
  type: string;
  exponent: number;
  minCount: number | null;
  idealCount: number | null;
  maxCount: number | null;
}

export interface CurrencyResponse {
  currencyName: string;
  currencyCode: string;
  decimalPlaces: number;
  denominations: DenominationResponse[];
}

export interface LocationSettingsDefaultResponse {
  currencies: CurrencyResponse[];
}

export interface AssetSettingsRequestBody {
  assetRecycleCountSettings: {
    currencyCode: string;
    denominationType: DenominationType;
    faceValue: number;
    exponent: number;
    minCount?: number;
    idealCount?: number;
    maxCount?: number;
    floats: number;
  }[];
  assetCollectionTriggerSettings: {
    denominationType: DenominationType;
    count?: string;
    countTrigger?: number;
    value?: string;
    valueTrigger?: number;
    weight?: string;
    weightTrigger?: number;
    isAlwaysCheckValueTrigger: boolean;
  }[];
}

export interface RejectComment {
  rejectorUserName: string;
  rejectReason: string;
  rejectedAt: string;
}

export interface GetRole {
  roleId: number;
  name: string;
  isActive: boolean;
}
export interface PostCreateRoleBody {
  isActive: boolean;
  name: string;
  applicationId: number;
  applicationType: "manage" | "inform";
  orders?: OrderRoles;
  tracking?: TrackingRoles;
  cits?: CITRoles;
  devices?: DeviceRoles;
  locations?: LocationRoles;
  calendars?: CalendarRoles;
  roles?: Roles;
  schedules?: ScheduleRoles;
  reporting?: {
    accessReports: boolean;
    accessReportTypes: string[];
  };
}

export interface UnlinkIMORole {
  roleId: number;
  twxRoleIds: string[];
}

export interface OrderRoles {
  accessOrders: boolean;
  editOrders: boolean;
  deleteOrders: boolean;
  manualCreateEditStandardOrders: boolean;
  manualCreateEditEmergencyOrders: boolean;
  manualOverrideCitStandardOptions: boolean;
  manualPrintOrders: boolean;
  manualPrintAllFormats: boolean;
  manualRequestOrders: boolean;
  manualApproveOrders: boolean;
  manualRejectOrders: boolean;
  manualStopApprovedOrders: boolean;
  manualSendOrders: boolean;
  automaticEditOrders: boolean;
  automaticOverrideCitOptions: boolean;
  automaticPrintOrders: boolean;
  automaticPrintAllFormats: boolean;
  automaticRequestOrders: boolean;
  automaticApproveOrders: boolean;
  automaticRejectOrders: boolean;
  automaticStopApprovedOrders: boolean;
  automaticSendOrders: boolean;
  accessProvisionalCredit: boolean;
  accessProvisionalCreditPrintTransferFile: boolean;
  accessProvisionalCreditPrintTransferFilePrintAllFormats: boolean;
  accessProvisionalCreditSendTransferFile: boolean;
}

export interface TrackingRoles {
  accessTransaction: boolean;
  accessTransactionAddComments: boolean;
  accessTransactionShowSourceData: boolean;
  accessTransactionAllowAddingTransaction: boolean;
  accessInventory: boolean;
  accessInventoryViewPieces: boolean;
  accessInventoryViewValues: boolean;
  accessInventoryHistory: boolean;
}

export interface CITRoles {
  viewCits: boolean;
  createEditCits: boolean;
  deleteCits: boolean;
  viewGeneralSettings: boolean;
  createEditGeneralSettings: boolean;
  viewOrdersSettings: boolean;
  createEditOrdersSettings: boolean;
  viewServicesSettings: boolean;
  createEditServicesSettings: boolean;
  viewLocationsSettings: boolean;
  createEditLocationsSettings: boolean;
  viewCalendarsSettings: boolean;
  createEditCalendarsSettings: boolean;
}

export interface DeviceRoles {
  viewDevices: boolean;
  createEditDevices: boolean;
  deleteDevices: boolean;
}

export interface LocationRoles {
  viewLocations: boolean;
  createEditLocations: boolean;
  deleteLocations: boolean;
  viewGeneralSettings: boolean;
  createEditGeneralSettings: boolean;
  viewDeviceSettings: boolean;
  createEditDeviceSettings: boolean;
  viewCitSettings: boolean;
  createEditCitSettings: boolean;
  viewCurrencySettings: boolean;
  createEditCurrencySettings: boolean;
  viewCalendarSettings: boolean;
  createEditCalendarSettings: boolean;
  viewOrderSettings: boolean;
  createEditOrderSettings: boolean;
  viewProvisionalCreditSettings: boolean;
  createEditProvisionalCreditSettings: boolean;
}

export interface CalendarRoles {
  viewCalendars: boolean;
  createEditCalendars: boolean;
  deleteCalendars: boolean;
  viewServiceSettings: boolean;
  createEditServiceSettings: boolean;
  viewServiceLocationsSettings: boolean;
  createEditServiceLocationsSettings: boolean;
  viewEmergencySettings: boolean;
  createEditEmergencySettings: boolean;
  viewEmergencyLocationsSettings: boolean;
  createEditEmergencyLocationsSettings: boolean;
  viewHolidaySettings: boolean;
  createEditHolidaySettings: boolean;
  viewHolidayLocationsSettings: boolean;
  createEditHolidayLocationsSettings: boolean;
  viewHolidayCitsSettings: boolean;
  createEditHolidayCitsSettings: boolean;
}

export interface Roles {
  viewRoles: boolean;
  createEditRoles: boolean;
  deleteRoles: boolean;
}

export interface ScheduleRoles {
  viewSchedules: boolean;
  createEditSchedules: boolean;
  deleteSchedules: boolean;
  viewScheduleOrder?: boolean;
  createEditScheduleOrder?: boolean;
  viewScheduleReport: boolean;
  createEditScheduleReport: boolean;
  viewScheduleAlert: boolean;
  createEditScheduleAlert: boolean;
}

export interface Reporting {
  type: string;
  displayName: string;
  displayIndex: number;
}

export interface Reporting {
  type: string;
  displayName: string;
  displayIndex: number;
}

export interface InitialReport {
  filterTypes: FilterType[];
  exportFormats: string[];
  displayColumns: DisplayColumn[];
}

export interface FilterType {
  filterParamName: string;
  filterDisplayName: string;
  filterType: string;
  format?: string;
  isRequired: boolean;
  defaultValue: string;
  filterValidation?: Array<
    | {
        type: "pattern";
        value: string;
      }
    | {
        type: "minValue" | "maxValue";
        value: number;
      }
  >;
}

export interface DisplayColumn {
  columnType: string;
  columnDisplayName: string;
  displayIndex: number;
  sort: {
    isSortable: boolean;
    displayAlignment: "left" | "right";
  };
  displayAlignment: "left" | "center" | "right";
  childColumns?: DisplayColumn[];
}

export interface ReportFilterItemsBody {
  requiredFilterItems: string[];
  selectedFilterItems?: {
    companyIds?: number[];
    locationIds?: number[];
    assetTypes?: string[];
    citIds?: string[];
    assetIds?: number[];
  };
  reportType?: string;
}

export interface ReportFilterItems {
  filterCompanies?: Array<{
    companyName: string;
    companyId: number;
    locations: {
      id: number;
      name: string;
    }[];
  }>;
  filterAssetTypes?: string[];
  filterAssets?: Array<{
    assetId?: number;
    type?: string;
    serial?: string;
  }>;
  [key: string]:
    | any
    | {
        key: string;
        value: string;
      }[];
}

export interface ExportingReportQuery {
  filterCompanies: number[];
  filterLocations: number[];
  filterAssetTypes: string[];
  filterAssets: number[];
  daysTillFull: number;
  filterDate: string;
  filterStartDatetime: string;
  filterEndDatetime: string;
}

export interface ExportingReportRequest {
  reportType: string;
  applyDatetime: string;
  reportFormat: string;
  filterItems?: FilterItemsRequest | Partial<ExportingReportQuery>;
  sortColumn?: string;
  sortOrder?: string;
  clientDateFormat: string;
}

export type ReportingFilterValueRequest =
  | string
  | number
  | { [key: string]: string | number }
  | string[]
  | number[]
  | { [key: string]: string | number }[];

export interface FilterItemsRequest {
  [key: string]: ReportingFilterValueRequest;
}

export interface GetReportingDataRequest {
  reportType: string;
  applyDatetime: string;
  sortColumn?: string;
  sortOrder?: string;
  queryLimit?: number;
  queryOffset?: number;
  clientTimezone: string;
  clientDateTimeFormat: string;
  clientDateFormat: string;
  filterItems?: FilterItemsRequest;
}

export interface GetWidgetBodyRequest {
  widgetType: WidgetType.REMOVALS;
  filterTopLocation: number;
  filterDateRange: {
    startDate: string;
    endDate: string;
  };
  filterDateRangeType: FilterDateRangeType;
  [key: string]: any;
}

export enum WidgetType {
  REMOVALS = "removals",
  SALES = "sales",
  INVENTORY = "inventory",
  ORDERS = "orders",
}

export enum FilterDateRangeType {
  CURRENT = "current",
  YESTERDAY = "yesterday",
  WEEK_TO_DATE = "weekToDate",
  LAST_7_DAYS = "last7Days",
  MONTH_TO_DATE = "monthToDate",
  LAST_30_DAYS = "last30Days",
}

export interface WidgetDataResponse {
  totals: Total[];
  items: Item[];
}

export interface Total {
  totalValueLabel: string;
  totalValueNumber: number | string;
  currencyCode: string;
}

export interface Item {
  title?: string;
  id?: string | number;
  label: string;
  chartType?: "barVertical" | "barHorizontal" | "doughnut";
  currencyCode?: string;
  details?: Item[];
  color?: string[];
  total?: string[];
}

export interface ReportingData {
  tableName?: string;
  displayColumns: {
    columnType: string;
    columnDisplayName: string;
    displayIndex: number;
    sort: {
      isSortable: boolean;
      displayAlignment: "left" | "right";
    };
    displayAlignment: "left" | "center" | "right";
    childColumns?: ReportingData["displayColumns"];
  }[];
  displayData: { detail?: ReportingData[]; [key: string]: unknown }[];
}

export interface ReportingDataResponse extends ReportingData {
  totalCount: number;
}

export interface GetCreateSchedule {
  startDate: string;
  endDate: string;
  scopes: GetCreateScheduleScope[];
  scheduleTypes: ScheduleType[];
  schedulePatterns: SchedulePatternRes[];
  scheduleReportSettings?: {
    emailSubject?: string;
    isSendReportOnlyWhenDataAvailable?: boolean;
  };
  reports: GetCreateScheduleReport[];
  scheduleAlertSettings: {
    alertOptions: GetAlertOptionSchedule[];
  };
}

export interface GetAlertOptionSchedule {
  taskId: number;
  taskName: string;
  options: ScheduleAlertOptions[];
  containerType?: string;
  triggerOptions?: ScheduleAlertTriggerOption[];
  triggerEventOptions?: ScheduleTriggerEventOptions[];
  emailSubject: string;
}

export interface ScheduleAlertTriggerOption {
  displayName: string;
  triggerType: string;
  triggerValue: number;
  isTriggerTypeSelected: boolean;
}

export interface ScheduleTriggerEventOptions {
  displayName: string;
  triggerType: string;
  triggerValue: boolean;
}

export interface ScheduleAlertOptions {
  displayName: string;
  optionName: string;
  optionValue: boolean;
  isRequired: boolean;
}

export interface GetCreateScheduleScope {
  scope: string;
  isDefault: boolean;
}

export interface GetCreateScheduleReport {
  reportType: string;
  reportName: string;
}

export interface ScheduleRuntimeRes {
  runtime: string;
  useLocationTimeZone: boolean;
  timezone: string;
}

export interface ScheduleTimezoneType {
  type: string;
  default: boolean;
}

export interface SetValueScheduleReport {
  reportType: string;
  reportFormat: string;
  filterItems: SetValueScheduleReportFilterItems;
  sendEachLocation?: boolean;
  emailSubject: string;
  emailAddress?: string;
  isSendReportOnlyWhenDataAvailable?: boolean;
}

export interface SetValueScheduleReportFilterItems {
  [key: string]: any;
  filterCits?: number[];
  filterStatus?: string[];
  filterCompanies?: number[];
  filterLocations?: number[];
  filterAssetTypes?: string[];
  filterAssets?: number[];
  daysTillFull?: number;
  filterDate?: string;
  filterDateRange?: [SetValueScheduleReportFilterDateRangeItem, SetValueScheduleReportFilterDateRangeItem];
}

export interface SetValueScheduleReportFilterDateRangeItem {
  setDate: "today" | "yesterday";
  dateOffset?: number;
}

export interface ScheduleReportDisplayItems {
  filterTypes: ScheduleReportDisplayItemsFilterType[];
  sendEachLocation?: boolean;
  exportFormats: string[];
}

export interface ScheduleReportDisplayItemsFilterType {
  filterParamName: string;
  filterDisplayName: string;
  filterType: string;
  format?: string;
  isRequired: boolean;
  defaultValue?: string;
  filterDefaultItems?: string[];
}

export interface GetFilterItemsCreateEditScheduleBody {
  requiredFilterItems: string[];
  selectedFilterItems?: {
    [key: string]: any;
  };
  reportType: string;
}

export interface FilterItemsCreateEditScheduleResponse {
  filterCompanies?: {
    companyName: string;
    companyId: number;
    locations: {
      id: number;
      name: string;
    }[];
  }[];
  filterAssetTypes?: string[];
  filterAssets?: {
    assetId: number;
    type: string;
    serial: string;
  }[];
  filterCits?: {
    id: number;
    name: string;
  }[];
  filterStatus?:
    | string[]
    | {
        key: string;
        value: string;
      }[];
  [key: string]:
    | any
    | {
        key: string;
        value: string;
      }[];
}

export interface CompanyLocations {
  companyId: number;
  isApplyAllLocations: boolean;
  locationIds?: number[];
}

export interface MonthlyDayOfWeekDetail {
  weekNumber: string;
  dayOfWeek: string;
  interval: number;
}

export interface MonthlyDayOfNumberDetail {
  dayNumber: number;
  interval: number;
}

export interface WeeklyDetail {
  dayOfWeek: DayOfWeek;
  interval: number;
}

export interface DayOfWeek {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface SetValueScheduleAlert {
  emailAddress?: string;
  emailSubject: string;
  sendEachLocation?: boolean;
  alertOptions?: ScheduleAlertOption[];
  periodDaysNotCreateOrder?: number;
  containerType?: string;
  triggerType?: string;
  triggerValue?: number;
  isIncludeMaintenanceRemovals?: boolean;
  triggerEventOptions?: TriggerEventOptions[];
}

export interface ScheduleAlertOption {
  optionName: string;
  optionValue: boolean;
}

export interface TriggerEventOptions {
  triggerType: string;
  triggerValue: boolean;
}

export interface ScheduleType {
  id: number;
  typeName: string;
  isDefault: boolean;
  scheduleTasks: ScheduleTask[];
}

export interface ScheduleTask {
  id: number;
  taskName: string;
  isDefault: boolean;
}

export interface SchedulePatternRes {
  id: number;
  patternName: string;
  isDefault: boolean;
  patternValueDefault: number;
  scheduleRunTimePolicy?: {
    defaultRunTime: string;
    isUseLocationTimezone: boolean;
    isUseProviderTimezone: boolean;
    isAdjustForDaylightSavingTimeAutomatically: boolean;
  };
}

export interface SchedulePatternSubTypeRes {
  subTypeId: number;
  subTypeName: string;
  isDefault: boolean;
}

export interface ScheduleParamResId {
  scheduleId?: number;
}

export interface ScheduleResponse {
  scheduleId: number;
  status: string;
  lastRunTime: string;
  nextActivatedTime?: string;
}

export enum ActionSchedule {
  STOP = "stopped",
  PAUSED = "paused",
  RE_START = "re-start",
}

export interface ViewSchedulesStartApiResponse {
  schedules: GetSchedule[];
  totalCount: number;
  sortField: {
    column: string;
    orderBy: string;
  };
}

export interface GetSchedule {
  scheduleId: number;
  status: string;
  name: string;
  startDate: string;
  endDate: string;
  patternType: string;
  scheduleType?: string;
  scope: string;
  lastRunTime: string;
  reportType?: string;
}

export interface ViewSchedulesBody {
  scheduleStatuses?: string[];
  scheduleName?: string;
  scheduleTypeIds?: number[];
  scheduleTaskIds?: number[];
  startDate?: string;
  endDate?: string;
  schedulePatternIds?: number[];
  scheduleScopes?: string[];
  queryLimit?: number;
  queryOffset?: number;
  sortColumn?: string;
  sort?: string;
}

export interface ReportUserInformation {
  firstName: string;
  lastName: string;
  timezone: string;
  language: string;
}

export interface CurrentInventoriesBody {
  companyIds?: number[];
  locationIds?: number[];
  assetTypes?: string[];
  assetIds?: number[];
  recyclingStatus?: string[];
  noteCollectionStatus?: string[];
  coinCollectionStatus?: string[];
  sortColumn?: string;
  sort?: string;
  queryLimit?: number;
  queryOffset?: number;
}

export interface CurrentInventoryRecycleDetail {
  currencyCode: string;
  decimalPlaces: number;
  denominations: Array<{
    faceValue: number;
    denominationType: string;
    exponentValue: number;
    status: string;
    inventoryCount: number;
    inventoryValue: string;
    maxCount: number;
    minCount: number;
    idealCount: number;
  }>;
}

export interface CurrentInventoryContainerDetail {
  containerType: string;
  inventoryQuantity: number;
  capacityQuantity: number;
  fullQuantityPercent: string;
  fullQuantityStatus: string;
  inventoryValue: string[];
  capacityValue: string;
  fullValuePercent: string;
  fullValueStatus: string;
  containerInventoryTotalValueInBaseCurrency?: string;
}

export interface CurrentInventoriesFilterItemsBody {
  companyIds?: number[];
  locationIds?: number[];
  assetTypes?: string[];
}

export interface CurrentInventoriesFilterItemsResponse {
  companies: Array<{
    companyName: string;
    companyId: number;
    locations: Array<{
      id?: number;
      name?: string;
    }>;
  }>;
  assetTypes: string[];
  assets: Array<{
    assetId?: number;
    type?: string;
    serial?: string;
  }>;
}

export interface UserInformationResponse {
  fullName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  smsAddress: string;
  phoneNumber: string;
  countryCode: string;
  physicalAddress: string;
  city: string;
  state: string;
  postalCode: string;
  timezone: string;
  language: string;
  roles: Array<{ role: string; applicationId: number }>;
  permissions: {
    orders?: OrdersPermissions;
    tracking: TrackingPermissions;
    cits?: CitsPermissions;
    devices?: DevicesPermissions;
    locations?: LocationsPermissions;
    calendars?: CalendarsPermissions;
    rolesOfManage?: RolesPermissions;
    rolesOfInform?: RolesPermissions;
    schedules: SchedulesPermissions;
    reporting: ReportingPermissions;
    widgets: WidgetsPermissions;
  };
  otherApplicationLinks: Array<{
    applicationName: string;
    applicationUrl: string;
  }>;
  accessAbleApplicationIds: number[];
}

export interface ReleaseNotesResponse {
  [version: string]: {
    new: string[];
    fixed: string[];
  };
}

export interface OrdersPermissions {
  accessOrders: boolean;
  editOrders: boolean;
  deleteOrders: boolean;
  manualCreateEditStandardOrders: boolean;
  manualCreateEditEmergencyOrders: boolean;
  manualOverrideCitStandardOptions: boolean;
  manualPrintOrders: boolean;
  manualPrintAllFormats: boolean;
  manualRequestOrders: boolean;
  manualApproveOrders: boolean;
  manualRejectOrders: boolean;
  manualStopApprovedOrders: boolean;
  manualSendOrders: boolean;
  automaticEditOrders: boolean;
  automaticOverrideCitOptions: boolean;
  automaticPrintOrders: boolean;
  automaticPrintAllFormats: boolean;
  automaticRequestOrders: boolean;
  automaticApproveOrders: boolean;
  automaticRejectOrders: boolean;
  automaticStopApprovedOrders: boolean;
  automaticSendOrders: boolean;
  accessProvisionalCredit: boolean;
  accessProvisionalCreditPrintTransferFile: boolean;
  accessProvisionalCreditPrintTransferFilePrintAllFormats: boolean;
  accessProvisionalCreditSendTransferFile: boolean;
}

export interface TrackingPermissions {
  accessTransaction: boolean;
  accessTransactionAddComments: boolean;
  accessTransactionShowSourceData: boolean;
  accessTransactionAllowAddingTransaction: boolean;
  accessInventory: boolean;
  accessInventoryViewPieces: boolean;
  accessInventoryViewValues: boolean;
  accessInventoryHistory: boolean;
}

export interface CitsPermissions {
  viewCits: boolean;
  createEditCits: boolean;
  deleteCits: boolean;
  viewGeneralSettings: boolean;
  createEditGeneralSettings: boolean;
  viewOrdersSettings: boolean;
  createEditOrdersSettings: boolean;
  viewServicesSettings: boolean;
  createEditServicesSettings: boolean;
  viewLocationsSettings: boolean;
  createEditLocationsSettings: boolean;
  viewCalendarsSettings: boolean;
  createEditCalendarsSettings: boolean;
  viewProvisionalCreditSettings: boolean;
  createEditProvisionalCreditSettings: boolean;
}

export interface DevicesPermissions {
  viewDevices: boolean;
  createEditDevices: boolean;
  deleteDevices: boolean;
}

export interface LocationsPermissions {
  viewLocations: boolean;
  createEditLocations: boolean;
  deleteLocations: boolean;
  viewGeneralSettings: boolean;
  createEditGeneralSettings: boolean;
  viewDeviceSettings: boolean;
  createEditDeviceSettings: boolean;
  viewCitSettings: boolean;
  createEditCitSettings: boolean;
  viewCurrencySettings: boolean;
  createEditCurrencySettings: boolean;
  viewCalendarSettings: boolean;
  createEditCalendarSettings: boolean;
  viewOrderSettings: boolean;
  createEditOrderSettings: boolean;
  viewProvisionalCreditSettings: boolean;
  createEditProvisionalCreditSettings: boolean;
}

export interface CalendarsPermissions {
  viewCalendars: boolean;
  createEditCalendars: boolean;
  deleteCalendars: boolean;
  viewServiceSettings: boolean;
  createEditServiceSettings: boolean;
  viewServiceLocationsSettings: boolean;
  createEditServiceLocationsSettings: boolean;
  viewEmergencySettings: boolean;
  createEditEmergencySettings: boolean;
  viewEmergencyLocationsSettings: boolean;
  createEditEmergencyLocationsSettings: boolean;
  viewHolidaySettings: boolean;
  createEditHolidaySettings: boolean;
  viewHolidayLocationsSettings: boolean;
  createEditHolidayLocationsSettings: boolean;
  viewHolidayCitsSettings: boolean;
  createEditHolidayCitsSettings: boolean;
}

export interface RolesPermissions {
  viewRoles: boolean;
  createEditRoles: boolean;
  deleteRoles: boolean;
}

export interface SchedulesPermissions {
  viewSchedules: boolean;
  createEditSchedules: boolean;
  deleteSchedules: boolean;
  viewScheduleOrder?: boolean;
  createEditScheduleOrder?: boolean;
  viewScheduleReport: boolean;
  createEditScheduleReport: boolean;
  viewScheduleAlert: boolean;
  createEditScheduleAlert: boolean;
  viewGlobalSchedule?: boolean;
  createEditGlobalSchedule?: boolean;
  viewScheduleProvisionalCredit?: boolean;
  createEditScheduleProvisionalCredit?: boolean;
}

export interface ReportingPermissions {
  accessReports: boolean;
  accessReportTypes: Array<string>;
}

export interface InventoryHistoriesFilterItemsBody {
  companyIds?: number[];
  locationIds?: number[];
  assetTypes?: string[];
}

export interface InventoryHistoriesFilterItemsResponse {
  inventoryTypes: Array<{
    type: string;
    displayName: string;
    isDefault: boolean;
  }>;
  companies: Array<{
    companyName: string;
    companyId: number;
    locations: Array<{
      id?: number;
      name?: string;
    }>;
  }>;
  assetTypes: string[];
  assets: Array<{
    assetId?: number;
    type?: string;
    serial?: string;
  }>;
}

export interface InventoryHistoriesBody {
  inventoryType: string;
  companyIds: number[];
  locationIds: number[];
  assetTypes: string[];
  assetIds: number[];
  startDate: string;
  endDate: string;
  queryLimit: number;
  queryOffset: number;
}

export interface InventoryHistoriesDetailsBody {
  inventoryType: string;
  startDate: string;
  endDate: string;
  quantityType: string;
}

export interface InventoryHistoriesResponse {
  totalCount: number;
  inventoryHistories: InventoryHistory[];
}

export interface InventoryHistoriesDetailsResponse {
  assetId: number;
  inventoryHistory: InventoryHistoryDetail;
}

export interface InventoryHistory {
  assetId: number;
  companyName: string;
  locationName: string;
  assetSerial: string;
  assetType: string;
  assetTimezone: string;
}

export interface InventoryHistoryDetail {
  quantityByRecyclers?: InventoryHistoryQuantityByRecycler[];
  recyclingQuantities?: InventoryHistoryQuantityTypeCurrency[];
  containerQuantities?: InventoryHistoryQuantityTypeCurrency[];
  rejectQuantities?: InventoryHistoryQuantityTypeCurrency[];
  totalQuantities?: InventoryHistoryQuantityTypeCurrency[];
}

export interface InventoryHistoryVerifyFlag {
  verifyDateOn?: string;
  verifyDateOff?: string;
}

export interface InventoryHistoryQuantityByRecycler {
  recyclerName: string;
  denominations: InventoryHistoryDenominationRecycler[];
  unitQuantities: InventoryHistoryQuantityDenomination[];
  unitQuantityMin: number;
  unitQuantityMax: number;
  verifyFlag?: InventoryHistoryVerifyFlag[];
}

export interface InventoryHistoryDenominationRecycler {
  currencyCode: string;
  decimalPlaces: number;
  denominationType: string;
  faceValue: number;
  exponent: number;
  quantities: InventoryHistoryQuantityDenomination[];
  quantityMin: number;
  quantityMax: number;
}

export interface InventoryHistoryQuantityTypeCurrency {
  currencyCode: string;
  decimalPlaces: number;
  denominations: InventoryHistoryDenomination[];
  verifyFlag?: InventoryHistoryVerifyFlag[];
}

export interface InventoryHistoryDenomination {
  faceValue: number;
  exponent: number;
  denominationType: string;
  quantities: InventoryHistoryQuantityDenomination[];
  quantityMin: number;
  quantityMax: number;
  verifyFlag?: InventoryHistoryVerifyFlag[];
}

export interface InventoryHistoryQuantityDenomination {
  datetime: string;
  quantity: number;
}

export interface CompanyResponse {
  companyId: number;
  companyName: string;
}

export interface LocationResponse extends CompanyResponse {
  id: number;
  name: string;
  citId: number;
  citName?: string;
}

export interface CompanyLocationRequestBody {
  linkedCit?: boolean;
  linkedCitId?: number;
  isOnlyCompany?: boolean;
  isOnlyLocation?: boolean;
  companyIds?: number[];
}

export interface CompanyLocationResponse {
  companies?: CompanyResponse[];
  locations?: LocationResponse[];
}

export interface TestReportScheduleBody {
  typeId: number;
  taskId: number;
  timeZone: string;
  report: {
    reportType: string;
    reportFormat: string;
    filterItems: SetValueScheduleReportFilterItems;
    emailAddress?: string;
    emailSubject: string;
    sendEachLocation?: boolean;
  };
}

export interface ILoginUrl {
  authUrl: string;
}
export interface Token {
  userId: string;
  email: string;
  displayName: string;
}

export interface IUserInfo {
  userId: string;
  email: string;
  displayName: string;
  language?: string;
}

export interface IDownloadCalendarParams {
  locationId: number;
  clientDateFormat: string;
}

export interface IDownloadCalendarResponse {
  fileName: string;
  content: string;
}

export interface PostServiceTransactionsBody {
  isServiceTransaction: boolean;
}
export interface PostServiceTransactionsResponse {
  transactionId: number;
}

export interface ICommentList {
  userName: string;
  commentDatetime: string;
  comment: string;
}

export interface GetViewProvisionalCreditsRes {
  provisionalCredits: {
    provisionalCreditStatus: string;
    provisionalCreditId: number;
    fileCreationDate: string;
    startDate: string;
    endDate: string;
    provisionalCreditProviderName: string;
    filename: string;
    isIncludeMaintenanceRemoval: boolean;
    remarks: string;
    providerTimezone: string;
  }[];
  sortField: {
    column: string;
    orderBy: "asc" | "desc";
  };
  totalCount: number;
}

export interface GetViewProvisionalCreditsReqBody {
  provisionalCreditStatuses?: string[];
  provisionalCreditId?: number;
  fileCreationDate?: string;
  startDate?: string;
  endDate?: string;
  provisionalCreditProvider?: {
    type: string;
    id: number;
  }[];
  filename?: string;
  isIncludeMaintenanceRemoval?: boolean;
  sortColumn?: string;
  sort?: "asc" | "desc";
  queryLimit: number;
  queryOffset: number;
}

export interface GetProvisionalCreditsFilterItemsRes {
  provisionalCreditStatuses: {
    statusCode: string;
    statusName: string;
  }[];
  provisionalCreditProvider: {
    provisionalCreditProviderId: number;
    provisionalCreditProviderType: string;
    provisionalCreditProviderName: string;
  }[];
}

export interface IJsonLanguage {
  translationJson: {
    inform: {
      [key: string]: any;
    };
  };
}
export interface PCReportFormatBody {
  fileFormat: string;
  locationIds: number[];
}

export interface PCReport {
  fileName: string;
  content: string;
}

export interface ResendPCReport {
  errorCode?: string[];
}

export interface MethodResendPCReport {
  transferMethod: string;
}

export interface CitExecuteProvisionalCreditFileBody {
  executeUtcDatetime: string;
}

export interface IListWidgetsModelResponse {
  id: string;
  label: string;
}

export interface IFilterDateRange {
  startDate?: string;
  endDate?: string;
}

export interface IWidgetsDataModelBody {
  widgetType: string;
  filterCompanies?: number[];
  filterTopLocation?: number;
  filterDeviceType?: string[];
  filterDateRange?: IFilterDateRange;
  filterDateRangeType?: string;
  clientTimezone?: string;
  clientDateFormat?: string;
  clientDateTimeFormat?: string;
}

export interface ITotalWidgetsData {
  totalValueLabel: string;
  totalValueNumber: string;
  currencyCode: string;
}

export enum EChartType {
  BAR_VERTICAL = "barVertical",
  BAR_HORIZONTAL = "barHorizontal",
  DOUGHNUT = "doughnut",
}

export interface IItemsWidgetsData {
  id?: string;
  label?: string;
  title?: string;
  color?: string[];
  chartType?: EChartType;
  currencyCode?: string;
  total?: string[];
  details?: IItemsWidgetsData[];
}

export interface IWidgetsDataModelResponse {
  totals?: ITotalWidgetsData[];
  items?: IItemsWidgetsData[];
}

export interface IDisplayFilterItemsBody {
  widgetType: string;
}

export interface IDefaultItems {
  value: any;
  label: string;
}

export enum EFilterType {
  FORM = "form",
  SINGLE_SELECT_BOX = "single-select-box",
  MULTI_SELECT_BOX = "multi-select-box",
  DATE = "date",
  DATE_RANGE = "date-range",
  DATETIME = "datetime",
  DATETIME_RANGE = "datetime-range",
  DATE_RANGE_PAST = "date-range-past",
  DATE_PAST = "date-past",
}

export enum EActionType {
  CLEAR = "clear",
  APPLY = "apply",
  EXPORT = "export",
}

export interface Action {
  label: string;
  type: EActionType;
  items?: string[];
}

export interface FilterItem {
  label: string;
  placeholder?: string;
  isRefresh?: boolean;
  paramName: string;
  disableEmpty?: boolean;
  referenceDisable?: string[] | string;
  defaultItems?: IDefaultItems[];
  defaultValue?: any;
  filterType?: string | EFilterType;
  isRequired?: boolean;
}

export interface IDisplayFilterItemsRes {
  filterItems?: FilterItem[];
  actions?: Action[];
}

export interface IFilterItemsBody {
  widgetType: string;
  filterCompanies?: number[];
  filterTopLocation?: number;
  filterDeviceTypes?: string[];
  [key: string]: any;
}

export interface FilterData {
  label: string;
  value: string;
}

export interface IFilterItemsRes {
  [filterKey: string]: FilterData[];
}

export type WidgetsFilterValueRequest =
  | string
  | number
  | { [key: string]: string | number }
  | string[]
  | number[]
  | { [key: string]: string | number }[];
