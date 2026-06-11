import { Link } from "@inertiajs/react";
import { SectionCard } from "./FormControls";

export default function StructureShortcutSection() {
    return (
        <SectionCard
            eyebrow="Struktur Organisasi"
            title="Struktur Organisasi Dipisah di Halaman Khusus"
            description="Bagian ini sengaja tidak digabung dengan SchoolProfile karena datanya memakai model OrganizationStructure dan OrganizationUnit."
        >
            <div className="rounded-[24px] border border-blue-100 bg-blue-50 p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-[22px] font-black text-[#061b46]">Kelola Struktur Organisasi</h3>
                        <p className="mt-3 max-w-2xl text-[14px] font-semibold leading-7 text-slate-600">
                            Untuk mengubah kepala sekolah, waka, tata usaha, unit guru, komite, dan unit pendukung lain, buka halaman struktur organisasi. Ini mengikuti file route yang sudah ada: <span className="font-black text-[#061b46]">/admin/profiles/structure</span>.
                        </p>
                    </div>

                    <Link
                        href="/admin/profiles/structure"
                        className="inline-flex min-h-[52px] items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85]"
                    >
                        Buka Struktur
                    </Link>
                </div>
            </div>
        </SectionCard>
    );
}
