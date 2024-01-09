import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserInformationState, userInformationFeatureKey } from "./user-information.reducers";

// export const userInformationSelector = createSelector<AppState, [UserStore.UserInformationState], UserInformation>(
//   userInformationFeatureSelector,
//   UserStore.userInformationProjectors.userInformation,
// );

// export const permissionsSelector = createSelector<AppState, [UserInformation], any[]>(userInformationSelector, (data) =>
//   Object.keys(data.permissions).map((group) =>
//     Object.keys(data.permissions[group]).map((key) => ({
//       [key]: data.permissions[group][key],
//       group: group,
//     })),
//   ),
// );

export const selectUserInformationState = createFeatureSelector<UserInformationState>(userInformationFeatureKey);
export const selectUserInformation = createSelector(selectUserInformationState, (state) => state.userInformation);

export const selectPermissions = createSelector(selectUserInformationState, (state) =>
  Object.keys(state.userInformation.permissions).map((group) =>
    Object.keys(state.userInformation.permissions[group]).map((key) => ({
      [key]: state.userInformation.permissions[group][key],
      group: group,
    })),
  ),
);
