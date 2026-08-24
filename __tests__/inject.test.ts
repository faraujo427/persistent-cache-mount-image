import { beforeEach, expect, jest, test } from "@jest/globals";

jest.unstable_mockModule("@actions/cache", () => ({
    isFeatureAvailable: jest.fn(),
    restoreCache: jest.fn()
}));

const cache = await import("@actions/cache");
const { injectCache } = await import("../src/inject");

beforeEach(() => {
    jest.clearAllMocks();
});

test("injectCache should call cache.restoreCache", async () => {
    const opts = { "key": "", "paths": "", "lookup-only": false, "prefix-keys": "" };
    (cache.isFeatureAvailable as jest.Mock).mockReturnValue(true);

    await injectCache(opts);
    expect(cache.restoreCache).toHaveBeenCalled();
});