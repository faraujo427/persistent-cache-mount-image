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

test("extractCache should receive paths value", async () => {
    const opts = { "key": "", "paths": "a,b", "lookup-only": false, "prefix-keys": "" };
        (cache.isFeatureAvailable as jest.Mock).mockReturnValue(true);
    
        await extractCache(opts);
        expect(cache.saveCache).toHaveBeenCalledWith(["a", "b"], expect.anything(), expect.anything(), expect.anything());
});

test("injectCache should receive key value", async () => {
    const opts = { "key": "foo", "paths": "", "lookup-only": false, "prefix-keys": "" };
    (cache.isFeatureAvailable as jest.Mock).mockReturnValue(true);

    await extractCache(opts);
    expect(cache.saveCache).toHaveBeenCalledWith(expect.anything(), "foo", expect.anything(), expect.anything());
});
