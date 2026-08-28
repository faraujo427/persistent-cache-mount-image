import { Opts } from '../src/opts'

export function createOpts(): Opts {
  return {
    key: '',
    paths: '',
    'enable-cross-os-archive': false,
    'prefix-keys': '',
    'lookup-only': false,
    'chunk-size': 0
  }
}