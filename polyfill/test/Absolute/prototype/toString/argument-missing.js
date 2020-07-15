// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.absolute.prototype.tostring
includes: [compareArray.js]
---*/

const actual = [];
const expected = [
  "get Temporal.TimeZone.from",
  "call Temporal.TimeZone.from",
  "get timeZone.getDateTimeFor",
  "call timeZone.getDateTimeFor",
  "get timeZone.toString",
  "call timeZone.toString",
  "get name.toString",
  "call name.toString",
  "get timeZone.getOffsetStringFor",
  "call timeZone.getOffsetStringFor",
  "get offset.toString",
  "call offset.toString",
];

const absolute = Temporal.Absolute.from("1975-02-02T14:25:36.123456Z");
const timeZone = new Proxy({
  name: "Custom/TimeZone",

  toString() {
    actual.push("call timeZone.toString");
    return {
      get toString() {
        actual.push("get name.toString");
        return function() {
          actual.push("call name.toString");
          return "Custom/TimeZone";
        };
      }
    };
  },

  getOffsetStringFor() {
    actual.push("call timeZone.getOffsetStringFor");
    return {
      get toString() {
        actual.push("get offset.toString");
        return function() {
          actual.push("call offset.toString");
          return "+02:59";
        };
      }
    };
  },

  getDateTimeFor() {
    actual.push("call timeZone.getDateTimeFor");
    return Temporal.DateTime.from("1963-07-02T12:00:00.987654321");
  },
}, {
  has(target, property) {
    actual.push(`has timeZone.${property}`);
    return property in target;
  },
  get(target, property) {
    actual.push(`get timeZone.${property}`);
    return target[property];
  },
});

Object.defineProperty(Temporal.TimeZone, "from", {
  get() {
    actual.push("get Temporal.TimeZone.from");
    return function(argument) {
      actual.push("call Temporal.TimeZone.from");
      assert.sameValue(argument, "UTC");
      return timeZone;
    };
  },
});

assert.sameValue(absolute.toString(), "1963-07-02T12:00:00.987654321+02:59[Custom/TimeZone]");
assert.compareArray(actual, expected);
