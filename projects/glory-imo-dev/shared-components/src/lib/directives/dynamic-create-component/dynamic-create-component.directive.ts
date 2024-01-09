import { Directive, Input, OnDestroy, ViewContainerRef } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IDynamicCreateComponent } from "./dynamic-create-component.i";

@Directive({
  selector: "[svDynamicCreateComponent]",
})
export class DynamicCreateComponentDirective implements OnDestroy {
  unSubscribe = new Subject<void>();

  @Input("componentData")
  set display(data: IDynamicCreateComponent<any, any>) {
    this.viewContainerRef.clear();

    this.unSubscribe.next();
    this.unSubscribe.complete();
    this.unSubscribe = new Subject<void>();

    if (data?.component) {
      const component = this.viewContainerRef.createComponent(data.component);
      Object.keys(data.inputs).forEach((key) => {
        component.instance[key] = data.inputs[key];
      });

      Object.keys(data.outputs).forEach((key) => {
        (component.instance[key] as Observable<any>).pipe(takeUntil(this.unSubscribe)).subscribe((emitData: any) => {
          data.outputs[key](emitData);
        });
      });
    }
  }

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
