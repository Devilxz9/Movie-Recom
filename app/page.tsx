"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const trending = [
  {
    title: "Dune: Part Two",
    year: "2024",
    genre: "Sci-fi · Drama",
    rating: "8.7",
    image: "https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    title: "Past Lives",
    year: "2023",
    genre: "Romance · Drama",
    rating: "7.8",
    image: "https://image.tmdb.org/t/p/w780/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg",
  },
  {
    title: "The Holdovers",
    year: "2023",
    genre: "Comedy · Drama",
    rating: "7.9",
    image: "https://image.tmdb.org/t/p/w780/VHSzNBTwxV8vh7wylo7O9CLdac.jpg",
  },
  {
    title: "Oppenheimer",
    year: "2023",
    genre: "Biography · Drama",
    rating: "8.6",
    image: "https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  },
  {
    title: "The Wild Robot",
    year: "2024",
    genre: "Animation · Family",
    rating: "8.3",
    image: "https://image.tmdb.org/t/p/w780/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
  },
];

function BookmarkIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none">
      <path d="M4 2.25A1.25 1.25 0 0 1 5.25 1h5.5A1.25 1.25 0 0 1 12 2.25v12l-4-2.5-4 2.5v-12Z" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f3efff] text-[#171321]">
      <section className="relative isolate min-h-[700px] overflow-hidden bg-[#171321] text-white sm:min-h-[760px]">
        <div className="absolute inset-0 -z-20 bg-[url('https://image.tmdb.org/t/p/original/5a4JdoFwll5DRtKMe7JLuGQ9yJm.jpg')] bg-cover bg-[center_30%]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(23,19,33,.98)_0%,rgba(23,19,33,.86)_35%,rgba(23,19,33,.38)_72%,rgba(23,19,33,.72)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#171321_0%,transparent_38%,rgba(23,19,33,.22)_100%)]" />

        <div className="mx-auto flex min-h-[700px] max-w-7xl items-end px-5 pb-20 pt-32 sm:min-h-[760px] sm:px-8 sm:pb-24 lg:px-12">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#bda3fa]"
            >
              <span className="h-px w-9 bg-[#4f8dff]" />
              The film spotlight
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.65 }}
              className="max-w-4xl text-[clamp(3.2rem,7.5vw,7.2rem)] font-semibold leading-[0.91] tracking-[-0.075em]"
            >
              Every film has a story.{" "}
              <span className="text-[#bda3fa]">Find the ones that stay with you.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.6 }}
              className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg"
            >
              Explore films worth your time, discover stories beyond the mainstream, and find your next favourite through recommendations shaped around your taste.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link href="#trending" className="group inline-flex items-center gap-4 rounded-full bg-[#4f8dff] px-6 py-3.5 text-sm font-semibold text-[#10182c] transition hover:-translate-y-0.5 hover:bg-[#79aaff]">
                Explore movies <span className="text-lg transition-transform group-hover:translate-x-1">↗</span>
              </Link>
              <Link href="/recommend" className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/15">
                Find my next film <span className="text-[#bda3fa]">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="trending" className="relative bg-[#f3efff] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#6d4bd7]">
                <span className="h-px w-8 bg-[#ff6b5b]" /> Trending this week
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-none tracking-[-0.065em] sm:text-6xl">In the conversation.</h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-[#766b7d]">
                The films everyone&apos;s watching, rating, and talking about right now.
              </p>
            </div>
            <Link href="/recommend" className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-[#6d4bd7] transition hover:text-[#171321] sm:inline-flex">
              View all trending <span>↗</span>
            </Link>
          </div>

          <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {trending.map((movie, index) => (
              <motion.article
                key={movie.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="w-[184px] shrink-0 snap-start sm:w-[210px]"
              >
                <div className="group relative aspect-[2/3] overflow-hidden rounded-[1.25rem] bg-[#dcd4ed] shadow-[0_16px_30px_rgba(54,36,90,.12)]">
                  <Image src={movie.image} alt={`${movie.title} poster`} fill sizes="(max-width: 640px) 184px, 210px" className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171321]/70 via-transparent to-transparent" />
                  <button type="button" aria-label={`Bookmark ${movie.title}`} className="absolute right-3 top-3 rounded-full border border-white/25 bg-[#171321]/50 p-2 text-white backdrop-blur-md transition hover:bg-[#4f8dff] hover:text-[#10182c]">
                    <BookmarkIcon />
                  </button>
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[#171321]">★ {movie.rating}</span>
                </div>
                <h3 className="mt-4 truncate text-base font-semibold tracking-[-0.02em]">{movie.title}</h3>
                <p className="mt-1 text-xs text-[#766b7d]">{movie.year} <span className="px-1 text-[#c0b5ca]">·</span> {movie.genre}</p>
              </motion.article>
            ))}
          </div>
          <Link href="/recommend" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#6d4bd7] sm:hidden">View all trending <span>↗</span></Link>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#171321] px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#6d4bd7]/40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-8rem] left-1/3 h-56 w-56 rounded-full bg-[#4f8dff]/25 blur-3xl" />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#bda3fa]">Made for your taste</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[-0.065em] sm:text-6xl">Skip the scroll. Find your next great film.</h2>
            </div>
            <Link href="/recommend" className="inline-flex w-fit shrink-0 items-center gap-4 rounded-full bg-[#bda3fa] px-6 py-3.5 text-sm font-semibold text-[#171321] transition hover:-translate-y-0.5 hover:bg-white">
              Get recommendations <span className="text-lg">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
