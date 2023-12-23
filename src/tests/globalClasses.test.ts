import { gc, registerModule } from "../../index";

import style from "~/tests/helpers/style.css";

import { describe, expect, test } from "@jest/globals";

describe("globalClasses", () => {
  test("is a function", () => {
    expect(typeof gc).toBe("function");
  });

  registerModule("style", style);

  test("returns appropriate values", () => {
    expect(gc("style:classA")).toBe("_classA");
    expect(gc("style:classB")).toBe("_classB");
  });

  test("returns empty strings for any invalid input", () => {
    expect(gc()).toBe("");
    // @ts-expect-error
    expect(gc("")).toBe("");
    // @ts-expect-error
    expect(gc("a")).toBe("");
    // @ts-expect-error
    expect(gc(null)).toBe("");
    // @ts-expect-error
    expect(gc(123)).toBe("");
    // @ts-expect-error
    expect(gc({})).toBe("");
    // @ts-expect-error
    expect(gc(() => undefined)).toBe("");
  });

  test("allows access both as a function and as an object", () => {
    expect(gc("style:classA")).toBe(gc["style:classA"]);
    expect(gc("style:classB")).toBe(gc["style:classB"]);
  });

  test("supports multiple inputs", () => {
    expect(gc("style:classA", "style:classB")).toBe("_classA _classB");
    expect(gc("style:classA", "style:classB", "style:classC")).toBe(
      "_classA _classB _classC"
    );
    expect(
      gc("style:classA", "style:classB", "style:classC", "style:classD")
    ).toBe("_classA _classB _classC _classD");
    expect(
      gc(
        "style:classA",
        "style:classB",
        "style:classC",
        "style:classD",
        "style:classE"
      )
    ).toBe("_classA _classB _classC _classD _classE");
  });
});
