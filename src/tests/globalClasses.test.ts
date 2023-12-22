import { gc } from "~/globalClasses";

import { describe, expect, test } from "@jest/globals";

describe("globalClasses", () => {
  test("is a function", () => {
    expect(typeof gc).toBe("function");
  });
});
