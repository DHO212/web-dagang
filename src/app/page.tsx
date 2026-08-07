import { Suspense } from "react";
import { ArrowDown } from "lucide-react";

import { getCategories, getProducts } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryFilter } from "@/components/product/CategoryFilter";

interface HomeProps {
    searchParams: Promise<{
        search?: string;
        category?: string;
    }>;
}

export default async function Home({ searchParams }: HomeProps) {
    const { search, category } = await searchParams;

    const [categories, products] = await Promise.all([
        getCategories(),
        getProducts({ search, category }),
    ]);

    return (
        <div className="px-4 pb-32">
            {/* ================= HERO ================= */}
            <section className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center py-24 text-center">
                {/* Eyebrow tag */}
                <span className="inline-block rounded-full bg-secondary/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground ring-1 ring-border/50">
                    Belanja Online Premium
                </span>

                <h1 className="mt-8 max-w-3xl text-balance text-5xl font-semibold tracking-tight md:text-7xl">
                    Barang berkualitas,{" "}
                    <span className="text-accent">harga bersahabat.</span>
                </h1>

                <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
                    Jelajahi katalog pilihan kami — dari elektronik hingga
                    gaya hidup. Semua kebutuhan Anda, satu klik saja.
                </p>

                {/* CTA dengan nested icon */}
                <a
                    href="#katalog"
                    className="group mt-10 flex h-12 items-center gap-3 rounded-full bg-primary pl-6 pr-1.5 text-sm font-medium text-primary-foreground transition-all duration-500 ease-out-expo active:scale-[0.98]"
                >
                    Jelajahi Katalog
                    <span className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-out-expo group-hover:translate-y-[2px]">
                        <ArrowDown className="size-4" />
                    </span>
                </a>
            </section>

            {/* ================= KATALOG ================= */}
            <section
                id="katalog"
                className="mx-auto w-full max-w-7xl scroll-mt-28 py-24"
            >
                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="inline-block rounded-full bg-secondary/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground ring-1 ring-border/50">
                            Katalog
                        </span>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                            {search
                                ? `Hasil untuk "${search}"`
                                : "Semua Produk"}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {products.length} produk ditemukan
                        </p>
                    </div>

                    <Suspense fallback={null}>
                        <CategoryFilter categories={categories} />
                    </Suspense>
                </div>

                <ProductGrid products={products} />
            </section>
        </div>
    );
}