import { PaginatorSettings } from "./paginator.component.i";
import * as token from "../../../assets/i18n/token.json";
import { Icons } from "../../constants/icons";
const { inform } = token;
export class Settings implements Readonly<PaginatorSettings> {
  icons = Icons;
  pageSizeDefault = 15;
  pageSizeOptionsDefault = [10, 15, 25, 50];
  labels = {
    prev: "Previous",
    next: "Next",
    displayedRecords: inform.common.paginationRecordCount,
    noRecordsFound: inform.common.paginationNoRecords,
    itemsPerPage: inform.common.paginationItemsPerPage,
  };
  movingStepDefault = 3;
}
