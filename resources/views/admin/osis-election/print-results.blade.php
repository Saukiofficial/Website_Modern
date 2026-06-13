<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Hasil Pemilihan Ketua OSIS</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 24px;
            font-family: Arial, Helvetica, sans-serif;
            background: #f3f6fb;
            color: #111827;
        }

        .toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 18px;
            padding: 16px 20px;
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
        }

        .toolbar h1 {
            margin: 0;
            font-size: 20px;
            color: #061b46;
        }

        .toolbar p {
            margin: 5px 0 0;
            font-size: 12px;
            color: #64748b;
        }

        .btn-print {
            border: none;
            border-radius: 12px;
            background: #061b46;
            color: #ffffff;
            padding: 12px 18px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            cursor: pointer;
        }

        .paper {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            padding: 34px;
            background: #ffffff;
            border-radius: 14px;
            box-shadow: 0 12px 40px rgba(15, 23, 42, 0.10);
        }

        .kop {
            text-align: center;
            border-bottom: 4px double #061b46;
            padding-bottom: 18px;
            margin-bottom: 24px;
        }

        .kop .small {
            margin: 0;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #d59a25;
        }

        .kop h1 {
            margin: 8px 0 0;
            font-size: 25px;
            line-height: 1.25;
            color: #061b46;
            text-transform: uppercase;
        }

        .kop h2 {
            margin: 6px 0 0;
            font-size: 17px;
            color: #1e293b;
            text-transform: uppercase;
        }

        .kop p {
            margin: 8px 0 0;
            font-size: 12px;
            color: #64748b;
        }

        .section-title {
            margin: 24px 0 12px;
            padding: 10px 14px;
            background: #061b46;
            color: #ffffff;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .info-grid {
            display: grid;
            grid-template-columns: 180px 1fr;
            gap: 8px 14px;
            margin-bottom: 12px;
            font-size: 13px;
        }

        .info-label {
            font-weight: 700;
            color: #334155;
        }

        .info-value {
            color: #111827;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin: 16px 0 18px;
        }

        .summary-card {
            border: 1px solid #dbe4f0;
            border-radius: 12px;
            padding: 12px;
            background: #f8fafc;
            text-align: center;
        }

        .summary-card label {
            display: block;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.10em;
            text-transform: uppercase;
            color: #64748b;
        }

        .summary-card strong {
            display: block;
            margin-top: 8px;
            font-size: 24px;
            color: #061b46;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
            font-size: 12px;
        }

        th {
            background: #061b46;
            color: #ffffff;
            padding: 10px 8px;
            border: 1px solid #061b46;
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.06em;
        }

        td {
            padding: 10px 8px;
            border: 1px solid #cbd5e1;
            vertical-align: top;
            color: #111827;
        }

        tr:nth-child(even) td {
            background: #f8fafc;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .winner-box {
            margin-top: 16px;
            padding: 18px;
            border: 1px solid #f7c46a;
            border-radius: 14px;
            background: #fff8e8;
        }

        .winner-box .label {
            margin: 0;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #8a5a00;
        }

        .winner-box h3 {
            margin: 8px 0 0;
            font-size: 22px;
            color: #061b46;
        }

        .winner-box p {
            margin: 6px 0 0;
            font-size: 13px;
            color: #475569;
        }

        .note {
            margin-top: 18px;
            padding: 14px;
            border-radius: 12px;
            background: #f8fafc;
            font-size: 12px;
            line-height: 1.7;
            color: #475569;
        }

        .signature {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 42px;
            margin-top: 44px;
            font-size: 13px;
        }

        .signature-box {
            text-align: center;
        }

        .signature-box p {
            margin: 0;
            line-height: 1.6;
        }

        .signature-space {
            height: 76px;
        }

        .signature-name {
            display: inline-block;
            min-width: 190px;
            border-bottom: 1px solid #111827;
            padding-bottom: 3px;
            font-weight: 700;
        }

        .footer-print {
            margin-top: 28px;
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
            font-size: 10.5px;
            color: #64748b;
            text-align: center;
        }

        @page {
            size: A4;
            margin: 12mm;
        }

        @media print {
            body {
                padding: 0;
                background: #ffffff;
            }

            .toolbar {
                display: none;
            }

            .paper {
                max-width: none;
                box-shadow: none;
                border-radius: 0;
                padding: 0;
            }

            .section-title {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            th {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            .summary-card,
            .winner-box,
            .note {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="toolbar">
        <div>
            <h1>Laporan Hasil Pemilihan Ketua OSIS</h1>
            <p>
                Periode: <strong>{{ $period->title }}</strong>
                |
                Dicetak: <strong>{{ $printedAt }}</strong>
            </p>
        </div>

        <button type="button" onclick="window.print()" class="btn-print">
            Cetak Laporan
        </button>
    </div>

    <div class="paper">
        <div class="kop">
            <p class="small">Laporan Resmi</p>
            <h1>Hasil Pemilihan Ketua OSIS</h1>
            <h2>{{ $period->title }}</h2>
            <p>
                Tahun Ajaran {{ $period->academic_year ?: '-' }}
                |
                Dicetak pada {{ $printedAt }}
            </p>
        </div>

        <div class="section-title">A. Informasi Pemilihan</div>

        <div class="info-grid">
            <div class="info-label">Nama Pemilihan</div>
            <div class="info-value">: {{ $period->title }}</div>

            <div class="info-label">Tahun Ajaran</div>
            <div class="info-value">: {{ $period->academic_year ?: '-' }}</div>

            <div class="info-label">Waktu Mulai</div>
            <div class="info-value">: {{ $period->start_at ? $period->start_at->format('d/m/Y H:i') : '-' }}</div>

            <div class="info-label">Waktu Selesai</div>
            <div class="info-value">: {{ $period->end_at ? $period->end_at->format('d/m/Y H:i') : '-' }}</div>

            <div class="info-label">Status Periode</div>
            <div class="info-value">: {{ $period->is_active ? 'Aktif' : 'Nonaktif' }}</div>

            <div class="info-label">Mode Voting</div>
            <div class="info-value">: {{ $period->is_secret_vote ? 'Rahasia' : 'Terbuka' }}</div>
        </div>

        @if ($period->description)
            <div class="note">
                <strong>Deskripsi:</strong><br>
                {{ $period->description }}
            </div>
        @endif

        <div class="section-title">B. Rekapitulasi</div>

        <div class="summary-grid">
            <div class="summary-card">
                <label>Kandidat</label>
                <strong>{{ $summary['total_candidates'] }}</strong>
            </div>

            <div class="summary-card">
                <label>Pemilih</label>
                <strong>{{ $summary['total_voters'] }}</strong>
            </div>

            <div class="summary-card">
                <label>Sudah Memilih</label>
                <strong>{{ $summary['total_voted'] }}</strong>
            </div>

            <div class="summary-card">
                <label>Belum Memilih</label>
                <strong>{{ $summary['total_not_voted'] }}</strong>
            </div>

            <div class="summary-card">
                <label>Total Suara</label>
                <strong>{{ $summary['total_votes'] }}</strong>
            </div>
        </div>

        <div class="section-title">C. Hasil Perolehan Suara</div>

        <table>
            <thead>
                <tr>
                    <th style="width: 60px;" class="text-center">No Urut</th>
                    <th>Nama Kandidat</th>
                    <th style="width: 120px;">Kelas</th>
                    <th style="width: 130px;" class="text-center">Jumlah Suara</th>
                    <th style="width: 120px;" class="text-center">Persentase</th>
                    <th style="width: 90px;" class="text-center">Peringkat</th>
                </tr>
            </thead>

            <tbody>
                @forelse ($results as $index => $result)
                    <tr>
                        <td class="text-center">{{ $result['candidate_number'] ?: '-' }}</td>
                        <td>{{ $result['name'] ?: '-' }}</td>
                        <td>{{ $result['class_label'] ?: '-' }}</td>
                        <td class="text-center">{{ $result['votes_count'] }}</td>
                        <td class="text-center">{{ $result['percentage'] }}%</td>
                        <td class="text-center">{{ $index + 1 }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="text-center">
                            Belum ada data hasil suara.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        @if ($winner && ($winner['votes_count'] ?? 0) > 0)
            <div class="winner-box">
                <p class="label">Kandidat dengan suara terbanyak</p>
                <h3>
                    No. {{ $winner['candidate_number'] ?: '-' }} -
                    {{ $winner['name'] ?: '-' }}
                </h3>
                <p>
                    Kelas {{ $winner['class_label'] ?: '-' }}
                    |
                    {{ $winner['votes_count'] }} suara
                    |
                    {{ $winner['percentage'] }}%
                </p>
            </div>
        @endif

        <div class="note">
            Berdasarkan hasil rekapitulasi suara pada sistem e-voting, laporan ini dibuat sebagai dokumen hasil pemilihan Ketua OSIS.
            Data suara yang tercantum merupakan hasil yang tersimpan pada sistem sampai waktu pencetakan laporan.
        </div>

        <div class="signature">
            <div class="signature-box">
                <p>Mengetahui,</p>
                <p>Kepala Sekolah</p>

                <div class="signature-space"></div>

                <p>
                    <span class="signature-name">................................</span>
                </p>
                <p>NIP. ................................</p>
            </div>

            <div class="signature-box">
                <p>{{ now()->format('d F Y') }}</p>
                <p>Panitia Pemilihan OSIS</p>

                <div class="signature-space"></div>

                <p>
                    <span class="signature-name">................................</span>
                </p>
                <p>Ketua Panitia</p>
            </div>
        </div>

        <div class="footer-print">
            Dokumen ini dicetak otomatis dari sistem website sekolah pada {{ $printedAt }}.
        </div>
    </div>
</body>
</html>