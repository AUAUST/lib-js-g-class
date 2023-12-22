import { cl } from "~/classList";

import { describe, expect, test } from "@jest/globals";

describe("classList", () => {
  test("is a function", () => {
    expect(typeof cl).toBe("function");
  });
});
