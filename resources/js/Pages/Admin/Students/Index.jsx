import { Head, Link, router, useForm } from "@inertiajs/react";
import { useMemo, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";

function SummaryCard({ label, value, icon }) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {label}
                    </p>

                    <h3 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#061b46]">
                        {value}
                    </h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-blue-50 text-[30px]">
                    {icon}
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ active }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ring-1 ${
                active
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                    : "bg-red-50 text-red-700 ring-red-100"
            }`}
        >
            {active ? "Aktif" : "Nonaktif"}
        </span>
    );
}

function Pagination({ links = [] }) {
    if (!links.length) return null;

    return (
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 px-5 py-4">
            {links.map((link, index) => (
                <button
                    key={index}
                    type="button"
                    disabled={!link.url}
                    onClick={() => {
                        if (link.url) {
                            router.visit(link.url, {
                                preserveScroll: true,
                                preserveState: true,
                            });
                        }
                    }}
                    className={`min-h-[38px] rounded-xl px-4 text-[12px] font-semibold transition ${
                        link.active
                            ? "bg-[#061b46] text-white"
                            : link.url
                            ? "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                            : "cursor-not-allowed bg-slate-100 text-slate-300"
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

function Input({ label, value, onChange, error, placeholder, type = "text" }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <input
                type={type}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[50px] w-full rounded-[15px] border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-semibold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function Select({ label, value, onChange, error, children }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <select
                value={value || ""}
                onChange={onChange}
                className="h-[50px] w-full rounded-[15px] border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            >
                {children}
            </select>

            {error ? (
                <p className="mt-2 text-[12px] font-semibold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function Textarea({ label, value, onChange, error, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <textarea
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={4}
                className="w-full resize-none rounded-[15px] border border-slate-200 bg-white px-4 py-4 text-[14px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-semibold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

export default function Index({ students = {}, filters = {}, summary = {} }) {
    const rows = students?.data || [];
    const [editing, setEditing] = useState(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        student_number: "",
        nisn: "",
        name: "",
        gender: "",
        class_level: "",
        class_name: "",
        birth_place: "",
        birth_date: "",
        religion: "",
        address: "",
        phone: "",
        email: "",
        father_name: "",
        mother_name: "",
        photo: null,
        is_active: true,
    });

    const {
        data: importData,
        setData: setImportData,
        post: postImport,
        processing: importing,
        errors: importErrors,
        reset: resetImport,
    } = useForm({
        file: null,
    });

    const classOptions = [
        "10 A", "10 B", "10 C", "10 D", "10 E", "10 F",
        "11 A", "11 B", "11 C", "11 D", "11 E", "11 F",
        "12 A", "12 B", "12 C", "12 D", "12 E", "12 F",
    ];

    const exportUrl = `/admin/students/export?search=${encodeURIComponent(
        filters.search || ""
    )}&class_name=${encodeURIComponent(
        filters.class_name || "all"
    )}&status=${encodeURIComponent(filters.status || "all")}`;

    const photoPreview = useMemo(() => {
        if (data.photo) {
            return URL.createObjectURL(data.photo);
        }

        if (editing?.photo_url) {
            return editing.photo_url;
        }

        return null;
    }, [data.photo, editing]);

    const updateFilter = (key, value) => {
        router.get(
            "/admin/students",
            {
                ...filters,
                [key]: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const startCreate = () => {
        setEditing(null);
        clearErrors();
        reset();

        setData({
            student_number: "",
            nisn: "",
            name: "",
            gender: "",
            class_level: "",
            class_name: "",
            birth_place: "",
            birth_date: "",
            religion: "",
            address: "",
            phone: "",
            email: "",
            father_name: "",
            mother_name: "",
            photo: null,
            is_active: true,
        });
    };

    const startEdit = (student) => {
        setEditing(student);
        clearErrors();

        setData({
            student_number: student.student_number || "",
            nisn: student.nisn || "",
            name: student.name || "",
            gender: student.gender || "",
            class_level: student.class_level || "",
            class_name: student.class_name || "",
            birth_place: student.birth_place || "",
            birth_date: student.birth_date || "",
            religion: student.religion || "",
            address: student.address || "",
            phone: student.phone || "",
            email: student.email || "",
            father_name: student.father_name || "",
            mother_name: student.mother_name || "",
            photo: null,
            is_active: Boolean(student.is_active),
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const submit = (event) => {
        event.preventDefault();

        const url = editing
            ? `/admin/students/${editing.id}`
            : "/admin/students";

        post(url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                startCreate();
            },
        });
    };

    const submitImport = (event) => {
        event.preventDefault();

        postImport("/admin/students/import", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                resetImport();
            },
        });
    };

    const deleteStudent = (student) => {
        if (
            confirm(
                `Yakin ingin menghapus data siswa "${student.name}"? Data yang dihapus tidak bisa dikembalikan.`
            )
        ) {
            router.delete(`/admin/students/${student.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout title="Data Siswa">
            <Head title="Data Siswa" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Master Data
                    </p>

                    <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Data Siswa
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola data siswa kelas 7, 8, dan 9. Data ini nanti
                        dipakai untuk pemilih dan kandidat pada fitur pemilihan
                        Ketua OSIS.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                        href={exportUrl}
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Export CSV
                    </a>

                    <a
                        href="/admin/students/import-template"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Template CSV
                    </a>

                    <button
                        type="button"
                        onClick={startCreate}
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                    >
                        Tambah Siswa
                    </button>
                </div>
            </div>

            <div className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
                <SummaryCard
                    label="Total"
                    value={summary.total || 0}
                    icon="📂"
                />

                <SummaryCard
                    label="Aktif"
                    value={summary.active || 0}
                    icon="✅"
                />

                <SummaryCard
                    label="Nonaktif"
                    value={summary.inactive || 0}
                    icon="⛔"
                />

                <SummaryCard
                    label="Kelas 10"
                    value={summary.class_10 || 0}
                    icon="🔟"
                />

                <SummaryCard
                    label="Kelas 11"
                    value={summary.class_11 || 0}
                    icon="1️⃣1️⃣"
                />

                <SummaryCard
                    label="Kelas 12"
                    value={summary.class_12 || 0}
                    icon="1️⃣2️⃣"
                />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_430px] xl:items-start">
                <div className="space-y-6">
                    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
                        <div className="grid gap-4 lg:grid-cols-[1fr_180px_180px]">
                            <input
                                type="text"
                                defaultValue={filters.search || ""}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        updateFilter(
                                            "search",
                                            event.target.value
                                        );
                                    }
                                }}
                                placeholder="Cari nama, NISN, nomor induk, kelas 10 A / 10B, kontak..."
                                className="h-[52px] rounded-[16px] border border-slate-200 px-4 text-[14px] font-medium outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                            />

                            <select
                                value={filters.class_name || "all"}
                                onChange={(event) =>
                                    updateFilter(
                                        "class_name",
                                        event.target.value
                                    )
                                }
                                className="h-[52px] rounded-[16px] border border-slate-200 px-4 text-[14px] font-medium outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="all">Semua Kelas</option>
                                {classOptions.map((classOption) => (
                                    <option key={classOption} value={classOption}>
                                        {classOption}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={filters.status || "all"}
                                onChange={(event) =>
                                    updateFilter("status", event.target.value)
                                }
                                className="h-[52px] rounded-[16px] border border-slate-200 px-4 text-[14px] font-medium outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="all">Semua Status</option>
                                <option value="active">Aktif</option>
                                <option value="inactive">Nonaktif</option>
                            </select>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 rounded-[18px] bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-[13px] font-semibold text-[#061b46]">
                                    Export mengikuti filter aktif.
                                </p>

                                <p className="mt-1 text-[12px] font-medium text-slate-500">
                                    Kelas:{" "}
                                    {filters.class_name === "all" ||
                                    !filters.class_name
                                        ? "Semua Kelas"
                                        : filters.class_name}{" "}
                                    • Status:{" "}
                                    {filters.status === "all" || !filters.status
                                        ? "Semua Status"
                                        : filters.status === "active"
                                        ? "Aktif"
                                        : "Nonaktif"}{" "}
                                    • Pencarian: {filters.search || "-"}
                                </p>
                            </div>

                            <a
                                href={exportUrl}
                                className="inline-flex min-h-[42px] items-center justify-center rounded-[14px] bg-white px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] ring-1 ring-slate-200 transition hover:bg-blue-50"
                            >
                                Export Data
                            </a>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                        {rows.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[1120px] text-left">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                    Siswa
                                                </th>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                    Kelas
                                                </th>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                    Kontak
                                                </th>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                    Token Voting
                                                </th>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                    Status
                                                </th>
                                                <th className="px-5 py-4 text-right text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-slate-100">
                                            {rows.map((student) => (
                                                <tr
                                                    key={student.id}
                                                    className="hover:bg-slate-50"
                                                >
                                                    <td className="px-5 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-50 text-[18px] font-semibold text-[#061b46]">
                                                                {student.photo_url ? (
                                                                    <img
                                                                        src={
                                                                            student.photo_url
                                                                        }
                                                                        alt={
                                                                            student.name
                                                                        }
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    student.name
                                                                        ?.charAt(
                                                                            0
                                                                        )
                                                                        ?.toUpperCase() ||
                                                                    "S"
                                                                )}
                                                            </div>

                                                            <div>
                                                                <p className="text-[14px] font-semibold text-[#061b46]">
                                                                    {
                                                                        student.name
                                                                    }
                                                                </p>

                                                                <p className="mt-1 text-[12px] font-medium text-slate-500">
                                                                    NISN:{" "}
                                                                    {student.nisn ||
                                                                        "-"}
                                                                </p>

                                                                <p className="mt-1 text-[12px] font-medium text-slate-400">
                                                                    No Induk:{" "}
                                                                    {student.student_number ||
                                                                        "-"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-5 text-[13px] font-semibold text-slate-600">
                                                        {student.class_label ||
                                                            "-"}
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="text-[13px] font-medium text-slate-700">
                                                            {student.phone ||
                                                                "-"}
                                                        </p>

                                                        <p className="mt-1 text-[12px] font-medium text-slate-400">
                                                            {student.email ||
                                                                "-"}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="font-mono text-[13px] font-semibold text-[#061b46]">
                                                            {student.voting_token ||
                                                                "-"}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <StatusBadge
                                                            active={
                                                                student.is_active
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    startEdit(
                                                                        student
                                                                    )
                                                                }
                                                                className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-50 px-4 text-[12px] font-semibold text-blue-700 hover:bg-blue-100"
                                                            >
                                                                Edit
                                                            </button>

                                                            <Link
                                                                href={`/admin/students/${student.id}/generate-token`}
                                                                method="post"
                                                                as="button"
                                                                preserveScroll
                                                                className="inline-flex h-10 items-center justify-center rounded-xl bg-yellow-50 px-4 text-[12px] font-semibold text-yellow-700 hover:bg-yellow-100"
                                                            >
                                                                Token
                                                            </Link>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteStudent(
                                                                        student
                                                                    )
                                                                }
                                                                className="inline-flex h-10 items-center justify-center rounded-xl bg-red-50 px-4 text-[12px] font-semibold text-red-700 hover:bg-red-100"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination links={students.links || []} />
                            </>
                        ) : (
                            <div className="p-10 text-center">
                                <div className="text-[52px]">🎒</div>

                                <h3 className="mt-4 text-[22px] font-semibold text-[#061b46]">
                                    Belum Ada Data Siswa
                                </h3>

                                <p className="mt-2 text-[13px] font-medium text-slate-500">
                                    Tambahkan data siswa atau import dari file
                                    CSV.
                                </p>

                                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                                    <a
                                        href="/admin/students/import-template"
                                        className="inline-flex min-h-[46px] items-center justify-center rounded-[15px] bg-slate-50 px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] ring-1 ring-slate-200 transition hover:bg-blue-50"
                                    >
                                        Download Template
                                    </a>

                                    <button
                                        type="button"
                                        onClick={startCreate}
                                        className="inline-flex min-h-[46px] items-center justify-center rounded-[15px] bg-[#061b46] px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85]"
                                    >
                                        Tambah Siswa
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <aside className="space-y-6 xl:sticky xl:top-[98px]">
                    <form
                        onSubmit={submitImport}
                        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70"
                    >
                        <div className="mb-5 border-b border-slate-200 pb-5">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                Import Data
                            </p>

                            <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                Import Siswa CSV
                            </h2>

                            <p className="mt-2 text-[12px] font-medium leading-5 text-slate-500">
                                Upload file CSV sesuai template. Jika NISN atau
                                nomor induk sudah ada, data akan diperbarui
                                otomatis.
                            </p>
                        </div>

                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center transition hover:border-blue-300 hover:bg-blue-50">
                            <input
                                type="file"
                                accept=".csv,text/csv"
                                onChange={(event) =>
                                    setImportData(
                                        "file",
                                        event.target.files?.[0] || null
                                    )
                                }
                                className="hidden"
                            />

                            <div className="text-[38px]">📥</div>

                            <p className="mt-3 text-[13px] font-semibold text-[#061b46]">
                                {importData.file
                                    ? importData.file.name
                                    : "Pilih file CSV"}
                            </p>

                            <p className="mt-1 text-[12px] font-medium text-slate-500">
                                Format .csv maksimal 4MB
                            </p>
                        </label>

                        {importErrors.file ? (
                            <p className="mt-2 text-[12px] font-semibold text-red-600">
                                {importErrors.file}
                            </p>
                        ) : null}

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <a
                                href="/admin/students/import-template"
                                className="inline-flex min-h-[46px] items-center justify-center rounded-[15px] bg-slate-50 px-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] ring-1 ring-slate-200 transition hover:bg-blue-50"
                            >
                                Template
                            </a>

                            <button
                                type="submit"
                                disabled={importing || !importData.file}
                                className="inline-flex min-h-[46px] items-center justify-center rounded-[15px] bg-[#061b46] px-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {importing ? "Import..." : "Import"}
                            </button>
                        </div>
                    </form>

                    <form
                        onSubmit={submit}
                        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70"
                    >
                        <div className="mb-6 border-b border-slate-200 pb-5">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                {editing ? "Edit Data" : "Tambah Data"}
                            </p>

                            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                {editing ? "Edit Siswa" : "Tambah Siswa"}
                            </h2>

                            {editing ? (
                                <button
                                    type="button"
                                    onClick={startCreate}
                                    className="mt-3 text-[12px] font-semibold text-blue-700 hover:underline"
                                >
                                    + Tambah data baru
                                </button>
                            ) : null}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <label className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-[18px] border-2 border-dashed border-slate-200 bg-slate-50 text-[12px] font-semibold text-slate-400">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) =>
                                            setData(
                                                "photo",
                                                event.target.files?.[0] || null
                                            )
                                        }
                                        className="hidden"
                                    />

                                    {photoPreview ? (
                                        <img
                                            src={photoPreview}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        "Foto"
                                    )}
                                </label>

                                <div>
                                    <p className="text-[13px] font-semibold text-[#061b46]">
                                        Foto Siswa
                                    </p>

                                    <p className="mt-1 text-[12px] font-medium text-slate-500">
                                        Opsional. JPG, PNG, WEBP maksimal 2MB.
                                    </p>

                                    {errors.photo ? (
                                        <p className="mt-2 text-[12px] font-semibold text-red-600">
                                            {errors.photo}
                                        </p>
                                    ) : null}
                                </div>
                            </div>

                            <Input
                                label="Nama Siswa"
                                value={data.name}
                                onChange={(event) =>
                                    setData("name", event.target.value)
                                }
                                error={errors.name}
                                placeholder="Contoh: Ahmad Fauzi"
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Nomor Induk"
                                    value={data.student_number}
                                    onChange={(event) =>
                                        setData(
                                            "student_number",
                                            event.target.value
                                        )
                                    }
                                    error={errors.student_number}
                                    placeholder="Contoh: 2026001"
                                />

                                <Input
                                    label="NISN"
                                    value={data.nisn}
                                    onChange={(event) =>
                                        setData("nisn", event.target.value)
                                    }
                                    error={errors.nisn}
                                    placeholder="Contoh: 1234567890"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Select
                                    label="Jenis Kelamin"
                                    value={data.gender}
                                    onChange={(event) =>
                                        setData("gender", event.target.value)
                                    }
                                    error={errors.gender}
                                >
                                    <option value="">Pilih</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </Select>

                                <Select
                                    label="Status"
                                    value={data.is_active ? "1" : "0"}
                                    onChange={(event) =>
                                        setData(
                                            "is_active",
                                            event.target.value === "1"
                                        )
                                    }
                                    error={errors.is_active}
                                >
                                    <option value="1">Aktif</option>
                                    <option value="0">Nonaktif</option>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Select
                                    label="Tingkat"
                                    value={data.class_level}
                                    onChange={(event) =>
                                        setData(
                                            "class_level",
                                            event.target.value
                                        )
                                    }
                                    error={errors.class_level}
                                >
                                    <option value="">Pilih</option>
                                    <option value="10">Kelas 10</option>
                                    <option value="11">Kelas 11</option>
                                    <option value="12">Kelas 12</option>
                                </Select>

                                <Input
                                    label="Rombel"
                                    value={data.class_name}
                                    onChange={(event) =>
                                        setData(
                                            "class_name",
                                            event.target.value
                                        )
                                    }
                                    error={errors.class_name}
                                    placeholder="Contoh: A / 7A"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Tempat Lahir"
                                    value={data.birth_place}
                                    onChange={(event) =>
                                        setData(
                                            "birth_place",
                                            event.target.value
                                        )
                                    }
                                    error={errors.birth_place}
                                    placeholder="Contoh: Jakarta"
                                />

                                <Input
                                    label="Tanggal Lahir"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(event) =>
                                        setData(
                                            "birth_date",
                                            event.target.value
                                        )
                                    }
                                    error={errors.birth_date}
                                />
                            </div>

                            <Input
                                label="Agama"
                                value={data.religion}
                                onChange={(event) =>
                                    setData("religion", event.target.value)
                                }
                                error={errors.religion}
                                placeholder="Contoh: Islam"
                            />

                            <Textarea
                                label="Alamat"
                                value={data.address}
                                onChange={(event) =>
                                    setData("address", event.target.value)
                                }
                                error={errors.address}
                                placeholder="Alamat lengkap siswa"
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="No HP"
                                    value={data.phone}
                                    onChange={(event) =>
                                        setData("phone", event.target.value)
                                    }
                                    error={errors.phone}
                                    placeholder="08xxxxxxxxxx"
                                />

                                <Input
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    onChange={(event) =>
                                        setData("email", event.target.value)
                                    }
                                    error={errors.email}
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Nama Ayah"
                                    value={data.father_name}
                                    onChange={(event) =>
                                        setData(
                                            "father_name",
                                            event.target.value
                                        )
                                    }
                                    error={errors.father_name}
                                    placeholder="Nama ayah"
                                />

                                <Input
                                    label="Nama Ibu"
                                    value={data.mother_name}
                                    onChange={(event) =>
                                        setData(
                                            "mother_name",
                                            event.target.value
                                        )
                                    }
                                    error={errors.mother_name}
                                    placeholder="Nama ibu"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : editing
                                    ? "Update Siswa"
                                    : "Simpan Siswa"}
                            </button>
                        </div>
                    </form>
                </aside>
            </div>
        </AdminLayout>
    );
}