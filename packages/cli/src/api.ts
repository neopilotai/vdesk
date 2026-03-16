import * as boxen from 'boxen'
import * as vdesk from 'vdesk'

import { getUserConfig, UserConfig } from './user'
import { asBold, asPrimary } from './utils/format'

export let apiKey = process.env.VDESK_API_KEY
export let accessToken = process.env.VDESK_ACCESS_TOKEN
export const teamId = process.env.VDESK_TEAM_ID

const authErrorBox = (keyName: string) => {
  let link
  let msg
  switch (keyName) {
    case 'VDESK_API_KEY':
      link = 'https://vdesk.dev/dashboard?tab=keys'
      msg = 'API key'
      break
    case 'VDESK_ACCESS_TOKEN':
      link = 'https://vdesk.dev/dashboard?tab=personal'
      msg = 'access token'
      break
  }
  // throwing error in default in switch statement results in unreachable code,
  // so we need to check if link and msg are defined here instead
  if (!link || !msg) {
    throw new Error(`Unknown key name: ${keyName}`)
  }
  return boxen.default(
    `You must be logged in to use this command. Run ${asBold('vdesk auth login')}.

If you are seeing this message in CI/CD you may need to set the ${asBold(
      `${keyName}`
    )} environment variable.
Visit ${asPrimary(link)} to get the ${msg}.`,
    {
      width: 70,
      float: 'center',
      padding: 0.5,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'redBright',
    }
  )
}

export function ensureAPIKey() {
  // If apiKey is not already set (either from env var or from user config), try to get it from config file
  if (!apiKey) {
    const userConfig = getUserConfig()
    apiKey = userConfig?.teamApiKey
  }

  if (!apiKey) {
    console.error(authErrorBox('VDESK_API_KEY'))
    process.exit(1)
  } else {
    return apiKey
  }
}

export function ensureUserConfig(): UserConfig {
  const userConfig = getUserConfig()
  if (!userConfig) {
    console.error('No user config found, run `vdesk auth login` to log in first.')
    process.exit(1)
  }
  return userConfig
}

export function ensureAccessToken() {
  // If accessToken is not already set (either from env var or from user config), try to get it from config file
  if (!accessToken) {
    const userConfig = getUserConfig()
    accessToken = userConfig?.accessToken
  }

  if (!accessToken) {
    console.error(authErrorBox('VDESK_ACCESS_TOKEN'))
    process.exit(1)
  } else {
    return accessToken
  }
}

/**
 * Resolve team ID with proper precedence:
 * 1. CLI --team flag
 * 2. VDESK_TEAM_ID env var
 * 3. Local vdesk.toml team_id (if provided)
 * 4. ~/.vdesk/config.json teamId (only if VDESK_API_KEY env var is NOT set,
 *    to avoid mismatch between env var API key and config file team ID)
 */
export function resolveTeamId(
  cliTeamId?: string,
  localConfigTeamId?: string
): string | undefined {
  if (cliTeamId) return cliTeamId
  if (teamId) return teamId
  if (localConfigTeamId) return localConfigTeamId
  if (!process.env.VDESK_API_KEY) {
    const config = getUserConfig()
    return config?.teamId
  }
  return undefined
}

const userConfig = getUserConfig()

export const connectionConfig = new vdesk.ConnectionConfig({
  accessToken: process.env.VDESK_ACCESS_TOKEN || userConfig?.accessToken,
  apiKey: process.env.VDESK_API_KEY || userConfig?.teamApiKey,
})
export const client = new vdesk.ApiClient(connectionConfig)
