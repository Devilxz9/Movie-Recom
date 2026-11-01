"use client"

import { useState } from "react";

type MoviePayload = {
    title: string
    image?: string | null
    type: string
    tmdbId?: number
}

export default function DisLikebutton({movie}: { movie: MoviePayload }) {

    const [loading, setloading] = useState(false)
    const [disliked, setdisLiked] = useState(false)

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
                    reaction:"dislike"

                }),
            })
            if (!response.ok) {
                throw new Error("Unable to save reaction")
            }
            setdisLiked(true)
            } catch (error) {
                console.log("error liking movie", error);
            }finally{
                setloading(false)
            }
        }
    return (
            <button 
        onClick={handleLike} 
        disabled={loading || disliked}
        title="Dislike"
        aria-label="Dislike"
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition hover:-translate-y-0.5 ${
            disliked 
            ? "border-[#ffb0a7] bg-[#fff0ee] text-[#c64e42]"
            : "border-[#ded4e7] bg-[#faf8ff] text-[#766b7d] hover:border-[#ffb0a7] hover:text-[#c64e42]"
        }`}
    >
        <span aria-hidden="true">↓</span>
    </button>
        )
    }