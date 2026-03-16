import { describe, expect, test } from 'vitest'

import { handleVDESKRequestError, VDESKRequestError } from '../../src/utils/errors'

describe('handleVDESKRequestError', () => {
  test('does not throw when there is no error', () => {
    const res = { data: { id: '123' } }
    expect(() => handleVDESKRequestError(res)).not.toThrow()
  })

  test('throws VDESKRequestError for known status codes', () => {
    const res = { error: { code: 401, message: 'invalid token' } }
    expect(() => handleVDESKRequestError(res, 'Auth failed')).toThrow(
      VDESKRequestError
    )
    expect(() => handleVDESKRequestError(res, 'Auth failed')).toThrow(
      'Auth failed: [401] unauthorized: invalid token'
    )
  })

  test('throws VDESKRequestError with message for status code 0', () => {
    const res = { error: { code: 0, message: 'connection reset' } }
    expect(() => handleVDESKRequestError(res, 'Request failed')).toThrow(
      VDESKRequestError
    )
    expect(() => handleVDESKRequestError(res, 'Request failed')).toThrow(
      'Request failed: [0] unknown error: connection reset'
    )
  })

  test('throws VDESKRequestError when error code is missing', () => {
    const res = { error: { message: 'something went wrong' } } as any
    expect(() => handleVDESKRequestError(res, 'Request failed')).toThrow(
      VDESKRequestError
    )
    expect(() => handleVDESKRequestError(res, 'Request failed')).toThrow(
      'Request failed: [0] unknown error: something went wrong'
    )
  })

  test('handles valid but unlisted HTTP status codes via statuses package', () => {
    const res = { error: { code: 502, message: 'upstream down' } }
    expect(() => handleVDESKRequestError(res)).toThrow(VDESKRequestError)
    expect(() => handleVDESKRequestError(res)).toThrow(
      '[502] Bad Gateway: upstream down'
    )
  })
})
