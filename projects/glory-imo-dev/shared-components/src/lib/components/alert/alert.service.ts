import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";

import { AlertComponent } from "./alert.component";
import { AlertDialogData } from "./alert.model";

@Injectable({ providedIn: "root" })
export class AlertService {
  constructor(public dialog: MatDialog) {}

  alert(data: AlertDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(AlertComponent, { data, disableClose: true, panelClass: data?.panelClass });

    return dialogRef.afterClosed();
  }

  closeAll() {
    this.dialog.closeAll();
  }
}
