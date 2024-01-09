import { AbstractControl, UntypedFormControl, ValidatorFn } from "@angular/forms";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { confClientFormats } from "../services/config/config.service";

dayjs.extend(utc);

export function isEqual(value: unknown, target: unknown) {
  return JSON.stringify(sortObject(value)) === JSON.stringify(sortObject(target));
}

export function sortObject(unordered: { [key: string]: any }) {
  const result = {};

  Object.keys(unordered || {})
    .sort()
    .forEach((key) => {
      result[key] = unordered[key];

      if (Array.isArray(result[key]) && result[key][0] && Object.keys(result[key][0]).length > 0) {
        result[key] = (result[key] as any[])
          .map((item) => JSON.stringify(sortObject(item)))
          .sort()
          .map((x) => JSON.parse(x));
      } else if (result[key] && typeof result[key] === "object" && Object.keys(result[key]).length > 0) {
        result[key] = sortObject(result[key]);
      }
    });

  return result;
}

export function convertStringToNumber(inputValue: string): number {
  return Number(
    inputValue
      .toString()
      .split("")
      .map((char: string, position: number) => {
        if (position === 0 && char === "0") {
          return "";
        } else {
          return /\d/.test(char) ? char : "";
        }
      })
      .join(""),
  );
}

export function convertToString(inputValue: string | number, isNoneZeroFirst = true): string {
  let result = inputValue;
  if (typeof inputValue === "string") {
    result = inputValue
      .split("")
      .map((char: string, position: number) => {
        if (position === 0 && char === "0" && isNoneZeroFirst) {
          return "";
        }
        return /\d/.test(char) ? char : "";
      })
      .join("");
  }
  return result.toString();
}

export function flattenObject<T, B>(object: B | { [key: string]: Partial<T> }): T {
  return Object.keys(object || {}).reduce((prev, curr) => {
    return { ...prev, ...object[curr] } as T;
  }, {} as T);
}

/**
 * Validate no whitespace for formcontrol input
 */
export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let controlVal = control.value;
    if (typeof controlVal === "number") {
      controlVal = `${controlVal}`;
    }
    const isWhitespace = (controlVal || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: "value is only whitespace" };
  };
}

/**
 * Trim whitespaces of all fields in the string object
 * @param untrimObj untrim string object
 */
export function objectValueTrim<T>(untrimObj: T | { [key: string]: string }): T {
  const trimObj = {} as T;

  Object.keys(untrimObj).forEach((key) => {
    trimObj[key] = untrimObj[key].toString().trim();
  });

  return trimObj;
}

/**
 * Function to compare 2 object
 * @param object1 First object to compare
 * @param object2 Second object to compare
 * @param excluded Array contains the fields that want to exclude
 */
export function shallowEqual(object1: { [key: string]: any }, object2: { [key: string]: any }, excluded: string[] = []): boolean {
  if (excluded.length) {
    excluded.forEach((key) => {
      delete object1[key];
      delete object2[key];
    });
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

/**
 * return a string has been capitalized the first letter
 * @param string uncapitalize string
 */
export function capitalizeFirstLetter(string: string) {
  return (string && string.charAt(0).toUpperCase() + string.slice(1)) || string;
}

export function lowercaseFirstLetter(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export function capitalizeFirstLetterOfEachWord(string: string) {
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

export function setDeep<T>(object: T, path: string, value: any): T {
  let newObject: T;
  const paths = path?.split(".") || [];
  if (paths.length) {
    if (paths.length > 1) {
      const pathKey = paths.shift();
      newObject = {
        ...object,
        [pathKey]: setDeep(object[pathKey], paths.join("."), value),
      };
    } else {
      newObject = {
        ...object,
        [paths.shift()]: value,
      };
    }
  }

  return newObject;
}

export function convertOffsetValue(value: string): number | string {
  const positiveNumberMaxLength = 2;
  const negativeNumberMaxLength = 3;

  if (value.charAt(0) === "-" && value.length === 1) {
    return "-";
  }

  if (value.charAt(0) === "-" && value.length >= 2) {
    const offsetNumber = value
      .slice(1, negativeNumberMaxLength)
      .toString()
      .split("")
      .map((char: string) => {
        return /\d/.test(char) ? char : "";
      })
      .join("");
    return Number(offsetNumber) * -1;
  }

  return Number(
    value
      .slice(0, positiveNumberMaxLength)
      .toString()
      .split("")
      .map((char: string, position: number) => {
        if (position === 0 && char === "0") {
          return "";
        } else {
          return /\d/.test(char) ? char : "";
        }
      })
      .join(""),
  );
}

export function getLastToken(token: any): string {
  return typeof token === "string" ? token.slice(token.lastIndexOf(".") + 1, token.length) : "";
}

export function getFriendlyClass(col: any, preName?: string): string {
  const preClass = preName ? preName : "tableCell";
  const last = getLastToken(col);
  if (last === "") {
    return preClass;
  }
  return preClass + "-" + last;
}

export function groupBy<T = any>(arrayObjects: T[], key: string) {
  return arrayObjects.reduce(function (result, currentObject) {
    const val = currentObject[key];
    result[val] = result[val] || [];
    result[val].push(currentObject);
    return result;
  }, {});
}

export function convertDateTime(value: string, dateFormat: string): string {
  const momentFormat = dayjs.utc(value).local();
  const result = momentFormat.format(dateFormat);

  return result;
}

export function convertDateTimeByLocationTimezone(datetime: string, locationTimezone: string, dateFormat: string) {
  return dayjs(datetime).tz(locationTimezone).format(dateFormat);
}

export function sprintf(format: string, ...args: unknown[]) {
  let i = 0;
  return format.replace(/%s/g, () => {
    return String(args[i++]);
  });
}

export function jsonToObject(data: string) {
  let result: any;

  try {
    result = JSON.parse(data);
  } catch (e) {
    return data;
  }

  Object.keys(result).map((key) => {
    if (typeof result[key] === "string") {
      result[key] = jsonToObject(result[key]);
    }
  });
  return result;
}

export function increaseBrightness(hex: string, percent: number) {
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (hex.length == 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  const r = parseInt(hex.substr(0, 2), 16),
    g = parseInt(hex.substr(2, 2), 16),
    b = parseInt(hex.substr(4, 2), 16);

  return (
    "#" +
    (0 | ((1 << 8) + r + ((256 - r) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + g + ((256 - g) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
  );
}

export function isEmail(value: string): boolean {
  const patternEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return !!value.match(patternEmail);
}

export function isEmailValidator(control: UntypedFormControl) {
  const EMAIL_REGEXP = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  if (control.value != "" && (control.value.length <= 3 || !EMAIL_REGEXP.test(control.value))) {
    return { email: true };
  }

  return null;
}

export function validateEmailAddress(control: UntypedFormControl) {
  const value = String(control.value || "");

  if (!control.value || value.length === 0) {
    return null;
  }

  const listEmail = value.split(/[\n\r\s;]+/g);
  const isValid = !listEmail.some((email) => email.length && !isEmail(email));
  return isValid ? null : { email: true };
}

export function separateEmailAddress(emailAddress: string): string {
  return emailAddress
    .split("\n")
    .map((row) => {
      return row
        .trim()
        .replace(/(\s+|\n|\r|\r\n)/g, ";")
        .split(";")
        .filter((address) => !!address)
        .join(";");
    })
    .join("\n");
}

/**
 * check and return client timezone if specified timezone is invalid
 * @param specifiedTimezone any
 * @returns client timezone or valid specified timezone
 */
export function validateTimezone(specifiedTimezone: any): string {
  let result = specifiedTimezone;
  try {
    dayjs().tz(specifiedTimezone);
  } catch (error) {
    result = confClientFormats.clientTimezone;
  }
  return result;
}

/**
 * Format Currency To String
 * @param value number
 * @param currency string
 * @returns string format by currency code
 */
export function formatCurrencyToString(value: number, currency: string) {
  const language = (navigator && navigator.language) || "en";
  const options = (!currency && { maximumFractionDigits: 2, minimumFractionDigits: 2 }) || {
    style: "currency",
    currency: currency,
    currencyDisplay: "code",
  };
  const toNumber = new Intl.NumberFormat(language, options).format(value);
  return toNumber.replace(`${currency} `, "").replace(` ${currency}`, "").replace(`${currency}`, "").replace("&nbsp;", "");
}

export function cloneObject(obj) {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = cloneObject(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = cloneObject(obj[attr]);
    }
    return copy;
  }

  return false;
}

export class StringUtilities {
  public static deleteAtIndex(str: string, index: number): string {
    return str.slice(0, index) + str.slice(index + 1);
  }
}

export class DatetimeUtilities {
  public static convertFormatMM_DDtoM_D(formatMM_DD: string): string {
    let result = formatMM_DD;
    ["D", "M"].forEach((keyFormat) => {
      result = StringUtilities.deleteAtIndex(result, result.indexOf(keyFormat));
    });
    return result;
  }

  public static getFormatMM_DDFromMM_DD_YYYY(dayMonthYearFormat: string): string {
    const indexFirstTextY = dayMonthYearFormat.indexOf("Y");
    if (indexFirstTextY >= 0) {
      let result = dayMonthYearFormat;

      while (result.indexOf("Y") !== -1) {
        result = result.replace("Y", "");
      }

      if (indexFirstTextY === 0) {
        result = result.slice(1);
      } else {
        result = StringUtilities.deleteAtIndex(result, indexFirstTextY - 1);
      }

      return result;
    } else {
      return "MM/DD";
    }
  }
}

export class ObjectUtilities {
  public static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
