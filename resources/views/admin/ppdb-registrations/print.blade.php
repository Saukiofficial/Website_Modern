<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Formulir PPDB - {{ $registration->student_name }}</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            background: #e5e7eb;
            font-family: Arial, sans-serif;
            color: #111827;
        }

        .toolbar {
            position: sticky;
            top: 0;
            z-index: 20;
            display: flex;
            justify-content: center;
            gap: 10px;
            padding: 14px;
            background: #061b46;
        }

        .toolbar button,
        .toolbar a {
            border: 0;
            border-radius: 8px;
            padding: 11px 18px;
            background: #f7c46a;
            color: #061b46;
            font-size: 12px;
            font-weight: 800;
            text-decoration: none;
            text-transform: uppercase;
            cursor: pointer;
        }

        .page {
            width: 210mm;
            min-height: 297mm;
            margin: 20px auto;
            padding: 16mm;
            background: #ffffff;
            box-shadow: 0 20px 60px rgba(15, 23, 42, 0.18);
        }

        .kop {
            display: flex;
            align-items: center;
            gap: 18px;
            border-bottom: 4px solid #061b46;
            padding-bottom: 16px;
            margin-bottom: 18px;
        }

        .logo {
            width: 78px;
            height: 78px;
            border: 2px solid #061b46;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #061b46;
            font-weight: 800;
            font-size: 12px;
            text-align: center;
        }

        .kop-text {
            flex: 1;
            text-align: center;
        }

        .kop-text h1 {
            margin: 0;
            font-size: 21px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #061b46;
        }

        .kop-text h2 {
            margin: 5px 0 0;
            font-size: 16px;
            text-transform: uppercase;
            color: #061b46;
        }

        .kop-text p {
            margin: 6px 0 0;
            font-size: 12px;
            color: #475569;
        }

        .title-box {
            margin: 18px 0;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            padding: 12px;
            text-align: center;
        }

        .title-box h3 {
            margin: 0;
            font-size: 17px;
            text-transform: uppercase;
            color: #061b46;
        }

        .title-box p {
            margin: 6px 0 0;
            font-size: 13px;
            font-weight: 700;
        }

        .top-data {
            display: grid;
            grid-template-columns: 38mm 1fr;
            gap: 14px;
            margin-bottom: 18px;
        }

        .photo {
            width: 35mm;
            height: 45mm;
            border: 1px solid #94a3b8;
            border-radius: 6px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 11px;
            text-align: center;
        }

        .photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .section {
            margin-top: 16px;
        }

        .section-title {
            background: #061b46;
            color: #ffffff;
            padding: 8px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 10px;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .field {
            border: 1px solid #cbd5e1;
            border-radius: 7px;
            padding: 8px 10px;
            min-height: 44px;
        }

        .field.full {
            grid-column: 1 / -1;
        }

        .label {
            display: block;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #64748b;
            margin-bottom: 4px;
        }

        .value {
            font-size: 13px;
            font-weight: 700;
            color: #111827;
            line-height: 1.45;
        }

        .documents {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .doc-item {
            border: 1px solid #cbd5e1;
            border-radius: 7px;
            padding: 8px 10px;
            font-size: 12px;
            font-weight: 700;
        }

        .doc-status {
            color: #059669;
            font-size: 11px;
            margin-top: 4px;
        }

        .signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            margin-top: 34px;
            text-align: center;
        }

        .signature-space {
            height: 78px;
            border-bottom: 1px solid #64748b;
            margin-bottom: 8px;
        }

        .signature-title {
            font-size: 12px;
            font-weight: 800;
            color: #061b46;
        }

        .footer-note {
            margin-top: 20px;
            border-top: 1px dashed #94a3b8;
            padding-top: 10px;
            font-size: 10.5px;
            color: #64748b;
            line-height: 1.6;
        }

        @media print {
            body {
                background: #ffffff;
            }

            .toolbar {
                display: none;
            }

            .page {
                width: auto;
                min-height: auto;
                margin: 0;
                padding: 12mm;
                box-shadow: none;
            }

            @page {
                size: A4;
                margin: 8mm;
            }
        }
    </style>
</head>
<body>
    <div class="toolbar">
        <button onclick="window.print()">Download / Print PDF</button>
        <a href="{{ route('admin.ppdb-registrations.show', $registration) }}">Kembali ke Detail</a>
    </div>

    <main class="page">
        <div class="kop">
            <div class="logo">
                LOGO<br>SEKOLAH
            </div>

            <div class="kop-text">
                <h1>Formulir Pendaftaran Peserta Didik Baru</h1>
                <h2>SMA Negeri 1 Mojokerto</h2>
                <p>Jl. Contoh Alamat Sekolah, Mojokerto, Jawa Timur</p>
                <p>Website: sekolah.sch.id | Email: admin@sekolah.sch.id</p>
            </div>
        </div>

        <div class="title-box">
            <h3>Bukti Formulir Pendaftaran PPDB</h3>
            <p>Nomor Pendaftaran: {{ $registration->registration_number ?? '-' }}</p>
            <p>Tanggal Daftar: {{ $registration->submitted_at?->format('d M Y H:i') ?? '-' }}</p>
        </div>

        <div class="top-data">
            <div>
                <div class="photo">
                    @if ($registration->photo_url)
                        <img src="{{ $registration->photo_url }}" alt="Pas Foto">
                    @else
                        Pas Foto<br>3x4
                    @endif
                </div>
            </div>

            <div class="grid">
                <div class="field full">
                    <span class="label">Nama Lengkap</span>
                    <span class="value">{{ $registration->student_name ?? '-' }}</span>
                </div>

                <div class="field">
                    <span class="label">NISN</span>
                    <span class="value">{{ $registration->nisn ?? '-' }}</span>
                </div>

                <div class="field">
                    <span class="label">Jenis Kelamin</span>
                    <span class="value">{{ $registration->gender ?? '-' }}</span>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="section-title">A. Data Calon Peserta Didik</div>

            <div class="grid">
                <div class="field">
                    <span class="label">Tempat Lahir</span>
                    <span class="value">{{ $registration->birth_place ?? '-' }}</span>
                </div>

                <div class="field">
                    <span class="label">Tanggal Lahir</span>
                    <span class="value">{{ $registration->birth_date?->format('d M Y') ?? '-' }}</span>
                </div>

                <div class="field">
                    <span class="label">Agama</span>
                    <span class="value">{{ $registration->religion ?? '-' }}</span>
                </div>

                <div class="field">
                    <span class="label">Asal Sekolah</span>
                    <span class="value">{{ $registration->previous_school ?? '-' }}</span>
                </div>

                <div class="field full">
                    <span class="label">Alamat</span>
                    <span class="value">{{ $registration->address ?? '-' }}</span>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="section-title">B. Data Orang Tua / Wali</div>

            <div class="grid">
                <div class="field">
                    <span class="label">Nama Ayah</span>
                    <span class="value">{{ $registration->father_name ?? '-' }}</span>
                </div>

                <div class="field">
                    <span class="label">Pekerjaan Ayah</span>
                    <span class="value">{{ $registration->father_job ?? '-' }}</span>
                </div>

                <div class="field">
                    <span class="label">Nama Ibu</span>
                    <span class="value">{{ $registration->mother_name ?? '-' }}</span>
                </div>

                <div class="field">
                    <span class="label">Pekerjaan Ibu</span>
                    <span class="value">{{ $registration->mother_job ?? '-' }}</span>
                </div>

                <div class="field">
                    <span class="label">Nomor HP</span>
                    <span class="value">{{ $registration->phone ?? '-' }}</span>
                </div>

                <div class="field">
                    <span class="label">Email</span>
                    <span class="value">{{ $registration->email ?? '-' }}</span>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="section-title">C. Kelengkapan Dokumen</div>

            <div class="documents">
                <div class="doc-item">
                    Kartu Keluarga
                    <div class="doc-status">{{ $registration->family_card_file ? 'Tersedia' : 'Belum tersedia' }}</div>
                </div>

                <div class="doc-item">
                    Akta Kelahiran
                    <div class="doc-status">{{ $registration->birth_certificate_file ? 'Tersedia' : 'Belum tersedia' }}</div>
                </div>

                <div class="doc-item">
                    Ijazah / SKL
                    <div class="doc-status">{{ $registration->certificate_file ? 'Tersedia' : 'Belum tersedia' }}</div>
                </div>

                <div class="doc-item">
                    Rapor Terakhir
                    <div class="doc-status">{{ $registration->report_card_file ? 'Tersedia' : 'Belum tersedia' }}</div>
                </div>

                <div class="doc-item">
                    Pas Foto 3x4
                    <div class="doc-status">{{ $registration->photo_file ? 'Tersedia' : 'Belum tersedia' }}</div>
                </div>

                <div class="doc-item">
                    Status Verifikasi
                    <div class="doc-status">{{ $registration->status ?? 'Baru' }}</div>
                </div>
            </div>
        </section>

        <div class="signatures">
            <div>
                <div class="signature-space"></div>
                <div class="signature-title">Orang Tua / Wali</div>
            </div>

            <div>
                <div class="signature-space"></div>
                <div class="signature-title">Panitia PPDB</div>
            </div>
        </div>

        <div class="footer-note">
            Dokumen ini dicetak dari sistem PPDB sekolah. Simpan bukti formulir ini sebagai arsip pendaftaran.
            Data yang tidak sesuai dengan dokumen resmi dapat memengaruhi proses verifikasi.
        </div>
    </main>
</body>
</html>