"use client"

import { useState } from "react"

type MoviePayload = {
    title: string
    image?: string | null
    type: string
    tmdbId?: number
}

export default function SaveButton({ movie }: { movie: MoviePayload }) {
    const [loading, setLoading] = useState(false);
    const [isSaved, setisSaved] = useState(false)

    const handleSave = async () => {
        try {
            setLoading(true)
            await fetch("/api/save-movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: movie.title,
                    image: movie.image,
                    type: movie.type,
                    tmdbId: movie.tmdbId
                }),
            });
            // const data = await res.json()
            setisSaved(true)

        } catch (error) {
            console.log("error saving movie", error);

        } finally {
            setLoading(false)
        }
    };

    return (
        <button
            onClick={handleSave}
            disabled={loading || isSaved}
            aria-label={isSaved ? "Saved" : "Save movie"}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-bold transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-75 ${isSaved ? "border-[#bda3fa] bg-[#f0eafa] text-[#6d4bd7]" : "border-[#4f8dff] bg-[#4f8dff] text-[#10182c] hover:bg-[#79aaff]"}`}
        >
            <svg className={`h-3.5 w-3.5 transition-transform ${isSaved ? "scale-110" : ""}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 2.25A1.25 1.25 0 0 1 5.25 1h5.5A1.25 1.25 0 0 1 12 2.25v12l-4-2.5-4 2.5v-12Z" stroke="currentColor" strokeWidth="1.25" />
            </svg>
            {loading ? "Saving..." : isSaved ? "Saved" : "Save"}
        </button>
    )
}
