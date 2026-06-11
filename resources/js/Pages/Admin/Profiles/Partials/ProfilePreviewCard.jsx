const tabNotes = {
    profile: "Preview sambutan dan hero profil sekolah.",
    history: "Preview data sejarah yang sedang kamu edit.",
    vision: "Preview visi misi yang sedang kamu edit.",
    identity: "Preview identitas sekolah yang sedang kamu edit.",
    structure: "Struktur organisasi memakai halaman dan controller terpisah.",
};

export default function ProfilePreviewCard({ data, profile, activeTab }) {
    const principalImage = data.principal_image
        ? URL.createObjectURL(data.principal_image)
        : profile?.principal_image_url || "/frontend/images/principal.jpg";

    const heroImage = data.hero_image
        ? URL.createObjectURL(data.hero_image)
        : profile?.hero_image_url || "/frontend/images/profile-hero.jpg";

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">Preview Singkat</p>

            <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-[#052b66]">
                <div className="relative h-[210px]">
                    <img src={heroImage} alt="Hero profile" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-[#052b66]/75" />
                    <div className="relative z-10 p-6 text-white">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#f7c46a]">Profil Sekolah</p>
                        <h3 className="mt-4 font-serif text-[32px] font-semibold leading-tight">
                            {data.short_name || "SMA Negeri 1"}
                            <br />
                            {data.city || "Mojokerto"}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex gap-4">
                    <img src={principalImage} alt={data.principal_name || "Kepala Sekolah"} className="h-24 w-24 rounded-[18px] object-cover" />
                    <div>
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#0b73e8]">
                            {data.principal_position || "Kepala Sekolah"}
                        </p>
                        <h3 className="mt-2 text-[18px] font-black text-[#061b46]">
                            {data.principal_name || "Nama Kepala Sekolah"}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-[12px] font-semibold leading-6 text-slate-500">
                            {data.principal_message || "Sambutan kepala sekolah akan tampil di sini."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5 rounded-[20px] border border-blue-100 bg-blue-50 p-5">
                <h3 className="text-[14px] font-extrabold text-[#061b46]">Catatan</h3>
                <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-600">
                    {tabNotes[activeTab] || "Data ini terhubung ke halaman profil frontend."}
                </p>
            </div>
        </div>
    );
}
