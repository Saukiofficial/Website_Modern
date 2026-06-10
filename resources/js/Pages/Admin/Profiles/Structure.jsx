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

function TextArea({ label, value, onChange, error, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <textarea
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows="4"
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

function FileUploadBox({ currentUrl, file, onChange }) {
    const imageUrl = file ? URL.createObjectURL(file) : currentUrl || null;

    return (
        <label className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[18px] border-2 border-dashed border-slate-200 bg-white px-4 py-5 text-center transition hover:border-[#0b73e8] hover:bg-blue-50">
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                className="hidden"
            />

            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Foto struktur"
                    className="h-[170px] w-full rounded-[14px] object-cover"
                />
            ) : (
                <div className="flex h-[170px] w-full items-center justify-center rounded-[14px] bg-slate-50 text-[42px]">
                    🖼️
                </div>
            )}

            <p className="mt-4 text-[13px] font-extrabold text-[#061b46]">
                Klik untuk upload foto
            </p>

            <p className="mt-1 text-[11px] font-semibold text-slate-500">
                JPG, PNG, WEBP. Maksimal 4MB.
            </p>
        </label>
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

function RemoveButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex min-h-[40px] items-center justify-center rounded-[12px] bg-red-50 px-4 text-[12px] font-extrabold text-red-700 transition hover:bg-red-100"
        >
            Hapus
        </button>
    );
}

function LeaderCard({
    leader,
    index,
    onChange,
    onToggle,
    onImageChange,
    onRemove,
    errors,
}) {
    return (
        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#d59a25]">
                        Pengurus {index + 1}
                    </p>

                    <h3 className="mt-1 text-[20px] font-black text-[#061b46]">
                        {leader.role || "Jabatan Struktur"}
                    </h3>
                </div>

                <RemoveButton onClick={() => onRemove(index)} />
            </div>

            <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
                <FileUploadBox
                    currentUrl={leader.image_url}
                    file={leader.image}
                    onChange={(event) => onImageChange(index, event)}
                />

                <div className="grid gap-4 md:grid-cols-2">
                    <TextInput
                        label="Jabatan"
                        value={leader.role}
                        onChange={(event) =>
                            onChange(index, "role", event.target.value)
                        }
                        error={errors?.[`leaders.${index}.role`]}
                        placeholder="Contoh: Kepala Sekolah"
                    />

                    <TextInput
                        label="Nama"
                        value={leader.name}
                        onChange={(event) =>
                            onChange(index, "name", event.target.value)
                        }
                        error={errors?.[`leaders.${index}.name`]}
                        placeholder="Nama lengkap"
                    />

                    <TextInput
                        label="Urutan"
                        type="number"
                        value={leader.sort_order}
                        onChange={(event) =>
                            onChange(index, "sort_order", event.target.value)
                        }
                        error={errors?.[`leaders.${index}.sort_order`]}
                        placeholder="1"
                    />

                    <TextInput
                        label="Fallback Image URL"
                        value={leader.fallback_image}
                        onChange={(event) =>
                            onChange(
                                index,
                                "fallback_image",
                                event.target.value
                            )
                        }
                        error={errors?.[`leaders.${index}.fallback_image`]}
                        placeholder="https://..."
                    />

                    <div className="md:col-span-2">
                        <TextArea
                            label="Deskripsi Tugas"
                            value={leader.description}
                            onChange={(event) =>
                                onChange(
                                    index,
                                    "description",
                                    event.target.value
                                )
                            }
                            error={errors?.[`leaders.${index}.description`]}
                            placeholder="Tulis deskripsi tugas"
                        />
                    </div>

                    <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-white px-5 py-4">
                        <div>
                            <p className="text-[14px] font-extrabold text-[#061b46]">
                                Kepala Sekolah
                            </p>
                            <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                Tampil sebagai posisi utama.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            checked={Boolean(leader.is_principal)}
                            onChange={(event) =>
                                onToggle(
                                    index,
                                    "is_principal",
                                    event.target.checked
                                )
                            }
                            className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                        />
                    </label>

                    <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-white px-5 py-4">
                        <div>
                            <p className="text-[14px] font-extrabold text-[#061b46]">
                                Status Aktif
                            </p>
                            <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                Tampilkan di frontend.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            checked={Boolean(leader.is_active)}
                            onChange={(event) =>
                                onToggle(
                                    index,
                                    "is_active",
                                    event.target.checked
                                )
                            }
                            className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

function UnitCard({ unit, index, onChange, onToggle, onRemove, errors }) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200 pb-5">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#d59a25]">
                        Unit {index + 1}
                    </p>

                    <h3 className="mt-1 text-[19px] font-black text-[#061b46]">
                        {unit.title || "Unit Organisasi"}
                    </h3>
                </div>

                <RemoveButton onClick={() => onRemove(index)} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <TextInput
                    label="Nama Unit"
                    value={unit.title}
                    onChange={(event) =>
                        onChange(index, "title", event.target.value)
                    }
                    error={errors?.[`units.${index}.title`]}
                    placeholder="Contoh: Guru & Tenaga Pendidik"
                />

                <TextInput
                    label="Icon"
                    value={unit.icon}
                    onChange={(event) =>
                        onChange(index, "icon", event.target.value)
                    }
                    error={errors?.[`units.${index}.icon`]}
                    placeholder="📖"
                />

                <TextInput
                    label="Urutan"
                    type="number"
                    value={unit.sort_order}
                    onChange={(event) =>
                        onChange(index, "sort_order", event.target.value)
                    }
                    error={errors?.[`units.${index}.sort_order`]}
                    placeholder="1"
                />

                <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-white px-5 py-4">
                    <div>
                        <p className="text-[14px] font-extrabold text-[#061b46]">
                            Status Aktif
                        </p>
                        <p className="mt-1 text-[12px] font-semibold text-slate-500">
                            Tampilkan di frontend.
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={Boolean(unit.is_active)}
                        onChange={(event) =>
                            onToggle(index, "is_active", event.target.checked)
                        }
                        className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                    />
                </label>

                <div className="md:col-span-2">
                    <TextArea
                        label="Deskripsi"
                        value={unit.description}
                        onChange={(event) =>
                            onChange(index, "description", event.target.value)
                        }
                        error={errors?.[`units.${index}.description`]}
                        placeholder="Tulis deskripsi unit"
                    />
                </div>
            </div>
        </div>
    );
}

function PreviewCard({ leaders, units }) {
    const activeLeaders = leaders.filter((leader) => leader.is_active);
    const principal =
        activeLeaders.find((leader) => leader.is_principal) ||
        activeLeaders[0] ||
        null;

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                Preview Struktur
            </p>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                {principal ? (
                    <div className="rounded-[18px] bg-white p-4 shadow-sm">
                        <div className="overflow-hidden rounded-[14px] bg-[#052b66] px-4 py-3 text-center">
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-white">
                                {principal.role}
                            </p>
                        </div>

                        <div className="mt-4 flex gap-4">
                            <img
                                src={
                                    principal.image
                                        ? URL.createObjectURL(principal.image)
                                        : principal.image_url ||
                                          principal.fallback_image ||
                                          "/frontend/images/principal.jpg"
                                }
                                alt={principal.name}
                                className="h-20 w-20 rounded-[14px] object-cover"
                            />

                            <div>
                                <h3 className="text-[17px] font-black text-[#061b46]">
                                    {principal.name}
                                </h3>

                                <p className="mt-2 line-clamp-3 text-[12px] font-semibold leading-5 text-slate-500">
                                    {principal.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-[18px] bg-white p-5 text-center text-[13px] font-bold text-slate-500">
                        Belum ada kepala sekolah aktif.
                    </div>
                )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-[18px] border border-blue-100 bg-blue-50 p-4">
                    <p className="text-[26px] font-black text-[#061b46]">
                        {activeLeaders.length}
                    </p>
                    <p className="mt-1 text-[12px] font-bold text-slate-600">
                        Pengurus Aktif
                    </p>
                </div>

                <div className="rounded-[18px] border border-blue-100 bg-blue-50 p-4">
                    <p className="text-[26px] font-black text-[#061b46]">
                        {units.filter((unit) => unit.is_active).length}
                    </p>
                    <p className="mt-1 text-[12px] font-bold text-slate-600">
                        Unit Aktif
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Structure({ leaders = [], units = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        leaders: Array.isArray(leaders) ? leaders : [],
        units: Array.isArray(units) ? units : [],
    });

    const updateLeader = (index, field, value) => {
        const nextLeaders = [...data.leaders];

        nextLeaders[index] = {
            ...nextLeaders[index],
            [field]: value,
        };

        setData("leaders", nextLeaders);
    };

    const updateLeaderImage = (index, event) => {
        const file = event.target.files?.[0] || null;

        updateLeader(index, "image", file);
    };

    const removeLeader = (index) => {
        setData(
            "leaders",
            data.leaders.filter((_, currentIndex) => currentIndex !== index)
        );
    };

    const addLeader = () => {
        setData("leaders", [
            ...data.leaders,
            {
                id: null,
                role: "",
                name: "",
                description: "",
                image: null,
                image_url: null,
                fallback_image: "",
                sort_order: data.leaders.length + 1,
                is_principal: false,
                is_active: true,
            },
        ]);
    };

    const updateUnit = (index, field, value) => {
        const nextUnits = [...data.units];

        nextUnits[index] = {
            ...nextUnits[index],
            [field]: value,
        };

        setData("units", nextUnits);
    };

    const removeUnit = (index) => {
        setData(
            "units",
            data.units.filter((_, currentIndex) => currentIndex !== index)
        );
    };

    const addUnit = () => {
        setData("units", [
            ...data.units,
            {
                id: null,
                title: "",
                description: "",
                icon: "📌",
                sort_order: data.units.length + 1,
                is_active: true,
            },
        ]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/profiles/structure", {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Struktur Organisasi">
            <Head title="Struktur Organisasi" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Profil Sekolah
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Kelola Struktur Organisasi
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Atur kepala sekolah, wakil kepala sekolah, tata usaha,
                        dan unit organisasi yang tampil pada halaman profil.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/admin/profiles"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Edit Profil
                    </Link>

                    <Link
                        href="/profil"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#d59a25] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-[#f7c46a]"
                    >
                        Lihat Frontend
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_420px] xl:items-start">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <SectionCard
                        eyebrow="Pengurus"
                        title="Data Pengurus Struktur"
                        description="Data ini tampil pada bagian Struktur Organisasi di halaman profil."
                    >
                        <div className="mb-6 flex justify-end">
                            <button
                                type="button"
                                onClick={addLeader}
                                className="inline-flex min-h-[46px] items-center justify-center rounded-[14px] bg-blue-50 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-700 transition hover:bg-blue-100"
                            >
                                Tambah Pengurus
                            </button>
                        </div>

                        <div className="space-y-5">
                            {data.leaders.length > 0 ? (
                                data.leaders.map((leader, index) => (
                                    <LeaderCard
                                        key={index}
                                        leader={leader}
                                        index={index}
                                        onChange={updateLeader}
                                        onToggle={updateLeader}
                                        onImageChange={updateLeaderImage}
                                        onRemove={removeLeader}
                                        errors={errors}
                                    />
                                ))
                            ) : (
                                <div className="rounded-[20px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-[13px] font-bold text-slate-500">
                                    Belum ada data pengurus.
                                </div>
                            )}
                        </div>
                    </SectionCard>

                    <SectionCard
                        eyebrow="Unit Organisasi"
                        title="Data Unit Pendukung"
                        description="Unit ini tampil di bawah struktur pengurus sekolah."
                    >
                        <div className="mb-6 flex justify-end">
                            <button
                                type="button"
                                onClick={addUnit}
                                className="inline-flex min-h-[46px] items-center justify-center rounded-[14px] bg-blue-50 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-700 transition hover:bg-blue-100"
                            >
                                Tambah Unit
                            </button>
                        </div>

                        <div className="space-y-5">
                            {data.units.length > 0 ? (
                                data.units.map((unit, index) => (
                                    <UnitCard
                                        key={index}
                                        unit={unit}
                                        index={index}
                                        onChange={updateUnit}
                                        onToggle={updateUnit}
                                        onRemove={removeUnit}
                                        errors={errors}
                                    />
                                ))
                            ) : (
                                <div className="rounded-[20px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-[13px] font-bold text-slate-500">
                                    Belum ada data unit.
                                </div>
                            )}
                        </div>
                    </SectionCard>

                    <div className="sticky bottom-5 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-xl">
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <Link
                                href="/admin/profiles"
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
                                    : "Simpan Struktur"}
                            </button>
                        </div>
                    </div>
                </form>

                <aside className="xl:sticky xl:top-[98px]">
                    <PreviewCard leaders={data.leaders} units={data.units} />
                </aside>
            </div>
        </AdminLayout>
    );
}