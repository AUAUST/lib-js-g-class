import * as gClass from "../../index";

import { describe, expect, test } from "@jest/globals";

describe("Index file", () => {
  test("exports all required functions", () => {
    const expectedExports: Array<keyof typeof gClass> = [
      "cl",
      "classList",
      "gc",
      "globalClasses",
      "registerModule",
      "dropModule",
      "getNamespacedClasses",
      "cn",
      "className",
    ];

    for (const exportName of expectedExports) {
      expect(typeof gClass[exportName]).toBe("function");
    }
  });
});
