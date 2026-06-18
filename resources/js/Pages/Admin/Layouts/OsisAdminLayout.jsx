import BasePanelLayout from "./BasePanelLayout";

const osisMenus = [
    {
        label: "Dashboard OSIS",
        href: "/admin/osis/dashboard",
        icon: "📊",
    },
    {
        label: "Pendaftar OSIS",
        href: "/admin/osis/registrations",
        icon: "📝",
    },
    {
        label: "Pengurus OSIS",
        href: "/admin/osis/members",
        icon: "👥",
    },
];

export default function OsisAdminLayout({ title = "Panel OSIS", children }) {
    return (
        <BasePanelLayout
            title={title}
            panelName="Admin OSIS"
            panelSubtitle="Kelola pendaftaran OSIS, seleksi, dan pengurus OSIS."
            panelIcon="O"
            accent="#9333ea"
            menus={osisMenus}
        >
            {children}
        </BasePanelLayout>
    );
}