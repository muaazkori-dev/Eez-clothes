@echo off
title Eez Clothes Dev Server
echo Starting Eez Clothes Local Server...
echo.
cd /d "%~dp0"
call npm run dev
pause
