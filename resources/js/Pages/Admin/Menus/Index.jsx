import { Head, Link } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

function StatusBadge({ active }) {
    if (active) {
        return (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-emerald-700 ring-1 ring-emerald-100">
                Aktif
            </span>
        );
    }

    return (
        <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-red-700 ring-1 ring-red-100">
            Nonaktif
        </span>
    );
}

function MenuTypeBadge({ parentLabel }) {
    if (parentLabel) {
        return (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-blue-700 ring-1 ring-blue-100">
                Submenu
            </span>
        );
    }

    return (
        <span className="rounded-full bg-[#fff7e6] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#b7791f] ring-1 ring-[#f7d794]">
            Menu Utama
        </span>
    );
}

export default function Index({ menus }) {
    const menuList = Array.isArray(menus) ? menus : [];

    return (
        <AdminLayout title="Navbar Menu">
            <Head title="Navbar Menu" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Navigasi Website
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Kelola Navbar Menu
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Atur menu utama dan submenu yang tampil pada navbar
                        frontend serta mega menu.
                    </p>
                </div>

                <Link
                    href="/admin/menus/create"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#d59a25] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-950/20 transition hover:bg-[#f7c46a]"
                >
                    Tambah Menu
                </Link>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Data Menu
                        </p>

                        <h2 className="mt-1 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                            Daftar Menu Navbar
                        </h2>
                    </div>

                    <p className="rounded-full bg-blue-50 px-4 py-2 text-[12px] font-extrabold text-[#061b46]">
                        Total: {menuList.length} menu
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                                    Menu
                                </th>
                                <th className="px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                                    URL
                                </th>
                                <th className="px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                                    Parent
                                </th>
                                <th className="px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                                    Tipe
                                </th>
                                <th className="px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                                    Urutan
                                </th>
                                <th className="px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-right text-[12px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {menuList.length > 0 ? (
                                menuList.map((menu) => (
                                    <tr
                                        key={menu.id}
                                        className="border-b border-slate-100 last:border-b-0"
                                    >
                                        <td className="px-6 py-5">
                                            <div>
                                                <p className="text-[14px] font-extrabold text-[#061b46]">
                                                    {menu.label}
                                                </p>

                                                <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                                    Dibuat:{" "}
                                                    {menu.created_at || "-"}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-[12px] font-bold text-slate-600">
                                                {menu.url}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">
                                            <p className="text-[13px] font-bold text-slate-600">
                                                {menu.parent_label || "-"}
                                            </p>
                                        </td>

                                        <td className="px-6 py-5">
                                            <MenuTypeBadge
                                                parentLabel={
                                                    menu.parent_label
                                                }
                                            />
                                        </td>

                                        <td className="px-6 py-5">
                                            <p className="text-[13px] font-extrabold text-[#061b46]">
                                                {menu.sort_order}
                                            </p>
                                        </td>

                                        <td className="px-6 py-5">
                                            <StatusBadge
                                                active={menu.is_active}
                                            />
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/menus/${menu.id}/edit`}
                                                    className="inline-flex min-h-[40px] items-center justify-center rounded-[12px] bg-blue-50 px-4 text-[12px] font-extrabold text-blue-700 transition hover:bg-blue-100"
                                                >
                                                    Edit
                                                </Link>

                                                <Link
                                                    href={`/admin/menus/${menu.id}`}
                                                    method="delete"
                                                    as="button"
                                                    preserveScroll
                                                    onBefore={() =>
                                                        confirm(
                                                            "Yakin ingin menghapus menu ini?"
                                                        )
                                                    }
                                                    className="inline-flex min-h-[40px] items-center justify-center rounded-[12px] bg-red-50 px-4 text-[12px] font-extrabold text-red-700 transition hover:bg-red-100"
                                                >
                                                    Hapus
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-6 py-14 text-center"
                                    >
                                        <div className="mx-auto max-w-md">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[30px]">
                                                🧭
                                            </div>

                                            <h3 className="mt-5 text-[20px] font-black text-[#061b46]">
                                                Belum ada menu
                                            </h3>

                                            <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-500">
                                                Tambahkan menu navbar agar
                                                tampil pada frontend website.
                                            </p>

                                            <Link
                                                href="/admin/menus/create"
                                                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-[14px] bg-[#061b46] px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white"
                                            >
                                                Tambah Menu
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}