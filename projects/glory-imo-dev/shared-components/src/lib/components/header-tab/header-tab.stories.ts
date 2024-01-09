import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { NavItem } from "../menu-categories/menu-item/menu-item.i";
import { HeaderTabComponent } from "./header-tab.component";
import { HeaderTabModule } from "./header-tab.module";
import { Icons } from "../../constants/icons";

// const tabs = [
//   {
//     name: "tab1",
//     url: "/tab1",
//     children: ["children1"],
//     isPermission: true,
//   },
//   {
//     name: "tab2",
//     url: "/tab2",
//     children: ["children2"],
//     isPermission: true,
//   },
//   {
//     name: "tab3",
//     url: "/tab3",
//     children: ["children3"],
//     isPermission: true,
//   },
// ];
const navItems: NavItem[] = [
  {
    displayName: "Manage",
    children: [
      {
        displayName: "Roles for Manage",
        iconItem: {
          url: Icons.arrowRight.src,
        },
        children: [
          {
            displayName: "Michael Prentice",
            iconItem: {
              url: Icons.arrowRight.src,
            },
            route: "michael-prentice",
            children: [
              {
                displayName: "Delight your Organization",
                route: "material-design",
              },
            ],
          },
          {
            displayName: "Stephen Fluin",
            iconItem: {
              url: Icons.arrowRight.src,
            },
            route: "stephen-fluin",
            children: [
              {
                displayName: "What's up with the Web?",
                route: "what-up-web",
              },
            ],
          },
          {
            displayName: "Mike Brocchi",
            iconItem: {
              url: Icons.arrowRight.src,
            },
            route: "mike-brocchi",
            children: [
              {
                displayName: "My ally, the CLI",
                route: "my-ally-cli",
              },
              {
                displayName: "Become an Angular Tailor",
                route: "become-angular-tailer",
              },
            ],
          },
        ],
      },
      {
        displayName: "CIT Performance Summary",
        iconItem: {
          url: Icons.arrowRight.src,
        },
        children: [
          {
            displayName: "Delight your Organization",
            route: "material-design",
          },
          {
            displayName: "What's up with the Web?",
            route: "what-up-web",
          },
          {
            displayName: "My ally, the CLI",
            route: "my-ally-cli",
          },
          {
            displayName: "Become an Angular Tailor",
            route: "become-angular-tailer",
          },
        ],
      },
      {
        displayName: "Feedback",
        route: "feedback",
      },
    ],
    isDisable: false,
    class: "menu-bar",
  },
  {
    displayName: "Inform",
    children: [
      {
        displayName: "Speakers",
        iconItem: {
          url: Icons.arrowRight.src,
        },
        children: [
          {
            displayName: "Michael Prentice",
            iconItem: {
              url: Icons.arrowRight.src,
            },
            route: "michael-prentice",
            children: [
              {
                displayName: "Delight your Organization",
                route: "material-design",
              },
            ],
          },
          {
            displayName: "Stephen Fluin",
            iconItem: {
              url: Icons.arrowRight.src,
            },
            route: "stephen-fluin",
            children: [
              {
                displayName: "What's up with the Web?",
                route: "what-up-web",
              },
            ],
          },
          {
            displayName: "Mike Brocchi",
            iconItem: {
              url: Icons.arrowRight.src,
            },
            route: "mike-brocchi",
            children: [
              {
                displayName: "My ally, the CLI",
                route: "my-ally-cli",
              },
              {
                displayName: "Become an Angular Tailor",
                route: "become-angular-tailer",
              },
            ],
          },
        ],
      },
      {
        displayName: "Sessions",
        iconItem: {
          url: Icons.arrowRight.src,
        },
        children: [
          {
            displayName: "Delight your Organization",
            route: "material-design",
          },
          {
            displayName: "What's up with the Web?",
            route: "what-up-web",
          },
          {
            displayName: "My ally, the CLI",
            route: "my-ally-cli",
          },
          {
            displayName: "Become an Angular Tailor",
            route: "become-angular-tailer",
          },
        ],
      },
      {
        displayName: "Feedback",
        route: "feedback",
      },
    ],
    isDisable: false,
    class: "menu-bar",
  },
  {
    displayName: "Tracking",
    children: [
      {
        displayName: "Speakers",
        iconItem: {
          url: Icons.arrowRight.src,
        },
        children: [
          {
            displayName: "Michael Prentice",
            iconItem: {
              url: Icons.arrowRight.src,
            },
            route: "michael-prentice",
            children: [
              {
                displayName: "Delight your Organization",
                route: "material-design",
              },
            ],
          },
          {
            displayName: "Stephen Fluin",
            iconItem: {
              url: Icons.arrowRight.src,
            },
            route: "stephen-fluin",
            children: [
              {
                displayName: "What's up with the Web?",
                route: "what-up-web",
              },
            ],
          },
          {
            displayName: "Mike Brocchi",
            iconItem: {
              url: Icons.arrowRight.src,
            },
            route: "mike-brocchi",
            children: [
              {
                displayName: "My ally, the CLI",
                route: "my-ally-cli",
              },
              {
                displayName: "Become an Angular Tailor",
                route: "become-angular-tailer",
              },
            ],
          },
        ],
      },
      {
        displayName: "Sessions",
        iconItem: {
          url: Icons.arrowRight.src,
        },
        children: [
          {
            displayName: "Delight your Organization",
            route: "material-design",
          },
          {
            displayName: "What's up with the Web?",
            route: "what-up-web",
          },
          {
            displayName: "My ally, the CLI",
            route: "my-ally-cli",
          },
          {
            displayName: "Become an Angular Tailor",
            route: "become-angular-tailer",
          },
        ],
      },
      {
        displayName: "Feedback",
        route: "feedback",
      },
    ],
    isDisable: false,
    class: "menu-bar",
  },
];

const meta: Meta<HeaderTabComponent> = {
  title: "Components / Atoms/HeaderTab",
  argTypes: { onClickTab: { action: "onClickTab" } },
  component: HeaderTabComponent,
  decorators: [
    moduleMetadata({
      imports: [HeaderTabModule, BrowserAnimationsModule, StoryBookI18nModule, RouterTestingModule.withRoutes([])],
    }),
  ],
  parameters: {
    backgrounds: {
      default: "header",
      values: [
        {
          name: "header",
          value: "#29243b",
        },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<HeaderTabComponent>;

export const Default: Story = {
  args: {
    tabs: navItems,
  },
};
