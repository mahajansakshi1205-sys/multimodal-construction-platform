@echo off
echo ========================================================
echo Multimodal Construction Intelligence Platform
echo Full-Stack Launcher (FastAPI + React.js)
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Checking Backend Python Environment...
cd backend
python -m pip install -r requirements.txt
echo [2/3] Checking Frontend Node Environment...
cd ..\frontend
call npm install

echo [3/3] Launching Backend & Frontend Concurrently...
cd ..
start "FastAPI Backend" cmd /k "cd backend && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"
timeout /t 3 /nobreak >nul
start "React Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo Platform is now running!
echo Backend API Docs: http://127.0.0.1:8000/docs
echo Frontend Dashboard: http://localhost:5173
echo ========================================================
pause
