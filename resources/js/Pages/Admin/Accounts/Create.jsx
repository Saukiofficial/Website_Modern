import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

function Input({ label, value, onChange, error, placeholder, type = "text" }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">{label}</label>
            <input
                type={type}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
            {error ? <p className="mt-2 text-[12px] font-semibold text-red-600">{error}</p> : null}
        </div>
    );
}

function Select({ label, value, onChange, error, children }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">{label}</label>
            <select
                value={value || ""}
                onChange={onChange}
                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            >
                {children}
            </select>
            {error ? <p className="mt-2 text-[12px] font-semibold text-red-600">{error}</p> : null}
        </div>
    );
}

export default function Create({ roles = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        role: "ppdb_admin",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post("/admin/accounts", {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Tambah Akun">
            <Head title="Tambah Akun" />

            <div className="mb-6 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">Manajemen Akun</p>
                <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.05em] sm:text-[42px]">Tambah Akun Admin</h1>
                <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                    Buat akun baru untuk admin PPDB, OSIS, Ekstrakurikuler, atau Super Admin.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                    <div className="border-b border-slate-200 pb-6">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">Data Akun</p>
                        <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">Informasi Login</h2>
                    </div>

                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                        <Input label="Nama Akun" value={data.name} onChange={(event) => setData("name", event.target.value)} error={errors.name} placeholder="Admin PPDB" />
                        <Input label="Email" type="email" value={data.email} onChange={(event) => setData("email", event.target.value)} error={errors.email} placeholder="ppdb@sekolah.test" />
                        <Select label="Role" value={data.role} onChange={(event) => setData("role", event.target.value)} error={errors.role}>
                            {Object.entries(roles).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </Select>
                        <div className="rounded-[18px] bg-blue-50 p-4 text-[13px] font-medium leading-6 text-blue-800 ring-1 ring-blue-100">
                            Role menentukan halaman awal setelah login dan menu yang bisa diakses admin.
                        </div>
                        <Input label="Password" type="password" value={data.password} onChange={(event) => setData("password", event.target.value)} error={errors.password} placeholder="Minimal 6 karakter" />
                        <Input label="Konfirmasi Password" type="password" value={data.password_confirmation} onChange={(event) => setData("password_confirmation", event.target.value)} error={errors.password_confirmation} placeholder="Ulangi password" />
                    </div>
                </section>

                <div className="sticky bottom-5 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-xl">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <Link href="/admin/accounts" className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-slate-200 bg-white px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50">Kembali</Link>
                        <button type="submit" disabled={processing} className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#061b46] px-7 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70">
                            {processing ? "Menyimpan..." : "Simpan Akun"}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
