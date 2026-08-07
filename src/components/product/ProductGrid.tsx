import { cn } from "@/lib/utils";
import { ProductCard, type ProductCardData } from "./ProductCard";

interface ProductGridProps {
    products: ProductCardData[];
    className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-dashed border-border py-24 text-center">
                <p className="text-sm font-medium">
                    Tidak ada produk ditemukan
                </p>
                <p className="text-xs text-muted-foreground">
                    Coba kata kunci atau kategori lain.
                </p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
                className
            )}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}