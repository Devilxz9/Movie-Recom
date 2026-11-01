"use client"

import { useState } from "react";

type MoviePayload = {
    title: string
    image?: string | null
    type: string
    tmdbId?: number
}

export default function Likebutton({movie}: { movie: MoviePayload }) {

    const [loading, setloading] = useState(false)
    const [liked, setLiked] = useState(false)

    const handleLike = async () => {
        try {

            setloading(true)
            const response = await fetch("/api/reactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: movie.title,
                    image: movie.image,
                    type: movie.type,
                    tmdbId: movie.tmdbId,
                    reaction:"like"

                }),
            })
            if (!response.ok) {
                throw new Error("Unable to save reaction")
            }
            setLiked(true)
            } catch (error) {
                console.log("error liking movie", error);
            }finally{
                setloading(false)
            }
        }
    return (
            <button 
        onClick={handleLike} 
        disabled={loading || liked}
        title="Like"
        aria-label="Like"
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition hover:-translate-y-0.5 ${
            liked 
            ? "border-[#91d5b5] bg-[#e6f7ed] text-[#26734c]"
            : "border-[#ded4e7] bg-[#faf8ff] text-[#766b7d] hover:border-[#91d5b5] hover:text-[#26734c]"
        }`}
    >
        <span aria-hidden="true">↑</span>
    </button>
        )
    }