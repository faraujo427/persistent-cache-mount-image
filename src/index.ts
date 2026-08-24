import { parseOpts, validateOpts } from "./opts.js";
import { injectCache } from "./inject.js";
import { exit } from "node:process";

async function main(args: string[]) {
  try {
    if (args.length < 3) {
      throw new Error(
        "This program must run as 'node index.js <operation> --key <key> --path <path> [opts]'",
      );
    }
    if (args[2] != "inject" && args[2] != "extract") {
      throw new Error("The operation must be 'inject' or 'extract'");
      exit(1);
    }
    const operation = args[2];
    const opts = parseOpts(args.slice(3));
    const errMessage = validateOpts(opts);

    if (errMessage != null) {
      throw new Error(errMessage);
    }

    opts["lookup-only"] = true;

    if (operation == "inject") {
      const cacheKey = await injectCache(opts);
      if (!cacheKey) {
        console.info("Cache not found for input key '%s'", opts.key);
        return;
      }
      if (opts["lookup-only"]) {
        console.log(`Cache found and can be restored from key: ${cacheKey}`);
      } else {
        console.log(`Cache restored from key: ${cacheKey}`);
      }
    }
  } catch (error: unknown) {
    console.error("An error ocurred: %s", (error as Error).message);
    exit(1);
  }
}

main(process.argv);
