import { cl } from "../../index";

import { describe, expect, test } from "@jest/globals";

describe("classList", () => {
  test("is a function", () => {
    expect(typeof cl).toBe("function");
  });

  test("returns a string even without input", () => {
    expect(typeof cl()).toBe("string");
    expect(typeof cl(undefined)).toBe("string");
    expect(typeof cl(false)).toBe("string");
    expect(typeof cl([])).toBe("string");
    expect(typeof cl(() => undefined)).toBe("string");
  });

  test("ignores falsy values", () => {
    expect(cl(undefined)).toBe("");
    expect(cl(false)).toBe("");
    expect(cl("")).toBe("");
    expect(cl(null)).toBe("");
  });

  test("accepts multiple arguments", () => {
    expect(cl("class1", "class2")).toBe("class1 class2");
  });

  test("accepts arrays", () => {
    expect(cl(["class1", "class2"])).toBe("class1 class2");
  });

  test("executes functions", () => {
    expect(cl(() => "class1")).toBe("class1");
  });

  test("accepts objects", () => {
    expect(cl({ class1: true, class2: false })).toBe("class1");
  });

  test("accepts nested arrays", () => {
    expect(cl(["class1", ["class2", "class3"]])).toBe("class1 class2 class3");
  });

  test("accepts nested functions", () => {
    expect(cl(() => ["class1", () => "class2"])).toBe("class1 class2");
  });

  test("combines input types", () => {
    expect(
      cl(
        "class1",
        ["class2", "class3"],
        () => ["class4", () => "class5"],
        { class6: true, class7: false },
        undefined,
        false,
        true && "class8",
        false && "class9",
        [[[() => [() => ["class10", () => "class11"]]]]],
        () => undefined
      )
    ).toBe("class1 class2 class3 class4 class5 class6 class8 class10 class11");
  });
});
