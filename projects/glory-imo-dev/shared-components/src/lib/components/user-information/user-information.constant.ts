import * as tokens from "../../../assets/i18n/token.json";
const { inform } = tokens;

export class InformationLabel {
  fullName = inform.common.itemsFullName;
  email = inform.common.itemsEmail;
  sms = inform.common.itemsSmsAddress;
  phone = inform.common.itemsPhoneNumber;
  country = inform.common.itemsCountryCode;
  address = inform.common.itemsAddress;
  city = inform.common.itemsCity;
  state = inform.common.itemsStateOfAddress;
  postCode = inform.common.itemsPostCode;
  timezone = inform.common.itemsTimezone;
  language = inform.common.itemsLanguage;
  roles = inform.common.itemsImoRole;
  externalRole = inform.common.itemsExternalRole;
}
