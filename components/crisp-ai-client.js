// Minimal helper to call the server AI endpoint and optionally inject replies into your page.

export async function askSiteBot(text, opts = {}) {
  // opts: { website_id, session_id }
  const payload = { message: text };
  if (opts.website_id) payload.website_id = opts.website_id;
  if (opts.session_id) payload.session_id = opts.session_id;

  const res = await fetch("/api/ai/reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || "AI endpoint error");
  }

  const data = await res.json();
  return data;
}
