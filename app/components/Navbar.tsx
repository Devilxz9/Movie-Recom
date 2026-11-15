"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRecommendationsActive = pathname === "/recommend";
  const isMyRecomsActive = pathname === "/myrecoms";
  const isLambdaActive = pathname === "/lambda-demo";

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

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
            className={`group relative hidden items-center justify-center overflow-hidden rounded-full border px-5 py-2.5 text-[14px] font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:shadow-[0_0_18px_rgba(184,143,255,0.22)] lg:inline-flex ${
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
            className={`group relative hidden items-center justify-center overflow-hidden rounded-full border px-5 py-2.5 text-[14px] font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:shadow-[0_0_18px_rgba(184,143,255,0.22)] lg:inline-flex ${
              isMyRecomsActive
                ? "border-[#b38cff] bg-[#9a78ff]/20 text-white shadow-[0_0_20px_rgba(179,140,255,0.45),inset_0_0_14px_rgba(179,140,255,0.12)]"
                : "border-white/20 bg-[#191622]/35 text-[#d9d0df]"
            }`}
          >
            <span className="relative z-10 whitespace-nowrap">My Recoms</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>
          <Link
            href="/lambda-demo"
            className={`hidden group relative items-center justify-center gap-2 overflow-hidden rounded-full border px-5 py-2.5 text-[14px] font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:shadow-[0_0_18px_rgba(184,143,255,0.22)] lg:inline-flex ${
              isLambdaActive
                ? "border-[#bda3fa] bg-[#bda3fa] text-[#171321] shadow-[0_0_20px_rgba(189,163,250,0.35)]"
                : "border-[#b38cff]/45 bg-[#9a78ff]/15 text-[#d9c9ff]"
            }`}
          >
            <span className="relative z-10">Ask AI</span>
            <span className="relative z-10 text-base">↗</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>
          <div className="hidden lg:block">
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

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition active:scale-95 hover:border-[#bda3fa]/60 hover:bg-[#9a78ff]/20 lg:hidden"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
            <Menu
              size={21}
              strokeWidth={2}
              className={`absolute transition-all duration-200 ${isMenuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
            />
            <X
              size={21}
              strokeWidth={2}
              className={`absolute transition-all duration-200 ${isMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
            />
            </span>
          </button>
        </div>
      </div>

      <div
        aria-hidden={!isMenuOpen}
        className={`absolute left-2 right-2 top-[calc(100%+0.6rem)] overflow-hidden rounded-[1.25rem] border border-white/15 bg-[#292634]/95 p-2 shadow-[0_20px_50px_rgba(10,8,18,.35)] backdrop-blur-2xl transition-[opacity,transform] duration-200 ease-out lg:hidden ${
          isMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="grid gap-1">
          <Link
            href="/recommend"
            onClick={() => setIsMenuOpen(false)}
            className={`rounded-[0.9rem] px-4 py-3 text-sm font-medium transition ${
            isRecommendationsActive
              ? "bg-[#9a78ff]/20 text-white"
              : "text-[#d9d0df] hover:bg-white/[0.07] hover:text-white"
            }`}
          >
            Recommendations
          </Link>
          <Link
            href="/myrecoms"
            onClick={() => setIsMenuOpen(false)}
            className={`rounded-[0.9rem] px-4 py-3 text-sm font-medium transition ${
            isMyRecomsActive
              ? "bg-[#9a78ff]/20 text-white"
              : "text-[#d9d0df] hover:bg-white/[0.07] hover:text-white"
            }`}
          >
            My Recoms
          </Link>
          <Link
            href="/lambda-demo"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center justify-between rounded-[0.9rem] px-4 py-3 text-sm font-semibold transition ${
            isLambdaActive
              ? "bg-[#bda3fa] text-[#171321]"
              : "text-[#d9c9ff] hover:bg-[#9a78ff]/20 hover:text-white"
            }`}
          >
            Ask AI <span className="text-base">↗</span>
          </Link>

          <div className="my-1 h-px bg-white/10" />

          {status === "authenticated" && session ? (
            <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              void signOut({ callbackUrl: "/" });
            }}
            className="rounded-[0.9rem] px-4 py-3 text-left text-sm font-medium text-[#ffb0a7] transition hover:bg-[#ff6b5b]/10"
            >
            Sign out
            </button>
          ) : status === "unauthenticated" ? (
            <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              void signIn("google", { callbackUrl: "/" });
            }}
            className="rounded-[0.9rem] px-4 py-3 text-left text-sm font-medium text-[#d9c9ff] transition hover:bg-[#9a78ff]/20 hover:text-white"
            >
            Sign in
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
