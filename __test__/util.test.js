import {
  toTitleCase,
  envName,
  matchPatterns,
  parseDynamicList,
} from "../src/util.js";
import { describe, expect, jest, test } from "@jest/globals";

describe("toTitleCase", () => {
  test("should convert string to title case", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
    expect(toTitleCase("TEST CASE")).toBe("TEST CASE");
  });
});

describe("envName", () => {
  test("should return default name if exists", () => {
    const defaultNames = { dev: "Development" };
    jest.mock("../src/default_names.js", () => defaultNames);
    expect(envName("dev")).toBe("Development");
  });
  test("should return title-cased environment name if not in defaults", () => {
    expect(envName("staging")).toBe("Staging");
  });
});

describe("matchPatterns", () => {
  test("should return false if globs are undefined", () => {
    expect(matchPatterns("test", undefined)).toBe(false);
  });
  test("should match glob using minimatch", () => {
    expect(matchPatterns("main", "main")).toBe(true);
    expect(matchPatterns("dev", "main")).toBe(false);
  });
  test("should match globs using minimatch", () => {
    expect(matchPatterns("main", ["main"])).toBe(true);
    expect(matchPatterns("dev", ["main"])).toBe(false);
  });
  const mainRegexp = "/m(ain|aster)/";
  test("should match pattern using minimatch", () => {
    expect(matchPatterns("main", mainRegexp)).toBe(true);
    expect(matchPatterns("dev", mainRegexp)).toBe(false);
  });
  test("should match patterns using minimatch", () => {
    expect(matchPatterns("main", [mainRegexp])).toBe(true);
    expect(matchPatterns("dev", [mainRegexp])).toBe(false);
  });
});

describe("parseDynamicList", () => {
  test("should parse YAML into an array", () => {
    expect(parseDynamicList("- a\n- b")).toEqual(["a", "b"]);
    expect(parseDynamicList("[a, b]")).toEqual(["a", "b"]);
  });
  test("should parse a string into an array using delimiters", () => {
    expect(parseDynamicList("a,b;c|d\ne")).toEqual(["a", "b", "c", "d", "e"]);
  });
});
