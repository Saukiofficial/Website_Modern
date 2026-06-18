import BasePanelLayout from "./BasePanelLayout";

const ppdbMenus = [
    {
        label: "Dashboard PPDB",
        href: "/admin/ppdb/dashboard",
        icon: "📊",
    },
    {
        label: "Pendaftar PPDB",
        href: "/admin/ppdb/registrations",
        icon: "📂",
    },
    {
        label: "Setting PPDB",
        href: "/admin/ppdb/settings",
        icon: "⚙️",
    },
    {
        label: "Konten PPDB",
        href: "/admin/ppdb/content",
        icon: "🧩",
    },
];

export default function PpdbAdminLayout({ title = "Panel PPDB", children }) {
    return (
        <BasePanelLayout
            title={title}
            panelName="Admin PPDB"
            panelSubtitle="Kelola pendaftaran, verifikasi, konten, dan pengumuman PPDB."
            panelIcon="P"
            accent="#d59a25"
            menus={ppdbMenus}
        >
            {children}
        </BasePanelLayout>
    );
}