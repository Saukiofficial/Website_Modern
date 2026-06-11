<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Formulir PPDB - {{ $registration->registration_number }}</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            background: #e5e7eb;
            color: #000000;
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
            padding: 60px 60px 50px;
            background: #ffffff;
            box-shadow: 0 20px 60px rgba(15, 23, 42, 0.18);
        }

        .header {
            position: relative;
            min-height: 128px;
            padding: 8px 0 20px;
            border-bottom: 4px solid #061b46;
            margin-bottom: 18px;
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
            padding: 8px 108px 0;
        }

        .kop-text h1 {
            margin: 0;
            color: #061b46;
            font-size: 21px;
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

        .registration-box {
            margin-top: 18px;
            margin-bottom: 18px;
            padding: 13px 16px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            text-align: center;
        }

        .registration-box h3 {
            margin: 0 0 8px;
            color: #061b46;
            font-size: 16px;
            font-weight: 800;
            text-transform: uppercase;
        }

        .registration-box p {
            margin: 4px 0;
            color: #000000;
            font-size: 12px;
            font-weight: 700;
        }

        .top-data {
            display: grid;
            grid-template-columns: 132px 1fr;
            gap: 26px;
            margin-top: 18px;
            margin-bottom: 18px;
        }

        .photo-box {
            width: 132px;
            height: 172px;
            overflow: hidden;
            border: 1px solid #cbd5e1;
            border-radius: 5px;
            background: #f1f5f9;
        }

        .photo-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .photo-placeholder {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 11px;
            font-weight: 700;
            text-align: center;
        }

        .top-info {
            display: grid;
            gap: 8px;
        }

        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .field {
            min-height: 55px;
            padding: 11px 12px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
        }

        .field.full {
            grid-column: 1 / -1;
        }

        .field-label {
            margin-bottom: 7px;
            color: #64748b;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .field-value {
            color: #000000;
            font-size: 12px;
            font-weight: 700;
            line-height: 1.45;
        }

        .section-title {
            margin: 16px 0 10px;
            padding: 9px 11px;
            border-radius: 5px;
            background: #061b46;
            color: #ffffff;
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .data-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .documents {
            margin-top: 8px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            overflow: hidden;
        }

        .document-row {
            display: grid;
            grid-template-columns: 40px 1fr 120px;
            border-bottom: 1px solid #cbd5e1;
        }

        .document-row:last-child {
            border-bottom: none;
        }

        .document-row div {
            padding: 10px 12px;
            font-size: 11px;
            font-weight: 700;
        }

        .document-row .number {
            text-align: center;
            background: #f8fafc;
        }

        .document-row .status {
            text-align: center;
            color: #047857;
        }

        .statement {
            margin-top: 14px;
            padding: 12px 14px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            background: #f8fafc;
            color: #111827;
            font-size: 11.5px;
            font-weight: 500;
            line-height: 1.65;
            text-align: justify;
        }

        .signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            margin-top: 35px;
            text-align: center;
        }

        .signature-date {
            margin-bottom: 10px;
            color: #111827;
            font-size: 12px;
            font-weight: 700;
        }

        .signature-space {
            height: 78px;
            border-bottom: 1px solid #64748b;
            margin-bottom: 8px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }

        .signature-space img {
            max-height: 70px;
            max-width: 170px;
            object-fit: contain;
        }

        .signature-name {
            margin-bottom: 3px;
            color: #111827;
            font-size: 12px;
            font-weight: 800;
        }

        .signature-title {
            color: #061b46;
            font-size: 12px;
            font-weight: 800;
        }

        .footer-note {
            margin-top: 30px;
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
                padding: 30px 38px;
                box-shadow: none;
            }

            .header {
                min-height: 120px;
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
                padding: 36px 28px;
            }
        }
    </style>
</head>
<body>
    <div class="toolbar">
        <div class="toolbar-inner">
            <button type="button" onclick="window.print()">
                Cetak / Simpan PDF
            </button>

            <a href="{{ route('admin.ppdb-registrations.show', $registration->id) }}" class="secondary">
                Kembali ke Detail
            </a>
        </div>
    </div>

    <main class="page">
        <div class="header">
            <div class="logo">
                @if ($setting?->form_logo_url)
                    <img src="{{ $setting->form_logo_url }}" alt="Logo Sekolah">
                @else
                    LOGO<br>SEKOLAH
                @endif
            </div>

            <div class="kop-text">
                <h1>{{ $setting?->form_title ?: 'Formulir Pendaftaran Peserta Didik Baru' }}</h1>
                <h2>{{ $setting?->form_school_name ?: 'SMA Negeri 1 Mojokerto' }}</h2>
                <p>{{ $setting?->form_address ?: 'Jl. Contoh Alamat Sekolah, Mojokerto, Jawa Timur' }}</p>
                <p>
                    Website: {{ $setting?->form_website ?: 'sekolah.sch.id' }}
                    |
                    Email: {{ $setting?->form_email ?: 'admin@sekolah.sch.id' }}
                </p>
            </div>
        </div>

        <section class="registration-box">
            <h3>Bukti Formulir Pendaftaran PPDB</h3>
            <p>Nomor Pendaftaran: {{ $registration->registration_number }}</p>
            <p>
                Tanggal Daftar:
                {{ optional($registration->submitted_at)->format('d M Y H:i') ?: '-' }}
            </p>
        </section>

        <section class="top-data">
            <div class="photo-box">
                @if ($registration->photo_url)
                    <img src="{{ $registration->photo_url }}" alt="Foto Siswa">
                @else
                    <div class="photo-placeholder">
                        FOTO<br>SISWA
                    </div>
                @endif
            </div>

            <div class="top-info">
                <div class="field">
                    <div class="field-label">Nama Lengkap</div>
                    <div class="field-value">{{ $registration->student_name ?: '-' }}</div>
                </div>

                <div class="grid-2">
                    <div class="field">
                        <div class="field-label">NISN</div>
                        <div class="field-value">{{ $registration->nisn ?: '-' }}</div>
                    </div>

                    <div class="field">
                        <div class="field-label">Jenis Kelamin</div>
                        <div class="field-value">{{ $registration->gender ?: '-' }}</div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="section-title">A. Data Calon Peserta Didik</div>

            <div class="data-grid">
                <div class="field">
                    <div class="field-label">Tempat Lahir</div>
                    <div class="field-value">{{ $registration->birth_place ?: '-' }}</div>
                </div>

                <div class="field">
                    <div class="field-label">Tanggal Lahir</div>
                    <div class="field-value">
                        {{ optional($registration->birth_date)->format('d M Y') ?: '-' }}
                    </div>
                </div>

                <div class="field">
                    <div class="field-label">Agama</div>
                    <div class="field-value">{{ $registration->religion ?: '-' }}</div>
                </div>

                <div class="field">
                    <div class="field-label">Asal Sekolah</div>
                    <div class="field-value">{{ $registration->previous_school ?: '-' }}</div>
                </div>

                <div class="field full">
                    <div class="field-label">Alamat</div>
                    <div class="field-value">{{ $registration->address ?: '-' }}</div>
                </div>
            </div>
        </section>

        <section>
            <div class="section-title">B. Data Orang Tua / Wali</div>

            <div class="data-grid">
                <div class="field">
                    <div class="field-label">Nama Ayah</div>
                    <div class="field-value">{{ $registration->father_name ?: '-' }}</div>
                </div>

                <div class="field">
                    <div class="field-label">Pekerjaan Ayah</div>
                    <div class="field-value">{{ $registration->father_job ?: '-' }}</div>
                </div>

                <div class="field">
                    <div class="field-label">Nama Ibu</div>
                    <div class="field-value">{{ $registration->mother_name ?: '-' }}</div>
                </div>

                <div class="field">
                    <div class="field-label">Pekerjaan Ibu</div>
                    <div class="field-value">{{ $registration->mother_job ?: '-' }}</div>
                </div>

                <div class="field">
                    <div class="field-label">No. HP</div>
                    <div class="field-value">{{ $registration->phone ?: '-' }}</div>
                </div>

                <div class="field">
                    <div class="field-label">Email</div>
                    <div class="field-value">{{ $registration->email ?: '-' }}</div>
                </div>
            </div>
        </section>

        <section>
            <div class="section-title">C. Dokumen Persyaratan</div>

            <div class="documents">
                <div class="document-row">
                    <div class="number">1</div>
                    <div>Kartu Keluarga</div>
                    <div class="status">{{ $registration->family_card_url ? 'Terlampir' : 'Belum Ada' }}</div>
                </div>

                <div class="document-row">
                    <div class="number">2</div>
                    <div>Akta Kelahiran</div>
                    <div class="status">{{ $registration->birth_certificate_url ? 'Terlampir' : 'Belum Ada' }}</div>
                </div>

                <div class="document-row">
                    <div class="number">3</div>
                    <div>Sertifikat / Piagam</div>
                    <div class="status">{{ $registration->certificate_url ? 'Terlampir' : 'Belum Ada' }}</div>
                </div>

                <div class="document-row">
                    <div class="number">4</div>
                    <div>Rapor</div>
                    <div class="status">{{ $registration->report_card_url ? 'Terlampir' : 'Belum Ada' }}</div>
                </div>

                <div class="document-row">
                    <div class="number">5</div>
                    <div>Pas Foto</div>
                    <div class="status">{{ $registration->photo_url ? 'Terlampir' : 'Belum Ada' }}</div>
                </div>
            </div>
        </section>

        <section>
            <div class="section-title">D. Pernyataan</div>

            <div class="statement">
                Dengan ini saya menyatakan bahwa data yang diisi pada formulir pendaftaran
                peserta didik baru ini adalah benar dan dapat dipertanggungjawabkan.
                Apabila di kemudian hari terdapat data yang tidak sesuai, maka saya bersedia
                mengikuti ketentuan yang berlaku di sekolah.
            </div>
        </section>

        <section class="signatures">
            <div>
                <div class="signature-date">
                    Orang Tua / Wali
                </div>

                <div class="signature-space"></div>

                <div class="signature-title">
                    Orang Tua / Wali
                </div>
            </div>

            <div>
                <div class="signature-date">
                    Panitia PPDB
                </div>

                <div class="signature-space">
                    @if ($setting?->committee_signature_url)
                        <img src="{{ $setting->committee_signature_url }}" alt="Tanda Tangan Panitia">
                    @endif
                </div>

                <div class="signature-name">
                    {{ $setting?->committee_name ?: 'Panitia PPDB' }}
                </div>

                <div class="signature-title">
                    {{ $setting?->committee_position ?: 'Ketua Panitia PPDB' }}
                </div>
            </div>
        </section>

        <div class="footer-note">
            Dokumen ini dicetak melalui sistem PPDB online.
            Simpan bukti pendaftaran ini sebagai arsip peserta didik baru.
        </div>
    </main>
</body>
</html>