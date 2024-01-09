export interface Labels {
  checkbox?: { aria: string };
  headerButton?: { aria: string };
}

export type ExpandColumnType = {
  column: string;
  name: string;
};

export class ExpandColumn implements ExpandColumnType {
  column: string;
  name: string;
  style?: { [key: string]: any };
}
