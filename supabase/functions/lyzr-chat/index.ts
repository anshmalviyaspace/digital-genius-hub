const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const AGENT_ID = "6a37fe16d87a209debdd7346";
const USER_ID = "anshmalviya010@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { message, session_id } = await req.json();
    if (typeof message !== "string" || !message.trim() || message.length > 4000) {
      return new Response(JSON.stringify({ error: "message must be between 1 and 4000 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LYZR_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LYZR_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sid = session_id || `${AGENT_ID}-${crypto.randomUUID().slice(0, 10)}`;

    const res = await fetch("https://agent-prod.studio.lyzr.ai/v3/inference/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({
        user_id: USER_ID,
        agent_id: AGENT_ID,
        session_id: sid,
        message: message.trim(),
      }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("Lyzr chat request failed", res.status, text);
      return new Response(JSON.stringify({ error: "chat provider request failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let data: unknown;
    try { data = JSON.parse(text); } catch { data = { response: text }; }
    const result = typeof data === "object" && data !== null ? data as Record<string, unknown> : {};
    const reply = [result.response, result.message, result.output, result.answer]
      .find((value): value is string => typeof value === "string") ?? text;

    return new Response(JSON.stringify({ reply, session_id: sid }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Lyzr chat function failed", e);
    return new Response(JSON.stringify({ error: "chat request failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
