"use client"

import { useState } from "react";

export default function DisLikebutton({movie}: any) {

    const [loading, setloading] = useState(false)
    const [disliked, setdisLiked] = useState(false)

    const handleLike = async () => {
        try {

            setloading(true)
            const res = await fetch("/api/reactions", {
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
        className={`flex items-center gap-2 rounded-2xl p-10 border px-4 py-2 h-12 text-sm ${
            disliked 
            ? "border-green-400/30 bg-green-500/10 text-green-300"  // liked state
            : "border-fuchsia-300/20 bg-fuchsia-500/10 text-fuchsia-100"  // default
        }`}
    >
        {loading ? "Saving..." : disliked ? "👍 Disliked" : "Dislike"}
    </button>
        )
    }