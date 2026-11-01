"use client"

import { useState } from "react"

export default function GetTrailer({ tmdbId, type }: { tmdbId?: number; type: "movie" | "tv" }) {
    const [trailerUrl, setTrailerUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const getTrailer = async () => {
        if (!tmdbId) return
        try {
            setLoading(true)
            setError(false)
            const res = await fetch(`/api/trailer?id=${tmdbId}&type=${type}`)
            const data = await res.json()
            if (!res.ok || !data.key) {
                setError(true)
                return
            }
            setTrailerUrl(`https://www.youtube.com/embed/${data.key}?autoplay=1`)
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
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
            {trailerUrl && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171321]/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Movie trailer">
                    <div className="relative w-full max-w-3xl overflow-hidden rounded-[1.25rem] bg-[#171321] p-2 shadow-2xl">
                        <button type="button" onClick={() => setTrailerUrl("")} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171321] transition hover:bg-white" aria-label="Close trailer">×</button>
                        <div className="aspect-video overflow-hidden rounded-[.85rem]">
                            <iframe className="h-full w-full" src={trailerUrl} title="Movie trailer" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
