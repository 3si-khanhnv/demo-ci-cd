import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import moment from "moment";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { BackendService } from "../../services/backend";
// import { GetUserInformationFailure } from "./user-information";
// import { ActionTypes as CreateRoleActionType } from "../create-role/create-role";
// import { ActionTypes as CreateRoleInformActionType } from "../create-role-inform/create-role-inform";
import { confClientFormats } from "../../services/config/config.service";
import * as action from "./user-information.actions";

@Injectable()
export class UserInformationEffects {
  constructor(private actions$: Actions, private backendService: BackendService) {}
  // public getUserInformation = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(
  //       UserInformationActionTypes.GetUserInformation,
  //       // CreateRoleActionType.UpdateRoleSuccess,
  //       // CreateRoleActionType.CreateRoleSuccess,
  //       // CreateRoleInformActionType.UpdateRoleInformSuccess,
  //       // CreateRoleInformActionType.CreateRoleInformSuccess,
  //     ),
  //     switchMap(() =>
  //       this.backendService.getUserInformation().pipe(
  //         map(
  //           (userInformation) =>
  //             new GetUserInformationSuccess({
  //               ...userInformation,
  //               lastUpdate: moment().format("YYYY-MM-DD HH:MM:ss"),
  //               clientDateTimeFormat: confClientFormats.reportDatetimeFormat,
  //               clientDateTimeSecondFormat: confClientFormats.datetimeFormatSeconds,
  //               clientTimezone: confClientFormats.clientTimezone,
  //             }),
  //         ),
  //         catchError((err) => of(new GetUserInformationFailure({ reason: err.message }))),
  //       ),
  //     ),
  //   );
  // });

  public getUserInformation = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getUserInformation),
      switchMap(() =>
        this.backendService.getUserInformation().pipe(
          map((userInformation) =>
            action.getUserInformationSuccess({
              userInformation: {
                ...userInformation,
                lastUpdate: moment().format("YYYY-MM-DD HH:MM:ss"),
                clientDateTimeFormat: confClientFormats.reportDatetimeFormat,
                clientDateTimeSecondFormat: confClientFormats.datetimeFormatSeconds,
                clientTimezone: confClientFormats.clientTimezone,
              },
            }),
          ),
          catchError((err) => of(action.getUserInformationFailure({ detailFailedReason: {reason: err.message} }))),
        ),
      ),
    ),
  );
}
