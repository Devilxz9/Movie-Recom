"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const benefits = [
  "Save tailored recommendations across every session",
  "Track the movies you want to watch next",
  "Keep your taste profile synced with one click",
];

export default function LoginPage() {
  const {data: session, status} = useSession()
  console.log(session)
  const router = useRouter()

  useEffect(() => {
    if(status === "authenticated"){
      router.push("/")
    }
  
 
  }, [status])
  
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative isolate">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.35),_transparent_35%),radial-gradient(circle_at_80%_30%,_rgba(126,34,206,0.28),_transparent_25%),linear-gradient(180deg,_#14051f_0%,_#050308_55%,_#000000_100%)]" />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-700/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
          <header className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xs uppercase tracking-[0.45em] text-fuchsia-300/80"
            >
              Movie recom
            </Link>
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-200 transition hover:border-fuchsia-300/40 hover:text-white"
            >
              Back to home
            </Link>
          </header>

          <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100 backdrop-blur">
                Welcome back to your watchlist
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Sign in and let Movie recom pick the perfect next watch.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
                One Google account is all you need to unlock personalized movie
                matches, curated lists, and a smoother discovery flow.
              </p>

              <div className="mt-10 space-y-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200 backdrop-blur"
                  >
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-[2rem] border border-fuchsia-400/20 bg-white/5 p-4 shadow-[0_0_80px_rgba(168,85,247,0.18)] backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/90 p-6 sm:p-8">
                <div className="rounded-3xl border border-fuchsia-400/15 bg-gradient-to-b from-fuchsia-500/12 to-transparent p-6">
                  <p className="text-sm text-fuchsia-300">Secure sign in</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">
                    Continue with Google
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    Your account gives you a synced recommendation space with no
                    extra password to manage.
                  </p>

                  <button
                    type="button"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-fuchsia-100"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                    >
                      <path
                        fill="#EA4335"
                        d="M12 10.2v3.9h5.4c-.2 1.2-1.4 3.6-5.4 3.6-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.6 3.3 14.5 2.4 12 2.4A9.6 9.6 0 0 0 2.4 12 9.6 9.6 0 0 0 12 21.6c5.5 0 9.1-3.8 9.1-9.2 0-.6-.1-1.1-.2-1.6H12Z"
                      />
                      <path
                        fill="#34A853"
                        d="M2.4 12c0 1.9.7 3.7 1.9 5.1l3.1-2.4A5.8 5.8 0 0 1 6.1 12c0-.9.2-1.9.7-2.7L3.7 6.9A9.5 9.5 0 0 0 2.4 12Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M12 21.6c2.6 0 4.8-.9 6.4-2.5l-3.1-2.4c-.8.6-1.9 1-3.3 1-2.5 0-4.7-1.7-5.5-4l-3.1 2.4A9.6 9.6 0 0 0 12 21.6Z"
                      />
                      <path
                        fill="#4285F4"
                        d="M18.4 19.1c1.8-1.6 2.7-4 2.7-6.7 0-.6-.1-1.1-.2-1.6H12v3.9h5.4c-.3 1.4-1.1 2.6-2.2 3.5l3.2 2.5Z"
                      />
                    </svg>
                    Sign in with Google
                  </button>

                  <p className="mt-4 text-center text-xs leading-5 text-zinc-400">
                    Google is the only sign-in method enabled for this app.
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    Why sign in
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    Keep your taste profile consistent, return to saved picks,
                    and move from discovery to watchlist without friction.
                  </p>

                  <button className="text-white" onClick={()=> signOut()}>signout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
