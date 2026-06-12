<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Pendaftar PPDB</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            color: #111827;
            font-family: DejaVu Sans, Arial, sans-serif;
            font-size: 10px;
        }

        .header {
            border-bottom: 3px solid #061b46;
            padding-bottom: 12px;
            margin-bottom: 14px;
            position: relative;
            min-height: 76px;
        }

        .logo {
            position: absolute;
            left: 0;
            top: 0;
            width: 64px;
            height: 64px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            text-align: center;
            line-height: 64px;
            font-size: 9px;
            font-weight: bold;
            color: #64748b;
        }

        .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            padding: 4px;
        }

        .kop {
            text-align: center;
            padding: 0 80px;
        }

        .kop h1 {
            margin: 0;
            color: #061b46;
            font-size: 16px;
            font-weight: 800;
            text-transform: uppercase;
        }

        .kop h2 {
            margin: 4px 0 0;
            color: #061b46;
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
        }

        .kop p {
            margin: 3px 0 0;
            color: #475569;
            font-size: 9.5px;
            line-height: 1.4;
        }

        .title {
            margin-top: 12px;
            text-align: center;
        }

        .title h3 {
            display: inline-block;
            margin: 0;
            padding-bottom: 4px;
            border-bottom: 1px solid #111827;
            color: #111827;
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
        }

        .meta {
            margin-top: 12px;
            display: table;
            width: 100%;
        }

        .meta-left,
        .meta-right {
            display: table-cell;
            width: 50%;
            vertical-align: top;
        }

        .meta p {
            margin: 0 0 4px;
            font-size: 9.5px;
        }

        .summary {
            margin-top: 12px;
            display: table;
            width: 100%;
            border-spacing: 6px 0;
        }

        .summary-card {
            display: table-cell;
            width: 20%;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 8px;
            text-align: center;
        }

        .summary-card .label {
            color: #64748b;
            font-size: 8.5px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .summary-card .value {
            margin-top: 4px;
            color: #061b46;
            font-size: 16px;
            font-weight: 900;
        }

        table {
            width: 100%;
            margin-top: 14px;
            border-collapse: collapse;
        }

        th {
            background: #061b46;
            color: #ffffff;
            border: 1px solid #061b46;
            padding: 7px 6px;
            font-size: 8px;
            font-weight: 800;
            text-transform: uppercase;
        }

        td {
            border: 1px solid #cbd5e1;
            padding: 6px;
            font-size: 8.2px;
            line-height: 1.35;
            vertical-align: top;
        }

        tr:nth-child(even) td {
            background: #f8fafc;
        }

        .status {
            font-weight: 800;
            text-transform: uppercase;
        }

        .footer {
            margin-top: 14px;
            color: #64748b;
            font-size: 8.5px;
            text-align: center;
        }
    </style>
</head>
<body>
    @php
        $formTitle = $setting?->form_title ?: 'LAPORAN DATA PENDAFTAR PPDB';
        $schoolName = $setting?->form_school_name ?: 'Nama Sekolah Belum Diatur';
        $schoolAddress = $setting?->form_address ?: 'Alamat sekolah belum diatur';
        $schoolWebsite = $setting?->form_website ?: 'Website belum diatur';
        $schoolEmail = $setting?->form_email ?: 'Email belum diatur';
    @endphp

    <header class="header">
        <div class="logo">
            @if ($setting?->form_logo_url)
                <img src="{{ public_path(str_replace('/storage/', 'storage/', $setting->form_logo_url)) }}" alt="Logo">
            @else
                LOGO
            @endif
        </div>

        <div class="kop">
            <h1>{{ $formTitle }}</h1>
            <h2>{{ $schoolName }}</h2>
            <p>{{ $schoolAddress }}</p>
            <p>Website: {{ $schoolWebsite }} | Email: {{ $schoolEmail }}</p>
        </div>
    </header>

    <section class="title">
        <h3>Laporan Data Pendaftar PPDB</h3>
    </section>

    <section class="meta">
        <div class="meta-left">
            <p><strong>Tanggal Export:</strong> {{ now()->format('d/m/Y H:i') }}</p>
            <p><strong>Status:</strong> {{ $status === 'all' ? 'Semua Status' : $status }}</p>
        </div>

        <div class="meta-right">
            <p><strong>Pencarian:</strong> {{ $search ?: '-' }}</p>
            <p><strong>Tahun Ajaran:</strong> {{ $setting?->academic_year ?: '-' }}</p>
        </div>
    </section>

    <section class="summary">
        <div class="summary-card">
            <div class="label">Total</div>
            <div class="value">{{ $summary['total'] }}</div>
        </div>
        <div class="summary-card">
            <div class="label">Baru</div>
            <div class="value">{{ $summary['baru'] }}</div>
        </div>
        <div class="summary-card">
            <div class="label">Diproses</div>
            <div class="value">{{ $summary['diproses'] }}</div>
        </div>
        <div class="summary-card">
            <div class="label">Diterima</div>
            <div class="value">{{ $summary['diterima'] }}</div>
        </div>
        <div class="summary-card">
            <div class="label">Ditolak</div>
            <div class="value">{{ $summary['ditolak'] }}</div>
        </div>
    </section>

    <table>
        <thead>
            <tr>
                <th style="width: 28px;">No</th>
                <th>No. Daftar</th>
                <th>Nama</th>
                <th>NISN</th>
                <th>JK</th>
                <th>Asal Sekolah</th>
                <th>Kontak</th>
                <th>Status</th>
                <th>Tgl Daftar</th>
                <th>Catatan</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($registrations as $index => $registration)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $registration->registration_number ?: '-' }}</td>
                    <td>{{ $registration->student_name ?: '-' }}</td>
                    <td>{{ $registration->nisn ?: '-' }}</td>
                    <td>{{ $registration->gender ?: '-' }}</td>
                    <td>{{ $registration->previous_school ?: '-' }}</td>
                    <td>
                        HP: {{ $registration->phone ?: '-' }}<br>
                        Email: {{ $registration->email ?: '-' }}
                    </td>
                    <td class="status">{{ $registration->status ?: 'Baru' }}</td>
                    <td>{{ optional($registration->submitted_at)->format('d/m/Y H:i') ?: '-' }}</td>
                    <td>{{ $registration->admin_note ?: '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="10" style="text-align: center;">
                        Tidak ada data pendaftar.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Dokumen ini dibuat otomatis melalui sistem PPDB online.
    </div>
</body>
</html>