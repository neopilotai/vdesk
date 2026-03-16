import { Template, defaultBuildLogger } from 'vdesk'
import { template } from './template'

async function main() {
  await Template.build(template, 'copy-test', {
    onBuildLogs: defaultBuildLogger(),
  });
}

main().catch(console.error);