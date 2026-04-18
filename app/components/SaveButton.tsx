"use client"

import { useState } from "react"


export default function SaveButton({movie}:any){
    const [loading, setLoading] = useState(false);

    const handleSave = async ()=>{
        try {
            setLoading(true)
            await fetch("/api/save-movie",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title:movie.title,
                    image:movie.image,
                    type:"show"
                }),
            });
        } catch (error) {
            console.log("error saving movie", error);

        }finally{
            setLoading(false)
        }
    };

    return(
        <button
            onClick={handleSave}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-fuchsia-400 px-5 text-sm font-semibold capitalize text-white shadow-[0_18px_45px_rgba(168,85,247,0.28)] transition duration-300 hover:-translate-y-0.5 hover:from-fuchsia-400 hover:via-purple-400 hover:to-fuchsia-300 hover:shadow-[0_24px_55px_rgba(168,85,247,0.36)] disabled:cursor-not-allowed disabled:opacity-70"
        >
            {loading? "saving...": "save"}
        </button>
    )
}
