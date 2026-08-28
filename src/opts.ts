import mri from 'mri'

export type Opts = {
  key: string
  paths: string
  'enable-cross-os-archive': boolean
  'lookup-only': boolean
  'prefix-keys': string
  'chunk-size': number
}

export function parseOpts(args: string[]): mri.Argv<Opts> {
  const opts = mri<Opts>(args, {
    boolean: ['lookup-only', 'enable-cross-os-archive'],
    string: ['paths', 'key', 'prefix-keys', 'chunk-size'],
    default: {
      key: '',
      paths: '',
      'enable-cross-os-archive': false,
      'lookup-only': false,
      'prefix-keys': '',
      'chunk-size': 0
    }
  })

  return opts
}

export function validateOpts(opts: Opts): string | null {
  if (!opts.key || opts.key.length == 0) {
    return "'key' must be set!"
  }
  if (!opts.paths || opts.paths.length == 0) {
    return "'paths' must be set!"
  }

  return null
}

export function stringToArray(s: string): string[] {
  if (s != '') {
    return s
      .split(',')
      .map((s) => s.replace(/^!\s+/, '!').trim())
      .filter((x) => x !== '')
  }
  return []
}
