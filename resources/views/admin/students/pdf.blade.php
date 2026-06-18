<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Siswa</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: #111827;
            background: #ffffff;
            font-size: 11px;
        }

        @page {
            size: A4 landscape;
            margin: 10mm 9mm;
        }

        .kop {
            width: 100%;
            text-align: center;
            border-bottom: 4px double #061b46;
            padding-bottom: 12px;
            margin-bottom: 16px;
        }

        .kop-small {
            margin: 0;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #d59a25;
        }

        .kop-title {
            margin: 6px 0 0;
            font-size: 22px;
            line-height: 1.2;
            color: #061b46;
            text-transform: uppercase;
            font-weight: 800;
        }

        .kop-subtitle {
            margin: 5px 0 0;
            font-size: 15px;
            color: #1e293b;
            text-transform: uppercase;
            font-weight: 700;
        }

        .kop-info {
            margin: 6px 0 0;
            font-size: 10.5px;
            color: #64748b;
            line-height: 1.5;
        }

        .document-title {
            margin: 0 0 12px;
            padding: 9px 12px;
            background: #061b46;
            color: #ffffff;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            text-align: center;
        }

        .meta-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 14px;
            font-size: 10.5px;
        }

        .meta-table td {
            border: 1px solid #cbd5e1;
            padding: 7px 8px;
            vertical-align: top;
        }

        .meta-label {
            width: 130px;
            background: #f8fafc;
            color: #334155;
            font-weight: 700;
        }

        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 14px;
        }

        .summary-table td {
            width: 20%;
            border: 1px solid #dbe4f0;
            padding: 10px;
            text-align: center;
            background: #f8fafc;
        }

        .summary-table label {
            display: block;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #64748b;
        }

        .summary-table strong {
            display: block;
            margin-top: 6px;
            font-size: 20px;
            color: #061b46;
        }

        table.data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9.5px;
        }

        .data-table th {
            background: #061b46;
            color: #ffffff;
            padding: 8px 6px;
            border: 1px solid #061b46;
            text-align: left;
            font-size: 8.5px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }

        .data-table td {
            padding: 7px 6px;
            border: 1px solid #cbd5e1;
            vertical-align: top;
            color: #111827;
            line-height: 1.35;
        }

        .data-table tr:nth-child(even) td {
            background: #f8fafc;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .badge {
            display: inline-block;
            border-radius: 999px;
            padding: 3px 7px;
            font-size: 8.5px;
            font-weight: 700;
            text-transform: uppercase;
        }

        .badge-active {
            background: #ecfdf5;
            color: #047857;
            border: 1px solid #a7f3d0;
        }

        .badge-inactive {
            background: #fef2f2;
            color: #b91c1c;
            border: 1px solid #fecaca;
        }

        .signature {
            width: 100%;
            margin-top: 28px;
            font-size: 11px;
        }

        .signature td {
            width: 50%;
            text-align: center;
            vertical-align: top;
        }

        .signature-space {
            height: 58px;
        }

        .signature-name {
            display: inline-block;
            min-width: 180px;
            border-bottom: 1px solid #111827;
            padding-bottom: 3px;
            font-weight: 700;
        }

        .footer-print {
            margin-top: 20px;
            border-top: 1px solid #e2e8f0;
            padding-top: 9px;
            font-size: 9px;
            color: #64748b;
            text-align: center;
        }

        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    @php
        $printedAt = $printedAt ?? now()->format('d/m/Y H:i');
        $schoolName = $schoolName ?? ($schoolSetting->school_name ?? config('app.name', 'Nama Sekolah'));
        $schoolAddress = $schoolAddress ?? ($schoolSetting->address ?? 'Alamat sekolah belum diatur');
        $schoolWebsite = $schoolWebsite ?? ($schoolSetting->website ?? '-');
        $schoolEmail = $schoolEmail ?? ($schoolSetting->email ?? '-');
        $filterSearch = $filters['search'] ?? request('search', '-');
        $filterClass = $filters['class_name'] ?? request('class_name', 'all');
        $filterStatus = $filters['status'] ?? request('status', 'all');
        $rows = collect($students ?? []);
        $totalActive = $summary['active'] ?? $rows->where('is_active', true)->count();
        $totalInactive = $summary['inactive'] ?? $rows->where('is_active', false)->count();
    @endphp

    <div class="kop">
        <p class="kop-small">Laporan Resmi Sekolah</p>
        <h1 class="kop-title">{{ $schoolName }}</h1>
        <h2 class="kop-subtitle">Data Siswa</h2>
        <p class="kop-info">
            {{ $schoolAddress }}<br>
            Website: {{ $schoolWebsite }} | Email: {{ $schoolEmail }} | Dicetak pada {{ $printedAt }}
        </p>
    </div>

    <div class="document-title">Laporan Data Siswa</div>

    <table class="meta-table">
        <tr>
            <td class="meta-label">Pencarian</td>
            <td>{{ $filterSearch ?: '-' }}</td>
            <td class="meta-label">Filter Kelas</td>
            <td>{{ $filterClass === 'all' || ! $filterClass ? 'Semua Kelas' : $filterClass }}</td>
        </tr>
        <tr>
            <td class="meta-label">Filter Status</td>
            <td>
                @if ($filterStatus === 'all' || ! $filterStatus)
                    Semua Status
                @elseif ($filterStatus === 'active')
                    Aktif
                @else
                    Nonaktif
                @endif
            </td>
            <td class="meta-label">Tanggal Cetak</td>
            <td>{{ $printedAt }}</td>
        </tr>
    </table>

    <table class="summary-table">
        <tr>
            <td>
                <label>Total Data</label>
                <strong>{{ $summary['total'] ?? $rows->count() }}</strong>
            </td>
            <td>
                <label>Siswa Aktif</label>
                <strong>{{ $totalActive }}</strong>
            </td>
            <td>
                <label>Nonaktif</label>
                <strong>{{ $totalInactive }}</strong>
            </td>
            <td>
                <label>Kelas 10</label>
                <strong>{{ $summary['class_10'] ?? $rows->where('class_level', '10')->count() }}</strong>
            </td>
            <td>
                <label>Kelas 11/12</label>
                <strong>{{ ($summary['class_11'] ?? $rows->where('class_level', '11')->count()) + ($summary['class_12'] ?? $rows->where('class_level', '12')->count()) }}</strong>
            </td>
        </tr>
    </table>

    <table class="data-table">
        <thead>
            <tr>
                <th style="width: 34px;" class="text-center">No</th>
                <th style="width: 95px;">No Induk</th>
                <th style="width: 95px;">NISN</th>
                <th>Nama Siswa</th>
                <th style="width: 80px;">JK</th>
                <th style="width: 70px;">Kelas</th>
                <th style="width: 105px;">No HP</th>
                <th style="width: 135px;">Email</th>
                <th style="width: 105px;">Token Voting</th>
                <th style="width: 75px;" class="text-center">Status</th>
            </tr>
        </thead>

        <tbody>
            @forelse ($rows as $index => $student)
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td>{{ data_get($student, 'student_number') ?: '-' }}</td>
                    <td>{{ data_get($student, 'nisn') ?: '-' }}</td>
                    <td>{{ data_get($student, 'name') ?: '-' }}</td>
                    <td>{{ data_get($student, 'gender') ?: '-' }}</td>
                    <td>{{ data_get($student, 'class_label') ?: trim((data_get($student, 'class_level') ?: '-') . ' ' . (data_get($student, 'class_name') ?: '')) }}</td>
                    <td>{{ data_get($student, 'phone') ?: '-' }}</td>
                    <td>{{ data_get($student, 'email') ?: '-' }}</td>
                    <td>{{ data_get($student, 'voting_token') ?: '-' }}</td>
                    <td class="text-center">
                        @if (data_get($student, 'is_active'))
                            <span class="badge badge-active">Aktif</span>
                        @else
                            <span class="badge badge-inactive">Nonaktif</span>
                        @endif
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="10" class="text-center">Belum ada data siswa.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <table class="signature">
        <tr>
            <td>
                <p>Mengetahui,</p>
                <p>Kepala Sekolah</p>
                <div class="signature-space"></div>
                <p><span class="signature-name">................................</span></p>
                <p>NIP. ................................</p>
            </td>
            <td>
                <p>{{ now()->format('d F Y') }}</p>
                <p>Operator / Admin Sekolah</p>
                <div class="signature-space"></div>
                <p><span class="signature-name">................................</span></p>
                <p>Petugas Data Siswa</p>
            </td>
        </tr>
    </table>

    <div class="footer-print">
        Dokumen ini dicetak otomatis dari sistem website sekolah pada {{ $printedAt }}.
    </div>
</body>
</html>
