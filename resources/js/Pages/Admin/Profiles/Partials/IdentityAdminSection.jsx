import { FileUploadBox, SectionCard } from "./FormControls";
import { KeyValueRepeater } from "./Repeaters";

export default function IdentityAdminSection({
    data,
    profile,
    errors,
    updateFile,
    addCardItem,
    updateArrayItem,
    removeArrayItem,
}) {
    return (
        <div className="space-y-7">
            <SectionCard
                eyebrow="Identitas Sekolah"
                title="Data Resmi Sekolah"
                description="Data identitas seperti NPSN, akreditasi, alamat, email, telepon, dan tahun berdiri disimpan dalam kolom identity pada SchoolProfile."
            >
                <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                    <FileUploadBox
                        label="Gambar Identitas"
                        currentUrl={profile?.identity_image_url}
                        file={data.identity_image}
                        onChange={(event) => updateFile("identity_image", event)}
                        error={errors.identity_image}
                    />

                    <KeyValueRepeater
                        title="Tabel Identitas"
                        items={data.identity}
                        onAdd={() => addCardItem("identity", { label: "", value: "" })}
                        onChange={(index, key, value) => updateArrayItem("identity", index, key, value)}
                        onRemove={(index) => removeArrayItem("identity", index)}
                    />
                </div>
            </SectionCard>
        </div>
    );
}
