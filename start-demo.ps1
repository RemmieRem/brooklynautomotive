# Start een eenvoudige lokale webserver voor de demo-website.
# Gebruik: rechtermuisknop > "Uitvoeren met PowerShell", of in een terminal:  powershell -ExecutionPolicy Bypass -File start-demo.ps1
# Daarna opent de site op http://localhost:8080 . Stoppen met Ctrl+C.

param([int]$Poort = 8080, [switch]$GeenBrowser)

$root = $PSScriptRoot
$types = @{
  ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8"; ".js" = "text/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"; ".png" = "image/png"; ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"
  ".svg" = "image/svg+xml"; ".webp" = "image/webp"; ".ico" = "image/x-icon"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Poort/")
try {
  $listener.Start()
} catch {
  # Poort al bezet: meestal draait de demo nog in een ander venster
  Write-Host "Poort $Poort is al in gebruik; de demo draait waarschijnlijk al. Open http://localhost:$Poort"
  if (-not $GeenBrowser) { Start-Process "http://localhost:$Poort/" }
  exit
}
Write-Host "Demo draait op http://localhost:$Poort  (stoppen met Ctrl+C)"
if (-not $GeenBrowser) { Start-Process "http://localhost:$Poort/" }

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $pad = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath).TrimStart("/")
    if ($pad -eq "") { $pad = "index.html" }
    $bestand = [System.IO.Path]::GetFullPath((Join-Path $root $pad))
    $antwoord = $context.Response

    if ($bestand.StartsWith($root) -and (Test-Path $bestand -PathType Leaf)) {
      $ext = [System.IO.Path]::GetExtension($bestand).ToLower()
      $antwoord.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($bestand)
      $antwoord.ContentLength64 = $bytes.Length
      $antwoord.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $antwoord.StatusCode = 404
    }
    $antwoord.Close()
  }
} finally {
  $listener.Stop()
}
