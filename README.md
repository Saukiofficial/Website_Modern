# Website Sekolah Modern

Sistem manajemen website sekolah berbasis **Laravel + React (Inertia)** yang mencakup website publik dan dashboard admin untuk mengelola konten sekolah, PPDB, data siswa/alumni, pemilihan OSIS, dan lainnya.

---

## 📁 Struktur Project

```
Website_Modern/
├── app/                      # Backend PHP (Laravel)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/        # Controller dashboard admin (React/Inertia)
│   │   │   ├── Admin/Auth/   # Login admin kustom
│   │   │   ├── Auth/         # Auth scaffolding (Breeze)
│   │   │   └── Frontend/     # Controller halaman publik
│   │   ├── Middleware/
│   │   │   └── HandleInertiaRequests.php  # Middleware Inertia + shared data global
│   │   └── Requests/         # Form request validation
│   ├── Models/               # Model Eloquent (26 model)
│   └── Providers/
│       └── Filament/         # Panel Filament (tidak digunakan aktif)
├── bootstrap/
│   └── app.php               # Konfigurasi bootstrap Laravel
├── config/                   # Konfigurasi Laravel (app, auth, db, dll)
├── database/
│   ├── factories/            # Factory untuk testing
│   ├── migrations/           # Semua migrasi database
│   └── seeders/              # Seeder data awal
├── public/                   # Root web publik
│   ├── frontend/images/      # Gambar statis frontend
│   ├── tamplate csv siswa/   # Template CSV import (typoo folder)
│   └── index.php             # Entry point HTTP
├── resources/
│   ├── css/app.css           # Stylesheet global
│   ├── js/                   # Frontend React
│   │   ├── app.jsx           # Entry point Inertia + React
│   │   ├── bootstrap.js      # Bootstrap JS (Axios)
│   │   ├── Components/       # Komponen UI reusable
│   │   ├── Layouts/          # Layout frontend & auth
│   │   └── Pages/            # Halaman Inertia
│   │       ├── Admin/        # Dashboard admin
│   │       ├── Auth/         # Halaman login/register
│   │       ├── Frontend/     # Halaman publik
│   │       └── Profile/      # Profil user
│   └── views/
│       └── app.blade.php     # Root Blade untuk Inertia
├── routes/
│   ├── web.php               # Semua route web (publik + admin)
│   └── auth.php              # Route auth Breeze (tidak termuat)
├── storage/                  # File upload, logs, cache
├── tests/                    # PHPUnit tests
├── .env.example              # Template environment
├── artisan                   # CLI Laravel
├── composer.json             # Dependensi PHP
├── package.json              # Dependensi JavaScript
├── vite.config.js            # Konfigurasi Vite bundler
└── tailwind.config.js        # Konfigurasi Tailwind CSS
```

---

## 🧱 Struktur Backend (app/)

### Controllers

| Folder | Deskripsi |
|--------|-----------|
| `Controllers/Admin/` | Controller untuk dashboard admin (20+ controller) |
| `Controllers/Admin/Auth/` | Login admin kustom |
| `Controllers/Auth/` | Auth default Laravel Breeze |
| `Controllers/Frontend/` | Controller halaman publik (beranda, profil, ppdb, dll) |

### Models (26 Model)

| Model | Fungsi |
|-------|--------|
| `User` | User admin sistem |
| `SchoolSetting` | Pengaturan sekolah (nama, logo, kontak, medsos) |
| `Menu` | Menu navigasi (hierarkis) |
| `HomeSection` | Konten hero/banner beranda |
| `SchoolStatistic` | Statistik beranda |
| `SchoolProfile` | Profil sekolah lengkap |
| `OrganizationStructure` | Struktur organisasi |
| `OrganizationUnit` | Unit organisasi |
| `AcademicPage` | Halaman akademik |
| `AcademicCalendar` | Kalender akademik |
| `AcademicResource` | Sumber belajar akademik |
| `Teacher` | Data guru |
| `Extracurricular` | Ekstrakurikuler |
| `OsisMember` | Anggota OSIS |
| `StudentAchievement` | Prestasi siswa |
| `StudentProgram` | Program kesiswaan (osis, ekskul, bk) |
| `StudentProgramRegistration` | Pendaftaran program kesiswaan |
| `Post` | Berita/informasi |
| `Gallery` | Galeri foto |
| `PpdbSetting` | Pengaturan PPDB |
| `PpdbTimeline` | Timeline PPDB |
| `PpdbStep` | Langkah/alur PPDB |
| `PpdbRequirement` | Persyaratan PPDB |
| `PpdbRegistration` | Pendaftaran PPDB |
| `Student` | Data siswa |
| `Alumni` | Data alumni |
| `OsisElectionPeriod` | Periode pemilihan OSIS |
| `OsisCandidate` | Kandidat OSIS |
| `OsisVoter` | Pemilih/pemegang token |
| `OsisVote` | Suara pemilihan |

---

## 🎨 Struktur Frontend (resources/js/)

```
resources/js/
├── app.jsx                      # Entry point React + Inertia
├── bootstrap.js                 # Bootstrap Axios
├── Components/                  # Komponen reuse
├── Layouts/
│   ├── FrontendLayout.jsx       # Layout website publik
│   ├── AuthenticatedLayout.jsx  # Layout user login
│   └── GuestLayout.jsx          # Layout guest
├── Pages/
│   ├── Frontend/
│   │   ├── Home.jsx             # Beranda
│   │   ├── Profile.jsx          # Profil sekolah
│   │   ├── Academic.jsx         # Akademik
│   │   ├── Kesiswaan.jsx        # Kesiswaan
│   │   ├── Informasi.jsx        # Berita/informasi
│   │   ├── Gallery.jsx          # Galeri
│   │   ├── Alumni/              # Alumni
│   │   ├── PPDB.jsx             # Halaman PPDB
│   │   ├── PPDBRegister.jsx     # Form pendaftaran PPDB
│   │   ├── PPDBAnnouncement.jsx # Pengumuman PPDB
│   │   └── OsisVoting/          # Pemilihan OSIS
│   ├── Admin/
│   │   ├── Dashboard.jsx        # Dashboard admin
│   │   ├── Layouts/AdminLayout.jsx # Layout admin (sidebar)
│   │   ├── Posts/               # Manajemen berita
│   │   ├── Galleries/           # Manajemen galeri
│   │   ├── Students/            # Data siswa
│   │   ├── Academics/           # Konten akademik
│   │   ├── Profiles/            # Profil sekolah
│   │   ├── PpdbRegistrations/   # Pendaftaran PPDB
│   │   ├── OsisElection/        # Pemilihan OSIS
│   │   ├── Alumni/              # Data alumni
│   │   └── ...                  # Modul admin lainnya
│   ├── Auth/                    # Halaman auth
│   └── Profile/                 # Profil user
```

---

## 🚀 Fitur-Fitur Aplikasi

### 1. 🌐 Website Publik Sekolah

Halaman depan sekolah yang menampilkan:

- **Beranda** — Hero banner, statistik, berita terbaru, galeri, status PPDB
- **Profil Sekolah** — Sejarah, visi-misi, identitas, struktur organisasi
- **Akademik** — Kalender akademik, guru, ekstrakurikuler, OSIS, prestasi
- **Kesiswaan** — Informasi program OSIS, ekstrakurikuler, bimbingan konseling + pendaftaran online
- **Informasi/Berita** — Daftar berita dengan kategori, detail + rich text
- **Galeri** — Galeri foto sekolah
- **Alumni** — Data alumni dengan filter aktivitas (Bekerja/Kuliah/Wirausaha)
- **PPDB** — Informasi, alur, persyaratan, timeline pendaftaran
- **Pemilihan OSIS** — Halaman pemilihan dengan login token

### 2. 🔐 Sistem Autentikasi Admin

- Login admin kustom di `/admin/login`
- Auth scaffolding Laravel Breeze
- Middleware Inertia untuk session-based auth

### 3. 📊 Dashboard Admin

Ringkasan data sekolah dalam bentuk grafik dan statistik:

- Total siswa (aktif/tidak aktif)
- Siswa per kelas
- Total alumni + aktivitas
- Data PPDB (hari ini, status, tren)
- Data pemilihan OSIS (kandidat, pemilih, partisipasi)
- Chart tren PPDB, kelas siswa, aktivitas alumni

### 4. ⚙️ Pengaturan Sekolah

- Nama sekolah, tagline, logo
- Kontak (telepon, email, alamat)
- Media sosial (Facebook, Instagram, YouTube, Twitter)
- Menu navigasi (hierarkis, bisa diurutkan)

### 5. 📝 Manajemen Konten Beranda

- Hero section (judul, deskripsi, gambar, tombol CTA)
- Statistik dinamis (guru, siswa, alumni, prestasi)
- Konten dapat diaktifkan/nonaktifkan

### 6. 🏫 Manajemen Profil Sekolah

- Informasi sekolah (nama, deskripsi, gambar)
- Sejarah dengan timeline
- Visi, misi, nilai-nilai inti
- Identitas sekolah
- Struktur organisasi + unit organisasi

### 7. 📚 Manajemen Akademik

- Halaman akademik (konten dinamis)
- Kalender akademik
- Data guru (nama, jabatan, mapel, foto)
- Ekstrakurikuler (nama, pembina, deskripsi, foto)
- Anggota OSIS (nama, jabatan, foto)
- Prestasi siswa (judul, deskripsi, tahun, tingkat)
- Sumber belajar

### 8. 👨‍🎓 Manajemen Kesiswaan

- Program kesiswaan (OSIS, Ekstrakurikuler, BK)
- Pendaftaran online oleh siswa
- Manajemen pendaftar di admin

### 9. 📰 Manajemen Berita/Post

- CRUD berita dengan rich text editor (CKEditor 5)
- Kategori berita
- Thumbnail gambar
- Fitur unggulan / featured
- Status publish/draft
- URL slug otomatis

### 10. 🖼️ Manajemen Galeri

- CRUD galeri dengan banyak gambar
- Upload gambar
- Tampilan grid di frontend

### 11. 📋 Sistem PPDB (Penerimaan Peserta Didik Baru)

**Fitur lengkap pendaftaran online:**

- Pengaturan PPDB (buka/tutup, tahun ajaran, kuota)
- Timeline PPDB (tanggal penting)
- Alur/langkah pendaftaran
- Persyaratan dengan upload dokumen

**Form pendaftaran mencakup:**

- Nama, NISN, gender, tempat/tanggal lahir
- Agama, sekolah asal, alamat
- Data orang tua (ayah, ibu, wali)
- Upload dokumen (KK, akta, ijazah/SKL, rapor, foto)

**Manajemen admin:**

- Daftar pendaftar dengan filter status
- Update status (Diproses/Diterima/Ditolak)
- Catatan admin
- Export data (CSV/PDF)
- Cetak kartu pengumuman
- Pengumuman publik (cek by No. Pendaftaran atau NISN)

### 12. 👥 Manajemen Data Siswa

- CRUD data siswa
- Filter kelas, status
- Import dari CSV + download template
- Export data
- Upload foto
- Generate token voting OSIS

### 13. 🎓 Manajemen Data Alumni

- CRUD data alumni
- Import dari CSV + download template
- Export data
- Filter aktivitas (Bekerja, Kuliah, Wirausaha)

### 14. 🗳️ Sistem Pemilihan OSIS Digital

**Fitur lengkap voting online:**

- Periode pemilihan (judul, tahun ajaran, waktu mulai-selesai)
- Manajemen kandidat (nomor urut, visi-misi, foto, ketua/wakil)
- Generate voter (dari data siswa) dengan token unik
- Login voter menggunakan NISN + token
- Satu suara per pemilih (tidak bisa vote ulang)
- Opsi suara rahasia (secret vote)
- Tampilan hasil (bisa ditampilkan/diubah)
- Export hasil pemilihan
- Export data pemilih/token
- Cetak token pemilih
- Cetak hasil pemilihan

### 15. 📄 Export & Cetak

- Export data siswa (CSV)
- Export data alumni (CSV)
- Export pendaftar PPDB (CSV/PDF)
- Cetak pengumuman PPDB
- Cetak token pemilih OSIS
- Cetak hasil pemilihan OSIS

---

## 🛠️ Tech Stack

### Backend
| Teknologi | Versi |
|-----------|-------|
| PHP | ^8.3 |
| Laravel | ^13.8 |
| Inertia Laravel | ^2.0 |
| Laravel Sanctum | ^4.0 |
| Ziggy (routes JS) | ^2.0 |
| DomPDF | ^3.1 |
| Filament | ^5.6 (terinstall, tidak dipakai) |

### Frontend
| Teknologi | Versi |
|-----------|-------|
| React | ^19.2 |
| Inertia React | ^3.3 |
| Vite | ^8.0 |
| Tailwind CSS | ^4.0 |
| Headless UI | ^2.2 |
| CKEditor 5 | ^48.2 |
| Axios | ^1.17 |

---

## ⚡ Cara Menjalankan

### Setup Awal (otomatis)

```bash
composer run setup
```

### Development

```bash
composer run dev
```

Perintah di atas menjalankan secara bersamaan:
- `php artisan serve` — Server Laravel
- `php artisan queue:listen` — Queue worker
- `php artisan pail` — Log viewer
- `npm run dev` — Vite dev server

### Manual

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
npm run build
php artisan serve
```

### Testing

```bash
composer run test
```
atau
```bash
php artisan test
```

### Route Penting

| Route | Keterangan |
|-------|------------|
| `/` | Beranda publik |
| `/admin/login` | Login admin |
| `/admin/dashboard` | Dashboard admin |
| `/ppdb` | Halaman PPDB |
| `/ppdb/daftar` | Form pendaftaran PPDB |
| `/pemilihan-osis` | Pemilihan OSIS |
| `/filament` | Panel Filament (jika diaktifkan) |

---

## 📦 Database

Default: **SQLite** (file `database/database.sqlite`)

Untuk production, ubah ke MySQL/PostgreSQL di `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=root
DB_PASSWORD=
```

### Seeder Akun Default

```
Email: admin@sekolah.test
Password: password
```

---

## ⚠️ Catatan Penting

1. **Folder template CSV** ada typo: `tamplate csv siswa/` — seharusnya `template csv siswa/`
2. **Route siswa** di `web.php` terdefinisi duplikat (tidak bermasalah, tapi perlu dibersihkan)
3. **@tailwindcss/forms** digunakan di `tailwind.config.js` tapi tidak tercantum di `package.json`
4. **File `routes/auth.php`** ada tapi tidak dimuat — auth admin menggunakan route kustom
5. **Filament** terinstall tapi tidak digunakan — hanya mengambil ruang vendor
6. **Mode default** session, queue, dan cache menggunakan database — untuk production gunakan Redis
7. **Belum ada localization** — semua string hardcoded dalam Bahasa Indonesia
