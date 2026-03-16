import { Sandbox } from 'vdesk'

const sandbox = await Sandbox.create()

await sandbox.close()
