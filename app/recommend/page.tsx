"use client"

import { useEffect, useState } from "react"
import SaveButton from "../components/SaveButton"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


export default function RecommandPage() {
    const [input, setInput] = useState("")
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const {data:session} =  useSession()
    const router = useRouter()

    useEffect(() => {
         if(!session){
        router.push("/login")

    }
    
    }, [session, router])
    

    const GetRecommendation = async () => {
        if (!input) return
        setLoading(true)

        try {
            const res = await fetch("/api/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ preferences: input }),
            })

            const result = await res.json()
            setData(result)
        } catch (error) {
            console.log("res error on ai response on frontend", error)
        } finally{
            setLoading(false)
        }
        
    }

    return (
        <main className="min-h-screen overflow-hidden bg-black text-white">
            <div className="relative isolate min-h-screen">
                <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(192,38,211,0.24),_transparent_55%)]" />
                <div className="absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-700/20 blur-3xl" />
                <div className="absolute right-8 top-44 -z-10 h-72 w-72 rounded-full bg-purple-700/10 blur-3xl" />
                <div className="absolute left-8 top-56 -z-10 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

                <section className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-24">
                    <div className="mx-auto w-full max-w-4xl">
                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_90px_rgba(168,85,247,0.16)] backdrop-blur-2xl sm:p-6">
                            <div className="rounded-[1.75rem] border border-fuchsia-400/15 bg-gradient-to-b from-fuchsia-500/10 via-black/55 to-black/80 p-6 sm:p-8">
                                <div className="mx-auto max-w-2xl text-center">
                                    <div className="inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-fuchsia-100">
                                        Recommendation Studio
                                    </div>

                                    <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                        Tell us what you want to watch next.
                                    </h1>

                                    <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                                        Enter a vibe, genre, or watch preference and get a refined lineup below in a cinematic card layout.
                                    </p>
                                </div>

                                <div className="mx-auto mt-8 max-w-3xl">
                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <input
                                            type="text"
                                            placeholder="Try: emotional sci-fi, intense thrillers, slow-burn mystery"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            className="h-12   flex-1 rounded-2xl border border-white/10 bg-black/50 px-5 py-10 sm:py-7 text-2sm text-white outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400/60 focus:bg-black/65"
                                        />

                                        <button
                                            onClick={GetRecommendation}
                                            className="h-14 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-fuchsia-400 px-6 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(168,85,247,0.35)] transition hover:scale-[1.01] hover:from-fuchsia-400 hover:to-purple-400 disabled:cursor-not-allowed disabled:opacity-60"
                                            disabled={loading || !input}
                                        >
                                            {loading ? "Curating..." : "Get Recommendations"}
                                        </button>
                                    </div>

                                    {loading && (
                                        <div className="mt-4 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-3 text-center text-sm text-fuchsia-100">
                                            Building your personalized lineup...
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 space-y-10">
                        {!data && !loading && (
                            <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl">
                                <p className="text-lg font-medium text-white">
                                    Your recommendations will appear below the search panel.
                                </p>
                                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                                    Cards are already structured in a wide cinematic format with reserved image space so you can drop in Netflix-style artwork later.
                                </p>
                            </div>
                        )}

                        {data && (
                            <div className="space-y-12">
                                <div>
                                    <div>
                                    <div className="mb-5 flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.32em] text-fuchsia-300/80">
                                                Curated Picks
                                            </p>
                                            <h2 className="mt-2 text-2xl font-semibold text-white">
                                                Series
                                            </h2>
                                        </div>
                                        <div className="rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-3 py-1 text-sm text-fuchsia-100">
                                            {data.series?.length || 0} picks
                                        </div>
                                    </div>

                                    <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                                        {data.series?.map((show: any, index: number) => (
                                            <div
                                                key={index}
                                                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#09090c] shadow-[0_24px_70px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/25 hover:shadow-[0_30px_80px_rgba(20,20,30,0.55)]"
                                            >
                                                <div className="border-b border-white/8 bg-gradient-to-br from-zinc-900 via-[#14111c] to-purple-950/30 p-4">
                                                    <div className="flex h-64 items-center justify-center overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] ring-1 ring-white/10 sm:h-72">
                                                        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.14),_transparent_62%)] p-3">
                                                            {show.image ? (
                                                                <img
                                                                    src={show.image}
                                                                    alt={show.title}
                                                                    className="h-full w-full rounded-[1rem] object-contain object-center"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center rounded-[1rem] border border-dashed border-white/10 bg-black/20 text-sm text-zinc-500">
                                                                    No Image
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 bg-[linear-gradient(180deg,rgba(12,12,16,0.96),rgba(10,10,14,1))] p-6">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <h3 className="text-lg font-semibold leading-7 text-white">
                                                            {show.title}
                                                        </h3>
                                                        <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-200">
                                                            Series
                                                        </div>
                                                    </div>
                                                    <p className="text-sm leading-7 text-zinc-300">
                                                        {show.Released}
                                                    </p>
                                                    <p className="text-sm leading-7 text-zinc-300">
                                                        {show.description}
                                                    </p>
                                                    <SaveButton movie={show}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                    <div className="mb-5 flex items-center justify-between gap-4">
                                        <div>
                                            {/* <p className="text-xs uppercase tracking-[0.32em] text-fuchsia-300/80">
                                                Curated Picks
                                            </p> */}
                                            <h2 className="mt-2 py-5 text-2xl font-semibold text-white">
                                                Movies
                                            </h2>
                                        </div>
                                        <div className="rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-3 py-1 text-sm text-fuchsia-100">
                                            {data.movies?.length || 0} picks
                                        </div>
                                    </div>

                                    <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                                        {data.movies?.map((movie: any, index: number) => (
                                            <div
                                                key={index}
                                                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0b0f] shadow-[0_24px_70px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/25 hover:shadow-[0_30px_80px_rgba(20,20,30,0.55)]"
                                            >
                                                <div className="border-b border-white/8 bg-gradient-to-br from-zinc-900 via-[#15131c] to-fuchsia-950/30 p-4">
                                                    <div className="flex h-64 items-center justify-center overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] ring-1 ring-white/10 sm:h-72">
                                                        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(192,38,211,0.12),_transparent_62%)] p-3">
                                                            {movie.image ? (
                                                                <img
                                                                    src={movie.image}
                                                                    alt={movie.title}
                                                                    className="h-full w-full rounded-[1rem] object-contain object-center"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center rounded-[1rem] border border-dashed border-white/10 bg-black/20 text-sm text-zinc-500">
                                                                    No Image
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 bg-[linear-gradient(180deg,rgba(12,12,16,0.96),rgba(10,10,14,1))] p-6">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <h3 className="text-lg font-semibold leading-7 text-white">
                                                            {movie.title}
                                                        </h3>
                                                        <div className="shrink-0 rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-fuchsia-100">
                                                            Movie
                                                        </div>
                                                    </div>
                                                    <p className="text-sm leading-7 text-zinc-300">
                                                        {movie.Released}
                                                    </p>
                                                    <p className="text-sm leading-7 text-zinc-300">
                                                        {movie.description}
                                                    </p>
                                                    <SaveButton movie={movie}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* <div>
                                    <div className="mb-5 flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.32em] text-fuchsia-300/80">
                                                Curated Picks
                                            </p>
                                            <h2 className="mt-2 text-2xl font-semibold text-white">
                                                Series
                                            </h2>
                                        </div>
                                        <div className="rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-3 py-1 text-sm text-fuchsia-100">
                                            {data.series?.length || 0} picks
                                        </div>
                                    </div>

                                    <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                                        {data.series?.map((show: any, index: number) => (
                                            <div
                                                key={index}
                                                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#09090c] shadow-[0_24px_70px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/25 hover:shadow-[0_30px_80px_rgba(20,20,30,0.55)]"
                                            >
                                                <div className="border-b border-white/8 bg-gradient-to-br from-zinc-900 via-[#14111c] to-purple-950/30 p-4">
                                                    <div className="flex h-64 items-center justify-center overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] ring-1 ring-white/10 sm:h-72">
                                                        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.14),_transparent_62%)] p-3">
                                                            {show.image ? (
                                                                <img
                                                                    src={show.image}
                                                                    alt={show.title}
                                                                    className="h-full w-full rounded-[1rem] object-contain object-center"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center rounded-[1rem] border border-dashed border-white/10 bg-black/20 text-sm text-zinc-500">
                                                                    No Image
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 bg-[linear-gradient(180deg,rgba(12,12,16,0.96),rgba(10,10,14,1))] p-6">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <h3 className="text-lg font-semibold leading-7 text-white">
                                                            {show.title}
                                                        </h3>
                                                        <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-200">
                                                            Series
                                                        </div>
                                                    </div>
                                                    <p className="text-sm leading-7 text-zinc-300">
                                                        {show.Released}
                                                    </p>
                                                    <p className="text-sm leading-7 text-zinc-300">
                                                        {show.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}
