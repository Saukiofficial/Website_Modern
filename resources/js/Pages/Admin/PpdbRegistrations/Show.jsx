import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

function StatusBadge({ status }) {
    const styles = {
        Baru: "bg-yellow-50 text-yellow-700 ring-yellow-100",
        Diproses: "bg-blue-50 text-blue-700 ring-blue-100",
        Diterima: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        Ditolak: "bg-red-50 text-red-700 ring-red-100",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] ring-1 ${
                styles[status] || styles.Baru
            }`}
        >
            {status || "Baru"}
        </span>
    );
}

function InfoItem({ label, value }) {
    return (
        <div className="rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                {label}
            </p>

            <p className="mt-2 text-[14px] font-bold text-[#061b46]">
                {value || "-"}
            </p>
        </div>
    );
}

function DocumentLink({ label, url }) {
    return (
        <a
            href={url || "#"}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-between gap-4 rounded-[14px] border px-4 py-4 transition ${
                url
                    ? "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                    : "pointer-events-none border-slate-200 bg-slate-50 opacity-50"
            }`}
        >
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[20px]">
                    📄
                </div>

                <div>
                    <p className="text-[13px] font-black text-[#061b46]">
                        {label}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-500">
                        {url ? "Klik untuk membuka dokumen" : "Belum tersedia"}
                    </p>
                </div>
            </div>

            <span className="text-[20px] text-[#052b66]">↗</span>
        </a>
    );
}

function FormPreview({ registration }) {
    return (
        <div className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="mx-auto min-h-[780px] max-w-[760px] rounded-[8px] border border-slate-200 bg-white p-7 shadow-inner">
                <div className="border-b-4 border-[#061b46] pb-5 text-center">
                    <h2 className="text-[22px] font-black uppercase tracking-[0.04em] text-[#061b46]">
                        Formulir Pendaftaran Peserta Didik Baru
                    </h2>

                    <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        SMA Negeri 1 Sumenep
                    </p>

                    <p className="mt-2 text-[13px] font-bold text-[#061b46]">
                        Nomor Pendaftaran:{" "}
                        {registration.registration_number || "-"}
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-[150px_1fr] gap-6">
                    <div>
                        <div className="flex h-[190px] w-[140px] items-center justify-center overflow-hidden rounded-[10px] border border-slate-300 bg-slate-50">
                            {registration.photo_url ? (
                                <img
                                    src={registration.photo_url}
                                    alt={registration.student_name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-[12px] font-bold text-slate-400">
                                    Pas Foto
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <InfoItem
                            label="Nama Lengkap"
                            value={registration.student_name}
                        />
                        <InfoItem label="NISN" value={registration.nisn} />
                        <InfoItem
                            label="Jenis Kelamin"
                            value={registration.gender}
                        />
                    </div>
                </div>

                <div className="mt-7">
                    <h3 className="mb-3 rounded-[8px] bg-[#061b46] px-4 py-2 text-[13px] font-black uppercase tracking-[0.1em] text-white">
                        A. Data Calon Siswa
                    </h3>

                    <div className="grid gap-3 md:grid-cols-2">
                        <InfoItem
                            label="Tempat Lahir"
                            value={registration.birth_place}
                        />
                        <InfoItem
                            label="Tanggal Lahir"
                            value={registration.birth_date_label}
                        />
                        <InfoItem label="Agama" value={registration.religion} />
                        <InfoItem
                            label="Asal Sekolah"
                            value={registration.previous_school}
                        />
                        <div className="md:col-span-2">
                            <InfoItem
                                label="Alamat"
                                value={registration.address}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-7">
                    <h3 className="mb-3 rounded-[8px] bg-[#061b46] px-4 py-2 text-[13px] font-black uppercase tracking-[0.1em] text-white">
                        B. Data Orang Tua / Wali
                    </h3>

                    <div className="grid gap-3 md:grid-cols-2">
                        <InfoItem
                            label="Nama Ayah"
                            value={registration.father_name}
                        />
                        <InfoItem
                            label="Pekerjaan Ayah"
                            value={registration.father_job}
                        />
                        <InfoItem
                            label="Nama Ibu"
                            value={registration.mother_name}
                        />
                        <InfoItem
                            label="Pekerjaan Ibu"
                            value={registration.mother_job}
                        />
                        <InfoItem label="No. HP" value={registration.phone} />
                        <InfoItem label="Email" value={registration.email} />
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-10 pt-10 text-center">
                    <div>
                        <div className="mx-auto h-[80px] border-b border-slate-400" />
                        <p className="mt-2 text-[12px] font-bold text-[#061b46]">
                            Orang Tua / Wali
                        </p>
                    </div>

                    <div>
                        <div className="mx-auto h-[80px] border-b border-slate-400" />
                        <p className="mt-2 text-[12px] font-bold text-[#061b46]">
                            Panitia PPDB
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Show({ registration }) {
    const { data, setData, put, processing, errors } = useForm({
        status: registration.status || "Baru",
        admin_note: registration.admin_note || "",
    });

    const handleUpdate = (event) => {
        event.preventDefault();

        put(`/admin/ppdb-registrations/${registration.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Detail Pendaftar PPDB">
            <Head title="Detail Pendaftar PPDB" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Detail Pendaftar
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        {registration.student_name}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <StatusBadge status={registration.status} />

                        <span className="text-[13px] font-semibold text-blue-100">
                            {registration.registration_number || "-"}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/admin/ppdb-registrations"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Kembali
                    </Link>

                    <a
                        href={`/admin/ppdb-registrations/${registration.id}/print`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                    >
                        Download / Print Formulir
                    </a>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_360px] xl:items-start">
                <div className="space-y-6">
                    <FormPreview registration={registration} />

                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                        <h2 className="text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                            Dokumen Pendaftar
                        </h2>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <DocumentLink
                                label="Kartu Keluarga"
                                url={registration.family_card_url}
                            />
                            <DocumentLink
                                label="Akta Kelahiran"
                                url={registration.birth_certificate_url}
                            />
                            <DocumentLink
                                label="Ijazah / SKL"
                                url={registration.certificate_url}
                            />
                            <DocumentLink
                                label="Rapor Terakhir"
                                url={registration.report_card_url}
                            />
                            <DocumentLink
                                label="Pas Foto"
                                url={registration.photo_url}
                            />
                        </div>
                    </section>
                </div>

                <aside className="xl:sticky xl:top-[98px]">
                    <form
                        onSubmit={handleUpdate}
                        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70"
                    >
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Verifikasi
                        </p>

                        <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                            Status Pendaftaran
                        </h2>

                        <div className="mt-6 space-y-5">
                            <div>
                                <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                                    Status
                                </label>

                                <select
                                    value={data.status}
                                    onChange={(event) =>
                                        setData("status", event.target.value)
                                    }
                                    className="h-[52px] w-full rounded-[16px] border border-slate-200 px-4 text-[14px] font-semibold outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="Baru">Baru</option>
                                    <option value="Diproses">Diproses</option>
                                    <option value="Diterima">Diterima</option>
                                    <option value="Ditolak">Ditolak</option>
                                </select>

                                {errors.status ? (
                                    <p className="mt-2 text-[12px] font-bold text-red-600">
                                        {errors.status}
                                    </p>
                                ) : null}
                            </div>

                            <div>
                                <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                                    Catatan Admin
                                </label>

                                <textarea
                                    value={data.admin_note || ""}
                                    onChange={(event) =>
                                        setData(
                                            "admin_note",
                                            event.target.value
                                        )
                                    }
                                    rows={5}
                                    placeholder="Catatan verifikasi..."
                                    className="w-full resize-none rounded-[16px] border border-slate-200 px-4 py-4 text-[14px] font-semibold outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />

                                {errors.admin_note ? (
                                    <p className="mt-2 text-[12px] font-bold text-red-600">
                                        {errors.admin_note}
                                    </p>
                                ) : null}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Verifikasi"}
                            </button>
                        </div>
                    </form>
                </aside>
            </div>
        </AdminLayout>
    );
}