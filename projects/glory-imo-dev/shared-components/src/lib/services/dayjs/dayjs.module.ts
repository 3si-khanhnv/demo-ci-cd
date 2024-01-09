import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { DayjsService } from "./dayjs.service";
@NgModule({
  imports: [CommonModule],
})
export class DayjsModule {
  static forRoot(): ModuleWithProviders<DayjsModule> {
    return {
      ngModule: DayjsModule,
      providers: [{ provide: DayjsService, useValue: new DayjsService() }],
    };
  }
}
