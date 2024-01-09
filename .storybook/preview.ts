import { moduleMetadata, type Preview } from "@storybook/angular";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoryBookI18nModule } from "../projects/glory-imo-dev/shared-components/src/stories/storybook.module";

// AoT requires an exported function for factories

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    decorators: [
      moduleMetadata({
        imports: [StoryBookI18nModule],
      }),
    ],
  },
};

export default preview;
