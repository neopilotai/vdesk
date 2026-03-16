import * as commander from 'commander'

import { asBold } from './utils/format'

export const pathOption = new commander.Option(
  '-p, --path <path>',
  `change root directory where command is executed to ${asBold(
    '<path>'
  )} directory`
)

export const configOption = new commander.Option(
  '--config <vdesk-toml>',
  `specify path to the VDESK config toml. By default VDESK tries to find ${asBold(
    './vdesk.toml'
  )} in root directory. We recommend using the new build system (https://vdesk.dev/docs/template/defining-template) that does not use config files.`
)

export const selectOption = new commander.Option(
  '-s, --select',
  'select multiple sandbox templates from interactive list'
)

export const selectMultipleOption = new commander.Option(
  '-s, --select',
  'select sandbox template from interactive list'
)

export const teamOption = new commander.Option(
  '-t, --team <team-id>',
  'specify the team ID that the operation will be associated with. You can find team ID in the team settings in the VDESK dashboard (https://vdesk.dev/dashboard?tab=team).'
)
