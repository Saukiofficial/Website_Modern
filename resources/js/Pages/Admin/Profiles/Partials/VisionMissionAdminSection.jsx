import { FileUploadBox, SectionCard, TextArea } from "./FormControls";
import { ActionStepRepeater, CardRepeater, StringRepeater } from "./Repeaters";

export default function VisionMissionAdminSection({
    data,
    profile,
    errors,
    updateField,
    updateFile,
    addStringItem,
    updateStringItem,
    addCardItem,
    updateArrayItem,
    removeArrayItem,
}) {
    return (
        <div className="space-y-7">
            <SectionCard
                eyebrow="Visi Misi"
                title="Visi Sekolah"
                description="Visi dan gambar pendukung visi misi tetap memakai kolom dari SchoolProfile."
            >
                <div className="grid gap-5 lg:grid-cols-2">
                    <TextArea
                        label="Visi Sekolah"
                        value={data.vision}
                        onChange={(event) => updateField("vision", event.target.value)}
                        error={errors.vision}
                        placeholder="Tulis visi sekolah"
                        rows={9}
                    />

                    <div className="grid gap-5">
                        <FileUploadBox
                            label="Hero Image Visi Misi"
                            currentUrl={profile?.vision_hero_image_url}
                            file={data.vision_hero_image}
                            onChange={(event) => updateFile("vision_hero_image", event)}
                            error={errors.vision_hero_image}
                        />
                        <FileUploadBox
                            label="Banner Image Visi Misi"
                            currentUrl={profile?.vision_banner_image_url}
                            file={data.vision_banner_image}
                            onChange={(event) => updateFile("vision_banner_image", event)}
                            error={errors.vision_banner_image}
                        />
                    </div>
                </div>
            </SectionCard>

            <SectionCard
                eyebrow="Misi"
                title="Daftar Misi Sekolah"
                description="Misi disimpan sebagai array pada kolom missions di SchoolProfile."
            >
                <StringRepeater
                    title="Misi Sekolah"
                    items={data.missions}
                    onAdd={() => addStringItem("missions")}
                    onChange={(index, value) => updateStringItem("missions", index, value)}
                    onRemove={(index) => removeArrayItem("missions", index)}
                />
            </SectionCard>

            <SectionCard
                eyebrow="Konten Visual"
                title="Misi Visual, Core Values, dan Action Steps"
                description="Bagian ini untuk card-card visual yang tampil di halaman frontend."
            >
                <div className="space-y-8">
                    <CardRepeater
                        title="Misi Visual"
                        items={data.vision_mission_items}
                        fields={[
                            { key: "title", label: "Judul", placeholder: "Pendidikan Berkualitas" },
                            { key: "icon", label: "Icon", placeholder: "🎓" },
                            { key: "description", label: "Deskripsi", placeholder: "Deskripsi misi visual" },
                        ]}
                        onAdd={() => addCardItem("vision_mission_items", { title: "", icon: "🎓", description: "" })}
                        onChange={(index, key, value) => updateArrayItem("vision_mission_items", index, key, value)}
                        onRemove={(index) => removeArrayItem("vision_mission_items", index)}
                    />

                    <CardRepeater
                        title="Core Values"
                        items={data.core_values}
                        fields={[
                            { key: "title", label: "Judul", placeholder: "Excellence" },
                            { key: "icon", label: "Icon", placeholder: "☆" },
                            { key: "description", label: "Deskripsi", placeholder: "Deskripsi core value" },
                        ]}
                        onAdd={() => addCardItem("core_values", { title: "", icon: "☆", description: "" })}
                        onChange={(index, key, value) => updateArrayItem("core_values", index, key, value)}
                        onRemove={(index) => removeArrayItem("core_values", index)}
                    />

                    <ActionStepRepeater
                        items={data.vision_action_steps}
                        onAdd={() => addCardItem("vision_action_steps", { title: "", description: "", icon: "👁️", active: false, gold: false })}
                        onChange={(index, key, value) => updateArrayItem("vision_action_steps", index, key, value)}
                        onToggle={(index, key, value) => updateArrayItem("vision_action_steps", index, key, value)}
                        onRemove={(index) => removeArrayItem("vision_action_steps", index)}
                    />
                </div>
            </SectionCard>
        </div>
    );
}
