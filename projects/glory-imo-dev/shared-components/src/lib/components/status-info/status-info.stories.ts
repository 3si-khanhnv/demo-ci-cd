import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { ENumIconStatus } from "../status-icon/status-icon.i";
import { StatusInfoComponent } from "./status-info.component";
import { IDataSubAssets, IStatusInfo } from "./status-info.i";
import { StatusInfoModule } from "./status-info.module";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<StatusInfoComponent> = {
  title: "Components / Atoms/Status Info",
  argTypes: {},
  component: StatusInfoComponent,
  decorators: [
    moduleMetadata({
      imports: [StatusInfoModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<StatusInfoComponent>;

export const Good: Story = {
  args: {
    data: {
      label: "K05-ISP-K05",
      subAssets: [
        { title: "ISPK05-ASSETID1" },
        {
          title: "RBW100-ASSETID2",
        },
        {
          title: "RCW100-ASSETID3",
        },
      ],
    } as IStatusInfo,
    type: ENumIconStatus.STATUS_GOOD,
  },
};

export const ErrorList: Story = {
  args: {
    data: {
      label: "K05-ISP-K05",
      dateTime: "05/13 06:16",
      countTime: "1hr26min",
      subAssets: [
        {
          title: "MY-ISPK05",
          message: "0207: Jam Error Error Error Error Error Error Error Error Error Error Error Error",
        },
        {
          title: "MY-ISPK05",
          message: "0207: Jam Error Error Error Error Error Error Error Error Error Error Error Error",
        },
      ] as IDataSubAssets[],
    },
    type: ENumIconStatus.STATUS_ERROR_MARKER,
  },
};

export const Error: Story = {
  args: {
    data: {
      label: "K05-ISP-K05",
      dateTime: "05/13 06:16",
      countTime: "1hr26min",
      subAssets: [],
    } as IStatusInfo,
    type: ENumIconStatus.STATUS_ERROR_MARKER,
  },
};

export const Missing: Story = {
  args: {
    data: {
      label: "K05-ISP-K05",
      dateTime: "05/13 06:16",
      subAssets: [
        { title: "ISPK05-ASSETID1" },
        {
          title: "RBW100-ASSETID2",
        },
        {
          title: "RCW100-ASSETID3",
        },
      ],
    } as IStatusInfo,
    type: ENumIconStatus.STATUS_MISSING,
  },
};

export const Warning: Story = {
  args: {
    data: {
      label: "K05-ISP-K05",
      warning: "Inventory Missing",
      subAssets: [
        { title: "ISPK05-ASSETID1-ISPK05-ASSETID1-ISPK05-ASSETID1-ISPK05-ASSETID1-ISPK05-ASSETID1-ISPK05-ASSETID1-ISPK05-ASSETID1" },
        {
          title: "RBW100-ASSETID2-RBW100-ASSETID2-RBW100-ASSETID2-RBW100-ASSETID2-RBW100-ASSETID2-RBW100-ASSETID2-RBW100-ASSETID2",
        },
        {
          title: "RCW100-ASSETID3",
        },
      ],
    } as IStatusInfo,
    type: ENumIconStatus.STATUS_WARNING,
  },
};
