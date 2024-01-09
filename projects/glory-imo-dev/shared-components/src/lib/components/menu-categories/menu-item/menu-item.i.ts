export interface NavItem {
  displayName: string;
  iconItem?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    color?: string;
    icon?: string;
    text?: string;
  };
  route?: string;
  class?: string;
  isDisable?: boolean;
  children?: NavItem[];
  isPermission?: boolean;
  keyCheckPermission?: string;
  isGroup?: boolean;
  isShow?: boolean;
  indexEl?: number;
  id?: number;
  parentPermission?: string;
  type?: string;
  displayIndex?: number;
  parentId?: number;
}
export interface DataRaw {
  id: number;
  type: any;
  displayName: string;
  displayIndex: number;
  parentId: number;
}
export const arrGroup = ["administration"];
