// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.datetime.prototype.with
features: [Symbol.species]
---*/

function CustomError() {}

const datetime = Temporal.DateTime.from({ year: 2000, month: 5, day: 2, minute: 34, second: 56, millisecond: 987, microsecond: 654, nanosecond: 321 });
datetime.constructor = {
  get [Symbol.species]() {
    throw new CustomError();
  },
};

assert.throws(CustomError, () => datetime.with({ nanosecond: 1 }));
