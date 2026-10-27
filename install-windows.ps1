# Fairy Ⅲ — DSH 皮肤插件安装脚本
# 用法：
#   powershell -ExecutionPolicy Bypass -File .\install-windows.ps1
#   .\install-windows.ps1 -ProfilePath "D:\dsh\profiles\web"
#   .\install-windows.ps1 -VoiceHome "D:\FairyVoice"     # 指定语音引擎目录
#   .\install-windows.ps1 -CopyVoice                      # 把包内 voice\ 复制到本地再安装
#   .\install-windows.ps1 -Uninstall
[CmdletBinding()]
param(
  [string]$ProfilePath = '',
  [string]$TtsDir = '',
  [string]$VoiceHome = '',
  [switch]$CopyVoice,
  [switch]$Uninstall,
  [switch]$Force
)

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$srcDir = $here
$pkgName = 'dsh-fairy-zzz'

function Write-Step($msg) { Write-Host "  $msg" -ForegroundColor Cyan }
function Write-Ok($msg) { Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Warn2($msg) { Write-Host "  [!] $msg" -ForegroundColor Yellow }

Write-Host ""
Write-Host " Fairy III  ~  DSH skin installer" -ForegroundColor Blue
Write-Host " ------------------------------------------------" -ForegroundColor DarkGray

# ---------- 1. 定位 profile ----------
$profileList = @()
$base = Join-Path $env:USERPROFILE '.dsh\profiles'
if (Test-Path $base) { $profileList = @(Get-ChildItem $base -Directory | ForEach-Object { $_.FullName }) }

if (-not $ProfilePath) {
  $already = @($profileList | Where-Object { Test-Path (Join-Path $_ 'node_modules\dsh-fairy-zzz') })
  $withPatch = @($profileList | Where-Object { Test-Path (Join-Path $_ 'cordis.patch.yml') })
  if ($already.Count -ge 1) {
    $ProfilePath = $already[0]
  } elseif ($withPatch.Count -ge 1) {
    $pref = @($withPatch | Where-Object { (Split-Path $_ -Leaf) -eq 'desktop' })
    $ProfilePath = if ($pref.Count -ge 1) { $pref[0] } else { $withPatch[0] }
  } elseif ($profileList.Count -ge 1) {
    $ProfilePath = $profileList[0]
  }
}

if (-not $ProfilePath) {
  $hint = Join-Path $env:USERPROFILE ".dsh\profiles\desktop"
  throw "找不到 DSH profile。请先运行一次 DSH，或用 -ProfilePath 指定，例如 -ProfilePath $hint"
}
if (-not (Test-Path $ProfilePath)) { New-Item -ItemType Directory -Force -Path $ProfilePath | Out-Null }
$ProfilePath = (Resolve-Path $ProfilePath).Path
$patchFile = Join-Path $ProfilePath 'cordis.patch.yml'
if (-not (Test-Path $patchFile)) {
  Write-Warn2 "profile 里还没有 cordis.patch.yml，将新建"
  [System.IO.File]::WriteAllText($patchFile, "", (New-Object System.Text.UTF8Encoding($false)))
}

Write-Step "profile : $ProfilePath"

$destDir = Join-Path $ProfilePath ('node_modules\dsh-fairy-zzz')

# ---------- 2. 卸载 ----------
if ($Uninstall) {
  if (Test-Path $destDir) {
    Remove-Item $destDir -Recurse -Force
    Write-Ok "已删除插件目录"
  } else {
    Write-Warn2 "插件目录本来就不存在"
  }
  $raw = [System.IO.File]::ReadAllText($patchFile)
  $nl = if ($raw -match "`r`n") { "`r`n" } else { "`n" }
  $lines = $raw -split "`r?`n"
  $out = New-Object System.Collections.Generic.List[string]
  $skip = 0
  for ($i = 0; $i -lt $lines.Count; $i++) {
    $ln = $lines[$i]
    if ($ln -match '^\s+- id:\s*(fairy-zzz-skin|preset-fairy)\s*$') {
      $skip = 2
      while ($i + $skip -lt $lines.Count) {
        $next = $lines[$i + $skip]
        if ($next -match '^\s{4}- id:') { break }
        if ($next -match '^\S') { break }
        $skip++
      }
      $i += ($skip - 1)
      continue
    }
    $out.Add($ln)
  }
  $joined = $out -join $nl
  # 清掉因为删除条目而变空的 "- insert:" 头，避免留下 null 插入项
  $arr = $joined -split "`r?`n"
  $keep = New-Object System.Collections.Generic.List[string]
  for ($k = 0; $k -lt $arr.Count; $k++) {
    $ln2 = $arr[$k]
    if ($ln2 -match '^- insert:\s*$') {
      $nxt = ''
      for ($m = $k + 1; $m -lt $arr.Count; $m++) { if ($arr[$m].Trim() -ne "") { $nxt = $arr[$m]; break } }
      if ($nxt -eq '' -or $nxt -match '^- ') { continue }
    }
    $keep.Add($ln2)
  }
  $joined = (($keep -join $nl).TrimEnd()) + $nl
  [System.IO.File]::WriteAllText($patchFile, $joined, (New-Object System.Text.UTF8Encoding($false)))

  Write-Ok "已从 cordis.patch.yml 移除 Fairy 条目"
  Write-Host ""
  Write-Host " 请完全退出并重开 DSH。" -ForegroundColor Yellow
  return
}

# ---------- 3. 复制插件 ----------
if (-not (Test-Path $srcDir)) { throw "安装包不完整：缺少 fairy-zzz 目录" }
$parent = Split-Path -Parent $destDir
if (-not (Test-Path $parent)) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
if (Test-Path $destDir) {
  if (-not $Force) { Write-Warn2 "已存在旧版本，覆盖安装" }
  Remove-Item $destDir -Recurse -Force
}
Copy-Item $srcDir $destDir -Recurse -Force
# 安装包里不需要的运行时目录
foreach ($junk in @('cache', 'diag', 'node_modules', '.git', 'tests')) {
  $j = Join-Path $destDir $junk
  if (Test-Path $j) { Remove-Item $j -Recurse -Force }
}
Write-Ok "插件已复制到 $destDir"

# 如果这个 profile 已经按「bundle」方式装了本插件，插入段由插件自带的 cordis.patch.yml 提供，
# 这里就不要再往 profile patch 里写一遍，否则会出现两份 fairy-zzz-skin / preset-fairy。
$viaBundle = $false
$pkgFile = Join-Path $ProfilePath 'package.json'
if (Test-Path $pkgFile) {
  try {
    $pkg = Get-Content $pkgFile -Raw -Encoding UTF8 | ConvertFrom-Json
    if ($pkg.dsh -and $pkg.dsh.profile -and $pkg.dsh.profile.bundles -contains $pkgName) { $viaBundle = $true }
  } catch { $viaBundle = $false }
}

# ---------- 4. 打补丁 ----------
$raw = [System.IO.File]::ReadAllText($patchFile)
$nl = if ($raw -match "`r`n") { "`r`n" } else { "`n" }
$changed = $false

# 空的 patch 也可能是 "[]"（空数组写法），统一视作空文件再追加
if ($raw.Trim() -eq '[]') { $raw = ''; $changed = $true }

$bundlePatch = Join-Path $srcDir 'cordis.patch.yml'
if (-not (Test-Path $bundlePatch)) { throw '安装包不完整：缺少 cordis.patch.yml' }

# 把插件自带的 patch 按 "- insert:" 切成独立块（丢掉注释行），后面缺哪块补哪块：
#   fairy-zzz-skin —— 皮肤本体
#   preset-fairy   —— 「Fairy 模式」agent 预设
$bundleBlocks = New-Object System.Collections.Generic.List[object]
$curBlock = $null
foreach ($bl in ([System.IO.File]::ReadAllText($bundlePatch) -split "`r?`n")) {
  if ($bl -match '^\s*#') { continue }
  if ($bl -match '^- insert:\s*$') {
    if ($curBlock) { $bundleBlocks.Add($curBlock) }
    $curBlock = New-Object System.Collections.Generic.List[string]
    $curBlock.Add($bl)
  } elseif ($curBlock -and $bl.Trim() -ne '') {
    $curBlock.Add($bl)
  }
}
if ($curBlock) { $bundleBlocks.Add($curBlock) }

$wanted = @(
  @{ Key = 'fairy-zzz-skin'; Label = '皮肤' },
  @{ Key = 'preset-fairy';   Label = 'Fairy 模式预设' }
)
$added = New-Object System.Collections.Generic.List[string]
$chunks = New-Object System.Collections.Generic.List[string]
if ($viaBundle) {
  Write-Step "该 profile 已按 bundle 方式安装，皮肤与「Fairy 模式」预设由插件自带 patch 插入，跳过手写 insert"
} else {
  foreach ($w in $wanted) {
    if ($raw -match [regex]::Escape($w.Key)) {
      Write-Step "cordis.patch.yml 里已有 $($w.Key)，跳过"
      continue
    }
    $pick = $bundleBlocks | Where-Object { ($_ -join "`n") -match [regex]::Escape($w.Key) } | Select-Object -First 1
    if (-not $pick) { throw "安装包里没有 $($w.Key) 的 insert 段" }
    $chunks.Add(($pick -join $nl))
    $added.Add($w.Label)
  }
}
if ($chunks.Count -gt 0) {
  $add = $chunks -join ($nl + $nl)
  if ($raw.Trim() -eq '') { $raw = $add + $nl } else { $raw = $raw.TrimEnd() + $nl + $nl + $add + $nl }
  $changed = $true
  Write-Ok ("cordis.patch.yml 已加入 " + ($added -join ' + '))
}

if ($raw -match 'dsh-client-ui-theme' -and $raw -match 'preference:\s*light') {
  $raw = [regex]::Replace($raw, '(?m)^(\s*)preference:\s*light\s*$', '$1preference: dark')
  $changed = $true
  Write-Ok '主题原来是浅色，已改为深色（浅色下皮肤看不清）'
}

if ($raw -notmatch 'dsh-client-ui-theme') {
  $themeBlock = @(
    '- insert:',
    '    - id: ui-theme',
    "      name: '@deepseek-ai/dsh-client-ui-theme'",
    '      config:',
    '        preference: dark'
  ) -join $nl
  if ($raw.Trim() -eq '') { $raw = $themeBlock + $nl } else { $raw = $raw.TrimEnd() + $nl + $nl + $themeBlock + $nl }
  $changed = $true
  Write-Ok "已把主题固定为深色（ui-theme: dark）"
}

if ($changed) {
  [System.IO.File]::WriteAllText($patchFile, $raw, (New-Object System.Text.UTF8Encoding($false)))
  Write-Ok "已写入 $patchFile"
}

# ---------- 5. 语音引擎（包内自带 GPT-SoVITS） ----------
$voiceSrc = Join-Path $here 'voice'
$voiceHome = ''

if ($VoiceHome) {
  $voiceHome = $VoiceHome
} elseif ($TtsDir) {
  $voiceHome = $TtsDir
} elseif (Test-Path (Join-Path $voiceSrc 'fairy_server.py')) {
  if ($CopyVoice) {
    $target = Join-Path $env:LOCALAPPDATA 'FairyVoice'
    Write-Step "复制语音引擎到 $target（约 2.8 GB，需要几分钟）..."
    if (-not (Test-Path $target)) { New-Item -ItemType Directory -Force -Path $target | Out-Null }
    robocopy $voiceSrc $target /E /NFL /NDL /NJH /NJS /NP | Out-Null
    if ($LASTEXITCODE -ge 8) { throw "复制语音引擎失败（robocopy 退出码 $LASTEXITCODE）" }
    $voiceHome = $target
  } else {
    $voiceHome = (Resolve-Path $voiceSrc).Path
  }
} elseif ($env:FAIRY_VOICE_HOME) {
  $voiceHome = $env:FAIRY_VOICE_HOME
} elseif ($env:FAIRY_TTS_DIR) {
  $voiceHome = $env:FAIRY_TTS_DIR
}

if ($voiceHome) {
  if (-not (Test-Path (Join-Path $voiceHome 'fairy_server.py'))) {
    Write-Warn2 "在 $voiceHome 里没找到 fairy_server.py，语音可能不可用"
  }
  # 插件目录里留一份指针，环境变量丢失也能找到引擎
  $hint = Join-Path $destDir 'voice-home.txt'
  [System.IO.File]::WriteAllText($hint, $voiceHome, (New-Object System.Text.UTF8Encoding($false)))
  # 不再写用户环境变量：voice-home.txt 是唯一真相，改目录不必重启宿主
  [Environment]::SetEnvironmentVariable('FAIRY_VOICE_HOME', $null, 'User')
  Write-Ok "语音引擎：$voiceHome"
  if (-not $CopyVoice -and (Test-Path (Join-Path $voiceSrc 'fairy_server.py'))) {
    Write-Warn2 '引擎用的是安装包里的 voice\ 目录，装完别删/别移动解压目录（或加 -CopyVoice 复制到本地）'
  }
} else {
  Write-Warn2 '没有语音引擎：皮肤照常工作，只是不朗读（问候语是预录 wav，仍可播放）。'
  Write-Step  '需要语音时用 -VoiceHome "D:\某处\voice" 指定'
}

Write-Host ""
Write-Host " 安装完成。请【完全退出并重开 DSH】（托盘图标也要退），" -ForegroundColor Yellow
Write-Host " 只按 F5 刷新页面不够 —— 宿主插件需要重新加载。" -ForegroundColor Yellow
Write-Host ""
Write-Host " 自检：/fairy-zzz/health  设置 → Fairy  新建会话 → Fairy 模式" -ForegroundColor DarkGray
Write-Host ""
