"use client"

import { useState } from "react";

export default function Likebutton({movie}: any) {

    const [loading, setloading] = useState(false)
    const [liked, setLiked] = useState(false)

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
                    reaction:"like"

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
        disabled={loading || liked}
        className={`flex items-center gap-2 rounded-2xl p-10 border px-4 py-2 h-12 text-sm ${
            liked 
            ? "border-green-400/30 bg-green-500/10 text-green-300"  // liked state
            : "border-fuchsia-300/20 bg-fuchsia-500/10 text-fuchsia-100"  // default
        }`}
    >
        {loading ? "Saving..." : liked ? "👍 Liked" : "Like"}
    </button>
        )
    }