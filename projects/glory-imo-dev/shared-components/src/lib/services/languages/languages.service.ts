import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";

import { Constant } from "../../constant";
import { AppState } from "../../stores";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  constructor(private translateService: TranslateService, private store: Store<AppState>) {}

  public enable() {
    const languages = Constant.defaultLanguage;
    this.translateService.setDefaultLang(languages);
  }

  public setLang(lang: string) {
    this.translateService.use(lang);
  }
  public addLang(key, value) {
    this.translateService.setTranslation(key, value);
  }
}
