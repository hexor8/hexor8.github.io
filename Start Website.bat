@echo off
cd /d "%~dp0"
echo Starting HEXOR_8 site locally so YouTube videos can play inline...
start /min cmd /c "py -m http.server 8743"
timeout /t 1 /nobreak >nul
start "" "http://localhost:8743/index.html"
