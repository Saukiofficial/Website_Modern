import { Head, Link, useForm } from "@inertiajs/react";
import ExtracurricularAdminLayout from "../../Layouts/ExtracurricularAdminLayout";

function Input({ label, value, onChange, error, placeholder, type = "text" }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">{label}</label>
            <input
                type={type}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            />
            {error ? <p className="mt-2 text-[12px] font-bold text-red-600">{error}</p> : null}
        </div>
    );
}

function Textarea({ label, value, onChange, error, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">{label}</label>
            <textarea
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={5}
                className="w-full resize-none rounded-[16px] border border-slate-200 bg-white px-4 py-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            />
            {error ? <p className="mt-2 text-[12px] font-bold text-red-600">{error}</p> : null}
        </div>
    );
}

function Toggle({ label, checked, onChange, description }) {
    return (
        <label className="flex min-h-[54px] cursor-pointer items-center justify-between gap-4 rounded-[16px] border border-slate-200 bg-white px-4 py-3">
            <div>
                <span className="text-[13px] font-extrabold text-[#061b46]">{label}</span>
                {description ? <p className="mt-1 text-[11.5px] font-semibold text-slate-500">{description}</p> : null}
            </div>
            <input
                type="checkbox"
                checked={Boolean(checked)}
                onChange={(event) => onChange(event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-teal-700 focus:ring-teal-700"
            />
        </label>
    );
}

export default function Edit({ member, programs = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "put",
        extracurricular_id: member?.extracurricular_id || "",
        student_name: member?.student_name || "",
        nisn: member?.nisn || "",
        class_name: member?.class_name || "",
        gender: member?.gender || "",
        phone: member?.phone || "",
        email: member?.email || "",
        program_title: member?.program_title || "",
        role: member?.role || "Anggota",
        joined_at: member?.joined_at || new Date().toISOString().slice(0, 10),
        note: member?.note || "",
        is_active: Boolean(member?.is_active),
        sort_order: member?.sort_order || 0,
    });

    const selectProgram = (programId) => {
        const selectedProgram = programs.find((program) => String(program.id) === String(programId));

        setData({
            ...data,
            extracurricular_id: programId,
            program_title: selectedProgram?.name || data.program_title,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post(`/admin/ekstrakurikuler/members/${member.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <ExtracurricularAdminLayout title="Edit Anggota Ekskul">
            <Head title="Edit Anggota Ekskul" />

            <div className="mb-6 rounded-[28px] bg-gradient-to-br from-[#052b66] to-[#0f766e] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">Ekstrakurikuler</p>
                <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">Edit Anggota Ekskul</h1>
                <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                    Perbarui data anggota ekstrakurikuler.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                    <div className="border-b border-slate-200 pb-6">
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">Data Utama</p>
                        <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">Informasi Anggota</h2>
                    </div>

                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">Program Ekskul</label>
                            <select
                                value={data.extracurricular_id || ""}
                                onChange={(event) => selectProgram(event.target.value)}
                                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                            >
                                <option value="">Pilih Program</option>
                                {programs.map((program) => (
                                    <option key={program.id} value={program.id}>{program.name}</option>
                                ))}
                            </select>
                            {errors.extracurricular_id ? <p className="mt-2 text-[12px] font-bold text-red-600">{errors.extracurricular_id}</p> : null}
                        </div>

                        <Input label="Nama Program Manual" value={data.program_title} onChange={(event) => setData("program_title", event.target.value)} error={errors.program_title} placeholder="Pramuka / Futsal / Paskibra" />
                        <Input label="Nama Siswa" value={data.student_name} onChange={(event) => setData("student_name", event.target.value)} error={errors.student_name} placeholder="Nama lengkap siswa" />
                        <Input label="NISN" value={data.nisn} onChange={(event) => setData("nisn", event.target.value)} error={errors.nisn} placeholder="NISN siswa" />
                        <Input label="Kelas" value={data.class_name} onChange={(event) => setData("class_name", event.target.value)} error={errors.class_name} placeholder="VII A / VIII B / IX C" />

                        <div>
                            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">Jenis Kelamin</label>
                            <select
                                value={data.gender || ""}
                                onChange={(event) => setData("gender", event.target.value)}
                                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                            >
                                <option value="">Pilih</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        <Input label="No HP" value={data.phone} onChange={(event) => setData("phone", event.target.value)} error={errors.phone} placeholder="08xxxxxxxxxx" />
                        <Input label="Email" type="email" value={data.email} onChange={(event) => setData("email", event.target.value)} error={errors.email} placeholder="email@siswa.com" />
                        <Input label="Peran" value={data.role} onChange={(event) => setData("role", event.target.value)} error={errors.role} placeholder="Anggota / Ketua / Sekretaris" />
                        <Input label="Tanggal Bergabung" type="date" value={data.joined_at} onChange={(event) => setData("joined_at", event.target.value)} error={errors.joined_at} />
                        <Input label="Urutan" type="number" value={data.sort_order} onChange={(event) => setData("sort_order", event.target.value)} error={errors.sort_order} placeholder="0" />
                        <Toggle label="Aktif" description="Tampilkan sebagai anggota aktif." checked={data.is_active} onChange={(checked) => setData("is_active", checked)} />

                        <div className="md:col-span-2">
                            <Textarea label="Catatan" value={data.note} onChange={(event) => setData("note", event.target.value)} error={errors.note} placeholder="Catatan anggota ekskul." />
                        </div>
                    </div>
                </section>

                <div className="sticky bottom-5 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-xl">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <Link href="/admin/ekstrakurikuler/members" className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-slate-200 bg-white px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50">Kembali</Link>
                        <button type="submit" disabled={processing} className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#061b46] px-7 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70">
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </div>
            </form>
        </ExtracurricularAdminLayout>
    );
}
