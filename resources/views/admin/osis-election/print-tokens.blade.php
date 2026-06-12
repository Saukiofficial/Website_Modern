<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Cetak Token Pemilih OSIS</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 24px;
            font-family: Arial, Helvetica, sans-serif;
            background: #f3f6fb;
            color: #061b46;
        }

        .toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 20px;
            padding: 16px 20px;
            border-radius: 18px;
            background: #ffffff;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
        }

        .toolbar h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
        }

        .toolbar p {
            margin: 6px 0 0;
            font-size: 13px;
            color: #64748b;
        }

        .btn-print {
            border: none;
            border-radius: 14px;
            background: #061b46;
            color: #ffffff;
            padding: 12px 18px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            cursor: pointer;
        }

        .sheet {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
        }

        .token-card {
            position: relative;
            overflow: hidden;
            min-height: 195px;
            border: 1px solid #dbe4f0;
            border-radius: 18px;
            background: #ffffff;
            page-break-inside: avoid;
        }

        .token-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 9px;
            height: 100%;
            background: #061b46;
        }

        .token-inner {
            padding: 18px 18px 18px 28px;
        }

        .badge {
            display: inline-block;
            margin-bottom: 12px;
            padding: 6px 10px;
            border-radius: 999px;
            background: #fff3d6;
            color: #8a5a00;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
        }

        .title {
            margin: 0;
            font-size: 17px;
            font-weight: 700;
            line-height: 1.25;
            color: #061b46;
        }

        .subtitle {
            margin: 6px 0 0;
            font-size: 12px;
            line-height: 1.5;
            color: #64748b;
        }

        .student-box {
            margin-top: 14px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .info {
            padding: 9px 10px;
            border-radius: 12px;
            background: #f8fafc;
        }

        .info label {
            display: block;
            margin-bottom: 4px;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #94a3b8;
        }

        .info span {
            display: block;
            font-size: 12px;
            font-weight: 700;
            color: #061b46;
            word-break: break-word;
        }

        .token-box {
            margin-top: 12px;
            padding: 13px 14px;
            border: 1px dashed #0b3b85;
            border-radius: 14px;
            background: #f0f6ff;
            text-align: center;
        }

        .token-box label {
            display: block;
            margin-bottom: 5px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #3867a6;
        }

        .token-box strong {
            display: block;
            font-family: "Courier New", Courier, monospace;
            font-size: 25px;
            letter-spacing: 0.14em;
            color: #061b46;
        }

        .footer {
            margin-top: 12px;
            padding-top: 10px;
            border-top: 1px solid #e2e8f0;
            font-size: 10.5px;
            line-height: 1.5;
            color: #64748b;
        }

        .footer strong {
            color: #061b46;
        }

        .empty {
            padding: 40px;
            border-radius: 20px;
            background: #ffffff;
            text-align: center;
            color: #64748b;
        }

        @page {
            size: A4;
            margin: 10mm;
        }

        @media print {
            body {
                padding: 0;
                background: #ffffff;
            }

            .toolbar {
                display: none;
            }

            .sheet {
                gap: 8mm;
            }

            .token-card {
                box-shadow: none;
                border-color: #cbd5e1;
            }
        }
    </style>
</head>
<body>
    <div class="toolbar">
        <div>
            <h1>Cetak Token Pemilih OSIS</h1>
            <p>
                Periode: <strong>{{ $period->title }}</strong>
                |
                Tahun Ajaran: <strong>{{ $period->academic_year ?: '-' }}</strong>
                |
                Dicetak: <strong>{{ $printedAt }}</strong>
            </p>
        </div>

        <button type="button" onclick="window.print()" class="btn-print">
            Cetak Token
        </button>
    </div>

    @if ($voters->count() > 0)
        <div class="sheet">
            @foreach ($voters as $voter)
                <div class="token-card">
                    <div class="token-inner">
                        <span class="badge">Token Voting OSIS</span>

                        <h2 class="title">
                            {{ $period->title }}
                        </h2>

                        <p class="subtitle">
                            Gunakan NISN dan token berikut untuk melakukan voting Ketua OSIS.
                        </p>

                        <div class="student-box">
                            <div class="info">
                                <label>Nama</label>
                                <span>{{ $voter->student?->name ?: '-' }}</span>
                            </div>

                            <div class="info">
                                <label>Kelas</label>
                                <span>{{ $voter->student?->class_label ?: '-' }}</span>
                            </div>

                            <div class="info">
                                <label>NISN</label>
                                <span>{{ $voter->student?->nisn ?: '-' }}</span>
                            </div>

                            <div class="info">
                                <label>No Induk</label>
                                <span>{{ $voter->student?->student_number ?: '-' }}</span>
                            </div>
                        </div>

                        <div class="token-box">
                            <label>Token Voting</label>
                            <strong>{{ $voter->token ?: '-' }}</strong>
                        </div>

                        <div class="footer">
                            Link voting:
                            <strong>{{ $votingUrl }}</strong>
                            <br>
                            Token hanya dapat digunakan satu kali. Jangan diberikan kepada siswa lain.
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @else
        <div class="empty">
            <h2>Belum ada data pemilih.</h2>
            <p>Silakan klik tombol Generate Pemilih di admin OSIS terlebih dahulu.</p>
        </div>
    @endif
</body>
</html>