export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#171321] px-5 pb-20 pt-32 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl space-y-5">
          <div className="h-3 w-40 rounded-full bg-[#bda3fa]/35" />
          <div className="h-16 max-w-2xl rounded-2xl bg-white/10 sm:h-24" />
          <div className="h-16 max-w-xl rounded-2xl bg-white/10" />
          <div className="h-12 w-44 rounded-full bg-[#4f8dff]/50" />
        </div>
        <div className="mt-24 h-8 w-64 rounded-xl bg-white/15" />
        <div className="mt-8 flex gap-5 overflow-hidden">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-72 w-[184px] shrink-0 rounded-[1.25rem] bg-white/10 sm:h-80 sm:w-[210px]" />
          ))}
        </div>
      </div>
    </main>
  );
}
