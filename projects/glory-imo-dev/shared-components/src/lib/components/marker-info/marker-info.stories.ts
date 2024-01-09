import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { ENumIconStatus } from "../status-icon/status-icon.i";
import { IStatusInfo } from "../status-info/status-info.i";
import { MarkerInfoComponent } from "./marker-info.component";
import { MarkerInfoModule } from "./marker-info.module";

const meta: Meta<MarkerInfoComponent> = {
  title: "Components / Atoms/marker Info",
  argTypes: { clicked: { action: "clicked" } },
  component: MarkerInfoComponent,
  decorators: [
    moduleMetadata({
      imports: [MarkerInfoModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<MarkerInfoComponent>;

export const Default: Story = {
  args: {
    companyName: "Glory",
    locationName: "Location-3",
    typeIdList: [
      { name: "CI10", number: 5 },
      { name: "CI100", number: 7 },
    ],
    statusInfoList: [
      {
        data: {
          label: "K05-ISP-K05",
          dateTime: "05/13 06:16",
          countTime: "1hr26min",
          subAssets: [
            {
              title: "MY-ISPK01",
              message: "0207: Jam Error Error Error Error Error Error Error Error Error Error Error Error",
            },
            {
              title: "MY-ISPK02",
              message: "0207: Jam Error Error Error Error Error Error Error Error Error Error Error Error",
            },

            {
              title: "MY-ISPK03",
              message: "0207: Jam Error Error Error Error Error Error Error Error",
            },

            {
              title: "MY-ISPK04",
              message: "0207: Jam Error Error Error Error Error Error Error Error",
            },
            {
              title: "MY-ISPK05",
              message: "0207: Jam Error Error Error Error Error Error Error Error",
            },
          ],
        } as IStatusInfo,
        type: ENumIconStatus.STATUS_ERROR_MARKER,
      },
      {
        data: {
          label: "K05-ISP-K05",
          dateTime: "05/13 06:16",
          countTime: "1hr26min",
          subAssets: [
            {
              title: "MY-ISPK01",
              message: "0207: Jam Error Error Error Error Error Error Error Error Error Error Error Error",
            },
            {
              title: "MY-ISPK02",
              message: "0207: Jam Error Error Error Error Error Error Error Error Error Error Error Error",
            },
          ],
        } as IStatusInfo,
        type: ENumIconStatus.STATUS_ERROR_MARKER,
      },
      {
        data: {
          label: "K05-ISP-K05",
          warning: "Inventory Missing",
          subAssets: [{ title: "ISPK05-ASSETID1" }, { title: "RBW100-ASSETID2" }, { title: "RCW100-ASSETID3" }],
        } as IStatusInfo,
        type: ENumIconStatus.STATUS_WARNING,
      },
      {
        data: {
          label: "K05-ISP-K05",
          dateTime: "05/13 06:16",
          countTime: "",
          subAssets: [{ title: "ISPK05-ASSETID1" }, { title: "RBW100-ASSETID2" }, { title: "RCW100-ASSETID3" }],
        } as IStatusInfo,
        type: ENumIconStatus.STATUS_MISSING,
      },
      {
        data: {
          label: "K05-ISP-K05",
          dateTime: "05/13 06:16",
          countTime: "",
          subAssets: [{ title: "ISPK05-ASSETID1" }, { title: "RBW100-ASSETID2" }, { title: "RCW100-ASSETID3" }],
        } as IStatusInfo,
        type: ENumIconStatus.STATUS_MISSING,
      },
      {
        data: {
          label: "K05-ISP-K05",
          dateTime: "",
          countTime: "",
          subAssets: [{ title: "ISPK05-ASSETID1" }, { title: "RBW100-ASSETID2" }, { title: "RCW100-ASSETID3" }],
        } as IStatusInfo,
        type: ENumIconStatus.STATUS_GOOD,
      },
      {
        data: {
          label: "K05-ISP-K05",
          dateTime: "",
          countTime: "",
          subAssets: [{ title: "ISPK05-ASSETID1" }, { title: "RBW100-ASSETID2" }, { title: "RCW100-ASSETID3" }],
        } as IStatusInfo,
        type: ENumIconStatus.STATUS_GOOD,
      },
      {
        data: {
          label: "K05-ISP-K05",
          dateTime: "",
          countTime: "",
          subAssets: [{ title: "ISPK05-ASSETID1" }, { title: "RBW100-ASSETID2" }, { title: "RCW100-ASSETID3" }],
        } as IStatusInfo,
        type: ENumIconStatus.STATUS_GOOD,
      },
      {
        data: {
          label: "K05-ISP-K05",
          dateTime: "",
          countTime: "",
          subAssets: [{ title: "ISPK05-ASSETID1" }, { title: "RBW100-ASSETID2" }, { title: "RCW100-ASSETID3" }],
        } as IStatusInfo,
        type: ENumIconStatus.STATUS_GOOD,
      },
    ],
  },
};
