import { expect, it, describe } from "vitest";
import { assert } from "./assert";

describe("assert", () => {
  it("should throw an error when condition is false", () => {
    expect(() => {
      assert(false, "This is an error message");
    }).toThrow("This is an error message");
  });

  it("should not throw an error when condition is true", () => {
    expect(() => {
      assert(true, "This should not throw");
    }).not.toThrow();
  });
});
