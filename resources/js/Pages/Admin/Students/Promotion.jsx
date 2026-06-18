import { Head, Link, router, useForm } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

function SummaryCard({ label, value, icon, note }) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {label}
                    </p>
                    <h3 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#061b46]">
                        {value}
                    </h3>
                    {note ? (
                        <p className="mt-1 text-[12px] font-medium text-slate-500">
                            {note}
                        </p>
                    ) : null}
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-blue-50 text-[30px]">
                    {icon}
                </div>
            </div>
        </div>
    );
}

function Field({ label, children, error }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>
            {children}
            {error ? (
                <p className="mt-2 text-[12px] font-semibold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function ActionBadge({ action }) {
    const styles = {
        "Naik kelas": "bg-blue-50 text-blue-700 ring-blue-100",
        Lulus: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        Dilewati: "bg-slate-100 text-slate-500 ring-slate-200",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ring-1 ${
                styles[action] || styles.Dilewati
            }`}
        >
            {action}
        </span>
    );
}

export default function Promotion({
    filters = {},
    summary = {},
    classOptions = [],
    preview = null,
    recentGraduates = [],
}) {
    const { data, setData, post, processing, errors } = useForm({
        mode: filters.mode || "all",
        class_name: filters.class_name || "all",
        new_academic_year: filters.new_academic_year || "",
        graduation_year: filters.graduation_year || new Date().getFullYear(),
    });

    const openPreview = (event) => {
        event.preventDefault();

        router.get(
            "/admin/students/promotion",
            {
                mode: data.mode,
                class_name: data.class_name,
                new_academic_year: data.new_academic_year,
                graduation_year: data.graduation_year,
                preview: 1,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        );
    };

    const submitProcess = (event) => {
        event.preventDefault();

        const message =
            "Yakin ingin memproses kenaikan kelas? Data siswa aktif akan berubah sesuai preview. Siswa kelas 12 akan ditandai lulus dan nonaktif.";

        if (!confirm(message)) return;

        post("/admin/students/promotion/process", {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Kenaikan Kelas">
            <Head title="Kenaikan Kelas" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Master Data Siswa
                    </p>

                    <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Kenaikan Kelas & Kelulusan
                    </h1>

                    <p className="mt-4 max-w-3xl text-[14px] font-medium leading-7 text-blue-100">
                        Proses pergantian tahun ajaran secara otomatis: kelas
                        10 naik ke 11, kelas 11 naik ke 12, dan kelas 12 menjadi
                        alumni/lulus tanpa menghapus data siswa.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/admin/students"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Kembali Data Siswa
                    </Link>
                </div>
            </div>

            <div className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
                <SummaryCard label="Siswa Aktif" value={summary.active || 0} icon="✅" />
                <SummaryCard label="Kelas 10" value={summary.class_10 || 0} icon="🔟" />
                <SummaryCard label="Kelas 11" value={summary.class_11 || 0} icon="1️⃣" />
                <SummaryCard label="Kelas 12" value={summary.class_12 || 0} icon="🎓" />
                <SummaryCard label="Alumni" value={summary.graduated || 0} icon="🏅" />
                <SummaryCard label="Nonaktif" value={summary.inactive || 0} icon="⛔" />
            </div>

            <div className="grid gap-6 xl:grid-cols-[430px_1fr] xl:items-start">
                <aside className="space-y-6 xl:sticky xl:top-[98px]">
                    <form className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                        <div className="mb-6 border-b border-slate-200 pb-5">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                Pengaturan Proses
                            </p>

                            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                Tahun Ajaran Baru
                            </h2>

                            <p className="mt-2 text-[12px] font-medium leading-5 text-slate-500">
                                Gunakan preview terlebih dahulu sebelum proses
                                final agar perubahan kelas bisa dicek.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Field label="Mode Proses" error={errors.mode}>
                                <select
                                    value={data.mode}
                                    onChange={(event) =>
                                        setData("mode", event.target.value)
                                    }
                                    className="h-[52px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="all">Semua siswa aktif</option>
                                    <option value="class">Kelas tertentu</option>
                                </select>
                            </Field>

                            {data.mode === "class" ? (
                                <Field label="Pilih Kelas" error={errors.class_name}>
                                    <select
                                        value={data.class_name}
                                        onChange={(event) =>
                                            setData("class_name", event.target.value)
                                        }
                                        className="h-[52px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                    >
                                        <option value="all">Pilih kelas</option>
                                        {classOptions.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                            ) : null}

                            <Field
                                label="Tahun Ajaran Baru"
                                error={errors.new_academic_year}
                            >
                                <input
                                    type="text"
                                    value={data.new_academic_year || ""}
                                    onChange={(event) =>
                                        setData(
                                            "new_academic_year",
                                            event.target.value
                                        )
                                    }
                                    placeholder="Contoh: 2026/2027"
                                    className="h-[52px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                            </Field>

                            <Field
                                label="Tahun Kelulusan Kelas 12"
                                error={errors.graduation_year}
                            >
                                <input
                                    type="number"
                                    value={data.graduation_year || ""}
                                    onChange={(event) =>
                                        setData("graduation_year", event.target.value)
                                    }
                                    placeholder="Contoh: 2026"
                                    className="h-[52px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                            </Field>

                            <button
                                type="button"
                                onClick={openPreview}
                                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[16px] bg-blue-50 px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-100"
                            >
                                Preview Perubahan
                            </button>

                            <button
                                type="button"
                                onClick={submitProcess}
                                disabled={processing || !preview}
                                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing
                                    ? "Memproses..."
                                    : "Proses Kenaikan Kelas"}
                            </button>
                        </div>
                    </form>

                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                            Aturan Otomatis
                        </p>

                        <div className="mt-4 space-y-3 text-[13px] font-medium leading-6 text-slate-600">
                            <p className="rounded-[16px] bg-slate-50 p-4">
                                <b className="text-[#061b46]">10 A</b> menjadi <b className="text-[#061b46]">11 A</b>
                            </p>
                            <p className="rounded-[16px] bg-slate-50 p-4">
                                <b className="text-[#061b46]">11 B</b> menjadi <b className="text-[#061b46]">12 B</b>
                            </p>
                            <p className="rounded-[16px] bg-slate-50 p-4">
                                <b className="text-[#061b46]">12 C</b> menjadi <b className="text-[#061b46]">Lulus / Alumni</b>
                            </p>
                        </div>
                    </section>
                </aside>

                <main className="space-y-6">
                    {preview ? (
                        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                            <div className="border-b border-slate-200 p-5 sm:p-6">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Preview
                                </p>

                                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                    Data yang Akan Berubah
                                </h2>

                                <div className="mt-5 grid gap-3 md:grid-cols-4">
                                    <div className="rounded-[18px] bg-blue-50 p-4">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-500">
                                            Total
                                        </p>
                                        <p className="mt-2 text-[26px] font-semibold text-blue-900">
                                            {preview.total || 0}
                                        </p>
                                    </div>
                                    <div className="rounded-[18px] bg-slate-50 p-4">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                            10 ke 11
                                        </p>
                                        <p className="mt-2 text-[26px] font-semibold text-[#061b46]">
                                            {preview.to_11 || 0}
                                        </p>
                                    </div>
                                    <div className="rounded-[18px] bg-slate-50 p-4">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                            11 ke 12
                                        </p>
                                        <p className="mt-2 text-[26px] font-semibold text-[#061b46]">
                                            {preview.to_12 || 0}
                                        </p>
                                    </div>
                                    <div className="rounded-[18px] bg-emerald-50 p-4">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-500">
                                            Lulus
                                        </p>
                                        <p className="mt-2 text-[26px] font-semibold text-emerald-800">
                                            {preview.graduated || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {preview.items?.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[920px] text-left">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Siswa</th>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Dari</th>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Menjadi</th>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Aksi</th>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Status Baru</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-slate-100">
                                            {preview.items.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50">
                                                    <td className="px-5 py-5">
                                                        <p className="text-[14px] font-semibold text-[#061b46]">{item.name}</p>
                                                        <p className="mt-1 text-[12px] font-medium text-slate-500">NISN: {item.nisn || "-"}</p>
                                                        <p className="mt-1 text-[12px] font-medium text-slate-400">No Induk: {item.student_number || "-"}</p>
                                                    </td>
                                                    <td className="px-5 py-5 text-[13px] font-semibold text-slate-600">{item.from_class || "-"}</td>
                                                    <td className="px-5 py-5 text-[13px] font-semibold text-[#061b46]">{item.to_class || "-"}</td>
                                                    <td className="px-5 py-5"><ActionBadge action={item.action} /></td>
                                                    <td className="px-5 py-5 text-[13px] font-semibold capitalize text-slate-600">{item.new_status || "-"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="p-10 text-center">
                                    <div className="text-[52px]">📭</div>
                                    <h3 className="mt-4 text-[22px] font-semibold text-[#061b46]">
                                        Tidak Ada Data untuk Diproses
                                    </h3>
                                    <p className="mt-2 text-[13px] font-medium text-slate-500">
                                        Cek kembali mode proses atau kelas yang dipilih.
                                    </p>
                                </div>
                            )}
                        </section>
                    ) : (
                        <section className="rounded-[28px] border border-dashed border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/70">
                            <div className="text-[56px]">🔎</div>
                            <h2 className="mt-4 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                Preview Dulu Sebelum Proses
                            </h2>
                            <p className="mx-auto mt-3 max-w-2xl text-[14px] font-medium leading-7 text-slate-500">
                                Klik tombol Preview Perubahan untuk melihat siapa saja yang naik kelas dan siapa saja yang menjadi alumni.
                            </p>
                        </section>
                    )}

                    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                        <div className="border-b border-slate-200 p-5 sm:p-6">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                Alumni Terbaru
                            </p>
                            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                Riwayat Siswa Lulus
                            </h2>
                        </div>

                        {recentGraduates.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[760px] text-left">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Nama</th>
                                            <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Kelas Terakhir</th>
                                            <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Tahun Lulus</th>
                                            <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Update</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {recentGraduates.map((student) => (
                                            <tr key={student.id}>
                                                <td className="px-5 py-5">
                                                    <p className="text-[14px] font-semibold text-[#061b46]">{student.name}</p>
                                                    <p className="mt-1 text-[12px] font-medium text-slate-500">NISN: {student.nisn || "-"}</p>
                                                </td>
                                                <td className="px-5 py-5 text-[13px] font-semibold text-slate-600">{student.class_label || "-"}</td>
                                                <td className="px-5 py-5 text-[13px] font-semibold text-slate-600">{student.graduation_year || "-"}</td>
                                                <td className="px-5 py-5 text-[13px] font-medium text-slate-500">{student.updated_at || "-"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-10 text-center">
                                <div className="text-[48px]">🎓</div>
                                <h3 className="mt-4 text-[22px] font-semibold text-[#061b46]">
                                    Belum Ada Alumni
                                </h3>
                                <p className="mt-2 text-[13px] font-medium text-slate-500">
                                    Alumni akan muncul setelah kelas 12 diproses lulus.
                                </p>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </AdminLayout>
    );
}
