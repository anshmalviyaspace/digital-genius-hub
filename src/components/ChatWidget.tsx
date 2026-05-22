import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import anshAvatar from "@/assets/ansh-hero.png";

type Msg = { role: "user" | "assistant"; content: string };

const SESSION_KEY = "lyzr_session_id";
const AGENT_ID = "69ecf551b9b12ab6e62c8e83";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "alright.. it's Ansh. what's on your mind?" },
  ]);
  const [sessionId, setSessionId] = useState<string>("");
  const [kbOffset, setKbOffset] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = `${AGENT_ID}-${Math.random().toString(36).slice(2, 12)}`;
      localStorage.setItem(SESSION_KEY, sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Lock body scroll + track visualViewport for keyboard on mobile
  useEffect(() => {
    if (!open) return;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    if (!isMobile) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const vv = window.visualViewport;
    const onResize = () => {
      if (!vv) return;
      // How much of the layout viewport is hidden by the keyboard
      const offset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setKbOffset(offset);
    };
    vv?.addEventListener("resize", onResize);
    vv?.addEventListener("scroll", onResize);
    onResize();

    return () => {
      vv?.removeEventListener("resize", onResize);
      vv?.removeEventListener("scroll", onResize);
      Object.assign(body.style, prev);
      window.scrollTo(0, scrollY);
      setKbOffset(0);
    };
  }, [open]);

  // Autofocus only on desktop (avoids forcing keyboard open on mobile)
  useEffect(() => {
    if (!open) return;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    if (isMobile) return;
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("lyzr-chat", {
        body: { message: text, session_id: sessionId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setMessages((m) => [...m, { role: "assistant", content: data?.reply || "..." }]);
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "hmm, something broke on my end. try again in a sec." },
      ]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating bubble */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[60] h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-105 transition-transform"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        aria-label="Chat with Ansh"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop (mobile only) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[55] bg-background/60 sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="
              fixed z-[60] bg-background border border-border shadow-2xl shadow-primary/20 flex flex-col overflow-hidden
              inset-x-0 bottom-0 top-0 rounded-none
              sm:inset-auto sm:bottom-24 sm:right-6 sm:top-auto sm:w-[400px] sm:h-[560px] sm:max-h-[calc(100vh-8rem)] sm:rounded-2xl
            "
            style={{
              // On mobile, shrink panel as keyboard appears so input stays visible
              paddingBottom: kbOffset ? `${kbOffset}px` : undefined,
            }}
          >
            <div
              className="px-5 py-4 border-b border-border bg-gradient-to-br from-primary/15 to-transparent flex items-center justify-between gap-3"
              style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-11 w-11 rounded-full overflow-hidden border border-primary/40 bg-primary/20 shrink-0">
                  <img src={anshAvatar} alt="Ansh" className="h-full w-full object-cover object-top" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-base font-semibold">Ansh</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    online · talk to Ansh
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="sm:hidden h-9 w-9 rounded-full bg-muted/60 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3"
              data-lenis-prevent
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2 text-muted-foreground text-sm">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    typing...
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="p-3 border-t border-border flex gap-2 bg-background"
              style={{ paddingBottom: kbOffset ? "0.75rem" : "max(0.75rem, env(safe-area-inset-bottom))" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask me anything..."
                className="flex-1 bg-muted rounded-full px-4 py-2.5 text-base sm:text-sm outline-none focus:ring-2 focus:ring-primary/50"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                onPointerDown={(e) => {
                  // Prevent input blur on mobile, which would otherwise resize
                  // the visualViewport and shift the button away before the tap registers.
                  e.preventDefault();
                  send();
                }}
                className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-transform touch-manipulation"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
