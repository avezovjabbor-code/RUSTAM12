# FC Mobile 25 - Oddiy Mahalliy Veb-Server (PowerShell)
$port = 8080
$path = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "===================================================" -ForegroundColor Green
Write-Host " FC Mobile 25 Veb-Server ishga tushdi!" -ForegroundColor Yellow
Write-Host " Manzil: http://localhost:$port" -ForegroundColor Cyan
Write-Host " To'xtatish uchun: Ctrl + C bosing" -ForegroundColor Gray
Write-Host "===================================================" -ForegroundColor Green

Start-Process "http://localhost:$port/index.html"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $localPath = Join-Path $path $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($request.Url.LocalPath.TrimStart('/'))) {
        $localPath = Join-Path $path "index.html"
    }

    if (Test-Path $localPath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($localPath)
        $ext = [System.IO.Path]::GetExtension($localPath).ToLower()

        switch ($ext) {
            ".html" { $response.ContentType = "text/html; charset=utf-8" }
            ".css"  { $response.ContentType = "text/css" }
            ".js"   { $response.ContentType = "application/javascript" }
            ".json" { $response.ContentType = "application/json" }
            ".svg"  { $response.ContentType = "image/svg+xml" }
            Default { $response.ContentType = "application/octet-stream" }
        }

        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
        $notFound = [System.Text.Encoding]::UTF8.GetBytes("Fayl topilmadi")
        $response.OutputStream.Write($notFound, 0, $notFound.Length)
    }
    $response.OutputStream.Close()
}
