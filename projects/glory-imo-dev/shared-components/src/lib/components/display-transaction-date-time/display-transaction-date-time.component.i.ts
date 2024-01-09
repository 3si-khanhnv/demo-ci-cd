export interface Transaction {
    transactionId: string;
    transactionDateTime: string;
    messageSequenceNumber: string;
    timezone: string;
    transactionType: string[];
    serialNumber: string[];
    companyName: string;
    locationName: string;
    asset: string;
    user: string[];
    currency?: TransactionsCurrencyItem[];
    hasComments: boolean;
    isServiceTransaction?: boolean;
    changeDetail?: {
        changeAmount: ChangeAmountDetail;
        transactionDetail: Array<TransactionDetailRes>;
    };
    errorDetail?: {
        user: string;
        errorCode: string;
    };
    loginDetail?: {
        user: string;
    };
    logoffDetail?: {
        user: string;
    };
    totalValue?: TotalValue[];
}

export type TotalValue = {
    totalValue: number;
    currencyCode: string;
    decimalPlaces: number;
};

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
    type: string;
    denominationValue: number;
    quantity: number;
    machineType: string;
    value: number;
}

export interface TransactionDetailManual {
    itemName: string;
    itemValue: number;
}
export interface FilterItems {
    transactionTypes: string[];
    companies: Company[];
    assetTypes: string[];
    assets: Asset[];
    serialNumbers: string[];
}

export interface Company {
    companyId: number;
    companyName: string;
    locations: Location[];
}

export interface Location {
    id: number;
    name: string;
    citId: string;
    citName: string;
    pavementLimit?: string;
}

export interface Asset {
    assetId?: number;
    type?: string;
    serial?: string;
}

export interface FilterAndSort {
    type?: string[];
    companyId?: number;
    locationId?: number;
    assetTypes?: string[];
    assetId?: number;
    sortColumn?: string;
    sort?: string;
    queryLimit?: number;
    queryOffset?: number;
    isMostRecent?: string[];
    isSubmit?: boolean;
    filterStartDate?: string;
    filterEndDate?: string;
    formatDateTime?: string;
    isReportSend?: boolean;
    dateType?: string;
    serialNumbers?: string[];
}

export interface FilterItemsUpdate {
    locationId?: number;
    assetTypes?: string[];
    pagination?: boolean;
    assetId?: number;
}

export interface FailedReason {
    code?: number;
    reason?: string;
}

export interface Pagination {
    totalCount: number;
    currentPage: number;
    pageSizeOptions: number[];
}

export interface CommentList {
    userName: string;
    commentDatetime: string;
    comment: string;
}

export type TempFilterData = {
    filterAndSort: Partial<FilterAndSort>;
    pagination: Partial<Pagination>;
};

export interface PostServiceTransactions {
    transactionId: number;
    isServiceTransaction?: boolean;
}
export interface DataCheckboxWithAccess {
    transactionId: string;
    isServiceTransaction?: boolean;
}