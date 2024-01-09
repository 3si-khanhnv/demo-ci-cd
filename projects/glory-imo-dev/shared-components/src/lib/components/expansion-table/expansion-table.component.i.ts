import { Labels as RowLabels } from "../expansion-panel/expansion-panel.component.i";

export interface Labels {
  checkbox: { aria: string };
  expansion: RowLabels;
}

/**
 * Expansion Table Data
 * @prop {ExpansionTableRow[]} data - table data
 * @prop {"all" | "partial" | "none"} checked - if all data checked
 */
export interface ExpansionTable {
  data: ExpansionTableRow[];
  checked?: "all" | "partial" | "none";
}

/**
 * Expansion Table Row
 * @prop {string|number} id - This prop is used to identify items by renderer. Must be unique.
 * @prop {boolean|null|undefined} checked - if row checked
 */
export interface ExpansionTableRow {
  id: string | number;
  checked?: boolean;
  status?: string;
  [key: string]: any;
}
