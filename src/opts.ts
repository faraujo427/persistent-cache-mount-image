import mri from "mri";

export type Opts = {
  key: string;
  paths: string;
  "lookup-only": boolean;
  "prefix-keys": string;
};

export function parseOpts(args: string[]): mri.Argv<Opts> {
  const opts = mri<Opts>(args, {
    boolean: ["inject", "extract"],
    string: ["paths", "key", "prefix-keys", "lookup-only"],
  });

  return opts;
}

export function validateOpts(opts: Opts): string | null {
  if (!opts.key || opts.key.length == 0) {
    return "'key' must be set!";
  }
  if (!opts.paths || opts.paths.length == 0) {
    return "'paths' must be set!";
  }

  return null;
}

export function stringToArray(s: string): string[] {
  if (s != "") {
    return s
      .split(",")
      .map((s) => s.replace(/^!\s+/, "!").trim())
      .filter((x) => x !== "");
  }
  return [];
}
