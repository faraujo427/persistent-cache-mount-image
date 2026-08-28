import { parseOpts, validateOpts } from './opts.js'
import { injectCache } from './inject.js'
import { exit } from 'node:process'
import { extractCache } from './extract.js'
import { checkEnvironment } from './utils/environment.js'

import * as core from '@actions/core'

async function main(args: string[]) {
  try {
    if (args.length < 3) {
      throw new Error(
        "This program must run as 'node index.js <operation> --key <key> --path <path> [opts]'"
      )
    }
    if (args[2] != 'inject' && args[2] != 'extract') {
      throw new Error("The operation must be 'inject' or 'extract'")
      exit(1)
    }
    const operation = args[2]
    const opts = parseOpts(args.slice(3))
    const errMessage = validateOpts(opts)

    if (errMessage != null) {
      throw new Error(errMessage)
    }

    checkEnvironment()

    if (operation == 'inject') {
      const cacheKey = await injectCache(opts)
      if (!cacheKey) {
        core.info(`Cache not found for input key '${opts.key}'`)
        return
      }
      if (opts['lookup-only']) {
        core.info(`Cache found and can be restored from key: ${cacheKey}`)
      } else {
        core.info(`Cache restored from key: ${cacheKey}`)
      }
    } else if (operation == 'extract') {
      const cacheId = await extractCache(opts)
      if (cacheId != -1) {
        core.info(`Cache saved with key: ${opts.key}`)
      }
    }
  } catch (error: unknown) {
    core.error(error as Error)
    exit(1)
  }
}

main(process.argv)
