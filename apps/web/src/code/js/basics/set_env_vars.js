import { Sandbox } from 'vdesk'

const sandbox = await Sandbox.create({
  template: 'base',
  envVars: { FOO: 'Hello' }, // $HighlightLine
})

await sandbox.close()
