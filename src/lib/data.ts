import { prisma } from "@/lib/prisma";
import type { ProductCardData } from "@/components/product/ProductCard";

export interface CategoryItem {
    id: string;
    name: string;
    slug: string;
}

export async function getCategories(): Promise<CategoryItem[]> {
    try {
        return await prisma.category.findMany({
            orderBy: { name: "asc" },
            select: { id: true, name: true, slug: true },
        });
    } catch (error) {
        console.error("Gagal memuat kategori:", error);
        return [];
    }
}

interface GetProductsParams {
    search?: string;
    category?: string;
}

export async function getProducts({
    search,
    category,
}: GetProductsParams = {}): Promise<ProductCardData[]> {
    try {
        const products = await prisma.product.findMany({
            where: {
                ...(search
                    ? {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    }
                    : {}),
                ...(category && category !== "all"
                    ? { category: { slug: category } }
                    : {}),
            },
            include: { category: { select: { name: true } } },
            orderBy: { createdAt: "desc" },
        });

        return products.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.price,
            stock: p.stock,
            images: p.images,
            categoryName: p.category.name,
        }));
    } catch (error) {
        console.error("Gagal memuat produk:", error);
        return [];
    }
}

export async function getProductBySlug(slug: string) {
    try {
        return await prisma.product.findUnique({
            where: { slug },
            include: { category: { select: { name: true, slug: true } } },
        });
    } catch (error) {
        console.error("Gagal memuat detail produk:", error);
        return null;
    }
}