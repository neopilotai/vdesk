<p align="center">
  <img width="100" src="https://raw.githubusercontent.com/vdesk-dev/VDESK/refs/heads/main/readme-assets/logo-circle.png" alt="vdesk logo">
</p>

<h4 align="center">
  <a href="https://pypi.org/project/vdesk/">
    <img alt="Last 1 month downloads for the Python SDK" loading="lazy" decoding="async" style="color:transparent;width:170px;height:18px" src="https://static.pepy.tech/personalized-badge/vdesk?period=monthly&units=INTERNATIONAL_SYSTEM&left_color=BLACK&right_color=GREEN&left_text=PyPi%20Monthly%20Downloads">
  </a>  
</h4>


## What is VDESK?
[VDESK](https://www.vdesk.dev/) is an open-source infrastructure that allows you to run AI-generated code in secure isolated sandboxes in the cloud. To start and control sandboxes, use our [JavaScript SDK](https://www.npmjs.com/package/@vdesk/code-interpreter) or [Python SDK](https://pypi.org/project/vdesk_code_interpreter).

## Run your first Sandbox

### 1. Install SDK

```
pip install vdesk-code-interpreter
```

### 2. Get your VDESK API key
1. Sign up to VDESK [here](https://vdesk.dev).
2. Get your API key [here](https://vdesk.dev/dashboard?tab=keys).
3. Set environment variable with your API key
```
VDESK_API_KEY=vdesk_***
```     

### 3. Execute code with code interpreter inside Sandbox

```py
from vdesk_code_interpreter import Sandbox

with Sandbox.create() as sandbox:
    sandbox.run_code("x = 1")
    execution = sandbox.run_code("x+=1; x")
    print(execution.text)  # outputs 2
```

### 4. Check docs
Visit [VDESK documentation](https://vdesk.dev/docs).

### 5. VDESK cookbook
Visit our [Cookbook](https://github.com/vdesk-dev/vdesk-cookbook/tree/main) to get inspired by examples with different LLMs and AI frameworks.
