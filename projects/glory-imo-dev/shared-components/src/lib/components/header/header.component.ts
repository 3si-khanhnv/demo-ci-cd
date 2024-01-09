import { Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserInformation } from "./header.constant";
import { ModalComponent } from "../modal/modal.component";
import { UserInformationSettings } from "./header.constant";
import { AlertDialogData } from "../alert/alert.model";
import { NavItem } from "../menu-categories/menu-item/menu-item.i";
import { ReleaseNotes } from "../release-notes/release-notes.component.i";

@Component({
  selector: "imo-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() tabs: NavItem[];
  @Input() userMenus: Array<any>;

  @Input() isUserMenuOpened: boolean;
  @Input() userInformation: UserInformation;
  @Input() releaseNotes: ReleaseNotes;
  @Input() licenses: string;

  @Output() clickedUserIcon = new EventEmitter<void>();
  @Output() clickedTitle = new EventEmitter<void>();
  @Output() changedTab = new EventEmitter<string>();
  @Output() selectedUserMenu = new EventEmitter<string>();
  @Output() action = new EventEmitter<string>();
  @Output() clickedShowUserInformation = new EventEmitter<any>();
  @Output() clickedShowReleaseNotes = new EventEmitter<any>();
  @Output() clickedShowLicenses = new EventEmitter<any>();
  @Output() openOtherApp = new EventEmitter<string>();
  @Output() clickedShowAlertChangePassword = new EventEmitter<AlertDialogData>();

  modalContent: TemplateRef<any>;
  modalHeader: TemplateRef<any>;
  modalContentReleaseNotes: TemplateRef<any>;
  modalContentLicenses: TemplateRef<any>;
  modalHeaderReleaseNotes: TemplateRef<any>;
  modalHeaderLicenses: TemplateRef<any>;

  @ViewChild("userMenu") userMenu: ElementRef;

  @HostListener("document:click", ["$event"])
  onClickOutsideUserMenu(event: Event) {
    if (!this.userMenu.nativeElement.contains(event.target)) {
      this.isUserMenuOpened = false;
    }
  }
  settings = UserInformationSettings;

  constructor(public dialog: MatDialog) {}

  public onClickTitle() {
    this.clickedTitle.emit();
  }

  public onChangedTab(tab: string) {
    this.changedTab.emit(tab);
  }

  public onClickUserIcon() {
    this.clickedUserIcon.emit();
  }

  public onClickUserMenu(menu: string) {
    this.selectedUserMenu.emit(menu);
    this.isUserMenuOpened = false;
  }

  openUserInformationPopup = () => {
    return this.dialog.open(ModalComponent, {
      width: this.settings.modalConfig.width,
      height: this.settings.modalConfig.height,
      panelClass: this.settings.modalConfig.panelClass,
      data: {
        disableTitle: false,
        buttons: this.settings.modalConfig.buttons,
        templateRef: this.modalContent,
        headerRef: this.modalHeader,
      },
      disableClose: true,
      autoFocus: true,
    });
  };

  openReleaseNotesPopup = () => {
    return this.dialog.open(ModalComponent, {
      width: this.settings.modalReleaseSetting.width,
      maxHeight: this.settings.modalReleaseSetting.maxHeight,
      panelClass: this.settings.modalReleaseSetting.panelClass,
      data: {
        disableTitle: false,
        buttons: this.settings.modalReleaseSetting.buttons,
        templateRef: this.modalContentReleaseNotes,
        headerRef: this.modalHeaderReleaseNotes,
      },
      disableClose: true,
      autoFocus: true,
    });
  };

  openLicensesPopup = () => {
    return this.dialog.open(ModalComponent, {
      width: this.settings.modalLicensesSetting.width,
      maxHeight: this.settings.modalLicensesSetting.maxHeight,
      panelClass: this.settings.modalLicensesSetting.panelClass,
      data: {
        disableTitle: false,
        buttons: this.settings.modalLicensesSetting.buttons,
        templateRef: this.modalContentLicenses,
        headerRef: this.modalHeaderLicenses,
      },
      disableClose: true,
      autoFocus: true,
    });
  };

  onClickUserInformation(modalContent: TemplateRef<any>, modalHeader: TemplateRef<any>) {
    this.modalContent = modalContent;
    this.modalHeader = modalHeader;
    this.clickedShowUserInformation.emit({ open: this.openUserInformationPopup });
  }

  onClickReleaseNotes(modalContent: TemplateRef<any>, modalHeader: TemplateRef<any>) {
    this.modalContentReleaseNotes = modalContent;
    this.modalHeaderReleaseNotes = modalHeader;
    this.clickedShowReleaseNotes.emit({ open: this.openReleaseNotesPopup });
  }

  onClickLicenses(modalContent: TemplateRef<any>, modalHeader: TemplateRef<any>) {
    this.modalContentLicenses = modalContent;
    this.modalHeaderLicenses = modalHeader;
    this.clickedShowLicenses.emit({ open: this.openLicensesPopup });
  }

  onClickChangePassword() {
    this.clickedShowAlertChangePassword.emit(this.settings.alertChangePasswordSetting);
  }

  openedOtherApp(applicationUrl: string): void {
    this.openOtherApp.emit(applicationUrl);
  }
}
