"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCartStore } from "@/store/useCartStore";

const NAV_LINKS = [
    { href: "/", label: "Beranda" },
    { href: "/#katalog", label: "Katalog" },
    { href: "/cart", label: "Keranjang" },
] as const;

export function Navbar() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [keyword, setKeyword] = React.useState("");
    const [mounted, setMounted] = React.useState(false);
    const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const openCart = useCartStore((s) => s.openCart);
    const items = useCartStore((s) => s.items);
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

    // Hindari hydration mismatch dari localStorage persist
    React.useEffect(() => setMounted(true), []);

    // Debounce 300ms — navigasi ke halaman katalog dengan query search
    React.useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            const q = keyword.trim();
            if (q.length >= 2) {
                router.push(`/?search=${encodeURIComponent(q)}#katalog`);
            } else if (q.length === 0) {
                router.push(`/#katalog`);
            }
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [keyword, router]);

    // Kunci scroll body saat menu overlay terbuka
    React.useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <>
            {/* Fluid Island Nav — floating glass pill, detached dari atas */}
            <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
                <nav
                    className={cn(
                        "flex w-full max-w-3xl items-center gap-3 rounded-full p-1.5",
                        "border border-white/40 bg-background/70 backdrop-blur-2xl",
                        "shadow-[0_8px_30px_rgba(28,25,23,0.06),inset_0_1px_1px_rgba(255,255,255,0.6)]"
                    )}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold tracking-tight text-primary-foreground transition-transform duration-500 ease-out-expo active:scale-[0.97]"
                    >
                        Web<span className="text-accent">Dagang</span>
                    </Link>

                    {/* Search — desktop */}
                    <div className="relative hidden flex-1 md:block">
                        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Cari produk…"
                            className="h-10 border-transparent bg-secondary/60 pl-11"
                            aria-label="Cari produk"
                        />
                    </div>

                    {/* Actions */}
                    <div className="ml-auto flex items-center gap-1">
                        <button
                            type="button"
                            onClick={openCart}
                            className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 ease-out-expo hover:bg-secondary"
                            aria-label="Buka keranjang belanja"
                        >
                            <ShoppingBag className="size-[18px] transition-transform duration-500 ease-out-expo group-hover:scale-105" />
                            {mounted && itemCount > 0 && (
                                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                                    {itemCount > 99 ? "99+" : itemCount}
                                </span>
                            )}
                        </button>

                        <button
                            type="button"
                            className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 ease-out-expo hover:bg-secondary md:flex"
                            aria-label="Profil"
                        >
                            <User className="size-[18px]" />
                        </button>

                        {/* Hamburger — mobile, morph ke X */}
                        <button
                            type="button"
                            onClick={() => setMenuOpen((v) => !v)}
                            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 ease-out-expo hover:bg-secondary md:hidden"
                            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
                            aria-expanded={menuOpen}
                        >
                            <span
                                className={cn(
                                    "absolute h-px w-4 bg-foreground transition-all duration-500 ease-out-expo",
                                    menuOpen
                                        ? "translate-y-0 rotate-45"
                                        : "-translate-y-[3.5px]"
                                )}
                            />
                            <span
                                className={cn(
                                    "absolute h-px w-4 bg-foreground transition-all duration-500 ease-out-expo",
                                    menuOpen
                                        ? "translate-y-0 -rotate-45"
                                        : "translate-y-[3.5px]"
                                )}
                            />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Fullscreen glass overlay menu — mobile */}
            <div
                className={cn(
                    "fixed inset-0 z-30 flex flex-col justify-end bg-background/80 backdrop-blur-3xl transition-all duration-700 ease-out-expo md:hidden",
                    menuOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                )}
                aria-hidden={!menuOpen}
            >
                {/* Search — mobile */}
                <div className="px-6 pb-4">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Cari produk…"
                            className="h-12 bg-card pl-11"
                            aria-label="Cari produk"
                            tabIndex={menuOpen ? 0 : -1}
                        />
                    </div>
                </div>

                {/* Staggered mask reveal links */}
                <nav className="flex flex-col gap-2 px-6 pb-16">
                    {NAV_LINKS.map((link, i) => (
                        <div key={link.href} className="overflow-hidden">
                            <Link
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                tabIndex={menuOpen ? 0 : -1}
                                className={cn(
                                    "block text-4xl font-semibold tracking-tight transition-all duration-700 ease-out-expo",
                                    menuOpen
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-12 opacity-0"
                                )}
                                style={{
                                    transitionDelay: menuOpen
                                        ? `${100 + i * 75}ms`
                                        : "0ms",
                                }}
                            >
                                {link.label}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Cart slide-over */}
            <CartDrawer />
        </>
    );
}