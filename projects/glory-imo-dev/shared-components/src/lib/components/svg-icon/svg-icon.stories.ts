import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { SvgIconComponent } from "./svg-icon.component";
import { SvgIconModule } from "./svg-icon.module";
import { Icons } from "../../constants/icons";

type NewType = SvgIconComponent;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<NewType> = {
  title: "Components / Atoms/SVGIcon",
  argTypes: {},
  component: SvgIconComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule, SvgIconModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<SvgIconComponent>;

export const Usecase: Story = {
  render: () => ({
    template: `
      <div fxLayout="column" fxLayoutGap="2px">
        <imo-svg-icon fxFlex="100%"[url]="calendar.url" [alt]="calendar.alt"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="angleDoubleLeft.url" [alt]="angleDoubleLeft.alt"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="angleDoubleRight.url" [alt]="angleDoubleRight.alt"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="angleLeft.url" [alt]="angleLeft.alt"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="filterClose.url" [alt]="filterClose.alt"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="filterOpen.url" [alt]="filterOpen.alt"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="angleRight.url" [alt]="angleRight.alt" color="red"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="angleRight.url" [alt]="angleRight.alt" color="green"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="angleRight.url" [alt]="angleRight.alt" color="yellow"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="angleRight.url" [alt]="angleRight.alt" color="blue"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="angleRight.url" [alt]="angleRight.alt" color="orange"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="sort.url" [alt]="sort.alt" ></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="phone.url" [alt]="phone.alt"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="user.url" [alt]="user.alt"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="critical.icon" [alt]="critical.icon" [text]="critical.icon"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="critical.icon" [alt]="critical.icon" [text]="critical.icon" color="red"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="information.icon" [alt]="information.icon" ></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="warning.icon" [alt]="warning.icon"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="uploading.icon" [alt]="uploading.icon" [text]="uploading.icon"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="validating.icon" [alt]="validating.icon" [text]="validating.icon"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="complete.icon" [alt]="complete.icon" [text]="complete.icon"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="ng.icon" [alt]="ng.icon" [text]="ng.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="arrows.icon" [alt]="arrows.icon" [text]="arrows.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="arrowDown.icon" [alt]="arrowDown.icon" [text]="arrowDown.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="arrowUp.icon" [alt]="arrowUp.icon" [text]="arrowUp.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="statusWarning.icon" [alt]="statusWarning.icon" [text]="statusWarning.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="statusError.icon" [alt]="statusError.icon" [text]="statusError.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="balloon.icon" [alt]="balloon.icon" [text]="balloon.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="plusComment.icon" [alt]="plusComment.icon" [text]="plusComment.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="caretLeft.icon" [alt]="caretLeft.icon" [text]="caretLeft.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="calendarLine.icon" [alt]="calendarLine.icon" [text]="calendarLine.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="caretRight.icon" [alt]="caretRight.icon" [text]="caretRight.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="checkCircleOutline.icon" [alt]="checkCircleOutline.icon" [text]="checkCircleOutline.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="caretDoubleLeft.icon" [alt]="caretDoubleLeft.icon" [text]="caretDoubleLeft.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="caretDoubleRight.icon" [alt]="caretDoubleRight.icon" [text]="caretDoubleRight.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="criticalHigh.icon" [alt]="criticalHigh.icon" [text]="criticalHigh.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="criticalLow.icon" [alt]="criticalLow.icon" [text]="criticalLow.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="warningHigh.icon" [alt]="warningHigh.icon" [text]="warningHigh.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="warningLow.icon" [alt]="warningLow.icon" [text]="warningLow.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="ok.icon" [alt]="ok.icon" [text]="ok.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="check.icon" [alt]="check.icon" [text]="check.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="spinner.icon" [text]="spinner.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="openInNew.icon" [alt]="openInNew.icon" [text]="openInNew.text" [color]="'blue'"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="plus.icon" [alt]="plus.icon" [text]="plus.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="minus.icon" [alt]="minus.icon" [text]="minus.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[icon]="verify.icon" [alt]="verify.icon" [text]="verify.text" [color]="'blue'"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="caretDoubleUp.src" [alt]="caretDoubleUp.icon" [text]="caretDoubleUp.text"></imo-svg-icon>
        <imo-svg-icon fxFlex="100%"[url]="caretDoubleDown.src" [alt]="caretDoubleDown.icon" [text]="caretDoubleDown.text"></imo-svg-icon>
        </div>
    `,
    props: {
      calendar: Icons.datePicker,
      angleDoubleLeft: Icons.angleDoubleLeft,
      angleDoubleRight: Icons.angleDoubleRight,
      filterOpen: Icons.filterOpen,
      filterClose: Icons.filterClose,
      angleLeft: Icons.angleLeft,
      angleRight: Icons.angleRight,
      uploading: Icons.uploading,
      validating: Icons.validating,
      complete: Icons.complete,
      ng: Icons.ng,
      critical: Icons.critical,
      information: Icons.information,
      warning: Icons.warning,
      sort: Icons.sort,
      phone: Icons.phone,
      user: Icons.user,
      arrows: Icons.arrows,
      arrowDown: Icons.arrowDown,
      arrowUp: Icons.arrowUp,
      statusWarning: Icons.statusWarning,
      statusError: Icons.statusError,
      balloon: Icons.balloon,
      plusComment: Icons.plusComment,
      calendarLine: Icons.calendar,
      caretLeft: Icons.caretLeft,
      caretRight: Icons.caretRight,
      checkCircleOutline: Icons.checkCircleOutline,
      caretDoubleLeft: Icons.caretDoubleLeft,
      caretDoubleRight: Icons.caretDoubleRight,
      criticalHigh: Icons.criticalHigh,
      criticalLow: Icons.criticalLow,
      warningHigh: Icons.warningHigh,
      warningLow: Icons.warningLow,
      ok: Icons.ok,
      check: Icons.check,
      openInNew: Icons.openInNew,
      spinner: Icons.spinner,
      plus: Icons.plus,
      minus: Icons.minus,
      verify: Icons.verify,
      caretDoubleUp: Icons.caretDoubleUp,
      caretDoubleDown: Icons.caretDoubleDown,
    },
  }),
};
