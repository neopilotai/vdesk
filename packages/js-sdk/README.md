<p align="center">
  <img width="100" src="https://raw.githubusercontent.com/vdesk-dev/VDESK/refs/heads/main/readme-assets/logo-circle.png" alt="vdesk logo">
</p>

<h4 align="center">  
  <a href="https://www.npmjs.com/package/vdesk">
    <img alt="Last 1 month downloads for the JavaScript SDK" loading="lazy" width="200" height="20" decoding="async" data-nimg="1"
    style="color:transparent;width:auto;height:100%" src="https://img.shields.io/npm/dm/vdesk?label=NPM%20Downloads">
  </a>
</h4>

<!---
<img width="100%" src="/readme-assets/preview.png" alt="Cover image">
--->
## What is VDESK?
[VDESK](https://www.vdesk.dev/) is an open-source infrastructure that allows you to run AI-generated code in secure isolated sandboxes in the cloud. To start and control sandboxes, use our [JavaScript SDK](https://www.npmjs.com/package/@vdesk/code-interpreter) or [Python SDK](https://pypi.org/project/vdesk_code_interpreter).

## Run your first Sandbox

### 1. Install SDK

```bash
npm i @vdesk/code-interpreter
```

### 2. Get your VDESK API key
1. Sign up to VDESK [here](https://vdesk.dev).
2. Get your API key [here](https://vdesk.dev/dashboard?tab=keys).
3. Set environment variable with your API key
```
VDESK_API_KEY=vdesk_***
```     

### 3. Execute code with code interpreter inside Sandbox

```ts
import { Sandbox } from '@vdesk/code-interpreter'

const sbx = await Sandbox.create()
await sbx.runCode('x = 1')

const execution = await sbx.runCode('x+=1; x')
console.log(execution.text)  // outputs 2
```

### 4. Check docs
Visit [VDESK documentation](https://vdesk.dev/docs).

### 5. VDESK cookbook
Visit our [Cookbook](https://github.com/vdesk-dev/vdesk-cookbook/tree/main) to get inspired by examples with different LLMs and AI frameworks.
