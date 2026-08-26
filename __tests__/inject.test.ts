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

test("injectCache should receive paths value", async () => {
    const opts = { "key": "", "paths": "a,b", "lookup-only": false, "prefix-keys": "" };
    (cache.isFeatureAvailable as jest.Mock).mockReturnValue(true);

    await injectCache(opts);
    expect(cache.restoreCache).toHaveBeenCalledWith(["a", "b"], expect.anything(), expect.anything(), expect.anything(), expect.anything());
});

test("injectCache should receive key value", async () => {
    const opts = { "key": "foo", "paths": "", "lookup-only": false, "prefix-keys": "" };
    (cache.isFeatureAvailable as jest.Mock).mockReturnValue(true);

    await injectCache(opts);
    expect(cache.restoreCache).toHaveBeenCalledWith(expect.anything(), "foo", expect.anything(), expect.anything(), expect.anything());
});

test("injectCache should receive prefix-keys value", async () => {
    const opts = { "key": "", "paths": "", "lookup-only": false, "prefix-keys": "a,b" };
    (cache.isFeatureAvailable as jest.Mock).mockReturnValue(true);

    await injectCache(opts);
    expect(cache.restoreCache).toHaveBeenCalledWith(expect.anything(), expect.anything(), ["a", "b"], expect.anything(), expect.anything());
});

test("injectCache should receive lookup-only value", async () => {
    const opts = { "key": "", "paths": "", "lookup-only": true, "prefix-keys": "" };
    (cache.isFeatureAvailable as jest.Mock).mockReturnValue(true);

    await injectCache(opts);
    expect(cache.restoreCache).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(), { lookupOnly: true }, expect.anything());
});