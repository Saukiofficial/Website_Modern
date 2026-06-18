import { Head, Link, useForm } from "@inertiajs/react";
import PpdbAdminLayout from "../../Layouts/PpdbAdminLayout";

function Input({ label, value, onChange, error, placeholder, type = "text" }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <input
                type={type}
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[52px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function Textarea({ label, value, onChange, error, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <textarea
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={3}
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

function Toggle({ label, checked, onChange }) {
    return (
        <label className="flex min-h-[52px] cursor-pointer items-center justify-between gap-4 rounded-[16px] border border-slate-200 bg-white px-4 py-3">
            <span className="text-[13px] font-extrabold text-[#061b46]">
                {label}
            </span>

            <input
                type="checkbox"
                checked={Boolean(checked)}
                onChange={(event) => onChange(event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
            />
        </label>
    );
}

function SectionTitle({ eyebrow, title, description }) {
    return (
        <div className="mb-6 border-b border-slate-200 pb-6">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                {eyebrow}
            </p>

            <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                {title}
            </h2>

            {description ? (
                <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-500">
                    {description}
                </p>
            ) : null}
        </div>
    );
}

function EmptyState({ title, description, onClick }) {
    return (
        <div className="rounded-[20px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <div className="text-[42px]">📌</div>

            <h3 className="mt-3 text-[20px] font-black text-[#061b46]">
                {title}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-[13px] font-semibold leading-6 text-slate-500">
                {description}
            </p>

            <button
                type="button"
                onClick={onClick}
                className="mt-5 inline-flex min-h-[46px] items-center justify-center rounded-[14px] bg-[#061b46] px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white"
            >
                Tambah Data
            </button>
        </div>
    );
}

function TimelineCard({ item, index, errors, onChange, onRemove }) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#d59a25]">
                        Timeline #{index + 1}
                    </p>
                    <h3 className="mt-1 text-[18px] font-black text-[#061b46]">
                        {item.title || "Timeline PPDB"}
                    </h3>
                </div>

                <button
                    type="button"
                    onClick={onRemove}
                    className="rounded-xl bg-red-50 px-4 py-2 text-[12px] font-extrabold text-red-700 hover:bg-red-100"
                >
                    Hapus
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Input
                    label="Judul"
                    value={item.title}
                    onChange={(event) => onChange("title", event.target.value)}
                    error={errors?.title}
                    placeholder="Pendaftaran"
                />

                <Input
                    label="Tanggal"
                    value={item.date_text}
                    onChange={(event) =>
                        onChange("date_text", event.target.value)
                    }
                    error={errors?.date_text}
                    placeholder="01 Juni - 30 Juni 2026"
                />

                <Input
                    label="Icon"
                    value={item.icon}
                    onChange={(event) => onChange("icon", event.target.value)}
                    error={errors?.icon}
                    placeholder="🗓️"
                />

                <Input
                    label="Urutan"
                    type="number"
                    value={item.sort_order}
                    onChange={(event) =>
                        onChange("sort_order", event.target.value)
                    }
                    error={errors?.sort_order}
                    placeholder="1"
                />

                <div className="md:col-span-4">
                    <Toggle
                        label="Aktif"
                        checked={item.is_active}
                        onChange={(checked) => onChange("is_active", checked)}
                    />
                </div>
            </div>
        </div>
    );
}

function StepCard({ item, index, errors, onChange, onRemove }) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#d59a25]">
                        Tahapan #{index + 1}
                    </p>
                    <h3 className="mt-1 text-[18px] font-black text-[#061b46]">
                        {item.title || "Tahapan PPDB"}
                    </h3>
                </div>

                <button
                    type="button"
                    onClick={onRemove}
                    className="rounded-xl bg-red-50 px-4 py-2 text-[12px] font-extrabold text-red-700 hover:bg-red-100"
                >
                    Hapus
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Input
                    label="Nomor"
                    value={item.number}
                    onChange={(event) =>
                        onChange("number", event.target.value)
                    }
                    error={errors?.number}
                    placeholder="01"
                />

                <Input
                    label="Label Tahap"
                    value={item.step_label}
                    onChange={(event) =>
                        onChange("step_label", event.target.value)
                    }
                    error={errors?.step_label}
                    placeholder="Tahap 1"
                />

                <Input
                    label="Judul"
                    value={item.title}
                    onChange={(event) => onChange("title", event.target.value)}
                    error={errors?.title}
                    placeholder="Isi Formulir"
                />

                <Input
                    label="Icon"
                    value={item.icon}
                    onChange={(event) => onChange("icon", event.target.value)}
                    error={errors?.icon}
                    placeholder="📝"
                />

                <div className="md:col-span-4">
                    <Textarea
                        label="Deskripsi"
                        value={item.description}
                        onChange={(event) =>
                            onChange("description", event.target.value)
                        }
                        error={errors?.description}
                        placeholder="Deskripsi tahapan PPDB"
                    />
                </div>

                <Input
                    label="Accent Class"
                    value={item.accent_class}
                    onChange={(event) =>
                        onChange("accent_class", event.target.value)
                    }
                    error={errors?.accent_class}
                    placeholder="border-b-[#d5a542]"
                />

                <Input
                    label="Icon BG Class"
                    value={item.icon_bg_class}
                    onChange={(event) =>
                        onChange("icon_bg_class", event.target.value)
                    }
                    error={errors?.icon_bg_class}
                    placeholder="bg-[#faf5e8]"
                />

                <Input
                    label="Urutan"
                    type="number"
                    value={item.sort_order}
                    onChange={(event) =>
                        onChange("sort_order", event.target.value)
                    }
                    error={errors?.sort_order}
                    placeholder="1"
                />

                <Toggle
                    label="Aktif"
                    checked={item.is_active}
                    onChange={(checked) => onChange("is_active", checked)}
                />
            </div>
        </div>
    );
}

function RequirementCard({ item, index, errors, onChange, onRemove }) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#d59a25]">
                        Persyaratan #{index + 1}
                    </p>
                    <h3 className="mt-1 text-[18px] font-black text-[#061b46]">
                        {item.title || "Persyaratan PPDB"}
                    </h3>
                </div>

                <button
                    type="button"
                    onClick={onRemove}
                    className="rounded-xl bg-red-50 px-4 py-2 text-[12px] font-extrabold text-red-700 hover:bg-red-100"
                >
                    Hapus
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Input
                    label="Judul"
                    value={item.title}
                    onChange={(event) => onChange("title", event.target.value)}
                    error={errors?.title}
                    placeholder="Fotokopi Kartu Keluarga"
                />

                <Input
                    label="Urutan"
                    type="number"
                    value={item.sort_order}
                    onChange={(event) =>
                        onChange("sort_order", event.target.value)
                    }
                    error={errors?.sort_order}
                    placeholder="1"
                />

                <Toggle
                    label="Wajib"
                    checked={item.is_required}
                    onChange={(checked) =>
                        onChange("is_required", checked)
                    }
                />

                <div className="md:col-span-3">
                    <Textarea
                        label="Deskripsi"
                        value={item.description}
                        onChange={(event) =>
                            onChange("description", event.target.value)
                        }
                        error={errors?.description}
                        placeholder="Keterangan dokumen persyaratan"
                    />
                </div>

                <div className="md:col-span-3">
                    <Toggle
                        label="Aktif"
                        checked={item.is_active}
                        onChange={(checked) =>
                            onChange("is_active", checked)
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default function Edit({
    timelines = [],
    steps = [],
    requirements = [],
}) {
    const { data, setData, post, processing, errors } = useForm({
        timelines: timelines.length
            ? timelines
            : [
                  {
                      id: null,
                      title: "Pendaftaran",
                      date_text: "01 Juni - 30 Juni 2026",
                      icon: "🗓️",
                      sort_order: 1,
                      is_active: true,
                  },
              ],
        steps: steps.length
            ? steps
            : [
                  {
                      id: null,
                      number: "01",
                      step_label: "Tahap 1",
                      title: "Isi Formulir",
                      description:
                          "Calon siswa mengisi data pendaftaran secara lengkap.",
                      icon: "📝",
                      accent_class: "border-b-[#d5a542]",
                      icon_bg_class: "bg-[#faf5e8]",
                      sort_order: 1,
                      is_active: true,
                  },
              ],
        requirements: requirements.length
            ? requirements
            : [
                  {
                      id: null,
                      title: "Fotokopi Kartu Keluarga",
                      description:
                          "Dokumen Kartu Keluarga dalam format PDF/JPG/PNG.",
                      is_required: true,
                      is_active: true,
                      sort_order: 1,
                  },
              ],
    });

    const updateArrayItem = (group, index, field, value) => {
        const nextItems = [...data[group]];
        nextItems[index] = {
            ...nextItems[index],
            [field]: value,
        };

        setData(group, nextItems);
    };

    const removeArrayItem = (group, index) => {
        setData(
            group,
            data[group].filter((_, itemIndex) => itemIndex !== index)
        );
    };

    const addTimeline = () => {
        setData("timelines", [
            ...data.timelines,
            {
                id: null,
                title: "",
                date_text: "",
                icon: "🗓️",
                sort_order: data.timelines.length + 1,
                is_active: true,
            },
        ]);
    };

    const addStep = () => {
        const nextNumber = String(data.steps.length + 1).padStart(2, "0");

        setData("steps", [
            ...data.steps,
            {
                id: null,
                number: nextNumber,
                step_label: `Tahap ${data.steps.length + 1}`,
                title: "",
                description: "",
                icon: "📝",
                accent_class: "border-b-[#d5a542]",
                icon_bg_class: "bg-[#faf5e8]",
                sort_order: data.steps.length + 1,
                is_active: true,
            },
        ]);
    };

    const addRequirement = () => {
        setData("requirements", [
            ...data.requirements,
            {
                id: null,
                title: "",
                description: "",
                is_required: true,
                is_active: true,
                sort_order: data.requirements.length + 1,
            },
        ]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/ppdb/content", {
            preserveScroll: true,
        });
    };

    return (
        <PpdbAdminLayout title="Konten PPDB">
            <Head title="Konten PPDB" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        PPDB
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Timeline, Alur & Persyaratan
                    </h1>

                    <p className="mt-4 max-w-3xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola jadwal, tahapan, dan persyaratan PPDB yang tampil
                        di halaman frontend.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/admin/ppdb/settings"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Setting PPDB
                    </Link>

                    <Link
                        href="/ppdb"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                    >
                        Lihat Frontend
                    </Link>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                    <SectionTitle
                        eyebrow="Jadwal"
                        title="Timeline PPDB"
                        description="Atur jadwal pendaftaran, verifikasi, hingga pengumuman."
                    />

                    <div className="space-y-5">
                        {data.timelines.length > 0 ? (
                            data.timelines.map((item, index) => (
                                <TimelineCard
                                    key={index}
                                    item={item}
                                    index={index}
                                    errors={errors[`timelines.${index}`]}
                                    onChange={(field, value) =>
                                        updateArrayItem(
                                            "timelines",
                                            index,
                                            field,
                                            value
                                        )
                                    }
                                    onRemove={() =>
                                        removeArrayItem("timelines", index)
                                    }
                                />
                            ))
                        ) : (
                            <EmptyState
                                title="Belum Ada Timeline"
                                description="Tambahkan timeline PPDB pertama."
                                onClick={addTimeline}
                            />
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={addTimeline}
                        className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[16px] bg-blue-50 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-700 hover:bg-blue-100"
                    >
                        + Tambah Timeline
                    </button>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                    <SectionTitle
                        eyebrow="Alur"
                        title="Tahapan PPDB"
                        description="Atur tahapan alur pendaftaran calon peserta didik baru."
                    />

                    <div className="space-y-5">
                        {data.steps.length > 0 ? (
                            data.steps.map((item, index) => (
                                <StepCard
                                    key={index}
                                    item={item}
                                    index={index}
                                    errors={errors[`steps.${index}`]}
                                    onChange={(field, value) =>
                                        updateArrayItem(
                                            "steps",
                                            index,
                                            field,
                                            value
                                        )
                                    }
                                    onRemove={() =>
                                        removeArrayItem("steps", index)
                                    }
                                />
                            ))
                        ) : (
                            <EmptyState
                                title="Belum Ada Tahapan"
                                description="Tambahkan tahapan PPDB pertama."
                                onClick={addStep}
                            />
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={addStep}
                        className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[16px] bg-blue-50 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-700 hover:bg-blue-100"
                    >
                        + Tambah Tahapan
                    </button>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                    <SectionTitle
                        eyebrow="Dokumen"
                        title="Persyaratan PPDB"
                        description="Atur daftar dokumen atau persyaratan pendaftaran."
                    />

                    <div className="space-y-5">
                        {data.requirements.length > 0 ? (
                            data.requirements.map((item, index) => (
                                <RequirementCard
                                    key={index}
                                    item={item}
                                    index={index}
                                    errors={errors[`requirements.${index}`]}
                                    onChange={(field, value) =>
                                        updateArrayItem(
                                            "requirements",
                                            index,
                                            field,
                                            value
                                        )
                                    }
                                    onRemove={() =>
                                        removeArrayItem(
                                            "requirements",
                                            index
                                        )
                                    }
                                />
                            ))
                        ) : (
                            <EmptyState
                                title="Belum Ada Persyaratan"
                                description="Tambahkan persyaratan PPDB pertama."
                                onClick={addRequirement}
                            />
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={addRequirement}
                        className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[16px] bg-blue-50 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-700 hover:bg-blue-100"
                    >
                        + Tambah Persyaratan
                    </button>
                </section>

                <div className="sticky bottom-5 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-xl">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <Link
                            href="/admin/ppdb/dashboard"
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
                                : "Simpan Konten PPDB"}
                        </button>
                    </div>
                </div>
            </form>
        </PpdbAdminLayout>
    );
}