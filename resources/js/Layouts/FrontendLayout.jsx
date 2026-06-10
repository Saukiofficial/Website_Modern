import { useState } from "react";

export default function FrontendLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const menus = [
        { label: "BERANDA", href: "/" },
        { label: "PROFIL", href: "/profil" },
        { label: "AKADEMIK", href: "/akademik" },
        { label: "KESISWAAN", href: "/kesiswaan" },
        { label: "INFORMASI", href: "/informasi" },
        { label: "GALERI", href: "/galeri" },
        { label: "PPDB", href: "/ppdb" },
        { label: "HUBUNGI KAMI", href: "/#kontak" },
    ];

    return (
        <div className="min-h-screen w-full bg-white text-slate-900">
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
                <div className="flex h-[92px] w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
                    <a
                        href="/"
                        className="flex min-w-0 flex-1 items-center gap-4"
                    >
                        <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-[#064493] text-[19px] font-semibold text-white ring-[4px] ring-blue-100">
                            SN
                        </div>

                        <div className="min-w-0 leading-tight">
                            <h1 className="truncate text-[17px] font-semibold uppercase tracking-tight text-[#064493] sm:text-[22px] lg:text-[25px]">
                                SMA NEGERI 1 MOJOKERTO
                            </h1>

                            <p className="mt-1 truncate text-[11px] font-medium text-slate-600 sm:text-[13px]">
                                Berprestasi, Berkarakter, Berbudaya
                            </p>
                        </div>
                    </a>

                    <nav className="hidden items-center gap-6 xl:flex">
                        {menus.map((menu) => (
                            <a
                                key={menu.label}
                                href={menu.href}
                                className="text-[13px] font-semibold uppercase tracking-tight text-[#064493] transition hover:text-[#0b73e8]"
                            >
                                {menu.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#064493] transition hover:bg-blue-50"
                            aria-label="Cari"
                        >
                            <svg
                                className="h-7 w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-4.35-4.35M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
                                />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsOpen((value) => !value)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#064493] transition hover:bg-blue-50 xl:hidden"
                            aria-label="Menu"
                        >
                            {isOpen ? (
                                <svg
                                    className="h-7 w-7"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-7 w-7"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {isOpen ? (
                    <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg xl:hidden">
                        <nav className="grid gap-2">
                            {menus.map((menu) => (
                                <a
                                    key={menu.label}
                                    href={menu.href}
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl px-4 py-3 text-[13px] font-semibold uppercase text-[#064493] transition hover:bg-blue-50"
                                >
                                    {menu.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                ) : null}
            </header>

            <main className="w-full">{children}</main>
        </div>
    );
}