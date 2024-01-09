import { Icons } from "../../constants/icons";

export interface PaginatorSettings {
  pageSizeDefault: number;
  pageSizeOptionsDefault: number[];
  movingStepDefault: number;
  icons: Icons;
  labels: {
    prev: string;
    next: string;
    displayedRecords: string;
    itemsPerPage: string;
  };
}

export interface PageChangeValue {
  currentPage: number;
  offset: number;
  limit: number;
}
