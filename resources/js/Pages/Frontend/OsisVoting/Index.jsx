import { Head, useForm, usePage } from "@inertiajs/react";
import { useMemo } from "react";

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

function CandidateCard({ candidate }) {
    return (
        <div className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="relative h-[260px] overflow-hidden bg-gradient-to-br from-[#061b46] to-[#0b3b85]">
                {candidate.photo_url ? (
                    <img
                        src={candidate.photo_url}
                        alt={candidate.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-[76px] font-semibold text-white">
                        {candidate.name?.charAt(0)?.toUpperCase() || "K"}
                    </div>
                )}

                <div className="absolute left-5 top-5 rounded-full bg-[#f7c46a] px-4 py-2 text-[13px] font-bold text-[#061b46] shadow-lg">
                    No. {candidate.candidate_number || "-"}
                </div>
            </div>

            <div className="p-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#d59a25]">
                    Kandidat Ketua OSIS
                </p>

                <h3 className="mt-3 text-[24px] font-semibold leading-tight tracking-[-0.04em] text-[#061b46]">
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

                {candidate.vision ? (
                    <div className="mt-5">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#061b46]">
                            Visi
                        </p>

                        <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                            {candidate.vision}
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function ResultCard({ result, maxVotes }) {
    const width =
        maxVotes > 0 ? Math.max((result.votes_count / maxVotes) * 100, 4) : 0;

    return (
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-50 text-[22px] font-semibold text-[#061b46]">
                    {result.photo_url ? (
                        <img
                            src={result.photo_url}
                            alt={result.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        result.candidate_number || "K"
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-[14px] font-semibold text-[#061b46]">
                                No. {result.candidate_number || "-"} -{" "}
                                {result.name}
                            </p>

                            <p className="mt-1 text-[12px] font-medium text-slate-500">
                                {result.class_label || "-"}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-[24px] font-semibold text-[#061b46]">
                                {result.votes_count || 0}
                            </p>

                            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                                Suara
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-[#061b46]"
                            style={{ width: `${width}%` }}
                        />
                    </div>

                    <p className="mt-2 text-[12px] font-semibold text-slate-500">
                        {result.percentage || 0}% dari total suara
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Index({ period = null, candidates = [], results = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        nisn: "",
        token: "",
    });

    const maxVotes = useMemo(() => {
        if (!results.length) return 0;

        return Math.max(...results.map((item) => item.votes_count || 0));
    }, [results]);

    const submit = (event) => {
        event.preventDefault();

        post("/pemilihan-osis/login", {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Pemilihan Ketua OSIS" />

            <main className="min-h-screen bg-[#f4f7fb] text-[#061b46]">
                <section className="relative overflow-hidden bg-gradient-to-br from-[#061b46] via-[#0b2d68] to-[#0b3b85] px-5 py-10 text-white sm:px-8 lg:px-12 lg:py-16">
                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#f7c46a]/20 blur-3xl" />
                    <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

                    <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_430px] lg:items-center">
                        <div>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#f7c46a]">
                                E-Voting Sekolah
                            </p>

                            <h1 className="mt-4 text-[40px] font-semibold leading-tight tracking-[-0.06em] sm:text-[56px] lg:text-[68px]">
                                Pemilihan Ketua OSIS
                            </h1>

                            <p className="mt-5 max-w-2xl text-[15px] font-medium leading-8 text-blue-100">
                                Gunakan NISN dan token voting untuk memilih
                                kandidat Ketua OSIS. Setiap siswa hanya bisa
                                memilih satu kali.
                            </p>

                            {period ? (
                                <div className="mt-7 flex flex-wrap gap-3">
                                    <span className="rounded-full bg-white/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-white ring-1 ring-white/15">
                                        {period.title}
                                    </span>

                                    <span className="rounded-full bg-[#f7c46a] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#061b46]">
                                        {period.academic_year || "-"}
                                    </span>

                                    <span
                                        className={`rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] ring-1 ${
                                            period.is_running
                                                ? "bg-emerald-400/15 text-emerald-100 ring-emerald-300/20"
                                                : "bg-red-400/15 text-red-100 ring-red-300/20"
                                        }`}
                                    >
                                        {period.is_running
                                            ? "Sedang Berjalan"
                                            : "Belum / Selesai"}
                                    </span>
                                </div>
                            ) : null}
                        </div>

                        <div className="rounded-[32px] border border-white/15 bg-white p-6 text-[#061b46] shadow-2xl shadow-black/20">
                            <FlashMessage />

                            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                Login Voting
                            </p>

                            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.05em]">
                                Masuk Sebagai Pemilih
                            </h2>

                            <p className="mt-3 text-[13px] font-medium leading-6 text-slate-500">
                                Masukkan NISN dan token yang diberikan oleh
                                panitia pemilihan OSIS.
                            </p>

                            <form onSubmit={submit} className="mt-6 space-y-4">
                                <div>
                                    <label className="mb-2 block text-[13px] font-semibold">
                                        NISN
                                    </label>

                                    <input
                                        type="text"
                                        value={data.nisn}
                                        onChange={(event) =>
                                            setData("nisn", event.target.value)
                                        }
                                        placeholder="Masukkan NISN"
                                        className="h-[52px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                    />

                                    {errors.nisn ? (
                                        <p className="mt-2 text-[12px] font-semibold text-red-600">
                                            {errors.nisn}
                                        </p>
                                    ) : null}
                                </div>

                                <div>
                                    <label className="mb-2 block text-[13px] font-semibold">
                                        Token Voting
                                    </label>

                                    <input
                                        type="text"
                                        value={data.token}
                                        onChange={(event) =>
                                            setData(
                                                "token",
                                                event.target.value.toUpperCase()
                                            )
                                        }
                                        placeholder="Contoh: ABCD1234"
                                        className="h-[52px] w-full rounded-[16px] border border-slate-200 bg-white px-4 font-mono text-[14px] font-semibold uppercase outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                    />

                                    {errors.token ? (
                                        <p className="mt-2 text-[12px] font-semibold text-red-600">
                                            {errors.token}
                                        </p>
                                    ) : null}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing || !period?.is_running}
                                    className="inline-flex min-h-[54px] w-full items-center justify-center rounded-[17px] bg-[#061b46] px-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing
                                        ? "Memproses..."
                                        : "Masuk Voting"}
                                </button>
                            </form>

                            {!period ? (
                                <p className="mt-4 rounded-[16px] bg-red-50 p-4 text-[12px] font-semibold leading-5 text-red-700">
                                    Belum ada periode pemilihan OSIS yang aktif.
                                </p>
                            ) : null}

                            {period && !period.is_running ? (
                                <p className="mt-4 rounded-[16px] bg-yellow-50 p-4 text-[12px] font-semibold leading-5 text-yellow-700">
                                    Pemilihan belum dimulai atau sudah selesai.
                                </p>
                            ) : null}
                        </div>
                    </div>
                </section>

                <section className="px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Daftar Kandidat
                                </p>

                                <h2 className="mt-2 text-[34px] font-semibold tracking-[-0.05em] text-[#061b46]">
                                    Calon Ketua OSIS
                                </h2>
                            </div>

                            {period?.end_at ? (
                                <p className="text-[13px] font-semibold text-slate-500">
                                    Berakhir: {period.end_at}
                                </p>
                            ) : null}
                        </div>

                        {candidates.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {candidates.map((candidate) => (
                                    <CandidateCard
                                        key={candidate.id}
                                        candidate={candidate}
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
                                    Kandidat akan tampil setelah admin
                                    menambahkan data kandidat.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {period?.show_result ? (
                    <section className="px-5 pb-14 sm:px-8 lg:px-12">
                        <div className="mx-auto max-w-7xl rounded-[34px] bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="mb-8">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Hasil Voting
                                </p>

                                <h2 className="mt-2 text-[34px] font-semibold tracking-[-0.05em] text-[#061b46]">
                                    Hasil Suara Sementara
                                </h2>
                            </div>

                            {results.length > 0 ? (
                                <div className="space-y-4">
                                    {results.map((result) => (
                                        <ResultCard
                                            key={result.id}
                                            result={result}
                                            maxVotes={maxVotes}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-[24px] bg-slate-50 p-8 text-center">
                                    <div className="text-[48px]">📊</div>

                                    <h3 className="mt-3 text-[22px] font-semibold text-[#061b46]">
                                        Belum Ada Suara
                                    </h3>

                                    <p className="mt-2 text-[14px] font-medium text-slate-500">
                                        Hasil akan muncul setelah voting
                                        berjalan.
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                ) : null}
            </main>
        </>
    );
}