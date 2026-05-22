const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FIRECRAWL_URL = "https://api.firecrawl.dev";
const BEEHIIV_URL = "https://buildyoung.beehiiv.com";

interface Post {
  title: string;
  excerpt: string;
  date: string;
  url: string;
}

// In-memory cache (per-instance) to avoid burning Firecrawl credits
let cache: { data: Post[]; ts: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (cache && Date.now() - cache.ts < CACHE_TTL_MS) {
      return new Response(JSON.stringify({ posts: cache.data, cached: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    if (!FIRECRAWL_API_KEY) throw new Error("FIRECRAWL_API_KEY not configured");

    const schema = {
      type: "object",
      properties: {
        posts: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              excerpt: { type: "string" },
              date: { type: "string", description: "Published date as written on the page, e.g. 'May 6, 2026'" },
              url: { type: "string", description: "Absolute URL to the post" },
            },
            required: ["title", "url"],
          },
        },
      },
      required: ["posts"],
    };

    const res = await fetch(`${FIRECRAWL_URL}/v2/scrape`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: BEEHIIV_URL,
        formats: [{ type: "json", schema, prompt: "Extract every newsletter post listed on the page (title, short excerpt/subtitle, published date, and absolute post URL). Return all posts, newest first." }],
        onlyMainContent: true,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Firecrawl API error:", res.status, data);
      return new Response(JSON.stringify({ error: `Firecrawl ${res.status}`, posts: [], fallback: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const extracted = data?.data?.json ?? data?.json ?? {};
    const posts: Post[] = (extracted.posts || []).map((p: Post) => ({
      title: p.title,
      excerpt: p.excerpt || "",
      date: p.date || "",
      url: p.url?.startsWith("http") ? p.url : `${BEEHIIV_URL}${p.url || ""}`,
    }));

    cache = { data: posts, ts: Date.now() };

    return new Response(JSON.stringify({ posts, cached: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("fetch-newsletter-posts error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message, posts: [], fallback: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
