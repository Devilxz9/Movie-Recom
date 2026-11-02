export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#302744] px-5 pb-20 pt-32 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-white/15 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full max-w-2xl space-y-5">
            <div className="h-3 w-44 rounded-full bg-[#bda3fa]/40" />
            <div className="h-16 w-72 rounded-2xl bg-white/12 sm:h-24 sm:w-96" />
            <div className="h-5 max-w-xl rounded-xl bg-white/10" />
          </div>
          <div className="h-8 w-52 rounded-full bg-white/10" />
        </div>
        <div className="mt-8 flex h-16 items-center justify-between rounded-[1.25rem] border border-white/20 bg-[#eee8fa]/25 p-3">
          <div className="h-10 w-64 rounded-full bg-white/15" />
          <div className="h-10 w-72 rounded-full bg-white/15" />
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="overflow-hidden rounded-[1.5rem] bg-white/10">
              <div className="aspect-[2/3] bg-white/10" />
              <div className="space-y-3 p-4">
                <div className="h-5 rounded-lg bg-white/15" />
                <div className="h-4 w-2/3 rounded-lg bg-white/10" />
                <div className="h-10 rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
