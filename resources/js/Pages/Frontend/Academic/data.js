export const tabs = [
    {
        key: "calendar",
        label: "Kalender Akademik",
        icon: "calendar",
        description: "Agenda sekolah, jadwal ujian, dan kegiatan penting.",
    },
    {
        key: "teachers",
        label: "Dewan Guru",
        icon: "users",
        description: "Data guru dan tenaga pendidik SMA Negeri 1 Cerdas.",
    },
    {
        key: "extracurricular",
        label: "Ekstrakurikuler",
        icon: "activity",
        description: "Kegiatan pengembangan minat dan bakat siswa.",
    },
    {
        key: "osis",
        label: "Pengurus OSIS",
        icon: "organization",
        description: "Struktur pengurus OSIS dan organisasi siswa.",
    },
    {
        key: "achievements",
        label: "Prestasi Siswa",
        icon: "trophy",
        description: "Prestasi akademik dan non-akademik siswa.",
    },
];

export const heroContent = {
    calendar: {
        eyebrow: "ACADEMICS",
        title: "Academic Calendar",
        year: "2026/2027",
        description:
            "Plan your academic journey with important school events, assessments, holidays, and learning milestones.",
    },
    teachers: {
        eyebrow: "AKADEMIK",
        title: "Dewan Guru & Tenaga Pendidik",
        description:
            "Tenaga pendidik profesional yang berkomitmen menciptakan lingkungan belajar inovatif, inspiratif, dan berstandar global.",
    },
    extracurricular: {
        eyebrow: "KEGIATAN SISWA",
        title: "Ekstrakurikuler Unggulan",
        description:
            "Program pengembangan minat, bakat, karakter, kepemimpinan, kreativitas, dan potensi peserta didik.",
    },
    osis: {
        eyebrow: "ORGANISASI SISWA",
        title: "Pengurus OSIS Sekolah",
        description:
            "Wadah kepemimpinan siswa untuk belajar organisasi, tanggung jawab, kerja sama, dan pengabdian kepada sekolah.",
    },
    achievements: {
        eyebrow: "PRESTASI",
        title: "Prestasi Siswa Berprestasi",
        description:
            "Dokumentasi capaian akademik dan non-akademik siswa sebagai bukti komitmen sekolah terhadap kualitas pendidikan.",
    },
};

export const calendarItems = [
    {
        date: "15",
        month: "JUL",
        fullDate: "15 Juli 2026",
        type: "Kegiatan",
        title: "Masa Pengenalan Lingkungan Sekolah (MPLS)",
        description:
            "Pengenalan lingkungan sekolah bagi peserta didik baru.",
    },
    {
        date: "18",
        month: "JUL",
        fullDate: "18 Juli 2026",
        type: "Akademik",
        title: "Hari Pertama Pembelajaran",
        description: "Kegiatan belajar mengajar semester 1 dimulai.",
    },
    {
        date: "30",
        month: "JUL",
        fullDate: "30 Juli 2026",
        type: "Kegiatan",
        title: "Parent Meeting",
        description: "Pertemuan orang tua/wali dengan pihak sekolah.",
    },
    {
        date: "07",
        month: "AGU",
        fullDate: "07 Agustus 2026",
        type: "Akademik",
        title: "Penilaian Diagnostik",
        description:
            "Tes diagnostik untuk pemetaan kemampuan siswa.",
    },
    {
        date: "17",
        month: "AGU",
        fullDate: "17 Agustus 2026",
        type: "Kegiatan",
        title: "Upacara HUT RI",
        description:
            "Upacara peringatan Hari Kemerdekaan Republik Indonesia.",
    },
];

export const upcomingEvents = [
    {
        date: "15",
        month: "JUL",
        title: "MPLS",
        subtitle: "15 – 17 Juli 2026",
        color: "blue",
    },
    {
        date: "05",
        month: "SEP",
        title: "Penilaian Tengah Semester (PTS)",
        subtitle: "5 – 9 September 2026",
        color: "red",
    },
    {
        date: "22",
        month: "NOV",
        title: "Ujian Praktik & Projek",
        subtitle: "22 – 27 November 2026",
        color: "blue",
    },
    {
        date: "20",
        month: "DEC",
        title: "Pembagian Rapor Semester Ganjil",
        subtitle: "20 Desember 2026",
        color: "yellow",
    },
];

export const miniCalendarDays = [
    { value: "29", muted: true },
    { value: "30", muted: true },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5", sunday: true },
    { value: "6" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "10" },
    { value: "11" },
    { value: "12", sunday: true },
    { value: "13" },
    { value: "14" },
    { value: "15", active: "academic" },
    { value: "16" },
    { value: "17" },
    { value: "18", active: "event" },
    { value: "19", sunday: true },
    { value: "20" },
    { value: "21" },
    { value: "22" },
    { value: "23" },
    { value: "24" },
    { value: "25" },
    { value: "26", sunday: true },
    { value: "27" },
    { value: "28" },
    { value: "29" },
    { value: "30", active: "holiday" },
    { value: "31" },
    { value: "1", muted: true },
    { value: "2", muted: true },
];

export const semesterOneRoadmap = [
    {
        month: "JUL",
        title: "MPLS & Awal Semester",
        icon: "users",
    },
    {
        month: "SEP",
        title: "Penilaian Tengah Semester (PTS)",
        icon: "calendar",
    },
    {
        month: "NOV",
        title: "Ujian Praktik & Projek",
        icon: "trophy",
    },
    {
        month: "DEC",
        title: "Pembagian Rapor Semester Ganjil",
        icon: "award",
    },
];

export const semesterTwoRoadmap = [
    {
        month: "JAN",
        title: "Awal Semester Genap",
        icon: "users",
    },
    {
        month: "MAR",
        title: "Penilaian Akhir Semester (PAS)",
        icon: "calendar",
    },
    {
        month: "MEI",
        title: "Ujian Sekolah",
        icon: "organization",
    },
    {
        month: "JUN",
        title: "Pembagian Rapor Semester Genap",
        icon: "award",
    },
];

export const resourceFiles = [
    {
        title: "Academic Calendar 2026/2027",
        type: "PDF",
    },
    {
        title: "Examination Schedule",
        type: "PDF",
    },
    {
        title: "School Holiday Calendar",
        type: "PDF",
    },
    {
        title: "Parent Handbook",
        type: "PDF",
    },
    {
        title: "Academic Guideline",
        type: "PDF",
    },
];

export const faqItems = [
    {
        question: "Bagaimana cara mengunduh kalender akademik?",
        answer:
            "Anda dapat mengklik tombol Download Calendar pada bagian hero atau di bagian Academic Resources.",
    },
    {
        question: "Apakah jadwal dapat berubah?",
        answer:
            "Ya, jadwal dapat diperbarui sesuai kebutuhan sekolah. Silakan cek halaman ini secara berkala.",
    },
    {
        question: "Di mana saya dapat melihat jadwal ujian?",
        answer:
            "Jadwal ujian tersedia pada daftar agenda kalender akademik dan dokumen Examination Schedule.",
    },
    {
        question: "Bagaimana cara menghubungi bagian akademik?",
        answer:
            "Silakan hubungi Academic Office melalui nomor telepon, email, atau tombol Hubungi Kami.",
    },
];

export const teachers = [
    {
        name: "Indah Permatasari, S.Pd.",
        subject: "Guru Matematika",
        education: "S1 Pendidikan Matematika",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Heri Setiawan, S.Pd.",
        subject: "Guru Fisika",
        education: "S1 Pendidikan Fisika",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Dewi Lestari, M.Pd.",
        subject: "Guru Bahasa Indonesia",
        education: "S2 Pendidikan Bahasa",
        image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Rizky Pratama, S.Pd.",
        subject: "Guru Bahasa Inggris",
        education: "S1 Pendidikan Bahasa Inggris",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=700&q=85",
    },
];

export const extracurriculars = [
    {
        title: "Pramuka",
        category: "Wajib",
        description:
            "Membentuk karakter disiplin, kepemimpinan, kerja sama, dan kemandirian siswa.",
        image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=900&q=85",
    },
    {
        title: "Paskibra",
        category: "Kedisiplinan",
        description:
            "Melatih kedisiplinan, tanggung jawab, kekompakan, dan jiwa nasionalisme.",
        image: "https://images.unsplash.com/photo-1596496181871-9681eacf9764?auto=format&fit=crop&w=900&q=85",
    },
    {
        title: "Futsal",
        category: "Olahraga",
        description:
            "Mengembangkan bakat olahraga, sportivitas, dan kerja sama tim.",
        image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=900&q=85",
    },
    {
        title: "Karya Ilmiah Remaja",
        category: "Akademik",
        description:
            "Mendorong siswa melakukan riset, eksperimen, dan penulisan ilmiah.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=85",
    },
];

export const osisMembers = [
    {
        name: "Andi Maulana",
        role: "Ketua OSIS",
        className: "XI IPA 1",
        image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Nadia Putri",
        role: "Wakil Ketua OSIS",
        className: "XI IPS 1",
        image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Rizky Firmansyah",
        role: "Sekretaris",
        className: "X IPA 2",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Salsa Amelia",
        role: "Bendahara",
        className: "X IPS 2",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=85",
    },
];

export const achievements = [
    {
        title: "Juara 1 Olimpiade Sains Kabupaten",
        category: "Akademik",
        year: "2026",
        student: "Tim Olimpiade Sains",
    },
    {
        title: "Juara 2 Lomba Pidato Bahasa Indonesia",
        category: "Literasi",
        year: "2026",
        student: "Nadia Putri",
    },
    {
        title: "Juara 1 Turnamen Futsal Antar Sekolah",
        category: "Olahraga",
        year: "2025",
        student: "Tim Futsal Sekolah",
    },
    {
        title: "Finalis Karya Ilmiah Remaja Tingkat Provinsi",
        category: "Riset",
        year: "2025",
        student: "Kelompok KIR",
    },
];