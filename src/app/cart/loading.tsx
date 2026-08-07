export default function CartLoading() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
            {/* Header */}
            <div className="mb-8 h-9 w-48 animate-pulse rounded-full bg-muted" />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Cart items skeleton */}
                <div className="flex flex-col gap-4 md:col-span-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 rounded-[1.5rem] bg-muted/50 p-4"
                        >
                            <div className="size-20 shrink-0 animate-pulse rounded-xl bg-muted" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-3/4 animate-pulse rounded-full bg-muted" />
                                <div className="h-3 w-1/3 animate-pulse rounded-full bg-muted" />
                            </div>
                            <div className="h-9 w-28 animate-pulse rounded-full bg-muted" />
                        </div>
                    ))}
                </div>

                {/* Summary skeleton */}
                <div className="rounded-[1.5rem] bg-muted/50 p-6">
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex justify-between">
                                <div className="h-4 w-24 animate-pulse rounded-full bg-muted" />
                                <div className="h-4 w-20 animate-pulse rounded-full bg-muted" />
                            </div>
                        ))}
                        <div className="my-2 border-t border-border/40" />
                        <div className="flex justify-between">
                            <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
                            <div className="h-6 w-28 animate-pulse rounded-full bg-muted" />
                        </div>
                    </div>
                    <div className="mt-6 h-12 w-full animate-pulse rounded-full bg-muted" />
                </div>
            </div>
        </div>
    );
}