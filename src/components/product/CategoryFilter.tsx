"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import type { CategoryItem } from "@/lib/data";

export function CategoryFilter({
    categories,
}: {
    categories: CategoryItem[];
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const active = searchParams.get("category") ?? "all";

    const handleSelect = (slug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (slug === "all") {
            params.delete("category");
        } else {
            params.set("category", slug);
        }
        router.push(`/?${params.toString()}#katalog`);
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            <FilterPill
                label="Semua"
                isActive={active === "all"}
                onClick={() => handleSelect("all")}
            />
            {categories.map((cat) => (
                <FilterPill
                    key={cat.id}
                    label={cat.name}
                    isActive={active === cat.slug}
                    onClick={() => handleSelect(cat.slug)}
                />
            ))}
        </div>
    );
}

function FilterPill({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isActive}
            className={cn(
                "h-9 rounded-full px-4 text-xs font-medium",
                "transition-all duration-500 ease-out-expo active:scale-[0.97]",
                isActive
                    ? "bg-primary text-primary-foreground shadow-[0_8px_20px_-6px_rgba(28,25,23,0.35)]"
                    : "bg-secondary/70 text-muted-foreground ring-1 ring-border/50 hover:bg-secondary hover:text-foreground"
            )}
        >
            {label}
        </button>
    );
}