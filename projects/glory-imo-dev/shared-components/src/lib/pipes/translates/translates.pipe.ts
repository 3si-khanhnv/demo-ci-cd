import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "translates",
  pure: false,
})
export class TranslatesPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(values: string | string[], spaceString = " ", params = {}): any {
    const toArray = ((values && typeof values === "string" && [values]) || values || []) as string[];
    try {
      const value = this.translateService.instant(toArray, params);
      return Object.values(value).join(spaceString);
    } catch {
      return toArray.join(spaceString);
    }
  }
}
