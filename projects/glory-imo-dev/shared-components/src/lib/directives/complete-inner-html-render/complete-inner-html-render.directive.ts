import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from "@angular/core";

@Directive({
  selector: "[imoCompleteInnerHtmlRender]",
  exportAs: "imoCompleteInnerHtmlRender",
})
export class CompleteInnerHtmlRenderDirective implements OnDestroy {
  _observer: MutationObserver;
  @Output() innerHtmlCompleteRendered = new EventEmitter();

  constructor(private el: ElementRef) {
    this._observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          this.innerHtmlCompleteRendered.emit();
        }
      });
    });
    this._observer.observe(this.el.nativeElement, { attributes: true, childList: true, characterData: true });
  }

  ngOnDestroy() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }
}
