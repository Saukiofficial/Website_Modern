import { Head, Link } from "@inertiajs/react";
import PpdbAdminLayout from "../Layouts/PpdbAdminLayout";

function SummaryCard({ label, value, icon }) {
    return (
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[26px]">
                    {icon}
                </div>

                <div>
                    <p className="text-[32px] font-semibold leading-none text-[#061b46]">
                        {value || 0}
                    </p>

                    <p className="mt-2 text-[13px] font-semibold text-slate-500">
                        {label}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function PpdbDashboard({ summary = {} }) {
    return (
        <PpdbAdminLayout title="Dashboard PPDB">
            <Head title="Dashboard PPDB" />

            <div className="mb-6 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                    Panel Khusus PPDB
                </p>

                <h1 className="mt-3 text-[36px] font-semibold leading-tight tracking-[-0.05em] sm:text-[44px]">
                    Admin PPDB
                </h1>

                <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                    Kelola seluruh proses penerimaan peserta didik baru, mulai
                    dari data pendaftar, verifikasi, pengaturan, konten, sampai
                    pengumuman hasil.
                </p>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <SummaryCard
                    label="Total Pendaftar"
                    value={summary.total}
                    icon="📂"
                />
                <SummaryCard label="Baru" value={summary.baru} icon="🟡" />
                <SummaryCard
                    label="Diproses"
                    value={summary.diproses}
                    icon="🔵"
                />
                <SummaryCard
                    label="Diterima"
                    value={summary.diterima}
                    icon="✅"
                />
                <SummaryCard
                    label="Ditolak"
                    value={summary.ditolak}
                    icon="❌"
                />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <Link
                    href="/admin/ppdb/registrations"
                    className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1"
                >
                    <p className="text-[34px]">📋</p>

                    <h2 className="mt-4 text-[22px] font-semibold text-[#061b46]">
                        Data Pendaftar
                    </h2>

                    <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                        Lihat, verifikasi, dan update status pendaftar PPDB.
                    </p>
                </Link>

                <Link
                    href="/admin/ppdb/settings"
                    className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1"
                >
                    <p className="text-[34px]">⚙️</p>

                    <h2 className="mt-4 text-[22px] font-semibold text-[#061b46]">
                        Setting PPDB
                    </h2>

                    <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                        Atur tahun ajaran, buka/tutup pendaftaran, dan teks
                        formulir.
                    </p>
                </Link>

                <Link
                    href="/admin/ppdb/content"
                    className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1"
                >
                    <p className="text-[34px]">🧩</p>

                    <h2 className="mt-4 text-[22px] font-semibold text-[#061b46]">
                        Konten PPDB
                    </h2>

                    <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                        Kelola timeline, syarat, dan tahapan PPDB.
                    </p>
                </Link>
            </div>
        </PpdbAdminLayout>
    );
}