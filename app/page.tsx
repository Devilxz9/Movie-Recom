import Link from "next/link";
import Navbar from "./components/Navbar";

const featuredMovies = [
  { title: "Midnight Orbit", genre: "Sci-Fi Thriller", score: "9.2" },
  { title: "Velvet Shadows", genre: "Neo-Noir Drama", score: "8.8" },
  { title: "Neon Kingdom", genre: "Fantasy Adventure", score: "9.0" },
];

const picks = [
  "AI-powered suggestions tuned to your mood",
  "Curated lists for weekend binges and late-night rewatches",
  "Fast discovery across action, anime, horror, romance, and more",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative isolate">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.35),_transparent_35%),radial-gradient(circle_at_80%_30%,_rgba(126,34,206,0.28),_transparent_25%),linear-gradient(180deg,_#14051f_0%,_#050308_55%,_#000000_100%)]" />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-700/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
         

          <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100 backdrop-blur">
                Your next favorite movie starts here
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Find what to watch without wasting the night.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
                Movie recom helps you discover films that actually match your
                vibe, from dark thrillers to comfort rewatch classics.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="rounded-full bg-fuchsia-500 px-7 py-3 text-center text-sm font-medium text-white transition hover:bg-fuchsia-400"
                >
                  Explore recommendations
                </Link>
                <a
                  href="#featured"
                  className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-center text-sm font-medium text-white transition hover:border-fuchsia-300/50 hover:bg-white/10"
                >
                  See trending picks
                </a>
              </div>

              <div
                id="why"
                className="mt-12 grid gap-4 text-sm text-zinc-300 sm:grid-cols-3"
              >
                {picks.map((pick) => (
                  <div
                    key={pick}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    {pick}
                  </div>
                ))}
              </div>
            </div>

            <div
              id="featured"
              className="relative rounded-[2rem] border border-fuchsia-400/20 bg-white/5 p-4 shadow-[0_0_80px_rgba(168,85,247,0.18)] backdrop-blur-xl"
            >
              <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/90 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm text-fuchsia-300">Tonight&apos;s lineup</p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      Handpicked for you
                    </h2>
                  </div>
                  <div className="rounded-full bg-fuchsia-500/15 px-3 py-1 text-xs text-fuchsia-200">
                    Live picks
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {featuredMovies.map((movie, index) => (
                    <article
                      key={movie.title}
                      className="rounded-2xl border border-white/8 bg-gradient-to-r from-white/8 to-fuchsia-500/10 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                            Pick {index + 1}
                          </p>
                          <h3 className="mt-2 text-xl font-medium text-white">
                            {movie.title}
                          </h3>
                          <p className="mt-1 text-sm text-zinc-300">
                            {movie.genre}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-black/40 px-3 py-2 text-right">
                          <p className="text-xs text-zinc-400">Match</p>
                          <p className="text-lg font-semibold text-fuchsia-300">
                            {movie.score}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div
                  id="discover"
                  className="mt-5 rounded-2xl border border-fuchsia-400/15 bg-fuchsia-500/10 p-5"
                >
                  <p className="text-sm text-fuchsia-200">Quick mood filter</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {["Dark", "Feel-good", "Mind-bending", "Romantic"].map(
                      (mood) => (
                        <span
                          key={mood}
                          className="rounded-full border border-fuchsia-300/25 bg-black/30 px-4 py-2 text-sm text-zinc-100"
                        >
                          {mood}
                        </span>
                      )
                    )}
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
