import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { HeaderTabItemComponent } from "./header-tab-item.component";
import { HeaderTabItemModule } from "./header-tab-item.module";
import { RouterTestingModule } from "@angular/router/testing";
import { NavItem } from "../menu-categories/menu-item/menu-item.i";
import { Icons } from "../../constants/icons";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const navItems: NavItem[] = [
  {
    displayName: "Manage",
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

const meta: Meta<HeaderTabItemComponent> = {
  title: "Components/ Atoms/HeaderTabItem",
  argTypes: {},
  component: HeaderTabItemComponent,
  decorators: [
    moduleMetadata({
      imports: [HeaderTabItemModule, StoryBookI18nModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([])],
    }),
  ],
  parameters: {
    backgrounds: {
      default: "header",
      values: [
        {
          name: "header",
          value: "#19243b",
        },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<HeaderTabItemComponent>;

export const Default: Story = {
  args: {
    // Input
    text: "Tracking",
    navItems,
  },
};
