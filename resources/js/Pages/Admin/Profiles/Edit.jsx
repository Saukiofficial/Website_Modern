import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import ProfileAdminTabs from "./Partials/ProfileAdminTabs";
import ProfilePreviewCard from "./Partials/ProfilePreviewCard";
import ProfileSchoolSection from "./Partials/ProfileSchoolSection";
import HistoryAdminSection from "./Partials/HistoryAdminSection";
import VisionMissionAdminSection from "./Partials/VisionMissionAdminSection";
import IdentityAdminSection from "./Partials/IdentityAdminSection";
import StructureShortcutSection from "./Partials/StructureShortcutSection";

const tabs = [
    {
        key: "profile",
        label: "Sambutan / Profil Sekolah",
        icon: "📘",
        description: "Data utama, hero, sambutan kepala sekolah, nilai, dan statistik.",
    },
    {
        key: "history",
        label: "Sejarah",
        icon: "⏳",
        description: "Narasi sejarah, gambar sejarah, dan timeline perjalanan sekolah.",
    },
    {
        key: "vision",
        label: "Visi Misi",
        icon: "🎯",
        description: "Visi, misi, banner, core value, dan action steps.",
    },
    {
        key: "identity",
        label: "Identitas Sekolah",
        icon: "🪪",
        description: "NPSN, akreditasi, alamat, kontak, dan data resmi lainnya.",
    },
    {
        key: "structure",
        label: "Struktur Organisasi",
        icon: "🏛️",
        description: "Shortcut ke halaman khusus struktur organisasi.",
    },
];

function normalizeArray(value) {
    return Array.isArray(value) ? value : [];
}

function pageTitle(activeTab) {
    return tabs.find((tab) => tab.key === activeTab)?.label || "Profil Sekolah";
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

        missions: normalizeArray(profile?.missions),
        identity: normalizeArray(profile?.identity),
        values: normalizeArray(profile?.values),
        profile_stats: normalizeArray(profile?.profile_stats),
        hero_stats: normalizeArray(profile?.hero_stats),
        history_timeline: normalizeArray(profile?.history_timeline),
        vision_mission_items: normalizeArray(profile?.vision_mission_items),
        core_values: normalizeArray(profile?.core_values),
        vision_action_steps: normalizeArray(profile?.vision_action_steps),
    });

    const [activeTab, setActiveTab] = useState("profile");

    const updateField = (field, value) => {
        setData(field, value);
    };

    const updateFile = (field, event) => {
        setData(field, event.target.files?.[0] || null);
    };

    const addStringItem = (field) => {
        setData(field, [...normalizeArray(data[field]), ""]);
    };

    const updateStringItem = (field, index, value) => {
        setData(
            field,
            normalizeArray(data[field]).map((item, currentIndex) =>
                currentIndex === index ? value : item
            )
        );
    };

    const addCardItem = (field, item) => {
        setData(field, [...normalizeArray(data[field]), item]);
    };

    const updateArrayItem = (field, index, key, value) => {
        setData(
            field,
            normalizeArray(data[field]).map((item, currentIndex) =>
                currentIndex === index
                    ? {
                          ...item,
                          [key]: value,
                      }
                    : item
            )
        );
    };

    const removeArrayItem = (field, index) => {
        setData(
            field,
            normalizeArray(data[field]).filter((_, currentIndex) => currentIndex !== index)
        );
    };

    const submit = (event) => {
        event.preventDefault();
        post("/admin/profiles", {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Admin Profil Sekolah" />

            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#d59a25]">
                        Profil Sekolah
                    </p>
                    <h1 className="mt-2 text-[32px] font-black tracking-[-0.05em] text-[#061b46] sm:text-[42px]">
                        {pageTitle(activeTab)}
                    </h1>
                    <p className="mt-3 max-w-3xl text-[14px] font-semibold leading-7 text-slate-500">
                        Halaman ini tetap memakai satu model <span className="font-black text-[#061b46]">SchoolProfile</span>. Bagian struktur organisasi diarahkan ke halaman khusus karena memakai model <span className="font-black text-[#061b46]">OrganizationStructure</span> dan <span className="font-black text-[#061b46]">OrganizationUnit</span>.
                    </p>
                </div>

                <Link
                    href="/profil"
                    target="_blank"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-[16px] bg-blue-50 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-700 transition hover:bg-blue-100"
                >
                    Lihat Frontend
                </Link>
            </div>

            <div className="grid gap-7 xl:grid-cols-[300px_1fr_340px]">
                <ProfileAdminTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                <form onSubmit={submit} className="min-w-0 space-y-7">
                    {activeTab === "profile" ? (
                        <ProfileSchoolSection
                            data={data}
                            profile={profile}
                            errors={errors}
                            updateField={updateField}
                            updateFile={updateFile}
                            addCardItem={addCardItem}
                            updateArrayItem={updateArrayItem}
                            removeArrayItem={removeArrayItem}
                        />
                    ) : null}

                    {activeTab === "history" ? (
                        <HistoryAdminSection
                            data={data}
                            profile={profile}
                            errors={errors}
                            updateField={updateField}
                            updateFile={updateFile}
                            addCardItem={addCardItem}
                            updateArrayItem={updateArrayItem}
                            removeArrayItem={removeArrayItem}
                        />
                    ) : null}

                    {activeTab === "vision" ? (
                        <VisionMissionAdminSection
                            data={data}
                            profile={profile}
                            errors={errors}
                            updateField={updateField}
                            updateFile={updateFile}
                            addStringItem={addStringItem}
                            updateStringItem={updateStringItem}
                            addCardItem={addCardItem}
                            updateArrayItem={updateArrayItem}
                            removeArrayItem={removeArrayItem}
                        />
                    ) : null}

                    {activeTab === "identity" ? (
                        <IdentityAdminSection
                            data={data}
                            profile={profile}
                            errors={errors}
                            updateFile={updateFile}
                            addCardItem={addCardItem}
                            updateArrayItem={updateArrayItem}
                            removeArrayItem={removeArrayItem}
                        />
                    ) : null}

                    {activeTab === "structure" ? <StructureShortcutSection /> : null}

                    {activeTab !== "structure" ? (
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
                                    {processing ? "Menyimpan..." : "Simpan Profil"}
                                </button>
                            </div>
                        </div>
                    ) : null}
                </form>

                <aside className="xl:sticky xl:top-[98px] xl:self-start">
                    <ProfilePreviewCard data={data} profile={profile} activeTab={activeTab} />
                </aside>
            </div>
        </AdminLayout>
    );
}

