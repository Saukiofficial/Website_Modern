import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

function TextInput({
    label,
    value,
    onChange,
    error,
    placeholder,
    type = "text",
}) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <input
                type={type}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function TextArea({ label, value, onChange, error, placeholder, rows = 5 }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <textarea
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full resize-none rounded-[16px] border border-slate-200 bg-white px-4 py-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function FileUploadBox({ label, currentUrl, file, onChange, error }) {
    const imageUrl = file ? URL.createObjectURL(file) : currentUrl || null;

    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[22px] border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center transition hover:border-[#0b73e8] hover:bg-blue-50">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    className="hidden"
                />

                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={label}
                        className="h-[150px] w-full rounded-[18px] object-cover"
                    />
                ) : (
                    <div className="flex h-[150px] w-full items-center justify-center rounded-[18px] bg-white text-[42px] shadow-sm">
                        🖼️
                    </div>
                )}

                <p className="mt-4 text-[14px] font-extrabold text-[#061b46]">
                    Klik untuk upload gambar
                </p>

                <p className="mt-2 text-[12px] font-semibold text-slate-500">
                    Format JPG, PNG, WEBP. Maksimal 4MB.
                </p>
            </label>

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function SectionCard({ eyebrow, title, description, children }) {
    return (
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
            <div className="border-b border-slate-200 pb-6">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                    {eyebrow}
                </p>

                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                    {title}
                </h2>

                {description ? (
                    <p className="mt-3 max-w-3xl text-[13px] font-semibold leading-6 text-slate-500">
                        {description}
                    </p>
                ) : null}
            </div>

            <div className="mt-7">{children}</div>
        </section>
    );
}

function RepeaterHeader({ title, onAdd }) {
    return (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-[18px] font-black text-[#061b46]">{title}</h3>

            <button
                type="button"
                onClick={onAdd}
                className="inline-flex min-h-[42px] items-center justify-center rounded-[14px] bg-blue-50 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-700 transition hover:bg-blue-100"
            >
                Tambah
            </button>
        </div>
    );
}

function RemoveButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex min-h-[38px] items-center justify-center rounded-[12px] bg-red-50 px-4 text-[12px] font-extrabold text-red-700 transition hover:bg-red-100"
        >
            Hapus
        </button>
    );
}

function StringRepeater({ title, items, onAdd, onChange, onRemove }) {
    return (
        <div>
            <RepeaterHeader title={title} onAdd={onAdd} />

            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="grid gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto]"
                    >
                        <TextArea
                            label={`Item ${index + 1}`}
                            value={item}
                            rows={3}
                            onChange={(event) =>
                                onChange(index, event.target.value)
                            }
                            placeholder="Tulis data"
                        />

                        <div className="flex items-end">
                            <RemoveButton onClick={() => onRemove(index)} />
                        </div>
                    </div>
                ))}

                {items.length === 0 ? (
                    <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-[13px] font-bold text-slate-500">
                        Belum ada data.
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function KeyValueRepeater({ title, items, onAdd, onChange, onRemove }) {
    return (
        <div>
            <RepeaterHeader title={title} onAdd={onAdd} />

            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="grid gap-4 rounded-[20px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[0.7fr_1fr_auto]"
                    >
                        <TextInput
                            label="Label"
                            value={item.label}
                            onChange={(event) =>
                                onChange(index, "label", event.target.value)
                            }
                            placeholder="Contoh: NPSN"
                        />

                        <TextInput
                            label="Value"
                            value={item.value}
                            onChange={(event) =>
                                onChange(index, "value", event.target.value)
                            }
                            placeholder="Contoh: 20500001"
                        />

                        <div className="flex items-end">
                            <RemoveButton onClick={() => onRemove(index)} />
                        </div>
                    </div>
                ))}

                {items.length === 0 ? (
                    <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-[13px] font-bold text-slate-500">
                        Belum ada data.
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function CardRepeater({
    title,
    items,
    fields,
    onAdd,
    onChange,
    onRemove,
    useTextarea = true,
}) {
    return (
        <div>
            <RepeaterHeader title={title} onAdd={onAdd} />

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
                    >
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#d59a25]">
                                Item {index + 1}
                            </p>

                            <RemoveButton onClick={() => onRemove(index)} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {fields.map((field) => {
                                const isLong =
                                    useTextarea &&
                                    field.key === "description";

                                return (
                                    <div
                                        key={field.key}
                                        className={
                                            isLong ? "md:col-span-2" : ""
                                        }
                                    >
                                        {isLong ? (
                                            <TextArea
                                                label={field.label}
                                                value={item[field.key]}
                                                rows={3}
                                                onChange={(event) =>
                                                    onChange(
                                                        index,
                                                        field.key,
                                                        event.target.value
                                                    )
                                                }
                                                placeholder={field.placeholder}
                                            />
                                        ) : (
                                            <TextInput
                                                label={field.label}
                                                value={item[field.key]}
                                                onChange={(event) =>
                                                    onChange(
                                                        index,
                                                        field.key,
                                                        event.target.value
                                                    )
                                                }
                                                placeholder={field.placeholder}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {items.length === 0 ? (
                    <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-[13px] font-bold text-slate-500">
                        Belum ada data.
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function TimelineRepeater({ items, onAdd, onChange, onToggle, onRemove }) {
    return (
        <div>
            <RepeaterHeader title="Timeline Sejarah" onAdd={onAdd} />

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
                    >
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#d59a25]">
                                Timeline {index + 1}
                            </p>

                            <RemoveButton onClick={() => onRemove(index)} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                label="Tahun"
                                value={item.year}
                                onChange={(event) =>
                                    onChange(index, "year", event.target.value)
                                }
                                placeholder="1998"
                            />

                            <TextInput
                                label="Judul"
                                value={item.title}
                                onChange={(event) =>
                                    onChange(index, "title", event.target.value)
                                }
                                placeholder="Pendirian Sekolah"
                            />

                            <div className="md:col-span-2">
                                <TextArea
                                    label="Deskripsi"
                                    value={item.description}
                                    rows={3}
                                    onChange={(event) =>
                                        onChange(
                                            index,
                                            "description",
                                            event.target.value
                                        )
                                    }
                                    placeholder="Deskripsi timeline"
                                />
                            </div>

                            <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-white px-5 py-4 md:col-span-2">
                                <div>
                                    <p className="text-[14px] font-extrabold text-[#061b46]">
                                        Jadikan Aktif
                                    </p>
                                    <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                        Biasanya dipakai untuk timeline terakhir.
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={Boolean(item.active)}
                                    onChange={(event) =>
                                        onToggle(
                                            index,
                                            "active",
                                            event.target.checked
                                        )
                                    }
                                    className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                                />
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ActionStepRepeater({ items, onAdd, onChange, onToggle, onRemove }) {
    return (
        <div>
            <RepeaterHeader title="Action Steps Visi" onAdd={onAdd} />

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
                    >
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#d59a25]">
                                Step {index + 1}
                            </p>

                            <RemoveButton onClick={() => onRemove(index)} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                label="Judul"
                                value={item.title}
                                onChange={(event) =>
                                    onChange(index, "title", event.target.value)
                                }
                                placeholder="Visi"
                            />

                            <TextInput
                                label="Icon"
                                value={item.icon}
                                onChange={(event) =>
                                    onChange(index, "icon", event.target.value)
                                }
                                placeholder="👁️"
                            />

                            <div className="md:col-span-2">
                                <TextArea
                                    label="Deskripsi"
                                    value={item.description}
                                    rows={3}
                                    onChange={(event) =>
                                        onChange(
                                            index,
                                            "description",
                                            event.target.value
                                        )
                                    }
                                    placeholder="Deskripsi step"
                                />
                            </div>

                            <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-white px-5 py-4">
                                <div>
                                    <p className="text-[14px] font-extrabold text-[#061b46]">
                                        Style Biru Aktif
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={Boolean(item.active)}
                                    onChange={(event) =>
                                        onToggle(
                                            index,
                                            "active",
                                            event.target.checked
                                        )
                                    }
                                    className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                                />
                            </label>

                            <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-white px-5 py-4">
                                <div>
                                    <p className="text-[14px] font-extrabold text-[#061b46]">
                                        Style Gold
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={Boolean(item.gold)}
                                    onChange={(event) =>
                                        onToggle(
                                            index,
                                            "gold",
                                            event.target.checked
                                        )
                                    }
                                    className="h-5 w-5 rounded border-slate-300 text-[#d59a25] focus:ring-[#d59a25]"
                                />
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PreviewCard({ data, profile }) {
    const principalImage = data.principal_image
        ? URL.createObjectURL(data.principal_image)
        : profile?.principal_image_url || "/frontend/images/principal.jpg";

    const heroImage = data.hero_image
        ? URL.createObjectURL(data.hero_image)
        : profile?.hero_image_url || "/frontend/images/profile-hero.jpg";

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                Preview Singkat
            </p>

            <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-[#052b66]">
                <div className="relative h-[210px]">
                    <img
                        src={heroImage}
                        alt="Hero profile"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[#052b66]/75" />

                    <div className="relative z-10 p-6 text-white">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#f7c46a]">
                            Profil Sekolah
                        </p>

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
                    <img
                        src={principalImage}
                        alt={data.principal_name}
                        className="h-24 w-24 rounded-[18px] object-cover"
                    />

                    <div>
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#0b73e8]">
                            {data.principal_position || "Kepala Sekolah"}
                        </p>

                        <h3 className="mt-2 text-[18px] font-black text-[#061b46]">
                            {data.principal_name || "Nama Kepala Sekolah"}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-[12px] font-semibold leading-6 text-slate-500">
                            {data.principal_message ||
                                "Sambutan kepala sekolah akan tampil di sini."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5 rounded-[20px] border border-blue-100 bg-blue-50 p-5">
                <h3 className="text-[14px] font-extrabold text-[#061b46]">
                    Catatan
                </h3>

                <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-600">
                    Data ini terhubung ke halaman profil frontend, termasuk
                    sidebar tab profil, sejarah, visi misi, dan identitas.
                </p>
            </div>
        </div>
    );
}

export default function Edit({ profile }) {
    const { data, setData, post, processing, errors } = useForm({
        school_name: profile?.school_name || "",
        short_name: profile?.short_name || "",
        city: profile?.city || "",
        tagline: profile?.tagline || "",
        description: profile?.description || "",

        hero_image: null,
        vision_hero_image: null,
        structure_hero_image: null,
        history_image: null,
        identity_image: null,
        vision_banner_image: null,
        principal_image: null,

        principal_name: profile?.principal_name || "",
        principal_position: profile?.principal_position || "",
        principal_message: profile?.principal_message || "",

        history: profile?.history || "",
        vision: profile?.vision || "",

        missions: Array.isArray(profile?.missions) ? profile.missions : [],
        identity: Array.isArray(profile?.identity) ? profile.identity : [],
        values: Array.isArray(profile?.values) ? profile.values : [],
        profile_stats: Array.isArray(profile?.profile_stats)
            ? profile.profile_stats
            : [],
        hero_stats: Array.isArray(profile?.hero_stats) ? profile.hero_stats : [],
        history_timeline: Array.isArray(profile?.history_timeline)
            ? profile.history_timeline
            : [],
        vision_mission_items: Array.isArray(profile?.vision_mission_items)
            ? profile.vision_mission_items
            : [],
        core_values: Array.isArray(profile?.core_values)
            ? profile.core_values
            : [],
        vision_action_steps: Array.isArray(profile?.vision_action_steps)
            ? profile.vision_action_steps
            : [],
    });

    const setField = (field, value) => {
        setData(field, value);
    };

    const setImage = (field, event) => {
        setData(field, event.target.files?.[0] || null);
    };

    const updateArrayItem = (field, index, key, value) => {
        const nextItems = [...data[field]];

        nextItems[index] = {
            ...nextItems[index],
            [key]: value,
        };

        setData(field, nextItems);
    };

    const updateStringArray = (field, index, value) => {
        const nextItems = [...data[field]];
        nextItems[index] = value;
        setData(field, nextItems);
    };

    const removeArrayItem = (field, index) => {
        setData(
            field,
            data[field].filter((_, currentIndex) => currentIndex !== index)
        );
    };

    const addStringItem = (field) => {
        setData(field, [...data[field], ""]);
    };

    const addKeyValueItem = (field) => {
        setData(field, [...data[field], { label: "", value: "" }]);
    };

    const addCardItem = (field, template) => {
        setData(field, [...data[field], template]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/profiles", {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Profil Sekolah">
            <Head title="Profil Sekolah" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Konten Frontend
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Kelola Profil Sekolah
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Atur data profil, kepala sekolah, sejarah, visi misi,
                        identitas, statistik, dan gambar halaman profil.
                    </p>
                </div>

                <Link
                    href="/profil"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                >
                    Lihat Profil
                </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_430px] xl:items-start">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <SectionCard
                        eyebrow="Data Utama"
                        title="Informasi Sekolah"
                        description="Data utama yang tampil pada hero profil dan beberapa section profil."
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            <TextInput
                                label="Nama Sekolah"
                                value={data.school_name}
                                onChange={(event) =>
                                    setField("school_name", event.target.value)
                                }
                                error={errors.school_name}
                                placeholder="SMA Negeri 1 Mojokerto"
                            />

                            <TextInput
                                label="Nama Pendek"
                                value={data.short_name}
                                onChange={(event) =>
                                    setField("short_name", event.target.value)
                                }
                                error={errors.short_name}
                                placeholder="SMA Negeri 1"
                            />

                            <TextInput
                                label="Kota"
                                value={data.city}
                                onChange={(event) =>
                                    setField("city", event.target.value)
                                }
                                error={errors.city}
                                placeholder="Mojokerto"
                            />

                            <TextInput
                                label="Tagline"
                                value={data.tagline}
                                onChange={(event) =>
                                    setField("tagline", event.target.value)
                                }
                                error={errors.tagline}
                                placeholder="Berprestasi, Berkarakter, Berbudaya"
                            />

                            <div className="md:col-span-2">
                                <TextArea
                                    label="Deskripsi Sekolah"
                                    value={data.description}
                                    onChange={(event) =>
                                        setField(
                                            "description",
                                            event.target.value
                                        )
                                    }
                                    error={errors.description}
                                    placeholder="Deskripsi singkat sekolah"
                                />
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        eyebrow="Gambar Profil"
                        title="Gambar Hero dan Pendukung"
                        description="Gambar ini dipakai pada hero profil, visi misi, struktur organisasi, sejarah, identitas, dan banner visi."
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            <FileUploadBox
                                label="Hero Profil"
                                currentUrl={profile?.hero_image_url}
                                file={data.hero_image}
                                onChange={(event) =>
                                    setImage("hero_image", event)
                                }
                                error={errors.hero_image}
                            />

                            <FileUploadBox
                                label="Hero Visi Misi"
                                currentUrl={profile?.vision_hero_image_url}
                                file={data.vision_hero_image}
                                onChange={(event) =>
                                    setImage("vision_hero_image", event)
                                }
                                error={errors.vision_hero_image}
                            />

                            <FileUploadBox
                                label="Hero Struktur"
                                currentUrl={profile?.structure_hero_image_url}
                                file={data.structure_hero_image}
                                onChange={(event) =>
                                    setImage("structure_hero_image", event)
                                }
                                error={errors.structure_hero_image}
                            />

                            <FileUploadBox
                                label="Gambar Sejarah"
                                currentUrl={profile?.history_image_url}
                                file={data.history_image}
                                onChange={(event) =>
                                    setImage("history_image", event)
                                }
                                error={errors.history_image}
                            />

                            <FileUploadBox
                                label="Gambar Identitas"
                                currentUrl={profile?.identity_image_url}
                                file={data.identity_image}
                                onChange={(event) =>
                                    setImage("identity_image", event)
                                }
                                error={errors.identity_image}
                            />

                            <FileUploadBox
                                label="Banner Visi"
                                currentUrl={profile?.vision_banner_image_url}
                                file={data.vision_banner_image}
                                onChange={(event) =>
                                    setImage("vision_banner_image", event)
                                }
                                error={errors.vision_banner_image}
                            />
                        </div>
                    </SectionCard>

                    <SectionCard
                        eyebrow="Kepala Sekolah"
                        title="Sambutan Kepala Sekolah"
                        description="Data ini tampil pada tab Profil Sekolah."
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            <FileUploadBox
                                label="Foto Kepala Sekolah"
                                currentUrl={profile?.principal_image_url}
                                file={data.principal_image}
                                onChange={(event) =>
                                    setImage("principal_image", event)
                                }
                                error={errors.principal_image}
                            />

                            <div className="space-y-5">
                                <TextInput
                                    label="Nama Kepala Sekolah"
                                    value={data.principal_name}
                                    onChange={(event) =>
                                        setField(
                                            "principal_name",
                                            event.target.value
                                        )
                                    }
                                    error={errors.principal_name}
                                    placeholder="Drs. Ahmad Fauzi, M.Pd."
                                />

                                <TextInput
                                    label="Jabatan"
                                    value={data.principal_position}
                                    onChange={(event) =>
                                        setField(
                                            "principal_position",
                                            event.target.value
                                        )
                                    }
                                    error={errors.principal_position}
                                    placeholder="Kepala Sekolah"
                                />

                                <TextArea
                                    label="Sambutan"
                                    value={data.principal_message}
                                    onChange={(event) =>
                                        setField(
                                            "principal_message",
                                            event.target.value
                                        )
                                    }
                                    error={errors.principal_message}
                                    placeholder="Tulis sambutan kepala sekolah"
                                    rows={6}
                                />
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        eyebrow="Sejarah dan Visi"
                        title="Konten Sejarah, Visi, dan Misi"
                    >
                        <div className="grid gap-5">
                            <TextArea
                                label="Sejarah Sekolah"
                                value={data.history}
                                onChange={(event) =>
                                    setField("history", event.target.value)
                                }
                                error={errors.history}
                                placeholder="Tulis sejarah sekolah"
                                rows={6}
                            />

                            <TextArea
                                label="Visi Sekolah"
                                value={data.vision}
                                onChange={(event) =>
                                    setField("vision", event.target.value)
                                }
                                error={errors.vision}
                                placeholder="Tulis visi sekolah"
                                rows={4}
                            />

                            <StringRepeater
                                title="Misi Sekolah"
                                items={data.missions}
                                onAdd={() => addStringItem("missions")}
                                onChange={(index, value) =>
                                    updateStringArray(
                                        "missions",
                                        index,
                                        value
                                    )
                                }
                                onRemove={(index) =>
                                    removeArrayItem("missions", index)
                                }
                            />
                        </div>
                    </SectionCard>

                    <SectionCard
                        eyebrow="Identitas"
                        title="Identitas Sekolah"
                    >
                        <KeyValueRepeater
                            title="Data Identitas"
                            items={data.identity}
                            onAdd={() => addKeyValueItem("identity")}
                            onChange={(index, key, value) =>
                                updateArrayItem(
                                    "identity",
                                    index,
                                    key,
                                    value
                                )
                            }
                            onRemove={(index) =>
                                removeArrayItem("identity", index)
                            }
                        />
                    </SectionCard>

                    <SectionCard
                        eyebrow="Profil"
                        title="Nilai dan Statistik Profil"
                    >
                        <div className="space-y-8">
                            <CardRepeater
                                title="Nilai Sekolah"
                                items={data.values}
                                fields={[
                                    {
                                        key: "title",
                                        label: "Judul",
                                        placeholder: "Berprestasi",
                                    },
                                    {
                                        key: "icon",
                                        label: "Icon",
                                        placeholder: "🏆",
                                    },
                                    {
                                        key: "description",
                                        label: "Deskripsi",
                                        placeholder: "Deskripsi nilai",
                                    },
                                ]}
                                onAdd={() =>
                                    addCardItem("values", {
                                        title: "",
                                        icon: "🏫",
                                        description: "",
                                    })
                                }
                                onChange={(index, key, value) =>
                                    updateArrayItem(
                                        "values",
                                        index,
                                        key,
                                        value
                                    )
                                }
                                onRemove={(index) =>
                                    removeArrayItem("values", index)
                                }
                            />

                            <CardRepeater
                                title="Statistik Profil"
                                items={data.profile_stats}
                                fields={[
                                    {
                                        key: "value",
                                        label: "Value",
                                        placeholder: "900+",
                                    },
                                    {
                                        key: "label",
                                        label: "Label",
                                        placeholder: "Peserta Didik Aktif",
                                    },
                                    {
                                        key: "icon",
                                        label: "Icon",
                                        placeholder: "👥",
                                    },
                                ]}
                                useTextarea={false}
                                onAdd={() =>
                                    addCardItem("profile_stats", {
                                        value: "",
                                        label: "",
                                        icon: "👥",
                                    })
                                }
                                onChange={(index, key, value) =>
                                    updateArrayItem(
                                        "profile_stats",
                                        index,
                                        key,
                                        value
                                    )
                                }
                                onRemove={(index) =>
                                    removeArrayItem("profile_stats", index)
                                }
                            />

                            <CardRepeater
                                title="Hero Statistik Profil"
                                items={data.hero_stats}
                                fields={[
                                    {
                                        key: "value",
                                        label: "Value",
                                        placeholder: "25+",
                                    },
                                    {
                                        key: "label",
                                        label: "Label",
                                        placeholder:
                                            "Tahun Pengalaman Pendidikan",
                                    },
                                    {
                                        key: "icon",
                                        label: "Icon",
                                        placeholder: "🎓",
                                    },
                                ]}
                                useTextarea={false}
                                onAdd={() =>
                                    addCardItem("hero_stats", {
                                        value: "",
                                        label: "",
                                        icon: "🎓",
                                    })
                                }
                                onChange={(index, key, value) =>
                                    updateArrayItem(
                                        "hero_stats",
                                        index,
                                        key,
                                        value
                                    )
                                }
                                onRemove={(index) =>
                                    removeArrayItem("hero_stats", index)
                                }
                            />
                        </div>
                    </SectionCard>

                    <SectionCard
                        eyebrow="Sejarah"
                        title="Timeline Sejarah"
                    >
                        <TimelineRepeater
                            items={data.history_timeline}
                            onAdd={() =>
                                addCardItem("history_timeline", {
                                    year: "",
                                    title: "",
                                    description: "",
                                    active: false,
                                })
                            }
                            onChange={(index, key, value) =>
                                updateArrayItem(
                                    "history_timeline",
                                    index,
                                    key,
                                    value
                                )
                            }
                            onToggle={(index, key, value) =>
                                updateArrayItem(
                                    "history_timeline",
                                    index,
                                    key,
                                    value
                                )
                            }
                            onRemove={(index) =>
                                removeArrayItem("history_timeline", index)
                            }
                        />
                    </SectionCard>

                    <SectionCard
                        eyebrow="Visi Misi"
                        title="Konten Visual Visi Misi"
                    >
                        <div className="space-y-8">
                            <CardRepeater
                                title="Misi Visual"
                                items={data.vision_mission_items}
                                fields={[
                                    {
                                        key: "title",
                                        label: "Judul",
                                        placeholder: "Pendidikan Berkualitas",
                                    },
                                    {
                                        key: "icon",
                                        label: "Icon",
                                        placeholder: "🎓",
                                    },
                                    {
                                        key: "description",
                                        label: "Deskripsi",
                                        placeholder: "Deskripsi misi visual",
                                    },
                                ]}
                                onAdd={() =>
                                    addCardItem("vision_mission_items", {
                                        title: "",
                                        icon: "🎓",
                                        description: "",
                                    })
                                }
                                onChange={(index, key, value) =>
                                    updateArrayItem(
                                        "vision_mission_items",
                                        index,
                                        key,
                                        value
                                    )
                                }
                                onRemove={(index) =>
                                    removeArrayItem(
                                        "vision_mission_items",
                                        index
                                    )
                                }
                            />

                            <CardRepeater
                                title="Core Values"
                                items={data.core_values}
                                fields={[
                                    {
                                        key: "title",
                                        label: "Judul",
                                        placeholder: "Excellence",
                                    },
                                    {
                                        key: "icon",
                                        label: "Icon",
                                        placeholder: "☆",
                                    },
                                    {
                                        key: "description",
                                        label: "Deskripsi",
                                        placeholder: "Deskripsi core value",
                                    },
                                ]}
                                onAdd={() =>
                                    addCardItem("core_values", {
                                        title: "",
                                        icon: "☆",
                                        description: "",
                                    })
                                }
                                onChange={(index, key, value) =>
                                    updateArrayItem(
                                        "core_values",
                                        index,
                                        key,
                                        value
                                    )
                                }
                                onRemove={(index) =>
                                    removeArrayItem("core_values", index)
                                }
                            />

                            <ActionStepRepeater
                                items={data.vision_action_steps}
                                onAdd={() =>
                                    addCardItem("vision_action_steps", {
                                        title: "",
                                        description: "",
                                        icon: "👁️",
                                        active: false,
                                        gold: false,
                                    })
                                }
                                onChange={(index, key, value) =>
                                    updateArrayItem(
                                        "vision_action_steps",
                                        index,
                                        key,
                                        value
                                    )
                                }
                                onToggle={(index, key, value) =>
                                    updateArrayItem(
                                        "vision_action_steps",
                                        index,
                                        key,
                                        value
                                    )
                                }
                                onRemove={(index) =>
                                    removeArrayItem(
                                        "vision_action_steps",
                                        index
                                    )
                                }
                            />
                        </div>
                    </SectionCard>

                    <div className="sticky bottom-5 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-xl">
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <Link
                                href="/admin/dashboard"
                                className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-slate-200 bg-white px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50"
                            >
                                Kembali
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#061b46] px-7 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Profil"}
                            </button>
                        </div>
                    </div>
                </form>

                <aside className="xl:sticky xl:top-[98px]">
                    <PreviewCard data={data} profile={profile} />
                </aside>
            </div>
        </AdminLayout>
    );
}