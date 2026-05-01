"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className=" top-0 z-50 w-full">

      {/* ── DESKTOP / TABLET NAV ── */}
      <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/6 bg-[#070309]/85 px-6 py-4 backdrop-blur-xl sm:mt-4 sm:rounded-2xl sm:border sm:border-fuchsia-400/15 sm:px-6 sm:shadow-[0_0_60px_rgba(139,58,220,0.15)]">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          {/* <div className="flex h-7 w-7 items-center justify-center rounded-md bg-fuchsia-500 shadow-[0_0_14px_rgba(217,70,239,0.5)] transition group-hover:bg-fuchsia-400">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L9.5 5.5H13L9.5 8.5L11 13L7 10.5L3 13L4.5 8.5L1 5.5H4.5L7 1Z" fill="white" />
            </svg>
          </div> */}
          <span className="text-md font-bold uppercase tracking-[0.22em] text-purple-300/90 transition group-hover:text-white">
            MovieRecom
          </span>
        </Link>

        {/* Desktop links + actions */}
        <div className="hidden items-center gap-2 sm:flex">

          {/* Nav link: Recommendations */}
          <Link
            href="/recommend"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/6 hover:text-zinc-100"
          >
            Recommendations
          </Link>

          {/* Nav link: My Recoms */}
          <Link
            href={session ? "/myrecoms" : "/login"}
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/6 hover:text-zinc-100"
          >
            My Recoms
          </Link>

          {/* Divider */}
          <div className="mx-1 h-4 w-px bg-white/10" />

          {/* Auth button */}
          {status === "unauthenticated" ? (
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(217,70,239,0.3)] transition hover:bg-fuchsia-400 hover:shadow-[0_0_32px_rgba(217,70,239,0.45)]"
            >
              {/* Google icon */}
              <svg className="h-3.5 w-3.5" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="white" fillOpacity=".9"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="white" fillOpacity=".75"/>
                <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="white" fillOpacity=".6"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="white" fillOpacity=".5"/>
              </svg>
              Sign in
            </button>
          ) : (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-5 py-2 text-sm font-medium text-zinc-300 transition hover:border-red-400/25 hover:bg-red-500/10 hover:text-red-400"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
                <path d="M5 7h8M9 4l3 3-3 3M5 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign out
            </button>
          )}
        </div>

        {/* Mobile: hamburger */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/4 text-zinc-300 transition hover:bg-white/8 sm:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      <div
        className={`mx-0 overflow-hidden border-b border-white/6 bg-[#070309]/95 backdrop-blur-xl transition-all duration-300 ease-in-out sm:hidden ${
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          <Link
            href="/recommend"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/6 hover:text-white"
          >
            <svg className="h-4 w-4 text-fuchsia-400" viewBox="0 0 16 16" fill="none">
              <path d="M8 1l2 4.5H15l-4 3 1.5 4.5L8 10.5 3.5 13 5 8.5l-4-3H6L8 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
            Recommendations
          </Link>

          <Link
            href={session ? "/myrecoms" : "/login"}
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/6 hover:text-white"
          >
            <svg className="h-4 w-4 text-fuchsia-400" viewBox="0 0 16 16" fill="none">
              <path d="M8 1a3 3 0 1 1 0 6A3 3 0 0 1 8 1zM2 14a6 6 0 0 1 12 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            My Recoms
          </Link>

          <div className="my-1 h-px bg-white/6" />

          {status === "unauthenticated" ? (
            <button
              type="button"
              onClick={() => { signIn("google", { callbackUrl: "/" }); setMenuOpen(false); }}
              className="flex w-full items-center gap-3 rounded-xl bg-fuchsia-500/15 px-4 py-3 text-sm font-semibold text-fuchsia-300 transition hover:bg-fuchsia-500/25"
            >
              <svg className="h-4 w-4" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="currentColor" fillOpacity=".8"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="currentColor" fillOpacity=".6"/>
                <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="currentColor" fillOpacity=".4"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="currentColor" fillOpacity=".3"/>
              </svg>
              Sign in with Google
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { signOut({ callbackUrl: "/" }); setMenuOpen(false); }}
              className="flex w-full items-center gap-3 rounded-xl border border-red-400/15 bg-red-500/8 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/15"
            >
              <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none">
                <path d="M5 7h8M9 4l3 3-3 3M5 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign out
            </button>
          )}
        </div>
      </div>

    </nav>
  );
}