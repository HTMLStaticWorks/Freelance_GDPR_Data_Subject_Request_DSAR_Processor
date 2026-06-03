$dir = "d:\April Websites\Freelance GDPR Data Subject Request (DSAR) Processor"
$files = Get-ChildItem -Path $dir -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content

    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "\bWe\b", "I")
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "\bwe\b", "I")
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "\bOur\b", "My")
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "\bour\b", "my")
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "\bUs\b", "Me")
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "\bus\b", "me")
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "\bOurs\b", "Mine")
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "\bours\b", "mine")

    if ($content -cne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $($file.Name)"
    }
}
Write-Host "Done"
