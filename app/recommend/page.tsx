"use client"

import { FormEvent, memo, useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import SaveButton from "../components/SaveButton"
import GetTrailer from "../components/GetTrailers"
import Likebutton from "../components/LikeButton"
import DisLikebutton from "../components/DislikeButton"

const loadingMessages = [
    "Understanding your movie preferences...",
    "Exploring films that match your description...",
    "Looking beyond the obvious choices...",
    "Finding stories worth your time...",
]

type Recommendation = {
    title: string
    description: string
    Released?: string
    image?: string | null
    tmdbId?: number
    runtime?: string
    genre?: string
    rating?: string | number
}

const MovieCard = memo(function MovieCard({ item, type, index }: { item: Recommendation; type: "movie" | "tv"; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
            className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#ded4e7] bg-white shadow-[0_14px_35px_rgba(54,36,90,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(54,36,90,.14)]"
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#e8dff0] sm:aspect-[2/3]">
                {item.image ? (
                    <Image src={item.image} alt={`${item.title} poster`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 ease-out group-hover:scale-105" />
                ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center text-sm text-[#766b7d]">Poster unavailable</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171321]/45 via-transparent to-transparent opacity-70" />
            </div>

            <div className="flex flex-1 flex-col p-3 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 text-sm font-semibold leading-tight tracking-[-0.03em] text-[#171321] sm:text-xl sm:tracking-[-0.04em]">{item.title}</h3>
                    <span className="shrink-0 rounded-full bg-[#f0eafa] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#6d4bd7] sm:px-2.5 sm:text-[10px] sm:tracking-[0.16em]">
                        {type === "tv" ? "Series" : "Movie"}
                    </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] font-medium text-[#766b7d] sm:mt-3 sm:gap-x-2 sm:text-xs">
                    <span>{item.Released || "Release year unavailable"}</span>
                    {item.runtime && <><span className="text-[#c0b5ca]">·</span><span>{item.runtime}</span></>}
                    {item.genre && <><span className="text-[#c0b5ca]">·</span><span>{item.genre}</span></>}
                    {item.rating && <span className="ml-auto font-bold text-[#171321]">★ {item.rating}</span>}
                </div>

                <p className="mt-3 line-clamp-3 min-h-[3.75rem] text-xs leading-5 text-[#766b7d] sm:mt-4 sm:min-h-[4.5rem] sm:text-sm sm:leading-6">{item.description}</p>

                <div className="mt-auto pt-5">
                    <div className="flex items-center gap-2">
                        <SaveButton movie={{ ...item, type }} />
                        <div className="ml-auto flex items-center gap-1">
                            <Likebutton movie={{ ...item, type }} />
                            <DisLikebutton movie={{ ...item, type }} />
                        </div>
                    </div>
                    <GetTrailer tmdbId={item.tmdbId} type={type} />
                </div>
            </div>
        </motion.article>
    )
})

export default function RecommandPage() {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0])
    const [movies, setMovies] = useState<Recommendation[]>([])
    const [series, setSeries] = useState<Recommendation[]>([])
    const [seen, setSeen] = useState<string[]>([])
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        document.title = "Movie Recom - Recommendations"
        const mood = new URLSearchParams(window.location.search).get("mood")
        if (mood) setInput(mood)
    }, [])

    useEffect(() => {
        if (!loading) return
        const timer = window.setInterval(() => {
            setLoadingMessage((current) => loadingMessages[(loadingMessages.indexOf(current) + 1) % loadingMessages.length])
        }, 1700)
        return () => window.clearInterval(timer)
    }, [loading])

    const getRecommendation = async (event?: FormEvent) => {
        event?.preventDefault()
        if (!input.trim()) return
        setLoading(true)
        setMovies([])
        setSeries([])
        setSeen([])
        try {
            const res = await fetch("/api/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ preferences: input, seen: [] }),
            })
            if (!res.ok) throw new Error("Unable to load recommendations")
            const result = await res.json()
            setMovies(result.movies || [])
            setSeries(result.series || [])
            setSeen([...(result.movies || []), ...(result.series || [])].map((item: Recommendation) => item.title))
            setHasMore(true)
        } catch (error) {
            console.log("res error on ai response on frontend", error)
        } finally {
            setLoading(false)
        }
    }

    const loadMore = async () => {
        setLoadingMore(true)
        try {
            const res = await fetch("/api/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ preferences: input, seen }),
            })
            if (!res.ok) throw new Error("Unable to load more recommendations")
            const result = await res.json()
            setMovies((prev) => [...prev, ...(result.movies || [])])
            setSeries((prev) => [...prev, ...(result.series || [])])
            setSeen((prev) => [...prev, ...(result.movies || []), ...(result.series || [])].map((item: Recommendation) => item.title))
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoadingMore(false)
        }
    }

    const hasResults = movies.length > 0 || series.length > 0

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#211b32] text-white">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-35"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2400&q=80')" }}
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(30,24,49,.86)_0%,rgba(51,39,76,.72)_38%,rgba(246,242,255,.92)_100%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_50%_10%,rgba(224,211,255,.28),transparent_58%)]" />
            <section className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:px-12">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#dfd0ff]">
                        <span className="h-px w-8 bg-[#bda3fa]" /> Personalised film discovery <span className="h-px w-8 bg-[#bda3fa]" />
                    </p>
                    <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.075em] text-white drop-shadow-[0_0_24px_rgba(210,184,255,.45)] sm:text-7xl">Tell us what you&apos;re in the mood for.</h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
                        Describe the kind of film you&apos;re looking for. A genre, a feeling, a storyline, or even a movie you recently enjoyed. We&apos;ll find films worth your time.
                    </p>
                </div>

                <form onSubmit={getRecommendation} className="mx-auto mt-10 max-w-4xl rounded-[1.75rem] border border-[#d9c8f2]/35 bg-[#eee8fa]/65 p-3 shadow-[0_20px_65px_rgba(30,19,58,.32),0_0_30px_rgba(177,139,237,.14)] backdrop-blur-xl">
                    <textarea
                        suppressHydrationWarning
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        rows={3}
                        placeholder="e.g. I want a mind-bending thriller with unexpected twists, like Shutter Island..."
                        className="w-full resize-none rounded-[1.25rem] border border-[#d9c8f2]/45 bg-[#dcd2ef]/55 px-5 py-4 text-base leading-7 text-[#171321] outline-none placeholder:text-[#837595] transition focus:border-[#9a78ff] focus:bg-[#eee8fa]/75 focus:ring-4 focus:ring-[#bda3fa]/25"
                    />
                    <div className="flex flex-col items-start justify-between gap-4 px-2 pb-1 pt-3 sm:flex-row sm:items-center">
                        <p className="text-xs font-medium text-[#766b7d]">Be as specific or as spontaneous as you like.</p>
                        <button type="submit" disabled={loading || !input.trim()} className="group inline-flex items-center gap-3 rounded-full border border-[#bca3ff] bg-[#7651cf] px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(118,81,207,.3)] transition hover:-translate-y-0.5 hover:bg-[#8966e4] hover:shadow-[0_10px_28px_rgba(118,81,207,.45)] disabled:cursor-not-allowed disabled:opacity-50">
                            Find My Movies <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>
                    {loading && (
                        <motion.p key={loadingMessage} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="px-2 pb-2 text-sm font-medium text-[#6d4bd7]">
                            {loadingMessage}
                        </motion.p>
                    )}
                </form>

                {!hasResults && !loading && (
                    <div className="mx-auto mt-14 max-w-xl text-center">
                        <p className="text-2xl font-semibold tracking-[-0.04em] text-[#211b32]">Your next favourite is somewhere out there.</p>
                        <p className="mt-3 text-sm leading-6 text-[#5f536f]">Start with a feeling, a favourite director, or the kind of story you want to get lost in.</p>
                    </div>
                )}

                {hasResults && (
                    <div className="mt-16 space-y-14 text-[#211b32]">
                        {series.length > 0 && (
                            <section>
                                <div className="mb-6 flex items-end justify-between gap-4">
                                    <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6d4bd7]">Curated picks</p><h2 className="mt-2 text-4xl font-semibold tracking-[-0.06em]">Series</h2></div>
                                    <span className="text-sm font-medium text-[#a99dae]">{series.length} picks</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">{series.map((item, index) => <MovieCard key={`${item.title}-${index}`} item={item} type="tv" index={index} />)}</div>
                            </section>
                        )}
                        {movies.length > 0 && (
                            <section>
                                <div className="mb-6 flex items-end justify-between gap-4">
                                    <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6d4bd7]">Curated picks</p><h2 className="mt-2 text-4xl font-semibold tracking-[-0.06em]">Movies</h2></div>
                                    <span className="text-sm font-medium text-[#a99dae]">{movies.length} picks</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">{movies.map((item, index) => <MovieCard key={`${item.title}-${index}`} item={item} type="movie" index={index} />)}</div>
                            </section>
                        )}
                        {hasMore && (
                            <div className="flex justify-center">
                                <button onClick={loadMore} disabled={loadingMore} className="rounded-full border border-[#cfc1dc] bg-white px-6 py-3 text-sm font-bold text-[#6d4bd7] transition hover:border-[#6d4bd7] disabled:opacity-50">
                                    {loadingMore ? "Finding more..." : "Load more films →"}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </main>
    )
}
