"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Film,
  Loader2,
  RotateCcw,
  Send,
  Sparkles,
  Star,
  Ticket,
  Tv,
} from "lucide-react";

const API_URL = "https://msdhgbu619.execute-api.ap-south-2.amazonaws.com/ask";

const loadingMessages = [
  "Opening the film desk...",
  "Reading the story between the lines...",
  "Preparing a thoughtful watch note...",
];

const moviePrompts = [
  { label: "Explain a confusing ending", prompt: "Explain the ending of " },
  { label: "Find something to watch", prompt: "Recommend a movie or series for me. I want " },
  { label: "Compare two titles", prompt: "Compare these two movies or series: " },
  { label: "Build a watch order", prompt: "What is the best watch order for " },
];

function getErrorMessage(status: number, body: unknown) {
  const bodyText =
    typeof body === "string"
      ? body
      : body && typeof body === "object"
        ? JSON.stringify(body)
        : "";
  const normalizedBody = bodyText.toLowerCase();

  if (
    status === 429 ||
    normalizedBody.includes("too many") ||
    normalizedBody.includes("rate limit") ||
    normalizedBody.includes("quota")
  ) {
    return "Too many requests. Please wait a moment and try again.";
  }

  if (status >= 500) {
    return "The AI service is temporarily unavailable. Please try again shortly.";
  }

  if (status === 401 || status === 403) {
    return "The AI service could not authorize this request.";
  }

  return "We could not get an answer right now. Please try again.";
}

async function readResponseBody(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json() as Promise<Record<string, unknown>>;
  }

  return response.text();
}

export default function LambdaDemo() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!question.trim() || loading) return;

    setLoading(true);
    setError("");
    setAnswer("");
    setLoadingMessage(loadingMessages[0]);

    const messageTimer = window.setInterval(() => {
      setLoadingMessage((current) => {
        const index = loadingMessages.indexOf(current);
        return loadingMessages[(index + 1) % loadingMessages.length];
      });
    }, 1700);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim() }),
      });
      const body = await readResponseBody(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(response.status, body));
      }

      const responseAnswer =
        typeof body === "object" && body !== null && "answer" in body
          ? body.answer
          : body;

      if (typeof responseAnswer !== "string" || !responseAnswer.trim()) {
        throw new Error("The AI returned an empty response. Please try again.");
      }

      setAnswer(responseAnswer);
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "Unable to connect to the AI service. Check your connection and try again."
          : requestError instanceof Error
            ? requestError.message
            : "We could not get an answer right now. Please try again."
      );
    } finally {
      window.clearInterval(messageTimer);
      setLoading(false);
    }
  };

  const resetChat = () => {
    if (loading) return;
    setQuestion("");
    setAnswer("");
    setError("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171321] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[#6d4bd7]/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[#4f8dff]/15 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(189,163,250,.1),transparent_38%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-24 lg:px-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#bda3fa] text-[#171321] shadow-[0_8px_24px_rgba(189,163,250,.25)]">
              <Sparkles size={21} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-[-0.03em]">The Movie Desk</p>
              <p className="mt-0.5 text-[11px] text-white/50">Stories, scenes & series</p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetChat}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-white/65 transition hover:border-white/30 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </header>

        <section className="mx-auto max-w-4xl pb-12 pt-20 text-center sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#bda3fa]/25 bg-[#bda3fa]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d9c9ff]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#79d99a] shadow-[0_0_10px_#79d99a]" />
            Your next watch, decoded
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-7 text-5xl font-semibold leading-[0.95] tracking-[-0.075em] sm:text-7xl"
          >
            Ask about the
            <br />
            <span className="text-[#bda3fa]">stories you love.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base"
          >
            Get thoughtful answers about movies and series. Unpack an ending,
            find your next favourite, or follow a story across its whole
            universe.
          </motion.p>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="mx-auto max-w-4xl rounded-[1.75rem] border border-white/15 bg-[#292634]/75 p-3 shadow-[0_24px_70px_rgba(8,5,20,.35)] backdrop-blur-xl sm:p-4"
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="question" className="sr-only">
              Your question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about a movie or series... e.g. Why does Interstellar end that way?"
              rows={5}
              maxLength={2000}
              disabled={loading}
              className="w-full resize-none rounded-[1.25rem] border border-white/10 bg-[#171321]/80 px-5 py-4 text-sm leading-7 text-white outline-none placeholder:text-white/35 transition focus:border-[#bda3fa]/70 focus:ring-4 focus:ring-[#bda3fa]/10 disabled:cursor-wait disabled:opacity-70 sm:px-6 sm:py-5 sm:text-base"
            />
            <div className="px-1 pt-3 sm:px-2">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                <Ticket size={13} className="text-[#bda3fa]" />
                Try a film question
              </div>
              <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {moviePrompts.map(({ label, prompt }) => (
                  <button
                    key={label}
                    type="button"
                    disabled={loading}
                    onClick={() => setQuestion(prompt)}
                    className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs font-medium text-white/65 transition hover:border-[#bda3fa]/45 hover:bg-[#bda3fa]/10 hover:text-[#eee7ff] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start justify-between gap-4 px-2 pb-1 pt-3 sm:flex-row sm:items-center">
              <p className="text-xs text-white/40">
                {question.length}/2000 · The more context you give, the better
              </p>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#bda3fa] px-6 py-3.5 text-sm font-bold text-[#171321] shadow-[0_8px_22px_rgba(189,163,250,.2)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_30px_rgba(189,163,250,.3)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                Ask MovieRecom
                <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </form>
        </motion.section>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-6 max-w-4xl rounded-[1.5rem] border border-[#bda3fa]/25 bg-[#bda3fa]/10 p-5"
              aria-live="polite"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#bda3fa]/15 text-[#d9c9ff]">
                  <Loader2 size={19} className="animate-spin" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#eee7ff]">{loadingMessage}</p>
                  <p className="mt-1 text-xs text-white/45">Your response is on its way.</p>
                </div>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full w-1/3 rounded-full bg-[#bda3fa]"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-6 flex max-w-4xl items-start gap-3 rounded-[1.5rem] border border-[#ff8c7f]/30 bg-[#ff6b5b]/10 p-5 text-[#ffb0a7]"
              role="alert"
            >
              <span className="mt-0.5 text-lg">!</span>
              <div>
                <p className="text-sm font-semibold">Request not completed</p>
                <p className="mt-1 text-sm leading-6 text-[#ffd0ca]">{error}</p>
              </div>
            </motion.div>
          )}

          {answer && !loading && (
            <motion.section
              key="answer"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#111827] shadow-[0_24px_70px_rgba(8,5,20,.3)]"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#bda3fa] text-[#171321]">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Your story note</p>
                  <p className="mt-0.5 text-xs text-white/45">A thoughtful answer for your watchlist</p>
                </div>
                <CheckCircle2 size={17} className="ml-auto text-[#79d99a]" />
              </div>

              <div
                className="px-5 py-6 text-[15px] leading-8 text-[#d6d9e3] sm:px-7 sm:py-8
                  [&_h1]:mb-5 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-white
                  [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-white
                  [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-[#c7b2ff]
                  [&_p]:mb-5 [&_p:last-child]:mb-0
                  [&_strong]:font-semibold [&_strong]:text-[#c7b2ff]
                  [&_em]:font-medium [&_em]:text-[#bda3fa]
                  [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6
                  [&_li]:mb-2 [&_li]:pl-2 [&_li::marker]:text-[#bda3fa]
                  [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[#bda3fa] [&_blockquote]:pl-5 [&_blockquote]:text-white/60
                  [&_code]:rounded-md [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-1 [&_code]:text-[#c7b2ff]
                  [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/30 [&_pre]:p-4
                  [&_hr]:my-8 [&_hr]:border-white/10"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <section className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: Film, label: "Film notes", detail: "Plots, endings & themes", color: "text-[#ff9a70]" },
            { icon: Tv, label: "Series worlds", detail: "Characters & watch order", color: "text-[#f6cf69]" },
            { icon: Star, label: "Personal picks", detail: "Ideas for your next watch", color: "text-[#bda3fa]" },
          ].map(({ icon: Icon, label, detail, color }) => (
            <div key={label} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]">
              <Icon size={20} className={`mb-4 ${color}`} />
              <p className="text-sm font-semibold">{label}</p>
              <p className="mt-1 text-xs text-white/40">{detail}</p>
            </div>
          ))}
        </section>

        <footer className="mt-12 flex items-center justify-center gap-2 text-xs text-white/35">
          MovieRecom · Serverless AI Playground
          <ArrowUpRight size={13} />
        </footer>
      </div>
    </main>
  );
}
