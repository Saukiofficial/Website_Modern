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
                value={value || ""}
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

function TextArea({ label, name, value, onChange, error, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <textarea
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows="5"
                className="w-full resize-none rounded-[16px] border border-slate-200 bg-white px-4 py-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function PreviewCard({ data, previewLogo, setting }) {
    const logoUrl = previewLogo || setting?.logo_url || null;

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                Preview Frontend
            </p>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
                <div className="flex items-center gap-4">
                    <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#052b66] text-white ring-[4px] ring-blue-100">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={data.school_name || "Logo Sekolah"}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full border border-[#d59a25]/70 text-[18px] font-semibold text-[#f7c46a]">
                                1
                            </div>
                        )}
                    </div>

                    <div className="min-w-0">
                        <h2 className="truncate font-serif text-[24px] font-semibold uppercase leading-tight tracking-[-0.03em] text-[#061b46]">
                            {data.school_name || "SMA Negeri 1 Sumenep"}
                        </h2>

                        <p className="mt-1 truncate text-[13px] font-semibold text-slate-600">
                            {data.tagline ||
                                "Excellence • Character • Leadership"}
                        </p>
                    </div>
                </div>

                <div className="mt-6 space-y-3 rounded-[18px] bg-[#052b66] p-5 text-[13px] font-semibold text-blue-50">
                    {data.address ? <p>📍 {data.address}</p> : null}
                    {data.phone ? <p>☎ {data.phone}</p> : null}
                    {data.email ? <p>✉ {data.email}</p> : null}

                    {!data.address && !data.phone && !data.email ? (
                        <p>Kontak sekolah belum diisi.</p>
                    ) : null}
                </div>
            </div>

            <div className="mt-6 rounded-[20px] border border-blue-100 bg-blue-50 p-5">
                <h3 className="text-[14px] font-extrabold text-[#061b46]">
                    Catatan
                </h3>

                <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-600">
                    Data ini digunakan pada navbar, topbar, footer, dan beberapa
                    bagian global frontend.
                </p>
            </div>
        </div>
    );
}

export default function Edit({ setting }) {
    const { data, setData, post, processing, errors } = useForm({
        school_name: setting?.school_name || "",
        tagline: setting?.tagline || "",
        logo: null,
        phone: setting?.phone || "",
        email: setting?.email || "",
        address: setting?.address || "",
        facebook_url: setting?.facebook_url || "",
        instagram_url: setting?.instagram_url || "",
        youtube_url: setting?.youtube_url || "",
    });

    const previewLogo = data.logo ? URL.createObjectURL(data.logo) : null;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setData(name, value);
    };

    const handleLogoChange = (event) => {
        const file = event.target.files?.[0] || null;

        setData("logo", file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/settings", {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Setting Sekolah">
            <Head title="Setting Sekolah" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Identitas Website
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Setting Sekolah
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola logo, nama sekolah, tagline, kontak, alamat, dan
                        sosial media yang tampil di frontend.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                >
                    Lihat Frontend
                </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_420px] xl:items-start">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8"
                >
                    <div className="border-b border-slate-200 pb-6">
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Data Utama
                        </p>

                        <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                            Informasi Sekolah
                        </h2>
                    </div>

                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <TextInput
                                label="Nama Sekolah"
                                name="school_name"
                                value={data.school_name}
                                onChange={handleChange}
                                error={errors.school_name}
                                placeholder="Contoh: SMA Negeri 1 Sumenep"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextInput
                                label="Tagline"
                                name="tagline"
                                value={data.tagline}
                                onChange={handleChange}
                                error={errors.tagline}
                                placeholder="Contoh: Excellence • Character • Leadership"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                                Logo Sekolah
                            </label>

                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center transition hover:border-[#0b73e8] hover:bg-blue-50">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />

                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[28px] shadow-md">
                                    🖼️
                                </div>

                                <p className="mt-4 text-[14px] font-extrabold text-[#061b46]">
                                    Klik untuk upload logo
                                </p>

                                <p className="mt-2 text-[12px] font-semibold text-slate-500">
                                    Format JPG, PNG, WEBP. Maksimal 2MB.
                                </p>

                                {data.logo ? (
                                    <p className="mt-3 rounded-full bg-blue-100 px-4 py-1 text-[12px] font-bold text-blue-700">
                                        {data.logo.name}
                                    </p>
                                ) : null}
                            </label>

                            {errors.logo ? (
                                <p className="mt-2 text-[12px] font-bold text-red-600">
                                    {errors.logo}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className="mt-10 border-b border-slate-200 pb-6">
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Kontak
                        </p>

                        <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                            Informasi Kontak
                        </h2>
                    </div>

                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                        <TextInput
                            label="Nomor Telepon"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            placeholder="Contoh: 0321-123456"
                        />

                        <TextInput
                            label="Email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                            type="email"
                            placeholder="Contoh: info@sekolah.sch.id"
                        />

                        <div className="md:col-span-2">
                            <TextArea
                                label="Alamat Sekolah"
                                name="address"
                                value={data.address}
                                onChange={handleChange}
                                error={errors.address}
                                placeholder="Tulis alamat lengkap sekolah"
                            />
                        </div>
                    </div>

                    <div className="mt-10 border-b border-slate-200 pb-6">
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Sosial Media
                        </p>

                        <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                            Link Sosial Media
                        </h2>
                    </div>

                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                        <TextInput
                            label="Facebook URL"
                            name="facebook_url"
                            value={data.facebook_url}
                            onChange={handleChange}
                            error={errors.facebook_url}
                            placeholder="https://facebook.com/..."
                        />

                        <TextInput
                            label="Instagram URL"
                            name="instagram_url"
                            value={data.instagram_url}
                            onChange={handleChange}
                            error={errors.instagram_url}
                            placeholder="https://instagram.com/..."
                        />

                        <div className="md:col-span-2">
                            <TextInput
                                label="Youtube URL"
                                name="youtube_url"
                                value={data.youtube_url}
                                onChange={handleChange}
                                error={errors.youtube_url}
                                placeholder="https://youtube.com/..."
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
                        <Link
                            href="/admin/dashboard"
                            className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-slate-200 bg-white px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50"
                        >
                            Kembali
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#061b46] px-7 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>

                <PreviewCard
                    data={data}
                    previewLogo={previewLogo}
                    setting={setting}
                />
            </div>
        </AdminLayout>
    );
}