param(
    [string]$FtpHost = "ftp.example.com",
    [string]$FtpUser = "user@example.com",
    [string]$FtpPass = "",
    [string]$RemotePath = "/public_html/public/build"
)

Write-Host "=== Build asset ===" -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build gagal!" -ForegroundColor Red
    exit 1
}

Write-Host "=== Upload public/build ke hosting ===" -ForegroundColor Cyan
try {
    $webclient = New-Object System.Net.WebClient
    $webclient.Credentials = New-Object System.Net.NetworkCredential($FtpUser, $FtpPass)

    $localPath = "public/build"
    $files = Get-ChildItem -Path $localPath -Recurse -File

    foreach ($file in $files) {
        $relative = $file.FullName.Substring((Get-Item $localPath).FullName.Length + 1)
        $remoteFile = "$RemotePath/$($relative -replace '\\', '/')"
        $remoteDir = [System.IO.Path]::GetDirectoryName($remoteFile)

        $dirs = $remoteDir.Split('/')
        $current = ""
        foreach ($dir in $dirs) {
            $current += "/$dir"
            try {
                $webclient.UploadString("ftp://$FtpHost$current/", "")
            } catch { }
        }

        Write-Host "  Upload $relative" -ForegroundColor Gray
        $webclient.UploadFile("ftp://$FtpHost/$remoteFile", "STOR", $file.FullName)
    }

    $webclient.Dispose()
    Write-Host "Upload selesai!" -ForegroundColor Green
}
catch {
    Write-Host "Upload gagal: $_" -ForegroundColor Red
}
