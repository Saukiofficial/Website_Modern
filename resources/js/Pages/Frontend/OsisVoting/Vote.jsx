import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

function getSchoolInitials(name = "") {
    const words = String(name || "Sekolah")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return words
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
}

function FlashMessage() {
    const { flash } = usePage().props;

    if (!flash?.success && !flash?.error) return null;

    return (
        <div
            className={`mb-6 rounded-2xl px-5 py-4 text-sm font-semibold shadow-lg ${
                flash.success
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    : "bg-red-50 text-red-700 ring-1 ring-red-100"
            }`}
        >
            {flash.success || flash.error}
        </div>
    );
}

function CandidateVoteCard({
    candidate,
    selected,
    onSelect,
    index,
    schoolInitials,
}) {
    return (
        <button
            type="button"
            onClick={() => onSelect(candidate.id)}
            className={`group overflow-hidden rounded-[30px] border bg-white text-left shadow-xl transition duration-300 ${
                selected
                    ? "border-[#f1c96a] shadow-yellow-100 ring-4 ring-[#f1c96a]/35"
                    : "border-[#e5eaf3] shadow-[0_18px_45px_rgba(20,40,90,0.08)] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(20,40,90,0.13)]"
            }`}
        >
            <div className="relative h-[300px] overflow-hidden bg-[linear-gradient(135deg,#0a377b_0%,#0d4da8_100%)]">
                {candidate.photo_url ? (
                    <img
                        src={candidate.photo_url}
                        alt={candidate.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-[82px] font-semibold text-white">
                        {candidate.name?.charAt(0)?.toUpperCase() || "K"}
                    </div>
                )}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_35%)]" />

                <div className="absolute left-5 top-5 rounded-full bg-[#f1c96a] px-4 py-2 text-[13px] font-bold text-[#0b2f6b] shadow-lg">
                    No.{" "}
                    {candidate.candidate_number ||
                        String(index + 1).padStart(2, "0")}
                </div>

                <div className="absolute bottom-5 right-5 opacity-15">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white text-[26px] font-bold text-white">
                        {schoolInitials}
                    </div>
                </div>

                {selected ? (
                    <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-[24px] text-white shadow-lg">
                        ✓
                    </div>
                ) : (
                    <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-[22px] text-white ring-1 ring-white/20 backdrop-blur">
                        ☆
                    </div>
                )}
            </div>

            <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d7a63e]">
                    Candidate for President
                </p>

                <h3 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.05em] text-[#0b2f6b]">
                    {candidate.name}
                </h3>

                <p className="mt-2 text-[14px] font-medium text-slate-500">
                    {candidate.class_label || "-"}
                </p>

                {candidate.slogan ? (
                    <div className="mt-5 rounded-2xl bg-[#f7f9fc] px-4 py-3">
                        <p className="text-[14px] font-medium italic leading-7 text-slate-600">
                            “{candidate.slogan}”
                        </p>
                    </div>
                ) : null}

                <div className="mt-5 grid gap-5">
                    {candidate.vision ? (
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0b2f6b]">
                                Vision
                            </p>

                            <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                                {candidate.vision}
                            </p>
                        </div>
                    ) : null}

                    {candidate.mission ? (
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0b2f6b]">
                                Mission
                            </p>

                            <p className="mt-2 whitespace-pre-line text-[14px] font-medium leading-7 text-slate-600">
                                {candidate.mission}
                            </p>
                        </div>
                    ) : null}
                </div>

                <div
                    className={`mt-6 flex min-h-[54px] items-center justify-center rounded-2xl text-[13px] font-semibold uppercase tracking-[0.1em] transition ${
                        selected
                            ? "bg-[#f1c96a] text-[#0b2f6b]"
                            : "bg-[#0a3e96] text-white group-hover:bg-[#104cb4]"
                    }`}
                >
                    {selected ? "Kandidat Dipilih" : "Pilih Kandidat"}
                </div>
            </div>
        </button>
    );
}

function InfoItem({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f1c96a]">
                {label}
            </p>
            <p className="mt-1 text-[14px] font-semibold text-white">
                {value || "-"}
            </p>
        </div>
    );
}

export default function Vote({ period = null, voter = null, candidates = [] }) {
    const { props } = usePage();

    const schoolSetting = props.schoolSetting || {};
    const schoolName = schoolSetting.school_name || "Website Sekolah";
    const schoolTagline =
        schoolSetting.tagline || "Excellence • Character • Leadership";
    const schoolLogo = schoolSetting.logo_url || null;
    const schoolInitials = getSchoolInitials(schoolName);

    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        candidate_id: "",
    });

    const selectedCandidate = useMemo(() => {
        return candidates.find(
            (candidate) => String(candidate.id) === String(data.candidate_id)
        );
    }, [candidates, data.candidate_id]);

    const submitVote = () => {
        post("/pemilihan-osis/vote", {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmOpen(false);
            },
        });
    };

    const logout = () => {
        router.post(
            "/pemilihan-osis/logout",
            {},
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <>
            <Head title="Voting Ketua OSIS" />

            <main className="min-h-screen bg-[#f5f7fb] text-[#0b2f6b]">
                <section className="relative overflow-hidden bg-[#0a377b]">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80')",
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,38,96,0.98)_0%,rgba(8,53,125,0.94)_45%,rgba(8,53,125,0.78)_100%)]" />

                    <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-6 sm:px-8 lg:px-10">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex min-w-0 items-center gap-4">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[18px] border-2 border-[#d7a63e] bg-white/10 text-[18px] font-bold text-white shadow-lg backdrop-blur">
                                    {schoolLogo ? (
                                        <img
                                            src={schoolLogo}
                                            alt={schoolName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        schoolInitials
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f1c96a]">
                                        E-Voting OSIS
                                    </p>

                                    <h1 className="line-clamp-1 text-[22px] font-semibold tracking-[-0.04em] text-white sm:text-[28px]">
                                        {period?.title || "Voting Ketua OSIS"}
                                    </h1>

                                    <p className="mt-1 line-clamp-1 text-[13px] font-medium text-blue-100">
                                        {schoolName}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white ring-1 ring-white/10 backdrop-blur">
                                    <p className="text-[13px] font-semibold">
                                        {voter?.student?.name || "-"}
                                    </p>

                                    <p className="mt-1 text-[11px] font-medium text-blue-100">
                                        NISN: {voter?.student?.nisn || "-"} •{" "}
                                        {voter?.student?.class_label || "-"}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={logout}
                                    className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-red-500/15 px-5 text-[12px] font-semibold uppercase tracking-[0.1em] text-red-100 ring-1 ring-red-300/20 transition hover:bg-red-500/25"
                                >
                                    Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative overflow-hidden bg-[#0a377b]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.12),transparent_34%)]" />

                    <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-10 pt-6 sm:px-8 lg:px-10 lg:pb-14">
                        <FlashMessage />

                        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
                            <div>
                                <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#f1c96a]">
                                    Pilih Satu Kandidat
                                </p>

                                <h2 className="mt-4 max-w-4xl text-[42px] font-semibold leading-[1.06] tracking-[-0.06em] text-white sm:text-[58px] lg:text-[72px]">
                                    Gunakan Hak Suaramu
                                </h2>

                                <p className="mt-6 max-w-3xl text-[17px] font-medium leading-8 text-blue-100">
                                    Pilih kandidat Ketua OSIS pilihanmu dengan
                                    bijak. Setelah suara dikirim, pilihan tidak
                                    dapat diubah kembali.
                                </p>

                                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                    <InfoItem
                                        label="Periode"
                                        value={period?.academic_year}
                                    />

                                    <InfoItem
                                        label="Pemilih"
                                        value={voter?.student?.name}
                                    />

                                    <InfoItem
                                        label="Berakhir"
                                        value={period?.end_at}
                                    />
                                </div>
                            </div>

                            <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 text-white shadow-2xl backdrop-blur">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1c96a] text-[34px] text-[#0b2f6b]">
                                    🗳️
                                </div>

                                <h3 className="mt-5 text-[26px] font-semibold tracking-[-0.04em]">
                                    Voting Aman
                                </h3>

                                <p className="mt-3 text-[14px] font-medium leading-7 text-blue-100">
                                    Setiap siswa hanya dapat memilih satu kali.
                                    Pastikan pilihan sudah benar sebelum
                                    mengirim suara.
                                </p>

                                <div className="mt-5 rounded-2xl border border-[#f0dfaa]/30 bg-[#fff7df]/10 px-4 py-3 text-[13px] font-medium text-[#f8e4a8]">
                                    🔒 Satu token hanya berlaku untuk satu suara.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
                    <div className="mx-auto max-w-[1280px]">
                        {errors.candidate_id ? (
                            <div className="mb-6 rounded-2xl bg-red-50 px-5 py-4 text-[13px] font-semibold text-red-700 ring-1 ring-red-100">
                                {errors.candidate_id}
                            </div>
                        ) : null}

                        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d7a63e]">
                                    Candidates
                                </p>

                                <h2 className="mt-2 text-[42px] font-semibold tracking-[-0.05em] text-[#0b2f6b]">
                                    Pilih Kandidat
                                </h2>

                                <p className="mt-2 text-[18px] font-medium text-slate-500">
                                    Klik salah satu kandidat pilihanmu.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_18px_45px_rgba(20,40,90,0.08)] ring-1 ring-[#e5eaf3]">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Pilihan Saat Ini
                                </p>

                                <p className="mt-1 text-[16px] font-semibold text-[#0b2f6b]">
                                    {selectedCandidate
                                        ? `No. ${
                                              selectedCandidate.candidate_number ||
                                              "-"
                                          } - ${selectedCandidate.name}`
                                        : "Belum memilih kandidat"}
                                </p>
                            </div>
                        </div>

                        {candidates.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {candidates.map((candidate, index) => (
                                    <CandidateVoteCard
                                        key={candidate.id}
                                        candidate={candidate}
                                        index={index}
                                        selected={
                                            String(data.candidate_id) ===
                                            String(candidate.id)
                                        }
                                        onSelect={(id) =>
                                            setData("candidate_id", id)
                                        }
                                        schoolInitials={schoolInitials}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[30px] border border-[#e5eaf3] bg-white p-12 text-center shadow-[0_18px_45px_rgba(20,40,90,0.08)]">
                                <div className="text-[64px]">🧑‍💼</div>

                                <h3 className="mt-4 text-[28px] font-semibold tracking-[-0.05em] text-[#0b2f6b]">
                                    Belum Ada Kandidat
                                </h3>

                                <p className="mt-3 text-[15px] font-medium leading-7 text-slate-500">
                                    Kandidat belum tersedia untuk periode ini.
                                </p>
                            </div>
                        )}

                        <div className="sticky bottom-0 z-30 mt-10 rounded-t-[30px] border border-[#e5eaf3] bg-white/95 p-5 shadow-2xl backdrop-blur">
                            <div className="mx-auto flex max-w-[1280px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                        Pilihan Kamu
                                    </p>

                                    <h3 className="mt-1 text-[22px] font-semibold tracking-[-0.04em] text-[#0b2f6b]">
                                        {selectedCandidate
                                            ? `No. ${
                                                  selectedCandidate.candidate_number ||
                                                  "-"
                                              } - ${selectedCandidate.name}`
                                            : "Belum memilih kandidat"}
                                    </h3>
                                </div>

                                <button
                                    type="button"
                                    disabled={!data.candidate_id || processing}
                                    onClick={() => setConfirmOpen(true)}
                                    className="inline-flex min-h-[58px] items-center justify-center rounded-2xl bg-[#0a3e96] px-8 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#104cb4] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Kirim Suara
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-[#0a377b] px-5 py-6 text-white sm:px-8 lg:px-10">
                    <div className="mx-auto flex max-w-[1280px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#d7a63e] bg-white/10 font-bold">
                                {schoolLogo ? (
                                    <img
                                        src={schoolLogo}
                                        alt={schoolName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    schoolInitials
                                )}
                            </div>

                            <div>
                                <p className="text-[15px] font-semibold uppercase tracking-[0.08em]">
                                    {schoolName}
                                </p>

                                <p className="text-[12px] uppercase tracking-[0.12em] text-blue-100">
                                    Election System
                                </p>
                            </div>
                        </div>

                        <p className="text-[13px] font-medium text-blue-100">
                            © {new Date().getFullYear()} {schoolName}. All
                            rights reserved.
                        </p>

                        <p className="text-[13px] font-medium text-blue-100">
                            {schoolTagline}{" "}
                            <span className="text-[#f1c96a]">—</span>
                        </p>
                    </div>
                </footer>

                {confirmOpen ? (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061b46]/75 px-5 backdrop-blur-sm">
                        <div className="w-full max-w-xl overflow-hidden rounded-[34px] bg-white shadow-2xl">
                            <div className="bg-[linear-gradient(135deg,#0a377b_0%,#0d4da8_100%)] p-7 text-center text-white">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1c96a] text-[34px] text-[#0b2f6b]">
                                    🗳️
                                </div>

                                <h3 className="mt-5 text-[32px] font-semibold tracking-[-0.05em]">
                                    Konfirmasi Pilihan
                                </h3>

                                <p className="mt-3 text-[14px] font-medium leading-7 text-blue-100">
                                    Pastikan pilihan kamu sudah benar sebelum
                                    mengirim suara.
                                </p>
                            </div>

                            <div className="p-7">
                                <div className="rounded-[24px] border border-[#e5eaf3] bg-[#f7f9fc] p-5 text-center">
                                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#d7a63e]">
                                        Kandidat Pilihan
                                    </p>

                                    <h4 className="mt-3 text-[28px] font-semibold tracking-[-0.05em] text-[#0b2f6b]">
                                        No.{" "}
                                        {selectedCandidate?.candidate_number ||
                                            "-"}{" "}
                                        - {selectedCandidate?.name || "-"}
                                    </h4>

                                    <p className="mt-2 text-[14px] font-medium text-slate-500">
                                        {selectedCandidate?.class_label || "-"}
                                    </p>
                                </div>

                                <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-center text-[13px] font-semibold leading-6 text-red-600 ring-1 ring-red-100">
                                    Setelah dikirim, suara tidak bisa diubah.
                                </p>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setConfirmOpen(false)}
                                        className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-slate-100 px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-200"
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="button"
                                        onClick={submitVote}
                                        disabled={processing}
                                        className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[#0a3e96] px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#104cb4] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing ? "Mengirim..." : "Ya, Kirim"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </main>
        </>
    );
}