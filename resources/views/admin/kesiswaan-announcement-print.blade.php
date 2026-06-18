<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengumuman Kesiswaan - {{ $registration->student_name }}</title>
    <style>
        body { font-family: DejaVu Sans, Arial, sans-serif; color: #111827; margin: 40px; }
        .header { text-align: center; border-bottom: 3px solid #061b46; padding-bottom: 16px; margin-bottom: 28px; }
        .header h1 { margin: 0; font-size: 20px; color: #061b46; text-transform: uppercase; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #4b5563; }
        .status { text-align: center; border: 2px solid #061b46; padding: 18px; margin: 24px 0; }
        .status h2 { margin: 0; font-size: 28px; color: #061b46; letter-spacing: 1px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        td { border: 1px solid #d1d5db; padding: 10px; font-size: 13px; vertical-align: top; }
        td:first-child { width: 34%; font-weight: bold; background: #f3f4f6; }
        .message { margin-top: 22px; font-size: 14px; line-height: 1.7; }
        .note { margin-top: 18px; padding: 14px; background: #f9fafb; border: 1px solid #e5e7eb; font-size: 13px; line-height: 1.6; }
        .footer { margin-top: 60px; display: flex; justify-content: flex-end; }
        .signature { width: 260px; text-align: center; font-size: 13px; }
        .signature .space { height: 70px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Pengumuman Pendaftaran Kesiswaan</h1>
        <p>OSIS, Ekstrakurikuler, dan Program Kesiswaan Sekolah</p>
    </div>

    <div class="status">
        <p>Status Pendaftaran</p>
        <h2>{{ $statusLabel }}</h2>
    </div>

    <p class="message">{{ $message }}</p>

    <table>
        <tr><td>Nomor Pendaftaran</td><td>{{ $registration->registration_number ?: '-' }}</td></tr>
        <tr><td>Nama Lengkap</td><td>{{ $registration->student_name ?: '-' }}</td></tr>
        <tr><td>NISN</td><td>{{ $registration->nisn ?: '-' }}</td></tr>
        <tr><td>Kelas</td><td>{{ $registration->class_name ?: '-' }}</td></tr>
        <tr><td>Jenis Pendaftaran</td><td>{{ $registration->type_label ?: '-' }}</td></tr>
        <tr><td>Program Dipilih</td><td>{{ $registration->program_title ?: '-' }}</td></tr>
        <tr><td>Jabatan / Posisi</td><td>{{ $registration->approved_role ?: '-' }}</td></tr>
        <tr><td>Tanggal Daftar</td><td>{{ optional($registration->submitted_at)->format('d/m/Y H:i') ?: '-' }}</td></tr>
        <tr><td>Tanggal Pengumuman</td><td>{{ optional($registration->announced_at)->format('d/m/Y H:i') ?: '-' }}</td></tr>
    </table>

    @if($registration->admin_note)
        <div class="note">
            <strong>Catatan Admin:</strong><br>
            {{ $registration->admin_note }}
        </div>
    @endif

    <div class="footer">
        <div class="signature">
            <p>Panitia Kesiswaan</p>
            <div class="space"></div>
            <p><strong>Admin Sekolah</strong></p>
        </div>
    </div>
</body>
</html>
