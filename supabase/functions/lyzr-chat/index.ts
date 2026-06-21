const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const AGENT_ID = "69ecf551b9b12ab6e62c8e83";
const USER_ID = "anshmalviya010@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { message, session_id } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "message required" }), {
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
        message,
      }),
    });

    const text = await res.text();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Lyzr ${res.status}: ${text}` }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let data: any;
    try { data = JSON.parse(text); } catch { data = { response: text }; }
    const reply = data.response || data.message || data.output || data.answer || text;

    return new Response(JSON.stringify({ reply, session_id: sid }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
