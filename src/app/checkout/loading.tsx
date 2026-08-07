export default function CheckoutLoading() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
            {/* Header */}
            <div className="mb-8 h-9 w-40 animate-pulse rounded-full bg-muted" />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Form skeleton */}
                <div className="flex flex-col gap-4">
                    <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                            <div className="h-4 w-28 animate-pulse rounded-full bg-muted" />
                            <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
                        </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <div className="h-4 w-20 animate-pulse rounded-full bg-muted" />
                            <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="h-4 w-24 animate-pulse rounded-full bg-muted" />
                            <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
                        </div>
                    </div>
                    <div className="mt-4 h-12 w-full animate-pulse rounded-full bg-muted" />
                </div>

                {/* Summary skeleton */}
                <div className="flex flex-col gap-4">
                    <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />
                    <div className="rounded-[1.5rem] bg-muted/50 p-5">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="mb-3 flex items-center gap-3">
                                <div className="size-12 shrink-0 animate-pulse rounded-xl bg-muted" />
                                <div className="flex-1 space-y-1.5">
                                    <div className="h-4 w-3/4 animate-pulse rounded-full bg-muted" />
                                    <div className="h-3 w-1/3 animate-pulse rounded-full bg-muted" />
                                </div>
                                <div className="h-4 w-20 animate-pulse rounded-full bg-muted" />
                            </div>
                        ))}
                        <div className="my-3 border-t border-border/40" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="mb-2 flex justify-between">
                                <div className="h-4 w-20 animate-pulse rounded-full bg-muted" />
                                <div className="h-4 w-24 animate-pulse rounded-full bg-muted" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}