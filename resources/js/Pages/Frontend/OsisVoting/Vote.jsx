import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

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

function CandidateVoteCard({ candidate, selected, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(candidate.id)}
            className={`group overflow-hidden rounded-[30px] border bg-white text-left shadow-xl transition ${
                selected
                    ? "border-[#f7c46a] shadow-yellow-100 ring-4 ring-[#f7c46a]/30"
                    : "border-slate-200 shadow-slate-200/70 hover:-translate-y-1 hover:shadow-2xl"
            }`}
        >
            <div className="relative h-[280px] overflow-hidden bg-gradient-to-br from-[#061b46] to-[#0b3b85]">
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

                <div className="absolute left-5 top-5 rounded-full bg-[#f7c46a] px-4 py-2 text-[13px] font-bold text-[#061b46] shadow-lg">
                    No. {candidate.candidate_number || "-"}
                </div>

                {selected ? (
                    <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-[24px] text-white shadow-lg">
                        ✓
                    </div>
                ) : null}
            </div>

            <div className="p-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#d59a25]">
                    Kandidat Ketua OSIS
                </p>

                <h3 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.05em] text-[#061b46]">
                    {candidate.name}
                </h3>

                <p className="mt-2 text-[14px] font-medium text-slate-500">
                    {candidate.class_label || "-"}
                </p>

                {candidate.slogan ? (
                    <div className="mt-5 rounded-[20px] bg-slate-50 p-4">
                        <p className="text-[14px] font-medium italic leading-7 text-slate-600">
                            “{candidate.slogan}”
                        </p>
                    </div>
                ) : null}

                <div className="mt-5 grid gap-4">
                    {candidate.vision ? (
                        <div>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#061b46]">
                                Visi
                            </p>

                            <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                                {candidate.vision}
                            </p>
                        </div>
                    ) : null}

                    {candidate.mission ? (
                        <div>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#061b46]">
                                Misi
                            </p>

                            <p className="mt-2 whitespace-pre-line text-[14px] font-medium leading-7 text-slate-600">
                                {candidate.mission}
                            </p>
                        </div>
                    ) : null}
                </div>

                <div
                    className={`mt-6 flex min-h-[50px] items-center justify-center rounded-[16px] text-[13px] font-semibold uppercase tracking-[0.1em] transition ${
                        selected
                            ? "bg-[#f7c46a] text-[#061b46]"
                            : "bg-[#061b46] text-white group-hover:bg-[#0b3b85]"
                    }`}
                >
                    {selected ? "Kandidat Dipilih" : "Pilih Kandidat"}
                </div>
            </div>
        </button>
    );
}

export default function Vote({ period = null, voter = null, candidates = [] }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        candidate_id: "",
    });

    const selectedCandidate = candidates.find(
        (candidate) => String(candidate.id) === String(data.candidate_id)
    );

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

            <main className="min-h-screen bg-[#f4f7fb] text-[#061b46]">
                <section className="sticky top-0 z-40 border-b border-white/10 bg-[#061b46]/95 px-5 py-4 text-white shadow-xl backdrop-blur sm:px-8 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f7c46a]">
                                E-Voting OSIS
                            </p>

                            <h1 className="mt-1 text-[22px] font-semibold tracking-[-0.04em]">
                                {period?.title || "Voting Ketua OSIS"}
                            </h1>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                                <p className="text-[12px] font-semibold">
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
                                className="inline-flex min-h-[46px] items-center justify-center rounded-[15px] bg-red-500/15 px-5 text-[12px] font-semibold uppercase tracking-[0.1em] text-red-100 ring-1 ring-red-300/20 transition hover:bg-red-500/25"
                            >
                                Keluar
                            </button>
                        </div>
                    </div>
                </section>

                <section className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
                    <div className="mx-auto max-w-7xl">
                        <FlashMessage />

                        <div className="mb-8 rounded-[32px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                                Pilih Satu Kandidat
                            </p>

                            <h2 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.06em] sm:text-[46px]">
                                Gunakan Hak Suaramu
                            </h2>

                            <p className="mt-4 max-w-3xl text-[14px] font-medium leading-7 text-blue-100">
                                Pilih kandidat Ketua OSIS pilihanmu dengan
                                bijak. Setelah suara dikirim, pilihan tidak
                                dapat diubah kembali.
                            </p>

                            {period?.end_at ? (
                                <p className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-white ring-1 ring-white/15">
                                    Berakhir: {period.end_at}
                                </p>
                            ) : null}
                        </div>

                        {errors.candidate_id ? (
                            <div className="mb-6 rounded-2xl bg-red-50 px-5 py-4 text-[13px] font-semibold text-red-700 ring-1 ring-red-100">
                                {errors.candidate_id}
                            </div>
                        ) : null}

                        {candidates.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {candidates.map((candidate) => (
                                    <CandidateVoteCard
                                        key={candidate.id}
                                        candidate={candidate}
                                        selected={
                                            String(data.candidate_id) ===
                                            String(candidate.id)
                                        }
                                        onSelect={(id) =>
                                            setData("candidate_id", id)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[28px] bg-white p-10 text-center shadow-xl shadow-slate-200/70">
                                <div className="text-[58px]">🧑‍💼</div>

                                <h3 className="mt-4 text-[24px] font-semibold text-[#061b46]">
                                    Belum Ada Kandidat
                                </h3>

                                <p className="mt-2 text-[14px] font-medium text-slate-500">
                                    Kandidat belum tersedia untuk periode ini.
                                </p>
                            </div>
                        )}

                        <div className="sticky bottom-0 z-30 mt-10 rounded-t-[28px] border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur">
                            <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                        Pilihan Kamu
                                    </p>

                                    <h3 className="mt-1 text-[20px] font-semibold text-[#061b46]">
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
                                    className="inline-flex min-h-[54px] items-center justify-center rounded-[17px] bg-[#061b46] px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Kirim Suara
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {confirmOpen ? (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061b46]/70 px-5 backdrop-blur-sm">
                        <div className="w-full max-w-lg rounded-[30px] bg-white p-6 shadow-2xl">
                            <div className="text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-50 text-[34px]">
                                    🗳️
                                </div>

                                <h3 className="mt-5 text-[28px] font-semibold tracking-[-0.05em] text-[#061b46]">
                                    Konfirmasi Pilihan
                                </h3>

                                <p className="mt-3 text-[14px] font-medium leading-7 text-slate-500">
                                    Kamu memilih:
                                </p>

                                <div className="mt-4 rounded-[22px] bg-slate-50 p-5">
                                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#d59a25]">
                                        No.{" "}
                                        {selectedCandidate?.candidate_number ||
                                            "-"}
                                    </p>

                                    <h4 className="mt-2 text-[24px] font-semibold text-[#061b46]">
                                        {selectedCandidate?.name || "-"}
                                    </h4>

                                    <p className="mt-1 text-[13px] font-medium text-slate-500">
                                        {selectedCandidate?.class_label || "-"}
                                    </p>
                                </div>

                                <p className="mt-5 text-[13px] font-semibold leading-6 text-red-600">
                                    Setelah dikirim, suara tidak bisa diubah.
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setConfirmOpen(false)}
                                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-slate-100 px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-200"
                                >
                                    Batal
                                </button>

                                <button
                                    type="button"
                                    onClick={submitVote}
                                    disabled={processing}
                                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#061b46] px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? "Mengirim..." : "Ya, Kirim"}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </main>
        </>
    );
}