import { RouterTestingModule } from "@angular/router/testing";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { SidebarComponent } from "./sidebar.component";
import { INavItem } from "./sidebar.component.i";
import { SidebarModule } from "./sidebar.module";

const navItems: INavItem[] = [
  {
    displayName: "Collection capacity",
    route: "collection-capacity",
    isShowIcon: true,
  },
  {
    displayName: "CIT Performance",
    route: "cit-performance",
    isShowIcon: false,
  },
  {
    displayName: "Report name 1",
    route: "report-name1",
    isShowIcon: true,
  },
  {
    displayName: "Report name 2",
    route: "report-name2",
    isShowIcon: false,
  },
  {
    displayName: "Report name 3",
    route: "report-name3",
    isShowIcon: false,
  },
];

const meta: Meta<SidebarComponent> = {
  title: "Components / Atoms/SideBar",
  component: SidebarComponent,
  argTypes: { controlNavState: { action: "controlNavState" } },
  decorators: [
    moduleMetadata({
      imports: [SidebarModule, RouterTestingModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<SidebarComponent>;

export const SuccessCreated: Story = {
  name: "success created",
  render: (args) => ({
    props: args,
    template: `
    <div
      style="width: 15rem;
      height: 100%;
      background: #d1d5e0 0% 0% no-repeat padding-box;
      opacity: 1;
      min-height: 100vh;"
    >
      <imo-sidebar 
        [items]="dataListSideBar" 
        [sideNavState]="sideNavState" 
        [linkText]="linkText" 
        (controlNavState)="controlNavState($event)">
      </imo-sidebar>
    </div>
    
  `,
  }),
  args: {
    items: navItems,
    sideNavState: true,
    linkText: true,
  },
};
