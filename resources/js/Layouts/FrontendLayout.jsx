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
            { label: "Pemilihan OSIS", href: "/pemilihan-osis" },
        ],
    },
    {
        label: "Alumni",
        icon: "🎓",
        href: "/alumni",
        items: [
            { label: "Data Alumni", href: "/alumni" },
            { label: "Jejak Alumni", href: "/alumni" },
            { label: "Alumni Bekerja", href: "/alumni?activity=Bekerja" },
            { label: "Alumni Kuliah", href: "/alumni?activity=Kuliah" },
            { label: "Alumni Wirausaha", href: "/alumni?activity=Wirausaha" },
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
    { label: "Alumni", href: "/alumni", dropdownKey: "Alumni" },
    { label: "Kesiswaan", href: "/kesiswaan", dropdownKey: "Kesiswaan" },
    { label: "Informasi", href: "/informasi", dropdownKey: "Informasi" },
    { label: "Galeri", href: "/galeri", dropdownKey: "Galeri" },
    { label: "PPDB", href: "/ppdb", dropdownKey: "PPDB" },
];

function getSchoolInitials(name = "") {
    const words = String(name || "Sekolah")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return words
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
}

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
    if (lowerLabel.includes("alumni")) return "🎓";
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
    const schoolName = schoolSetting?.school_name || "SMA Negeri 1 Sumenep";
    const schoolInitials = getSchoolInitials(schoolName);

    return (
        <Link
            href="/"
            className="flex min-w-0 max-w-[calc(100vw-120px)] items-center gap-2 sm:max-w-[calc(100vw-150px)] lg:max-w-[360px] xl:max-w-[330px] 2xl:max-w-[520px] 2xl:gap-4"
        >
            <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#052b66] text-white ring-[3px] ring-blue-100 sm:h-[54px] sm:w-[54px] lg:h-[52px] lg:w-[52px] xl:h-[50px] xl:w-[50px] 2xl:h-[70px] 2xl:w-[70px]">
                {schoolSetting?.logo_url ? (
                    <img
                        src={schoolSetting.logo_url}
                        alt={schoolName}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full border border-[#d59a25]/70 text-[14px] font-semibold text-[#f7c46a] 2xl:text-[18px]">
                        {schoolInitials}
                    </div>
                )}
            </div>

            <div className="min-w-0">
                <h1 className="truncate font-serif text-[17px] font-semibold uppercase leading-tight tracking-[-0.03em] text-[#061b46] sm:text-[20px] lg:text-[19px] xl:text-[18px] 2xl:text-[26px]">
                    {schoolName}
                </h1>

                <p className="mt-1 truncate text-[11px] font-medium text-slate-600 sm:text-[12px] lg:text-[11px] xl:text-[10.5px] 2xl:text-[14px]">
                    {schoolSetting?.tagline ||
                        "Sekolah Berprestasi, Berkarakter, dan Berdaya Saing Global"}
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
            className="absolute left-1/2 top-full z-[9999] hidden w-[min(1180px,calc(100vw-56px))] -translate-x-1/2 pt-4 xl:block"
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
                                    "SMA Negeri 1 Sumenep"}
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
        <div className="fixed right-4 top-[110px] z-[9999] max-w-[360px] sm:right-6">
            <div
                className={`rounded-[16px] border px-5 py-4 text-[13px] font-bold shadow-xl shadow-slate-300/50 ${style[type]}`}
            >
                {message}
            </div>
        </div>
    );
}

function AccreditationBadge({ schoolSetting }) {
    const accreditation =
        schoolSetting?.accreditation ||
        schoolSetting?.school_accreditation ||
        "A";

    const accreditationText =
        schoolSetting?.accreditation_text ||
        schoolSetting?.accreditation_label ||
        "Akreditasi A";

    const accreditationSubText =
        schoolSetting?.accreditation_subtitle || "Unggul";

    return (
        <div className="flex w-full flex-col items-center text-center">
            <div className="relative flex h-[78px] w-[78px] items-center justify-center sm:h-[88px] sm:w-[88px] xl:h-[112px] xl:w-[112px]">
                <div className="absolute inset-0 rounded-full border-[4px] border-[#d59a25] xl:border-[5px]" />
                <div className="absolute inset-[7px] rounded-full border border-[#f7c46a]/70 xl:inset-[9px]" />

                <div className="absolute -left-1 bottom-3 h-8 w-4 rotate-[-20deg] rounded-full border-l-[4px] border-[#d59a25] xl:bottom-5 xl:h-11 xl:w-6 xl:border-l-[5px]" />
                <div className="absolute -right-1 bottom-3 h-8 w-4 rotate-[20deg] rounded-full border-r-[4px] border-[#d59a25] xl:bottom-5 xl:h-11 xl:w-6 xl:border-r-[5px]" />

                <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#d59a25] text-[30px] font-black leading-none text-[#052b66] shadow-xl shadow-black/20 sm:h-[58px] sm:w-[58px] sm:text-[34px] xl:h-[74px] xl:w-[74px] xl:text-[42px]">
                    {accreditation}
                </div>
            </div>

            <p className="mt-3 text-[12px] font-semibold leading-5 text-white sm:text-[13px] xl:text-[15px]">
                {accreditationText}
            </p>

            <p className="mt-1 text-[11px] font-medium text-blue-100 sm:text-[12px] xl:text-[13px]">
                ({accreditationSubText})
            </p>
        </div>
    );
}

function SocialIcon({ children, href = "#" }) {
    return (
        <a
            href={href}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[13px] font-semibold text-white transition hover:bg-[#d59a25] hover:text-white xl:h-10 xl:w-10 xl:text-[14px]"
        >
            {children}
        </a>
    );
}

function FooterColumn({ title, links = [] }) {
    return (
        <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[11px] xl:text-[12px] xl:tracking-[0.18em]">
                {title}
            </p>

            <div className="mt-4 grid gap-2 xl:mt-5 xl:gap-3">
                {links.map((link) => (
                    <Link
                        key={`${link.label}-${link.href}`}
                        href={link.href}
                        className="break-words text-[12.5px] font-medium leading-6 text-blue-100 transition hover:text-[#f7c46a] xl:text-[14px]"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

function SiteFooter({ schoolSetting, mainMenus }) {
    const schoolName = schoolSetting?.school_name || "SMA Negeri 1 Sumenep";
    const tagline =
        schoolSetting?.tagline ||
        "Sekolah Berprestasi, Berkarakter, dan Berdaya Saing Global";
    const schoolInitials = getSchoolInitials(schoolName);

    const quickLinks = mainMenus
        .filter((menu) => !["PPDB"].includes(menu.label))
        .slice(0, 6)
        .map((menu) => ({
            label: menu.label,
            href: menu.href,
        }));

    const informationLinks = [
        { label: "Berita", href: "/informasi" },
        { label: "Pengumuman", href: "/informasi" },
        { label: "Galeri", href: "/galeri" },
        { label: "PPDB", href: "/ppdb" },
        { label: "Kontak", href: "/#kontak" },
    ];

    return (
        <footer className="relative w-full overflow-hidden bg-[#052b66] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(247,196,106,0.10),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.08),transparent_28%)]" />
            <div className="absolute -right-28 -top-28 h-64 w-64 rounded-full border-[26px] border-white/5 xl:h-72 xl:w-72 xl:border-[32px]" />
            <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#d59a25]/10 blur-3xl" />

            <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-8 px-5 py-10 sm:grid-cols-2 sm:gap-9 sm:px-8 md:grid-cols-[1.25fr_0.7fr_0.7fr_1.05fr_0.8fr] md:gap-5 md:px-6 md:py-12 lg:gap-7 lg:px-10 xl:grid-cols-[1.35fr_0.9fr_0.9fr_1.1fr_0.8fr] xl:gap-10 xl:px-14">
                <div className="min-w-0 sm:col-span-2 md:col-span-1">
                    <div className="flex min-w-0 flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left md:flex-col md:items-start xl:flex-row">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d59a25] bg-white/10 text-[15px] font-bold text-white xl:h-16 xl:w-16 xl:text-[17px]">
                            {schoolSetting?.logo_url ? (
                                <img
                                    src={schoolSetting.logo_url}
                                    alt={schoolName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                schoolInitials
                            )}
                        </div>

                        <div className="min-w-0">
                            <p className="break-words text-[14px] font-semibold uppercase leading-tight tracking-[0.04em] text-white xl:text-[18px] xl:tracking-[0.06em]">
                                {schoolName}
                            </p>

                            <p className="mt-2 text-[12px] font-medium leading-6 text-blue-100 xl:text-[13px]">
                                {tagline}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center gap-3 sm:justify-start md:flex-wrap xl:mt-7">
                        <SocialIcon>f</SocialIcon>
                        <SocialIcon>◎</SocialIcon>
                        <SocialIcon>▶</SocialIcon>
                        <SocialIcon>♪</SocialIcon>
                    </div>
                </div>

                <FooterColumn title="Tautan Cepat" links={quickLinks} />

                <FooterColumn title="Informasi" links={informationLinks} />

                <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[11px] xl:text-[12px] xl:tracking-[0.18em]">
                        Kontak Kami
                    </p>

                    <div className="mt-4 grid gap-3 text-[12.5px] font-medium leading-6 text-blue-100 xl:mt-5 xl:gap-4 xl:text-[14px]">
                        <p className="flex min-w-0 gap-2 xl:gap-3">
                            <span className="shrink-0 text-[#f7c46a]">📍</span>
                            <span className="min-w-0 break-words">
                                {schoolSetting?.address || "-"}
                            </span>
                        </p>

                        <p className="flex min-w-0 gap-2 xl:gap-3">
                            <span className="shrink-0 text-[#f7c46a]">☎</span>
                            <span className="min-w-0 break-words">
                                {schoolSetting?.phone || "-"}
                            </span>
                        </p>

                        <p className="flex min-w-0 gap-2 xl:gap-3">
                            <span className="shrink-0 text-[#f7c46a]">✉</span>
                            <span className="min-w-0 break-all">
                                {schoolSetting?.email || "-"}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="min-w-0 sm:col-span-2 md:col-span-1">
                    <div className="w-full rounded-[22px] border border-white/10 bg-white/5 p-5 md:border-0 md:bg-transparent md:p-0">
                        <AccreditationBadge schoolSetting={schoolSetting} />
                    </div>
                </div>
            </div>

            <div className="relative border-t border-white/10">
                <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-2 px-5 py-5 text-center text-[12.5px] font-medium leading-6 text-blue-100 sm:px-8 md:flex-row md:justify-between md:px-6 md:text-left lg:px-10 xl:px-14">
                    <p className="break-words">
                        © {new Date().getFullYear()} {schoolName}. All rights
                        reserved.
                    </p>

                    <p>
                        Created with <span className="text-red-400">♥</span> for
                        Education
                    </p>
                </div>
            </div>
        </footer>
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
        <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-900">
            <FlashMessage flash={flash} />

            <header className="sticky top-0 z-[9999] w-full bg-white shadow-sm">
                <div className="relative z-[9999] hidden bg-[#052b66] text-white lg:block">
                    <div className="flex h-[34px] items-center justify-between px-5 text-[11px] font-medium xl:px-8 2xl:px-16">
                        <div className="flex min-w-0 items-center gap-3">
                            {schoolSetting?.address ? (
                                <>
                                    <span className="flex min-w-0 items-center gap-2">
                                        <span className="shrink-0 text-[#d59a25]">
                                            📍
                                        </span>
                                        <span className="line-clamp-1 max-w-[300px] xl:max-w-[340px] 2xl:max-w-[360px]">
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
                                        className="flex shrink-0 items-center gap-2 transition hover:text-[#f7c46a]"
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
                                    className="flex min-w-0 items-center gap-2 transition hover:text-[#f7c46a]"
                                >
                                    <span className="shrink-0 text-[#d59a25]">
                                        ✉
                                    </span>
                                    <span className="truncate">
                                        {schoolSetting.email}
                                    </span>
                                </a>
                            ) : null}
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
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
                    className="relative z-[9998] border-b border-slate-200 bg-white"
                    onMouseLeave={closeMega}
                >
                    <div className="flex h-[74px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[78px] lg:px-5 xl:h-[82px] xl:px-8 2xl:h-[96px] 2xl:px-16">
                        <LogoBlock schoolSetting={schoolSetting} />

                        <nav className="hidden min-w-0 items-center gap-3 xl:flex 2xl:gap-5">
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
                                        className={`relative inline-flex h-[82px] items-center gap-1 text-[11.5px] font-semibold transition 2xl:h-[96px] 2xl:gap-2 2xl:text-[14px] ${
                                            active
                                                ? "text-[#061b46]"
                                                : "text-[#061b46] hover:text-[#d59a25]"
                                        }`}
                                    >
                                        <span>{menu.label}</span>

                                        {menu.dropdownKey ? (
                                            <span className="text-[11px] 2xl:text-[13px]">
                                                ⌄
                                            </span>
                                        ) : null}

                                        <span
                                            className={`absolute bottom-[18px] left-0 h-[2.5px] rounded-full bg-[#d59a25] transition-all 2xl:bottom-[24px] 2xl:h-[3px] ${
                                                active
                                                    ? "w-full"
                                                    : "w-0 hover:w-full"
                                            }`}
                                        />
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="hidden shrink-0 items-center gap-1.5 xl:flex 2xl:gap-3">
                            <button
                                type="button"
                                onMouseEnter={closeMega}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#061b46] transition hover:bg-blue-50 2xl:h-11 2xl:w-11"
                                aria-label="Cari"
                            >
                                <SearchIcon className="h-5 w-5 2xl:h-6 2xl:w-6" />
                            </button>

                            <button
                                type="button"
                                onMouseEnter={closeMega}
                                className="inline-flex h-9 items-center gap-1 rounded-full px-1 text-[11.5px] font-semibold text-[#061b46] transition hover:bg-blue-50 2xl:h-11 2xl:gap-2 2xl:px-2 2xl:text-[14px]"
                            >
                                <GlobeIcon />
                                EN
                            </button>

                            <Link
                                href="/ppdb"
                                onMouseEnter={closeMega}
                                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[10px] bg-[#d59a25] px-4 text-[11px] font-semibold uppercase tracking-[0.03em] text-white shadow-lg shadow-orange-200 transition hover:bg-[#f7c46a] 2xl:min-h-[50px] 2xl:gap-3 2xl:rounded-[12px] 2xl:px-6 2xl:text-[13px]"
                            >
                                Daftar PPDB
                                <span className="hidden 2xl:inline">2026</span>
                                <span>→</span>
                            </Link>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 xl:hidden">
                            <button
                                type="button"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#061b46] transition hover:bg-blue-50 sm:h-11 sm:w-11"
                                aria-label="Cari"
                            >
                                <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsOpen((value) => !value)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#061b46] transition hover:bg-blue-50 sm:h-11 sm:w-11"
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
                    <div className="relative z-[9997] border-b border-slate-200 bg-white px-4 py-4 shadow-xl xl:hidden">
                        <div className="mb-4 rounded-[16px] bg-[#052b66] p-4 text-white">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#f7c46a]">
                                Menu Aktif
                            </p>

                            <h3 className="mt-1 font-serif text-[22px] font-semibold">
                                {activeLabel}
                            </h3>
                        </div>

                        <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
                                className="mt-3 inline-flex min-h-[50px] items-center justify-center rounded-[12px] bg-[#d59a25] px-6 text-[13px] font-semibold uppercase tracking-[0.04em] text-white sm:col-span-2 lg:col-span-3"
                            >
                                Daftar PPDB 2026 →
                            </Link>
                        </nav>
                    </div>
                ) : null}
            </header>

            <main className="relative z-0 w-full overflow-x-hidden">
                {children}
            </main>

            <SiteFooter schoolSetting={schoolSetting} mainMenus={mainMenus} />
        </div>
    );
}