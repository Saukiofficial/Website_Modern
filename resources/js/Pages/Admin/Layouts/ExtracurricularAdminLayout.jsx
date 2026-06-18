import BasePanelLayout from "./BasePanelLayout";

const extracurricularMenus = [
    {
        label: "Dashboard Ekskul",
        href: "/admin/ekstrakurikuler/dashboard",
        icon: "📊",
    },
    {
        label: "Pendaftar Ekskul",
        href: "/admin/ekstrakurikuler/registrations",
        icon: "📝",
    },
    {
        label: "Anggota Ekskul",
        href: "/admin/ekstrakurikuler/members",
        icon: "👥",
    },
    {
        label: "Program Ekskul",
        href: "/admin/ekstrakurikuler/programs",
        icon: "🏆",
    },
];

export default function ExtracurricularAdminLayout({
    title = "Panel Ekstrakurikuler",
    children,
}) {
    return (
        <BasePanelLayout
            title={title}
            panelName="Admin Ekstrakurikuler"
            panelSubtitle="Kelola pendaftaran, anggota, program, dan kegiatan ekstrakurikuler."
            panelIcon="E"
            accent="#0f766e"
            menus={extracurricularMenus}
        >
            {children}
        </BasePanelLayout>
    );
}
