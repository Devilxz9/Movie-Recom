"use client"
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import RemoveSavedMovies from "../components/RemoveButton";


export default function Page() {
  // const session = await getServerSession(authOptions)
  const [movies, setMovies] = useState([])
useEffect(() => {
  const fetchMovies = async()=>{
    try {
      const res = await fetch("/api/get-saved-movies");
      const data = await res.json()
      console.log("movies",data)
      setMovies(data)
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  }

    fetchMovies()
}, []);



  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="relative isolate min-h-screen">
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(192,38,211,0.24),_transparent_55%)]" />
        <div className="absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-700/20 blur-3xl" />
        <div className="absolute right-8 top-44 -z-10 h-72 w-72 rounded-full bg-purple-700/10 blur-3xl" />
        <div className="absolute left-8 top-56 -z-10 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <section className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_90px_rgba(168,85,247,0.16)] backdrop-blur-2xl sm:p-6">
              <div className="rounded-[1.75rem] border border-fuchsia-400/15 bg-gradient-to-b from-fuchsia-500/10 via-black/55 to-black/80 p-6 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-fuchsia-100">
                      My Saved List
                    </div>

                    <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                      Your personal movie shelf.
                    </h1>

                    <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                      Every title you saved lives here in the same cinematic layout as your recommendation feed.
                    </p>
                  </div>

                  <div className="inline-flex h-fit w-fit self-center gap-5 items-center rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100 sm:gap-6">
                  <span>
                    {movies.length} saved
                  </span>
                  <span><button
          type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Logout
          </button></span>
                    
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            {movies.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl">
                <p className="text-lg font-medium text-white">
                  No saved movies yet.
                </p>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                  Save a few titles from the recommendation page and they will appear here in a Netflix-style grid.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-fuchsia-300/80">
                      Saved Collection
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Movies
                    </h2>
                  </div>
                  <div className="rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-3 py-1 text-sm text-fuchsia-100">
                    {movies.length} picks
                  </div>
                </div>

                <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                  {movies.map((movie: any) => (
                    <div
                      key={movie.id}
                      className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0b0f] shadow-[0_24px_70px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/25 hover:shadow-[0_30px_80px_rgba(20,20,30,0.55)]"
                    >
                      <div className="border-b border-white/8 bg-gradient-to-br from-zinc-900 via-[#15131c] to-fuchsia-950/30 p-4">
                        <div className="flex h-64 items-center justify-center overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] ring-1 ring-white/10 sm:h-72">
                          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(192,38,211,0.12),_transparent_62%)] p-3">
                            {movie.image ? (
                              <img
                                src={movie.image}
                                alt={movie.title}
                                className="h-full w-full rounded-[1rem] object-contain object-center transition duration-300 group-hover:scale-[1.02]"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center rounded-[1rem] border border-dashed border-white/10 bg-black/20 text-sm text-zinc-500">
                                No Image
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 bg-[linear-gradient(180deg,rgba(12,12,16,0.96),rgba(10,10,14,1))] p-6">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold leading-7 text-white">
                            {movie.title}
                          </h3>
                          <div className="shrink-0 rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-fuchsia-100">
                            {movie.type || "Movie"}
                          </div>
                          <RemoveSavedMovies id={movie.id} />
                        </div>

                       
                      </div>
                     
                    </div>
                  ))}
                  
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
