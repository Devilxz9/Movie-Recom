"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

const trailerCache = new Map<string, string>()

export default function GetTrailer({ tmdbId, type }: { tmdbId?: number; type: "movie" | "tv" }) {
    const [trailerKey, setTrailerKey] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [maximized, setMaximized] = useState(false)
    const dialogRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!trailerKey) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setTrailerKey("")
        }
        const handleFullscreenChange = () => {
            setMaximized(Boolean(document.fullscreenElement))
        }
        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("fullscreenchange", handleFullscreenChange)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [trailerKey])

    const closeTrailer = () => {
        setTrailerKey("")
        setMaximized(false)
    }

    const getTrailer = async () => {
        if (!tmdbId || loading) return

        const cacheKey = `${type}:${tmdbId}`
        const cachedKey = trailerCache.get(cacheKey)
        if (cachedKey) {
            setTrailerKey(cachedKey)
            return
        }

        try {
            setLoading(true)
            setError(false)
            const res = await fetch(`/api/trailer?id=${tmdbId}&type=${type}`)
            const data = await res.json()
            if (!res.ok || !data.key) {
                setError(true)
                return
            }
            trailerCache.set(cacheKey, data.key)
            setTrailerKey(data.key)
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const toggleMaximized = async () => {
        if (!dialogRef.current) return
        if (document.fullscreenElement) {
            await document.exitFullscreen()
        } else {
            await dialogRef.current.requestFullscreen()
        }
        setMaximized(Boolean(document.fullscreenElement))
    }

    return (
        <>
            <button
                type="button"
                onClick={getTrailer}
                disabled={loading || !tmdbId}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#ded4e7] bg-[#faf8ff] px-4 py-2.5 text-xs font-bold text-[#6d4bd7] transition hover:border-[#bda3fa] hover:bg-[#f0eafa] disabled:cursor-not-allowed disabled:opacity-50"
            >
                <span aria-hidden="true">▶</span>{loading ? "Finding trailer..." : "Watch Trailer"}
            </button>
            {error && <p className="mt-2 text-center text-xs text-[#c64e42]">Trailer unavailable for this title.</p>}
            {trailerKey && typeof document !== "undefined" && createPortal(
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171321]/85 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Movie trailer"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeTrailer()
                    }}
                >
                    <div
                        ref={dialogRef}
                        className={`relative flex w-full flex-col overflow-hidden bg-[#171321] shadow-2xl ${maximized ? "h-full max-w-none rounded-none p-4" : "max-w-4xl rounded-[1.25rem] p-3"}`}
                    >
                        <div className="flex items-center justify-between px-2 pb-3 text-white">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Trailer</span>
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={toggleMaximized} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/20" aria-label={maximized ? "Exit fullscreen" : "Maximize trailer"}>{maximized ? "↙" : "↗"}</button>
                                <button type="button" onClick={closeTrailer} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl transition hover:bg-white/20" aria-label="Close trailer">×</button>
                            </div>
                        </div>
                        <div className={`relative min-h-0 w-full overflow-hidden rounded-[.85rem] bg-black ${maximized ? "flex-1" : "aspect-video"}`}>
                            <iframe
                                className="absolute inset-0 h-full w-full border-0"
                                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                                title="Movie trailer"
                                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
