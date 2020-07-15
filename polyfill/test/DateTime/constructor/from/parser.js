// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Temporal.DateTime.from accepts a custom timezone that starts with "c".
esid: sec-temporal.datetime.from
---*/

Temporal.DateTime.from("2020-01-01T00:00:00+01:00[Custom]");
