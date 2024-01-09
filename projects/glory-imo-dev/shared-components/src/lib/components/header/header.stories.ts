import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { HeaderComponent } from "./header.component";
import { HeaderModule } from "./header.module";
import { NavItem } from "../menu-categories/menu-item/menu-item.i";
import { RouterTestingModule } from "@angular/router/testing";
import { Icons } from "../../constants/icons";
import { initialState } from "./header.constant";

const user = initialState.userInformation;

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

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<HeaderComponent> = {
  title: "Components/ Atoms/Header",
  argTypes: {
    // Output
    clickedUserIcon: { action: "clickedUserIcon" },
    selectedUserMenu: { action: "selectedUserMenu" },
    onChangedTab: { action: "onChangedTab" },
    clickedTitle: { action: "clickedTitle" },
  },
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [HeaderModule, StoryBookI18nModule, BrowserAnimationsModule, MatDialogModule, RouterTestingModule.withRoutes([])],
    }),
  ],
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {
    // Input
    userMenus: ["Logout", "G-Enterprise"],
    isUserMenuOpened: false,
    userInformation: user,
    tabs: navItems,
    title: "UBIQULAR™",
  },
};
