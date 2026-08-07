import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[70dvh] flex-col items-center justify-center px-4 text-center">
            {/* Icon */}
            <div className="flex size-20 items-center justify-center rounded-[2rem] bg-secondary ring-1 ring-border/40">
                <SearchX className="size-9 text-muted-foreground" />
            </div>

            {/* Copy */}
            <p className="mt-8 font-mono text-7xl font-bold tracking-tighter text-muted-foreground/20">
                404
            </p>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                Halaman Tidak Ditemukan
            </h1>
            <p className="mt-3 max-w-sm text-muted-foreground">
                Halaman yang Anda cari tidak ada atau sudah dipindahkan.
            </p>

            {/* CTA */}
            <Link
                href="/"
                className="group mt-8 flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-300 active:scale-[0.97]"
            >
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Kembali ke Beranda
            </Link>
        </div>
    );
}