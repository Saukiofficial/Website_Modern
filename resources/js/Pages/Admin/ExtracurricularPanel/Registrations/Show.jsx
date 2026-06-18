import { Head, Link, useForm } from "@inertiajs/react";
import ExtracurricularAdminLayout from "../../Layouts/ExtracurricularAdminLayout";

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
            {status}
        </span>
    );
}

function DetailItem({ label, value }) {
    return (
        <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                {label}
            </p>

            <p className="mt-2 text-[14px] font-bold leading-6 text-[#061b46]">
                {value || "-"}
            </p>
        </div>
    );
}

function TextBlock({ label, value }) {
    return (
        <div className="rounded-[20px] border border-slate-200 bg-white p-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                {label}
            </p>

            <p className="mt-3 whitespace-pre-line text-[14px] font-medium leading-7 text-slate-600">
                {value || "-"}
            </p>
        </div>
    );
}

function formatExtraLabel(key) {
    return String(key || "")
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Show({ registration }) {
    const { data, setData, put, processing, errors } = useForm({
        status: registration?.status || "Baru",
        admin_note: registration?.admin_note || "",
        approved_role: registration?.approved_role || "",
        publish_to_frontend: Boolean(registration?.publish_to_frontend),
    });

    const extraData = registration?.extra_data || {};

    const handleSubmit = (event) => {
        event.preventDefault();

        put(`/admin/ekstrakurikuler/registrations/${registration.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <ExtracurricularAdminLayout title="Detail Pendaftaran Ekstrakurikuler">
            <Head title="Detail Pendaftaran Ekstrakurikuler" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Detail Pendaftaran
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        {registration.student_name}
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        {registration.type_label} • Dikirim pada{" "}
                        {registration.submitted_at || "-"}
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/admin/ekstrakurikuler/registrations"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Kembali
                    </Link>

                    <Link
                        href={`/admin/ekstrakurikuler/registrations/${registration.id}`}
                        method="delete"
                        as="button"
                        preserveScroll
                        onBefore={() =>
                            confirm(
                                "Yakin ingin menghapus data pendaftaran ini?"
                            )
                        }
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-red-500 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-red-600"
                    >
                        Hapus
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_380px] xl:items-start">
                <div className="space-y-6">
                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                        <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Data Siswa
                                </p>

                                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                                    Informasi Pendaftar
                                </h2>
                            </div>

                            <StatusBadge status={registration.status} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <DetailItem
                                label="Nama Lengkap"
                                value={registration.student_name}
                            />

                            <DetailItem label="NISN" value={registration.nisn} />

                            <DetailItem
                                label="Kelas"
                                value={registration.class_name}
                            />

                            <DetailItem
                                label="Nomor HP / WhatsApp"
                                value={registration.phone}
                            />

                            <DetailItem
                                label="Email"
                                value={registration.email}
                            />

                            <DetailItem
                                label="Jenis Form"
                                value={registration.type_label}
                            />
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                        <div className="border-b border-slate-200 pb-6">
                            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                Jawaban Form
                            </p>

                            <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                                Detail Jawaban Pendaftar
                            </h2>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {Object.entries(extraData).map(([key, value]) => (
                                <DetailItem
                                    key={key}
                                    label={formatExtraLabel(key)}
                                    value={value}
                                />
                            ))}
                        </div>

                        <div className="mt-6 grid gap-4">
                            <TextBlock
                                label="Pengalaman / Riwayat Kegiatan"
                                value={registration.experience}
                            />

                            <TextBlock
                                label="Alasan / Keterangan"
                                value={registration.reason}
                            />
                        </div>
                    </section>
                </div>

                <aside className="xl:sticky xl:top-[98px]">
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70"
                    >
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Proses Admin
                        </p>

                        <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                            Update Status
                        </h2>

                        <div className="mt-6">
                            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                                Status
                            </label>

                            <select
                                value={data.status}
                                onChange={(event) =>
                                    setData("status", event.target.value)
                                }
                                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
                            >
                                <option>Baru</option>
                                <option>Diproses</option>
                                <option>Diterima</option>
                                <option>Ditolak</option>
                            </select>

                            {errors.status ? (
                                <p className="mt-2 text-[12px] font-bold text-red-600">
                                    {errors.status}
                                </p>
                            ) : null}
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                                Jabatan / Pekstrakurikuleri Diterima
                            </label>

                            <input
                                type="text"
                                value={data.approved_role}
                                onChange={(event) =>
                                    setData("approved_role", event.target.value)
                                }
                                placeholder="Contoh: Ketua Ekstrakurikuler, Sekretaris, Seksi Humas"
                                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
                            />

                            {errors.approved_role ? (
                                <p className="mt-2 text-[12px] font-bold text-red-600">
                                    {errors.approved_role}
                                </p>
                            ) : null}
                        </div>

                        <label className="mt-5 flex min-h-[54px] cursor-pointer items-center justify-between gap-4 rounded-[16px] border border-slate-200 bg-white px-4 py-3">
                            <div>
                                <span className="text-[13px] font-extrabold text-[#061b46]">
                                    Tampilkan ke Frontend
                                </span>
                                <p className="mt-1 text-[11.5px] font-semibold text-slate-500">
                                    Aktifkan jika siswa diterima dan ingin ditampilkan sebagai pengurus Ekstrakurikuler.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={Boolean(data.publish_to_frontend)}
                                onChange={(event) =>
                                    setData("publish_to_frontend", event.target.checked)
                                }
                                className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                            />
                        </label>

                        <div className="mt-5">
                            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                                Catatan Admin
                            </label>

                            <textarea
                                value={data.admin_note}
                                onChange={(event) =>
                                    setData("admin_note", event.target.value)
                                }
                                rows={6}
                                placeholder="Tulis catatan admin jika diperlukan."
                                className="w-full resize-none rounded-[16px] border border-slate-200 bg-white px-4 py-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
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
                            className="mt-6 inline-flex min-h-[50px] w-full items-center justify-center rounded-[16px] bg-[#061b46] px-7 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing ? "Menyimpan..." : "Simpan Status"}
                        </button>
                    </form>
                </aside>
            </div>
        </ExtracurricularAdminLayout>
    );
}