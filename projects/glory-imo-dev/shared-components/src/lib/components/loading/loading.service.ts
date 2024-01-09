import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { delay, switchMap, take } from "rxjs/operators";
import { utc, Moment } from "moment";

import { LoadingComponent } from "./loading.component";
import { LoadingNotification as Constant } from "./loading.constant";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";

@Injectable({ providedIn: "root" })
export class LoadingService {
  public isOpen = false;
  public openTime: Moment = utc();
  public timeoutTime = 60000;

  public timeoutWatcher: Observable<null>;
  public timeout = null;
  public loading: MatDialogRef<LoadingComponent, any>;

  constructor(public dialog: MatDialog, public toastrService: ToastrService) {}

  open(): void {
    if (this.isOpen === false) {
      this.loading = this.dialog.open(LoadingComponent, { disableClose: true });
      this.isOpen = true;
    }

    this.openTime = utc();
    this.timeoutWatcher = this.timeoutTimer$(this.openTime, this);
    this.timeoutWatcher.subscribe();
    return;
  }

  openWithoutTimeout(): void {
    if (this.isOpen === false) {
      this.loading = this.dialog.open(LoadingComponent, { disableClose: true });
      this.isOpen = true;
    }

    this.openTime = utc();
    return;
  }

  close(): void {
    if (this.isOpen === false) {
      return;
    }
    this.loading.close();
    this.isOpen = false;
    return;
  }

  timeoutTimer$(openTime: Moment, service: LoadingService): Observable<null> {
    return of(openTime).pipe(
      switchMap((ot: Moment) =>
        of(null).pipe(
          delay(service.timeoutTime),
          take(1),
          switchMap(() => {
            if (service.isOpen === false) {
              return of(null);
            }
            if (service.openTime !== ot) {
              return of(null);
            }

            const title = Constant.title;
            const message = Constant.message;
            this.toastrService.error(message, title, {
              closeButton: true,
              timeOut: 3000,
            });
            service.close();

            return of(null);
          }),
        ),
      ),
    );
  }
}
