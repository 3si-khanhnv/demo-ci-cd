import { Component, Input } from "@angular/core";
import { Icons } from "../../constants/icons";

@Component({
  selector: "imo-svg-icon",
  templateUrl: "./svg-icon.component.html",
  styleUrls: ["./svg-icon.component.scss"],
})
export class SvgIconComponent {
  @Input() url: string;
  @Input() alt: string;
  @Input() width = 15;
  @Input() height = 15;
  @Input() color: string;
  @Input() icon: string;
  @Input() iconAlt: string;
  @Input() text: string;

  getUrl(url: string, icon: string) {
    if (url != null) {
      return url;
    }
    switch ((icon || "").toLowerCase()) {
      case Icons.uploading.icon.toLowerCase():
        return Icons.uploading.src;
      case Icons.validating.icon.toLowerCase():
        return Icons.validating.src;
      case Icons.complete.icon.toLowerCase():
        return Icons.complete.src;
      case Icons.ng.icon.toLowerCase():
        return Icons.ng.src;
      case Icons.error.icon.toLowerCase():
        return Icons.error.src;
      case Icons.critical.icon.toLowerCase():
        return Icons.critical.src;
      case Icons.information.icon.toLowerCase():
        return Icons.information.src;
      case Icons.warning.icon.toLowerCase():
        return Icons.warning.src;
      case Icons.inProgress.icon.toLowerCase():
        return Icons.inProgress.src;
      case Icons.scheduled.icon.toLowerCase():
        return Icons.scheduled.src;
      case Icons.failure.icon.toLowerCase():
        return Icons.failure.src;
      case Icons.invalid.icon.toLowerCase():
        return Icons.invalid.src;
      case Icons.arrows.icon.toLowerCase():
        return Icons.arrows.src;
      case Icons.arrowDown.icon.toLowerCase():
        return Icons.arrowDown.src;
      case Icons.arrowUp.icon.toLowerCase():
        return Icons.arrowUp.src;
      case Icons.statusWarning.icon.toLowerCase():
        return Icons.statusWarning.src;
      case Icons.statusError.icon.toLowerCase():
        return Icons.statusError.src;
      case Icons.balloon.icon.toLowerCase():
        return Icons.balloon.src;
      case Icons.plusComment.icon.toLowerCase():
        return Icons.plusComment.src;
      case Icons.caretLeft.icon.toLowerCase():
        return Icons.caretLeft.src;
      case Icons.calendar.icon.toLowerCase():
        return Icons.calendar.src;
      case Icons.caretRight.icon.toLowerCase():
        return Icons.caretRight.src;
      case Icons.checkCircleOutline.icon.toLowerCase():
        return Icons.checkCircleOutline.src;
      case Icons.caretDoubleLeft.icon.toLowerCase():
        return Icons.caretDoubleLeft.src;
      case Icons.caretDoubleRight.icon.toLowerCase():
        return Icons.caretDoubleRight.src;
      case Icons.criticalHigh.icon.toLowerCase():
        return Icons.criticalHigh.src;
      case Icons.criticalLow.icon.toLowerCase():
        return Icons.criticalLow.src;
      case Icons.warningHigh.icon.toLowerCase():
        return Icons.warningHigh.src;
      case Icons.warningLow.icon.toLowerCase():
        return Icons.warningLow.src;
      case Icons.ok.icon.toLowerCase():
        return Icons.ok.src;
      case Icons.check.icon.toLowerCase():
        return Icons.check.src;
      case Icons.spinner.icon.toLowerCase():
        return Icons.spinner.src;
      case Icons.openInNew.icon.toLowerCase():
        return Icons.openInNew.src;
      case Icons.plus.icon.toLowerCase():
        return Icons.plus.src;
      case Icons.minus.icon.toLowerCase():
        return Icons.minus.src;
      case Icons.verify.icon.toLowerCase():
        return Icons.verify.src;

      default:
        return "";
    }
  }
  getAlt(alt: string, iconAlt: string) {
    if (alt != null) {
      return alt;
    }
    switch ((iconAlt || "").toLowerCase()) {
      case Icons.critical.icon.toLowerCase():
        return Icons.critical.text;
      case Icons.information.icon.toLowerCase():
        return Icons.information.text;
      case Icons.warning.icon.toLowerCase():
        return Icons.warning.text;
      case Icons.ng.icon.toLowerCase():
        return Icons.ng.text;
      default:
        return "";
    }
  }
}
