import { Template, defaultBuildLogger } from 'vdesk'
import { template } from './template'

async function main() {
  await Template.build(template, 'copy-test-dev', {
    onBuildLogs: defaultBuildLogger(),
  });
}

main().catch(console.error);