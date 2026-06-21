import { useEffect, useRef, CSSProperties } from 'react';

interface TweetCardProps {
  id: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Embeds a tweet using Twitter's official widgets.js script.
 * This approach is far more reliable than react-tweet in a Vite SPA
 * because it doesn't depend on React Suspense or server-side rendering.
 */
export function TweetCard({ id, className, style }: TweetCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any previous content
    container.innerHTML = '';

    // Load Twitter widgets.js if not already loaded
    const loadTwitterScript = (): Promise<void> => {
      return new Promise((resolve) => {
        if ((window as any).twttr?.widgets) {
          resolve();
          return;
        }

        const existing = document.getElementById('twitter-wjs');
        if (existing) {
          // Script tag exists but might still be loading
          existing.addEventListener('load', () => resolve());
          // In case it already loaded
          if ((window as any).twttr?.widgets) resolve();
          return;
        }

        const script = document.createElement('script');
        script.id = 'twitter-wjs';
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    loadTwitterScript().then(() => {
      if (!container) return;
      (window as any).twttr.widgets.createTweet(id, container, {
        theme: 'dark',
        dnt: true,
        align: 'center',
      });
    });

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [id]);

  return (
    <div className={className} style={style}>
      <div ref={containerRef} className="min-h-[200px] flex items-center justify-center">
        {/* Loading placeholder */}
        <div className="w-full max-w-md mx-auto p-6 bg-card border border-border rounded-xl text-center flex flex-col items-center justify-center gap-2">
          <div className="animate-pulse w-8 h-8 rounded-full bg-primary/20 mb-2" />
          <div className="animate-pulse w-3/4 h-3 bg-muted rounded" />
          <div className="animate-pulse w-1/2 h-3 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export function ClientTweetCard({ id, className, style }: TweetCardProps) {
  return <TweetCard id={id} className={className} style={style} />;
}
