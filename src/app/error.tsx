"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("[GlobalError]", error);
    }, [error]);

    return (
        <div className="flex min-h-[70dvh] flex-col items-center justify-center px-4 text-center">
            {/* Icon */}
            <div className="flex size-20 items-center justify-center rounded-[2rem] bg-destructive/10 ring-1 ring-destructive/20">
                <AlertTriangle className="size-9 text-destructive" />
            </div>

            {/* Copy */}
            <h1 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
                Terjadi Kesalahan
            </h1>
            <p className="mt-3 max-w-md text-muted-foreground">
                Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi
                atau kembali ke halaman utama.
            </p>
            {error.digest && (
                <p className="mt-2 font-mono text-xs text-muted-foreground/60">
                    Error ID: {error.digest}
                </p>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                    onClick={reset}
                    className="group flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-300 active:scale-[0.97]"
                >
                    <RotateCcw className="size-4 transition-transform duration-500 group-hover:-rotate-180" />
                    Coba Lagi
                </button>
                <Link
                    href="/"
                    className="flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium transition-colors duration-300 hover:bg-secondary"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}