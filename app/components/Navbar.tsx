"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isRecommendationsActive = pathname === "/recommend";
  const isMyRecomsActive = pathname === "/myrecoms";

  return (
    <nav suppressHydrationWarning className="relative z-50 -mb-20 w-full px-2.5 pt-0 sm:px-3 lg:px-2.5">
      <div className="mx-auto flex min-h-[3.75rem] w-full max-w-[1360px] items-center justify-between gap-3 rounded-[1.05rem] border border-white/20 bg-[#292634]/65 px-3.5 py-2.5 text-white shadow-[0_14px_45px_rgba(10,8,18,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-colors duration-300 hover:border-white/30 sm:min-h-[4.75rem] sm:rounded-[0.95rem] sm:px-8 sm:py-3 lg:px-9">
        <Link href="/" className="group shrink-0">
          <span className="relative block text-[1.15rem] font-bold tracking-[-0.06em] text-white transition duration-300 group-hover:text-[#eee7ff] sm:text-2xl">
            Movie<span className="text-[#bda3fa]">Recom</span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#9a78ff] transition-all duration-300 ease-out group-hover:w-full" />
          </span>
        </Link>

        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <Link
            href="/recommend"
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border px-2 py-1.5 text-[10px] font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:shadow-[0_0_18px_rgba(184,143,255,0.22)] sm:px-5 sm:py-2.5 sm:text-[14px] ${
              isRecommendationsActive
                ? "border-[#b38cff] bg-[#9a78ff]/20 text-white shadow-[0_0_20px_rgba(179,140,255,0.45),inset_0_0_14px_rgba(179,140,255,0.12)]"
                : "border-white/20 bg-[#191622]/35 text-[#d9d0df]"
            }`}
          >
            <span className="relative z-10">Recommendations</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>
          <Link
            href="/myrecoms"
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border px-2 py-1.5 text-[10px] font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:shadow-[0_0_18px_rgba(184,143,255,0.22)] sm:px-5 sm:py-2.5 sm:text-[14px] ${
              isMyRecomsActive
                ? "border-[#b38cff] bg-[#9a78ff]/20 text-white shadow-[0_0_20px_rgba(179,140,255,0.45),inset_0_0_14px_rgba(179,140,255,0.12)]"
                : "border-white/20 bg-[#191622]/35 text-[#d9d0df]"
            }`}
          >
            <span className="relative z-10 whitespace-nowrap">My Recoms</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>
          <div className="hidden sm:block">
            {status === "authenticated" && session ? (
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center gap-2 rounded-full border border-[#ff8c7f]/35 bg-[#ff6b5b]/10 px-4 py-2.5 text-[14px] font-medium text-[#ffb0a7] transition hover:-translate-y-0.5 hover:border-[#ff8c7f]/70 hover:bg-[#ff6b5b]/20 hover:shadow-[0_0_18px_rgba(255,107,91,0.2)]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 7h8M9 4l3 3-3 3M5 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Sign out
              </button>
            ) : status === "unauthenticated" ? (
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="rounded-full border border-[#b38cff]/45 bg-[#9a78ff]/15 px-4 py-2.5 text-[14px] font-medium text-[#d9c9ff] transition hover:-translate-y-0.5 hover:bg-[#9a78ff]/25"
              >
                Sign in
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
