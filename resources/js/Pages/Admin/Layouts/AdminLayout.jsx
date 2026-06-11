import { Link, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

const sidebarGroups = [
    {
        title: "Utama",
        menus: [
            {
                label: "Dashboard",
                href: "/admin/dashboard",
                icon: "📊",
            },
        ],
    },
    {
        title: "Website",
        menus: [
            {
                label: "Setting Sekolah",
                href: "/admin/settings",
                icon: "🏫",
            },
            {
                label: "Navbar Menu",
                href: "/admin/menus",
                icon: "🧭",
            },
            {
                label: "Beranda",
                href: "/admin/home",
                icon: "🏠",
            },
        ],
    },
    {
        title: "Profil Sekolah",
        menus: [
            {
                label: "Profil",
                href: "/admin/profiles",
                icon: "📘",
            },
            {
                label: "Struktur Organisasi",
                href: "/admin/profiles/structure",
                icon: "🏛️",
            },
        ],
    },
    {
        title: "Akademik",
        menus: [
            {
                label: "Setting Akademik",
                href: "/admin/academics",
                icon: "🎓",
            },
            {
                label: "Dewan Guru",
                href: "/admin/academics/teachers",
                icon: "🧑‍🏫",
            },
            {
                label: "Ekstrakurikuler",
                href: "/admin/academics/extracurriculars",
                icon: "🏆",
            },
            {
                label: "Pengurus OSIS",
                href: "/admin/academics/osis-members",
                icon: "👥",
            },
            {
                label: "Prestasi Siswa",
                href: "/admin/academics/achievements",
                icon: "🏅",
            },
        ],
    },
    {
        title: "Kesiswaan",
        menus: [
            {
                label: "Program Kesiswaan",
                href: "/admin/student-programs",
                icon: "👥",
            },
            {
                label: "Pendaftaran Kesiswaan",
                href: "/admin/student-registrations",
                icon: "📝",
            },
        ],
    },
    {
        title: "Konten",
        menus: [
            {
                label: "Informasi",
                href: "/admin/posts",
                icon: "📰",
            },
            {
                label: "Galeri",
                href: "/admin/galleries",
                icon: "🖼️",
            },
        ],
    },
    {
        title: "PPDB",
        menus: [
            {
                label: "Setting PPDB",
                href: "/admin/ppdb-periods",
                icon: "📝",
            },
            {
            label: "Konten PPDB",
            href: "/admin/ppdb-content",
            icon: "🧩",
            },
            {
                label: "Pendaftar PPDB",
                href: "/admin/ppdb-registrations",
                icon: "📂",
            },
        ],
    },
];

function isActiveMenu(currentPath, href) {
    if (href === "/admin/dashboard") {
        return currentPath === "/admin/dashboard";
    }

    return currentPath === href || currentPath.startsWith(`${href}/`);
}

function isActiveGroup(currentPath, menus) {
    return menus.some((menu) => isActiveMenu(currentPath, menu.href));
}

function SidebarMenuItem({ menu, active, onClose }) {
    return (
        <Link
            href={menu.href}
            onClick={onClose}
            className={`group flex min-h-[46px] items-center gap-3 rounded-[14px] px-3 text-[13px] font-bold transition ${
                active
                    ? "bg-white text-[#061b46] shadow-lg shadow-black/10"
                    : "text-blue-50 hover:bg-white/10 hover:text-white"
            }`}
        >
            <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[17px] transition ${
                    active ? "bg-[#f4f8fc]" : "bg-white/5 group-hover:bg-white/10"
                }`}
            >
                {menu.icon}
            </span>

            <span className="min-w-0 truncate">{menu.label}</span>
        </Link>
    );
}

function SidebarGroup({ group, currentPath, onClose }) {
    const activeGroup = isActiveGroup(currentPath, group.menus);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between px-3">
                <p
                    className={`text-[10.5px] font-extrabold uppercase tracking-[0.18em] ${
                        activeGroup ? "text-[#f7c46a]" : "text-blue-200/80"
                    }`}
                >
                    {group.title}
                </p>

                {activeGroup ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f7c46a]" />
                ) : null}
            </div>

            <div className="space-y-1.5">
                {group.menus.map((menu) => {
                    const active = isActiveMenu(currentPath, menu.href);

                    return (
                        <SidebarMenuItem
                            key={menu.href}
                            menu={menu}
                            active={active}
                            onClose={onClose}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function SidebarContent({ currentPath, onClose }) {
    return (
        <div className="flex h-full flex-col bg-[#061b46] text-white">
            <div className="flex min-h-[92px] items-center gap-4 border-b border-white/10 px-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d59a25] text-[22px] font-black text-white shadow-lg shadow-black/20">
                    A
                </div>

                <div className="min-w-0">
                    <h1 className="truncate text-[18px] font-extrabold leading-tight">
                        Admin Sekolah
                    </h1>

                    <p className="mt-1 truncate text-[12px] font-semibold text-blue-100">
                        Custom React Panel
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
                <div className="mb-5 rounded-[18px] border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#f7c46a]">
                        Menu Admin
                    </p>

                    <p className="mt-2 text-[12px] font-medium leading-5 text-blue-100">
                        Kelola konten website sekolah berdasarkan kategori.
                    </p>
                </div>

                <nav className="space-y-6">
                    {sidebarGroups.map((group) => (
                        <SidebarGroup
                            key={group.title}
                            group={group}
                            currentPath={currentPath}
                            onClose={onClose}
                        />
                    ))}
                </nav>
            </div>

            <div className="border-t border-white/10 p-4">
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="flex min-h-[46px] items-center justify-center rounded-[14px] border border-white/15 bg-white/5 px-4 text-[13px] font-bold text-white transition hover:bg-white/10"
                    >
                        Lihat Frontend
                    </Link>

                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="flex min-h-[46px] w-full items-center justify-center rounded-[14px] bg-red-500 px-4 text-[13px] font-bold text-white transition hover:bg-red-600"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}

function Topbar({ title, onOpenSidebar }) {
    const { props } = usePage();

    const user = props.auth?.user;

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
            <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onOpenSidebar}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#061b46] shadow-sm lg:hidden"
                    >
                        ☰
                    </button>

                    <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Admin Panel
                        </p>

                        <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.03em] text-[#061b46] sm:text-[26px]">
                            {title}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                        <p className="text-[13px] font-extrabold text-[#061b46]">
                            {user?.name || "Administrator"}
                        </p>

                        <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
                            {user?.email || "admin@sekolah.test"}
                        </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#061b46] text-[15px] font-black text-white shadow-lg shadow-slate-300">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                    </div>
                </div>
            </div>
        </header>
    );
}

function FlashMessage({ flash }) {
    const message =
        flash?.success || flash?.error || flash?.warning || flash?.info || null;

    if (!message) {
        return null;
    }

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
        <div className="fixed right-4 top-[92px] z-[90] max-w-[360px] sm:right-6">
            <div
                className={`rounded-[16px] border px-5 py-4 text-[13px] font-bold shadow-xl shadow-slate-300/50 ${style[type]}`}
            >
                {message}
            </div>
        </div>
    );
}

export default function AdminLayout({ title = "Dashboard", children }) {
    const { url, props } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const currentPath = useMemo(() => {
        return url?.split("?")[0] || "/admin/dashboard";
    }, [url]);

    return (
        <div className="min-h-screen bg-[#f4f8fc] text-slate-900">
            <FlashMessage flash={props.flash || {}} />

            <aside className="fixed inset-y-0 left-0 z-40 hidden w-[286px] lg:block">
                <SidebarContent currentPath={currentPath} />
            </aside>

            {sidebarOpen ? (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Tutup menu"
                    />

                    <div className="relative h-full w-[286px] max-w-[82vw] shadow-2xl">
                        <SidebarContent
                            currentPath={currentPath}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>
                </div>
            ) : null}

            <div className="lg:pl-[286px]">
                <Topbar
                    title={title}
                    onOpenSidebar={() => setSidebarOpen(true)}
                />

                <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}