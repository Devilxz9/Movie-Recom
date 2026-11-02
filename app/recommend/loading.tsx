export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#211b32] px-5 pb-16 pt-32 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <div className="mx-auto h-3 w-44 rounded-full bg-[#bda3fa]/40" />
          <div className="mx-auto h-16 max-w-2xl rounded-2xl bg-white/12 sm:h-24" />
          <div className="mx-auto h-5 max-w-xl rounded-xl bg-white/10" />
        </div>
        <div className="mx-auto mt-10 max-w-4xl rounded-[1.75rem] border border-white/20 bg-[#eee8fa]/25 p-3">
          <div className="h-28 rounded-[1.25rem] bg-white/15" />
          <div className="mt-4 flex justify-between gap-4">
            <div className="h-4 w-56 rounded-full bg-white/15" />
            <div className="h-12 w-44 rounded-full bg-[#7651cf]/70" />
          </div>
        </div>
      </div>
    </main>
  );
}
