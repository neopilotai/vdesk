import { assert, test, beforeEach, afterEach } from 'vitest'
import { ConnectionConfig } from '../src/connectionConfig'

// Store original env vars to restore after tests
let originalEnv: { [key: string]: string | undefined }

beforeEach(() => {
  originalEnv = {
    VDESK_API_URL: process.env.VDESK_API_URL,
    VDESK_DOMAIN: process.env.VDESK_DOMAIN,
    VDESK_DEBUG: process.env.VDESK_DEBUG,
  }
})

afterEach(() => {
  // Restore original env vars
  Object.keys(originalEnv).forEach((key) => {
    if (originalEnv[key] === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = originalEnv[key]
    }
  })
})

test('api_url defaults correctly', () => {
  // Ensure no env vars interfere
  delete process.env.VDESK_API_URL
  delete process.env.VDESK_DOMAIN
  delete process.env.VDESK_DEBUG

  const config = new ConnectionConfig()
  assert.equal(config.apiUrl, 'https://api.vdesk.app')
})

test('api_url in args', () => {
  const config = new ConnectionConfig({ apiUrl: 'http://localhost:8080' })
  assert.equal(config.apiUrl, 'http://localhost:8080')
})

test('api_url in env var', () => {
  process.env.VDESK_API_URL = 'http://localhost:8080'

  const config = new ConnectionConfig()
  assert.equal(config.apiUrl, 'http://localhost:8080')
})

test('api_url has correct priority', () => {
  process.env.VDESK_API_URL = 'http://localhost:1111'

  const config = new ConnectionConfig({ apiUrl: 'http://localhost:8080' })
  assert.equal(config.apiUrl, 'http://localhost:8080')
})
