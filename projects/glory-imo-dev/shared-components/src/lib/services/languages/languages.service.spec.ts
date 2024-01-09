import { TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { LanguageService } from "./languages.service";
import { Constant } from "../../constant";

describe("LanguageService", () => {
  let service: LanguageService;
  let translateService: TranslateService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            settings: (state) => state,
          },
          {
            runtimeChecks: {
              strictActionImmutability: true,
              strictActionSerializability: true,
              strictStateImmutability: true,
              strictStateSerializability: true,
            },
          },
        ),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [TranslateService],
    }),
  );

  beforeEach(() => {
    service = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("enable", () => {
    it("should set initial lang to en", () => {
      // arrange
      const spySetDefaultLang = jest.spyOn(translateService, "setDefaultLang");
      // const spyUse = jest.spyOn(translateService, "use");
      // act
      service.enable();

      // assert
      expect(spySetDefaultLang).toHaveBeenCalledWith(Constant.defaultLanguage);
      // expect(spyUse).toHaveBeenCalledWith(Constant.defaultLanguage);
    });
    it("should set initial lang to default", () => {
      // arrange
      const spySetDefaultLang = jest.spyOn(translateService, "setDefaultLang");
      // const spyUse = jest.spyOn(translateService, "use");
      // act
      service.enable();

      // assert
      expect(spySetDefaultLang).toHaveBeenCalledWith("default");
      // expect(spyUse).toHaveBeenCalledWith("default");
    });

    it("should set initial LANG_SETTING_KEY null", () => {
      // arrange
      const spySetDefaultLang = jest.spyOn(translateService, "setDefaultLang");
      // const spyUse = jest.spyOn(translateService, "use");
      // act
      service.enable();

      // assert
      expect(spySetDefaultLang).toHaveBeenCalledWith(Constant.defaultLanguage);
      // expect(spyUse).toHaveBeenCalledWith(Constant.defaultLanguage);
    });
  });

  describe("setLang", () => {
    it("should dispatch Setlang action with langSelector", () => {
      // arrange
      const spyUse = jest.spyOn(translateService, "use");
      // act
      service.setLang(Constant.defaultLanguage);

      // assert
      expect(spyUse).toHaveBeenCalledWith(Constant.defaultLanguage);
    });
  });

  describe("addLang", () => {
    it("should dispatch addLang action with langSelector", () => {
      // arrange
      const spyUse = jest.spyOn(translateService, "setTranslation");
      const key = {
        lang: "japanese",
      };
      const value = {};
      // act
      service.addLang(key, value);

      // assert
      expect(spyUse).toHaveBeenCalledWith(key, value);
    });
  });
});
