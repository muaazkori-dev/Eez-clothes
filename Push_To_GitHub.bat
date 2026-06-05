@echo off
title Push Eez Clothes Updates to GitHub
echo Staging changes...
git add .
echo.
echo Committing changes...
git commit -m "Fix product images and add elegant fallbacks"
echo.
echo Pushing to GitHub (main branch)...
git push origin main
echo.
echo Done! If your online hosting (Vercel/GitHub Pages/Netlify) is connected, it will auto-deploy now.
pause
