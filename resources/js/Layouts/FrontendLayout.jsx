import { Link, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

const fallbackMenuGroups = [
    {
        label: "Profil Sekolah",
        icon: "🏫",
        href: "/profil",
        items: [
            { label: "Profil Sekolah", href: "/profil" },
            { label: "Sejarah Sekolah", href: "/profil" },
            { label: "Visi & Misi", href: "/profil" },
            { label: "Struktur Organisasi", href: "/profil" },
            { label: "Identitas Sekolah", href: "/profil" },
        ],
    },
    {
        label: "Akademik",
        icon: "🎓",
        href: "/akademik",
        items: [
            { label: "Kalender Akademik", href: "/akademik" },
            { label: "Dewan Guru", href: "/akademik" },
            { label: "Ekstrakurikuler", href: "/akademik" },
            { label: "Pengurus OSIS", href: "/akademik" },
            { label: "Prestasi Siswa", href: "/akademik" },
        ],
    },
    {
        label: "Kesiswaan",
        icon: "👥",
        href: "/kesiswaan",
        items: [
            { label: "Halaman Kesiswaan", href: "/kesiswaan" },
            { label: "Form OSIS & Kepemimpinan", href: "/kesiswaan/osis" },
            {
                label: "Form Ekstrakurikuler",
                href: "/kesiswaan/ekstrakurikuler",
            },
            {
                label: "Form Bimbingan Konseling",
                href: "/kesiswaan/bimbingan-konseling",
            },
        ],
    },
    {
        label: "Informasi",
        icon: "ⓘ",
        href: "/informasi",
        items: [
            { label: "Informasi Sekolah", href: "/informasi" },
            { label: "Berita Terbaru", href: "/informasi" },
            { label: "Pengumuman Penting", href: "/informasi" },
            { label: "Pusat Informasi Sekolah", href: "/informasi" },
        ],
    },
    {
        label: "Galeri",
        icon: "🖼️",
        href: "/galeri",
        items: [
            { label: "Galeri Foto Sekolah", href: "/galeri" },
            { label: "Kegiatan Belajar", href: "/galeri" },
            { label: "Ekstrakurikuler", href: "/galeri" },
            { label: "Prestasi Siswa", href: "/galeri" },
            { label: "Lingkungan Sekolah", href: "/galeri" },
            { label: "Kegiatan Seni", href: "/galeri" },
        ],
    },
    {
        label: "PPDB",
        icon: "📝",
        href: "/ppdb",
        items: [
            { label: "Informasi PPDB", href: "/ppdb" },
            { label: "Alur Pendaftaran", href: "/ppdb" },
            { label: "Persyaratan PPDB", href: "/ppdb" },
            { label: "Form Pendaftaran PPDB", href: "/ppdb/daftar" },
        ],
    },
];

const fallbackMainMenus = [
    { label: "Beranda", href: "/" },
    { label: "Profil", href: "/profil", dropdownKey: "Profil Sekolah" },
    { label: "Akademik", href: "/akademik", dropdownKey: "Akademik" },
    { label: "Kesiswaan", href: "/kesiswaan", dropdownKey: "Kesiswaan" },
    { label: "Informasi", href: "/informasi", dropdownKey: "Informasi" },
    { label: "Galeri", href: "/galeri", dropdownKey: "Galeri" },
    { label: "PPDB", href: "/ppdb", dropdownKey: "PPDB" },
    { label: "Hubungi Kami", href: "/#kontak" },
];

function isActiveMenu(pathname, href) {
    if (href === "/") return pathname === "/";
    if (href === "#") return false;

    return pathname === href || pathname.startsWith(`${href}/`);
}

function getMenuIcon(label) {
    const lowerLabel = String(label || "").toLowerCase();

    if (lowerLabel.includes("profil")) return "🏫";
    if (lowerLabel.includes("akademik")) return "🎓";
    if (lowerLabel.includes("kesiswaan")) return "👥";
    if (lowerLabel.includes("informasi")) return "ⓘ";
    if (lowerLabel.includes("galeri")) return "🖼️";
    if (lowerLabel.includes("ppdb")) return "📝";

    return "📌";
}

function normalizeMenus(frontendMenus) {
    if (!Array.isArray(frontendMenus) || frontendMenus.length === 0) {
        return {
            mainMenus: fallbackMainMenus,
            menuGroups: fallbackMenuGroups,
        };
    }

    const mainMenus = frontendMenus.map((menu) => {
        const children = Array.isArray(menu.children) ? menu.children : [];
        const hasChildren = children.length > 0;

        return {
            label: menu.label,
            href: menu.url,
            dropdownKey: hasChildren ? menu.label : null,
        };
    });

    const menuGroups = frontendMenus
        .filter((menu) => Array.isArray(menu.children) && menu.children.length > 0)
        .map((menu) => {
            return {
                label: menu.label,
                icon: getMenuIcon(menu.label),
                href: menu.url,
                items: menu.children.map((child) => ({
                    label: child.label,
                    href: child.url,
                })),
            };
        });

    return {
        mainMenus,
        menuGroups,
    };
}

function SearchIcon({ className = "h-6 w-6" }) {
    return (
        <svg
            className={className}
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
    );
}

function UserIcon() {
    return (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
            />
        </svg>
    );
}

function GlobeIcon() {
    return (
        <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21M12 3C9.8 5.4 8.7 8.4 8.7 12S9.8 18.6 12 21"
            />
        </svg>
    );
}

function LogoBlock({ schoolSetting }) {
    return (
        <Link href="/" className="flex min-w-0 items-center gap-4">
            <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#052b66] text-white ring-[4px] ring-blue-100 lg:h-[76px] lg:w-[76px]">
                {schoolSetting?.logo_url ? (
                    <img
                        src={schoolSetting.logo_url}
                        alt={schoolSetting.school_name || "Logo Sekolah"}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full border border-[#d59a25]/70 text-[18px] font-semibold text-[#f7c46a]">
                        1
                    </div>
                )}
            </div>

            <div className="min-w-0">
                <h1 className="truncate font-serif text-[20px] font-semibold uppercase leading-tight tracking-[-0.03em] text-[#061b46] sm:text-[24px] lg:text-[28px]">
                    {schoolSetting?.school_name || "SMA Negeri 1 Mojokerto"}
                </h1>

                <p className="mt-1 truncate text-[12px] font-medium text-slate-600 sm:text-[13px] lg:text-[14px]">
                    {schoolSetting?.tagline ||
                        "Excellence • Character • Leadership"}
                </p>
            </div>
        </Link>
    );
}

function MegaMenu({
    activeMega,
    menuGroups,
    schoolSetting,
    onMouseEnter,
    onMouseLeave,
}) {
    const activeGroup = menuGroups.find((group) => group.label === activeMega);

    if (!activeGroup) return null;

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="absolute left-1/2 top-full z-50 hidden w-[min(1180px,calc(100vw-56px))] -translate-x-1/2 pt-4 xl:block"
        >
            <div className="grid grid-cols-[1fr_300px] overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-2xl shadow-slate-300/70">
                <div className="grid grid-cols-3">
                    <div className="border-r border-slate-200 p-8">
                        <div className="text-[36px] leading-none text-[#d59a25]">
                            {activeGroup.icon}
                        </div>

                        <h3 className="mt-7 font-serif text-[26px] font-semibold leading-tight text-[#061b46]">
                            {activeGroup.label}
                        </h3>

                        <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600">
                            Pilih menu yang ingin dibuka untuk melihat informasi
                            sekolah lebih lengkap dan terarah.
                        </p>

                        <Link
                            href={activeGroup.href}
                            className="mt-8 inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#061b46] transition hover:text-[#d59a25]"
                        >
                            Lihat Semua
                            <span className="text-[#d59a25]">→</span>
                        </Link>
                    </div>

                    <div className="col-span-2 p-8">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {activeGroup.items.map((item) => (
                                <Link
                                    key={`${item.label}-${item.href}`}
                                    href={item.href}
                                    className="group flex items-center gap-4 rounded-[14px] border border-slate-100 bg-slate-50 px-5 py-4 transition hover:border-[#d59a25]/40 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[18px] text-[#d59a25] shadow-sm transition group-hover:bg-[#d59a25] group-hover:text-white">
                                        ›
                                    </span>

                                    <span className="text-[14px] font-semibold text-[#061b46]">
                                        {item.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="overflow-hidden rounded-[16px] bg-[#052b66] text-white shadow-xl shadow-blue-200">
                        <div className="h-[170px] overflow-hidden">
                            <img
                                src="/frontend/images/navbar-mega.jpg"
                                alt="Bergabung bersama kami"
                                className="h-full w-full object-cover"
                                onError={(event) => {
                                    event.currentTarget.src =
                                        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85";
                                }}
                            />
                        </div>

                        <div className="p-6">
                            <h3 className="font-serif text-[22px] font-semibold text-[#f7c46a]">
                                Bergabung Bersama Kami
                            </h3>

                            <p className="mt-4 text-[14px] font-medium leading-7 text-blue-100">
                                Menjadi bagian dari generasi unggul berkarakter
                                dan berprestasi di{" "}
                                {schoolSetting?.school_name ||
                                    "SMA Negeri 1 Mojokerto"}
                                .
                            </p>

                            <Link
                                href="/ppdb"
                                className="mt-6 inline-flex items-center gap-3 border-b border-[#d59a25] pb-1 text-[14px] font-semibold text-[#f7c46a]"
                            >
                                Daftar PPDB Sekarang
                                <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FlashMessage({ flash }) {
    const message =
        flash?.success || flash?.error || flash?.warning || flash?.info || null;

    if (!message) return null;

    const type = flash?.success
        ? "success"
        : flash?.error
        ? "error"
        : flash?.warning
        ? "warning"
        : "info";

    const style = {
        success: "border-emerald-200 bg-emerald-50 text-emerald-700",
        error: "border-red-200 bg-red-50 text-red-700",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-700",
        info: "border-blue-200 bg-blue-50 text-blue-700",
    };

    return (
        <div className="fixed right-4 top-[110px] z-[90] max-w-[360px] sm:right-6">
            <div
                className={`rounded-[16px] border px-5 py-4 text-[13px] font-bold shadow-xl shadow-slate-300/50 ${style[type]}`}
            >
                {message}
            </div>
        </div>
    );
}

export default function FrontendLayout({ children }) {
    const { props, url } = usePage();

    const schoolSetting = props.schoolSetting || {};
    const frontendMenus = props.frontendMenus || [];
    const flash = props.flash || {};

    const [isOpen, setIsOpen] = useState(false);
    const [activeMega, setActiveMega] = useState(null);

    const pathname = url?.split("?")[0] || "/";

    const { mainMenus, menuGroups } = useMemo(() => {
        return normalizeMenus(frontendMenus);
    }, [frontendMenus]);

    const activeLabel = useMemo(() => {
        const active = mainMenus.find((menu) =>
            isActiveMenu(pathname, menu.href)
        );

        return active?.label ?? "Beranda";
    }, [mainMenus, pathname]);

    const openMega = (dropdownKey) => {
        if (!dropdownKey) {
            setActiveMega(null);
            return;
        }

        setActiveMega(dropdownKey);
    };

    const closeMega = () => {
        setActiveMega(null);
    };

    return (
        <div className="min-h-screen w-full bg-white text-slate-900">
            <FlashMessage flash={flash} />

            <header className="sticky top-0 z-50 w-full bg-white">
                <div className="hidden bg-[#052b66] text-white lg:block">
                    <div className="flex h-[46px] items-center justify-between px-6 text-[13px] font-medium xl:px-14 2xl:px-16">
                        <div className="flex items-center gap-6">
                            {schoolSetting?.address ? (
                                <>
                                    <span className="flex items-center gap-2">
                                        <span className="text-[#d59a25]">
                                            📍
                                        </span>
                                        <span className="line-clamp-1 max-w-[420px]">
                                            {schoolSetting.address}
                                        </span>
                                    </span>

                                    <span className="h-4 w-px bg-white/20" />
                                </>
                            ) : null}

                            {schoolSetting?.phone ? (
                                <>
                                    <a
                                        href={`tel:${schoolSetting.phone}`}
                                        className="flex items-center gap-2 transition hover:text-[#f7c46a]"
                                    >
                                        <span className="text-[#d59a25]">
                                            ☎
                                        </span>
                                        {schoolSetting.phone}
                                    </a>

                                    <span className="h-4 w-px bg-white/20" />
                                </>
                            ) : null}

                            {schoolSetting?.email ? (
                                <a
                                    href={`mailto:${schoolSetting.email}`}
                                    className="flex items-center gap-2 transition hover:text-[#f7c46a]"
                                >
                                    <span className="text-[#d59a25]">✉</span>
                                    {schoolSetting.email}
                                </a>
                            ) : null}
                        </div>

                        <div className="flex items-center gap-5">
                            <span className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-[#f7c46a]" />
                                PPDB 2026 Dibuka
                            </span>

                            <span className="h-4 w-px bg-white/20" />

                            <a
                                href="#"
                                className="flex items-center gap-2 transition hover:text-[#f7c46a]"
                            >
                                <UserIcon />
                                Portal Siswa
                            </a>

                            <span className="h-4 w-px bg-white/20" />

                            <a
                                href="#"
                                className="flex items-center gap-2 transition hover:text-[#f7c46a]"
                            >
                                <UserIcon />
                                Portal Guru
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    className="relative border-b border-slate-200 bg-white"
                    onMouseLeave={closeMega}
                >
                    <div className="flex h-[94px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[120px] lg:px-6 xl:px-14 2xl:px-16">
                        <LogoBlock schoolSetting={schoolSetting} />

                        <nav className="hidden items-center gap-6 xl:flex">
                            {mainMenus.map((menu) => {
                                const active = isActiveMenu(
                                    pathname,
                                    menu.href
                                );

                                return (
                                    <Link
                                        key={`${menu.label}-${menu.href}`}
                                        href={menu.href}
                                        onMouseEnter={() =>
                                            openMega(menu.dropdownKey)
                                        }
                                        className={`relative inline-flex h-[120px] items-center gap-2 text-[14px] font-semibold transition ${
                                            active
                                                ? "text-[#061b46]"
                                                : "text-[#061b46] hover:text-[#d59a25]"
                                        }`}
                                    >
                                        <span>{menu.label}</span>

                                        {menu.dropdownKey ? (
                                            <span className="text-[13px]">
                                                ⌄
                                            </span>
                                        ) : null}

                                        <span
                                            className={`absolute bottom-[31px] left-0 h-[3px] rounded-full bg-[#d59a25] transition-all ${
                                                active
                                                    ? "w-full"
                                                    : "w-0 hover:w-full"
                                            }`}
                                        />
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="hidden items-center gap-4 xl:flex">
                            <button
                                type="button"
                                onMouseEnter={closeMega}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#061b46] transition hover:bg-blue-50"
                                aria-label="Cari"
                            >
                                <SearchIcon />
                            </button>

                            <button
                                type="button"
                                onMouseEnter={closeMega}
                                className="inline-flex h-11 items-center gap-2 rounded-full px-2 text-[14px] font-semibold text-[#061b46] transition hover:bg-blue-50"
                            >
                                <GlobeIcon />
                                EN
                            </button>

                            <Link
                                href="/ppdb"
                                onMouseEnter={closeMega}
                                className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-[12px] bg-[#d59a25] px-6 text-[13px] font-semibold uppercase tracking-[0.04em] text-white shadow-lg shadow-orange-200 transition hover:bg-[#f7c46a]"
                            >
                                Daftar PPDB 2026
                                <span>→</span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 xl:hidden">
                            <button
                                type="button"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#061b46] transition hover:bg-blue-50"
                                aria-label="Cari"
                            >
                                <SearchIcon />
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsOpen((value) => !value)}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#061b46] transition hover:bg-blue-50"
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

                    <MegaMenu
                        activeMega={activeMega}
                        menuGroups={menuGroups}
                        schoolSetting={schoolSetting}
                        onMouseEnter={() => setActiveMega(activeMega)}
                        onMouseLeave={closeMega}
                    />
                </div>

                {isOpen ? (
                    <div className="border-b border-slate-200 bg-white px-4 py-4 shadow-xl xl:hidden">
                        <div className="mb-4 rounded-[16px] bg-[#052b66] p-4 text-white">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#f7c46a]">
                                Menu Aktif
                            </p>

                            <h3 className="mt-1 font-serif text-[22px] font-semibold">
                                {activeLabel}
                            </h3>
                        </div>

                        <nav className="grid gap-2">
                            {mainMenus.map((menu) => {
                                const active = isActiveMenu(
                                    pathname,
                                    menu.href
                                );

                                return (
                                    <Link
                                        key={`${menu.label}-${menu.href}`}
                                        href={menu.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`rounded-[14px] px-4 py-3 text-[14px] font-semibold ${
                                            active
                                                ? "bg-blue-50 text-[#052b66]"
                                                : "text-[#061b46] hover:bg-blue-50"
                                        }`}
                                    >
                                        {menu.label}
                                    </Link>
                                );
                            })}

                            <Link
                                href="/ppdb"
                                onClick={() => setIsOpen(false)}
                                className="mt-3 inline-flex min-h-[50px] items-center justify-center rounded-[12px] bg-[#d59a25] px-6 text-[13px] font-semibold uppercase tracking-[0.04em] text-white"
                            >
                                Daftar PPDB 2026 →
                            </Link>
                        </nav>
                    </div>
                ) : null}
            </header>

            <main className="w-full">{children}</main>
        </div>
    );
}