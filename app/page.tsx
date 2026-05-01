"use client"
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { allMovies } from "@/data/movies";
import { signOut } from "next-auth/react";

const picks = [
  "AI-powered suggestions tuned to your mood",
  "Curated lists for weekend binges and late-night rewatches",
  "Fast discovery across action, anime, horror, romance, and more",
];

export default function Home() {
  const [featuredMovies, setfeaturedMovies] = useState(allMovies.slice(0, 3));
  
  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...allMovies].sort(() => 0.5 - Math.random());
      setfeaturedMovies(shuffled.slice(0, 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white font-sans selection:bg-fuchsia-500/30">
      <section className="relative isolate">
        {/* Cinematic Background Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.25),_transparent_50%),radial-gradient(ellipse_at_80%_20%,_rgba(126,34,206,0.15),_transparent_40%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-fuchsia-600/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
          <div className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            
            {/* Left Content */}
            <div className="max-w-2xl z-10">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/5 px-4 py-2 text-xs font-medium uppercase tracking-widest text-fuchsia-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
                Your Next Watch Awaits
              </div>
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent pb-2">
                Find what to watch.<br /> Stop wasting the night.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Movie recom helps you discover films that actually match your
                vibe, from dark thrillers to comfort rewatch classics. Experience cinema tailored to you.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/recommend"
                  className="group relative flex items-center justify-center gap-2 rounded-full bg-fuchsia-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-fuchsia-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  Explore Recommendations
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </Link>
                
              </div>

              <div id="why" className="mt-16 grid gap-4 text-sm text-zinc-400 sm:grid-cols-3">
                {picks.map((pick) => (
                  <div key={pick} className="rounded-xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.04]">
                    {pick}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Featured Movies */}
            <div id="featured" className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-b from-fuchsia-500/20 to-transparent opacity-50 blur-xl"></div>
              <div className="relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 p-6 shadow-2xl backdrop-blur-xl">
                
                <div className="flex items-center justify-between border-b border-white/5 pb-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-fuchsia-400">Tonight&apos;s Lineup</p>
                    <h2 className="mt-1 text-2xl font-semibold text-zinc-100">Handpicked for you</h2>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                    </span>
                    Live Updates
                  </div>
                </div>

                <div className="mt-6 min-h-[380px] space-y-3">
                  <AnimatePresence mode="popLayout">
                    {featuredMovies.map((movie, index) => (
                      <motion.article
                        layout
                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: -20 }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        key={movie.title}
                        className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
                      >
                        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-fuchsia-500 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                              Pick 0{index + 1}
                            </p>
                            <h3 className="mt-1 text-lg font-semibold text-zinc-100">
                              {movie.title}
                            </h3>
                            <p className="mt-0.5 text-xs text-zinc-400">
                              {movie.genre}
                            </p>
                          </div>
                          <div className="flex flex-col items-end justify-center rounded-lg bg-black/50 px-3 py-2 border border-white/5">
                            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Match</p>
                            <p className="text-lg font-bold text-fuchsia-400">
                              {movie.score}
                            </p>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>

                <div id="discover" className="mt-6 rounded-xl border border-fuchsia-500/10 bg-fuchsia-500/5 p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-fuchsia-300">Quick Mood Filter</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Dark", "Feel-good", "Mind-bending", "Romantic"].map((mood) => (
                      <button
                        key={mood}
                        className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-fuchsia-500/50 hover:text-white"
                      >
                        {mood}
                      </button>
                    ))}
                   
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}