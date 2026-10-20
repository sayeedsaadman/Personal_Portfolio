Add-Type -AssemblyName System.Drawing
$preview = New-Object System.Drawing.Bitmap 1200,630
$drawing = [System.Drawing.Graphics]::FromImage($preview)
$drawing.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$drawing.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$drawing.Clear([System.Drawing.ColorTranslator]::FromHtml('#080e19'))
$cyan = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#6be4ec'))
$white = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#edf2f8'))
$muted = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#91a5b6'))
$line = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml('#254454')),2
$thin = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml('#16303f')),1
$small = New-Object System.Drawing.Font 'Consolas',14
$name = New-Object System.Drawing.Font 'Segoe UI',65,([System.Drawing.FontStyle]::Bold)
$sub = New-Object System.Drawing.Font 'Segoe UI',21
for ($i=0; $i -lt 12; $i++) { $drawing.DrawLine($thin,750,70+$i*40,1150,70+$i*40) }
$drawing.DrawString('SAAD',$small,$cyan,65,65)
$drawing.DrawString('MUHAMMAD SAYEED',$sub,$muted,65,155)
$drawing.DrawString('Sadman Saad.',$name,$white,60,195)
$drawing.DrawString('IT Support Coordinator | Techvue360',$sub,$muted,65,325)
$drawing.DrawString('Software, research & technical work.',$sub,$white,65,405)
$drawing.DrawString('Explore my portfolio.',$sub,$cyan,65,445)
$drawing.DrawLine($line,65,550,1135,550)
$drawing.DrawString('CH ATTOGRAM, BANGLADESH'.Replace('CH AT','CHAT'),$small,$muted,65,573)
$drawing.DrawRectangle($line,850,165,220,220)
$drawing.DrawRectangle($line,880,195,160,160)
$drawing.FillRectangle($cyan,930,245,60,60)
for ($i=0; $i -lt 6; $i++) {
  $drawing.DrawLine($line,820,185+$i*35,850,185+$i*35)
  $drawing.DrawLine($line,1070,185+$i*35,1100,185+$i*35)
}
$output = Join-Path (Split-Path $PSScriptRoot -Parent) 'public\social-preview.png'
$preview.Save($output,[System.Drawing.Imaging.ImageFormat]::Png)
$drawing.Dispose()
$preview.Dispose()
$cyan.Dispose(); $white.Dispose(); $muted.Dispose(); $line.Dispose(); $thin.Dispose()
$small.Dispose(); $name.Dispose(); $sub.Dispose()
Write-Output "Created $output"

