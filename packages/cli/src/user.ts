import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'

/**
 * User configuration stored in ~/.vdesk/config.json
 */
export interface UserConfig {
  email: string
  accessToken: string
  teamName: string
  teamId: string
  teamApiKey: string
  dockerProxySet?: boolean
}

export const USER_CONFIG_PATH = path.join(os.homedir(), '.vdesk', 'config.json') // TODO: Keep in Keychain

export const DOCS_BASE =
  process.env.VDESK_DOCS_BASE ||
  `https://${process.env.VDESK_DOMAIN || 'vdesk.dev'}/docs`

export const DASHBOARD_BASE =
  process.env.VDESK_DASHBOARD_BASE ||
  `https://${process.env.VDESK_DOMAIN || 'vdesk.dev'}/dashboard`

export const SANDBOX_INSPECT_URL = (sandboxId: string) =>
  `${DASHBOARD_BASE}/inspect/sandbox/${sandboxId}`

export function getUserConfig(): UserConfig | null {
  if (!fs.existsSync(USER_CONFIG_PATH)) return null
  return JSON.parse(fs.readFileSync(USER_CONFIG_PATH, 'utf8'))
}
