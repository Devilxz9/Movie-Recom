"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DeleteReaction({ id, title }: { id: string, title: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setLoading(true)
        try {
            await fetch("/api/reactions", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title })
            })
            router.refresh() // refreshes server component to show updated list
        } catch (error) {
            console.log("error deleting reaction", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
        >
            {loading ? "Removing..." : "Remove"}
        </button>
    )
}