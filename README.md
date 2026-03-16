![VDESK Surf Preview Light](/readme-assets/surf-light.png#gh-light-mode-only)
![VDESK Surf Preview Dark](/readme-assets/surf-dark.png#gh-dark-mode-only)

# 🏄 Surf - OpenAI's Computer Use Agent + VDESK Desktop

A Next.js application that allows AI to interact with a virtual desktop environment. This project integrates [VDESK's desktop sandbox](https://github.com/vdesk-dev/desktop) with OpenAI's API to create an AI agent that can perform tasks on a virtual computer through natural language instructions.

[VDESK](https://vdesk.dev) is an open source isolated virtual computer in the cloud made for AI use cases.

## Overview

The Computer Use App provides a web interface where users can:

1. Start a virtual desktop sandbox environment
2. Send natural language instructions to an AI agent
3. Watch as the AI agent performs actions on the virtual desktop
4. Interact with the AI through a chat interface

The application uses Server-Sent Events (SSE) to stream AI responses and actions in real-time, providing a seamless experience.

## How It Works

### Architecture

The application consists of several key components:

1. **Frontend UI (Next.js)**: Provides the user interface with a virtual desktop view and chat interface
2. [**VDESK Desktop Sandbox**](https://github.com/vdesk-dev/desktop): Creates and manages virtual desktop environments
3. [**OpenAI Computer Use**](https://platform.openai.com/docs/guides/tools-computer-use): Processes user instructions and generates actions for the AI agent
4. **Streaming API**: Handles real-time communication between the frontend and backend

### Core Flow

1. User starts a new sandbox instance
2. VDESK creates a virtual desktop and provides a URL for streaming
3. User sends instructions via the chat interface
4. Backend processes the instructions using OpenAI's API
5. AI generates actions (clicks, typing, etc.) to perform on the virtual desktop
6. Actions are executed on the sandbox and streamed back to the frontend
7. The process repeats as the user continues to provide instructions

## Prerequisites

Before starting, you'll need:

1. [Node.js](https://nodejs.org/) (version specified in package.json)
2. [npm](https://www.npmjs.com/) (comes with Node.js)
3. An [VDESK API key](https://vdesk.dev/docs/getting-started/api-key)
4. An [OpenAI API key](https://platform.openai.com/api-keys)

## Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/vdesk-dev/surf
cd surf
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory based on the provided `.env.example`:

```env
VDESK_API_KEY=your_vdesk_api_key
OPENAI_API_KEY=your_openai_api_key
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open the application**

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Start a Sandbox Instance**
   - Click the "Start new Sandbox" button to initialize a virtual desktop environment
   - Wait for the sandbox to start (this may take a few seconds)

2. **Send Instructions**
   - Type your instructions in the chat input (e.g., "Open Firefox and go to google.com")
   - Press Enter or click the send button
   - You can also select from example prompts if available

3. **Watch AI Actions**
   - The AI will process your instructions and perform actions on the virtual desktop
   - You can see the AI's reasoning and actions in the chat interface
   - The virtual desktop will update in real-time as actions are performed

4. **Manage the Sandbox**
   - The timer shows the remaining time for your sandbox instance
   - You can stop the sandbox at any time by clicking the "Stop" button
   - The sandbox will automatically extend its time when it's about to expire

## Features

- **Virtual Desktop Environment**: Runs a Linux-based desktop in a sandbox
- **AI-Powered Interaction**: Uses OpenAI's API to understand and execute user instructions
- **Real-Time Streaming**: Shows AI actions and responses as they happen
- **Chat Interface**: Provides a conversational interface for interacting with the AI
- **Example Prompts**: Offers pre-defined instructions to help users get started
- **Dark/Light Mode**: Supports both dark and light themes

## Technical Details

### Dependencies

The application uses several key dependencies:

- **Next.js**: React framework for the frontend
- **@vdesk/desktop**: SDK for creating and managing desktop sandbox environments
- **OpenAI**: SDK for interacting with OpenAI's API
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Library for animations

See `package.json` for a complete list of dependencies.

### API Endpoints

- **/api/chat**: Handles chat messages and streams AI responses and actions

### Server Actions

- **createSandbox**: Creates a new sandbox instance
- **increaseTimeout**: Extends the sandbox timeout
- **stopSandboxAction**: Stops a running sandbox instance

## Troubleshooting

- **Sandbox not starting**: Verify your VDESK API key is correct in `.env.local`
- **AI not responding**: Check that your OpenAI API key is valid and has access to the required models
- **Actions not working**: Ensure the sandbox is running and the AI has proper instructions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:
- Check the [VDESK Documentation](https://vdesk.dev/docs)
- Join the [VDESK Discord](https://discord.gg/U7KEcGErtQ)
- Open an [issue](https://github.com/vdesk-dev/computer-use-app/issues)
