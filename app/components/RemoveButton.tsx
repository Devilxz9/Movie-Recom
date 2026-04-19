"use client"
import { useState } from "react";

export default function RemoveSavedMovies({ id }: { id: string }) {


    const handleRemove = async () => {
        try {
            const res = await fetch("/api/remove-movie-api", {
                method: "DELETE",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ id })
            });

            console.log("removed")
            // 🔁 optional: refresh UI
            window.location.reload();
        } catch (error) {
            console.log("movie remove error:", error)
        }
    }


    return (
        <button
            onClick={handleRemove}
            className="shrink-0 rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-fuchsia-100"
        > Remove
        </button>
    )
}