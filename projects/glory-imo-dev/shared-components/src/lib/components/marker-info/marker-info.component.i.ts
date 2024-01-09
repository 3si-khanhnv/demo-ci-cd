import { ENumIconStatus } from "../status-icon/status-icon.i";
import { IStatusInfo } from "../status-info/status-info.i";

export interface ITypeIdList {
  name: string;
  number: number;
}

export interface IStatusInfoList {
  data: IStatusInfo;
  type?: ENumIconStatus;
}
