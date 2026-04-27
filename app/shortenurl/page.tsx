"use client"
import { useState } from "react"

const shortenUrl = () => {
    const [url, seturl] = useState("")
    const [shortUrl, setshortUrl] = useState("")

    const handleShorten = async () => {
        try {
            const res = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })


            });

            const data = await res.json()
            setshortUrl(data.shortUrl)

        } catch (error) {
            console.log(error, "frontend url error")
        }

    }
    return (
         <div className="min-h-screen bg-black flex items-center justify-center p-4">
  <div className="bg-[#111111] border border-purple-900 shadow-2xl shadow-purple-900/20 rounded-2xl p-8 w-full max-w-md text-center">
    
    <h1 className="text-3xl font-bold text-white mb-8 tracking-wide">
      URL <span className="text-purple-500">Shortener</span>
    </h1>

    <div className="space-y-5">
      <input
        type="text"
        placeholder="Enter long URL..."
        value={url}
        onChange={(e) => seturl(e.target.value)}
        className="w-full bg-black text-gray-200 border border-gray-800 rounded-lg p-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-600"
      />

      <button 
        onClick={handleShorten} 
        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
      >
        Shorten Link
      </button>
    </div>

    {shortUrl && (
      <div className="mt-8 p-5 bg-black border border-purple-900 rounded-xl">
        <p className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-widest">
          Ready to share
        </p>
        <a 
          href={shortUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 font-medium break-all transition-colors text-lg"
        >
          {shortUrl}
        </a>
      </div>
    )}
    
  </div>
</div>
    )
}

export default shortenUrl