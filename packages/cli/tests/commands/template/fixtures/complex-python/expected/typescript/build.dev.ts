import { Template, defaultBuildLogger } from 'vdesk'
import { template } from './template'

async function main() {
  await Template.build(template, 'complex-python-app-dev', {
    onBuildLogs: defaultBuildLogger(),
  });
}

main().catch(console.error);