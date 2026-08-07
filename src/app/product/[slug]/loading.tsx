export default function ProductLoading() {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
            {/* Breadcrumb skeleton */}
            <div className="mb-8 flex items-center gap-2">
                <div className="h-4 w-16 animate-pulse rounded-full bg-muted" />
                <div className="h-4 w-4 animate-pulse rounded-full bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded-full bg-muted" />
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
                {/* Gambar skeleton */}
                <div className="aspect-square w-full animate-pulse rounded-[2rem] bg-muted" />

                {/* Info skeleton */}
                <div className="flex flex-col gap-4 pt-4">
                    <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
                    <div className="h-9 w-4/5 animate-pulse rounded-full bg-muted" />
                    <div className="h-5 w-1/3 animate-pulse rounded-full bg-muted" />
                    <div className="mt-2 h-8 w-1/2 animate-pulse rounded-full bg-muted" />
                    <div className="mt-4 flex flex-col gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-4 animate-pulse rounded-full bg-muted"
                                style={{ width: `${90 - i * 10}%` }}
                            />
                        ))}
                    </div>
                    <div className="mt-6 flex gap-3">
                        <div className="h-12 w-36 animate-pulse rounded-full bg-muted" />
                        <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
                    </div>
                </div>
            </div>
        </div>
    );
}