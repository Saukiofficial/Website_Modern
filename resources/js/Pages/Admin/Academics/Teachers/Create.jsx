import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";

function TeacherForm({ data, setData, errors, processing, onSubmit }) {
    const imagePreview = data.image ? URL.createObjectURL(data.image) : null;

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1fr_360px] xl:items-start">
                <div className="space-y-6">
                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                        <div className="border-b border-slate-200 pb-6">
                            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                Data Utama
                            </p>

                            <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                                Informasi Guru
                            </h2>
                        </div>

                        <div className="mt-7 grid gap-5 md:grid-cols-2">
                            <Input
                                label="Nama Guru"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                error={errors.name}
                                placeholder="Indah Permatasari, S.Pd."
                            />

                            <Input
                                label="Jabatan"
                                value={data.position}
                                onChange={(e) =>
                                    setData("position", e.target.value)
                                }
                                error={errors.position}
                                placeholder="Guru Mata Pelajaran"
                            />

                            <Input
                                label="Mata Pelajaran"
                                value={data.subject}
                                onChange={(e) =>
                                    setData("subject", e.target.value)
                                }
                                error={errors.subject}
                                placeholder="Matematika"
                            />

                            <Input
                                label="Pendidikan"
                                value={data.education}
                                onChange={(e) =>
                                    setData("education", e.target.value)
                                }
                                error={errors.education}
                                placeholder="S1 Pendidikan Matematika"
                            />

                            <Input
                                label="Email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                error={errors.email}
                                placeholder="guru@sekolah.sch.id"
                            />

                            <Input
                                label="Telepon"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                error={errors.phone}
                                placeholder="08123456789"
                            />

                            <Input
                                label="Urutan"
                                type="number"
                                value={data.sort_order}
                                onChange={(e) =>
                                    setData("sort_order", e.target.value)
                                }
                                error={errors.sort_order}
                                placeholder="1"
                            />

                            <div className="grid gap-3 sm:grid-cols-2">
                                <Toggle
                                    label="Featured"
                                    checked={data.is_featured}
                                    onChange={(checked) =>
                                        setData("is_featured", checked)
                                    }
                                />

                                <Toggle
                                    label="Aktif"
                                    checked={data.is_active}
                                    onChange={(checked) =>
                                        setData("is_active", checked)
                                    }
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Textarea
                                    label="Deskripsi"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    error={errors.description}
                                    placeholder="Tulis deskripsi singkat tentang guru."
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="xl:sticky xl:top-[98px]">
                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Foto Guru
                        </p>

                        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        "image",
                                        e.target.files?.[0] || null
                                    )
                                }
                                className="hidden"
                            />

                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="h-[320px] w-full rounded-[20px] object-cover"
                                />
                            ) : (
                                <div className="flex h-[320px] w-full items-center justify-center rounded-[20px] bg-white text-[52px] shadow-sm">
                                    🧑‍🏫
                                </div>
                            )}

                            <p className="mt-4 text-[13px] font-extrabold text-[#061b46]">
                                Klik untuk upload foto
                            </p>

                            <p className="mt-1 text-center text-[11px] font-semibold text-slate-500">
                                JPG, PNG, WEBP. Maksimal 4MB.
                            </p>
                        </label>

                        {errors.image ? (
                            <p className="mt-2 text-[12px] font-bold text-red-600">
                                {errors.image}
                            </p>
                        ) : null}
                    </section>
                </aside>
            </div>

            <div className="sticky bottom-5 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-xl">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <Link
                        href="/admin/academics/teachers"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-slate-200 bg-white px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50"
                    >
                        Kembali
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#061b46] px-7 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {processing ? "Menyimpan..." : "Simpan Guru"}
                    </button>
                </div>
            </div>
        </form>
    );
}

function Input({ label, value, onChange, error, placeholder, type = "text" }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <input
                type={type}
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

function Textarea({ label, value, onChange, error, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <textarea
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={5}
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

function Toggle({ label, checked, onChange }) {
    return (
        <label className="flex h-[54px] cursor-pointer items-center justify-between rounded-[16px] border border-slate-200 bg-white px-4">
            <span className="text-[13px] font-extrabold text-[#061b46]">
                {label}
            </span>

            <input
                type="checkbox"
                checked={Boolean(checked)}
                onChange={(e) => onChange(e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
            />
        </label>
    );
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        position: "",
        subject: "",
        education: "",
        description: "",
        image: null,
        email: "",
        phone: "",
        sort_order: 0,
        is_featured: false,
        is_active: true,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/academics/teachers", {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Tambah Guru">
            <Head title="Tambah Guru" />

            <div className="mb-6 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                    Akademik
                </p>

                <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                    Tambah Guru
                </h1>

                <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                    Tambahkan data guru baru untuk ditampilkan di halaman akademik.
                </p>
            </div>

            <TeacherForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
            />
        </AdminLayout>
    );
}