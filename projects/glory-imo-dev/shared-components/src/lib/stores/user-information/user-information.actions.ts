import { createAction, props } from "@ngrx/store";
import { FailedReason, UserInformation } from "./user-information.model";

const prefix = "[User Information]";

export const getUserInformation = createAction(`${prefix} Get user Information`);

export const getUserInformationSuccess = createAction(`${getUserInformation.type} Success`, props<{userInformation: UserInformation}>());

export const getUserInformationFailure = createAction(`${getUserInformation.type} Failure`, props<{detailFailedReason: FailedReason}>());