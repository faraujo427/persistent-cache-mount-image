import { Opts, stringToArray } from "./opts";
import { isCacheFeatureAvailable } from "./utils/actionCacheUtils";

import * as cache from "@actions/cache";

export async function extractCache(opts: Opts): Promise<number | undefined> {
    if (!isCacheFeatureAvailable()) {
        return;
    }

    const paths = stringToArray(opts.paths);

    return cache.saveCache(
        paths,
        opts.key,
        {},
        false,
    );
}