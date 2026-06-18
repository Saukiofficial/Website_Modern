import { Head, Link } from "@inertiajs/react";
import ExtracurricularAdminLayout from "../Layouts/ExtracurricularAdminLayout";

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

function ActionCard({ href, icon, title, description }) {
    return (
        <Link
            href={href}
            className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1"
        >
            <p className="text-[34px]">{icon}</p>

            <h2 className="mt-4 text-[22px] font-semibold text-[#061b46]">
                {title}
            </h2>

            <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                {description}
            </p>
        </Link>
    );
}

export default function ExtracurricularDashboard({ summary = {} }) {
    return (
        <ExtracurricularAdminLayout title="Dashboard Ekstrakurikuler">
            <Head title="Dashboard Ekstrakurikuler" />

            <div className="mb-6 rounded-[28px] bg-gradient-to-br from-[#052b66] to-[#0f766e] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                    Panel Khusus Ekstrakurikuler
                </p>

                <h1 className="mt-3 text-[36px] font-semibold leading-tight tracking-[-0.05em] sm:text-[44px]">
                    Admin Ekstrakurikuler
                </h1>

                <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                    Kelola pendaftaran ekstrakurikuler, status peserta, anggota,
                    program, dan kegiatan yang tampil di frontend sekolah.
                </p>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard label="Total Pendaftar" value={summary.total} icon="🏆" />
                <SummaryCard label="Diterima" value={summary.diterima} icon="✅" />
                <SummaryCard label="Anggota Ekskul" value={summary.members} icon="👥" />
                <SummaryCard label="Program Ekskul" value={summary.programs} icon="📌" />
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <SummaryCard label="Baru" value={summary.baru} icon="🟡" />
                <SummaryCard label="Diproses" value={summary.diproses} icon="🔵" />
                <SummaryCard label="Ditolak" value={summary.ditolak} icon="❌" />
                <SummaryCard label="Anggota Aktif" value={summary.active_members} icon="🟢" />
                <SummaryCard label="Total Program" value={summary.programs} icon="🏆" />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <ActionCard
                    href="/admin/ekstrakurikuler/registrations"
                    icon="📝"
                    title="Data Pendaftar Ekskul"
                    description="Lihat pendaftar ekstrakurikuler, update status, dan otomatis masukkan siswa yang diterima ke anggota ekskul."
                />

                <ActionCard
                    href="/admin/ekstrakurikuler/members"
                    icon="👥"
                    title="Anggota Ekskul"
                    description="Kelola anggota ekstrakurikuler, tambah manual, edit peran, program, dan status aktif."
                />

                <ActionCard
                    href="/admin/ekstrakurikuler/programs"
                    icon="🏆"
                    title="Program Ekstrakurikuler"
                    description="Kelola daftar ekstrakurikuler, deskripsi, pembina, jadwal, lokasi, dan informasi program."
                />
            </div>
        </ExtracurricularAdminLayout>
    );
}
