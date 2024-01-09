export interface UserInformation {
  fullName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  smsAddress: string;
  phoneNumber: string;
  countryCode: string;
  physicalAddress: string;
  city: string;
  state: string;
  postalCode: string;
  timezone: string;
  language: string;
  roles: Role[];
  permissions: DynamicKeyValue;
}

export interface Role {
  role: string;
}

export interface DynamicKeyValue {
  [key: string]: any;
}
