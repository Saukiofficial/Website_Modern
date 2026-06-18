import { Head, Link } from "@inertiajs/react";
import OsisAdminLayout from "../Layouts/OsisAdminLayout";

function SummaryCard({ label, value, icon }) {
    return (
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-[26px]">
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

export default function OsisDashboard({ summary = {} }) {
    return (
        <OsisAdminLayout title="Dashboard OSIS">
            <Head title="Dashboard OSIS" />

            <div className="mb-6 rounded-[28px] bg-gradient-to-br from-[#3b0764] to-[#061b46] p-6 text-white shadow-2xl shadow-purple-200 sm:p-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                    Panel Khusus OSIS
                </p>

                <h1 className="mt-3 text-[36px] font-semibold leading-tight tracking-[-0.05em] sm:text-[44px]">
                    Admin OSIS
                </h1>

                <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-purple-100">
                    Kelola pendaftaran OSIS, seleksi calon pengurus, status
                    penerimaan, dan data pengurus OSIS.
                </p>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <SummaryCard
                    label="Total Pendaftar"
                    value={summary.total}
                    icon="👥"
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

            <div className="grid gap-4 lg:grid-cols-2">
                <Link
                    href="/admin/osis/registrations"
                    className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1"
                >
                    <p className="text-[34px]">📝</p>

                    <h2 className="mt-4 text-[22px] font-semibold text-[#061b46]">
                        Data Pendaftar OSIS
                    </h2>

                    <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                        Lihat pendaftar OSIS, update status diterima/ditolak,
                        dan isi jabatan.
                    </p>
                </Link>

                <Link
                    href="/admin/osis/members"
                    className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1"
                >
                    <p className="text-[34px]">👥</p>

                    <h2 className="mt-4 text-[22px] font-semibold text-[#061b46]">
                        Pengurus OSIS
                    </h2>

                    <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                        Kelola struktur dan data pengurus OSIS yang tampil di
                        frontend.
                    </p>
                </Link>
            </div>
        </OsisAdminLayout>
    );
}