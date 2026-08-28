import { beforeEach, expect, jest, test } from '@jest/globals'
import { createOpts } from '../__fixtures__/utils'

jest.unstable_mockModule('@actions/cache', () => ({
  isFeatureAvailable: jest.fn(),
  restoreCache: jest.fn()
}))

const cache = await import('@actions/cache')
const { injectCache } = await import('../src/inject')

beforeEach(() => {
  jest.clearAllMocks()
})

test('injectCache should call cache.restoreCache', async () => {
  const opts = createOpts()
  ;(cache.isFeatureAvailable as jest.Mock).mockReturnValue(true)

  await injectCache(opts)
  expect(cache.restoreCache).toHaveBeenCalled()
})

test('injectCache should receive paths value', async () => {
  const opts = createOpts()
  opts.paths = 'a,b'
  ;(cache.isFeatureAvailable as jest.Mock).mockReturnValue(true)

  await injectCache(opts)
  expect(cache.restoreCache).toHaveBeenCalledWith(
    ['a', 'b'],
    expect.anything(),
    expect.anything(),
    expect.anything(),
    expect.anything()
  )
})

test('injectCache should receive key value', async () => {
  const opts = createOpts()
  opts.key = 'foo'
  ;(cache.isFeatureAvailable as jest.Mock).mockReturnValue(true)

  await injectCache(opts)
  expect(cache.restoreCache).toHaveBeenCalledWith(
    expect.anything(),
    'foo',
    expect.anything(),
    expect.anything(),
    expect.anything()
  )
})

test('injectCache should receive prefix-keys value', async () => {
  const opts = createOpts()
  opts['prefix-keys'] = 'a,b'
  ;(cache.isFeatureAvailable as jest.Mock).mockReturnValue(true)

  await injectCache(opts)
  expect(cache.restoreCache).toHaveBeenCalledWith(
    expect.anything(),
    expect.anything(),
    ['a', 'b'],
    expect.anything(),
    expect.anything()
  )
})

test('injectCache should receive lookup-only value', async () => {
  const opts = createOpts()
  opts['lookup-only'] = true
  ;(cache.isFeatureAvailable as jest.Mock).mockReturnValue(true)

  await injectCache(opts)
  expect(cache.restoreCache).toHaveBeenCalledWith(
    expect.anything(),
    expect.anything(),
    expect.anything(),
    { lookupOnly: true },
    expect.anything()
  )
})

test('injectCache should receive enable-cross-os-archive value', async () => {
  const opts = createOpts()
  opts['enable-cross-os-archive'] = true
  ;(cache.isFeatureAvailable as jest.Mock).mockReturnValue(true)

  await injectCache(opts)
  expect(cache.restoreCache).toHaveBeenCalledWith(
    expect.anything(),
    expect.anything(),
    expect.anything(),
    expect.anything(),
    true
  )
})
