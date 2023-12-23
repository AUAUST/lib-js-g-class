import {
  registerModule,
  dropModule,
  type RegisteredCSSModules,
} from "../../index";
import { gc } from "~/globalClasses";

import style from "~/tests/helpers/style.css";

import { describe, expect, test } from "@jest/globals";

declare module "../../index" {
  interface RegisteredCSSModules {
    // This one is registered.
    // It's used to test the runtime extension.
    style: typeof style;

    // This one is never registered, but is typed.
    // It's used to test the type-level extension.
    fake: typeof style;

    // Setting this to `true` must allow any class to be used within the namespace.
    // It's a way to allow the namespace to be used in cases where we can't actually type the classes.
    unknown: true;
  }
}

describe("globalClassesRegistry", () => {
  describe("registerModule", () => {
    test("is a function", () => {
      expect(typeof registerModule).toBe("function");
    });

    test("throws when not enough arguments are provided", () => {
      // @ts-expect-error
      expect(() => registerModule()).toThrow();
      // @ts-expect-error
      expect(() => registerModule("style")).toThrow();
      // @ts-expect-error
      expect(() => registerModule(null, style)).toThrow();
    });

    test("correctly extends on the type level", () => {
      /**
       * The `fake` namespace is never registered, but is typed.
       * It should be allowed; `foo` and `foo:bar` should be disallowed.
       */

      expect(typeof gc["fake:classA"]).toBe("undefined");
      expect(typeof gc["fake:classB"]).toBe("undefined");

      // @ts-expect-error
      expect(typeof gc["foo"]).toBe("undefined");
      // @ts-expect-error
      expect(typeof gc["foo:bar"]).toBe("undefined");
    });

    test("allows to register a namespace without classes with `true`", () => {
      expect(typeof gc["unknown:a"]).toBe("undefined");
    });

    test("is able to register a namespace", () => {
      expect(registerModule("style", style)).toBe(true);
    });

    test("does add the classes to the globalClasses object", () => {
      expect(gc["style:classA"]).toBe("_classA");
      expect(gc["style:classB"]).toBe("_classB");
      expect(gc["style:classC"]).toBe("_classC");
      expect(gc["style:classD"]).toBe("_classD");
      expect(gc["style:classE"]).toBe("_classE");
    });
  });

  describe("dropModule", () => {
    test("is a function", () => {
      expect(typeof dropModule).toBe("function");
    });

    test("ignores values that can't be used as namespaces", () => {
      // @ts-expect-error
      expect(dropModule()).toBe(false);
      // @ts-expect-error
      expect(dropModule(null)).toBe(false);
      // @ts-expect-error
      expect(dropModule(123)).toBe(false);
      // @ts-expect-error
      expect(dropModule({})).toBe(false);
      // @ts-expect-error
      expect(dropModule(() => undefined)).toBe(false);
    });

    registerModule("style", style);

    test("returns false if the namespace is not registered", () => {
      expect(dropModule("fake")).toBe(false);
    });

    test("returns true if the namespace is registered", () => {
      expect(dropModule("style")).toBe(true);
    });

    test("actually removes the classes from the globalClasses object", () => {
      expect(typeof gc["style:classA"]).toBe("undefined");
      expect(typeof gc["style:classB"]).toBe("undefined");
      expect(typeof gc["style:classC"]).toBe("undefined");
      expect(typeof gc["style:classD"]).toBe("undefined");
      expect(typeof gc["style:classE"]).toBe("undefined");
    });
  });
});
