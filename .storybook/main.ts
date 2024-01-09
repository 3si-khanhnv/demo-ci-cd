import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  stories: [
    "../projects/glory-imo-dev/shared-components/src/**/*.mdx",
    "../projects/glory-imo-dev/shared-components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-actions"],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  staticDirs: [{ from: "../projects/glory-imo-dev/shared-components/src/assets", to: "assets" }],
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: true,
  },
  core: {
    builder: {
      name: "@storybook/builder-webpack5",
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
};
export default config;
