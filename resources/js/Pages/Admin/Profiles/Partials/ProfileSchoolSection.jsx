import { FileUploadBox, SectionCard, TextArea, TextInput } from "./FormControls";
import { CardRepeater } from "./Repeaters";

export default function ProfileSchoolSection({
    data,
    profile,
    errors,
    updateField,
    updateFile,
    addCardItem,
    updateArrayItem,
    removeArrayItem,
}) {
    return (
        <div className="space-y-7">
            <SectionCard
                eyebrow="Sambutan / Profil Sekolah"
                title="Data Utama Sekolah"
                description="Bagian ini mengatur judul halaman profil, deskripsi sekolah, hero image, dan informasi dasar sekolah."
            >
                <div className="grid gap-5 lg:grid-cols-2">
                    <TextInput
                        label="Nama Sekolah"
                        value={data.school_name}
                        onChange={(event) => updateField("school_name", event.target.value)}
                        error={errors.school_name}
                        placeholder="SMA Negeri 1 Sumenep"
                    />
                    <TextInput
                        label="Nama Singkat"
                        value={data.short_name}
                        onChange={(event) => updateField("short_name", event.target.value)}
                        error={errors.short_name}
                        placeholder="SMA Negeri 1"
                    />
                    <TextInput
                        label="Kota"
                        value={data.city}
                        onChange={(event) => updateField("city", event.target.value)}
                        error={errors.city}
                        placeholder="Sumenep"
                    />
                    <TextInput
                        label="Tagline"
                        value={data.tagline}
                        onChange={(event) => updateField("tagline", event.target.value)}
                        error={errors.tagline}
                        placeholder="Berprestasi, Berkarakter, Berbudaya"
                    />
                    <div className="lg:col-span-2">
                        <TextArea
                            label="Deskripsi Profil Sekolah"
                            value={data.description}
                            onChange={(event) => updateField("description", event.target.value)}
                            error={errors.description}
                            placeholder="Tulis deskripsi singkat profil sekolah"
                            rows={6}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <FileUploadBox
                            label="Hero Image Profil"
                            currentUrl={profile?.hero_image_url}
                            file={data.hero_image}
                            onChange={(event) => updateFile("hero_image", event)}
                            error={errors.hero_image}
                        />
                    </div>
                </div>
            </SectionCard>

            <SectionCard
                eyebrow="Sambutan Kepala Sekolah"
                title="Data Kepala Sekolah"
                description="Bagian ini tampil pada tab profil frontend sebagai sambutan utama."
            >
                <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                    <FileUploadBox
                        label="Foto Kepala Sekolah"
                        currentUrl={profile?.principal_image_url}
                        file={data.principal_image}
                        onChange={(event) => updateFile("principal_image", event)}
                        error={errors.principal_image}
                    />

                    <div className="grid gap-5">
                        <div className="grid gap-5 md:grid-cols-2">
                            <TextInput
                                label="Nama Kepala Sekolah"
                                value={data.principal_name}
                                onChange={(event) => updateField("principal_name", event.target.value)}
                                error={errors.principal_name}
                                placeholder="Drs. Ahmad Fauzi, M.Pd."
                            />
                            <TextInput
                                label="Jabatan"
                                value={data.principal_position}
                                onChange={(event) => updateField("principal_position", event.target.value)}
                                error={errors.principal_position}
                                placeholder="Kepala Sekolah"
                            />
                        </div>

                        <TextArea
                            label="Sambutan / Pesan Kepala Sekolah"
                            value={data.principal_message}
                            onChange={(event) => updateField("principal_message", event.target.value)}
                            error={errors.principal_message}
                            placeholder="Tulis sambutan kepala sekolah"
                            rows={7}
                        />
                    </div>
                </div>
            </SectionCard>

            <SectionCard
                eyebrow="Nilai & Statistik"
                title="Konten Pendukung Profil"
                description="Nilai sekolah, statistik profil, dan statistik hero tetap disimpan dalam SchoolProfile dalam bentuk JSON."
            >
                <div className="space-y-8">
                    <CardRepeater
                        title="Nilai Sekolah"
                        items={data.values}
                        fields={[
                            { key: "title", label: "Judul", placeholder: "Integrity" },
                            { key: "icon", label: "Icon", placeholder: "🛡️" },
                            { key: "description", label: "Deskripsi", placeholder: "Deskripsi nilai sekolah" },
                        ]}
                        onAdd={() => addCardItem("values", { title: "", icon: "⭐", description: "" })}
                        onChange={(index, key, value) => updateArrayItem("values", index, key, value)}
                        onRemove={(index) => removeArrayItem("values", index)}
                    />

                    <CardRepeater
                        title="Statistik Profil"
                        items={data.profile_stats}
                        fields={[
                            { key: "value", label: "Angka", placeholder: "1200+" },
                            { key: "label", label: "Label", placeholder: "Siswa Aktif" },
                            { key: "icon", label: "Icon", placeholder: "👥" },
                        ]}
                        useTextarea={false}
                        onAdd={() => addCardItem("profile_stats", { value: "", label: "", icon: "📌" })}
                        onChange={(index, key, value) => updateArrayItem("profile_stats", index, key, value)}
                        onRemove={(index) => removeArrayItem("profile_stats", index)}
                    />

                    <CardRepeater
                        title="Statistik Hero"
                        items={data.hero_stats}
                        fields={[
                            { key: "value", label: "Angka", placeholder: "A" },
                            { key: "label", label: "Label", placeholder: "Akreditasi" },
                            { key: "icon", label: "Icon", placeholder: "🏅" },
                        ]}
                        useTextarea={false}
                        onAdd={() => addCardItem("hero_stats", { value: "", label: "", icon: "🏅" })}
                        onChange={(index, key, value) => updateArrayItem("hero_stats", index, key, value)}
                        onRemove={(index) => removeArrayItem("hero_stats", index)}
                    />
                </div>
            </SectionCard>
        </div>
    );
}
