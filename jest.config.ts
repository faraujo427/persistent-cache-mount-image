import { createDefaultEsmPreset, type JestConfigWithTsJest } from 'ts-jest'

const presetConfig = createDefaultEsmPreset({
  diagnostics: {
    ignoreCodes: 151002
  }
})

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
  resolver: 'ts-jest-resolver'
}

export default jestConfig
