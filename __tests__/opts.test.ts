import { describe, expect, test } from "@jest/globals";
import { parseOpts, stringToArray, validateOpts } from "../src/opts";


describe("validateOpts", () => {
    test("should return message when there's no key", () => {
        const args: string[] = ["--path", "a"];
        const opts = parseOpts(args);
        expect(validateOpts(opts)).toBe("'key' must be set!");
    });

    test("should return message when there's no path", () => {
        const args: string[] = ["--key", "a"];
        const opts = parseOpts(args);
        expect(validateOpts(opts)).toBe("'paths' must be set!");
    });

    test("should return null when there's key and path", () => {
        const args: string[] = ["--key", "a", "--paths", "a"];
        const opts = parseOpts(args);
        expect(validateOpts(opts)).toBeNull();
    });
});

test("stringToArray should split '\n' separated strings", () => {
    const s = "a\nb";
    expect(stringToArray(s)).toStrictEqual(["a", "b"]);
});