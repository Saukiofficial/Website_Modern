import { useState } from "react";

export default function FrontendLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const menus = [
        { label: "BERANDA", href: "/" },
        { label: "PROFIL", href: "/profil" },
        { label: "AKADEMIK", href: "/akademik" },
        { label: "KESISWAAN", href: "/akademik" },
        { label: "INFORMASI", href: "#informasi" },
        { label: "GALERI", href: "#galeri" },
        { label: "PPDB", href: "#ppdb" },
        { label: "HUBUNGI KAMI", href: "#kontak" },
    ];

    return (
        <div className="min-h-screen bg-[#edf3f9] text-slate-900">
            <div className="mx-auto min-h-screen w-full max-w-[1380px] overflow-hidden bg-white shadow-2xl shadow-slate-300/70">
                <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
                    <div className="flex h-[76px] items-center justify-between gap-3 px-4 sm:h-[76px] sm:px-6 lg:px-10">
                        <a
                            href="/"
                            className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3"
                        >
                            <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#064493] text-[14px] font-black text-white ring-[4px] ring-blue-100 sm:h-[52px] sm:w-[52px] sm:text-[17px]">
                                SN
                            </div>

                            <div className="min-w-0 leading-tight">
                                <h1 className="truncate text-[13px] font-black uppercase tracking-tight text-[#064493] sm:text-[18px] lg:text-[20px]">
                                    SMA NEGERI 1 CERDAS
                                </h1>
                                <p className="mt-0.5 truncate text-[9px] font-semibold text-slate-600 sm:text-[10.5px] lg:text-[11px]">
                                    Berprestasi, Berkarakter, Berbudaya
                                </p>
                            </div>
                        </a>

                        <nav className="hidden items-center gap-5 xl:flex">
                            {menus.map((menu) => (
                                <a
                                    key={menu.label}
                                    href={menu.href}
                                    className="text-[11px] font-black uppercase tracking-tight text-[#064493] transition hover:text-[#0b73e8]"
                                >
                                    {menu.label}
                                </a>
                            ))}
                        </nav>

                        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
                            <button
                                type="button"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#064493] transition hover:bg-blue-50 sm:h-10 sm:w-10"
                                aria-label="Cari"
                            >
                                <svg
                                    className="h-5 w-5 sm:h-6 sm:w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2.4"
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
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#064493] transition hover:bg-blue-50 sm:h-10 sm:w-10 xl:hidden"
                                aria-label="Menu"
                            >
                                {isOpen ? (
                                    <svg
                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2.3"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18 18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2.3"
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

                    {isOpen && (
                        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg xl:hidden">
                            <nav className="grid gap-2">
                                {menus.map((menu) => (
                                    <a
                                        key={menu.label}
                                        href={menu.href}
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-xl px-4 py-3 text-[13px] font-black uppercase text-[#064493] transition hover:bg-blue-50"
                                    >
                                        {menu.label}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    )}
                </header>

                {children}
            </div>
        </div>
    );
}