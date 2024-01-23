import { getNamespacedClasses, className } from "../../index";

import { describe, expect, test } from "@jest/globals";

describe("Utils", () => {
  describe("className", () => {
    test("is a function", () => {
      expect(typeof className).toBe("function");
    });

    test("returns a string even without input", () => {
      // @ts-expect-error
      expect(typeof className()).toBe("string");
      expect(typeof className(undefined)).toBe("string");
      expect(typeof className(false)).toBe("string");
      expect(typeof className([])).toBe("string");
      expect(typeof className(() => undefined)).toBe("string");
    });

    test("ignores falsy values", () => {
      expect(className(undefined)).toBe("");
      expect(className("")).toBe("");
      expect(className(null)).toBe("");
    });

    test("ignores non-classable values", () => {
      // @ts-expect-error
      expect(className(NaN)).toBe("");
      // @ts-expect-error
      expect(className(Infinity)).toBe("");
      // @ts-expect-error
      expect(className(0)).toBe("");
      // @ts-expect-error
      expect(className(123)).toBe("");

      expect(className(true)).toBe("");
      expect(className(false)).toBe("");
    });

    test("handles objects", () => {
      expect(
        className({
          class1: true,
          class2: false,
          class3: undefined,
          class4: null,
          class5: 0,
          class6: 123,
        })
      ).toBe("class1 class6");
    });
  });

  describe("getNamespacedClasses", () => {
    test("is a function", () => {
      expect(typeof getNamespacedClasses).toBe("function");
    });

    const resultWithNoInput = getNamespacedClasses("namespace", {});

    test("returns an array", () => {
      expect(Array.isArray(resultWithNoInput)).toBe(true);
    });

    test("returns an empty array if no classes are found", () => {
      expect(resultWithNoInput).toEqual([]);
    });

    test("returns an array of tuples where the first value is the class name and the second value is the class value", () => {
      expect(
        getNamespacedClasses("namespace", {
          class1: "_class1",
          class2: "_class2",
        })
      ).toEqual([
        ["namespace:class1", "_class1"],
        ["namespace:class2", "_class2"],
      ]);
    });
  });
});
