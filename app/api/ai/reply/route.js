import { Buffer } from "buffer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, website_id, session_id } = body || {};

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Missing `message` in request body" }),
        { status: 400 }
      );
    }

    // Generate AI reply using OpenAI if key is present, otherwise return a canned reply.
    let aiReply =
      "Hi — I'm the site assistant. I can help, but OpenAI isn't configured yet.";

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

    if (OPENAI_KEY) {
      const openaiRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: OPENAI_MODEL,
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant for a company website. Keep answers concise and friendly.",
              },
              { role: "user", content: message },
            ],
            max_tokens: 600,
            temperature: 0.2,
          }),
        }
      );

      if (!openaiRes.ok) {
        const text = await openaiRes.text();
        console.error("OpenAI error", openaiRes.status, text);
        return new Response(
          JSON.stringify({ error: "OpenAI request failed", details: text }),
          { status: 502 }
        );
      }

      const openaiData = await openaiRes.json();
      aiReply = openaiData?.choices?.[0]?.message?.content?.trim() || aiReply;
    }

    // Optionally post reply back into Crisp conversation if credentials + conversation info provided
    let crispResult = null;
    const CRISP_IDENTIFIER = process.env.CRISP_PLUGIN_IDENTIFIER;
    const CRISP_KEY = process.env.CRISP_PLUGIN_KEY;

    if (CRISP_IDENTIFIER && CRISP_KEY && website_id && session_id) {
      try {
        const auth = Buffer.from(`${CRISP_IDENTIFIER}:${CRISP_KEY}`).toString(
          "base64"
        );
        const crispRes = await fetch(
          `https://api.crisp.chat/v1/website/${encodeURIComponent(
            website_id
          )}/conversation/${encodeURIComponent(session_id)}/message`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${auth}`,
              "X-Crisp-Tier": "plugin",
            },
            body: JSON.stringify({
              type: "text",
              from: "operator",
              origin: "chat",
              content: aiReply,
            }),
          }
        );

        const crispJson = await crispRes.json().catch(() => null);
        crispResult = { status: crispRes.status, body: crispJson };
      } catch (err) {
        console.error("Failed to post to Crisp:", err);
        crispResult = { error: String(err) };
      }
    }

    return new Response(
      JSON.stringify({ reply: aiReply, crisp: crispResult }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
