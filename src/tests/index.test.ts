import defaultCl, * as gClass from "../../index";

import { describe, expect, test } from "@jest/globals";

describe("Index file", () => {
  test("exports all required functions", () => {
    const expectedExports: Array<keyof typeof gClass> = [
      "default",
      "cl",
      "classList",
      "gc",
      "globalClasses",
      "registerModule",
      "dropModule",
      "getNamespacedClasses",
      "toClassName",
    ];

    for (const exportName of expectedExports) {
      expect(typeof gClass[exportName]).toBe("function");
    }
  });

  test("exports `cl` as default", () => {
    expect(typeof defaultCl).toBe("function");
    expect(defaultCl).toBe(gClass.cl);
    expect(gClass.default).toBe(gClass.cl);
  });
});
