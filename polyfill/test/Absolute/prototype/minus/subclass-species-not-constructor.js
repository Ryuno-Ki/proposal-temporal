// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.absolute.prototype.minus
---*/

function check(value, description) {
  const absolute = Temporal.Absolute.fromEpochNanoseconds(10n);
  absolute.constructor = {
    [Symbol.species]: value,
  };
  assert.throws(TypeError, () => absolute.minus({ nanoseconds: 1 }), description);
}

check(true, "true");
check("test", "string");
check(Symbol(), "Symbol");
check(7, "number");
check(7n, "bigint");
check({}, "plain object");
