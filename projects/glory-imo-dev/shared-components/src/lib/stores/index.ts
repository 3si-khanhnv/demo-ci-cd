// import { InjectionToken, isDevMode } from "@angular/core";
import {
  RouterReducerState,
  // routerReducer
} from "@ngrx/router-store";
import {
  // ActionReducerMap, MetaReducer,
  createFeatureSelector } from "@ngrx/store";
// import * as CommonStore from "./common/common";
// import * as OrdersStore from "./orders";
import * as UserInformationStore from "./user-information";

// export * from "./common";
// export * from "./orders";
export * from "./user-information";

// States
export interface AppState {
  // orders: OrdersStore.OldOrdersState;
  router: RouterReducerState;
  // common: CommonStore.CommonState;
  userInformation: UserInformationStore.OldUserInformationState;
}

// export const initialState: AppState = {
//   orders: OrdersStore.ordersInitialState,

//   router: null,
//   common: CommonStore.commonInitialState,

//   userInformation: UserInformationStore.userInformationInitialState,
// };

// Reducers

// MUST be a function because pass the static analysis in AoT build
// export function getReducers(): ActionReducerMap<AppState> {
//   return {
//     orders: OrdersStore.mainOrdersReducer,
//     common: CommonStore.commonReducer,
//     router: routerReducer,
//     userInformation: UserInformationStore.userInformationMainReducer,
//   };
// }

// export const metaReducers: MetaReducer<AppState>[] =!isDevMode() ? [] : [];

// export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>("reducers");

// // Selectors

// export const ordersSelector = createFeatureSelector<OrdersStore.OldOrdersState>("orders");
// export const commonSelector = createFeatureSelector<CommonStore.CommonState>("common");
export const userInformationFeatureSelector = createFeatureSelector<UserInformationStore.OldUserInformationState>("userInformation");
