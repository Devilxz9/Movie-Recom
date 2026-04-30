"use client"

import React from 'react'
import { useState } from 'react'

export default function GetTrailer({tmdbId,type}:{tmdbId:number, type: "movie" | "tv" }) {
    const [trailerUrl, settrailerUrl] = useState("")
    const [loading, setloading] = useState(false)

    const getTrailer = async() => {
        try {
            setloading(true)
            const res = await fetch(`api/trailer?id=${tmdbId}&type=${type}`) //send id
            const data = await res.json()

            //convert key we recived from res to youtube embaded link
            settrailerUrl(`https://www.youtube.com/embed/${data.key}`)
            setloading(false)

        } catch (error) {
            console.log("frontend trailer fetching error", error)
        }
    }

     return (
    <div className="mt-2">

  
      {loading === true ? 
      
      <button
        className="inline-flex h-11 items-center justify-center rounded-2xl border border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-fuchsia-400 px-5 text-sm font-semibold capitalize text-white shadow-[0_18px_45px_rgba(168,85,247,0.28)] transition duration-300 hover:-translate-y-0.5 hover:from-fuchsia-400 hover:via-purple-400 hover:to-fuchsia-300 hover:shadow-[0_24px_55px_rgba(168,85,247,0.36)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        loading
      </button>:
      <button
        onClick={getTrailer}
        className="inline-flex h-11 items-center justify-center rounded-2xl border border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-fuchsia-400 px-5 text-sm font-semibold capitalize text-white shadow-[0_18px_45px_rgba(168,85,247,0.28)] transition duration-300 hover:-translate-y-0.5 hover:from-fuchsia-400 hover:via-purple-400 hover:to-fuchsia-300 hover:shadow-[0_24px_55px_rgba(168,85,247,0.36)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        Watch Trailer
      </button>}

      {/* 🎥 VIDEO */}
      {trailerUrl && (
        <iframe
          className="mt-3"
          width="100%"
          height="250"
          src={trailerUrl}
          allowFullScreen
        />
      )}

    </div>
  )
}