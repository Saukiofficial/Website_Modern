import { useMemo, useState } from "react";
import FrontendLayout from "../../../Layouts/FrontendLayout";

import { tabs as fallbackTabs } from "./data";

import PageHero from "./components/PageHero";
import SidebarMenu from "./components/SidebarMenu";

import ProfileSection from "./sections/ProfileSection";
import HistorySection from "./sections/HistorySection";
import VisionSection from "./sections/VisionSection";
import StructureSection from "./sections/StructureSection";
import IdentitySection from "./sections/IdentitySection";

const defaultProfileData = {
    school: {
        name: "SMA Negeri 1 Mojokerto",
        shortName: "SMA Negeri 1",
        city: "Mojokerto",
        tagline: "Berprestasi, Berkarakter, Berbudaya",
        description:
            "SMA Negeri 1 Cerdas merupakan sekolah menengah atas yang berkomitmen membentuk peserta didik yang unggul dalam akademik, berkarakter, kreatif, berbudaya, serta siap bersaing di era global.",
        heroImage: "/frontend/images/profile-hero.jpg",
        visionHeroImage: "/frontend/images/vision-hero.jpg",
        structureHeroImage: "/frontend/images/structure-hero.jpg",
        historyImage: "/frontend/images/history-school.jpg",
        identityImage: "/frontend/images/identity-school.jpg",
        visionBannerImage: "/frontend/images/vision-banner.jpg",
        principal: {
            name: "Drs. Ahmad Fauzi, M.Pd.",
            position: "Kepala Sekolah",
            image: "/frontend/images/principal.jpg",
            fallback:
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=85",
            message:
                "Kami percaya bahwa pendidikan bukan hanya tentang pengetahuan, tetapi juga tentang pembentukan karakter, kedisiplinan, tanggung jawab, dan kepedulian sosial.",
        },
        history:
            "SMA Negeri 1 Cerdas berdiri sebagai lembaga pendidikan yang hadir untuk menjawab kebutuhan masyarakat terhadap sekolah berkualitas.",
        vision:
            "Menjadi sekolah unggul yang melahirkan generasi cerdas, berkarakter, berbudaya, dan berdaya saing global.",
        missions: [],
        identity: [],
    },
    values: [
        {
            title: "Berprestasi",
            icon: "🏆",
            description:
                "Mendorong siswa untuk unggul dalam akademik, lomba, dan berbagai kompetisi.",
        },
        {
            title: "Berkarakter",
            icon: "🤝",
            description:
                "Membentuk pribadi disiplin, jujur, bertanggung jawab, dan peduli sesama.",
        },
        {
            title: "Berbudaya",
            icon: "🌿",
            description:
                "Menanamkan nilai budaya, sopan santun, serta cinta terhadap lingkungan sekolah.",
        },
    ],
    profileStats: [
        {
            value: "900+",
            label: "Peserta Didik Aktif",
            icon: "👥",
        },
        {
            value: "60+",
            label: "Tenaga Pendidik",
            icon: "🧑‍🏫",
        },
        {
            value: "20+",
            label: "Ruang Kelas Modern",
            icon: "🏫",
        },
        {
            value: "100+",
            label: "Prestasi Diraih",
            icon: "🏆",
        },
    ],
    heroStats: [
        {
            value: "25+",
            label: "Tahun Pengalaman Pendidikan",
            icon: "🎓",
        },
        {
            value: "A",
            label: "Akreditasi Sekolah",
            icon: "🏅",
        },
        {
            value: "Berprestasi\nBerkarakter\nBerbudaya",
            label: "",
            icon: "👥",
        },
    ],
    historyTimeline: [],
    visionMissionItems: [],
    coreValues: [],
    visionActionSteps: [],
    organization: [],
    organizationUnits: [],
};

function mergeProfileData(profileData) {
    if (!profileData) {
        return defaultProfileData;
    }

    return {
        ...defaultProfileData,
        ...profileData,
        school: {
            ...defaultProfileData.school,
            ...(profileData.school || {}),
            principal: {
                ...defaultProfileData.school.principal,
                ...(profileData.school?.principal || {}),
            },
        },
        values:
            Array.isArray(profileData.values) && profileData.values.length > 0
                ? profileData.values
                : defaultProfileData.values,
        profileStats:
            Array.isArray(profileData.profileStats) &&
            profileData.profileStats.length > 0
                ? profileData.profileStats
                : defaultProfileData.profileStats,
        heroStats:
            Array.isArray(profileData.heroStats) &&
            profileData.heroStats.length > 0
                ? profileData.heroStats
                : defaultProfileData.heroStats,
        organization: Array.isArray(profileData.organization)
            ? profileData.organization
            : [],
        organizationUnits: Array.isArray(profileData.organizationUnits)
            ? profileData.organizationUnits
            : [],
    };
}

export default function Profile({ profileData = null }) {
    const [activeTab, setActiveTab] = useState("profile");

    const data = useMemo(() => {
        return mergeProfileData(profileData);
    }, [profileData]);

    const tabs = fallbackTabs;

    const activeMenu = useMemo(() => {
        return tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
    }, [activeTab, tabs]);

    const renderContent = () => {
        if (activeTab === "history") {
            return <HistorySection profileData={data} />;
        }

        if (activeTab === "vision") {
            return <VisionSection profileData={data} />;
        }

        if (activeTab === "structure") {
            return <StructureSection profileData={data} />;
        }

        if (activeTab === "identity") {
            return <IdentitySection profileData={data} />;
        }

        return <ProfileSection profileData={data} />;
    };

    return (
        <FrontendLayout>
            <PageHero
                activeTab={activeTab}
                activeMenu={activeMenu}
                profileData={data}
            />

            <section className="relative w-full bg-[#f4f8fc] px-4 pb-12 pt-8 sm:px-6 lg:px-10 lg:pb-16 lg:pt-10 xl:px-14 2xl:px-16">
                <div className="relative grid w-full gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
                    <SidebarMenu
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        school={data.school}
                    />

                    <main className="min-w-0">
                        {activeTab !== "history" ? (
                            <div className="mb-6 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-7">
                                <div className="relative">
                                    <div className="absolute right-0 top-0 hidden text-[92px] leading-none text-blue-50 lg:block">
                                        🏫
                                    </div>

                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d58cf]">
                                        Sedang Dibuka
                                    </p>

                                    <h2 className="mt-2 font-serif text-[28px] font-semibold tracking-[-0.03em] text-[#061b46] sm:text-[34px]">
                                        {activeMenu.label}
                                    </h2>

                                    <p className="mt-2 max-w-3xl text-[14px] font-medium leading-7 text-slate-600">
                                        {activeMenu.description}
                                    </p>
                                </div>
                            </div>
                        ) : null}

                        {renderContent()}
                    </main>
                </div>
            </section>
        </FrontendLayout>
    );
}