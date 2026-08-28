import { Opts, stringToArray } from './opts'
import { isCacheFeatureAvailable } from './utils/actionCacheUtils'

import * as cache from '@actions/cache'

export async function injectCache(opts: Opts): Promise<string | undefined> {
  if (!isCacheFeatureAvailable()) {
    return
  }

  const paths = stringToArray(opts.paths)
  let prefixKeys: string[] = []
  if (opts['prefix-keys'] != null) {
    prefixKeys = stringToArray(opts['prefix-keys'])
  }

  return cache.restoreCache(
    paths,
    opts.key,
    prefixKeys,
    { lookupOnly: opts['lookup-only'] },
    opts['enable-cross-os-archive']
  )
}
