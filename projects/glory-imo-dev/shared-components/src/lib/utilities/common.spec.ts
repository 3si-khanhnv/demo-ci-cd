// import { FormControl } from "@angular/forms";
import {
  // convertStringToNumber,
  // convertToString,
  // flattenObject,
  // noWhitespaceValidator,
  // objectValueTrim,
  sortObject,
  // shallowEqual,
  // capitalizeFirstLetter,
  // setDeep,
  // convertOffsetValue,
  // getLastToken,
  // getFriendlyClass,
  // groupBy,
  // convertDateTime,
  // isEqual,
  // lowercaseFirstLetter,
  // sprintf,
  // jsonToObject,
  // increaseBrightness,
  // isEmail,
  // validateTimezone,
  // formatCurrencyToString,
  // convertDateTimeByLocationTimezone,
  // cloneObject,
  // validateEmailAddress,
  // separateEmailAddress,
  // StringUtilities,
  // DatetimeUtilities,
  // capitalizeFirstLetterOfEachWord,
} from "./common";

import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
// import { confClientFormats } from "../services/config/config.service";
// import { Subject } from "rxjs";
dayjs.extend(utc);

describe("Common utilities", () => {
  describe(sortObject.name, () => {
    it("should return a sorted object by keys", () => {
      // arrange
      const unordered = {
        serviceDate: "2020-09-08",
        companyId: null,
        locationId: null,
        pickupCoin: false,
        id: 0,
        isEmergency: false,
        pickupNote: false,
        actualOrderQuantities: [],
      };
      const expectedSortedObject = {
        actualOrderQuantities: [],
        companyId: null,
        id: 0,
        isEmergency: false,
        locationId: null,
        pickupCoin: false,
        pickupNote: false,
        serviceDate: "2020-09-08",
      };
      // act
      const actual = sortObject(unordered);
      // assert
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectedSortedObject));
    });

    // it("should return a sorted object by keys recursively", () => {
    //   // arrange
    //   const unordered = {
    //     serviceDate: "2020-09-08",
    //     companyId: null,
    //     locationId: null,
    //     pickupCoin: false,
    //     id: 0,
    //     isEmergency: false,
    //     pickupNote: false,
    //     actualOrderQuantities: [],
    //     subObject: {
    //       a: true,
    //       c: true,
    //       b: true,
    //     },
    //   };
    //   const expectedSortedObject = {
    //     actualOrderQuantities: [],
    //     companyId: null,
    //     id: 0,
    //     isEmergency: false,
    //     locationId: null,
    //     pickupCoin: false,
    //     pickupNote: false,
    //     serviceDate: "2020-09-08",
    //     subObject: {
    //       a: true,
    //       b: true,
    //       c: true,
    //     },
    //   };
    //   // act
    //   const actual = sortObject(unordered);
    //   // assert
    //   expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectedSortedObject));
    // });

    // it("should return an empty object", () => {
    //   const unordered = undefined;
    //   const expectedSortedObject = {};
    //   // act
    //   const actual = sortObject(unordered);
    //   // assert
    //   expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectedSortedObject));
    // });

    // it("should return a sorted object with array contained", () => {
    //   const unordered = {
    //     a: [
    //       { a: true, c: true, b: true },
    //       { a: true, b: true, c: true },
    //     ],
    //   };
    //   const expectedSortedObject = {
    //     a: [
    //       { a: true, b: true, c: true },
    //       { a: true, b: true, c: true },
    //     ],
    //   };
    //   // act
    //   const actual = sortObject(unordered);
    //   // assert
    //   expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectedSortedObject));
    // });
  });

  // describe(flattenObject.name, () => {
  //   it("should return a flatten object by keys", () => {
  //     // arrange
  //     const unordered = {
  //       serviceDate: "2020-09-08",
  //       companyId: null,
  //       locationId: null,
  //       pickupCoin: false,
  //       id: 0,
  //       pickupNote: false,
  //       actualOrderQuantities: [],
  //     };

  //     const expectedSortedObject = {
  //       actualOrderQuantities: [],
  //       companyId: null,
  //       id: 0,
  //       isEmergency: false,
  //       locationId: null,
  //       pickupCoin: false,
  //       pickupNote: false,
  //       serviceDate: "2020-09-08",
  //     };

  //     // act
  //     const actual = sortObject(flattenObject({ a: unordered, b: { ...unordered, isEmergency: false } }));

  //     // assert
  //     expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectedSortedObject));
  //   });

  //   it("should return an empty object", () => {
  //     // arrange

  //     // act
  //     const actual = sortObject(flattenObject(undefined));

  //     // assert
  //     expect(JSON.stringify(actual)).toEqual(JSON.stringify({}));
  //   });
  // });

  // describe(convertStringToNumber.name, () => {
  //   it("should display 0 when input string character", () => {
  //     // arrange
  //     const inputValue = "e";
  //     const expected = 0;

  //     // act
  //     const actual = convertStringToNumber(inputValue);

  //     // assert
  //     expect(actual).toBe(expected);
  //   });

  //   it("should become number without zero at first", () => {
  //     // arrange
  //     const inputValue = "4";
  //     const expected = 4;

  //     // act
  //     const actual = convertStringToNumber(inputValue);

  //     // assert
  //     expect(actual).toBe(expected);
  //   });

  //   it("should become number without zero at first", () => {
  //     // arrange
  //     const inputValue = "09";
  //     const expected = 9;

  //     // act
  //     const actual = convertStringToNumber(inputValue);

  //     // assert
  //     expect(actual).toBe(expected);
  //   });
  // });

  // describe(convertToString.name, () => {
  //   it("should display string number when input number", () => {
  //     // arrange
  //     const inputValue = 1234;
  //     const expected = "1234";
  //     const isNoneZeroFirst = true;
  //     // act
  //     const actual = convertToString(inputValue, isNoneZeroFirst);

  //     // assert
  //     expect(actual).toBe(expected);
  //   });

  //   it("should display string number when input character", () => {
  //     // arrange
  //     const inputValue = "4a6b7c";
  //     const expected = "467";
  //     const isNoneZeroFirst = true;
  //     // act
  //     const actual = convertToString(inputValue, isNoneZeroFirst);

  //     // assert
  //     expect(actual).toBe(expected);
  //   });

  //   it("should remove 0 when first index of input is 0 and not input second param", () => {
  //     // arrange
  //     const inputValue = "09";
  //     const expected = "9";
  //     // act
  //     const actual = convertToString(inputValue);

  //     // assert
  //     expect(actual).toBe(expected);
  //   });
  // });

  // describe(noWhitespaceValidator.name, () => {
  //   const control = new FormControl("input");

  //   it("should return null when input is string", () => {
  //     // arrange
  //     control.setValue("1");
  //     // actual
  //     const act = noWhitespaceValidator();
  //     // assert
  //     expect(act(control)).toBeNull();
  //   });

  //   it("should return invalid message when input is undefined", () => {
  //     // arrange
  //     control.setValue(undefined);
  //     // actual
  //     const act = noWhitespaceValidator();
  //     // assert
  //     expect(act(control)).not.toBeNull();
  //   });
  // });

  // describe(objectValueTrim.name, () => {
  //   it("should return trimed object", () => {
  //     // arrange
  //     const untrimObj = {
  //       field1: "ABC    ",
  //       field2: "   DEF    ",
  //       field3: "   XYZ",
  //     };
  //     const expected = {
  //       field1: "ABC",
  //       field2: "DEF",
  //       field3: "XYZ",
  //     };

  //     // act
  //     const actual = objectValueTrim(untrimObj);

  //     // assert
  //     expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
  //   });
  // });

  // describe(shallowEqual.name, () => {
  //   it("should return true if 2 objects are equal", () => {
  //     // arrange
  //     const object1 = {
  //       field1: "ABC",
  //       field2: "DEF",
  //       field3: "XYZ",
  //       checked: true,
  //     };
  //     const object2 = {
  //       field1: "ABC",
  //       field2: "DEF",
  //       field3: "XYZ",
  //       checked: true,
  //     };
  //     const excluded = ["checked"];

  //     // act
  //     const actual = shallowEqual(object1, object2, excluded);

  //     // assert
  //     expect(actual).toBe(true);
  //   });

  //   it("should return false if the 2 objects are not of equal length", () => {
  //     // arrange
  //     const object1 = {
  //       field1: "ABC",
  //       field2: "DEF",
  //       field3: "XYZ",
  //     };
  //     const object2 = {
  //       field1: "ABC",
  //       field2: "DEF",
  //     };
  //     const excluded = [];

  //     // act
  //     const actual = shallowEqual(object1, object2, excluded);

  //     // assert
  //     expect(actual).toBe(false);
  //   });

  //   it("should return false when 2 objects have the same keys but different from values", () => {
  //     // arrange
  //     const object1 = {
  //       field1: "ABC",
  //       field2: "DEF",
  //       field3: "XYZ",
  //     };
  //     const object2 = {
  //       field1: "ABC",
  //       field2: "XYZ",
  //       field3: "DEF",
  //     };

  //     // act
  //     const actual = shallowEqual(object1, object2);

  //     // assert
  //     expect(actual).toBe(false);
  //   });
  // });

  // describe(capitalizeFirstLetter.name, () => {
  //   it("should return a string has been capitalized the first letter", () => {
  //     // arrange
  //     const string = "foo";
  //     const capitalizedString = "Foo";

  //     // act
  //     const actual = capitalizeFirstLetter(string);

  //     // assert
  //     expect(actual).toEqual(capitalizedString);
  //   });
  //   it("should be pass param null", () => {
  //     // arrange
  //     const string = null;
  //     const capitalizedString = null;

  //     // act
  //     const actual = capitalizeFirstLetter(string);

  //     // assert
  //     expect(actual).toEqual(capitalizedString);
  //   });
  // });

  // describe(lowercaseFirstLetter.name, () => {
  //   it("should return a string has been lowercase the first letter", () => {
  //     // arrange
  //     const string = "FOo";
  //     const capitalizedString = "fOo";

  //     // act
  //     const actual = lowercaseFirstLetter(string);

  //     // assert
  //     expect(actual).toEqual(capitalizedString);
  //   });
  // });

  // describe(capitalizeFirstLetterOfEachWord.name, () => {
  //   it("should return a string has been capitalized the first letter", () => {
  //     // arrange
  //     const string = "foo fighter";
  //     const capitalizedString = "Foo Fighter";

  //     // act
  //     const actual = capitalizeFirstLetterOfEachWord(string);

  //     // assert
  //     expect(actual).toEqual(capitalizedString);
  //   });
  // });

  // describe(setDeep.name, () => {
  //   it("should return value", () => {
  //     // arrange
  //     const string = "foo";
  //     const path = "path.common";
  //     const value = "value";
  //     const result = {
  //       path: {
  //         common: "value",
  //       },
  //       "0": "f",
  //       "1": "o",
  //       "2": "o",
  //     };
  //     // act
  //     const actual = setDeep<string>(string, path, value);

  //     // assert
  //     expect(actual).toEqual(result);
  //   });

  //   it("should return undefined when split path undefined", () => {
  //     // arrange
  //     const string = "foo";
  //     const path = undefined;
  //     const value = "value";
  //     // act
  //     const actual = setDeep<string>(string, path, value);

  //     // assert
  //     expect(actual).toEqual(undefined);
  //   });
  // });

  // describe(convertOffsetValue.name, () => {
  //   it("should convert when input is '-' ", () => {
  //     // arrange
  //     const value = "-";
  //     // act
  //     const actual = convertOffsetValue(value);

  //     // assert
  //     expect(actual).toEqual("-");
  //   });

  //   it("should convert when input is empty", () => {
  //     // arrange
  //     const value = "";
  //     // act
  //     const actual = convertOffsetValue(value);

  //     // assert
  //     expect(actual).toEqual(0);
  //   });

  //   it("should convert when input are first character is '-' and length >= 2 ", () => {
  //     // arrange
  //     const value = "-a2aa";
  //     // act
  //     const actual = convertOffsetValue(value);

  //     // assert
  //     expect(actual).toEqual(-2);
  //   });

  //   it("should convert when first character is not '-' ", () => {
  //     // arrange
  //     const value = "1a1";
  //     // act
  //     const actual = convertOffsetValue(value);

  //     // assert
  //     expect(actual).toEqual(1);
  //   });

  //   it("should convert when input value are 0", () => {
  //     // arrange
  //     const value = "0";
  //     // act
  //     const actual = convertOffsetValue(value);

  //     // assert
  //     expect(actual).toEqual(0);
  //   });
  // });

  // describe(getLastToken.name, () => {
  //   const testCase = [
  //     { title: "undefined", input: undefined, expected: "" },
  //     { title: "object", input: { name: "LastToken" }, expected: "" },
  //     { title: "array", input: ["LastToken"], expected: "" },
  //     { title: "empty", input: "", expected: "" },
  //     { title: "lastToken", input: "lastToken", expected: "lastToken" },
  //     { title: "token has period", input: "colName.tableName.lastToken", expected: "lastToken" },
  //   ];
  //   testCase.forEach((c) => {
  //     it(`should return ${c.expected} when ${c.title}`, () => {
  //       // act
  //       const actual = getLastToken(c.input);
  //       // assert
  //       expect(actual).toEqual(c.expected);
  //     });
  //   });
  // });

  // describe(getFriendlyClass.name, () => {
  //   const defaultName = "tableCell";
  //   const testCase = [
  //     { title: "should return defaultName", input: { col: undefined, preName: undefined }, expected: defaultName },
  //     { title: "should return defaultName", input: { col: {}, preName: undefined }, expected: defaultName },
  //     {
  //       title: "should return with preDefaultName",
  //       input: { col: "lastToken", preName: undefined },
  //       expected: `${defaultName}-lastToken`,
  //     },
  //     {
  //       title: "should return last token with with preDefaultName",
  //       input: { col: "colName.tableName.lastToken", preName: undefined },
  //       expected: `${defaultName}-lastToken`,
  //     },
  //     { title: "should return preName", input: { col: undefined, preName: "preName" }, expected: "preName" },
  //     { title: "should return preName", input: { col: {}, preName: "preName" }, expected: "preName" },
  //     {
  //       title: "should return with preName",
  //       input: { col: "lastToken", preName: "preName" },
  //       expected: "preName-lastToken",
  //     },
  //     {
  //       title: "should return last token with with preName",
  //       input: { col: "colName.tableName.lastToken", preName: "preName" },
  //       expected: "preName-lastToken",
  //     },
  //   ];
  //   testCase.forEach((c) => {
  //     it(`${c.title}`, () => {
  //       // act
  //       const actual = getFriendlyClass(c.input.col, c.input.preName);
  //       // assert
  //       expect(actual).toEqual(c.expected);
  //     });
  //   });
  // });

  // describe(groupBy.name, () => {
  //   it("group by key", () => {
  //     // arrange
  //     const arrayObjects = [
  //       {
  //         transactionSubType: "cashOut",
  //         subTypeValue: 1,
  //       },
  //     ];

  //     const key = "transactionSubType";
  //     // act
  //     const actual = groupBy(arrayObjects, key);
  //     // assert
  //     expect(actual).toEqual({ cashOut: [{ subTypeValue: 1, transactionSubType: "cashOut" }] });
  //   });
  // });

  // describe(convertDateTime.name, () => {
  //   it("convert date time format", () => {
  //     // arrange
  //     const str = "2021-07-14T04:00:48.81855";
  //     const dateFormat = "MM/DD/YYYY HH:mm";
  //     const momentFormat = dayjs.utc(str).local();
  //     momentFormat.format(dateFormat);
  //     const expected = momentFormat.format(dateFormat);
  //     // act
  //     const act = convertDateTime(str, dateFormat);

  //     // assert
  //     expect(act).toEqual(expected);
  //   });
  // });

  // describe(convertDateTimeByLocationTimezone.name, () => {
  //   it("convert date time format by location timezone", () => {
  //     // arrange
  //     const str = "2021-07-14T04:00:48.81855";
  //     const dateFormat = "MM/DD/YYYY HH:mm";
  //     const expected = dayjs(str).tz("Asia/Saigon").format(dateFormat);
  //     // act
  //     const act = convertDateTimeByLocationTimezone(str, "Asia/Saigon", dateFormat);

  //     // assert
  //     expect(act).toEqual(expected);
  //   });
  // });

  // describe(isEqual.name, () => {
  //   it(`should return boolean after compare`, () => {
  //     // arrange
  //     const expected = true;

  //     // act
  //     const act = isEqual({}, {});

  //     // assert
  //     expect(act).toBe(expected);
  //   });
  // });

  // describe(sprintf.name, () => {
  //   it(`should replace string with arg`, () => {
  //     // arrange
  //     const expected = "   a, s";
  //     // act
  //     const act = sprintf("   %s, %s", "a", "s");
  //     // assert
  //     expect(act).toBe(expected);
  //   });
  // });

  // describe(jsonToObject.name, () => {
  //   it(`should return beautify object`, () => {
  //     // arrange
  //     const expected = { a: "a", b: { c: "c" } };
  //     const data = JSON.stringify({ a: "a", b: JSON.stringify({ c: "c" }) });
  //     // act
  //     const act = jsonToObject(data);
  //     // assert
  //     expect(act).toEqual(expected);
  //   });

  //   it(`should return back data not string`, () => {
  //     // arrange
  //     const expected = { a: "a", b: { c: 1 } };
  //     const data = JSON.stringify({ a: "a", b: JSON.stringify({ c: 1 }) }) as any;
  //     // act
  //     const act = jsonToObject(data);
  //     // assert
  //     expect(act).toEqual(expected);
  //   });
  // });

  // describe(increaseBrightness.name, () => {
  //   it("should increase brightness", () => {
  //     // arrange
  //     const hex = "#E53935";
  //     const percent = 0;
  //     const expected = "#e53935";

  //     // act
  //     const act = increaseBrightness(hex, percent);

  //     // assert
  //     expect(act).toEqual(expected);
  //   });

  //   it("should increase brightness when hex length equal 3", () => {
  //     // arrange
  //     const hex = "#FFF";
  //     const percent = 0;
  //     const expected = "#ffffff";

  //     // act
  //     const act = increaseBrightness(hex, percent);

  //     // assert
  //     expect(act).toEqual(expected);
  //   });
  // });

  // describe(isEmail.name, () => {
  //   it("should return true is email", () => {
  //     // arrange
  //     const data = "admin@gmai.com";

  //     // act
  //     const act = isEmail(data);

  //     // assert
  //     expect(act).toEqual(true);
  //   });

  //   it("should return false is not email", () => {
  //     // arrange
  //     const data = "admingmai.com";

  //     // act
  //     const act = isEmail(data);

  //     // assert
  //     expect(act).toEqual(false);
  //   });
  // });

  // describe(validateTimezone.name, () => {
  //   it("should return specified timezone if it is valid", () => {
  //     // arrange
  //     const specified = "Asia/Tokyo";

  //     // actual
  //     const act = validateTimezone(specified);

  //     // assert
  //     expect(act).toEqual(specified);
  //   });

  //   it("should return client timezone if it is invalid", () => {
  //     // arrange
  //     const specified = "";
  //     const clientTimezone = confClientFormats.clientTimezone;

  //     // actual
  //     const act = validateTimezone(specified);

  //     // assert
  //     expect(act).toEqual(clientTimezone);
  //   });
  // });

  // describe(formatCurrencyToString.name, () => {
  //   it("should call function formatCurrencyToString case language undefined", () => {
  //     Object.defineProperty(window, "navigator", {
  //       value: { language: undefined },
  //       writable: true,
  //     });
  //     //act
  //     const result = formatCurrencyToString(123, "USD");
  //     //assert
  //     expect(result).toEqual("123.00");
  //   });
  //   it("should call function formatCurrencyToString case currency not value", () => {
  //     const result = formatCurrencyToString(123.12345, "");
  //     //assert
  //     expect(result).toEqual("123.12");
  //   });
  // });

  // describe(validateEmailAddress.name, () => {
  //   it("should return true is email", () => {
  //     // arrange
  //     const control = new FormControl<{ value: string }>({ value: "" });

  //     // act
  //     const act = validateEmailAddress(control);

  //     // assert
  //     expect(act).toEqual({ email: true });
  //   });

  //   it("should return false is not email", () => {
  //     // arrange
  //     const control = new FormControl();

  //     // act
  //     const act = validateEmailAddress(control);

  //     // assert
  //     expect(act).toEqual(null);
  //   });
  // });

  // describe(separateEmailAddress.name, () => {
  //   it("should return true is email", () => {
  //     // arrange
  //     const data = "admin@gmai.com";

  //     // act
  //     const act = separateEmailAddress(data);
  //     const expected = "admin@gmai.com";

  //     // assert
  //     expect(act).toEqual(expected);
  //   });
  // });

  // describe(cloneObject.name, () => {
  //   it("should be cloneObject data instance Date", () => {
  //     const outPut = cloneObject(new Date("2021/05/05"));
  //     const toDay = new Date();
  //     const dataExpect = new Date(toDay.setTime(new Date("2021/05/05").getTime()));
  //     expect(outPut).toEqual(dataExpect);
  //   });

  //   it("should be cloneObject data instance Arry", () => {
  //     const outPut = cloneObject(["100"]);
  //     const dataExpect = ["100"];
  //     expect(outPut).toEqual(dataExpect);
  //   });

  //   it("should be cloneObject data instance Object", () => {
  //     const a = new Subject();
  //     const outPut = cloneObject(a);
  //     expect(outPut).toEqual(a);
  //   });
  //   it("should be cloneObject data instance Object", () => {
  //     const outPut = cloneObject(new Blob(["test"]));
  //     expect(outPut).toBe(false);
  //   });
  // });

  // describe(wrapTextDisplay.name, () => {
  //   it("should return wrapTextField base on dynamic create WrapTextComponent", () => {
  //     // arrange
  //     const inputText = "Inventory.All.Test";
  //     const expected = {
  //       dynamicCreateComponent: true,
  //       componentData: {
  //         component: WrapTextComponent,
  //         inputs: {
  //           text: inputText,
  //         },
  //         outputs: {},
  //       },
  //     };

  //     // act
  //     const act = wrapTextDisplay(inputText);

  //     // assert
  //     expect(act).toEqual(expected);
  //   });
  // });

  // describe("StringUtilities", () => {
  //   describe("deleteAtIndex", () => {
  //     it("should delete first letter in string", () => {
  //       // arrange
  //       const str = "123456";
  //       const expected = "23456";

  //       // act
  //       const act = StringUtilities.deleteAtIndex(str, 0);

  //       // assert
  //       expect(act).toEqual(expected);
  //     });

  //     it("should delete last letter in string", () => {
  //       // arrange
  //       const str = "123456";
  //       const expected = "12345";

  //       // act
  //       const act = StringUtilities.deleteAtIndex(str, str.length - 1);

  //       // assert
  //       expect(act).toEqual(expected);
  //     });

  //     it("should delete a letter in string", () => {
  //       // arrange
  //       const str = "123456";
  //       const expected = "12356";

  //       // act
  //       const act = StringUtilities.deleteAtIndex(str, 3);

  //       // assert
  //       expect(act).toEqual(expected);
  //     });
  //   });
  // });

  // describe("DatetimeUtilities", () => {
  //   describe("getFormatMM_DDFromMM_DD_YYYY", () => {
  //     [
  //       {
  //         dayMonthYearFormat: "DD/MM/YYYY",
  //         expected: "DD/MM",
  //       },
  //       {
  //         dayMonthYearFormat: "MM/DD/YYYY",
  //         expected: "MM/DD",
  //       },
  //       {
  //         dayMonthYearFormat: "YYYY/MM/DD",
  //         expected: "MM/DD",
  //       },
  //       {
  //         dayMonthYearFormat: "YYYY/DD/MM",
  //         expected: "DD/MM",
  //       },
  //       {
  //         dayMonthYearFormat: "MM/YYYY/DD",
  //         expected: "MM/DD",
  //       },
  //       {
  //         dayMonthYearFormat: "DD-MM-YYYY",
  //         expected: "DD-MM",
  //       },
  //       {
  //         dayMonthYearFormat: "MM-DD-YYYY",
  //         expected: "MM-DD",
  //       },
  //       {
  //         dayMonthYearFormat: "YYYY-MM-DD",
  //         expected: "MM-DD",
  //       },
  //       {
  //         dayMonthYearFormat: "YYYY-DD-MM",
  //         expected: "DD-MM",
  //       },
  //       {
  //         dayMonthYearFormat: "MM-YYYY-DD",
  //         expected: "MM-DD",
  //       },
  //     ].forEach((testcase) =>
  //       it(`should get format day-month of ${testcase.dayMonthYearFormat}`, () => {
  //         // arrange

  //         // act
  //         const act = DatetimeUtilities.getFormatMM_DDFromMM_DD_YYYY(testcase.dayMonthYearFormat);

  //         // assert
  //         expect(act).toEqual(testcase.expected);
  //       }),
  //     );
  //   });

  //   describe("convertFormatMM_DDtoM_D", () => {
  //     [
  //       {
  //         formatMM_DD: "MM/DD",
  //         expected: "M/D",
  //       },
  //       {
  //         formatMM_DD: "DD/MM",
  //         expected: "D/M",
  //       },
  //       {
  //         formatMM_DD: "MM-DD",
  //         expected: "M-D",
  //       },
  //       {
  //         formatMM_DD: "DD-MM",
  //         expected: "D-M",
  //       },
  //     ].forEach((testcase) =>
  //       it(`should get convert format MM_DD to M_D of ${testcase.formatMM_DD}`, () => {
  //         // arrange

  //         // act
  //         const act = DatetimeUtilities.convertFormatMM_DDtoM_D(testcase.formatMM_DD);

  //         // assert
  //         expect(act).toEqual(testcase.expected);
  //       }),
  //     );
  //   });
  // });
});
