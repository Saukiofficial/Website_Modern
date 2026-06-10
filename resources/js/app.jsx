import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

const appElement = document.getElementById("app");

if (!appElement) {
    throw new Error("Element #app tidak ditemukan. Cek resources/views/app.blade.php");
}

if (!appElement.dataset.page) {
    throw new Error("data-page Inertia tidak ditemukan. Cek @inertia di app.blade.php");
}

const initialPage = JSON.parse(appElement.dataset.page);

const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });

createInertiaApp({
    id: "app",

    page: initialPage,

    title: (title) => `${title} - Website Sekolah`,

    resolve: (name) => {
        const page = pages[`./Pages/${name}.jsx`];

        if (!page) {
            throw new Error(`Halaman ./Pages/${name}.jsx tidak ditemukan`);
        }

        return page.default;
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },

    progress: {
        color: "#2563eb",
    },
});