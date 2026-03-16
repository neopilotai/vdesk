import { Template, defaultBuildLogger } from 'vdesk'
import { template } from './template'

async function main() {
  await Template.build(template, 'env-test', {
    onBuildLogs: defaultBuildLogger(),
  });
}

main().catch(console.error);