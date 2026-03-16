#!/usr/bin/env bash

npm pkg set 'name'='@vdesk/sdk'
npm publish --no-git-checks
npm pkg set 'name'='vdesk'
npm deprecate "@vdesk/sdk@$(npm pkg get version | tr -d \")" "The package @vdesk/sdk has been renamed to vdesk. Please uninstall the old one and install the new by running following command: npm uninstall @vdesk/sdk && npm install vdesk"
