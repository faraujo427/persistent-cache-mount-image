import { beforeEach, expect, jest, test } from '@jest/globals'
import { createOpts } from '../__fixtures__/utils'

jest.unstable_mockModule('@actions/cache', () => ({
  isFeatureAvailable: jest.fn(),
  saveCache: jest.fn()
}))

const cache = await import('@actions/cache')
const { extractCache } = await import('../src/extract')

beforeEach(() => {
  jest.clearAllMocks()
})

test('extractCache should call cache.restoreCache', async () => {
  const opts = createOpts()
  ;(cache.isFeatureAvailable as jest.Mock).mockReturnValue(true)

  await extractCache(opts)
  expect(cache.saveCache).toHaveBeenCalled()
})

test('extractCache should receive paths value', async () => {
  const opts = createOpts()
  opts.paths = 'a,b'
  ;(cache.isFeatureAvailable as jest.Mock).mockReturnValue(true)

  await extractCache(opts)
  expect(cache.saveCache).toHaveBeenCalledWith(
    ['a', 'b'],
    expect.anything(),
    expect.anything(),
    expect.anything()
  )
})

test('extractCache should receive key value', async () => {
  const opts = createOpts()
  opts.key = 'foo'
  ;(cache.isFeatureAvailable as jest.Mock).mockReturnValue(true)

  await extractCache(opts)
  expect(cache.saveCache).toHaveBeenCalledWith(
    expect.anything(),
    'foo',
    expect.anything(),
    expect.anything()
  )
})

test('extractCache should receive chunk-size', async () => {
  const opts = createOpts()
  opts['chunk-size'] = 42
  ;(cache.isFeatureAvailable as jest.Mock).mockReturnValue(true)

  await extractCache(opts)
  expect(cache.saveCache).toHaveBeenCalledWith(
    expect.anything(),
    expect.anything(),
    { uploadChunkSize: 42 },
    expect.anything()
  )
})

test('extractCache should receive enable-cross-os-archive', async () => {
  const opts = createOpts()
  opts['enable-cross-os-archive'] = true
  ;(cache.isFeatureAvailable as jest.Mock).mockReturnValue(true)

  await extractCache(opts)
  expect(cache.saveCache).toHaveBeenCalledWith(
    expect.anything(),
    expect.anything(),
    expect.anything(),
    true
  )
})
