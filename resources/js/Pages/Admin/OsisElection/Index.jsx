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

function StatusBadge({ active, trueText = "Aktif", falseText = "Nonaktif" }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ring-1 ${
                active
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                    : "bg-red-50 text-red-700 ring-red-100"
            }`}
        >
            {active ? trueText : falseText}
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

function Textarea({ label, value, onChange, error, placeholder, rows = 4 }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <textarea
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
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

function Toggle({ label, description, checked, onChange }) {
    return (
        <label className="flex min-h-[58px] cursor-pointer items-center justify-between gap-4 rounded-[16px] border border-slate-200 bg-white px-4 py-3">
            <div>
                <span className="text-[13px] font-semibold text-[#061b46]">
                    {label}
                </span>

                {description ? (
                    <p className="mt-1 text-[11.5px] font-medium text-slate-500">
                        {description}
                    </p>
                ) : null}
            </div>

            <input
                type="checkbox"
                checked={Boolean(checked)}
                onChange={(event) => onChange(event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-[#061b46] focus:ring-[#061b46]"
            />
        </label>
    );
}

export default function Index({
    periods = [],
    activePeriod = null,
    candidates = [],
    voters = {},
    results = [],
    students = [],
    summary = {},
    filters = {},
}) {
    const voterRows = voters?.data || [];
    const [editingPeriod, setEditingPeriod] = useState(null);

    const selectedPeriodId = filters?.period_id || activePeriod?.id || "";

    const {
        data: periodData,
        setData: setPeriodData,
        post: postPeriod,
        processing: processingPeriod,
        errors: periodErrors,
        reset: resetPeriod,
        clearErrors: clearPeriodErrors,
    } = useForm({
        title: "",
        academic_year: "",
        start_at: "",
        end_at: "",
        description: "",
        is_active: false,
        show_result: false,
        is_secret_vote: true,
    });

    const {
        data: candidateData,
        setData: setCandidateData,
        post: postCandidate,
        processing: processingCandidate,
        errors: candidateErrors,
        reset: resetCandidate,
    } = useForm({
        period_id: activePeriod?.id || "",
        student_id: "",
        candidate_number: "",
        name: "",
        class_label: "",
        photo: null,
        slogan: "",
        vision: "",
        mission: "",
        is_active: true,
    });

    const selectedStudent = useMemo(() => {
        if (!candidateData.student_id) return null;

        return students.find(
            (student) => String(student.id) === String(candidateData.student_id)
        );
    }, [candidateData.student_id, students]);

    const candidatePhotoPreview = useMemo(() => {
        if (candidateData.photo) {
            return URL.createObjectURL(candidateData.photo);
        }

        if (selectedStudent?.photo_url) {
            return selectedStudent.photo_url;
        }

        return null;
    }, [candidateData.photo, selectedStudent]);

    const resultMaxVotes = useMemo(() => {
        if (!results.length) return 0;

        return Math.max(...results.map((item) => item.votes_count || 0));
    }, [results]);

    const selectPeriod = (periodId) => {
        router.get(
            "/admin/osis-election",
            {
                period_id: periodId,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        );
    };

    const startCreatePeriod = () => {
        setEditingPeriod(null);
        clearPeriodErrors();
        resetPeriod();

        setPeriodData({
            title: "",
            academic_year: "",
            start_at: "",
            end_at: "",
            description: "",
            is_active: false,
            show_result: false,
            is_secret_vote: true,
        });
    };

    const startEditPeriod = (period) => {
        setEditingPeriod(period);
        clearPeriodErrors();

        setPeriodData({
            title: period.title || "",
            academic_year: period.academic_year || "",
            start_at: period.start_at || "",
            end_at: period.end_at || "",
            description: period.description || "",
            is_active: Boolean(period.is_active),
            show_result: Boolean(period.show_result),
            is_secret_vote: Boolean(period.is_secret_vote),
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const submitPeriod = (event) => {
        event.preventDefault();

        const url = editingPeriod
            ? `/admin/osis-election/periods/${editingPeriod.id}`
            : "/admin/osis-election/periods";

        postPeriod(url, {
            preserveScroll: true,
            onSuccess: () => {
                startCreatePeriod();
            },
        });
    };

    const submitCandidate = (event) => {
        event.preventDefault();

        postCandidate("/admin/osis-election/candidates", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                resetCandidate();
                setCandidateData({
                    period_id: activePeriod?.id || "",
                    student_id: "",
                    candidate_number: "",
                    name: "",
                    class_label: "",
                    photo: null,
                    slogan: "",
                    vision: "",
                    mission: "",
                    is_active: true,
                });
            },
        });
    };

    const deletePeriod = (period) => {
        if (
            confirm(
                `Yakin ingin menghapus periode "${period.title}"? Semua kandidat, pemilih, dan suara pada periode ini akan ikut terhapus.`
            )
        ) {
            router.delete(`/admin/osis-election/periods/${period.id}`, {
                preserveScroll: true,
            });
        }
    };

    const deleteCandidate = (candidate) => {
        if (
            confirm(
                `Yakin ingin menghapus kandidat "${candidate.name}" dari periode ini?`
            )
        ) {
            router.delete(`/admin/osis-election/candidates/${candidate.id}`, {
                preserveScroll: true,
            });
        }
    };

    const generateVoters = () => {
        if (!activePeriod) return;

        if (
            confirm(
                "Generate pemilih akan mengambil semua data siswa aktif. Lanjutkan?"
            )
        ) {
            router.post(
                `/admin/osis-election/periods/${activePeriod.id}/generate-voters`,
                {},
                {
                    preserveScroll: true,
                }
            );
        }
    };

    const regenerateToken = (voter) => {
        if (
            confirm(
                `Buat ulang token untuk ${voter.student?.name || "pemilih ini"}?`
            )
        ) {
            router.post(
                `/admin/osis-election/voters/${voter.id}/regenerate-token`,
                {},
                {
                    preserveScroll: true,
                }
            );
        }
    };

    return (
        <AdminLayout title="Pemilihan Ketua OSIS">
            <Head title="Pemilihan Ketua OSIS" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Kesiswaan
                    </p>

                    <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Pemilihan Ketua OSIS
                    </h1>

                    <p className="mt-4 max-w-3xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola periode pemilihan, kandidat dari data siswa,
                        generate pemilih, token voting, dan pantau hasil suara
                        Ketua OSIS secara terstruktur.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {activePeriod ? (
                        <>
                            <button
                                type="button"
                                onClick={generateVoters}
                                className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                            >
                                Generate Pemilih
                            </button>

                            <a
                                href={`/admin/osis-election/periods/${activePeriod.id}/export-voters`}
                                className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                            >
                                Export Pemilih
                            </a>

                            <a
                                href={`/admin/osis-election/periods/${activePeriod.id}/print-tokens`}
                                target="_blank"
                                className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                            >
                                Cetak Token
                            </a>

                            <a
                                href={`/admin/osis-election/periods/${activePeriod.id}/export-results`}
                                className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                            >
                                Export Hasil
                            </a>

                            <a
                                href={`/admin/osis-election/periods/${activePeriod.id}/print-results`}
                                target="_blank"
                                className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-white px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-blue-50"
                            >
                                Cetak Hasil
                            </a>
                        </>
                    ) : null}
                </div>
            </div>

            <div className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                <SummaryCard
                    label="Kandidat"
                    value={summary.total_candidates || 0}
                    icon="🧑‍💼"
                />
                <SummaryCard
                    label="Pemilih"
                    value={summary.total_voters || 0}
                    icon="🗳️"
                />
                <SummaryCard
                    label="Sudah Memilih"
                    value={summary.voted || 0}
                    icon="✅"
                />
                <SummaryCard
                    label="Belum Memilih"
                    value={summary.not_voted || 0}
                    icon="⏳"
                />
                <SummaryCard
                    label="Total Suara"
                    value={summary.total_votes || 0}
                    icon="📊"
                />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_430px] xl:items-start">
                <div className="space-y-6">
                    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Periode Aktif
                                </p>

                                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                    {activePeriod
                                        ? activePeriod.title
                                        : "Belum Ada Periode"}
                                </h2>

                                {activePeriod ? (
                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <StatusBadge
                                            active={activePeriod.is_active}
                                            trueText="Aktif"
                                            falseText="Nonaktif"
                                        />

                                        <StatusBadge
                                            active={activePeriod.is_running}
                                            trueText="Sedang Berjalan"
                                            falseText="Belum / Selesai"
                                        />

                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-blue-700 ring-1 ring-blue-100">
                                            {activePeriod.academic_year || "-"}
                                        </span>

                                        <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600 ring-1 ring-slate-100">
                                            {activePeriod.is_secret_vote
                                                ? "Vote Rahasia"
                                                : "Vote Terbuka"}
                                        </span>

                                        <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600 ring-1 ring-slate-100">
                                            {activePeriod.show_result
                                                ? "Hasil Ditampilkan"
                                                : "Hasil Disembunyikan"}
                                        </span>
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <select
                                    value={selectedPeriodId || ""}
                                    onChange={(event) =>
                                        selectPeriod(event.target.value)
                                    }
                                    className="h-[48px] rounded-[15px] border border-slate-200 bg-white px-4 text-[13px] font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="">Pilih Periode</option>
                                    {periods.map((period) => (
                                        <option key={period.id} value={period.id}>
                                            {period.title}
                                        </option>
                                    ))}
                                </select>

                                {activePeriod ? (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startEditPeriod(activePeriod)
                                        }
                                        className="inline-flex min-h-[48px] items-center justify-center rounded-[15px] bg-blue-50 px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-blue-700 transition hover:bg-blue-100"
                                    >
                                        Edit Periode
                                    </button>
                                ) : null}
                            </div>
                        </div>

                        {activePeriod?.description ? (
                            <p className="mt-5 rounded-[18px] bg-slate-50 p-4 text-[13px] font-medium leading-6 text-slate-600">
                                {activePeriod.description}
                            </p>
                        ) : null}

                        {activePeriod ? (
                            <div className="mt-5 grid gap-3 md:grid-cols-2">
                                <div className="rounded-[18px] bg-slate-50 p-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                        Mulai
                                    </p>
                                    <p className="mt-2 text-[13px] font-semibold text-[#061b46]">
                                        {activePeriod.start_at || "-"}
                                    </p>
                                </div>

                                <div className="rounded-[18px] bg-slate-50 p-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                        Selesai
                                    </p>
                                    <p className="mt-2 text-[13px] font-semibold text-[#061b46]">
                                        {activePeriod.end_at || "-"}
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </section>

                    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
                        <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Kandidat
                                </p>

                                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                    Kandidat Ketua OSIS
                                </h2>
                            </div>
                        </div>

                        {candidates.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2">
                                {candidates.map((candidate) => (
                                    <div
                                        key={candidate.id}
                                        className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-100"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-[96px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] bg-blue-50 text-[24px] font-semibold text-[#061b46]">
                                                {candidate.photo_url ? (
                                                    <img
                                                        src={
                                                            candidate.photo_url
                                                        }
                                                        alt={candidate.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    candidate.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || "K"
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="rounded-full bg-[#061b46] px-3 py-1 text-[11px] font-semibold text-white">
                                                        No.{" "}
                                                        {candidate.candidate_number ||
                                                            "-"}
                                                    </span>

                                                    <StatusBadge
                                                        active={
                                                            candidate.is_active
                                                        }
                                                    />
                                                </div>

                                                <h3 className="mt-3 text-[17px] font-semibold leading-tight text-[#061b46]">
                                                    {candidate.name}
                                                </h3>

                                                <p className="mt-1 text-[12px] font-medium text-slate-500">
                                                    {candidate.class_label ||
                                                        "-"}
                                                </p>

                                                {candidate.slogan ? (
                                                    <p className="mt-3 rounded-[14px] bg-slate-50 p-3 text-[12px] font-medium italic leading-5 text-slate-600">
                                                        “{candidate.slogan}”
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <div className="rounded-[16px] bg-slate-50 p-3">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                                    Suara
                                                </p>
                                                <p className="mt-1 text-[24px] font-semibold text-[#061b46]">
                                                    {candidate.votes_count || 0}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteCandidate(candidate)
                                                }
                                                className="inline-flex min-h-[58px] items-center justify-center rounded-[16px] bg-red-50 px-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-red-700 transition hover:bg-red-100"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[22px] bg-slate-50 p-8 text-center">
                                <div className="text-[48px]">🧑‍💼</div>

                                <h3 className="mt-3 text-[20px] font-semibold text-[#061b46]">
                                    Belum Ada Kandidat
                                </h3>

                                <p className="mt-2 text-[13px] font-medium text-slate-500">
                                    Tambahkan kandidat dari data siswa aktif.
                                </p>
                            </div>
                        )}
                    </section>

                    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
                        <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Hasil
                                </p>

                                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                    Hasil Suara Sementara
                                </h2>
                            </div>

                            {activePeriod ? (
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <a
                                        href={`/admin/osis-election/periods/${activePeriod.id}/export-results`}
                                        className="inline-flex min-h-[44px] items-center justify-center rounded-[14px] bg-slate-50 px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] ring-1 ring-slate-200 transition hover:bg-blue-50"
                                    >
                                        Export Hasil
                                    </a>

                                    <a
                                        href={`/admin/osis-election/periods/${activePeriod.id}/print-results`}
                                        target="_blank"
                                        className="inline-flex min-h-[44px] items-center justify-center rounded-[14px] bg-[#061b46] px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85]"
                                    >
                                        Cetak Hasil
                                    </a>
                                </div>
                            ) : null}
                        </div>

                        {results.length > 0 ? (
                            <div className="space-y-4">
                                {results.map((result) => (
                                    <div
                                        key={result.id}
                                        className="rounded-[20px] border border-slate-200 bg-white p-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-50 text-[18px] font-semibold text-[#061b46]">
                                                {result.photo_url ? (
                                                    <img
                                                        src={result.photo_url}
                                                        alt={result.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    result.candidate_number ||
                                                    "K"
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div>
                                                        <p className="text-[14px] font-semibold text-[#061b46]">
                                                            No.{" "}
                                                            {result.candidate_number ||
                                                                "-"}{" "}
                                                            - {result.name}
                                                        </p>

                                                        <p className="mt-1 text-[12px] font-medium text-slate-500">
                                                            {result.class_label ||
                                                                "-"}
                                                        </p>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-[20px] font-semibold text-[#061b46]">
                                                            {result.votes_count ||
                                                                0}
                                                        </p>
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                                                            suara
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                                                    <div
                                                        className="h-full rounded-full bg-[#061b46]"
                                                        style={{
                                                            width: `${
                                                                resultMaxVotes >
                                                                0
                                                                    ? Math.max(
                                                                          (result.votes_count /
                                                                              resultMaxVotes) *
                                                                              100,
                                                                          4
                                                                      )
                                                                    : 0
                                                            }%`,
                                                        }}
                                                    />
                                                </div>

                                                <p className="mt-2 text-[12px] font-semibold text-slate-500">
                                                    {result.percentage || 0}%
                                                    dari total suara
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[22px] bg-slate-50 p-8 text-center">
                                <div className="text-[48px]">📊</div>

                                <h3 className="mt-3 text-[20px] font-semibold text-[#061b46]">
                                    Belum Ada Suara
                                </h3>

                                <p className="mt-2 text-[13px] font-medium text-slate-500">
                                    Hasil akan muncul setelah siswa melakukan
                                    voting.
                                </p>
                            </div>
                        )}
                    </section>

                    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Pemilih
                                </p>

                                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                    Data Pemilih & Token
                                </h2>
                            </div>

                            {activePeriod ? (
                                <a
                                    href={`/admin/osis-election/periods/${activePeriod.id}/export-voters`}
                                    className="inline-flex min-h-[44px] items-center justify-center rounded-[14px] bg-slate-50 px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] ring-1 ring-slate-200 transition hover:bg-blue-50"
                                >
                                    Export Pemilih
                                </a>
                            ) : null}
                        </div>

                        {voterRows.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[940px] text-left">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                    Siswa
                                                </th>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                    Token
                                                </th>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                    Status
                                                </th>
                                                <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                    Waktu
                                                </th>
                                                <th className="px-5 py-4 text-right text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-slate-100">
                                            {voterRows.map((voter) => (
                                                <tr
                                                    key={voter.id}
                                                    className="hover:bg-slate-50"
                                                >
                                                    <td className="px-5 py-5">
                                                        <p className="text-[14px] font-semibold text-[#061b46]">
                                                            {voter.student
                                                                ?.name || "-"}
                                                        </p>

                                                        <p className="mt-1 text-[12px] font-medium text-slate-500">
                                                            NISN:{" "}
                                                            {voter.student
                                                                ?.nisn || "-"}
                                                        </p>

                                                        <p className="mt-1 text-[12px] font-medium text-slate-400">
                                                            Kelas:{" "}
                                                            {voter.student
                                                                ?.class_label ||
                                                                "-"}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="font-mono text-[13px] font-semibold text-[#061b46]">
                                                            {voter.token || "-"}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <StatusBadge
                                                            active={
                                                                voter.has_voted
                                                            }
                                                            trueText="Sudah Memilih"
                                                            falseText="Belum Memilih"
                                                        />
                                                    </td>

                                                    <td className="px-5 py-5 text-[13px] font-medium text-slate-600">
                                                        {voter.voted_at || "-"}
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    voter.has_voted
                                                                }
                                                                onClick={() =>
                                                                    regenerateToken(
                                                                        voter
                                                                    )
                                                                }
                                                                className="inline-flex h-10 items-center justify-center rounded-xl bg-yellow-50 px-4 text-[12px] font-semibold text-yellow-700 transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                Token
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination links={voters.links || []} />
                            </>
                        ) : (
                            <div className="p-10 text-center">
                                <div className="text-[52px]">🗳️</div>

                                <h3 className="mt-4 text-[22px] font-semibold text-[#061b46]">
                                    Belum Ada Pemilih
                                </h3>

                                <p className="mt-2 text-[13px] font-medium text-slate-500">
                                    Klik tombol Generate Pemilih untuk mengambil
                                    siswa aktif sebagai pemilih.
                                </p>

                                {activePeriod ? (
                                    <button
                                        type="button"
                                        onClick={generateVoters}
                                        className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85]"
                                    >
                                        Generate Pemilih
                                    </button>
                                ) : null}
                            </div>
                        )}
                    </section>
                </div>

                <aside className="space-y-6 xl:sticky xl:top-[98px]">
                    <form
                        onSubmit={submitPeriod}
                        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70"
                    >
                        <div className="mb-6 border-b border-slate-200 pb-5">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                {editingPeriod
                                    ? "Edit Periode"
                                    : "Tambah Periode"}
                            </p>

                            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                {editingPeriod
                                    ? "Edit Pemilihan"
                                    : "Buat Pemilihan"}
                            </h2>

                            {editingPeriod ? (
                                <button
                                    type="button"
                                    onClick={startCreatePeriod}
                                    className="mt-3 text-[12px] font-semibold text-blue-700 hover:underline"
                                >
                                    + Buat periode baru
                                </button>
                            ) : null}
                        </div>

                        <div className="space-y-4">
                            <Input
                                label="Judul Pemilihan"
                                value={periodData.title}
                                onChange={(event) =>
                                    setPeriodData(
                                        "title",
                                        event.target.value
                                    )
                                }
                                error={periodErrors.title}
                                placeholder="Contoh: Pemilihan Ketua OSIS 2026"
                            />

                            <Input
                                label="Tahun Ajaran"
                                value={periodData.academic_year}
                                onChange={(event) =>
                                    setPeriodData(
                                        "academic_year",
                                        event.target.value
                                    )
                                }
                                error={periodErrors.academic_year}
                                placeholder="Contoh: 2026/2027"
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Mulai"
                                    type="datetime-local"
                                    value={periodData.start_at}
                                    onChange={(event) =>
                                        setPeriodData(
                                            "start_at",
                                            event.target.value
                                        )
                                    }
                                    error={periodErrors.start_at}
                                />

                                <Input
                                    label="Selesai"
                                    type="datetime-local"
                                    value={periodData.end_at}
                                    onChange={(event) =>
                                        setPeriodData(
                                            "end_at",
                                            event.target.value
                                        )
                                    }
                                    error={periodErrors.end_at}
                                />
                            </div>

                            <Textarea
                                label="Deskripsi"
                                value={periodData.description}
                                onChange={(event) =>
                                    setPeriodData(
                                        "description",
                                        event.target.value
                                    )
                                }
                                error={periodErrors.description}
                                placeholder="Tulis deskripsi singkat pemilihan OSIS"
                            />

                            <Toggle
                                label="Aktifkan Periode"
                                description="Jika aktif, periode lain otomatis dinonaktifkan."
                                checked={periodData.is_active}
                                onChange={(checked) =>
                                    setPeriodData("is_active", checked)
                                }
                            />

                            <Toggle
                                label="Tampilkan Hasil"
                                description="Nanti digunakan untuk halaman frontend hasil voting."
                                checked={periodData.show_result}
                                onChange={(checked) =>
                                    setPeriodData("show_result", checked)
                                }
                            />

                            <Toggle
                                label="Vote Rahasia"
                                description="Admin tidak menampilkan pilihan siswa secara terbuka."
                                checked={periodData.is_secret_vote}
                                onChange={(checked) =>
                                    setPeriodData("is_secret_vote", checked)
                                }
                            />

                            <button
                                type="submit"
                                disabled={processingPeriod}
                                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processingPeriod
                                    ? "Menyimpan..."
                                    : editingPeriod
                                    ? "Update Periode"
                                    : "Simpan Periode"}
                            </button>

                            {editingPeriod ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        deletePeriod(editingPeriod)
                                    }
                                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[16px] bg-red-50 px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-red-700 transition hover:bg-red-100"
                                >
                                    Hapus Periode
                                </button>
                            ) : null}
                        </div>
                    </form>

                    <form
                        onSubmit={submitCandidate}
                        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70"
                    >
                        <div className="mb-6 border-b border-slate-200 pb-5">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                Kandidat
                            </p>

                            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                Tambah Kandidat
                            </h2>

                            <p className="mt-2 text-[12px] font-medium leading-5 text-slate-500">
                                Kandidat bisa dipilih dari Data Siswa aktif.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="hidden"
                                value={candidateData.period_id || ""}
                                onChange={() => {}}
                            />

                            <Select
                                label="Pilih Siswa"
                                value={candidateData.student_id}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    const student = students.find(
                                        (item) =>
                                            String(item.id) === String(value)
                                    );

                                    setCandidateData("student_id", value);
                                    setCandidateData(
                                        "name",
                                        student?.name || ""
                                    );
                                    setCandidateData(
                                        "class_label",
                                        student?.class_label || ""
                                    );
                                }}
                                error={candidateErrors.student_id}
                            >
                                <option value="">Pilih dari Data Siswa</option>
                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name} -{" "}
                                        {student.class_label || "-"}
                                    </option>
                                ))}
                            </Select>

                            <div className="flex items-center gap-4">
                                <label className="flex h-24 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-[18px] border-2 border-dashed border-slate-200 bg-slate-50 text-[12px] font-semibold text-slate-400">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) =>
                                            setCandidateData(
                                                "photo",
                                                event.target.files?.[0] || null
                                            )
                                        }
                                        className="hidden"
                                    />

                                    {candidatePhotoPreview ? (
                                        <img
                                            src={candidatePhotoPreview}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        "Foto"
                                    )}
                                </label>

                                <div>
                                    <p className="text-[13px] font-semibold text-[#061b46]">
                                        Foto Kandidat
                                    </p>

                                    <p className="mt-1 text-[12px] font-medium text-slate-500">
                                        Opsional. Jika tidak upload, pakai foto
                                        siswa.
                                    </p>

                                    {candidateErrors.photo ? (
                                        <p className="mt-2 text-[12px] font-semibold text-red-600">
                                            {candidateErrors.photo}
                                        </p>
                                    ) : null}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="No Urut"
                                    value={candidateData.candidate_number}
                                    onChange={(event) =>
                                        setCandidateData(
                                            "candidate_number",
                                            event.target.value
                                        )
                                    }
                                    error={candidateErrors.candidate_number}
                                    placeholder="01"
                                />

                                <Select
                                    label="Status"
                                    value={
                                        candidateData.is_active ? "1" : "0"
                                    }
                                    onChange={(event) =>
                                        setCandidateData(
                                            "is_active",
                                            event.target.value === "1"
                                        )
                                    }
                                    error={candidateErrors.is_active}
                                >
                                    <option value="1">Aktif</option>
                                    <option value="0">Nonaktif</option>
                                </Select>
                            </div>

                            <Input
                                label="Nama Kandidat"
                                value={candidateData.name}
                                onChange={(event) =>
                                    setCandidateData(
                                        "name",
                                        event.target.value
                                    )
                                }
                                error={candidateErrors.name}
                                placeholder="Otomatis dari siswa / isi manual"
                            />

                            <Input
                                label="Kelas"
                                value={candidateData.class_label}
                                onChange={(event) =>
                                    setCandidateData(
                                        "class_label",
                                        event.target.value
                                    )
                                }
                                error={candidateErrors.class_label}
                                placeholder="Contoh: 8A"
                            />

                            <Input
                                label="Slogan"
                                value={candidateData.slogan}
                                onChange={(event) =>
                                    setCandidateData(
                                        "slogan",
                                        event.target.value
                                    )
                                }
                                error={candidateErrors.slogan}
                                placeholder="Contoh: Bersama Maju, OSIS Bermutu"
                            />

                            <Textarea
                                label="Visi"
                                value={candidateData.vision}
                                onChange={(event) =>
                                    setCandidateData(
                                        "vision",
                                        event.target.value
                                    )
                                }
                                error={candidateErrors.vision}
                                placeholder="Tulis visi kandidat"
                            />

                            <Textarea
                                label="Misi"
                                value={candidateData.mission}
                                onChange={(event) =>
                                    setCandidateData(
                                        "mission",
                                        event.target.value
                                    )
                                }
                                error={candidateErrors.mission}
                                placeholder="Tulis misi kandidat"
                                rows={5}
                            />

                            <button
                                type="submit"
                                disabled={
                                    processingCandidate || !activePeriod?.id
                                }
                                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processingCandidate
                                    ? "Menyimpan..."
                                    : "Simpan Kandidat"}
                            </button>
                        </div>
                    </form>
                </aside>
            </div>
        </AdminLayout>
    );
}