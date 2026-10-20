# Ansh Malviya — Portfolio

Responsive React portfolio built with Vite, TypeScript, Tailwind CSS, GSAP, and Lenis. The mountain scroll scene uses local image frames and falls back to a static image on mobile and for reduced-motion preferences.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and enter the Supabase project URL and publishable key.
3. Run `npm run dev`.

## Chat backend

The chat widget calls the `lyzr-chat` Supabase Edge Function. Deploy it with the Supabase CLI and configure `LYZR_API_KEY` as a Supabase Function secret. Keep this provider key out of frontend environment variables and source code.

```sh
supabase functions deploy lyzr-chat
supabase secrets set LYZR_API_KEY=your-lyzr-api-key
```

The Supabase URL and publishable key are public client configuration. The Lyzr API key is server-side only.

## Checks

- `npm run lint`
- `npm run test`
- `npm run build`
