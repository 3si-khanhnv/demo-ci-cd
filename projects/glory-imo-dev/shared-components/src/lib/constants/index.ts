import * as token from "../../assets/i18n/token.json";
import { NavItem } from "../components/menu-categories/menu-item/menu-item.i";
import { OptionsMessage } from "../components/message-options/message-options.component.i";

const { inform } = token;

export class Constant {
    public static title = "UBIQULAR™";
    public static readonly defaultLanguage = "default";
    public static pages = [];
    public static tabs = [
      {
        name: inform.common.menuGlobalOrdering,
        url: "/ordering",
        children: ["/orders", "/create-order", "/edit-order", "/provisional-credit", "/view-provisional-credit"],
        isPermission: true,
        keyCheckPermission: "ordering",
      },
      {
        name: inform.common.menuGlobalTracking,
        url: "/tracking",
        children: ["/transactions", "/current-inventory", "/inventory-history"],
        isPermission: true,
        keyCheckPermission: "tracking",
      },
      {
        name: inform.common.menuGlobalReporting,
        url: "/reporting",
        children: ["/view-reports"],
        isPermission: true,
        keyCheckPermission: "reporting",
      },
      {
        name: inform.common.menuGlobalSetup,
        url: "/setup",
        children: [
          "/cits",
          "/create-cit",
          "/edit-cit",
          "/devices",
          "/device-settings",
          "/locations",
          "/edit-location",
          "/calendars",
          "/create-calendar",
          "/edit-calendar",
          "/create-schedule",
          "/edit-schedule",
          "/schedules",
          "/roles-for-manage",
          "/create-role-manage",
          "/edit-role-manage",
          "/roles-for-inform",
          "/create-role-inform",
          "/edit-role-inform",
        ],
        isPermission: true,
        keyCheckPermission: "setup",
      },
    ];
    // TODO start
  
    public static tabSetupInform: NavItem[] = [
      {
        displayName: inform.common.menuSetupRolesForInform,
        route: "/roles-for-inform",
        children: [],
        isPermission: true,
        keyCheckPermission: "rolesOfInform",
      },
      {
        displayName: inform.common.menuSetupSchedules,
        route: "/schedules",
        children: [],
        isPermission: true,
        keyCheckPermission: "schedules",
      },
    ];
  
    public static tabSetupManage: NavItem[] = [
      {
        displayName: inform.common.menuSetupCalendars,
        route: "/calendars",
        children: [],
        isPermission: true,
        keyCheckPermission: "calendars",
      },
      {
        displayName: inform.common.itemsCit,
        route: "/cits",
        children: [],
        isPermission: true,
        keyCheckPermission: "cits",
      },
      {
        displayName: inform.common.itemsDevices,
        route: "/devices",
        children: [],
        isPermission: true,
        keyCheckPermission: "devices",
      },
      {
        displayName: inform.common.itemsLocationPlural,
        route: "/locations",
        children: [],
        isPermission: true,
        keyCheckPermission: "locations",
      },
  
      {
        displayName: inform.common.menuSetupRolesForManage,
        route: "/roles-for-manage",
        children: [],
        isPermission: true,
        keyCheckPermission: "rolesOfManage",
      },
      {
        displayName: inform.common.menuSetupSchedules,
        route: "/schedules",
        children: [],
        isPermission: true,
        keyCheckPermission: "schedules",
      },
    ];
  
    public static tabTracking: NavItem[] = [
      {
        displayName: inform.common.menuTrackingTransactions,
        route: "/transactions",
        children: [],
        isPermission: true,
        keyCheckPermission: "accessTransaction",
      },
      {
        displayName: inform.common.menuTrackingCurrentInventory,
        route: "/current-inventory",
        children: [],
        isPermission: true,
        keyCheckPermission: "accessInventory",
      },
      {
        displayName: inform.common.menuTrackingInventoryHistory,
        route: "/inventory-history",
        children: [],
        isPermission: true,
        keyCheckPermission: "accessInventoryHistory",
      },
    ];
  
    public static tabsInformChild: NavItem[] = [
      {
        displayName: inform.common.menuGlobalReporting,
        route: "/reporting",
        children: [],
        isPermission: true,
        keyCheckPermission: "reporting",
      },
      {
        displayName: inform.common.menuGlobalTracking,
        route: "/tracking",
        children: Constant.tabTracking,
        isPermission: true,
        keyCheckPermission: "tracking",
      },
      {
        displayName: inform.common.menuGlobalSetup,
        route: "/setup",
        children: Constant.tabSetupInform,
        isPermission: true,
        keyCheckPermission: "setup",
      },
    ];
  
    public static tabsManageChild: NavItem[] = [
      {
        displayName: inform.dashboard.buttonOrders,
        route: "/orders",
        children: [],
        isPermission: true,
        keyCheckPermission: "orders",
      },
      {
        displayName: inform.dashboard.buttonProvisionalCredit,
        route: "/provisional-credit",
        children: [],
        isPermission: true,
        keyCheckPermission: "provisional-credit",
      },
      {
        displayName: inform.common.menuGlobalReporting,
        route: "/reporting",
        children: [],
        isPermission: true,
        keyCheckPermission: "reporting",
      },
      {
        displayName: inform.common.menuGlobalTracking,
        route: "/tracking",
        children: Constant.tabTracking,
        isPermission: true,
        keyCheckPermission: "tracking",
      },
      {
        displayName: inform.common.menuGlobalSetup,
        route: "/setup",
        children: Constant.tabSetupManage,
        isPermission: true,
        keyCheckPermission: "setup",
      },
    ];
  
    public static tabsMenu: NavItem[] = [
      {
        displayName: inform.common.itemsManage,
        route: "",
        children: Constant.tabsManageChild,
        isPermission: true,
        keyCheckPermission: "manage",
        indexEl: 0,
      },
      {
        displayName: inform.common.itemsInform,
        route: "",
        children: Constant.tabsInformChild,
        isPermission: true,
        keyCheckPermission: "inform",
        indexEl: 0,
      },
    ];
  
    public static listNotShowDuplicate = ["reporting", "tracking"];
  
    public static listShowManage = ["orders", "tracking", "provisional-credit"];
  
    public static listRoutingInActive = ["/dashboard"];
  
    public static listURLNotRouting = ["/tracking", "/reporting", "/setup", "/ordering"];
  
    // TODO end
    public static routers = [
      { url: "ordering", router: "/ordering", name: "Ordering", parent: null, permission: "*", groupRole: "" },
      {
        url: "provisional-credit",
        router: "/provisional-credit",
        name: "Provisional Credit",
        parent: "ordering",
        permission: "accessProvisionalCredit",
        groupRole: "orders",
      },
      {
        url: "view-provisional-credit",
        router: "/view-provisional-credit",
        name: "View Provisional Credit",
        parent: "provisional-credit",
        permission: "provisionalCredits",
        groupRole: "orders",
      },
      { url: "orders", router: "/orders", name: "Orders", parent: "ordering", permission: "accessOrders", groupRole: "orders" },
      {
        url: "create-order",
        router: "/create-order",
        name: "Create order",
        parent: "orders",
        permission: "editOrders",
        groupRole: "orders",
      },
      {
        url: "edit-order",
        router: "/edit-order",
        name: "Edit order",
        parent: "orders",
        permission: "accessOrders",
        groupRole: "orders",
      },
      { url: "tracking", router: "/tracking", name: inform.common.menuGlobalTracking, parent: null, permission: "*", groupRole: "" },
      {
        url: "transactions",
        router: "/transactions",
        name: "Transactions",
        parent: "tracking",
        permission: "accessTransaction",
        groupRole: "tracking",
      },
      {
        url: "current-inventory",
        router: "/current-inventory",
        name: "Current Inventory",
        parent: "tracking",
        permission: "accessInventory",
        groupRole: "tracking",
      },
      {
        url: "inventory-history",
        router: "/inventory-history",
        name: "Inventory History",
        parent: "tracking",
        permission: "accessInventoryHistory",
        groupRole: "tracking",
      },
      {
        url: "reporting",
        router: "/reporting",
        name: inform.common.menuGlobalReporting,
        parent: null,
        permission: "accessReports",
        groupRole: "reporting",
      },
      { url: "view-reports", router: "/view-reports", name: null, parent: "reporting", permission: "*", groupRole: "reporting" },
      { url: "setup", router: "/setup", name: "Setup", parent: null, permission: "*", groupRole: "" },
      { url: "calendars", router: "/calendars", name: "Calendars", parent: "setup", permission: "viewCalendars", groupRole: "calendars" },
      {
        url: "create-calendar",
        router: "/create-calendar",
        name: "Create calendar",
        parent: "calendars",
        permission: "createEditCalendars",
        groupRole: "calendars",
      },
      {
        url: "edit-calendar",
        router: "/edit-calendar",
        name: "Edit calendar",
        parent: "calendars",
        permission: "createEditCalendars",
        groupRole: "calendars",
      },
      { url: "cits", router: "/cits", name: "CIT", parent: "setup", permission: "viewCits", groupRole: "cits" },
      {
        url: "create-cit",
        router: "/create-cit",
        name: "Create CIT",
        parent: "cits",
        permission: "createEditCits",
        groupRole: "cits",
      },
      { url: "edit-cit", router: "/edit-cit", name: "Edit CIT", parent: "cits", permission: "createEditCits", groupRole: "cits" },
      { url: "devices", router: "/devices", name: "Devices", parent: "setup", permission: "viewDevices", groupRole: "devices" },
      {
        url: "device-settings",
        router: "/device-settings",
        name: "Device setting",
        parent: "devices",
        permission: "createEditDevices",
        groupRole: "devices",
      },
      { url: "locations", router: "/locations", name: "Locations", parent: "setup", permission: "viewLocations", groupRole: "locations" },
      {
        url: "edit-location",
        router: "/edit-location",
        name: "Edit Location",
        parent: "locations",
        permission: "createEditLocations",
        groupRole: "locations",
      },
      {
        url: "roles-for-manage",
        router: "/roles-for-manage",
        name: "Roles for Manage",
        parent: "setup",
        permission: "viewRoles",
        groupRole: "rolesOfManage",
      },
      {
        url: "roles-for-inform",
        router: "/roles-for-inform",
        name: "Roles for Inform",
        parent: "setup",
        permission: "viewRoles",
        groupRole: "rolesOfInform",
      },
      {
        url: "create-role-manage",
        router: "/create-role-manage",
        name: "Create Role Manage",
        parent: "roles-for-manage",
        permission: "createEditRoles",
        groupRole: "rolesOfManage",
      },
      {
        url: "create-role-inform",
        router: "/create-role-inform",
        name: "Create Role Inform",
        parent: "roles-for-inform",
        permission: "createEditRoles",
        groupRole: "rolesOfInform",
      },
      {
        url: "edit-role-inform",
        router: "/edit-role-inform",
        name: "Edit Role Inform",
        parent: "roles-for-inform",
        permission: "createEditRoles",
        groupRole: "rolesOfInform",
      },
      {
        url: "edit-role-manage",
        router: "/edit-role-manage",
        name: "Edit Role Manage",
        parent: "roles-for-manage",
        permission: "createEditRoles",
        groupRole: "rolesOfManage",
      },
      { url: "schedules", router: "/schedules", name: "Schedules", parent: "setup", permission: "viewSchedules", groupRole: "schedules" },
      {
        url: "create-schedule",
        router: "/create-schedule",
        name: "Create Schedule",
        parent: "schedules",
        permission: "createEditSchedules",
        groupRole: "schedules",
      },
      {
        url: "edit-schedule",
        router: "/edit-schedule",
        name: "Edit Schedule",
        parent: "schedules",
        permission: "createEditSchedules",
        groupRole: "schedules",
      },
    ];
  
    public static userMenus = [inform.common.menuPersonLogout];
    public static iconPath = "assets/img/icons/";
  
    // Error level case & color
    public static errorLevel = {
      critical: { case: "critical", color: "red" },
      warning: { case: "warning", color: "yellow" },
      info: { case: "info", color: "blue" },
    };
  
    public static setupPage = [
      { routerLink: "/calendars", title: "Calendars" },
      { routerLink: "/cits", title: "CIT" },
      { routerLink: "/devices", title: "Devices" },
      { routerLink: "/locations", title: "Locations" },
      { routerLink: "/roles", title: "Roles" },
      { routerLink: "/schedules", title: "Schedules" },
    ];
  
    public static trackingPage = [
      { routerLink: "/transactions", title: "Transactions" },
      { routerLink: "/current-inventory", title: "Current Inventory" },
      { routerLink: "/inventory-history", title: "Inventory History" },
    ];
  
    public static reportPage = [];
  
    public static messageNotPermission: OptionsMessage = {
      message: "You do not have permission to edit. You can only view.",
      status: "warning",
    };
  
    public static messageWarningIsMirrorCurrency: OptionsMessage = {
      message: "This location is being used as a mirror for the following location(s). Currency settings cannot be changed.",
      status: "warning",
    };
  
    public static messageWarningBufferDays: OptionsMessage = {
      message: "Recommend to set Order Buffer Day > Trigger Buffer Day",
      status: "warning",
    };
  
    public static messageWarningChooseDenominationForVirtualSafe: OptionsMessage = {
      message: "Please choose at least one denomination for virtual safes",
      status: "warning",
    };
  
    public static messageWarningUsingMirrorCurrency: OptionsMessage = {
      message: "Currency setting cannot be changed for a location that is using a mirror",
      status: "warning",
    };
  
    public static conditionPermission = {
      andTrue: "AND-1",
      andFalse: "AND-0",
      orTrue: "OR-1",
      orFalse: "OR-0",
    };
    public static components = {
      dashboard: "DashboardPageComponent",
      "view-reports": "ViewReportsPageComponent",
      schedules: "SchedulesPageComponent",
      "edit-schedule": "CreateSchedulePageComponent",
      "create-schedule": "CreateSchedulePageComponent",
    };
  
    public static formatDateSendRes = "YYYY-MM-DD";
    public static formatTimeDateSendRes = "YYYY-MM-DD hh:mm:ss";
  }