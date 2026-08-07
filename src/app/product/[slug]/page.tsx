import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package, ShieldCheck, Truck } from "lucide-react";

import { getProductBySlug } from "@/lib/data";
import { formatRupiah } from "@/lib/utils";
import { AddToCartSection } from "@/components/product/AddToCartSection";

const FALLBACK_IMAGE = "https://placehold.co/400x400/png?text=Product";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) notFound();

    const imageUrl = product.images[0] ?? FALLBACK_IMAGE;
    const isOutOfStock = product.stock <= 0;

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-24 md:py-32">
            {/* Back link */}
            <Link
                href="/"
                className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Kembali ke Katalog
            </Link>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
                {/* ========== Galeri — Double Bezel ========== */}
                <div className="rounded-[2rem] bg-secondary/40 p-2.5 ring-1 ring-border/40">
                    <div className="relative aspect-square overflow-hidden rounded-[calc(2rem-0.625rem)] bg-muted">
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            priority
                            unoptimized
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* ========== Info Produk ========== */}
                <div className="flex flex-col justify-center">
                    <span className="w-fit rounded-full bg-secondary/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground ring-1 ring-border/50">
                        {product.category.name}
                    </span>

                    <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
                        {product.name}
                    </h1>

                    <div className="mt-5 flex items-center gap-4">
                        <span className="text-3xl font-bold tracking-tight text-accent md:text-4xl">
                            {formatRupiah(product.price)}
                        </span>
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${isOutOfStock
                                    ? "bg-destructive/10 text-destructive"
                                    : product.stock <= 5
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-secondary text-muted-foreground"
                                }`}
                        >
                            {isOutOfStock
                                ? "Stok Habis"
                                : `Stok: ${product.stock}`}
                        </span>
                    </div>

                    {product.description && (
                        <p className="mt-6 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                            {product.description}
                        </p>
                    )}

                    <div className="mt-8">
                        <AddToCartSection
                            product={{
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: imageUrl,
                                stock: product.stock,
                            }}
                        />
                    </div>

                    {/* Trust badges */}
                    <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border/50 pt-8">
                        <TrustBadge
                            icon={<Truck className="size-4" />}
                            label="Gratis Ongkir"
                        />
                        <TrustBadge
                            icon={<ShieldCheck className="size-4" />}
                            label="Garansi Resmi"
                        />
                        <TrustBadge
                            icon={<Package className="size-4" />}
                            label="Packing Aman"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function TrustBadge({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-secondary/50 px-3 py-4 text-center ring-1 ring-border/40">
            <span className="flex size-9 items-center justify-center rounded-full bg-card text-accent ring-1 ring-border/50">
                {icon}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
                {label}
            </span>
        </div>
    );
}