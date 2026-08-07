export default function Loading() {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
            {/* Hero skeleton */}
            <div className="mb-12 h-[420px] w-full animate-pulse rounded-[2rem] bg-muted" />

            {/* Filter skeleton */}
            <div className="mb-8 flex gap-3 overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-muted"
                    />
                ))}
            </div>

            {/* Grid skeleton */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <div className="aspect-square w-full animate-pulse rounded-[1.5rem] bg-muted" />
                        <div className="h-4 w-3/4 animate-pulse rounded-full bg-muted" />
                        <div className="h-4 w-1/2 animate-pulse rounded-full bg-muted" />
                        <div className="mt-1 h-10 w-full animate-pulse rounded-full bg-muted" />
                    </div>
                ))}
            </div>
        </div>
    );
}