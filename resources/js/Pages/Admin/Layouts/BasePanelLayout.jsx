import { Link, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

function isActiveMenu(currentPath, href) {
    if (!href) return false;

    return currentPath === href || currentPath.startsWith(`${href}/`);
}

function SidebarMenuItem({ menu, active, onClose }) {
    return (
        <Link
            href={menu.href}
            onClick={onClose}
            className={`group flex min-h-[44px] items-center gap-3 rounded-[14px] px-3 text-[13px] font-semibold transition duration-200 ${
                active
                    ? "bg-white text-[#061b46] shadow-lg shadow-black/10"
                    : "text-blue-50/90 hover:bg-white/10 hover:text-white"
            }`}
        >
            <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[17px] transition ${
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

function SidebarContent({
    currentPath,
    onClose,
    panelName,
    panelSubtitle,
    panelIcon,
    menus,
    accent = "#d59a25",
}) {
    return (
        <div className="flex h-full flex-col bg-[#061b46] text-white">
            <div className="flex min-h-[90px] items-center gap-4 border-b border-white/10 px-5">
                <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] text-[21px] font-semibold text-white shadow-lg shadow-black/20"
                    style={{ backgroundColor: accent }}
                >
                    {panelIcon}
                </div>

                <div className="min-w-0">
                    <h1 className="truncate text-[18px] font-semibold leading-tight text-white">
                        {panelName}
                    </h1>

                    <p className="mt-1 truncate text-[12px] font-medium text-blue-100">
                        {panelSubtitle}
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
                <div className="mb-5 rounded-[18px] border border-white/10 bg-white/5 px-4 py-4">
                    <p
                        className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: accent }}
                    >
                        Panel Khusus
                    </p>

                    <p className="mt-2 text-[12px] font-medium leading-5 text-blue-100">
                        {panelSubtitle}
                    </p>
                </div>

                <nav className="space-y-2 pb-4">
                    {menus.map((menu) => {
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
                </nav>
            </div>
        </div>
    );
}

function Topbar({ title, onOpenSidebar, panelName, accent = "#d59a25" }) {
    const { props } = usePage();
    const user = props.auth?.user;

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
                        <p
                            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                            style={{ color: accent }}
                        >
                            {panelName}
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
                    Frontend
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

export default function BasePanelLayout({
    title = "Dashboard",
    children,
    panelName = "Panel Admin",
    panelSubtitle = "Panel khusus admin sekolah.",
    panelIcon = "A",
    accent = "#d59a25",
    menus = [],
}) {
    const { url, props } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const currentPath = useMemo(() => {
        return url?.split("?")[0] || "/admin/dashboard";
    }, [url]);

    return (
        <div className="min-h-screen bg-[#f4f8fc] text-slate-900">
            <FlashMessage flash={props.flash || {}} />

            <aside className="fixed inset-y-0 left-0 z-40 hidden w-[286px] lg:block">
                <SidebarContent
                    currentPath={currentPath}
                    panelName={panelName}
                    panelSubtitle={panelSubtitle}
                    panelIcon={panelIcon}
                    accent={accent}
                    menus={menus}
                />
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
                            panelName={panelName}
                            panelSubtitle={panelSubtitle}
                            panelIcon={panelIcon}
                            accent={accent}
                            menus={menus}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>
                </div>
            ) : null}

            <div className="lg:pl-[286px]">
                <Topbar
                    title={title}
                    panelName={panelName}
                    accent={accent}
                    onOpenSidebar={() => setSidebarOpen(true)}
                />

                <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}