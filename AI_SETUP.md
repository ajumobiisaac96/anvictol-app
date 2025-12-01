Quick steps to get a basic AI bot working with Crisp + this site

1. Add environment variables

- Copy existing `.env.local.example` to `.env.local` (do NOT commit `.env.local`).
- Fill these values:
  - `NEXT_PUBLIC_CRISP_WEBSITE_ID` — your Crisp Website ID (client-visible)
  - `OPENAI_API_KEY` — optional; add if you want server-side AI generation
  - `CRISP_PLUGIN_IDENTIFIER` and `CRISP_PLUGIN_KEY` — optional; add if you want the server to post replies into Crisp conversations via the REST API (these are plugin tokens; keep them server-side only)

2. How the pieces work

- `app/layout.jsx` already injects the Crisp chat widget using `NEXT_PUBLIC_CRISP_WEBSITE_ID`.
- `app/api/ai/reply` is a server endpoint that will:
  - Generate a reply using OpenAI (if `OPENAI_API_KEY` is set),
  - Optionally post that reply back into Crisp (if `CRISP_PLUGIN_IDENTIFIER`, `CRISP_PLUGIN_KEY`, `website_id` and `session_id` are provided in the request body).

3. Create a Crisp plugin token (if you want programmatic posting into Crisp)

- Go to the Crisp Marketplace and create a new Private plugin.
- Request a Production token (or use a Development token while testing).
- Grant the plugin the scopes you need — at minimum you'll need write access to conversation messages.
- Install the plugin into your website and copy the token identifier + key into your server env vars.

4. Client-side: sending a message to your server (example)

- If you only want AI responses returned to the page (not injected into Crisp), you can call the server endpoint directly:

```js
// Example client snippet to call the AI endpoint
async function askSiteBot(text) {
  const res = await fetch("/api/ai/reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text }),
  });
  const data = await res.json();
  return data.reply; // show this in UI
}
```

- If you want replies posted into Crisp so they appear inside the visitor's conversation, you need the visitor `session_id` (the conversation session identifier). There are several ways to obtain the session id:
  - Use Crisp REST API server-side to list active visitors and pick the session for the matching visitor (requires plugin token).
  - Use Crisp RTM WebSocket to get real-time events (advanced).
  - Ask for the session id from the chatbox client (not always straightforward). If you have the `session_id` on the client, call the endpoint like:

```js
await fetch("/api/ai/reply", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: "Hello",
    website_id: "your-crisp-website-id",
    session_id: "the-session-id-for-visitor",
  }),
});
```

5. Run locally

- Start your Next dev server:

```powershell
pnpm dev
# or
npm run dev
```

- Open `http://localhost:3000`, open the chat and test.

6. Notes, security & next steps

- Never commit `CRISP_PLUGIN_KEY` or `OPENAI_API_KEY` to source control.
- The server endpoint will fall back to a canned reply if `OPENAI_API_KEY` is not set.
- If you want the bot to proactively reply to every visitor message in real-time, the recommended approach is to configure a Crisp plugin that receives webhooks or RTM events and replies server-side (this requires building a Crisp plugin on the Marketplace).
- I can help you further by:
  - Adding a small UI that forwards messages from the Crisp chatbox to `/api/ai/reply` automatically (needs a reliable way to get `session_id`).
  - Creating a Crisp Marketplace plugin skeleton and requesting production token with the minimal scopes.
