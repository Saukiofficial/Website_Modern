import { Link, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

const superAdminSidebarGroups = [
    {
        title: "Utama",
        icon: "📌",
        defaultOpen: true,
        menus: [
            {
                label: "Dashboard",
                href: "/admin/dashboard",
                icon: "📊",
            },
        ],
    },
    {
        title: "Panel Khusus",
        icon: "🧩",
        defaultOpen: true,
        menus: [
            {
                label: "Panel PPDB",
                href: "/admin/ppdb/dashboard",
                icon: "📝",
            },
            {
                label: "Panel OSIS",
                href: "/admin/osis/dashboard",
                icon: "👥",
            },
            {
                label: "Panel Ekstrakurikuler",
                href: "/admin/ekstrakurikuler/dashboard",
                icon: "🏆",
            },
        ],
    },
    {
        title: "Master Data",
        icon: "🗃️",
        defaultOpen: true,
        menus: [
            {
                label: "Data Siswa",
                href: "/admin/students",
                icon: "🎒",
                badge: "Soon",
            },
            {
                label: "Data Alumni",
                href: "/admin/alumni",
                icon: "🎓",
                badge: "Soon",
            },
        ],
    },
    {
        title: "Website",
        icon: "🌐",
        defaultOpen: false,
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
        title: "Profil Sekolah",
        icon: "🏛️",
        defaultOpen: false,
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
        icon: "📚",
        defaultOpen: false,
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
        icon: "👥",
        defaultOpen: false,
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
            {
                label: "Pemilihan Ketua OSIS",
                href: "/admin/osis-election",
                icon: "🗳️",
                badge: "Soon",
            },
        ],
    },
    {
        title: "PPDB",
        icon: "📝",
        defaultOpen: false,
        menus: [
            {
                label: "Setting PPDB",
                href: "/admin/ppdb-periods",
                icon: "⚙️",
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

const ppdbSidebarGroups = [
    {
        title: "Panel PPDB",
        icon: "📝",
        defaultOpen: true,
        menus: [
            {
                label: "Dashboard PPDB",
                href: "/admin/ppdb/dashboard",
                icon: "📊",
            },
            {
                label: "Pendaftar PPDB",
                href: "/admin/ppdb/registrations",
                icon: "📂",
            },
            {
                label: "Setting PPDB",
                href: "/admin/ppdb/settings",
                icon: "⚙️",
            },
            {
                label: "Konten PPDB",
                href: "/admin/ppdb/content",
                icon: "🧩",
            },
        ],
    },
];

const osisSidebarGroups = [
    {
        title: "Panel OSIS",
        icon: "👥",
        defaultOpen: true,
        menus: [
            {
                label: "Dashboard OSIS",
                href: "/admin/osis/dashboard",
                icon: "📊",
            },
            {
                label: "Pendaftar OSIS",
                href: "/admin/osis/registrations",
                icon: "📝",
            },
            {
                label: "Pengurus OSIS",
                href: "/admin/osis/members",
                icon: "👥",
            },
        ],
    },
];

const extracurricularSidebarGroups = [
    {
        title: "Panel Ekstrakurikuler",
        icon: "🏆",
        defaultOpen: true,
        menus: [
            {
                label: "Dashboard Ekskul",
                href: "/admin/ekstrakurikuler/dashboard",
                icon: "📊",
            },
            {
                label: "Pendaftar Ekskul",
                href: "/admin/ekstrakurikuler/registrations",
                icon: "📝",
            },
            {
                label: "Program Ekskul",
                href: "/admin/ekstrakurikuler/programs",
                icon: "🏆",
            },
        ],
    },
];

function getSidebarGroupsByRole(role) {
    if (role === "ppdb_admin") {
        return ppdbSidebarGroups;
    }

    if (role === "osis_admin") {
        return osisSidebarGroups;
    }

    if (role === "extracurricular_admin") {
        return extracurricularSidebarGroups;
    }

    return superAdminSidebarGroups;
}

function getRoleLabel(role) {
    return (
        {
            super_admin: "Super Admin",
            ppdb_admin: "Admin PPDB",
            osis_admin: "Admin OSIS",
            extracurricular_admin: "Admin Ekstrakurikuler",
        }[role] || "Administrator"
    );
}

function getPanelDescription(role) {
    return (
        {
            super_admin:
                "Akses penuh untuk mengelola website, PPDB, OSIS, ekstrakurikuler, siswa, dan seluruh fitur sekolah.",
            ppdb_admin:
                "Panel khusus untuk mengelola pendaftaran PPDB, pengaturan PPDB, konten PPDB, dan data pendaftar.",
            osis_admin:
                "Panel khusus untuk mengelola pendaftaran OSIS, seleksi siswa, dan data pengurus OSIS.",
            extracurricular_admin:
                "Panel khusus untuk mengelola pendaftaran ekstrakurikuler dan data program ekstrakurikuler.",
        }[role] ||
        "Kelola konten, master data, PPDB, dan fitur website sekolah berdasarkan kategori."
    );
}

function isActiveMenu(currentPath, href) {
    if (href === "/admin/dashboard") {
        return currentPath === "/admin/dashboard";
    }

    return currentPath === href || currentPath.startsWith(`${href}/`);
}

function isActiveGroup(currentPath, menus) {
    return menus.some((menu) => isActiveMenu(currentPath, menu.href));
}

function getInitialOpenGroups(currentPath, sidebarGroups) {
    const initial = {};

    sidebarGroups.forEach((group) => {
        const activeGroup = isActiveGroup(currentPath, group.menus);
        initial[group.title] = Boolean(group.defaultOpen || activeGroup);
    });

    return initial;
}

function SidebarMenuItem({ menu, active, onClose }) {
    return (
        <Link
            href={menu.href}
            onClick={onClose}
            className={`group flex min-h-[42px] items-center gap-3 rounded-[14px] px-3 text-[13px] font-semibold transition duration-200 ${
                active
                    ? "bg-white text-[#061b46] shadow-lg shadow-black/10"
                    : "text-blue-50/90 hover:bg-white/10 hover:text-white"
            }`}
        >
            <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[16px] transition ${
                    active
                        ? "bg-[#f4f8fc]"
                        : "bg-white/5 group-hover:bg-white/10"
                }`}
            >
                {menu.icon}
            </span>

            <span className="min-w-0 flex-1 truncate">{menu.label}</span>

            {menu.badge ? (
                <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] ${
                        active
                            ? "bg-[#061b46] text-white"
                            : "bg-[#f7c46a]/15 text-[#f7c46a]"
                    }`}
                >
                    {menu.badge}
                </span>
            ) : null}
        </Link>
    );
}

function SidebarGroup({ group, currentPath, onClose, isOpen, onToggle }) {
    const activeGroup = isActiveGroup(currentPath, group.menus);

    return (
        <div className="rounded-[18px] border border-white/10 bg-white/[0.035] p-2">
            <button
                type="button"
                onClick={onToggle}
                className={`flex min-h-[42px] w-full items-center justify-between gap-3 rounded-[14px] px-3 text-left transition ${
                    activeGroup
                        ? "bg-white/10 text-white"
                        : "text-blue-100 hover:bg-white/5 hover:text-white"
                }`}
            >
                <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[16px]">
                        {group.icon}
                    </span>

                    <div className="min-w-0">
                        <p
                            className={`truncate text-[11px] font-semibold uppercase tracking-[0.16em] ${
                                activeGroup
                                    ? "text-[#f7c46a]"
                                    : "text-blue-200/80"
                            }`}
                        >
                            {group.title}
                        </p>

                        <p className="mt-0.5 text-[10.5px] font-medium text-blue-100/60">
                            {group.menus.length} menu
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {activeGroup ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f7c46a]" />
                    ) : null}

                    <span
                        className={`text-[14px] font-semibold transition duration-200 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    >
                        ⌄
                    </span>
                </div>
            </button>

            {isOpen ? (
                <div className="mt-2 space-y-1.5">
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
            ) : null}
        </div>
    );
}

function SidebarContent({ currentPath, onClose, user }) {
    const role = user?.role || "super_admin";
    const sidebarGroups = useMemo(() => getSidebarGroupsByRole(role), [role]);

    const [openGroups, setOpenGroups] = useState(() =>
        getInitialOpenGroups(currentPath, sidebarGroups)
    );

    const toggleGroup = (title) => {
        setOpenGroups((previous) => ({
            ...previous,
            [title]: !previous[title],
        }));
    };

    return (
        <div className="flex h-full flex-col bg-[#061b46] text-white">
            <div className="flex min-h-[88px] items-center gap-4 border-b border-white/10 px-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#d59a25] text-[20px] font-semibold text-white shadow-lg shadow-black/20">
                    {role === "ppdb_admin"
                        ? "P"
                        : role === "osis_admin"
                        ? "O"
                        : role === "extracurricular_admin"
                        ? "E"
                        : "A"}
                </div>

                <div className="min-w-0">
                    <h1 className="truncate text-[18px] font-semibold leading-tight text-white">
                        Admin Sekolah
                    </h1>

                    <p className="mt-1 truncate text-[12px] font-medium text-blue-100">
                        {getRoleLabel(role)}
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
                <div className="mb-5 rounded-[18px] border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7c46a]">
                        {getRoleLabel(role)}
                    </p>

                    <p className="mt-2 text-[12px] font-medium leading-5 text-blue-100">
                        {getPanelDescription(role)}
                    </p>
                </div>

                <nav className="space-y-3 pb-4">
                    {sidebarGroups.map((group) => (
                        <SidebarGroup
                            key={group.title}
                            group={group}
                            currentPath={currentPath}
                            onClose={onClose}
                            isOpen={Boolean(openGroups[group.title])}
                            onToggle={() => toggleGroup(group.title)}
                        />
                    ))}
                </nav>
            </div>
        </div>
    );
}

function Topbar({ title, onOpenSidebar }) {
    const { props } = usePage();
    const user = props.auth?.user;
    const role = user?.role || "super_admin";

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
            <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={onOpenSidebar}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#061b46] shadow-sm transition hover:bg-slate-50 lg:hidden"
                    >
                        ☰
                    </button>

                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                            {getRoleLabel(role)}
                        </p>

                        <h2 className="mt-1 truncate text-[21px] font-semibold tracking-[-0.03em] text-[#061b46] sm:text-[25px]">
                            {title}
                        </h2>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <Link
                        href="/"
                        className="hidden min-h-[42px] items-center justify-center rounded-[14px] border border-slate-200 bg-white px-4 text-[12px] font-semibold text-[#061b46] transition hover:bg-slate-50 md:inline-flex"
                    >
                        Lihat Frontend
                    </Link>

                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="hidden min-h-[42px] items-center justify-center rounded-[14px] bg-red-50 px-4 text-[12px] font-semibold text-red-700 transition hover:bg-red-100 md:inline-flex"
                    >
                        Logout
                    </Link>

                    <div className="hidden text-right sm:block">
                        <p className="text-[13px] font-semibold text-[#061b46]">
                            {user?.name || "Administrator"}
                        </p>

                        <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                            {user?.email || "admin@sekolah.test"}
                        </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#061b46] text-[15px] font-semibold text-white shadow-lg shadow-slate-300">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                    </div>
                </div>
            </div>

            <div className="flex gap-2 border-t border-slate-100 px-4 py-3 md:hidden">
                <Link
                    href="/"
                    className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-[13px] border border-slate-200 bg-white px-4 text-[12px] font-semibold text-[#061b46]"
                >
                    Lihat Frontend
                </Link>

                <Link
                    href="/admin/logout"
                    method="post"
                    as="button"
                    className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-[13px] bg-red-50 px-4 text-[12px] font-semibold text-red-700"
                >
                    Logout
                </Link>
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
                className={`rounded-[16px] border px-5 py-4 text-[13px] font-semibold shadow-xl shadow-slate-300/50 ${style[type]}`}
            >
                {message}
            </div>
        </div>
    );
}

export default function AdminLayout({ title = "Dashboard", children }) {
    const { url, props } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = props.auth?.user;

    const currentPath = useMemo(() => {
        return url?.split("?")[0] || "/admin/dashboard";
    }, [url]);

    return (
        <div className="min-h-screen bg-[#f4f8fc] text-slate-900">
            <FlashMessage flash={props.flash || {}} />

            <aside className="fixed inset-y-0 left-0 z-40 hidden w-[286px] lg:block">
                <SidebarContent currentPath={currentPath} user={user} />
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
                            user={user}
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