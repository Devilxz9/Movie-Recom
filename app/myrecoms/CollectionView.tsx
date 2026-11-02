"use client"

import Link from "next/link"
import Image from "next/image"
import { memo, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GetTrailer from "../components/GetTrailers"

type SavedMovie = {
  id: string
  title: string
  image: string | null
  type: string
  tmdbId: number | null
  createdAt: string
}

type Filter = "all" | "movie" | "tv"

function BookmarkIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none"><path d="M4 2.25A1.25 1.25 0 0 1 5.25 1h5.5A1.25 1.25 0 0 1 12 2.25v12l-4-2.5-4 2.5v-12Z" stroke="currentColor" strokeWidth="1.25" /></svg>
}

function formatSavedDate(value: string) {
  const date = new Date(value)
  const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" })
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
}

const CollectionCard = memo(function CollectionCard({ movie, index, onRemove }: { movie: SavedMovie; index: number; onRemove: (movie: SavedMovie) => void }) {
  const type = movie.type === "tv" || movie.type === "series" ? "tv" : "movie"
  const detailsUrl = movie.tmdbId ? `https://www.themoviedb.org/${type}/${movie.tmdbId}` : `/recommend?mood=${encodeURIComponent(movie.title)}`

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 10 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#ded4e7] bg-white shadow-[0_14px_35px_rgba(54,36,90,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(54,36,90,.14)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#e8dff0] sm:aspect-[2/3]">
        {movie.image ? <Image src={movie.image} alt={`${movie.title} poster`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 ease-out group-hover:scale-105" /> : <div className="flex h-full items-center justify-center px-6 text-center text-sm text-[#766b7d]">Poster unavailable</div>}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171321]/45 via-transparent to-transparent opacity-70" />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-sm font-semibold leading-tight tracking-[-0.03em] text-[#171321] sm:text-xl sm:tracking-[-0.04em]">{movie.title}</h3>
          <span className="shrink-0 rounded-full bg-[#f0eafa] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#6d4bd7] sm:px-2.5 sm:text-[10px] sm:tracking-[0.16em]">{type === "tv" ? "Series" : "Movie"}</span>
        </div>
        <p className="mt-2 text-[10px] font-medium text-[#766b7d] sm:mt-3 sm:text-xs">Saved {formatSavedDate(movie.createdAt)}</p>
        <div className="mt-auto space-y-2 pt-5">
          <GetTrailer tmdbId={movie.tmdbId ?? undefined} type={type} />
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <a href={detailsUrl} target={movie.tmdbId ? "_blank" : undefined} rel={movie.tmdbId ? "noreferrer" : undefined} className="inline-flex items-center justify-center rounded-full border border-[#ded4e7] bg-[#faf8ff] px-3 py-2.5 text-xs font-bold text-[#6d4bd7] transition hover:border-[#bda3fa] hover:bg-[#f0eafa]">View Details</a>
            <button type="button" onClick={() => onRemove(movie)} aria-label={`Remove ${movie.title}`} className="inline-flex items-center justify-center rounded-full border border-[#ffb0a7]/50 px-3 text-[#c64e42] transition hover:bg-[#fff0ee]"><BookmarkIcon /></button>
          </div>
        </div>
      </div>
    </motion.article>
  )
})

export default function CollectionView({ movies: initialMovies }: { movies: SavedMovie[] }) {
  const [movies, setMovies] = useState(initialMovies)
  const [filter, setFilter] = useState<Filter>("all")
  const [query, setQuery] = useState("")
  const [pendingRemove, setPendingRemove] = useState<SavedMovie | null>(null)
  const [removing, setRemoving] = useState(false)
  const [error, setError] = useState("")

  const counts = useMemo(() => ({
    movies: movies.filter((movie) => movie.type !== "tv" && movie.type !== "series").length,
    series: movies.filter((movie) => movie.type === "tv" || movie.type === "series").length,
  }), [movies])

  const visibleMovies = useMemo(() => movies.filter((movie) => {
    const matchesFilter = filter === "all" || (filter === "tv" ? movie.type === "tv" || movie.type === "series" : movie.type !== "tv" && movie.type !== "series")
    return matchesFilter && movie.title.toLowerCase().includes(query.toLowerCase().trim())
  }), [filter, movies, query])

  const removeMovie = async () => {
    if (!pendingRemove) return
    setRemoving(true)
    setError("")
    try {
      const response = await fetch("/api/remove-movie-api", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: pendingRemove.id }) })
      if (!response.ok) throw new Error("Unable to remove this title.")
      setMovies((current) => current.filter((movie) => movie.id !== pendingRemove.id))
      setPendingRemove(null)
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Unable to remove this title.")
    } finally {
      setRemoving(false)
    }
  }

  const clearFilters = () => { setQuery(""); setFilter("all") }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#302744] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(221,205,255,.3),transparent_48%),linear-gradient(180deg,#302744_0%,#3b2e52_46%,#f0ebfb_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(189,163,250,.22),_transparent_62%)]" />
      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:px-12">
        <header className="flex flex-col gap-8 border-b border-white/20 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#dfd0ff]"><span className="h-px w-8 bg-[#bda3fa]" /> Your personal collection</p>
            <h1 className="mt-5 text-6xl font-semibold leading-[0.9] tracking-[-0.08em] text-white drop-shadow-[0_0_22px_rgba(210,184,255,.3)] sm:text-8xl">My Recoms</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">All the stories you&apos;ve saved, gathered in one place. Revisit your discoveries and keep track of what you want to watch next.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/65">
            <span><strong className="text-xl text-white">{movies.length}</strong> saved</span><span className="h-5 w-px bg-white/25" /><span>{counts.movies} movies</span><span>{counts.series} series</span>
          </div>
        </header>

        <div className="mt-8 flex flex-col gap-4 rounded-[1.25rem] border border-white/25 bg-[#eee8fa]/65 p-3 shadow-[0_18px_45px_rgba(25,16,46,.2)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1">
            {([["all", "All Saved"], ["movie", "Movies"], ["tv", "Series"]] as const).map(([value, label]) => <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${filter === value ? "bg-[#302744] text-white shadow-[0_5px_16px_rgba(48,39,68,.25)]" : "text-[#625575] hover:bg-white/60 hover:text-[#302744]"}`}>{label}</button>)}
          </div>
          <label className="flex min-w-0 items-center gap-3 rounded-full border border-[#d9c8f2]/55 bg-[#f5f1fc]/70 px-4 py-2.5 text-sm text-[#837595] sm:w-72">
            <span aria-hidden="true">⌕</span><input suppressHydrationWarning value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find something in your collection..." className="min-w-0 flex-1 bg-transparent text-[#171321] outline-none placeholder:text-[#7b6a83]" />
          </label>
        </div>

        <div className="mt-12 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6d4bd7]">Your collection, your next watch.</p><p className="mt-2 text-sm text-[#b9b1c4]">Every saved film is a possibility. Pick up where your curiosity left off.</p></div><span className="text-sm font-medium text-[#d3ccd8]">{visibleMovies.length} shown</span></div>

        {error && <p className="mt-5 rounded-xl bg-[#fff0ee] px-4 py-3 text-sm text-[#c64e42]">{error}</p>}
        {movies.length === 0 ? (
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#ded4e7] bg-[#171321] px-6 py-16 text-center text-white shadow-[0_18px_50px_rgba(54,36,90,.14)]"><div className="mx-auto flex h-16 w-12 rotate-[-8deg] items-center justify-center rounded-lg border border-[#bda3fa]/50 bg-[#6d4bd7]/30 text-2xl">✦</div><h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em]">Your collection is waiting.</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/65">When a film catches your attention, save it here. Your personal collection of stories worth watching starts with one discovery.</p><Link href="/recommend" className="mt-7 inline-flex rounded-full bg-[#4f8dff] px-6 py-3.5 text-sm font-bold text-[#10182c] transition hover:-translate-y-0.5 hover:bg-[#79aaff]">Discover Movies <span className="ml-2">→</span></Link></div>
        ) : visibleMovies.length === 0 ? (
          <div className="mt-8 rounded-[1.5rem] border border-dashed border-[#cfc1dc] bg-white/60 px-6 py-16 text-center"><h2 className="text-2xl font-semibold tracking-[-0.04em]">No matches in your collection.</h2><p className="mt-3 text-sm text-[#766b7d]">We couldn&apos;t find anything matching your search. Try another title or adjust your filters.</p><button type="button" onClick={clearFilters} className="mt-6 rounded-full bg-[#171321] px-5 py-3 text-sm font-bold text-white">Clear Filters</button></div>
        ) : (
          <motion.div layout className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">{visibleMovies.map((movie, index) => <CollectionCard key={movie.id} movie={movie} index={index} onRemove={setPendingRemove} />)}</AnimatePresence>
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {pendingRemove && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-center justify-center bg-[#171321]/55 p-5 backdrop-blur-sm"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm rounded-[1.5rem] bg-white p-6 shadow-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d4bd7]">Remove from collection?</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{pendingRemove.title}</h2><p className="mt-2 text-sm leading-6 text-[#766b7d]">This will remove the saved title from your personal collection.</p><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setPendingRemove(null)} className="rounded-full px-4 py-2.5 text-sm font-bold text-[#766b7d]">Cancel</button><button type="button" onClick={removeMovie} disabled={removing} className="rounded-full bg-[#ff6b5b] px-4 py-2.5 text-sm font-bold text-[#171321] disabled:opacity-50">{removing ? "Removing..." : "Remove"}</button></div></motion.div></motion.div>}
      </AnimatePresence>
    </main>
  )
}
