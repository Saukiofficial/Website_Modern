import { useMemo, useState } from "react";
import FrontendLayout from "../../../Layouts/FrontendLayout";

import { heroContent, tabs } from "./data";

import SidebarMenu from "./components/SidebarMenu";
import CalendarHero from "./components/CalendarHero";
import TeachersHero from "./components/TeachersHero";
import ExtracurricularHero from "./components/ExtracurricularHero";
import OsisHero from "./components/OsisHero";
import AchievementHero from "./components/AchievementHero";
import DefaultHero from "./components/DefaultHero";
import BottomCTA from "./components/BottomCTA";

import CalendarSection from "./sections/CalendarSection";
import TeachersSection from "./sections/TeachersSection";
import ExtracurricularSection from "./sections/ExtracurricularSection";
import OsisSection from "./sections/OsisSection";
import AchievementsSection from "./sections/AchievementsSection";

const defaultAcademicData = {
    page: {
        hero_title: "Akademik Sekolah",
        hero_subtitle:
            "Informasi akademik, kalender pendidikan, guru, ekstrakurikuler, OSIS, dan prestasi siswa.",
        hero_image: "/frontend/images/academic-hero.jpg",

        calendar_title: "Kalender Akademik",
        calendar_description:
            "Informasi jadwal kegiatan akademik sekolah selama tahun pelajaran berjalan.",

        teacher_title: "Dewan Guru",
        teacher_description:
            "Tenaga pendidik profesional yang mendukung proses belajar siswa.",

        extracurricular_title: "Ekstrakurikuler",
        extracurricular_description:
            "Kegiatan pengembangan minat, bakat, karakter, dan kreativitas siswa.",

        osis_title: "Pengurus OSIS",
        osis_description:
            "Organisasi siswa sebagai wadah kepemimpinan, kreativitas, dan tanggung jawab.",

        achievement_title: "Prestasi Siswa",
        achievement_description:
            "Daftar prestasi akademik dan non-akademik yang diraih oleh siswa.",
    },
    calendars: [],
    resources: [],
    teachers: [],
    extracurriculars: [],
    osisMembers: [],
    achievements: [],
};

function mergeAcademicData(academicData) {
    if (!academicData) {
        return defaultAcademicData;
    }

    return {
        ...defaultAcademicData,
        ...academicData,
        page: {
            ...defaultAcademicData.page,
            ...(academicData.page || {}),
        },
        calendars: Array.isArray(academicData.calendars)
            ? academicData.calendars
            : [],
        resources: Array.isArray(academicData.resources)
            ? academicData.resources
            : [],
        teachers: Array.isArray(academicData.teachers)
            ? academicData.teachers
            : [],
        extracurriculars: Array.isArray(academicData.extracurriculars)
            ? academicData.extracurriculars
            : [],
        osisMembers: Array.isArray(academicData.osisMembers)
            ? academicData.osisMembers
            : [],
        achievements: Array.isArray(academicData.achievements)
            ? academicData.achievements
            : [],
    };
}

export default function Academic({ academicData = null }) {
    const [activeTab, setActiveTab] = useState("calendar");

    const data = useMemo(() => {
        return mergeAcademicData(academicData);
    }, [academicData]);

    const activeMenu = useMemo(() => {
        return tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
    }, [activeTab]);

    const activeHero = heroContent[activeTab] ?? heroContent.calendar;

    const renderContent = () => {
        if (activeTab === "calendar") {
            return (
                <CalendarSection
                    academicData={data}
                    calendars={data.calendars}
                    resources={data.resources}
                    page={data.page}
                />
            );
        }

        if (activeTab === "teachers") {
            return (
                <TeachersSection
                    academicData={data}
                    teachers={data.teachers}
                    page={data.page}
                />
            );
        }

        if (activeTab === "extracurricular") {
            return (
                <ExtracurricularSection
                    academicData={data}
                    extracurriculars={data.extracurriculars}
                    page={data.page}
                />
            );
        }

        if (activeTab === "osis") {
            return (
                <OsisSection
                    academicData={data}
                    osisMembers={data.osisMembers}
                    page={data.page}
                />
            );
        }

        if (activeTab === "achievements") {
            return (
                <AchievementsSection
                    academicData={data}
                    achievements={data.achievements}
                    page={data.page}
                />
            );
        }

        return (
            <CalendarSection
                academicData={data}
                calendars={data.calendars}
                resources={data.resources}
                page={data.page}
            />
        );
    };

    const renderHero = () => {
        if (activeTab === "calendar") {
            return <CalendarHero academicData={data} page={data.page} />;
        }

        if (activeTab === "teachers") {
            return <TeachersHero academicData={data} page={data.page} />;
        }

        if (activeTab === "extracurricular") {
            return (
                <ExtracurricularHero academicData={data} page={data.page} />
            );
        }

        if (activeTab === "osis") {
            return <OsisHero academicData={data} page={data.page} />;
        }

        if (activeTab === "achievements") {
            return <AchievementHero academicData={data} page={data.page} />;
        }

        return <DefaultHero activeHero={activeHero} activeMenu={activeMenu} />;
    };

    const showBottomCTA =
        activeTab !== "teachers" &&
        activeTab !== "extracurricular" &&
        activeTab !== "osis" &&
        activeTab !== "achievements";

    return (
        <FrontendLayout>
            {renderHero()}

            <section className="relative w-full bg-[#f4f8fc] px-4 pb-10 pt-6 sm:px-6 lg:px-10 lg:pb-14 lg:pt-8 xl:px-14 2xl:px-16">
                <div className="absolute inset-x-0 top-0 h-12 rounded-t-[34px] bg-[#f4f8fc] lg:rounded-t-[42px]" />

                <div className="relative grid w-full gap-6 lg:grid-cols-[290px_1fr] lg:items-start">
                    <SidebarMenu
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <main className="min-w-0">
                        {renderContent()}

                        {showBottomCTA ? (
                            <BottomCTA activeTab={activeTab} />
                        ) : null}
                    </main>
                </div>
            </section>
        </FrontendLayout>
    );
}