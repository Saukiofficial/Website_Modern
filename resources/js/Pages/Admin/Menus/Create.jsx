import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

function TextInput({
    label,
    name,
    value,
    onChange,
    error,
    placeholder,
    type = "text",
}) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function SelectInput({ label, name, value, onChange, error, children }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            >
                {children}
            </select>

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function PreviewCard({ data }) {
    const isSubmenu = data.parent_id !== "";

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                Preview Menu
            </p>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
                <div className="rounded-[18px] bg-white p-5 shadow-sm">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                        Label
                    </p>

                    <h3 className="mt-2 text-[22px] font-black text-[#061b46]">
                        {data.label || "Nama Menu"}
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold text-blue-700">
                            {isSubmenu ? "Submenu" : "Menu Utama"}
                        </span>

                        <span
                            className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${
                                data.is_active
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-red-50 text-red-700"
                            }`}
                        >
                            {data.is_active ? "Aktif" : "Nonaktif"}
                        </span>
                    </div>

                    <div className="mt-5 rounded-[14px] bg-slate-100 px-4 py-3 text-[13px] font-bold text-slate-600">
                        {data.url || "/contoh-url"}
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-[20px] border border-blue-100 bg-blue-50 p-5">
                <h3 className="text-[14px] font-extrabold text-[#061b46]">
                    Catatan
                </h3>

                <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-600">
                    Jika memilih parent menu, data ini akan menjadi submenu dan
                    akan tampil di mega menu pada frontend.
                </p>
            </div>
        </div>
    );
}

export default function Create({ parentMenus }) {
    const parents = Array.isArray(parentMenus) ? parentMenus : [];

    const { data, setData, post, processing, errors } = useForm({
        label: "",
        url: "",
        parent_id: "",
        sort_order: 0,
        is_active: true,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setData(name, type === "checkbox" ? checked : value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/menus", {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Tambah Navbar Menu">
            <Head title="Tambah Navbar Menu" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Navigasi Website
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Tambah Menu Navbar
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Tambahkan menu utama atau submenu untuk mega menu
                        frontend.
                    </p>
                </div>

                <Link
                    href="/admin/menus"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                >
                    Kembali
                </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_420px] xl:items-start">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8"
                >
                    <div className="border-b border-slate-200 pb-6">
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Form Menu
                        </p>

                        <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                            Informasi Menu
                        </h2>
                    </div>

                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <TextInput
                                label="Label Menu"
                                name="label"
                                value={data.label}
                                onChange={handleChange}
                                error={errors.label}
                                placeholder="Contoh: Profil"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextInput
                                label="URL / Link"
                                name="url"
                                value={data.url}
                                onChange={handleChange}
                                error={errors.url}
                                placeholder="Contoh: /profil"
                            />
                        </div>

                        <SelectInput
                            label="Parent Menu"
                            name="parent_id"
                            value={data.parent_id}
                            onChange={handleChange}
                            error={errors.parent_id}
                        >
                            <option value="">Tidak ada / Menu utama</option>

                            {parents.map((parent) => (
                                <option key={parent.id} value={parent.id}>
                                    {parent.label}
                                </option>
                            ))}
                        </SelectInput>

                        <TextInput
                            label="Urutan"
                            name="sort_order"
                            type="number"
                            value={data.sort_order}
                            onChange={handleChange}
                            error={errors.sort_order}
                            placeholder="0"
                        />

                        <div className="md:col-span-2">
                            <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-slate-50 px-5 py-4">
                                <div>
                                    <p className="text-[14px] font-extrabold text-[#061b46]">
                                        Status Menu
                                    </p>
                                    <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                        Aktifkan agar menu tampil di frontend.
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={data.is_active}
                                    onChange={handleChange}
                                    className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                                />
                            </label>

                            {errors.is_active ? (
                                <p className="mt-2 text-[12px] font-bold text-red-600">
                                    {errors.is_active}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
                        <Link
                            href="/admin/menus"
                            className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-slate-200 bg-white px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50"
                        >
                            Batal
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#061b46] px-7 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing ? "Menyimpan..." : "Simpan Menu"}
                        </button>
                    </div>
                </form>

                <PreviewCard data={data} />
            </div>
        </AdminLayout>
    );
}