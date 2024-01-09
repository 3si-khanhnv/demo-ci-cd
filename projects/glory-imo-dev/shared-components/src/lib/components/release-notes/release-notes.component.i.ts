import * as tokens from "../../../assets/i18n/token.json";
const { inform } = tokens;

export interface ReleaseNotes {
  [version: string]: {
    new: string[];
    fixed: string[];
  };
}

export const labelReleaseNotes = {
  version: inform.common.itemsVersion,
  new: inform.common.menuPersonReleaseNotesNew,
  fixed: inform.common.menuPersonReleaseNotesFixed,
};

export interface FailedReason {
  code?: number;
  reason?: string;
}
