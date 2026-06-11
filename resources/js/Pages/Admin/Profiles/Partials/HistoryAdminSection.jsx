import { FileUploadBox, SectionCard, TextArea } from "./FormControls";
import { TimelineRepeater } from "./Repeaters";

export default function HistoryAdminSection({
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
                eyebrow="Sejarah"
                title="Narasi Sejarah Sekolah"
                description="Bagian ini khusus untuk isi sejarah yang tampil di tab Sejarah pada frontend."
            >
                <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                    <FileUploadBox
                        label="Gambar Sejarah"
                        currentUrl={profile?.history_image_url}
                        file={data.history_image}
                        onChange={(event) => updateFile("history_image", event)}
                        error={errors.history_image}
                    />

                    <TextArea
                        label="Isi Sejarah"
                        value={data.history}
                        onChange={(event) => updateField("history", event.target.value)}
                        error={errors.history}
                        placeholder="Tulis sejarah singkat sekolah"
                        rows={12}
                    />
                </div>
            </SectionCard>

            <SectionCard
                eyebrow="Timeline"
                title="Timeline Perjalanan Sekolah"
                description="Tambahkan tonggak sejarah sekolah dari tahun berdiri sampai sekarang."
            >
                <TimelineRepeater
                    items={data.history_timeline}
                    onAdd={() => addCardItem("history_timeline", { year: "", title: "", description: "", active: false })}
                    onChange={(index, key, value) => updateArrayItem("history_timeline", index, key, value)}
                    onToggle={(index, key, value) => updateArrayItem("history_timeline", index, key, value)}
                    onRemove={(index) => removeArrayItem("history_timeline", index)}
                />
            </SectionCard>
        </div>
    );
}
