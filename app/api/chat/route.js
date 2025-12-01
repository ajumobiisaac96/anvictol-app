import { generateText } from "ai";

// System prompt that teaches the AI about your company
const SYSTEM_PROMPT = `You are an AI assistant for Anvictol Integrated Services, a company that provides:
1. Conveyor Cleaning & Maintenance - advanced conveyor cleaning, belt scrapers, alignment and debris removal
2. Factory Maintenance - preventive and corrective maintenance, inspections, part replacements and emergency breakdown repairs
3. Line Operations Support - skilled operators and technical support for production lines

Important guidelines:
- Be helpful, professional, and friendly
- Answer questions based on what you know about these services
- If asked something you're unsure about, suggest they contact the team via WhatsApp or email (anvictolintegratedservices@gmail.com)
- For urgent needs, always recommend WhatsApp as the fastest way to reach them
- You can answer questions about what the company does, capabilities, and how to contact them
- Be conversational and natural, not robotic
- Keep responses concise but informative (2-3 sentences usually)`;

export async function POST(request) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: SYSTEM_PROMPT,
      prompt: message,
      temperature: 0.7,
      maxTokens: 200,
    });

    console.log("[v0] AI Response generated:", text);

    return Response.json({ reply: text });
  } catch (error) {
    console.error("[v0] Chat API error:", error);
    return Response.json(
      { error: "Failed to generate response", details: error.message },
      { status: 500 }
    );
  }
}
