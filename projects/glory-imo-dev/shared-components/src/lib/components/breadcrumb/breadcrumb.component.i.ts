export interface Breadcrumb {
  name: string;
  parent: string | null;
  router: string;
  url: string;
  permission: string;
}
