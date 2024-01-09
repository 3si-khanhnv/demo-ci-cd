import { Type } from "@angular/core";

type PropertyInputComponent = {
  [key: string]: any;
};

type PropertyOutputComponent = {
  // [key: string]: (value?: any) => any;
  [key: string]: any;
};

export type IDynamicCreateComponent<I extends PropertyInputComponent, O extends PropertyOutputComponent> = {
  component: Type<any>;
  inputs: Partial<I>;
  outputs: Partial<O>;
};
