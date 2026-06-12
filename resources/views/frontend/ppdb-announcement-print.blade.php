<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Cetak Hasil PPDB - {{ $registration->registration_number }}</title>

    <style>
        @page {
            size: A4;
            margin: 12mm;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            background: #e5e7eb;
            color: #111827;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
        }

        .toolbar {
            position: sticky;
            top: 0;
            z-index: 99;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            min-height: 68px;
            padding: 12px 16px;
            background: #061b46;
            box-shadow: 0 10px 24px rgba(15, 23, 42, 0.18);
        }

        .toolbar-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            max-width: 794px;
        }

        .toolbar a,
        .toolbar button {
            display: inline-flex;
            min-height: 42px;
            align-items: center;
            justify-content: center;
            border: none;
            border-radius: 11px;
            padding: 0 20px;
            background: #f7c46a;
            color: #061b46;
            font-size: 12px;
            font-weight: 700;
            line-height: 1;
            text-decoration: none;
            cursor: pointer;
            white-space: nowrap;
        }

        .toolbar a.secondary {
            background: rgba(255, 255, 255, 0.11);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.22);
        }

        .page {
            width: 794px;
            min-height: 1123px;
            margin: 20px auto;
            padding: 54px 58px 48px;
            background: #ffffff;
            box-shadow: 0 20px 60px rgba(15, 23, 42, 0.18);
        }

        .header {
            position: relative;
            min-height: 126px;
            padding: 8px 0 20px;
            border-bottom: 4px solid #061b46;
            margin-bottom: 20px;
        }

        .logo {
            position: absolute;
            left: 0;
            top: 0;
            width: 92px;
            height: 92px;
            border: 2px solid #061b46;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #061b46;
            font-size: 11px;
            font-weight: 800;
            line-height: 1.2;
            text-align: center;
            overflow: hidden;
            background: #ffffff;
        }

        .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            padding: 5px;
        }

        .kop-text {
            width: 100%;
            text-align: center;
            padding: 6px 108px 0;
        }

        .kop-text h1 {
            margin: 0;
            color: #061b46;
            font-size: 20px;
            font-weight: 800;
            line-height: 1.25;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }

        .kop-text h2 {
            margin: 6px 0 0;
            color: #061b46;
            font-size: 15px;
            font-weight: 800;
            line-height: 1.3;
            text-transform: uppercase;
        }

        .kop-text p {
            margin: 4px 0 0;
            color: #334155;
            font-size: 11px;
            font-weight: 500;
            line-height: 1.35;
        }

        .doc-title {
            margin-top: 18px;
            text-align: center;
        }

        .doc-title h3 {
            display: inline-block;
            margin: 0;
            padding-bottom: 5px;
            border-bottom: 2px solid #111827;
            color: #061b46;
            font-size: 17px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .04em;
        }

        .doc-title p {
            margin: 8px 0 0;
            font-size: 12px;
            font-weight: 700;
        }

        .intro {
            margin-top: 22px;
            font-size: 12.5px;
            font-weight: 500;
            line-height: 1.75;
            text-align: justify;
        }

        .student-box {
            margin-top: 18px;
            overflow: hidden;
            border: 2px solid #061b46;
            border-radius: 12px;
        }

        .box-title {
            padding: 11px 14px;
            background: #061b46;
            color: #ffffff;
            font-size: 12.5px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .08em;
        }

        .student-content {
            display: grid;
            grid-template-columns: 132px 1fr;
            gap: 18px;
            padding: 16px;
        }

        .photo {
            width: 120px;
            height: 160px;
            overflow: hidden;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            background: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 11px;
            font-weight: 700;
            text-align: center;
        }

        .photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            vertical-align: top;
            padding: 4.5px 0;
            font-size: 12.5px;
            line-height: 1.45;
        }

        td.label {
            width: 150px;
            color: #334155;
            font-weight: 700;
        }

        td.separator {
            width: 12px;
            font-weight: 700;
        }

        .status-box {
            margin-top: 18px;
            border: 2px solid #061b46;
            border-radius: 12px;
            padding: 16px;
            text-align: center;
        }

        .status-label {
            font-size: 28px;
            font-weight: 900;
            letter-spacing: .08em;
        }

        .status-message {
            margin-top: 9px;
            font-size: 12.5px;
            font-weight: 500;
            line-height: 1.7;
            color: #374151;
        }

        .status-box.accepted {
            border-color: #047857;
            background: #ecfdf5;
        }

        .status-box.accepted .status-label {
            color: #047857;
        }

        .status-box.rejected {
            border-color: #b91c1c;
            background: #fef2f2;
        }

        .status-box.rejected .status-label {
            color: #b91c1c;
        }

        .status-box.process {
            border-color: #1d4ed8;
            background: #eff6ff;
        }

        .status-box.process .status-label {
            color: #1d4ed8;
        }

        .status-box.pending {
            border-color: #b45309;
            background: #fffbeb;
        }

        .status-box.pending .status-label {
            color: #b45309;
        }

        .note {
            margin-top: 16px;
            padding: 13px 14px;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            background: #f8fafc;
        }

        .note-title {
            color: #475569;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .08em;
        }

        .note-content {
            margin-top: 7px;
            color: #111827;
            font-size: 12.5px;
            font-weight: 500;
            line-height: 1.7;
        }

        .footer-text {
            margin-top: 18px;
            color: #111827;
            font-size: 12.5px;
            font-weight: 500;
            line-height: 1.75;
            text-align: justify;
        }

        .signature {
            margin-top: 28px;
            display: grid;
            grid-template-columns: 1fr 240px;
            gap: 20px;
        }

        .signature-box {
            text-align: center;
            font-size: 12.5px;
            font-weight: 500;
            line-height: 1.55;
        }

        .signature-space {
            height: 78px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }

        .signature-space img {
            max-height: 72px;
            max-width: 180px;
            object-fit: contain;
        }

        .signature-name {
            margin-top: 3px;
            color: #111827;
            font-size: 12.5px;
            font-weight: 800;
            text-decoration: underline;
        }

        .signature-position {
            margin-top: 2px;
            color: #061b46;
            font-size: 12px;
            font-weight: 800;
        }

        .footer-note {
            margin-top: 22px;
            padding-top: 10px;
            border-top: 1px dashed #cbd5e1;
            color: #64748b;
            font-size: 10px;
            font-weight: 500;
            line-height: 1.5;
            text-align: center;
        }

        @media print {
            body {
                background: #ffffff;
            }

            .toolbar {
                display: none;
            }

            .page {
                width: 100%;
                min-height: auto;
                margin: 0;
                padding: 0;
                box-shadow: none;
            }

            @page {
                size: A4;
                margin: 12mm;
            }
        }

        @media screen and (max-width: 860px) {
            .toolbar {
                justify-content: flex-start;
                overflow-x: auto;
            }

            .toolbar-inner {
                justify-content: flex-start;
                min-width: max-content;
            }

            .page {
                width: calc(100vw - 24px);
                margin: 12px auto;
                padding: 34px 26px;
            }
        }
    </style>
</head>
<body>
    @php
        $statusClass = match ($status) {
            'Diterima' => 'accepted',
            'Ditolak' => 'rejected',
            'Diproses' => 'process',
            default => 'pending',
        };

        $formTitle = $setting?->form_title ?: 'SURAT PENGUMUMAN HASIL PPDB';
        $schoolName = $setting?->form_school_name ?: 'Nama Sekolah Belum Diatur';
        $schoolAddress = $setting?->form_address ?: 'Alamat sekolah belum diatur';
        $schoolWebsite = $setting?->form_website ?: 'Website belum diatur';
        $schoolEmail = $setting?->form_email ?: 'Email belum diatur';

        $committeeName = $setting?->committee_name ?: 'Panitia PPDB';
        $committeePosition = $setting?->committee_position ?: 'Ketua Panitia PPDB';
        $reportLocation = $setting?->report_location ?: 'Lokasi';
    @endphp

    <div class="toolbar">
        <div class="toolbar-inner">
            <button type="button" onclick="window.print()">
                Cetak / Simpan PDF
            </button>

            <a href="/ppdb/pengumuman" class="secondary">
                Kembali ke Pengumuman
            </a>
        </div>
    </div>

    <main class="page">
        <header class="header">
            <div class="logo">
                @if ($setting?->form_logo_url)
                    <img src="{{ $setting->form_logo_url }}" alt="Logo Sekolah">
                @else
                    LOGO<br>SEKOLAH
                @endif
            </div>

            <div class="kop-text">
                <h1>{{ $formTitle }}</h1>
                <h2>{{ $schoolName }}</h2>
                <p>{{ $schoolAddress }}</p>
                <p>
                    Website: {{ $schoolWebsite }}
                    |
                    Email: {{ $schoolEmail }}
                </p>
            </div>
        </header>

        <section class="doc-title">
            <h3>Pengumuman Hasil Seleksi PPDB</h3>
            <p>Nomor Pendaftaran: {{ $registration->registration_number ?? '-' }}</p>
        </section>

        <section class="intro">
            Berdasarkan hasil verifikasi data dan dokumen calon peserta didik baru pada proses
            Penerimaan Peserta Didik Baru Tahun Ajaran {{ $setting?->academic_year ?? '2026/2027' }},
            dengan ini panitia PPDB menyampaikan hasil seleksi untuk calon peserta didik berikut:
        </section>

        <section class="student-box">
            <div class="box-title">
                Data Calon Peserta Didik
            </div>

            <div class="student-content">
                <div>
                    <div class="photo">
                        @if ($registration->photo_url)
                            <img src="{{ $registration->photo_url }}" alt="{{ $registration->student_name }}">
                        @else
                            PAS FOTO
                        @endif
                    </div>
                </div>

                <div>
                    <table>
                        <tr>
                            <td class="label">Nama Lengkap</td>
                            <td class="separator">:</td>
                            <td>{{ $registration->student_name ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="label">Nomor Pendaftaran</td>
                            <td class="separator">:</td>
                            <td>{{ $registration->registration_number ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="label">NISN</td>
                            <td class="separator">:</td>
                            <td>{{ $registration->nisn ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="label">Jenis Kelamin</td>
                            <td class="separator">:</td>
                            <td>{{ $registration->gender ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="label">Tempat, Tanggal Lahir</td>
                            <td class="separator">:</td>
                            <td>
                                {{ $registration->birth_place ?? '-' }},
                                {{ $registration->birth_date ? $registration->birth_date->format('d M Y') : '-' }}
                            </td>
                        </tr>
                        <tr>
                            <td class="label">Agama</td>
                            <td class="separator">:</td>
                            <td>{{ $registration->religion ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="label">Asal Sekolah</td>
                            <td class="separator">:</td>
                            <td>{{ $registration->previous_school ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="label">No. HP</td>
                            <td class="separator">:</td>
                            <td>{{ $registration->phone ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="label">Email</td>
                            <td class="separator">:</td>
                            <td>{{ $registration->email ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="label">Alamat</td>
                            <td class="separator">:</td>
                            <td>{{ $registration->address ?? '-' }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </section>

        <section class="status-box {{ $statusClass }}">
            <div class="status-label">{{ $statusLabel }}</div>
            <div class="status-message">{{ $message }}</div>
        </section>

        @if ($registration->admin_note)
            <section class="note">
                <div class="note-title">Catatan Panitia</div>
                <div class="note-content">{{ $registration->admin_note }}</div>
            </section>
        @endif

        <section class="footer-text">
            Surat pengumuman ini dicetak secara online melalui sistem PPDB sekolah.
            Calon peserta didik yang dinyatakan diterima wajib mengikuti informasi lanjutan
            yang disampaikan oleh panitia PPDB sesuai ketentuan sekolah.
        </section>

        <section class="signature">
            <div></div>

            <div class="signature-box">
                {{ $reportLocation }}, {{ now()->format('d M Y') }}

                <div class="signature-space">
                    @if ($setting?->committee_signature_url)
                        <img src="{{ $setting->committee_signature_url }}" alt="Tanda Tangan Panitia">
                    @endif
                </div>

                <div class="signature-name">
                    {{ $committeeName }}
                </div>

                <div class="signature-position">
                    {{ $committeePosition }}
                </div>
            </div>
        </section>

        <div class="footer-note">
            Dokumen ini dicetak melalui sistem PPDB online.
            Simpan bukti pengumuman ini sebagai arsip peserta didik baru.
        </div>
    </main>
</body>
</html>