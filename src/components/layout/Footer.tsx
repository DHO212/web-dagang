import Link from "next/link";

const FOOTER_LINKS = [
    {
        title: "Belanja",
        links: [
            { href: "/#katalog", label: "Semua Produk" },
            { href: "/cart", label: "Keranjang" },
            { href: "/checkout", label: "Checkout" },
        ],
    },
    {
        title: "Bantuan",
        links: [
            { href: "#", label: "Pusat Bantuan" },
            { href: "#", label: "Pengiriman" },
            { href: "#", label: "Pengembalian" },
        ],
    },
] as const;

export function Footer() {
    return (
        <footer className="border-t border-border/60 bg-secondary/40">
            <div className="container grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:py-24">
                {/* Brand */}
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold tracking-tight text-primary-foreground"
                    >
                        Web<span className="text-accent">Dagang</span>
                    </Link>
                    <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                        Platform belanja online dengan kurasi produk pilihan,
                        harga transparan, dan pengalaman checkout yang mudah.
                    </p>
                </div>

                {/* Link columns */}
                {FOOTER_LINKS.map((group) => (
                    <div key={group.title} className="space-y-4">
                        <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            {group.title}
                        </h3>
                        <ul className="space-y-2.5">
                            {group.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-foreground/80 transition-colors duration-300 hover:text-accent"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="border-t border-border/60">
                <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
                    <p>
                        © {new Date().getFullYear()} WebDagang. Semua hak
                        dilindungi.
                    </p>
                    <p>Dibuat dengan Next.js, Prisma & Tailwind CSS.</p>
                </div>
            </div>
        </footer>
    );
}