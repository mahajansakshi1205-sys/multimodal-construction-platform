# Multimodal Construction Intelligence Platform - PowerShell Launcher
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "Multimodal Construction Intelligence Platform Launcher" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Backend
Write-Host "`n[1/3] Setting up Backend..." -ForegroundColor Green
Set-Location -Path "$rootDir\backend"
python -m pip install -r requirements.txt

# 2. Frontend
Write-Host "`n[2/3] Setting up Frontend..." -ForegroundColor Green
Set-Location -Path "$rootDir\frontend"
npm install

# 3. Launch
Write-Host "`n[3/3] Starting Services..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\backend'; python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"
Start-Sleep -Seconds 3
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\frontend'; npm run dev"

Write-Host "`nPlatform running successfully!" -ForegroundColor Green
Write-Host "• Backend API Docs:   http://127.0.0.1:8000/docs" -ForegroundColor White
Write-Host "• Frontend Dashboard:  http://localhost:5173" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Cyan
