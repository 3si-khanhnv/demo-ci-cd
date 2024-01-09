import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { MenuCategoriesComponent } from "./menu-categories.component";
import { MenuCategoriesModule } from "./menu-categories.module";
import { NavItem } from "./menu-item/menu-item.i";
import { Icons } from "../../constants/icons";

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
    isDisable: true,
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

const meta: Meta<MenuCategoriesComponent> = {
  title: "Components / Atoms/MenuCategories",
  argTypes: {},
  component: MenuCategoriesComponent,
  decorators: [
    moduleMetadata({
      imports: [MenuCategoriesModule, BrowserAnimationsModule, StoryBookI18nModule, RouterTestingModule.withRoutes([])],
    }),
  ],
};

export default meta;

type Story = StoryObj<MenuCategoriesComponent>;

export const Default: Story = {
  args: {
    navItems: navItems,
    customsClass: "custom-menu-header",
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="background:#19243B;height:64px;display: flex;align-items: center;padding: 0 1rem;">
      <imo-menu-categories [navItems]="navItems" [customsClass]="customsClass"></imo-menu-categories>
    </div>
      `,
  }),
};
