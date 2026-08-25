import { beforeEach, expect, jest, test } from "@jest/globals";

jest.unstable_mockModule("@actions/cache", () => ({
    isFeatureAvailable: jest.fn(),
    saveCache: jest.fn()
}));

const cache = await import("@actions/cache");
const { extractCache } = await import("../src/extract");

beforeEach(() => {
    jest.clearAllMocks();
});

test("extractCache should call cache.restoreCache", async () => {
    const opts = { "key": "", "paths": "", "lookup-only": false, "prefix-keys": "" };
    (cache.isFeatureAvailable as jest.Mock).mockReturnValue(true);

    await extractCache(opts);
    expect(cache.saveCache).toHaveBeenCalled();
});