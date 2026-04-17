"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="top-4 z-50 w-full ">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[1.75rem] border border-fuchsia-400/20 bg-black/45 px-4 py-3 shadow-[0_0_45px_rgba(168,85,247,0.2)] backdrop-blur-xl sm:px-6">
        <Link href="/" className="group flex flex-col">
          <span className="text-[0.7rem] uppercase tracking-[0.45em] text-fuchsia-300/75">
            Movie Recom
          </span>
          <span className="text-sm text-zinc-300 transition group-hover:text-white sm:text-base">
            Curated cinema, instantly
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          { status === "unauthenticated" ? <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="rounded-full border border-fuchsia-300/20 bg-white/6 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-fuchsia-300/45 hover:bg-fuchsia-500/15 hover:text-white"
          >
            Login
          </button>
          :

          <button
          type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Logout
          </button>
          }

          <Link
            href={session ? "/my-recoms" : "/login"}
            className="rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-fuchsia-400 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(168,85,247,0.35)] transition hover:scale-[1.02] hover:from-fuchsia-400 hover:to-purple-400"
          >
            My Recoms
          </Link>
        </div>
      </div>
    </nav>
  );
}
