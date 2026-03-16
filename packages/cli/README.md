<p align="center">
  <img width="100" src="https://raw.githubusercontent.com/vdesk-dev/VDESK/refs/heads/main/readme-assets/logo-circle.png" alt="vdesk logo">
</p>

# VDESK CLI

This CLI tool allows you to build manager your running VDESK sandbox and sandbox templates. Learn more in [our documentation](https://vdesk.dev/docs).

### 1. Install the CLI

**Using Homebrew (on macOS)**

```bash
brew install vdesk
```

**Using NPM**

```bash
npm install -g @vdesk/cli
```

### 2. Authenticate

```bash
vdesk auth login
```

> [!NOTE]
> To authenticate without the ability to open the browser, provide
> `VDESK_ACCESS_TOKEN` as an environment variable. You can find your token
> in Account Settings under the Team selector at [vdesk.dev/dashboard](https://vdesk.dev/dashboard). Then use the CLI like this:
> `VDESK_ACCESS_TOKEN=sk_vdesk_... vdesk template build`.

> [!IMPORTANT]  
> Note the distinction between `VDESK_ACCESS_TOKEN` and `VDESK_API_KEY`.

### 3. Check out docs

Visit our [CLI documentation](https://vdesk.dev/docs) to learn more.
